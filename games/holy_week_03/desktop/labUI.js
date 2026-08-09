import { OPERATIONS } from "../js/gameplay/deductionEngine.js";

export class LabUI {
  constructor(deductionEngine, evidenceSystem, accessibility, onResult) {
    this.de = deductionEngine;
    this.es = evidenceSystem;
    this.a11y = accessibility;
    this.onResult = onResult;
  }

  _iconMarkup(icon) {
    if (!icon) return '';
    if (String(icon).includes('<img')) return String(icon);
    if (String(icon).endsWith('.svg')) return `<img src="${icon}" class="icon-svg" loading='lazy'>`;
    return String(icon);
  }

  render() {
    const deductions = this.de.getDeductions ? this.de.getDeductions() : (this.de.deductions || []);
    const historyList = deductions.slice().reverse();

    return `
      <div class="lab-panel" role="region" aria-label="Investigation Lab">

        <div class="lab-actions" role="group" aria-label="Analysis operations">
          ${Object.values(OPERATIONS).map(op => `
            <button class="lab-btn" data-op="${op.id}" aria-label="${op.label}: ${op.desc}" ${!this.de.canOperate() ? "aria-disabled='true'" : ""}>
              <span class="lab-btn-icon" aria-hidden="true">${op.icon}</span>
              <span class="lab-btn-label">${op.label}</span>
            </button>`).join("")}
        </div>

        <div class="lab-divider" aria-hidden="true"></div>


        <div class="lab-slots" aria-label="Selected evidence slots">
          <div class="lab-slot" id="slotA" aria-label="Evidence slot A: ${this.es.selectedA?.name || 'empty'}" role="status">
            ${this.es.selectedA
        ? `<span class="slot-icon">${this._iconMarkup(this.es.selectedA.icon)}</span><span class="slot-name">${this.es.selectedA.name}</span>`
        : `<span class="slot-empty">Tap evidence below</span>`}
          </div>
          <div class="lab-slot-divider" aria-hidden="true">+</div>
          <div class="lab-slot" id="slotB" aria-label="Evidence slot B: ${this.es.selectedB?.name || 'empty'}" role="status">
            ${this.es.selectedB
        ? `<span class="slot-icon">${this._iconMarkup(this.es.selectedB.icon)}</span><span class="slot-name">${this.es.selectedB.name}</span>`
        : `<span class="slot-empty">Tap second clue</span>`}
          </div>
        </div>


        <div id="lab-result" class="lab-result" role="status" aria-live="polite">
          <span class="result-placeholder">Select two clues, then choose an operation.</span>
        </div>

        <div id="lab-result-modal" class="lab-result-modal" hidden role="dialog" aria-modal="true" aria-label="Deduction result">
          <div class="lab-result-modal-backdrop"></div>
          <div class="lab-result-modal-card">
            <h3 class="section-title">Action Unlocked</h3>
            <p class="result-text"></p>
            <p class="result-insight"></p>
            <p class="lab-modal-score"></p>
            <button class="evidence-detail-confirm">Confirm</button>
          </div>
        </div>

        <div class="lab-history" role="region" aria-label="Previous deductions">
          <h3 class="lab-history-title">Deductions (${deductions.length})</h3>
          <div class="lab-history-list">
            ${deductions.length === 0 ? `<p class="lab-empty">No deductions yet.</p>` : historyList.map(d => `
                  <div class="deduction-entry ${d.isKeyDeduction ? 'key' : ''}" role="listitem">
                    <span class="deduction-op" aria-hidden="true">${OPERATIONS[d.operation?.toUpperCase()]?.icon || "🔍"}</span>
                    <span class="deduction-text">${this.a11y.simplify(d.text)}</span>
                    ${d.isKeyDeduction ? `<span class="key-badge" aria-label="Key deduction">★</span>` : ""}
                    ${d.a && d.b ? `
                    <div class="deduction-evidence-tags">
                      <span class="evidence-tag-badge">${d.aIcon || ''}\u00A0${d.a}</span>
                      <span class="evidence-tag-badge">${d.bIcon || ''}\u00A0${d.b}</span>
                    </div>` : ""}
                  </div>`).join("")}
          </div>
        </div>
      </div>

      <div class="lab-evidence-picker" role="region" aria-label="Evidence to select">
        <h3 class="picker-title">Your Evidence</h3>
        <div class="picker-grid">
          ${this.es.getCollected().map(e => {
          const isA = this.es.selectedA?.id === e.id;
          const isB = this.es.selectedB?.id === e.id;
          const selected = isA || isB;
          return `
              <button class="picker-card ${isA ? 'selected-a' : ''} ${isB ? 'selected-b' : ''}" data-evidence-id="${e.id}"
                aria-label="${e.name}: ${e.desc || e.description || ''}. ${selected ? (isA ? 'Selected as A' : 'Selected as B') : 'Tap to select'}"
                aria-pressed="${selected ? 'true' : 'false'}">
                <span class="picker-icon" aria-hidden="true">${this._iconMarkup(e.icon || e.emoji)}</span>
                <span class="picker-name">${this._iconMarkup(e.icon || e.emoji)} ${e.name}</span>
                ${isA ? `<span class="sel-badge" aria-hidden="true">A</span>` : ""}
                ${isB ? `<span class="sel-badge" aria-hidden="true">B</span>` : ""}
              </button>`;
        }).join("")}
          ${this.es.getCollected().length === 0 ? `<p class="picker-empty">Collect evidence from the scene first.</p>` : ""}
        </div>
      </div>`;
  }

bindEvents(container) {
     this._container = container;
     container.querySelectorAll("[data-op]").forEach(btn => {
       btn.addEventListener("click", () => {
         if (btn.getAttribute("aria-disabled") === "true") {
           this.a11y.speak("Select two pieces of evidence first.");
           return;
         }
         const result = this.de.operate(btn.dataset.op);
         this._showResult(container, result);
         this.a11y.speak(result.text);
         if (this.onResult) this.onResult(result);
       });
     });

     container.querySelectorAll("[data-evidence-id]").forEach(card => {
       card.addEventListener("click", (e) => {
         const id = card.dataset.evidenceId;
         if (e.shiftKey || e.ctrlKey || e.metaKey) { window.openEvidenceDetail?.(id); return; }
         this.es.selectEvidence(id);
         this.a11y.speak(`Selected ${card.querySelector(".picker-name").textContent}`);
         if (this._container) {
           this._container.innerHTML = this.render();
           this.bindEvents(this._container);
         }
         if (this.onResult) this.onResult({ type: "selection" });
       });
     });
   }

  _showResult(container, result) {
    const el = container.querySelector("#lab-result");
    if (!el) return;
    if (result.error) { el.innerHTML = `<span class="result-error">${result.error}</span>`; return; }
    el.innerHTML = `<div class="result-content ${result.isKeyDeduction ? 'result-key' : ''}">
      <p class="result-text">${this.a11y.simplify(result.text)}</p>
      ${result.insight ? `<p class="result-insight">💡 ${this.a11y.simplify(result.insight)}</p>` : ""}
    </div>`;
    this._showResultModal(container, result);
  }

  _showResultModal(container, result) {
    const modal = container.querySelector("#lab-result-modal");
    if (!modal) return;
    const textEl = modal.querySelector(".result-text");
    const insightEl = modal.querySelector(".result-insight");
    const scoreEl = modal.querySelector(".lab-modal-score");
    const confirmBtn = modal.querySelector(".evidence-detail-confirm");
    if (textEl) textEl.textContent = result.text || "";
    if (insightEl) insightEl.innerHTML = result.insight ? `💡 ${result.insight}` : "";
    if (scoreEl) scoreEl.textContent = `⭐ +${result.score || 0} score`;
    modal.hidden = false;
    confirmBtn.onclick = () => { modal.hidden = true; };
  }
}