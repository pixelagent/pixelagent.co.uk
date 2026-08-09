import { DIALOGUE_ID_MAP } from "../gameplay/dialogueMaps.js";

function avatarMarkup(a) { if (!a) return ''; if (a.endsWith('.svg')) return `<img src="../assets/characters/${a}"style="width:1.5em;height:1.5em;vertical-align:middle;object-fit:contain;"alt="">`; return a; }

export class PeopleUI {
  constructor(npcSystem, evidenceSystem, accessibility, onAction, audioManager, dialogueManager) {
    this.npcs = npcSystem;
    this.es = evidenceSystem;
    this.a11y = accessibility;
    this.onAction = onAction;
    this.audio = audioManager;
    this.dm = dialogueManager;
    this.messagesByNPC = {};
    this.challengeResultsByNPC = {};
    this._loadedCaseId = null;
    this.activeModalResult = null;
    this.peopleIntroHtml = "Some witnesses are hidden until you find them. Explore the <strong><img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'> Scene</strong> tab and walk up to a person to discover them — they'll appear here unlocked. Once found, talk to witnesses for clues, show them evidence, or challenge a contradiction once two clues are selected.<button class=\"people-intro-scene-btn\" type=\"button\" onclick=\"window.switchInvTab && window.switchInvTab('scene')\"><img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'> Go to Scene</button>";
    this.evidencePickerIntro = "Choose evidence to present to this witness.";
  }

  addMessage(speaker, text, type = "npc", extra = {}, npcId = null) {
    this._ensureMessagesForActiveCase();
    const targetNPC = npcId || this.pendingNPC;
    const msg = { speaker, text, type, extra, id: Date.now() };
    if (targetNPC) {
      if (!this.messagesByNPC[targetNPC]) this.messagesByNPC[targetNPC] = [];
      this.messagesByNPC[targetNPC].push(msg);
      this._persistMessagesForActiveCase();
    }
    this.a11y.speak(`${speaker}: ${text}`);
    return msg;
  }

  addSystem(text, npcId = null) {
    return this.addMessage("System", text, "system", {}, npcId);
  }

