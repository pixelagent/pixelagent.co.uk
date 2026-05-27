// ============================================================
// EVIDENCE SYSTEM — types, collection, discovery, queries
// ============================================================

export const EVIDENCE_TYPES = {
  PHYSICAL:      { id: "physical",      label: "Physical",      icon: "🧤", color: "#f59e0b" },
  TESTIMONIAL:   { id: "testimonial",   label: "Testimonial",   icon: "💬", color: "#60a5fa" },
  DIGITAL:       { id: "digital",       label: "Digital",       icon: "💻", color: "#34d399" },
  ENVIRONMENTAL: { id: "environmental", label: "Environmental", icon: "🌿", color: "#a78bfa" },
  ANALYTICAL:    { id: "analytical",    label: "Analytical",    icon: "🔬", color: "#f472b6" },
};

export class EvidenceSystem {
  constructor(caseManager) {
    this.caseManager = caseManager;
    this.collected = [];    // evidence IDs found this session
    this.selectedA = null;
    this.selectedB = null;
  }

  loadCase(caseData) {
    const saved = this.caseManager.getCaseProgress(caseData.id);
    this.collected = saved?.evidenceFound ? [...saved.evidenceFound] : [];
    this.selectedA = null;
    this.selectedB = null;
  }

  getEvidencePool() {
    const c = this.caseManager.getActiveCase();
    return c ? c.evidencePool : [];
  }

  getCollected() {
    return this.getEvidencePool().filter(e => this.collected.includes(e.id));
  }

  getUndiscovered() {
    return this.getEvidencePool().filter(e => !this.collected.includes(e.id));
  }

  discover(evidenceId) {
    if (!this.collected.includes(evidenceId)) {
      this.collected.push(evidenceId);
      this.caseManager.recordEvidenceFound(evidenceId);
      return this.getById(evidenceId);
    }
    return null;
  }

  getById(id) {
    return this.getEvidencePool().find(e => e.id === id) || null;
  }

  selectEvidence(evidenceId) {
    const e = this.getById(evidenceId);
    if (!e) return;
    if (!this.selectedA || (this.selectedA && this.selectedB)) {
      this.selectedA = e;
      this.selectedB = null;
    } else {
      this.selectedB = e;
    }
  }

  deselectAll() {
    this.selectedA = null;
    this.selectedB = null;
  }

  getTypeInfo(typeId) {
    return EVIDENCE_TYPES[typeId.toUpperCase()] || EVIDENCE_TYPES.PHYSICAL;
  }

  // Returns evidence grouped by type (for display)
  getCollectedByType() {
    const groups = {};
    this.getCollected().forEach(e => {
      const type = e.type || "physical";
      if (!groups[type]) groups[type] = [];
      groups[type].push(e);
    });
    return groups;
  }

  getCompletionPercent() {
    const pool = this.getEvidencePool();
    if (!pool.length) return 0;
    return Math.round((this.collected.length / pool.length) * 100);
  }
}
