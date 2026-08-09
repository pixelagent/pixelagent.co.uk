// ============================================================
// CASE MANAGER — Unified logic for Case Progress & Scoring
// ============================================================

export class CaseManager {
  constructor() {
    this.cases = {};
    this.activeCaseId = null;
    this.progress = this._loadProgress();
    if (typeof document !== 'undefined') {
      setTimeout(() => this._refreshMetricsUI(), 100);
    }
  }

  registerCase(caseData) {
    this.cases[caseData.id] = caseData;
  }

  getCase(id) {
    return this.cases[id] || null;
  }

  getAllCases() {
    return Object.values(this.cases);
  }

  getProgress() {
    return this.progress;
  }

  getActiveCase() {
    return this.activeCaseId ? this.cases[this.activeCaseId] : null;
  }

  startCase(id) {
    if (!this.cases[id]) return false;
    this.activeCaseId = id;
    if (!this.progress.cases[id]) {
      this.progress.cases[id] = {
        started: true,
        solved: false,
        sceneViewed: false,
        evidenceFound: [],
        propheciesFound: [],
        deductionsMade: [],
        labDeductions: {},
        breakthroughs: [],
        failedChallenges: 0,
        unlockedSuspects: [],
        suspects: this._initializeSuspects(this.cases[id]),
        accusation: null,
        score: null,
      };
      this._saveProgress();
    }
    return true;
  }

  _initializeSuspects(caseData) {
    const suspects = {};
    (caseData.suspects || []).forEach(s => {
      suspects[s.id] = { status: 'Neutral', notes: '' };
    });
    return suspects;
  }

  getCaseProgress(id) {
    return this.progress.cases[id] || null;
  }

  recordEvidenceFound(evidenceId) {
    const p = this.progress.cases[this.activeCaseId];
    const c = this.getActiveCase();
    if (p && c) {
      if (!p.evidenceFound.includes(evidenceId)) {
        p.evidenceFound.push(evidenceId);
        const ev = c.evidencePool.find(e => e.id === evidenceId);
        if (ev && ev.revealsSuspect) {
          this.discoverSuspect(ev.revealsSuspect);
        }
        if (c.lab) {
          const labEntry = c.lab.find(l => l.evidence === evidenceId);
          if (labEntry && p.suspects[labEntry.suspect]) {
            p.suspects[labEntry.suspect].status = labEntry.result;
            p.suspects[labEntry.suspect].notes = labEntry.result;
            p.labDeductions[evidenceId] = { suspect: labEntry.suspect, result: labEntry.result };
          }
        }
      }
      this._saveProgress();
    }
  }

  unlockEvidenceForScene(caseId, evidenceIds) {
    const p = this.progress.cases[caseId];
    const c = this.getCase(caseId);
    if (!p || !c) return;
    if (!p.unlockedEvidence) p.unlockedEvidence = [];
    const newIds = evidenceIds.filter(id => !p.unlockedEvidence.includes(id));
    if (newIds.length === 0) return;
    newIds.forEach(id => {
      p.unlockedEvidence.push(id);
      const ev = c.evidencePool.find(e => e.id === id);
      if (ev && ev.revealsSuspect) {
        this.discoverSuspect(ev.revealsSuspect);
      }
    });
    this._saveProgress();
    this._refreshMetricsUI();
  }

  refreshUnlockedSuspects() {
    const p = this.progress.cases[this.activeCaseId];
    const c = this.getActiveCase();
    if (!p || !c) return;
    (p.evidenceFound || []).forEach(evId => {
      const ev = c.evidencePool.find(e => e.id === evId);
      if (ev && ev.revealsSuspect && !p.unlockedSuspects.includes(ev.revealsSuspect)) {
        p.unlockedSuspects.push(ev.revealsSuspect);
      }
      if (c.lab) {
        const labEntry = c.lab.find(l => l.evidence === evId);
        if (labEntry && p.suspects[labEntry.suspect]) {
          p.suspects[labEntry.suspect].status = labEntry.result;
          p.suspects[labEntry.suspect].notes = labEntry.result;
          p.labDeductions[evId] = { suspect: labEntry.suspect, result: labEntry.result };
        }
      }
    });
    this._saveProgress();
  }

