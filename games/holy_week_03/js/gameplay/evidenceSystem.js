
// ============================================================
// EVIDENCE SYSTEM — Shared collection and discovery logic
// ============================================================

export const EVIDENCE_TYPES = {
  PHYSICAL:      { id: "physical",      label: "Physical",      icon: '../assets/gfx/shield-duotone.svg', color: "#f59e0b" },
  TESTIMONIAL:   { id: "testimonial",   label: "Testimonial",   icon: '../assets/gfx/chat-duotone.svg', color: "#60a5fa" },
  DIGITAL:       { id: "digital",       label: "Digital",       icon: '../assets/gfx/laptop-code.svg', color: "#34d399" },
  ENVIRONMENTAL: { id: "environmental", label: "Environmental", icon: '../assets/gfx/leaf-duotone.svg', color: "#a78bfa" },
  ANALYTICAL:    { id: "analytical",    label: "Analytical",    icon: '../assets/gfx/microscope-duotone.svg', color: "#f472b6" },
  PROPHECY:      { id: "prophecy",      label: "Prophecy",      icon: '../assets/gfx/star-duotone.svg', color: "#facc15" },
  SCRIPTURE:     { id: "scripture",     label: "Scripture",     icon: '../assets/gfx/scroll-duotone.svg', color: "#fbbf24" },
};

export class EvidenceSystem {
  constructor(caseManager, config = {}) {
    this.caseManager = caseManager;
    this.config = config;
    this.collected = [];
    this.prophecies = [];
    this.prophecyStatus = {};
    this.onProphecyReveal = null;

    this.selectedA = null;
    this.selectedB = null;

    this.selectedCodexEvidenceId = null;
    this.selectedCodexProphecyId = null;
  }

  loadCase(caseData) {
    if (this.config.unlockAllEvidence) {
      this.collected = (caseData.evidencePool || []).map(e => e.id);
    } else {
      this.collected = this.caseManager.getCaseProgress(caseData.id)?.evidenceFound || [];
    }
    this.prophecies = caseData.prophecies || [];
    this.prophecyStatus = {};
    this.prophecies.forEach(p => {
      this.prophecyStatus[p.id] = 'locked';
    });
    this.selectedCodexEvidenceId = null;
    this.selectedCodexProphecyId = null;
  }

  getEvidencePool() {
    const c = this.caseManager.getActiveCase();
    return c ? c.evidencePool : [];
  }

  getCollected() {
    return this.getEvidencePool().filter(e => this.collected.includes(e.id));
  }

  discover(evidenceId) {
    return this.unlock(evidenceId);
  }

  unlock(evidenceId) {
    if (!this.collected.includes(evidenceId)) {
      this.collected.push(evidenceId);
      this.caseManager.recordEvidenceFound(evidenceId);
      
      const ev = this.getById(evidenceId);
      if (ev && ev.type === 'scripture') {
        this._handleScriptureCollected(evidenceId);
      }
      
      return this.getById(evidenceId);
    }
    return null;
  }
  
  _handleScriptureCollected(evidenceId) {
    const caseData = this.caseManager.getActiveCase();
    if (!caseData || !caseData.prophecies) return;
    
    for (const prop of caseData.prophecies) {
      if (prop.scriptureEvidenceId === evidenceId) {
        const currentStatus = this.caseManager.getCodexStatus(prop.id);
        if (currentStatus === 'unseen' || currentStatus === 'rumor') {
          this.caseManager.setCodexStatus(prop.id, 'found_scripture');
        }
        break;
      }
    }
  }

  isCollected(id) {
    return this.collected.includes(id);
  }

  getById(id) {
    return this.getEvidencePool().find(e => e.id === id) || null;
  }

  getProphecyById(prophecyId) {
    return this.prophecies.find(p => p.id === prophecyId);
  }

  getTypeInfo(typeId) {
    return EVIDENCE_TYPES[typeId?.toUpperCase()] || EVIDENCE_TYPES.PHYSICAL;
  }

