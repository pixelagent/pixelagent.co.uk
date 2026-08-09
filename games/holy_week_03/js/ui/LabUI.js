import { OPERATIONS } from "../gameplay/deductionEngine.js";

export class LabUI {
  constructor(deductionEngine, evidenceSystem, accessibility, onResult) {
    this.de = deductionEngine;
    this.es = evidenceSystem;
    this.a11y = accessibility;
    this.onResult = onResult;
    this.activeModalResult = null;
  }

  render() {
    const deductions = this.de.getDeductions ? this.de.getDeductions() : (this.de.deductions || []);
    const historyList = deductions.slice().reverse();
    const evidence = this.es.getCollected();

    return `
      <div class="lab-panel" role="region" aria-label="Investigation Lab">
        <h3 class="section-title">Deduction Lab</h3>
        <div class="prophecy-lab-intro">
          <span>Select two clues, then choose an operation.</span>
        </div>

        <div class="lab-actions" role="group" aria-label="Analysis operations">
          ${Object.values(OPERATIONS).map(op => `
            <button class="lab-btn" data-op="${op.id}" aria-label="${op.label}: ${op.desc}" ${!this.de.canOperate() ? "aria-disabled='true'" : ""}>
              <span class="lab-btn-icon" aria-hidden="true">${op.icon}</span>
              <span class="lab-btn-label">${op.label}</span>
            </button>`).join("")}
        </div>

        

        <div class="lab-selection-summary">
          <div class="lab-slot-badge ${this.es.selectedA ? 'filled' : 'empty'}" aria-label="First clue: ${this.es.selectedA?.name || 'not selected'}">
            ${this.es.selectedA
              ? `<span class="slot-icon"><img src='${this.es.selectedA.icon}' class='icon-svg' loading='lazy'></span><span class="slot-name">${this.es.selectedA.name}</span>`
              : `<span class="slot-empty">First clue...</span>`}
          </div>
          <div class="lab-slot-badge ${this.es.selectedB ? 'filled' : 'empty'}" aria-label="Second clue: ${this.es.selectedB?.name || 'not selected'}">
            ${this.es.selectedB
              ? `<span class="slot-icon"><img src='${this.es.selectedB.icon}' class='icon-svg' loading='lazy'></span><span class="slot-name">${this.es.selectedB.name}</span>`
              : `<span class="slot-empty">Second clue...</span>`}
          </div>
        </div>

        <div class="picker-grid">
          ${evidence.map(e => {
            const isA = this.es.selectedA?.id === e.id;
            const isB = this.es.selectedB?.id === e.id;
            return `
              <button class="picker-card ${isA ? 'selected-a' : ''} ${isB ? 'selected-b' : ''}" data-evidence-id="${e.id}"
                aria-label="${e.name}: ${e.desc || e.description || ''}. ${isA ? 'Selected as first clue' : isB ? 'Selected as second clue' : 'Tap to select as clue'}"
                aria-pressed="${isA || isB}">
                <span class="picker-icon" aria-hidden="true"><img src='${e.icon}' class='icon-svg' loading='lazy'></span>
                <span class="picker-name">${e.name}</span>
                ${isA ? `<span class="sel-badge" aria-hidden="true" style="background:var(--blue)">A</span>` : ""}
                ${isB ? `<span class="sel-badge" aria-hidden="true" style="background:var(--gold)">B</span>` : ""}
              </button>`;
          }).join("")}
          ${evidence.length === 0 ? `<p class="picker-empty">Collect evidence from the scene first.</p>` : ""}
        </div>

   

        <div id="lab-result" class="lab-result" role="status" aria-live="polite">
          <span class="result-placeholder">Select two clues, then choose an operation.</span>
        </div>

        <div class="lab-result-modal" data-lab-result-modal hidden role="dialog" aria-modal="true" aria-label="Deduction result" style="position:fixed;inset:0;z-index:7000;align-items:center;justify-content:center;padding:20px;">
          <div class="lab-result-modal-backdrop" data-lab-modal-close style="position:absolute;inset:0;background:rgba(0,0,0,0.6);"></div>
          <div class="lab-result-modal-card" style="position:relative;z-index:1;background:var(--surface2,#1b2230);border:1px solid var(--border,#2e3a50);border-radius:12px;padding:20px;max-width:560px;width:100%;display:flex;flex-direction:column;gap:12px;box-shadow:0 10px 30px rgba(0,0,0,0.35);">
            <h3 class="section-title" style="margin:0;">Deduction Logged</h3>
            ${this.activeModalResult ? `
              <p class="result-text" style="margin:0;line-height:1.5;">${this.a11y.simplify(this.activeModalResult.text || "")}</p>
              ${this.activeModalResult.revealsProphecy ? (() => {
                const p = this.es.getProphecyById(this.activeModalResult.revealsProphecy);
                return p ? `<p class="result-prophecy" style="margin:0;line-height:1.5;"><img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'> <strong>Prophecy Revealed:</strong> ${p.reference} — "${this.a11y.simplify(p.text.substring(0, 160))}${p.text.length > 160 ? '...' : ''}"</p>` : '';
              })() : ""}
              ${this.activeModalResult.insight ? `<p class="result-insight" style="margin:0;line-height:1.5;"><img src='../assets/gfx/sparkles-duotone.svg' class='icon-svg' loading='lazy'> ${this.a11y.simplify(this.activeModalResult.insight)}</p>` : ""}
              <p class="lab-modal-score" style="margin:0;font-weight:700;">⭐ +${this.activeModalResult.score || 0} score</p>
              <p class="lab-modal-note" style="margin:0;opacity:0.9;">Saved in the Deductions history below.</p>
            ` : ""}
            <div class="lab-modal-actions" style="display:flex;justify-content:flex-end;margin-top:4px;">
              <button class="evidence-detail-confirm" data-lab-modal-close style="min-width:140px;">Confirm</button>
            </div>
          </div>
        </div>

        <div class="lab-history" role="region" aria-label="Previous deductions">
          <h3 class="lab-history-title">Deductions (${deductions.length})</h3>
          <div class="lab-history-list">
            ${deductions.length === 0 ? `<p class="lab-empty">No deductions yet.</p>` : historyList.map(d => `
                  <div class="deduction-entry ${d.isKeyDeduction ? 'key' : ''}" role="listitem">
                    <span class="deduction-op" aria-hidden="true">${OPERATIONS[d.operation?.toUpperCase()]?.icon || "<img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'>"}</span>
                    <span class="deduction-text">${this.a11y.simplify(d.text)}</span>
                    ${d.isKeyDeduction ? `<span class="key-badge" aria-label="Key deduction"><img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'></span>` : ""}
                    ${d.a && d.b ? `
                    <div class="deduction-evidence-tags">
                      <span class="evidence-tag-badge">${d.aIcon || ''}\u00A0${d.a}</span>
                      <span class="evidence-tag-badge">${d.bIcon || ''}\u00A0${d.b}</span>
                    </div>` : ""}
                  </div>`).join("")}
          </div>
        </div>
      </div>`;
  }