  _renderMsg(m) {
    const cls = `msg msg-${m.type}`;
    const icons = { player: "<img src='../assets/gfx/spy-duotone.svg' class='icon-svg' loading='lazy'>", system: "<img src='../assets/gfx/clipboard-duotone.svg' class='icon-svg' loading='lazy'>", verdict: "<img src='../assets/gfx/balance-scale-duotone.svg' class='icon-svg' loading='lazy'>" };
    const icon = icons[m.type] || "<img src='../assets/gfx/chat-duotone.svg' class='icon-svg' loading='lazy'>";
    return `
      <div class="${cls}" role="listitem" aria-label="${m.speaker}: ${m.text}">
        <span class="msg-speaker-badge" aria-hidden="true">${icon} ${m.speaker}</span>
        <span class="msg-text">${this.a11y.simplify(m.text)}</span>
        <div class="msg-badges">
          ${m.extra?.evidenceTag ? `<span class="evidence-tag-badge ${m.extra.isKey ? 'key' : ''}">${m.extra.evidenceTag} ${m.extra.evidenceName || ''}</span>` : ""}
          ${m.extra?.breakthrough ? `<span class="breakthrough-badge"><img src='../assets/gfx/sparkles-duotone.svg' class='icon-svg' loading='lazy'> Breakthrough</span>` : ""}
          ${m.extra?.revealedClue ? `<span class="clue-badge"><img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'> New clue</span>` : ""}
          ${m.extra?.revealedProphecy ? `<span class="prophecy-badge"><img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'> Prophecy Revealed</span>` : ""}
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
          <div class="score-row"><span><img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'> Evidence:</span> <span>+${s.evidence || 0}</span></div>
          <div class="score-row"><span><img src='../assets/gfx/sparkles-duotone.svg' class='icon-svg' loading='lazy'> Deductions:</span> <span>+${s.deduction || 0}</span></div>
          <div class="score-row"><span><img src='../assets/gfx/chat-duotone.svg' class='icon-svg' loading='lazy'> Challenges:</span> <span>+${s.challenge || 0}</span></div>
          <div class="score-row"><span><img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'> Prophecies:</span> <span>+${s.prophecy || 0}</span></div>
          <div class="score-row"><span>🎯 Accusation:</span> <span>${s.accusation > 0 ? '+' : ''}${s.accusation || 0}</span></div>
          ${s.perfectBonus ? `<div class="score-row"><span>⭐ Perfect Bonus:</span> <span>+${s.perfectBonus}</span></div>` : ''}
          <div class="score-row" style="color:var(--red)"><span>😰 Doubt Penalty (x2):</span> <span>-${s.doubtPenalty || 0}</span></div>
          <div class="score-total"><span>⭐ Total Score:</span> <span>${s.total || 0}</span></div>
        </div>
      </div>`;
  }

  renderNPCPanel(discoveredNPCs = null) {
    this._ensureMessagesForActiveCase();
    let npcs = this.npcs.getNPCs().filter(npc => npc.hasDialogue !== false);
    // Locked NPCs (not yet found in the scene) are listed but greyed out.
    const isNPCUnlocked = (npc) => {
      const state = this.npcs.getState(npc.id);
      const discovered = discoveredNPCs instanceof Set ? discoveredNPCs.has(npc.id) : true;
      return !!(state?.isSuspectUnlocked || discovered);
    };
    return `
      <h3 class="section-title">Witnesses</h3>
      ${this.peopleIntroHtml ? `<div class="prophecy-people-intro">${this.peopleIntroHtml}</div>` : ""}
      <div class="npc-list" role="list">
        ${npcs.map(npc => {
      const state = this.npcs.getState(npc.id);
      const unlocked = isNPCUnlocked(npc);
      const moodColor = this.npcs.getMoodColor(state?.mood || "neutral");
      const moodLabel = this.npcs.getMoodLabel(state?.mood || "neutral");
      if (!unlocked) {
        return `
            <div class="npc-card locked" aria-disabled="true">
              <div class="npc-header">
                 <span class="npc-avatar">${avatarMarkup(npc.avatar || "<img src='../assets/gfx/question-duotone.svg' class='icon-svg' loading='lazy'>")}</span>
                <div class="npc-info"><span class="npc-name">${npc.name}</span></div>
                <span class="npc-lock" aria-hidden="true"><img src='../assets/gfx/lock-duotone.svg' class='icon-svg' loading='lazy'></span>
              </div>
              <div class="npc-locked-note"><img src='../assets/gfx/lock-duotone.svg' class='icon-svg' loading='lazy'> Find this person in the Scene tab to unlock.</div>
            </div>`;
      }
      return `
            <div class="npc-card">
              <div class="npc-header">
                <span class="npc-avatar">${avatarMarkup(npc.avatar)}</span>
                <div class="npc-info"><span class="npc-name">${npc.name}</span></div>
                <span class="npc-mood" style="color:${moodColor}">${moodLabel}</span>
              </div>
              <div class="npc-feed" role="log" aria-live="polite">${this.messagesByNPC[npc.id]?.map(m => this._renderMsg(m)).join("") || ""}</div>
              <div class="npc-actions">
                <button class="npc-btn" data-action="talk" data-npc="${npc.id}"><img src='../assets/gfx/chat-duotone.svg' class='icon-svg' loading='lazy'> Talk</button>
                <button class="npc-btn" data-action="show" data-npc="${npc.id}"><img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'> Evidence</button>
                <button class="npc-btn" data-action="challenge" data-npc="${npc.id}" ${!this.es.selectedA ? "aria-disabled='true'" : ""}><img src='../assets/gfx/sparkles-duotone.svg' class='icon-svg' loading='lazy'> Challenge</button>
              </div>
              <div class="challenge-result" data-npc-challenge="${npc.id}" ${this.challengeResultsByNPC[npc.id] ? '' : 'hidden'}>
                ${this.challengeResultsByNPC[npc.id] || ''}
              </div>
            </div>`;
    }).join("")}
      </div>

      <div class="npc-result-modal" data-npc-result-modal hidden role="dialog" aria-modal="true" aria-label="Witness reaction" style="position:fixed;inset:0;z-index:7000;align-items:center;justify-content:center;padding:20px;">
        <div class="npc-result-modal-backdrop" data-npc-modal-close style="position:absolute;inset:0;background:rgba(0,0,0,0.6);"></div>
        <div class="npc-result-modal-card" style="position:relative;z-index:1;background:var(--surface2,#1b2230);border:1px solid var(--border,#2e3a50);border-radius:12px;padding:20px;max-width:560px;width:100%;display:flex;flex-direction:column;gap:12px;box-shadow:0 10px 30px rgba(0,0,0,0.35);">
          <div data-npc-modal-picker>
            <h3 class="section-title" style="margin:0;">Select Evidence</h3>
            ${this.evidencePickerIntro ? `<p class="prophecy-people-intro" style="margin:0 0 10px;">${this.evidencePickerIntro}</p>` : ""}
            <div class="evidence-pick-list" data-modal-picker-list>
              
            </div>
            <div style="display:flex;justify-content:flex-end;margin-top:4px;">
              <button class="evidence-detail-confirm" data-npc-modal-close style="min-width:140px;">Cancel</button>
            </div>
          </div>
          <div data-npc-modal-result hidden>
            <div style="display:flex;align-items:center;gap:10px;">
              <span class="modal-avatar" style="font-size:1.8rem;"></span>
              <h3 class="section-title modal-title" style="margin:0;"></h3>
            </div>
            <p class="result-text modal-text" style="margin:0;line-height:1.5;"></p>
            <p class="modal-badge" style="margin:0;font-weight:700;"></p>
            <div style="display:flex;justify-content:flex-end;margin-top:4px;">
              <button class="evidence-detail-confirm" data-npc-modal-close style="min-width:140px;">Close</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  bindNPCEvents(container) {
    this._ensureMessagesForActiveCase();

    container.querySelectorAll("[data-action='talk']").forEach(btn => {
      btn.addEventListener("click", () => {
        this._hideNPCModal(container);
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

          if (npc?.revealsProphecy) {
            const prophecy = this.es.getProphecyById(npc.revealsProphecy);
            if (prophecy) {
              const caseProgress = this._getCaseManager()?.getCaseProgress?.(this._getActiveCaseId());
              const alreadyFound = caseProgress?.propheciesFound?.includes(npc.revealsProphecy);
              if (!alreadyFound) {
                const currentStatus = this._getCaseManager()?.getCodexStatus?.(npc.revealsProphecy);
                if (currentStatus === 'unseen') {
                  this._getCaseManager()?.setCodexStatus?.(npc.revealsProphecy, 'rumor');
                }
                this.addSystem(`<img src='../assets/gfx/chat-duotone.svg' class='icon-svg' loading='lazy'> New Rumor: ${prophecy.reference}`, npcId);
                count++;
              }
            }
          }

          if (Array.isArray(npc?.unlocksSuspects)) {
            npc.unlocksSuspects.forEach(suspectId => {
              const cm = this.npcs.caseManager;
              const wasUnlocked = typeof cm?.isSuspectUnlocked === "function"
                ? cm.isSuspectUnlocked(suspectId)
                : false;

              if (typeof this.npcs.unlockSuspect === "function") {
                this.npcs.unlockSuspect(suspectId);
              }
              if (typeof cm?.discoverSuspect === "function") cm.discoverSuspect(suspectId);
              else if (typeof cm?.unlockSuspect === "function") cm.unlockSuspect(suspectId);

              const isUnlocked = typeof cm?.isSuspectUnlocked === "function"
                ? cm.isSuspectUnlocked(suspectId)
                : !!this.npcs.getState?.(suspectId)?.isSuspectUnlocked;
              if (!isUnlocked || wasUnlocked) return;

              if (this.onAction) {
                this.onAction({ type: "reveal_suspect", suspectId, npcId });
              }

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
        this._hideNPCModal(container);
        const npcId = btn.dataset.npc;
        this._showNPCPickerModal(container, npcId);
      });
    });

    container.querySelectorAll("[data-action='challenge']").forEach(btn => {
      btn.addEventListener("click", () => {
        this._hideNPCModal(container);
        const npcId = btn.dataset.npc;
        const npc = this.npcs.getNPC(npcId);
        const evidenceA = this.es.selectedA;
        const evidenceB = this.es.selectedB;
        if (!evidenceA || !evidenceB) {
          this.activeModalResult = {
            avatar: npc?.avatar,
            title: npc ? `Challenging ${npc.name}` : "Challenge Result",
            text: "Select two pieces of evidence in the Lab first to challenge this witness.",
            badge: null
          };
          this._showNPCModal(container);
          return;
        }
        const result = this.npcs.challenge(npcId, evidenceA.id, evidenceB.id);
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

          this.activeModalResult = {
            avatar: npc?.avatar,
            title: npc ? `Challenging ${npc.name}` : "Challenge Result",
            text: result.text,
            badge: result.breakthrough ? "<img src='../assets/gfx/sparkles-duotone.svg' class='icon-svg' loading='lazy'> Contradiction found!" : null,
            revealedProphecy: result.revealedProphecy
          };
          this._showNPCModal(container);
        }
      });
    });

    if (!container.dataset.npcModalBound) {
      container.dataset.npcModalBound = "1";
      container.addEventListener("click", (e) => {
        const closeBtn = e.target.closest("[data-npc-modal-close]");
        if (closeBtn) this._hideNPCModal(container);

        const pickBtn = e.target.closest(".evidence-pick-btn");
        if (pickBtn) {
          const npcId = pickBtn.dataset.npc;
          const evId = pickBtn.dataset.evidence;
          const npc = this.npcs.getNPC(npcId);
          const evidence = this.es.getById(evId);
          const result = this.npcs.showEvidence(npcId, evId);
          if (result) {
            if (evidence) {
              this.addMessage("Investigator", `Presented ${evidence.name} to ${npc?.name || 'witness'}.`, "player", {}, npcId);
            }
            this.addMessage(result.speaker, result.text, "npc", {
              revealedClue: result.revealedClue,
              revealedProphecy: result.revealedProphecy,
              evidenceTag: evidence?.icon || "<img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'>",
              evidenceName: evidence?.name
            }, npcId);

            this.activeModalResult = {
              avatar: npc?.avatar,
              title: npc ? `${npc.name}'s Reaction` : "Reaction",
              text: result.text,
              badge: result.revealedProphecy ? "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'> Prophecy Revealed" : (result.revealedClue ? "<img src='../assets/gfx/lock-open-duotone.svg' class='icon-svg' loading='lazy'> New clue revealed" : null)
            };
            this._showNPCModal(container);
          }
          this._refreshNPCFeed(npcId, container);
        }
      });
    }
  }

  _showNPCModal(container) {
    const modal = container.querySelector("[data-npc-result-modal]");
    if (modal) {
      const picker = modal.querySelector("[data-npc-modal-picker]");
      const result = modal.querySelector("[data-npc-modal-result]");
      if (picker) picker.hidden = true;
      if (result) result.hidden = false;

      if (this.activeModalResult) {
        const avatarEl = modal.querySelector(".modal-avatar");
        const titleEl = modal.querySelector(".modal-title");
        const textEl = modal.querySelector(".modal-text");
        const badgeEl = modal.querySelector(".modal-badge");

        if (avatarEl) avatarEl.innerHTML = avatarMarkup(this.activeModalResult.avatar || '');
        if (titleEl) titleEl.textContent = this.activeModalResult.title || '';
        if (textEl) textEl.textContent = this.a11y.simplify(this.activeModalResult.text || "");
        if (badgeEl) {
          const badgeText = this.activeModalResult.revealedProphecy ? "<img src='../assets/gfx/star-duotone.svg' class='icon-svg' loading='lazy'> Prophecy Revealed" : (this.activeModalResult.badge || '');
          badgeEl.textContent = badgeText;
          badgeEl.style.display = badgeText ? 'block' : 'none';
        }
      }
      modal.hidden = false;
      modal.style.display = "flex";
    }
  }

  _showNPCPickerModal(container, npcId) {
    const modal = container.querySelector("[data-npc-result-modal]");
    if (!modal) return;

    const picker = modal.querySelector("[data-npc-modal-picker]");
    const result = modal.querySelector("[data-npc-modal-result]");
    if (picker) picker.hidden = false;
    if (result) result.hidden = true;

    const pickerList = modal.querySelector("[data-modal-picker-list]");
    if (pickerList) {
      const collected = this.es.getCollected();
      pickerList.innerHTML = collected.map(e =>
        `<button class="evidence-pick-btn" data-evidence="${e.id}" data-npc="${npcId}" style="background:var(--surface3,#253044);border:1px solid var(--border,#2e3a50);color:var(--text);border-radius:8px;padding:10px;display:flex;align-items:center;gap:8px;width:100%;cursor:pointer;">${e.icon} <span>${e.name}</span></button>`
      ).join('') || '<p class="picker-empty">No evidence collected yet.</p>';
    }

    modal.hidden = false;
    modal.style.display = "flex";
  }

  _hideNPCModal(container) {
    this.activeModalResult = null;
    const modal = container.querySelector("[data-npc-result-modal]");
    if (modal) {
      const picker = modal.querySelector("[data-npc-modal-picker]");
      const result = modal.querySelector("[data-npc-modal-result]");
      if (picker) picker.hidden = false;
      if (result) result.hidden = true;

      modal.hidden = true;
      modal.style.display = "none";
    }
  }

  _refreshNPCFeed(npcId, container) {
    const feed = container.querySelector(`.npc-card:has([data-npc="${npcId}"]) .npc-feed`);
    if (feed) feed.innerHTML = this.messagesByNPC[npcId]?.map(m => this._renderMsg(m)).join("") || "";
  }

  _getCaseManager() {
    return this.npcs?.caseManager || null;
  }

  _getActiveCaseId() {
    const cm = this._getCaseManager();
    return cm?.getActiveCase?.()?.id || cm?.activeCaseId || null;
  }

  _ensureMessagesForActiveCase() {
    const cm = this._getCaseManager();
    const caseId = this._getActiveCaseId();
    if (!cm || !caseId || this._loadedCaseId === caseId) return;

    let stored = {};
    if (typeof cm.getChatMessagesByNpc === "function") {
      stored = cm.getChatMessagesByNpc(caseId);
    } else {
      stored = cm.getCaseProgress?.(caseId)?.chatMessagesByNpc || {};
    }
    this.messagesByNPC = JSON.parse(JSON.stringify(stored || {}));
    this._loadedCaseId = caseId;
  }

  _persistMessagesForActiveCase() {
    const cm = this._getCaseManager();
    const caseId = this._getActiveCaseId();
    if (!cm || !caseId) return;

    if (typeof cm.setChatMessagesByNpc === "function") {
      cm.setChatMessagesByNpc(this.messagesByNPC, caseId);
      return;
    }

    const progress = cm.getCaseProgress?.(caseId);
    if (!progress) return;
    progress.chatMessagesByNpc = this.messagesByNPC;
    if (typeof cm._saveProgress === "function") cm._saveProgress();
  }
}