  recordProphecyFound(prophecyId) {
    const p = this.progress.cases[this.activeCaseId];
    const c = this.getActiveCase();
    if (p && c && !p.propheciesFound.includes(prophecyId)) {
      p.propheciesFound.push(prophecyId);
      if (p.propheciesFound.length === (c.prophecies || []).length) {
        console.log(`All prophecies for case ${this.activeCaseId} found!`);
        const caseData = this.cases[this.activeCaseId];
        (caseData?.suspects || []).forEach(s => {
          this.discoverSuspect(s.id);
        });
      }
      this._saveProgress();
      this._refreshMetricsUI();
    }
  }

  recordDeduction(deduction) {
    const p = this.progress.cases[this.activeCaseId];
    if (!p) return;
    if (!Array.isArray(p.deductionsMade)) p.deductionsMade = [];
    p.deductionsMade.push(deduction);
    this._saveProgress();
  }

  canAttemptProphecyMatch(caseId = this.activeCaseId) {
    const p = this.progress.cases[caseId];
    if (!p) return false;
    const deductionCount = (p.deductionsMade || []).length;
    const prophecyCount = (p.propheciesFound || []).length;
    return deductionCount > prophecyCount;
  }

  addScore(points) {
    if (!Number.isFinite(points) || points === 0) return;
    this.progress.totalScore = Math.max(0, (this.progress.totalScore || 0) + points);
    this._saveProgress();
    this._refreshMetricsUI();
  }

  recordSceneCollectedEvidence(evidenceId, caseId = this.activeCaseId) {
    const p = this.progress.cases[caseId];
    if (!p) return false;
    if (!Array.isArray(p.collectedEvidence)) p.collectedEvidence = [];
    if (p.collectedEvidence.includes(evidenceId)) return false;
    p.collectedEvidence.push(evidenceId);
    this._saveProgress();
    return true;
  }

  getChatMessagesByNpc(caseId = this.activeCaseId) {
    const p = this.progress.cases[caseId];
    if (!p) return {};
    if (!p.chatMessagesByNpc || typeof p.chatMessagesByNpc !== "object") {
      p.chatMessagesByNpc = {};
      this._saveProgress();
    }
    return p.chatMessagesByNpc;
  }

  setChatMessagesByNpc(messagesByNpc, caseId = this.activeCaseId) {
    const p = this.progress.cases[caseId];
    if (!p) return;
    p.chatMessagesByNpc = messagesByNpc && typeof messagesByNpc === "object" ? messagesByNpc : {};
    this._saveProgress();
  }