  bindEvents(container) {
    container.querySelectorAll("[data-op]").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.getAttribute("aria-disabled") === "true") {
          this.a11y.speak("Select two pieces of evidence first.");
          return;
        }
        const result = this.de.operate(btn.dataset.op);
        this._showResult(container, result);
        if (!result.error) {
          this.activeModalResult = result;
        }
        this.a11y.speak(result.error || result.text);
        if (this.onResult) this.onResult(result);
      });
    });

    container.querySelectorAll("[data-evidence-id]").forEach(card => {
      card.addEventListener("click", (e) => {
        const id = card.dataset.evidenceId;
        if (e.shiftKey || e.ctrlKey || e.metaKey) { window.openEvidenceDetail?.(id); return; }
        this.es.selectEvidence(id);
        this.a11y.speak(`Selected ${card.querySelector(".picker-name").textContent} as clue`);
        if (this.onResult) this.onResult({ type: "selection" });
      });
    });

    if (!container.dataset.labModalBound) {
      container.dataset.labModalBound = "1";
      container.addEventListener("click", (e) => {
        const closeBtn = e.target.closest("[data-lab-modal-close]");
        if (closeBtn) {
          this._hideModal(container);
        }
      });
    }
  }

  _showResult(container, result) {
    const el = container.querySelector("#lab-result");
    if (!el) return;
    if (result.error) { el.innerHTML = `<span class="result-error">${result.error}</span>`; return; }
    let prophecyHtml = "";
    if (result.revealsProphecy) {
      const prophecy = this.es.getProphecyById(result.revealsProphecy);
      if (prophecy) {
        const currentStatus = this.cm.getCodexStatus(result.revealsProphecy);
        if (currentStatus === 'unseen') {
          this.cm.setCodexStatus(result.revealsProphecy, 'rumor');
        }
        prophecyHtml = `<p class="result-prophecy"><img src='../assets/gfx/chat-duotone.svg' class='icon-svg' loading='lazy'> <strong>New Rumor:</strong> ${prophecy.reference} — "${prophecy.text.substring(0, 120)}${prophecy.text.length > 120 ? '...' : ''}"</p>`;
      }
    }
    el.innerHTML = `<div class="result-content ${result.isKeyDeduction ? 'result-key' : ''}">
      <p class="result-text">${this.a11y.simplify(result.text)}</p>
      ${prophecyHtml}
      ${result.insight ? `<p class="result-insight"><img src='../assets/gfx/sparkles-duotone.svg' class='icon-svg' loading='lazy'> ${this.a11y.simplify(result.insight)}</p>` : ""}
    </div>`;
  }

  _showModal(container) {
    const modal = container.querySelector("[data-lab-result-modal]");
    if (modal) {
      modal.hidden = false;
      modal.style.display = "flex";
    }
  }

  showActiveResultModal(container) {
    if (!this.activeModalResult || !container) return;
    this._showModal(container);
  }

  _hideModal(container) {
    this.activeModalResult = null;
    const modal = container.querySelector("[data-lab-result-modal]");
    if (modal) {
      modal.hidden = true;
      modal.style.display = "none";
    }
  }
}
