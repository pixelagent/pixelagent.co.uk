import { DIALOGUE_ID_MAP } from "../js/gameplay/dialogueMaps.js";

export class ChatUI {
  constructor(npcSystem, evidenceSystem, accessibility, onAction, audioManager, dialogueManager) {
    this.npcs = npcSystem;
    this.es = evidenceSystem;
    this.a11y = accessibility;
    this.onAction = onAction;
    this.audio = audioManager;
    this.dm = dialogueManager;
    this.messagesByNPC = {};
    this.challengeResultsByNPC = {};
  }

  addMessage(speaker, text, type = "npc", extra = {}, npcId = null) {
    const targetNPC = npcId || this.pendingNPC;
    const msg = { speaker, text, type, extra, id: Date.now() };
    if (targetNPC) {
      if (!this.messagesByNPC[targetNPC]) this.messagesByNPC[targetNPC] = [];
      this.messagesByNPC[targetNPC].push(msg);
    }
    this.a11y.speak(`${speaker}: ${text}`);
    return msg;
  }

  addSystem(text, npcId = null) {
    return this.addMessage("System", text, "system", {}, npcId);
  }

  _renderMsg(m) {
    const cls = `msg msg-${m.type}`;
    const icons = { player: "🕵️", system: "<img src='../assets/gfx/clipboard-duotone.svg' class='icon-svg' loading='lazy'>", verdict: "<img src='../assets/gfx/balance-scale-duotone.svg' class='icon-svg' loading='lazy'>" };
    const icon = icons[m.type] || "🗣";
    return `
      <div class="${cls}" role="listitem" aria-label="${m.speaker}: ${m.text}">
        <span class="msg-speaker-badge" aria-hidden="true">${icon} ${m.speaker}</span>
        <span class="msg-text">${this.a11y.simplify(m.text)}</span>
        <div class="msg-badges">
          ${m.extra?.evidenceTag ? `<span class="evidence-tag-badge ${m.extra.isKey ? 'key' : ''}">${m.extra.evidenceTag} ${m.extra.evidenceName || ''}</span>` : ""}
          ${m.extra?.breakthrough ? `<span class="breakthrough-badge">⚡ Breakthrough</span>` : ""}
          ${m.extra?.revealedClue ? `<span class="clue-badge"><img src='..assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'> New clue</span>` : ""}
          ${m.extra?.revealedProphecy ? `<span class="prophecy-badge">🔮 Prophecy Revealed</span>` : ""}
        </div>
        ${m.type === 'verdict' ? this._renderVerdict(m.extra.result) : ""}
      </div>`;
  }

  _renderVerdict(res) {
    const s = res.score;
    return `
      <div class="verdict-card ${res.correct ? 'verdict-correct' : 'verdict-wrong'}">
        <div class="verdict-header">${res.correct ? "<img src='../assets/gfx/trophy-duotone.svg' class='icon-svg' loading='lazy'> CASE SOLVED" : "<img src='../assets/gfx/x-circle-duotone.svg' class='icon-svg' loading='lazy'> INCORRECT ACCUSATION"}</div>
        <div class="verdict-score-grid">
          <div class="score-row"><span>💡 Deductions:</span> <span>+${s.breakdown?.deductionScore || s.deduction}</span></div>
          <div class="score-row"><span><img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'> Evidence:</span> <span>+${s.breakdown?.evidenceScore || s.evidence}</span></div>
          <div class="score-total"><span>⭐ Total Score:</span> <span>${s.total}</span></div>
        </div>
      </div>`;
  }