  recordBreakthrough(npcId, evidenceKey) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      if (!p.breakthroughs) p.breakthroughs = [];
      if (!p.breakthroughs.includes(evidenceKey)) {
        p.breakthroughs.push(evidenceKey);
        this.addScore(10);
        this._saveProgress();
        if (window.audio && typeof window.audio.playClue === 'function') window.audio.playClue();
      }
    }
  }

  recordLabDeduction(evidenceId, suspectId, result) {
    const p = this.progress.cases[this.activeCaseId];
    if (!p || !p.suspects[suspectId]) return;
    p.suspects[suspectId].status = result;
    p.suspects[suspectId].notes = result;
    p.labDeductions[evidenceId] = { suspect: suspectId, result };
    this._saveProgress();
  }

  recordFailedChallenge() {
    const p = this.progress.cases[this.activeCaseId];
    if (!p) return;
    p.failedChallenges = (p.failedChallenges || 0) + 1;
    this.updateDoubt(10);
    this._saveProgress();
  }

  recordIncorrectLabPairing() {
    this.updateDoubt(5);
    this.addScore(-5);
  }

  recordIncorrectProphecyLink() {
    this.updateDoubt(5);
  }

  getSuspectStatus(suspectId) {
    const p = this.progress.cases[this.activeCaseId];
    return p?.suspects[suspectId] || { status: 'Unknown', notes: '' };
  }

  discoverSuspect(suspectId) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      if (!p.unlockedSuspects) p.unlockedSuspects = [];
      if (!p.unlockedSuspects.includes(suspectId)) {
        p.unlockedSuspects.push(suspectId);
        this._saveProgress();
        this._refreshMetricsUI();
        return true;
      }
    }
    return false;
  }

  isSuspectUnlocked(suspectId) {
    const p = this.progress.cases[this.activeCaseId];
    return p ? (p.unlockedSuspects || []).includes(suspectId) : (suspectId === "none");
  }

  updateDoubt(amount) {
    this.progress.doubt = Math.max(0, (this.progress.doubt || 0) + amount);
    this._saveProgress();
    this._refreshMetricsUI();
  }

  updateReputation(faction, amount) {
    if (!this.progress.reputations) {
      this.progress.reputations = { scribes: 100, temple: 100, roman: 100, local: 100 };
    }
    const current = this.progress.reputations[faction] !== undefined ? this.progress.reputations[faction] : 100;
    this.progress.reputations[faction] = Math.max(0, Math.min(100, current + amount));
    this._saveProgress();
    this._refreshMetricsUI();
  }

  _refreshMetricsUI() {
    if (typeof document === 'undefined') return;
    const doubtEls = document.querySelectorAll('.val-doubt');
    const repEls = document.querySelectorAll('.val-reputation');
    const scoreValEls = document.querySelectorAll('.val-score');

    const newDoubt = this.progress.doubt || 0;
    doubtEls.forEach(el => el.textContent = newDoubt);

    const newScoreNum = this.progress.totalScore || 0;
    scoreValEls.forEach(el => el.textContent = newScoreNum);

    if (this.progress.reputations) {
      const reps = Object.values(this.progress.reputations);
      const avg = Math.round(reps.reduce((a, b) => a + b, 0) / reps.length);
      repEls.forEach(el => el.textContent = avg);
    }
  }

  submitAccusation(suspectId) {
    const c = this.getActiveCase();
    const p = this.progress.cases[this.activeCaseId];
    if (!c || !p) return null;
    const correct = suspectId === c.truth.culprit;
    const evidenceScore = (p.evidenceFound || []).length * 5;
    const manualDeductionScore = (p.deductionsMade || []).reduce((sum, d) => sum + (Number.isFinite(d?.score) ? d.score : 0), 0);
    const autoDeductionScore = Object.keys(p.labDeductions || {}).length * 15;
    const deductionScore = manualDeductionScore + autoDeductionScore;
    const challengeScore = (p.breakthroughs || []).length * 10;
    const prophecyScore = (p.propheciesFound || []).length * 10;
    const baseAccusationScore = correct ? 50 : -25;
    const doubtPenalty = (this.progress.doubt || 0) * 2;
    const perfectBonus = (correct && (p.failedChallenges || 0) === 0) ? 25 : 0;
    const total = Math.max(0, evidenceScore + deductionScore + challengeScore + prophecyScore + baseAccusationScore + perfectBonus - doubtPenalty);

    const result = {
      correct, suspectId, truth: c.truth,
      score: { evidence: evidenceScore, deduction: deductionScore, challenge: challengeScore, prophecy: prophecyScore, accusation: baseAccusationScore, perfectBonus, doubtPenalty, total },
    };

    p.accusation = suspectId;
    p.solved = correct;
    p.score = result.score;
    this.progress.totalScore = Math.max(0, (this.progress.totalScore || 0) + total);
    if (correct) this.progress.rank = this._calcRank(total);
    else this.updateDoubt(25);

    this._refreshMetricsUI();
    this._saveProgress();
    return result;
  }

  addScore(delta) {
    this.progress.totalScore = Math.max(0, (this.progress.totalScore || 0) + delta);
    this._refreshMetricsUI();
    this._saveProgress();
  }

  _calcRank(score) {
    if (score >= 150) return "Master Detective";
    if (score >= 100) return "Analyst";
    if (score >= 60) return "Investigator";
    return "Rookie";
  }

  getUnlockedCases() {
    return this.getAllCases().filter(c => !c.requires || this.progress.cases[c.requires]?.solved);
  }

  _loadProgress() {
    const raw = localStorage.getItem("detective_progress");
    return raw ? JSON.parse(raw) : { cases: {}, totalScore: 0, rank: "Rookie", doubt: 0, reputations: { scribes: 100, temple: 100, roman: 100, local: 100 } };
  }

  _saveProgress() { localStorage.setItem("detective_progress", JSON.stringify(this.progress)); }
  resetProgress() { localStorage.removeItem("detective_progress"); location.reload(); }
}