  revealProphecy(prophecyId) {
    if (prophecyId && this.prophecyStatus[prophecyId] === 'locked') {
      this.prophecyStatus[prophecyId] = 'revealed';
      console.log(`[EvidenceSystem] Prophecy Revealed: ${prophecyId}`);
      // Trigger a UI notification via callback
      if (this.onProphecyReveal) {
        const prophecy = this.getProphecyById(prophecyId);
        if (prophecy) this.onProphecyReveal(prophecy);
      }
      return true;
    }
    return false;
  }

  selectEvidence(evidenceId) {
    const e = this.getById(evidenceId);
    if (!e) return;
    if (this.selectedA && this.selectedA.id === evidenceId) {
      this.selectedA = null;
      return;
    }
    if (this.selectedB && this.selectedB.id === evidenceId) {
      this.selectedB = null;
      return;
    }
    if (!this.selectedA) {
      this.selectedA = e;
    } else if (!this.selectedB) {
      this.selectedB = e;
    } else {
      this.selectedA = e;
    }
  }

  selectForSlot(evidenceId, slot) {
    const e = this.getById(evidenceId);
    if (!e) return;
    if (slot === "A") {
      if (this.selectedB && this.selectedB.id === evidenceId) this.selectedB = null;
      this.selectedA = e;
    } else {
      if (this.selectedA && this.selectedA.id === evidenceId) this.selectedA = null;
      this.selectedB = e;
    }
  }

  deselectAll() {
    this.selectedA = null;
    this.selectedB = null;
  }

  getPropheciesWithStatus() {
    const caseData = this.caseManager.getActiveCase();
    if (!caseData || !caseData.prophecies) return [];
    
    return caseData.prophecies.map(p => {
      const globalStatus = this.caseManager.getCodexStatus(p.id);
      const linked = this.caseManager.getCaseProgress(caseData.id)?.propheciesFound || [];
      const isLinked = linked.includes(p.id);
      
      let status = globalStatus;
      if (isLinked && status !== 'complete') {
        status = 'complete';
      }
      
      return {
        ...p,
        status: status,
        discovered: status !== 'unseen'
      };
    });
  }

  getProphecyCompletionPercent() {
    const pool = this.getPropheciesWithStatus();
    if (pool.length === 0) return 0;
    const discoveredCount = pool.filter(p => p.discovered).length;
    return Math.round((discoveredCount / pool.length) * 100);
  }

  attemptProphecyMatch() {
    if (!this.selectedCodexEvidenceId || !this.selectedCodexProphecyId) return null;
    
    const caseData = this.caseManager.getActiveCase();
    if (!caseData) return null;
    
    const prophecy = caseData.prophecies.find(p => p.id === this.selectedCodexProphecyId);
    if (!prophecy) return null;
    
    const evidence = this.getById(this.selectedCodexEvidenceId);
    if (!evidence) return null;
    
    const caseProgress = this.caseManager.getCaseProgress(caseData.id);
    const collectedIds = caseProgress?.evidenceFound || [];
    
    if (evidence.id === prophecy.scriptureEvidenceId) {
      if (collectedIds.includes(prophecy.fulfillmentEvidenceId)) {
        this.caseManager.setCodexStatus(prophecy.id, 'complete');
        this.caseManager.addResearchPoints(20);
        this.caseManager.recordProphecyFound(prophecy.id);
        return { success: true, message: `Research Complete: ${prophecy.reference}`, researchPoints: 20 };
      } else {
        return { success: false, message: `Find the fulfillment evidence first.` };
      }
    }
    
    if (evidence.id === prophecy.fulfillmentEvidenceId) {
      if (collectedIds.includes(prophecy.scriptureEvidenceId)) {
        this.caseManager.setCodexStatus(prophecy.id, 'complete');
        this.caseManager.addResearchPoints(20);
        this.caseManager.recordProphecyFound(prophecy.id);
        return { success: true, message: `Research Complete: ${prophecy.reference}`, researchPoints: 20 };
      } else {
        return { success: false, message: `Find the scripture fragment first.` };
      }
    }
    
    return { success: false, message: "This evidence is not linked to this prophecy." };
  }
}
