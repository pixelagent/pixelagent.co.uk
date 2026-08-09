// ============================================================
// CASE MANAGER — Unified logic for Case Progress & Scoring
// ============================================================

export class CaseManager {
  constructor() {
    this.cases = {};
    this.activeCaseId = null;
    this.progress = this._loadProgress();
    // Initialize global research score and codex if missing
    if (!this.progress.researchScore) this.progress.researchScore = 0;
    if (!this.progress.codex) this.progress.codex = {};
    // Refresh HUD values on load if DOM is ready
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

  getActiveCase() {
    return this.activeCaseId ? this.cases[this.activeCaseId] : null;
  }

  startCase(id) {
    if (!this.cases[id]) return false;
    this.activeCaseId = id;
    const isNew = !this.progress.cases[id];
    if (isNew) {
      this.progress.cases[id] = {
        started: true,
        solved: false,
        sceneViewed: false,
        evidenceFound: [],
        propheciesFound: [],
        deductionsMade: [],
        scoredDeductions: [],
        labDeductions: {},
        chatMessagesByNpc: {},
        breakthroughs: [],
        failedChallenges: 0,
        unlockedSuspects: [],
        suspects: this._initializeSuspects(this.cases[id]),
        accusation: null,
        score: null,
      };
    }
    if (!isNew) {
      const p = this.progress.cases[id];
      const c = this.getActiveCase();
      (p.evidenceFound || []).forEach(evId => {
        const ev = c?.evidencePool.find(e => e.id === evId);
        if (ev && ev.revealsSuspect && !p.unlockedSuspects.includes(ev.revealsSuspect)) {
          p.unlockedSuspects.push(ev.revealsSuspect);
        }
        if (c?.lab) {
          const labEntry = c.lab.find(l => l.evidence === evId);
          if (labEntry && p.suspects[labEntry.suspect]) {
            p.suspects[labEntry.suspect].status = labEntry.result;
            p.suspects[labEntry.suspect].notes = labEntry.result;
            p.labDeductions[evId] = { suspect: labEntry.suspect, result: labEntry.result };
          }
        }
      });
    }
    this._saveProgress();
    return true;
  }

  _initializeSuspects(caseData) {
    const suspects = {};
    // All characters in a case start as potential suspects with a 'Neutral' status
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

      // Check if all prophecies are found to unlock the final accusation
      // and the remaining accusable suspects for this case (per design).
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

    if (!Array.isArray(p.deductionsMade)) {
      p.deductionsMade = [];
    }

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

  /**
   * Records a deduction made in the Lab, updating a suspect's status.
   * @param {string} evidenceId - The ID of the evidence used.
   * @param {string} suspectId - The ID of the suspect affected.
   * @param {string} result - The deductive outcome (e.g., "Implicated", "Cleared").
   */
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
    const scholarEls = document.querySelectorAll('.val-scholar');

    const newDoubt = this.progress.doubt || 0;
    doubtEls.forEach(el => el.textContent = newDoubt);

    const newScoreNum = this.progress.totalScore || 0;
    scoreValEls.forEach(el => el.textContent = newScoreNum);

    const scholarLevel = this.getScholarLevel();
    scholarEls.forEach(el => el.textContent = scholarLevel);

    const propCounts = this.getProphecyCounts();
    const propValEls = document.querySelectorAll('.val-prophecies');
    propValEls.forEach(el => el.textContent = `${propCounts.discovered}/${propCounts.total}`);

    const completePropEls = document.querySelectorAll('.val-complete-prophecies');
    completePropEls.forEach(el => el.textContent = propCounts.complete);

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
    const baseAccusationScore = correct ? 50 : -25;
    const doubtPenalty = (this.progress.doubt || 0) * 2;
    const perfectBonus = (correct && (p.failedChallenges || 0) === 0) ? 25 : 0;
    const total = Math.max(0, evidenceScore + deductionScore + challengeScore + baseAccusationScore + perfectBonus - doubtPenalty);

    const result = {
      correct, suspectId, truth: c.truth,
      score: { evidence: evidenceScore, deduction: deductionScore, challenge: challengeScore, accusation: baseAccusationScore, perfectBonus, doubtPenalty, total },
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

  addResearchPoints(points) {
    if (!Number.isFinite(points) || points === 0) return;
    this.progress.researchScore = Math.max(0, (this.progress.researchScore || 0) + points);
    this._saveProgress();
    this._refreshMetricsUI();
  }

  getResearchScore() {
    return this.progress.researchScore || 0;
  }

  getProphecyCounts() {
    const c = this.getActiveCase();
    if (!c) {
      const allProps = Object.values(this.cases).flatMap(c => c.prophecies || []);
      const discovered = allProps.filter(p => this.getCodexStatus(p.id) !== 'unseen').length;
      const complete = allProps.filter(p => this.getCodexStatus(p.id) === 'complete').length;
      return { discovered, complete, total: allProps.length };
    }
    const allProps = c.prophecies || [];
    const progress = this.progress.cases[this.activeCaseId] || {};
    const foundList = progress.propheciesFound || [];
    const discovered = allProps.filter(p => this.getCodexStatus(p.id) !== 'unseen').length;
    const complete = allProps.filter(p => this.getCodexStatus(p.id) === 'complete').length;
    return { discovered, complete, total: allProps.length };
  }

  getScholarLevel() {
    const rs = this.getResearchScore();
    if (rs >= 1500) return "Master";
    if (rs >= 1000) return "Expert";
    if (rs >= 750) return "Scholar";
    if (rs >= 500) return "Rabbi";
    if (rs >= 250) return "Scribe";
    if (rs >= 100) return "Student";
    return "Novice";
  }

  getCodexStatus(prophecyId) {
    return this.progress.codex?.[prophecyId] || 'unseen';
  }

  setCodexStatus(prophecyId, status) {
    if (!this.progress.codex) this.progress.codex = {};
    this.progress.codex[prophecyId] = status;
    this._saveProgress();
    this._refreshMetricsUI();
  }

  getCompletedChains() {
    return this.progress.completedChains || [];
  }

  recordChainCompleted(chainId) {
    if (!this.progress.completedChains) this.progress.completedChains = [];
    if (!this.progress.completedChains.includes(chainId)) {
      this.progress.completedChains.push(chainId);
      this._saveProgress();
    }
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

  getProgress() {
    const cases = Object.values(this.cases);
    if (cases.length === 0) return 0;
    const solved = Object.values(this.progress.cases).filter(c => c.solved).length;
    return Math.floor((solved / cases.length) * 100);
  }

  _loadProgress() {
    const raw = localStorage.getItem("detective_progress");
    return raw ? JSON.parse(raw) : { cases: {}, totalScore: 0, rank: "Rookie", doubt: 0, reputations: { scribes: 100, temple: 100, roman: 100, local: 100 } };
  }

  _saveProgress() { localStorage.setItem("detective_progress", JSON.stringify(this.progress)); }
  resetProgress() { localStorage.removeItem("detective_progress"); location.reload(); }
}