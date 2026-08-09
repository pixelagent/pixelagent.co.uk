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

    const aIsScripture = a.type === 'scripture';
    const bIsScripture = b.type === 'scripture';
    
    if (aIsScripture || bIsScripture) {
      return this._handleResearchPair(a, b);
    }

    const specific = c?.deductions?.[key]?.[operation] || c?.deductions?.[keyRev]?.[operation];

    if (specific && specific.revealsSuspect) {
      this.caseManager.discoverSuspect(specific.revealsSuspect);
    }

    if (specific && specific.revealsProphecy) {
      const currentStatus = this.caseManager.getCodexStatus(specific.revealsProphecy);
      if (currentStatus === 'unseen') {
        this.caseManager.setCodexStatus(specific.revealsProphecy, 'rumor');
      }
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
        revealsProphecy: specific.revealsProphecy || null,
        score: specific.isKey ? 15 : 8,
      };
    } else {
      result = this._genericDeduction(operation, a, b);
    }

    this.deductions.push(result);
    this.caseManager.recordDeduction(result);
    return result;
  }
  
  _handleResearchPair(a, b) {
    const aIsScripture = a.type === 'scripture';
    const bIsScripture = b.type === 'scripture';
    const scripture = aIsScripture ? a : (bIsScripture ? b : null);
    const other = aIsScripture ? b : (bIsScripture ? a : null);
    
    const c = this.caseManager.getActiveCase();
    if (!c || !c.prophecies) return { error: "No prophecies available for research." };
    
    const matchingProphecy = c.prophecies.find(p => 
      p.scriptureEvidenceId === scripture.id && p.fulfillmentEvidenceId === other.id
    );
    
    if (matchingProphecy) {
      const currentStatus = this.caseManager.getCodexStatus(matchingProphecy.id);
      if (currentStatus === 'complete') {
        return { text: `Already researched: ${matchingProphecy.reference}`, insight: null, isKeyDeduction: false, score: 0 };
      }
      
      this.caseManager.setCodexStatus(matchingProphecy.id, 'complete');
      this.caseManager.addResearchPoints(20);
      this.caseManager.recordProphecyFound(matchingProphecy.id);
      
      const result = {
        deductionId: `research_${matchingProphecy.id}`,
        operation: 'research',
        a: scripture.name,
        aIcon: scripture.icon,
        b: other.name,
        bIcon: other.icon,
        text: `Research Complete: ${matchingProphecy.reference} — ${matchingProphecy.fulfilledBy}`,
        insight: matchingProphecy.insight,
        isKeyDeduction: true,
        revealsProphecy: matchingProphecy.id,
        score: 15,
        researchPoints: 20
      };
      
      this.deductions.push(result);
      this.caseManager.recordDeduction(result);
      return result;
    }
    
    this.caseManager.updateDoubt(5);
    const result = {
      deductionId: `research_failed_${Date.now()}`,
      operation: 'research',
      a: a.name,
      aIcon: a.icon,
      b: b.name,
      bIcon: b.icon,
      text: "This scripture does not match that evidence. +5 Doubt",
      insight: null,
      isKeyDeduction: false,
      score: -5
    };
    
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

    return { operation: op, a: a.name, aIcon: a.icon, b: b.name, bIcon: b.icon, text, insight: null, isKeyDeduction: false, score: 8 };
  }

  getDeductions() {
    return this.deductions;
  }

  getTotalScore() {
    return this.deductions.reduce((sum, d) => sum + (d.score || 0), 0);
  }
}