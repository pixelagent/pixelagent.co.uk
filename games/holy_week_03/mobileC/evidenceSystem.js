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
};

export class EvidenceSystem {
  constructor(caseManager) {
    this.caseManager = caseManager;
    this.collected = [];    
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

  getProphecyPool() {
    const c = this.caseManager.getActiveCase();
    return c ? (c.prophecies || []) : [];
  }

  getCollected() {
    return this.getEvidencePool().filter(e => this.collected.includes(e.id));
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

  // Looks up display info (label/icon/color) for an evidence type id (e.g. "physical").
  // Falls back to a generic entry instead of returning undefined, so callers that read
  // typeInfo.label / typeInfo.icon never crash on an unrecognized or missing type.
  getTypeInfo(type) {
    const key = typeof type === "string" ? type.toUpperCase() : "";
    return EVIDENCE_TYPES[key] || { id: type, label: type || "Unknown", icon: '../assets/gfx/magnifying-glass-duotone.svg', color: "#94a3b8" };
  }

  getProphecyById(id) {
    const pool = this.getProphecyPool();
    return pool.find(p => p.id === id || p.reference === id) || null;
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
    const c = this.caseManager.getActiveCase();
    const found = this.caseManager.getCaseProgress(c?.id)?.propheciesFound || [];
    return this.getProphecyPool().map(p => ({
      ...p,
      discovered: found.includes(p.id || p.reference)
    }));
  }

  getProphecyCompletionPercent() {
    const pool = this.getPropheciesWithStatus();
    if (pool.length === 0) return 0;
    const discoveredCount = pool.filter(p => p.discovered).length;
    return Math.round((discoveredCount / pool.length) * 100);
  }
}