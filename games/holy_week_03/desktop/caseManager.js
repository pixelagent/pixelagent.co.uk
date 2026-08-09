// ============================================================
// CASE MANAGER — loads cases, tracks progress, scores reasoning
// ============================================================

export class CaseManager {
  constructor() {
    this.cases = {};
    this.activeCaseId = null;
    this.progress = this._loadProgress();
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
        evidenceFound: [],
        deductionsMade: [],
        unlockedSuspects: [],
        suspects: this._initializeSuspects(this.cases[id]),
        accusation: null,
        score: null,
      };
    }
    if (!isNew) {
      const p = this.progress.cases[id];
      const c = this.getActiveCase();
      if (!p.suspects) p.suspects = this._initializeSuspects(c);
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
          }
        }
      });
    }
    this._saveProgress();
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
          this.unlockSuspect(ev.revealsSuspect);
        }
        if (c.lab) {
          const labEntry = c.lab.find(l => l.evidence === evidenceId);
          if (labEntry && p.suspects[labEntry.suspect]) {
            p.suspects[labEntry.suspect].status = labEntry.result;
            p.suspects[labEntry.suspect].notes = labEntry.result;
          }
        }
      }
      this._saveProgress();
    }
  }

  refreshUnlockedSuspects() {
    const p = this.progress.cases[this.activeCaseId];
    const c = this.getActiveCase();
    if (!p || !c) return;
    if (!p.suspects) p.suspects = this._initializeSuspects(c);
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
        }
      }
    });
    this._saveProgress();
  }

  recordDeduction(deduction) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      p.deductionsMade.push(deduction);
      this._saveProgress();
    }
  }

  recordBreakthrough(npcId, contradictionKey) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      if (!p.breakthroughs) p.breakthroughs = [];
      if (!p.breakthroughs.includes(contradictionKey)) {
        p.breakthroughs.push(contradictionKey);
        this._saveProgress();
      }
    }
  }

  unlockSuspect(suspectId) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      if (!p.unlockedSuspects) p.unlockedSuspects = [];
      if (!p.unlockedSuspects.includes(suspectId)) {
        p.unlockedSuspects.push(suspectId);
        this._saveProgress();
        return true;
      }
    }
    return false;
  }

  isSuspectUnlocked(suspectId) {
    const p = this.progress.cases[this.activeCaseId];
    return p ? (p.unlockedSuspects || []).includes(suspectId) : false;
  }

  getSuspectStatus(suspectId) {
    const p = this.progress.cases[this.activeCaseId];
    return p?.suspects?.[suspectId] || { status: 'Unknown', notes: '' };
  }

  recordLabDeduction(evidenceId, suspectId, result) {
    const p = this.progress.cases[this.activeCaseId];
    if (!p || !p.suspects?.[suspectId]) return;
    p.suspects[suspectId].status = result;
    p.suspects[suspectId].notes = result;
    this._saveProgress();
  }

  refreshUnlockedSuspects() {
    const p = this.progress.cases[this.activeCaseId];
    const c = this.getActiveCase();
    if (!p || !c) return;
    if (!p.suspects) p.suspects = this._initializeSuspects(c);
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
        }
      }
    });
    this._saveProgress();
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
    const all = this.getAllCases();
    return all.filter(c => {
      if (!c.requires) return true;
      return this.progress.cases[c.requires]?.solved;
    });
  }

  getProgress() {
    return this.progress;
  }

  _loadProgress() {
    try {
      const raw = localStorage.getItem("detective_progress");
      return raw ? JSON.parse(raw) : { cases: {}, totalScore: 0, rank: "Rookie" };
    } catch {
      return { cases: {}, totalScore: 0, rank: "Rookie" };
    }
  }

  _saveProgress() {
    try {
      localStorage.setItem("detective_progress", JSON.stringify(this.progress));
    } catch { }
  }

  resetProgress() {
    localStorage.removeItem("detective_progress");
    this.progress = { cases: {}, totalScore: 0, rank: "Rookie" };
  }
}
