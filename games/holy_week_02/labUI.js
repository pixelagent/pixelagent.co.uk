// ============================================================
// LAB UI — tap-to-select reasoning interface
// ============================================================
import { OPERATIONS } from "./deductionEngine.js";

export class LabUI {
  constructor(deductionEngine, evidenceSystem, accessibility, onResult) {
    this.de = deductionEngine;
    this.es = evidenceSystem;
    this.a11y = accessibility;
    this.onResult = onResult;
  }

  render() {
    return `
      <div class="lab-panel" role="region" aria-label="Investigation Lab">

        <div class="lab-slots" aria-label="Selected evidence slots">
          <div class="lab-slot" id="slotA" aria-label="Evidence slot A: ${this.es.selectedA?.name || 'empty'}" role="status">
            ${this.es.selectedA
        ? `<span class="slot-icon">${this.es.selectedA.icon}</span><span class="slot-name">${this.es.selectedA.name}</span>`
        : `<span class="slot-empty">Tap evidence below</span>`}
          </div>
          <div class="lab-slot-divider" aria-hidden="true">+</div>
          <div class="lab-slot" id="slotB" aria-label="Evidence slot B: ${this.es.selectedB?.name || 'empty'}" role="status">
            ${this.es.selectedB
        ? `<span class="slot-icon">${this.es.selectedB.icon}</span><span class="slot-name">${this.es.selectedB.name}</span>`
        : `<span class="slot-empty">Tap second clue</span>`}
          </div>
        </div>

        <div class="lab-actions" role="group" aria-label="Analysis operations">
          ${Object.values(OPERATIONS).map(op => `
            <button
              class="lab-btn"
              data-op="${op.id}"
              aria-label="${op.label}: ${op.desc}"
              ${!this.de.canOperate() ? "aria-disabled='true'" : ""}
            >
              <span class="lab-btn-icon" aria-hidden="true">${op.icon}</span>
              <span class="lab-btn-label">${op.label}</span>
            </button>
          `).join("")}
        </div>

        <div
          id="lab-result"
          class="lab-result"
          role="status"
          aria-live="polite"
          aria-label="Analysis result"
        >
          <span class="result-placeholder">Select two clues, then choose an operation.</span>
        </div>

        <div class="lab-history" role="region" aria-label="Previous deductions">
          <h3 class="lab-history-title">Deductions (${this.de.getDeductions().length})</h3>
          ${this.de.getDeductions().length === 0
        ? `<p class="lab-empty">No deductions yet.</p>`
        : this.de.getDeductions().slice(-3).reverse().map(d => `
              <div class="deduction-entry ${d.isKeyDeduction ? 'key' : ''}" role="listitem">
                <span class="deduction-op" aria-hidden="true">${OPERATIONS[d.operation?.toUpperCase()]?.icon || "🔍"}</span>
                <span class="deduction-text">${this.a11y.simplify(d.text)}</span>
                ${d.isKeyDeduction ? `<span class="key-badge" aria-label="Key deduction">★</span>` : ""}
              </div>`).join("")}
        </div>

      </div>

      <div class="lab-evidence-picker" role="region" aria-label="Evidence to select for lab">
        <h3 class="picker-title">Your Evidence</h3>
        <div class="picker-grid">
          ${this.es.getCollected().map(e => {
          const isA = this.es.selectedA?.id === e.id;
          const isB = this.es.selectedB?.id === e.id;
          const selected = isA || isB;
          return `
              <button
                class="picker-card ${isA ? 'selected-a' : ''} ${isB ? 'selected-b' : ''}"
                data-evidence-id="${e.id}"
                aria-label="${e.name}: ${e.desc}. ${selected ? (isA ? 'Selected as A' : 'Selected as B') : 'Tap to select'}"
                aria-pressed="${selected}"
              >
                <span class="picker-icon" aria-hidden="true">${e.icon}</span>
                <span class="picker-name">${e.name}</span>
                ${isA ? `<span class="sel-badge" aria-hidden="true">A</span>` : ""}
                ${isB ? `<span class="sel-badge" aria-hidden="true">B</span>` : ""}
              </button>`;
        }).join("")}
          ${this.es.getCollected().length === 0
        ? `<p class="picker-empty">Collect evidence from the scene first.</p>` : ""}
        </div>
      </div>
    `;
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
        this.a11y.speak(result.text);
        if (this.onResult) this.onResult(result);
      });
      btn.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") btn.click(); });
    });

    container.querySelectorAll("[data-evidence-id]").forEach(card => {
      card.addEventListener("click", () => {
        this.es.selectEvidence(card.dataset.evidenceId);
        this.a11y.speak(`Selected ${card.querySelector(".picker-name").textContent}`);
        if (this.onResult) this.onResult({ type: "selection" });
      });
      card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") card.click(); });
    });
  }

  _showResult(container, result) {
    const el = container.querySelector("#lab-result");
    if (!el) return;
    if (result.error) {
      el.innerHTML = `<span class="result-error">${result.error}</span>`;
      return;
    }
    el.innerHTML = `
      <div class="result-content ${result.isKeyDeduction ? 'result-key' : ''}">
        <p class="result-text">${this.a11y.simplify(result.text)}</p>
        ${result.insight ? `<p class="result-insight">💡 ${this.a11y.simplify(result.insight)}</p>` : ""}
        ${result.isKeyDeduction ? `<p class="result-key-badge">★ Key Deduction</p>` : ""}
      </div>
    `;
  }
}
