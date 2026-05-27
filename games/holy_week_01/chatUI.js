// ============================================================
// CHAT UI — NPC conversations, dialogue feed
// ============================================================

export class ChatUI {
  constructor(npcSystem, evidenceSystem, accessibility, onAction) {
    this.npcs  = npcSystem;
    this.es    = evidenceSystem;
    this.a11y  = accessibility;
    this.onAction = onAction;
    this.messages = [];
  }

  addMessage(speaker, text, type = "npc", extra = {}) {
    const msg = { speaker, text, type, extra, id: Date.now() };
    this.messages.push(msg);
    this.a11y.speak(`${speaker}: ${text}`);
    return msg;
  }

  addSystem(text) {
    const msg = { speaker: "System", text, type: "system", id: Date.now() };
    this.messages.push(msg);
    return msg;
  }

  renderFeed() {
    if (!this.messages.length) {
      return `<p class="chat-empty" role="status">No conversation yet. Go to NPCs to start talking.</p>`;
    }
    return this.messages.slice(-30).map(m => this._renderMsg(m)).join("");
  }

  _renderMsg(m) {
    const cls = `msg msg-${m.type}`;
    const icon = m.type === "player" ? "🕵️" : m.type === "system" ? "📋" : "🗣";
    return `
      <div class="${cls}" role="listitem" aria-label="${m.speaker}: ${m.text}">
        <span class="msg-speaker" aria-hidden="true">${icon} ${m.speaker}</span>
        <span class="msg-text">${this.a11y.simplify(m.text)}</span>
        ${m.extra?.breakthrough ? `<span class="breakthrough-badge" aria-label="Breakthrough!">⚡ Breakthrough</span>` : ""}
        ${m.extra?.revealedClue ? `<span class="clue-badge" aria-label="New clue found">🔍 New clue found</span>` : ""}
      </div>`;
  }

  renderNPCPanel() {
    const npcs = this.npcs.getNPCs();
    return `
      <div class="npc-list" role="list" aria-label="People to interview">
        ${npcs.map(npc => {
          const state = this.npcs.getState(npc.id);
          const moodColor = this.npcs.getMoodColor(state?.mood || "neutral");
          const moodLabel = this.npcs.getMoodLabel(state?.mood || "neutral");
          return `
            <div class="npc-card" role="listitem">
              <div class="npc-header">
                <span class="npc-avatar" aria-hidden="true">${npc.avatar}</span>
                <div class="npc-info">
                  <span class="npc-name">${npc.name}</span>
                  <span class="npc-role">${npc.role}</span>
                </div>
                <span class="npc-mood" style="color:${moodColor}" aria-label="Mood: ${moodLabel}">${moodLabel}</span>
              </div>
              <div class="npc-actions" role="group" aria-label="Actions with ${npc.name}">
                <button class="npc-btn" data-action="talk" data-npc="${npc.id}" aria-label="Talk to ${npc.name}">
                  💬 Talk
                </button>
                <button class="npc-btn" data-action="show" data-npc="${npc.id}" aria-label="Show evidence to ${npc.name}">
                  🔍 Show Evidence
                </button>
                <button class="npc-btn npc-btn-challenge" data-action="challenge" data-npc="${npc.id}"
                  aria-label="Challenge ${npc.name} with a contradiction"
                  ${!this.es.selectedA || !this.es.selectedB ? "aria-disabled='true'" : ""}>
                  ⚡ Challenge
                </button>
              </div>
              ${state?.pressureLevel > 0 ? `
                <div class="pressure-bar" role="progressbar" aria-valuenow="${state.pressureLevel}" aria-valuemin="0" aria-valuemax="100" aria-label="Pressure level: ${state.pressureLevel}%">
                  <div class="pressure-fill" style="width:${state.pressureLevel}%"></div>
                </div>` : ""}
            </div>`;
        }).join("")}
      </div>

      <div class="show-evidence-picker" id="evidencePicker" aria-label="Evidence to show" hidden>
        <h3>Choose evidence to show:</h3>
        <div class="evidence-pick-list">
          ${this.es.getCollected().map(e => `
            <button class="evidence-pick-btn" data-evidence="${e.id}" aria-label="Show ${e.name}">
              ${e.icon} ${e.name}
            </button>`).join("")}
        </div>
        <button class="cancel-btn" id="cancelShow" aria-label="Cancel">Cancel</button>
      </div>
    `;
  }

  bindNPCEvents(container, feedContainer) {
    let pendingNPC = null;

    container.querySelectorAll("[data-action='talk']").forEach(btn => {
      btn.addEventListener("click", () => {
        const result = this.npcs.talk(btn.dataset.npc);
        if (result) {
          this.addMessage(result.speaker, result.text);
          this._refreshFeed(feedContainer);
        }
      });
    });

    container.querySelectorAll("[data-action='show']").forEach(btn => {
      btn.addEventListener("click", () => {
        pendingNPC = btn.dataset.npc;
        const picker = container.querySelector("#evidencePicker");
        if (picker) { picker.hidden = false; picker.focus(); }
      });
    });

    container.querySelectorAll("[data-action='challenge']").forEach(btn => {
      btn.addEventListener("click", () => {
        if (btn.getAttribute("aria-disabled") === "true") {
          this.a11y.speak("Select two pieces of evidence in the Lab first.");
          return;
        }
        const npcId = btn.dataset.npc;
        const result = this.npcs.challenge(npcId, this.es.selectedA?.id, this.es.selectedB?.id);
        if (result) {
          this.addMessage(result.speaker, result.text, "npc", { breakthrough: result.breakthrough });
          this._refreshFeed(feedContainer);
          if (this.onAction) this.onAction({ type: "challenge", result });
        }
      });
    });

    container.querySelectorAll(".evidence-pick-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        if (!pendingNPC) return;
        const result = this.npcs.showEvidence(pendingNPC, btn.dataset.evidence);
        if (result) {
          this.addMessage(result.speaker, result.text, "npc", { revealedClue: result.revealedClue });
          if (result.revealedClue) {
            this.es.discover(result.revealedClue);
            this.addSystem(`New evidence found: ${this.es.getById(result.revealedClue)?.name}`);
          }
          this._refreshFeed(feedContainer);
          if (this.onAction) this.onAction({ type: "show_evidence", result });
        }
        container.querySelector("#evidencePicker").hidden = true;
        pendingNPC = null;
      });
    });

    container.querySelector("#cancelShow")?.addEventListener("click", () => {
      container.querySelector("#evidencePicker").hidden = true;
      pendingNPC = null;
    });
  }

  _refreshFeed(feedContainer) {
    if (feedContainer) feedContainer.innerHTML = this.renderFeed();
  }
}
