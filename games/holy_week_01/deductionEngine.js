// ============================================================
// DEDUCTION ENGINE — reasoning operations, scoring, inference
// ============================================================

export const OPERATIONS = {
  COMPARE:     { id: "compare",     label: "Compare",     icon: "🔍", desc: "Are these consistent?" },
  LINK:        { id: "link",        label: "Link",        icon: "🔗", desc: "Do they point to the same conclusion?" },
  TIMELINE:    { id: "timeline",    label: "Timeline",    icon: "⏱", desc: "What happened first?" },
  CONTRADICT:  { id: "contradict",  label: "Contradict",  icon: "⚡", desc: "Do these conflict?" },
};

export class DeductionEngine {
  constructor(caseManager, evidenceSystem) {
    this.caseManager = caseManager;
    this.evidenceSystem = evidenceSystem;
    this.deductions = [];
  }

  loadCase() {
    this.deductions = [];
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

    let result;
    if (specific) {
      result = {
        operation,
        a: a.name,
        b: b.name,
        text: specific.text,
        insight: specific.insight || null,
        isKeyDeduction: specific.isKey || false,
        score: specific.isKey ? 15 : 8,
      };
    } else {
      result = this._genericDeduction(operation, a, b);
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

    return { operation: op, a: a.name, b: b.name, text, insight: null, isKeyDeduction: false, score: 4 };
  }

  getDeductions() {
    return this.deductions;
  }

  getTotalScore() {
    return this.deductions.reduce((sum, d) => sum + (d.score || 0), 0);
  }
}