  renderNPCPanel() {
    const npcs = this.npcs.getNPCs().filter(npc => npc.hasDialogue !== false);
    return `
      <div class="npc-list" role="list">
        ${npcs.map(npc => {
          const state = this.npcs.getState(npc.id);
          const moodColor = this.npcs.getMoodColor(state?.mood || "neutral");
          const moodLabel = this.npcs.getMoodLabel(state?.mood || "neutral");
          return `
            <div class="npc-card">
              <div class="npc-header">
                <span class="npc-avatar">${this._iconMarkup(npc.avatar)}</span>
                <div class="npc-info"><span class="npc-name">${npc.name}</span></div>
                <span class="npc-mood" style="color:${moodColor}">${moodLabel}</span>
              </div>
              <div class="npc-feed" role="log" aria-live="polite">${this.messagesByNPC[npc.id]?.map(m => this._renderMsg(m)).join("") || ""}</div>
              <div class="npc-actions">
                <button class="npc-btn" data-action="talk" data-npc="${npc.id}"><img src='../assets/gfx/chat-duotone.svg' class='icon-svg' loading='lazy'> Talk</button>
                <button class="npc-btn" data-action="show" data-npc="${npc.id}"><img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'> Evidence</button>
                <button class="npc-btn" data-action="challenge" data-npc="${npc.id}" ${!this.es.selectedA ? "aria-disabled='true'" : ""}>⚡ Challenge</button>
              </div>
              <div class="challenge-result" data-npc-challenge="${npc.id}" ${this.challengeResultsByNPC[npc.id] ? '' : 'hidden'}>
                ${this.challengeResultsByNPC[npc.id] || ''}
              </div>
              <div class="show-evidence-picker" data-npc-picker="${npc.id}" hidden>
                <h3>Select evidence to show:</h3>
                <div class="evidence-pick-list">
                  ${this.es.getCollected().map(e => `<button class="evidence-pick-btn" data-evidence="${e.id}" data-npc="${npc.id}">${this._iconMarkup(e.icon)} ${e.name}</button>`).join("")}
                </div>
                <button class="cancel-btn" data-npc="${npc.id}">Cancel</button>
              </div>
            </div>`;
        }).join("")}
      </div>`;
  }

  _iconMarkup(icon) {
    if (!icon) return '';
    if (String(icon).includes('<img')) return String(icon);
    if (String(icon).endsWith('.svg')) return `<img src="${icon}" class="icon-svg" loading='lazy'>`;
    return String(icon);
  }

