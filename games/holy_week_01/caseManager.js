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
    if (!this.progress.cases[id]) {
      this.progress.cases[id] = {
        started: true,
        solved: false,
        evidenceFound: [],
        deductionsMade: [],
        accusation: null,
        score: null,
      };
      this._saveProgress();
    }
    return true;
  }

  getCaseProgress(id) {
    return this.progress.cases[id] || null;
  }

  recordEvidenceFound(evidenceId) {
    const p = this.progress.cases[this.activeCaseId];
    if (p && !p.evidenceFound.includes(evidenceId)) {
      p.evidenceFound.push(evidenceId);
      this._saveProgress();
    }
  }

  recordDeduction(deduction) {
    const p = this.progress.cases[this.activeCaseId];
    if (p) {
      p.deductionsMade.push(deduction);
      this._saveProgress();
    }
  }

  submitAccusation(suspectId) {
    const c = this.getActiveCase();
    const p = this.progress.cases[this.activeCaseId];
    if (!c || !p) return null;

    const correct = suspectId === c.truth.culprit;
    const totalEvidence = c.evidencePool.length;
    const foundEvidence = p.evidenceFound.length;
    const deductionScore = Math.min(p.deductionsMade.length * 10, 40);
    const evidenceScore = Math.round((foundEvidence / totalEvidence) * 40);
    const accusationScore = correct ? 20 : 0;
    const total = deductionScore + evidenceScore + accusationScore;

    const result = {
      correct,
      suspectId,
      truth: c.truth,
      score: { deduction: deductionScore, evidence: evidenceScore, accusation: accusationScore, total },
    };

    p.accusation = suspectId;
    p.solved = correct;
    p.score = result.score;

    if (correct) {
      this.progress.rank = this._calcRank(total);
      this.progress.totalScore = (this.progress.totalScore || 0) + total;
    }

    this._saveProgress();
    return result;
  }

  _calcRank(score) {
    if (score >= 90) return "Master Detective";
    if (score >= 70) return "Analyst";
    if (score >= 50) return "Investigator";
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
    } catch {}
  }

  resetProgress() {
    localStorage.removeItem("detective_progress");
    this.progress = { cases: {}, totalScore: 0, rank: "Rookie" };
  }
}
