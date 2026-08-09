// ============================================================
// EVIDENCE SYSTEM — Shared collection and discovery logic
// ============================================================

export const EVIDENCE_TYPES = {
  PHYSICAL:      { id: "physical",      label: "Physical",      icon: "🧤", color: "#f59e0b" },
  TESTIMONIAL:   { id: "testimonial",   label: "Testimonial",   icon: "💬", color: "#60a5fa" },
  DIGITAL:       { id: "digital",       label: "Digital",       icon: "💻", color: "#34d399" },
  ENVIRONMENTAL: { id: "environmental", label: "Environmental", icon: "🌿", color: "#a78bfa" },
  ANALYTICAL:    { id: "analytical",    label: "Analytical",    icon: "🔬", color: "#f472b6" },
  PROPHECY:      { id: "prophecy",      label: "Prophecy",      icon: "🔮", color: "#facc15" },
};

export class EvidenceSystem {
  constructor(caseManager) {
    this.caseManager = caseManager;
    this.collected = [];    
    this.selectedA = null;
    this.selectedB = null;
    this.discoveredProphecies = new Set();

    // Codex Matching State
    this.selectedCodexEvidenceId = null;
    this.selectedCodexProphecyId = null;
  }

  loadCase(caseData) {
    const saved = this.caseManager.getCaseProgress(caseData.id);
    this.collected = saved?.evidenceFound ? [...saved.evidenceFound] : [];
    this.discoveredProphecies = new Set(saved?.propheciesFound || []);
    this.selectedA = null;
    this.selectedB = null;
    this.selectedCodexEvidenceId = null;
    this.selectedCodexProphecyId = null;
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
    return this.unlock(evidenceId);
  }

  unlock(evidenceId) {
    if (!this.collected.includes(evidenceId)) {
      this.collected.push(evidenceId);
      this.caseManager.recordEvidenceFound(evidenceId);
      return this.getById(evidenceId);
    }
    return null;
  }

  isCollected(id) {
    return this.collected.includes(id);
  }

  getById(id) {
    return this.getEvidencePool().find(e => e.id === id) || null;
  }

  getProphecyById(id) {
    const pool = this.getProphecyPool();
    return pool.find(p => p.id === id || p.reference === id) || null;
  }

  getTypeInfo(typeId) {
    return EVIDENCE_TYPES[typeId?.toUpperCase()] || EVIDENCE_TYPES.PHYSICAL;
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
      this.selectedB = null;
    }
  }

  deselectAll() {
    this.selectedA = null;
    this.selectedB = null;
  }

  getPropheciesWithStatus() {
    return this.getProphecyPool().map(p => ({
      ...p,
      discovered: this.discoveredProphecies.has(p.id || p.reference)
    }));
  }

  attemptProphecyMatch() {
    if (!this.selectedCodexEvidenceId || !this.selectedCodexProphecyId) return null;
    const ev = this.getById(this.selectedCodexEvidenceId);
    const prop = this.getProphecyById(this.selectedCodexProphecyId);
    const isMatch = ev.relatedProphecy === prop.id || ev.bibleRef?.includes(prop.reference) || ev.propheticLink?.includes(prop.reference);
    if (isMatch) {
      this.caseManager.recordProphecyFound(prop.id || prop.reference);
      return { success: true, message: `Prophecy Linked: ${prop.reference}` };
    }
    return { success: false, message: "This evidence does not fulfill this prophecy." };
  }
}