  bindNPCEvents(container) {
    let pendingNPC = null;
    let pendingSelection = [];

    container.querySelectorAll("[data-action='talk']").forEach(btn => {
      btn.addEventListener("click", () => {
        const npcId = btn.dataset.npc;
        const npc = this.npcs.getNPC(npcId);

        const handleUnlocks = () => {
          let count = 0;

          if (Array.isArray(npc?.unlocksEvidence)) {
            npc.unlocksEvidence.forEach(id => {
              const alreadyCollected = typeof this.es.isCollected === "function" ? this.es.isCollected(id) : false;
              if (alreadyCollected) return;
              const discovered = this.es.discover(id);
              const evidence = discovered || (typeof this.es.getById === "function" ? this.es.getById(id) : null); 
              this.addSystem(`<img src='../assets/gfx/lock-open-duotone.svg' class='icon-svg' loading='lazy'> New clue: ${evidence?.name || id}`, npcId);
              count++;
            });
          }

          if (Array.isArray(npc?.unlocksSuspects)) {
            npc.unlocksSuspects.forEach(suspectId => {
              const wasUnlocked = typeof this.npcs.caseManager?.isSuspectUnlocked === "function"
                ? this.npcs.caseManager.isSuspectUnlocked(suspectId)
                : !!this.npcs.getState?.(suspectId)?.isSuspectUnlocked;

              if (typeof this.npcs.unlockSuspect === "function") {
                this.npcs.unlockSuspect(suspectId);
              } else if (typeof this.npcs.caseManager?.unlockSuspect === "function") {
                this.npcs.caseManager.unlockSuspect(suspectId);
              }
              if (this.onAction) this.onAction({ type: "reveal_suspect", suspectId, npcId });

              const isUnlocked = typeof this.npcs.caseManager?.isSuspectUnlocked === "function"
                ? this.npcs.caseManager.isSuspectUnlocked(suspectId)
                : !!this.npcs.getState?.(suspectId)?.isSuspectUnlocked;
              if (!isUnlocked || wasUnlocked) return;

              const suspect = this.npcs.getNPC(suspectId);
              this.addSystem(`<img src='../assets/gfx/balance-scale-duotone.svg' class='icon-svg' loading='lazy'> New suspect identified: ${suspect ? suspect.name : suspectId}`, npcId);
              count++;
            });
          }

          return count;
        };

        const loadedStory = this.dm.getStory(npcId);
        if (this.dm && npc && loadedStory) {
          const story = this.dm.createStory(npcId);
          this.dm.openDialogue(npc, story,
            () => {
              const unlocked = handleUnlocks();
              if (this.onAction) this.onAction({ type: "talk_complete", npcId, unlocked });
              this._refreshNPCFeed(npcId, container);
            },
            (text, type) => this.addMessage(type === 'player' ? 'Investigator' : npc.name, text, type, {}, npcId)
          );
        } else {
          const talkFn =
            (typeof this.npcs.talkProgressive === "function" && this.npcs.talkProgressive.bind(this.npcs)) ||
            (typeof this.npcs.talk === "function" && this.npcs.talk.bind(this.npcs));
          const result = talkFn ? talkFn(npcId) : null;
          if (result) {
            const unlocked = handleUnlocks();
            this.addMessage(result.speaker, result.text, "npc", { wasCorrected: result.wasCorrected }, npcId);
            this._refreshNPCFeed(npcId, container);
            if (this.onAction) this.onAction({ type: "talk_complete", npcId, unlocked });
          }
        }
      });
    });

    container.querySelectorAll("[data-action='show']").forEach(btn => {
      btn.addEventListener("click", () => {
        pendingNPC = btn.dataset.npc;
        pendingSelection = [];
        container.querySelectorAll(".show-evidence-picker").forEach(p => p.hidden = true);
        const picker = btn.closest(".npc-card").querySelector("[data-npc-picker]");
        if (picker) picker.hidden = false;
      });
    });

    container.querySelectorAll(".evidence-pick-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const npcId = btn.dataset.npc;
        const evId = btn.dataset.evidence;
        const result = this.npcs.showEvidence(npcId, evId);
        if (result) {
          const evidence = this.es.getById(evId);
          this.addMessage(result.speaker, result.text, "npc", { 
            revealedClue: result.revealedClue,
            revealedProphecy: result.revealedProphecy, 
            evidenceTag: this._iconMarkup(evidence?.icon || "../assets/gfx/magnifying-glass-duotone.svg"),
            evidenceName: evidence?.name
          }, npcId);
        }
        this._refreshNPCFeed(npcId, container);
        btn.closest(".show-evidence-picker").hidden = true;
      });
    });

    container.querySelectorAll(".cancel-btn").forEach(btn => {
      btn.addEventListener("click", () => btn.closest(".show-evidence-picker").hidden = true);
    });

    container.querySelectorAll("[data-action='challenge']").forEach(btn => {
      btn.addEventListener("click", () => {
        const npcId = btn.dataset.npc;
        const result = this.npcs.challenge(npcId, this.es.selectedA?.id, this.es.selectedB?.id);
        if (result) {
          const html = `
            <div class="challenge-result-box ${result.breakthrough ? 'breakthrough' : ''}">
              <div class="challenge-result-text">${result.text}</div>
            </div>`;
          const resultPanel = btn.closest(".npc-card").querySelector(`[data-npc-challenge="${npcId}"]`);
          if (resultPanel) {
            resultPanel.hidden = false;
            resultPanel.innerHTML = html;
            this.challengeResultsByNPC[npcId] = html;
          } else {
            this.addMessage(result.speaker, result.text, "npc", { breakthrough: result.breakthrough, revealedProphecy: result.revealedProphecy }, npcId);
            this._refreshNPCFeed(npcId, container);
          }
        }
      });
    });
  }

  _refreshNPCFeed(npcId, container) {
    const feed = container.querySelector(`.npc-card:has([data-npc="${npcId}"]) .npc-feed`);
    if (feed) feed.innerHTML = this.messagesByNPC[npcId]?.map(m => this._renderMsg(m)).join("") || "";
  }
}