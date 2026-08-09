// ============================================================
// DEDUCTION ENGINE — reasoning operations, scoring, inference
// ============================================================

export const OPERATIONS = {
  COMPARE:     { id: "compare",     label: "Compare",     icon: '<i class="fa-solid fa-magnifying-glass"></i>', desc: "Are these consistent?" },
  LINK:        { id: "link",        label: "Link",        icon: '<i class="fa-solid fa-link"></i>',        desc: "Do they point to the same conclusion?" },
  TIMELINE:    { id: "timeline",    label: "Timeline",    icon: '<i class="fa-solid fa-clock"></i>',       desc: "What happened first?" },
  CONTRADICT:  { id: "contradict",  label: "Contradict",  icon: '<i class="fa-solid fa-bolt"></i>',        desc: "Do these conflict?" },
};

export class DeductionEngine {
  constructor(caseManager, evidenceSystem) {
    this.caseManager = caseManager;
    this.evidenceSystem = evidenceSystem;
    this.deductions = [];
  }

  loadCase() {
    // Load existing deductions from CaseManager to keep history across sessions
    const caseId = this.caseManager.activeCaseId;
    const p = this.caseManager.getCaseProgress(caseId);
    this.deductions = p ? [...(p.deductionsMade || [])] : [];
  }

  canOperate() {
    return !!(this.evidenceSystem.selectedA && this.evidenceSystem.selectedB);
  }

  operate(operation) {
    const a = this.evidenceSystem.selectedA;
    const b = this.evidenceSystem.selectedB;
    if (!a || !b) return { error: "Select two pieces of evidence first." };

    const c = this.caseManager.getActiveCase();
    const key = `${a.id}+${b.id}`;
    const keyRev = `${b.id}+${a.id}`;

    // Check for case-specific deduction
    const specific = c?.deductions?.[key]?.[operation] || c?.deductions?.[keyRev]?.[operation];

    // Lab insights can reveal suspects (e.g. finding a hidden name)
    if (specific && specific.revealsSuspect) {
      this.caseManager.discoverSuspect(specific.revealsSuspect);
    }

    let result;
    if (specific) {
      result = {
        deductionId: specific.id || key,
        operation,
        a: a.name,
        aIcon: a.icon,
        b: b.name,
        bIcon: b.icon,
        text: specific.text,
        insight: specific.insight || null,
        isKeyDeduction: specific.isKey || false,
        score: specific.isKey ? 15 : 8,
      };
    } else {
      // Per "Source of Truth" doc, incorrect pairings have a penalty.
      // A generic deduction is treated as an incorrect pairing for scoring purposes.
      this.caseManager.addDoubt(5);
      result = {
        ...this._genericDeduction(operation, a, b),
        score: -5, // Penalty for incorrect pairing
        isPenalty: true
      };
    }

    this.deductions.push(result);
    this.caseManager.recordDeduction(result);
    return result;
  }

  _genericDeduction(op, a, b) {
    const templates = {
      compare: [
        `Both ${a.name} and ${b.name} were found in the same location — worth noting.`,
        `${a.name} and ${b.name} share characteristics that may be connected.`,
        `Comparing ${a.name} with ${b.name} reveals no obvious link yet.`,
      ],
      link: [
        `${a.name} could be connected to ${b.name} through the suspect's movements.`,
        `Linking ${a.name} to ${b.name} suggests a deliberate action, not coincidence.`,
        `These two pieces of evidence together point toward a motive.`,
      ],
      timeline: [
        `${a.name} appears to precede ${b.name} — the sequence matters.`,
        `If ${b.name} came first, then ${a.name} changes everything about the timeline.`,
        `The timing of ${a.name} and ${b.name} needs further investigation.`,
      ],
      contradict: [
        `${a.name} directly contradicts what ${b.name} implies.`,
        `Someone is lying — ${a.name} and ${b.name} cannot both be true.`,
        `The contradiction between ${a.name} and ${b.name} is significant.`,
      ],
    };

    const pool = templates[op] || [`Analysis of ${a.name} and ${b.name} complete.`];
    const text = pool[Math.floor(Math.random() * pool.length)];

    // Determine a score based on the evidence properties
    let score = 2; // Base score for any generic deduction
    if (a.isKey) score += 2;
    if (b.isKey) score += 2;
    if (a.isKey && b.isKey) score += 2; // Extra bonus for linking two key items

    return { operation: op, a: a.name, aIcon: a.icon, b: b.name, bIcon: b.icon, text, insight: null, isKeyDeduction: false, score: score };
  }

  getDeductions() {
    return this.deductions;
  }

  getTotalScore() {
    return this.deductions.reduce((sum, d) => sum + (d.score || 0), 0);
  }
}
