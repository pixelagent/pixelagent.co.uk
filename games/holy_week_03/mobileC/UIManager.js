import { getIntroText } from "../js/utils.js";
import { PeopleUI } from "../js/ui/PeopleUI.js";
import { SceneUI } from "../js/ui/SceneUI.js";
import { AccuseUI } from "../js/ui/AccuseUI.js";
import { CodexUI } from "../js/ui/CodexUI.js";
import { Scene2D } from "./Scene2D.js";

/**
 * UIManager orchestrates the 2D interface, handling screen routing,
 * modal interactions, and the rendering of game states to the DOM.
 */
export class UIManager {
  constructor(cm, es, ns, de, ls, a11y, audio, dm, app, labUI, chainManager) {
    this.cm = cm;
    this.es = es;
    this.ns = ns;
    this.de = de;
    this.ls = ls;
    this.a11y = a11y;
    this.audio = audio;
    this.dm = dm;
    this.app = app;
    this.chainManager = chainManager;

    this.labUI = labUI;
    this.peopleUI = new PeopleUI(ns, es, a11y, this.onChatAction.bind(this), audio, dm);
    this.sceneUI = new SceneUI(cm, es, a11y, this);
    this.accuseUI = new AccuseUI(cm);
    this.codexUI = new CodexUI(cm, es, a11y, audio);

    this.prevScreen = "map";

    this.discoveredNPCs = new Set();
  }

  _getTilemapPath(caseId) {
    const actMap = {
      'act1': ['triumphal_entry', 'temple_cleansing', 'fig_tree_incident'],
      'act2': ['authority_challenged', 'lazarus_plot', 'olivet_discourse'],
      'act3': ['last_supper', 'gethsemane_arrest', 'sanhedrin_trial', 'barabbas_choice', 'crucifixion_site'],
      'act4': ['resurrection', 'roman_inquiry', 'peter_restoration']
    };
    const act = Object.keys(actMap).find(key => actMap[key].includes(caseId));
    if (!act) return null;
    return `./maps/${act}/${caseId}.json`;
  }

  extractBibleReferences(text) {
    if (!text) return [];
    return Array.from(text.matchAll(/((?:\d\s)?[A-Za-z][^0-9]*\s\d+:\d+)/g)).map(m => m[1].trim());
  }

  showScreen(name) {
    // Delegate screen switching to the mobile app shell
    this.app.showScreen(`screen-${name}`);

    if (name === "map") this.renderMap();
    if (name === "a11y") this.renderA11yToggles();
  }

  switchInvTab(tab) {
    document.querySelectorAll(".inv-tab").forEach(t => {
      t.classList.toggle("active", t.dataset.tab === tab);
      t.setAttribute("aria-selected", t.dataset.tab === tab);
    });
    document.querySelectorAll(".inv-view").forEach(v => v.classList.remove("active"));
    document.getElementById(`inv-${tab}`).classList.add("active");

    if (tab === "lab") { const view = document.getElementById("inv-lab"); if (view) { view.innerHTML = this.labUI.render(); this.labUI.bindEvents(view); } }
    if (tab === "people") { const view = document.getElementById("inv-people"); if (view) { view.innerHTML = this.peopleUI.renderNPCPanel(this.discoveredNPCs); this.peopleUI.bindNPCEvents(view); } }
    if (tab === "codex") { const view = document.getElementById("inv-codex"); if (view) { view.innerHTML = this.codexUI.render(); } }
    if (tab === "scene") this.renderScene();
    if (tab === "accuse") { this.cm.refreshUnlockedSuspects(); const view = document.getElementById("inv-accuse"); if (view) { view.innerHTML = this.accuseUI.render(); } }

    this.a11y.announce(`${tab} tab open`);
  }

  renderScene() {
    const c = this.cm.getActiveCase();
    const container = document.getElementById("inv-scene");
    if (!c || !container) return;

    container.innerHTML = this.sceneUI.render();

    const nextBtn = container.querySelector("#scene-next-btn");
    if (nextBtn) {
      nextBtn.addEventListener("click", async () => {
        const panel = container.querySelector(".scene-intro-panel");
        if (panel) panel.classList.add("hidden");
        const mount = container.querySelector("#scene-canvas-mount");
        if (mount) mount.style.display = "block";

        const needsInit = !window.scene2d || !document.contains(window.scene2d.container);
        if (needsInit) {
          await this.init2DScene();
        }

        const c = this.cm.getActiveCase();
        if (c && window.scene2d && window.scene2d.loadCase) {
          const mapPath = this._getTilemapPath(c.id);
          if (mapPath) {
            try {
              const res = await fetch(mapPath);
              if (res.ok) {
                const tileData = await res.json();
                window.scene2d.loadCase(c.id, tileData);
              }
            } catch (e) {
              console.warn('Failed to load tilemap:', mapPath, e);
            }
          }
        }
      });
    }
  }

  goBack() {
    if (this.prevScreen) {
      this.showScreen(this.prevScreen);
    }
  }

  discoverNPC(npcId) {
    if (!this.discoveredNPCs.has(npcId)) {
      this.discoveredNPCs.add(npcId);
    }
  }

  renderPeople() {
    const view = document.getElementById("inv-people");
    if (view) {
      view.innerHTML = this.peopleUI.renderNPCPanel(this.discoveredNPCs);
      this.peopleUI.bindNPCEvents(view);
    }
  }

  renderMap() {
    const actData = this.ls.getActData();
    const progress = this.cm.getProgress() || {};
    const total = this.cm.getAllCases().length;
    const solved = Object.values(progress.cases || {}).filter(p => p.solved).length;

    const hdrRank = document.getElementById("hdr-rank");
    if (hdrRank) hdrRank.textContent = progress.rank || "Rookie";

    const scoreValEls = document.querySelectorAll('.val-score');
    scoreValEls.forEach(el => el.textContent = progress.totalScore || 0);

    const scholarEls = document.querySelectorAll('.val-scholar');
    const scholarLevel = this.cm.getScholarLevel?.() || "Novice";
    scholarEls.forEach(el => el.textContent = scholarLevel);

    const propCounts = this.cm.getProphecyCounts?.();
    if (propCounts) {
      document.querySelectorAll('.val-prophecies').forEach(el => el.textContent = `${propCounts.discovered}/${propCounts.total}`);
    }

    const pct = total ? Math.round((solved / total) * 100) : 0;
    const progressFill = document.getElementById("progress-fill");
    if (progressFill) progressFill.style.width = pct + "%";

    const progressTrack = document.getElementById("progress-track");
    if (progressTrack) progressTrack.setAttribute("aria-valuenow", pct);

    const container = document.getElementById("map-locations");
    if (container) {
      container.innerHTML = actData.map(act => {
        const status = !act.isUnlocked ? "locked" : act.allSolved ? "solved" : "open";
        const badge = act.allSolved ? "<img src='../assets/gfx/check-circle-duotone.svg' class='icon-svg' loading='lazy'>" : act.isUnlocked ? "<img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'>" : "<img src='../assets/gfx/lock-duotone.svg' class='icon-svg' loading='lazy'>";
        const statusText = { locked: "<img src='../assets/gfx/lock-duotone.svg' class='icon-svg' loading='lazy'> Locked", open: "<img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'> Cases available", solved: "<img src='../assets/gfx/check-circle-duotone.svg' class='icon-svg' loading='lazy'> All solved" }[status];
        const caseCount = act.cases.length;
        const solvedCount = act.solvedCases;
        return `
        <div class="location-card ${status}" role="listitem" tabindex="0" onclick="openAct('${act.label}')">
          <div class="location-inner">
            <div class="location-icon" aria-hidden="true"><img src='${act.cases[0].icon || '../assets/gfx/scroll-duotone.svg'}' class='icon-svg' loading='lazy'></div>
            <div class="location-info">
              <div class="location-name">${act.label}</div>
              <div class="location-region">${solvedCount}/${caseCount} cases solved</div>
              <div class="location-fact">${caseCount} case${caseCount !== 1 ? 's' : ''} across ${act.locations.length} location${act.locations.length !== 1 ? 's' : ''}</div>
              <div class="location-status ${status}">${statusText}</div>
            </div>
          </div>
          <div class="location-badge" aria-hidden="true">${badge}</div>
        </div>`;
      }).join("");
    }
  }

  openAct(actLabel) {
    this.prevScreen = "map";
    const actCases = this.ls.getCasesForAct(actLabel);
    const unlockedCases = actCases.filter(c => !c.isLocked);

    document.getElementById("cases-loc-name").innerHTML = actLabel;
    const scroll = document.getElementById("cases-scroll");

    scroll.innerHTML = `
      <div class="location-header">
        <div>
          <div class="location-header-name">${actLabel}</div>
          <div class="location-header-ambiance">${unlockedCases.length} case${unlockedCases.length !== 1 ? 's' : ''} available</div>
        </div>
      </div>
      ${this._renderActCases(actLabel)}
    `;
    this.showScreen("cases");
  }

  _renderActCases(actLabel) {
    const allCases = this.ls.getCasesForAct(actLabel);
    const unlockedIds = this.cm.getUnlockedCases().map(c => c.id);
    const cases = allCases.map(c => ({ ...c, isLocked: !unlockedIds.includes(c.id) }));

    return cases.map(c => {
      const prog = this.cm.getCaseProgress(c.id);
      return `<div class="case-card ${prog?.solved ? 'solved' : ''} ${c.isLocked ? 'locked' : ''}" 
                  onclick="${c.isLocked ? '' : `startCase('${c.id}')`}">
                <div class="case-title"><img src='${c.icon}' class='icon-svg' loading='lazy'> ${c.title}</div>
                <div class="case-subtitle">${c.subtitle}</div>
                ${c.eventLocation ? `<div class="case-event-location"><img src='../assets/gfx/pin-duotone.svg' class='icon-svg' loading='lazy'> ${c.eventLocation}</div>` : ''}
                <span class="case-status-label">${prog?.solved ? `<img src='../assets/gfx/check-circle-duotone.svg' class='icon-svg' loading='lazy'> Solved — ${prog.score?.total} pts` : c.isLocked ? "<img src='../assets/gfx/lock-duotone.svg' class='icon-svg' loading='lazy'> Locked" : "<img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'> Open"}</span>
              </div>`;
    }).join("");
  }

  openLocation(locationId) {
    this.prevScreen = "map";
    const loc = this.ls.getLocation(locationId);
    const locCases = this.ls.getCasesAtLocation(locationId);

    document.getElementById("cases-loc-name").innerHTML = loc.name;
    const scroll = document.getElementById("cases-scroll");

    scroll.innerHTML = `
      <div class="location-header">
        <div>
          <div class="location-header-name">${loc.name.replace(/<[^>]*>/g, '').trim()}</div>
          <div class="location-header-ambiance">${locCases.length} case${locCases.length !== 1 ? 's' : ''}</div>
        </div>
      </div>
      ${this._renderLocationCases(locationId)}
    `;
    this.showScreen("cases");
  }

  _renderLocationCases(locationId) {
    const allCases = this.ls.getCasesAtLocation(locationId);
    const unlockedIds = this.cm.getUnlockedCases().map(c => c.id);
    const cases = allCases.map(c => ({ ...c, isLocked: !unlockedIds.includes(c.id) }));

    return cases.map(c => {
      const prog = this.cm.getCaseProgress(c.id);
      return `<div class="case-card ${prog?.solved ? 'solved' : ''} ${c.isLocked ? 'locked' : ''}" 
                  onclick="${c.isLocked ? '' : `startCase('${c.id}')`}">
                <div class="case-title"><img src='${c.icon}' class='icon-svg' loading='lazy'> ${c.title}</div>
                <div class="case-subtitle">${c.subtitle}</div>
                ${c.eventLocation ? `<div class="case-event-location"><img src='../assets/gfx/pin-duotone.svg' class='icon-svg' loading='lazy'> ${c.eventLocation}</div>` : ''}
                <span class="case-status-label">${prog?.solved ? `<img src='../assets/gfx/check-circle-duotone.svg' class='icon-svg' loading='lazy'> Solved — ${prog.score?.total} pts` : c.isLocked ? "<img src='../assets/gfx/lock-duotone.svg' class='icon-svg' loading='lazy'> Locked" : "<img src='../assets/gfx/magnifying-glass-duotone.svg' class='icon-svg' loading='lazy'> Open"}</span>
              </div>`;
    }).join("");
  }

  renderEvidenceList() {
    const collected = this.es.getCollected();
    if (collected.length === 0) {
      return `<div class="empty-state">
        <div class="empty-icon"><img src='../assets/gfx/backpack-duotone.svg' class='icon-svg' loading='lazy'></div>
        <div>No evidence collected yet.</div>
        <small>Explore the scene and talk to people to find clues.</small>
      </div>`;
    }

    return `<div class="evidence-grid-container scrollable">
      ${collected.map(e => {
        const typeInfo = this.es.getTypeInfo(e.type);
        return `
          <div class="evidence-card-small" onclick="openEvidenceDetail('${e.id}')" role="button" tabindex="0" aria-label="View details for ${e.name}">
            <div class="evidence-card-small-icon" style="background-color: ${typeInfo.color}">${e.icon}</div>
            <div class="evidence-card-small-name">${e.name}</div>
            <div class="evidence-card-small-type">${typeInfo.label}</div>
          </div>
        `;
      }).join('')}
    </div>`;
  }

   async setupInvestigation(c) {
     // Re-bind callbacks to the specific case context
     this.labUI.onResult = this.onLabAction.bind(this);
     this.peopleUI.onAction = this.onChatAction.bind(this);
     const introText = getIntroText(c.intro) || c.subtitle;

     if (this.dm && this.dm.setActiveCase) this.dm.setActiveCase(c.id);
     this.peopleUI.addSystem(introText);
     document.getElementById("inv-case-title").innerHTML = `<img src='${c.icon}' class='icon-svg' loading='lazy'> ${c.title}`;
     document.getElementById("inv-case-sub").textContent = c.subtitle;

      this.switchInvTab("scene");
      this.showScreen("investigation");
      this.prevScreen = "cases";
      this.a11y.speak(`Case started: ${c.title}. ${introText}`);
   }

  async init2DScene(container) {
    window.scene2d = new Scene2D(this);
    await window.scene2d.init('scene-canvas-mount');
   }

  handleNpcInteraction(mode, npcId = null) {
    const activeNpc = (npcId
      ? (window.sceneNPCs?.find(n => n.data && n.data.id === npcId) || { data: this.ns.getNPC(npcId) })
      : (window.sceneNPCs?.find(n => n.data && n.data.id) || { data: this.ns.getNPC()})) || null;
    if (!activeNpc || !activeNpc.data) return;
    if (this.dm) {
      this.dm.setActiveNPC(activeNpc.data);
      const c = this.cm.getActiveCase();
      const caseId = c?.id || this.cm.activeCaseId || null;
      const loadedStory = this.dm.getStory(activeNpc.data.id, caseId);

      const unlocks = activeNpc.data.unlocksEvidence || [];
      if (unlocks.length > 0 && c) {
        this.cm.unlockEvidenceForScene(c.id, unlocks);
        this.switchInvTab('lab');
        unlocks.forEach(id => {
          const ev = this.es.getById(id);
          if (ev) {
            this.a11y.announce(`Evidence unlocked: ${ev.name}`);
            this._showEvidenceToast(`Evidence unlocked: ${ev.name}. <button class="evidence-toast-link" data-evidence-id="${ev.id}">View inventory</button>`);
          }
        });
      }

      if (loadedStory) {
        const story = this.dm.createStory(activeNpc.data.id, caseId);
        this.dm.openDialogue(activeNpc.data, story,
          () => {
            this.renderPeople();
          }, (text, type) => this.peopleUI.addMessage(type === 'player' ? 'Investigator' : activeNpc.data.name, text, type, {}, activeNpc.data.id)
        );
      } else {
        this.peopleUI.addMessage(activeNpc.data.name || activeNpc.data.id, "I can tell you about this location.", 'npc', {}, activeNpc.data.id);
        this.renderPeople();
      }
    }
  }

  openNPCChatFromScene(npcId) {
    this.discoverNPC(npcId);
    this.switchInvTab('people');
    this.peopleUI._ensureMessagesForActiveCase();
    const npc = this.ns.getNPC(npcId);
    if (!npc) return;

    const talkBtn = document.querySelector(`[data-action="talk"][data-npc="${npcId}"]`);
    if (talkBtn) talkBtn.click();
  }

  onLabAction(result) {
    if (result.type === "selection") this.renderPeople();
    else result.error ? this.audio.playError() : this.audio.playClue();
    if (result?.type === 'folder_verify' || result?.type === 'timeline_test' || result?.type === 'shredder_test') {
      if (result.success) {
        this.cm.addScore(5);
      } else {
        this.cm.addScore(-5);
        this.cm.recordIncorrectLabPairing();
      }
    } else if (result?.type === 'detail_view') {
      this.cm.addScore(-1);
    } else if (result?.scoreDelta) {
      this.cm.addScore(result.scoreDelta);
    }
    if (result?.feedback) {
      this.renderLab();
      this.labUI._setFeedback(result.feedback, result.feedbackType || "");
    }
    if (!result?.error && result?.operation) {
      const view = document.getElementById("inv-lab");
      this.labUI.showActiveResultModal?.(view);
    }
    if (!result?.error && (result?.type === 'folder_verify' || result?.type === 'timeline_test' || result?.type === 'shredder_test' || result?.type === 'comparator_test')) {
      this.checkChains?.();
    }
    this.gameManager?.checkGameOver?.();
  }

  /**
   * Routes system messages to the appropriate UI feed.
   * @param {string} text 
   * @param {string} tab - Optional hint for where the message originated
   */
  addSystemMessage(text, tab = 'system') {
    if (this.peopleUI) this.peopleUI.addSystem(text);
  }

  showProphecyDetail(prophecyId) {
    const p = this.es.getProphecyById(prophecyId);
    if (!p) return;
    
    const status = this.cm.getCodexStatus(prophecyId);
    const isComplete = status === 'complete';
    const isFound = status === 'found_scripture';
    const isRumor = status === 'rumor';
    
    const modal = document.getElementById("evidence-detail-modal");
    modal.querySelector(".evidence-detail-icon").innerHTML = `<img src='${p.icon || '../assets/gfx/star-duotone.svg'}' class='icon-svg' loading='lazy'>`;
    modal.querySelector(".evidence-detail-name").textContent = p.reference || "Prophecy";
    modal.querySelector(".evidence-detail-type").textContent = isComplete ? "Research Complete" : isFound ? "Scripture Found" : isRumor ? "Rumor" : "Undiscovered";

    const descEl = modal.querySelector(".evidence-detail-desc");
    const locationEl = modal.querySelector(".evidence-detail-location");
    const bibleRefEl = modal.querySelector(".evidence-detail-bible-ref");
    const bibleReadMoreContainer = modal.querySelector(".bible-read-more-container");
    const bibleVerseContent = modal.querySelector(".verse-content[data-target='bible-verse-content']");
    const prophetLinkEl = modal.querySelector(".evidence-detail-prophetic-link");
    const prophetReadMoreContainer = modal.querySelector(".prophecy-read-more-container");
    const prophetVerseContent = modal.querySelector(".verse-content[data-target='prophecy-verse-content']");
    const investigatorNoteEl = modal.querySelector(".evidence-detail-investigator-note");

    if (isComplete) {
      descEl.textContent = p.text || "";
      if (locationEl) { locationEl.textContent = p.location || ""; locationEl.parentElement.hidden = !p.location; }
      
      if (p.bibleRef) {
        bibleRefEl.textContent = p.bibleRef;
        bibleRefEl.closest(".evidence-detail-section").hidden = false;
        if (bibleReadMoreContainer) {
          bibleReadMoreContainer.innerHTML = "";
          const refs = this.extractBibleReferences(p.bibleRef);
          refs.forEach(ref => {
            const btn = document.createElement("button");
            btn.className = "read-more-btn";
            btn.innerHTML = `<img src='../assets/gfx/book-open-duotone.svg' class='icon-svg' loading='lazy'> Read ${ref}`;
            btn.onclick = () => this.fetchVerseInline(ref, bibleVerseContent, btn);
            bibleReadMoreContainer.appendChild(btn);
          });
        }
        if (bibleVerseContent) { bibleVerseContent.innerHTML = ""; bibleVerseContent.hidden = true; }
      } else {
        bibleRefEl.closest(".evidence-detail-section").hidden = true;
        if (bibleReadMoreContainer) bibleReadMoreContainer.innerHTML = "";
        if (bibleVerseContent) { bibleVerseContent.innerHTML = ""; bibleVerseContent.hidden = true; }
      }

      if (p.insight) {
        prophetLinkEl.textContent = p.insight;
        prophetLinkEl.closest(".evidence-detail-section").hidden = false;
        if (prophetReadMoreContainer) {
          prophetReadMoreContainer.innerHTML = "";
          const refs = this.extractBibleReferences(p.insight);
          refs.forEach(ref => {
            const btn = document.createElement("button");
            btn.className = "read-more-btn";
            btn.innerHTML = `<img src='../assets/gfx/book-open-duotone.svg' class='icon-svg' loading='lazy'> Read ${ref}`;
            btn.onclick = () => this.fetchVerseInline(ref, prophetVerseContent, btn);
            prophetReadMoreContainer.appendChild(btn);
          });
        }
        if (prophetVerseContent) { prophetVerseContent.innerHTML = ""; prophetVerseContent.hidden = true; }
      } else {
        prophetLinkEl.closest(".evidence-detail-section").hidden = true;
        if (prophetReadMoreContainer) prophetReadMoreContainer.innerHTML = "";
        if (prophetVerseContent) { prophetVerseContent.innerHTML = ""; prophetVerseContent.hidden = true; }
      }
      investigatorNoteEl.parentElement.hidden = true;
    } else if (isFound) {
      descEl.textContent = p.text || "";
      if (locationEl) locationEl.parentElement.hidden = true;
      
      if (p.bibleRef) {
        bibleRefEl.textContent = p.bibleRef;
        bibleRefEl.closest(".evidence-detail-section").hidden = false;
        if (bibleReadMoreContainer) {
          bibleReadMoreContainer.innerHTML = "";
          const refs = this.extractBibleReferences(p.bibleRef);
          refs.forEach(ref => {
            const btn = document.createElement("button");
            btn.className = "read-more-btn";
            btn.innerHTML = `<img src='../assets/gfx/book-open-duotone.svg' class='icon-svg' loading='lazy'> Read ${ref}`;
            btn.onclick = () => this.fetchVerseInline(ref, bibleVerseContent, btn);
            bibleReadMoreContainer.appendChild(btn);
          });
        }
        if (bibleVerseContent) { bibleVerseContent.innerHTML = ""; bibleVerseContent.hidden = true; }
      } else {
        bibleRefEl.closest(".evidence-detail-section").hidden = true;
        if (bibleReadMoreContainer) bibleReadMoreContainer.innerHTML = "";
        if (bibleVerseContent) { bibleVerseContent.innerHTML = ""; bibleVerseContent.hidden = true; }
      }

      prophetLinkEl.textContent = "Fulfilled By: ???";
      prophetLinkEl.closest(".evidence-detail-section").hidden = false;
      if (prophetReadMoreContainer) prophetReadMoreContainer.innerHTML = "";
      if (prophetVerseContent) { prophetVerseContent.innerHTML = ""; prophetVerseContent.hidden = true; }
      investigatorNoteEl.parentElement.hidden = true;
    } else if (isRumor) {
      descEl.textContent = `A rumor heard in conversation: "${p.reference}". The scripture fragment has not yet been found.`;
      if (locationEl) locationEl.parentElement.hidden = true;
      bibleRefEl.closest(".evidence-detail-section").hidden = true;
      if (bibleReadMoreContainer) bibleReadMoreContainer.innerHTML = "";
      if (bibleVerseContent) { bibleVerseContent.innerHTML = ""; bibleVerseContent.hidden = true; }
      prophetLinkEl.closest(".evidence-detail-section").hidden = true;
      if (prophetReadMoreContainer) prophetReadMoreContainer.innerHTML = "";
      if (prophetVerseContent) { prophetVerseContent.innerHTML = ""; prophetVerseContent.hidden = true; }
      investigatorNoteEl.parentElement.hidden = true;
    } else {
      descEl.textContent = "This prophecy has not been discovered yet. Talk to witnesses or find clues in the scene to learn more.";
      if (locationEl) locationEl.parentElement.hidden = true;
      bibleRefEl.closest(".evidence-detail-section").hidden = true;
      if (bibleReadMoreContainer) bibleReadMoreContainer.innerHTML = "";
      if (bibleVerseContent) { bibleVerseContent.innerHTML = ""; bibleVerseContent.hidden = true; }
      prophetLinkEl.closest(".evidence-detail-section").hidden = true;
      if (prophetReadMoreContainer) prophetReadMoreContainer.innerHTML = "";
      if (prophetVerseContent) { prophetVerseContent.innerHTML = ""; prophetVerseContent.hidden = true; }
      investigatorNoteEl.parentElement.hidden = true;
    }

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("active"));
  }

  renderResult(result) {
    const c = this.cm.getActiveCase();
    document.getElementById("result-content").innerHTML = `
    <div class="container" role="region" aria-label="Case result details">
      <div class="result-card">
        <div class="result-verdict" aria-hidden="true">${result.correct ? "<img src='../assets/gfx/trophy-duotone.svg' class='icon-svg' loading='lazy'>" : "<img src='../assets/gfx/x-circle-duotone.svg' class='icon-svg' loading='lazy'>"}</div>
        <div class="result-verdict-text ${result.correct ? 'correct' : 'wrong'}" role="heading" aria-level="1">
          ${result.correct ? "Case Solved!" : "Wrong Accusation"}
        </div>
        <div class="result-summary scrollable" aria-label="Case summary">
          <div class="result-truth">
            <strong>The truth:</strong> ${this.a11y.simplify(c.truth.motive)} ${this.a11y.simplify(c.truth.method)}
          </div>
          <div class="result-lesson" aria-label="What you learned">
            <img src='../assets/gfx/books-duotone.svg' class='icon-svg' loading='lazy'> ${this.a11y.simplify(c.truth.lesson)}
          </div>
        </div>
        <div class="scroll-hint" aria-hidden="true">
          <i class="fas fa-chevron-down"></i> Scroll Down <i class="fas fa-chevron-down"></i>
        </div>
        <div class="score-grid" aria-label="Your score breakdown">
          <div class="score-item"><div class="score-item-value">${result.score.evidence}</div><div class="score-item-label">Evidence</div></div>
          <div class="score-item"><div class="score-item-value">${result.score.deduction}</div><div class="score-item-label">Deductions</div></div>
          <div class="score-item"><div class="score-item-value">${result.score.challenge || 0}</div><div class="score-item-label">Challenges</div></div>
          <div class="score-item"><div class="score-item-value">${result.score.prophecy || 0}</div><div class="score-item-label">Prophecy</div></div>
          <div class="score-item"><div class="score-item-value" style="color:var(--blue)">+${result.score.reputation || 0}</div><div class="score-item-label">Reputation</div></div>
          <div class="score-item"><div class="score-item-value">${result.score.accusation > 0 ? '+' : ''}${result.score.accusation}</div><div class="score-item-label">Accusation</div></div>
          <div class="score-item" style="border: 1px solid var(--gold);"><div class="score-item-value" style="color:var(--green)">+${result.score.perfectBonus || 0}</div><div class="score-item-label">Perfect</div></div>
          <div class="score-item"><div class="score-item-value" style="color:var(--red)">-${result.score.doubtPenalty}</div><div class="score-item-label">Doubt (x2)</div></div>
          <div class="score-item"><div class="score-item-value">${result.score.total}</div><div class="score-item-label">Total</div></div>
        </div>
        <button class="result-continue-btn" onclick="showScreen('map')" aria-label="Continue to world map">Continue →</button>
      </div>
    </div>`;

    const summary = document.querySelector('.result-summary');
    const hint = document.querySelector('.scroll-hint');
    if (summary && hint) {
      const updateScrollHintVisibility = () => {
        if (summary.scrollTop > 0) hint.classList.add('scroll-hint-hidden');
        else hint.classList.remove('scroll-hint-hidden');
      };
      if (summary.scrollHeight > summary.clientHeight) updateScrollHintVisibility();
      else hint.classList.add('scroll-hint-hidden');
      summary.addEventListener('scroll', updateScrollHintVisibility);
    }
  }

  renderA11yToggles() {
    const settings = this.a11y.getAll();
    document.querySelectorAll(".toggle-btn[data-feature]").forEach(btn => {
      const feature = btn.dataset.feature;
      const on = !!settings[feature];

      btn.setAttribute("aria-pressed", String(on));
      btn.setAttribute("aria-checked", String(on)); // Essential for role="switch"

      if (feature === 'sound') {
        const icon = btn.querySelector('i');
        if (icon) icon.className = on ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
      }

      // Attach the click handler to actually perform the toggle
      btn.onclick = () => {
        const newState = this.a11y.toggle(feature);
        this.renderA11yToggles(); // Refresh this screen's state

        if (feature === 'sound') {
          this.audio.setEnabled(newState);
          // Sync the main navbar sound button icon
          const navBtnIcon = document.querySelector('[onclick="toggleAudio()"] i');
          if (navBtnIcon) navBtnIcon.className = newState ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark';
        }
      };
    });
  }

  showInstructionsModal(isFirstPlay = false) {
    const logo = document.getElementById("instructions-logo");
    if (logo) logo.style.display = isFirstPlay ? "block" : "none";
    document.getElementById("instructions-modal").classList.add("active");
    if (this.audio) this.audio.playHighStakes();
  }

  closeInstructionsModal() {
    document.getElementById("instructions-modal").classList.remove("active");
  }

  showResetModal() {
    document.getElementById("reset-modal").classList.add("active");
    if (this.audio) this.audio.playHighStakes();
  }

  closeResetModal() {
    document.getElementById("reset-modal").classList.remove("active");
  }

  showGameComplete(score, rank) {
    const modal = document.getElementById("game-complete-modal");
    document.getElementById("final-score-value").textContent = score || 0;
    document.getElementById("final-score-rank").textContent = rank || "Rookie";
    modal.classList.add("active");
    this.a11y.speak(`Game complete! Your final score is ${score || 0} points.`, "assertive");
  }

  closeGameComplete() {
    document.getElementById("game-complete-modal").classList.remove("active");
    this.showScreen("map");
  }

  showGameOver(reason) {
    const modal = document.getElementById("game-over-modal");
    const titleEl = modal.querySelector(".game-over-title");
    const bodyEl = modal.querySelector(".game-over-body");
    const reasonEl = modal.querySelector(".game-over-reason");
    
    if (reason === 'doubt') {
      titleEl.textContent = "⚠️ Investigation Failed";
      bodyEl.textContent = "Your doubt has overwhelmed the investigation.";
      reasonEl.textContent = "The people no longer trust your judgment. You've lost credibility.";
    } else if (reason === 'reputation') {
      titleEl.textContent = "⚠️ Reputation Lost";
      bodyEl.textContent = "Your standing with the community has collapsed.";
      reasonEl.textContent = "Without trust, you cannot continue the investigation.";
    } else {
      titleEl.textContent = "⚠️ Game Over";
      bodyEl.textContent = "The investigation has ended.";
      reasonEl.textContent = "";
    }
    
    modal.classList.add("active");
    this.a11y.speak("Game over. The investigation has failed.", "assertive");
  }

  closeGameOver() {
    document.getElementById("game-over-modal").classList.remove("active");
    this.showScreen("map");
  }

  showChainComplete(chain) {
    const modal = document.getElementById("chain-complete-modal");
    const title = modal.querySelector(".chain-complete-title");
    const body = modal.querySelector(".chain-complete-body");
    const reward = modal.querySelector(".chain-complete-reward");
    if (title) title.textContent = `Hidden Chain: ${chain.name}`;
    if (body) body.textContent = chain.description || "";
    if (reward) reward.textContent = `Reward: ${chain.bonusPoints} points, +${chain.bonusFaith} faith — Codex: ${chain.codexEntry}`;
    modal.classList.add("active");
    this.a11y.speak(`Hidden detective chain completed: ${chain.name}.`, "assertive");
  }

  closeChainComplete() {
    document.getElementById("chain-complete-modal").classList.remove("active");
  }

  checkChains() {
    if (!this.chainManager) return;
    const completed = this.chainManager.checkAllChains();
    completed.forEach(chain => {
      this.showChainComplete(chain);
    });
  }

  openEvidenceDetail(evidenceId) {
    const modal = document.getElementById("evidence-detail-modal");
    const e = this.es.getById(evidenceId);
    if (!e) return;
    const typeInfo = this.es.getTypeInfo(e.type);

    modal.querySelector(".evidence-detail-icon").innerHTML = "<img src='" + (e.icon || '../assets/gfx/star-duotone.svg') + "' class='icon-svg' loading='lazy'>";
    modal.querySelector(".evidence-detail-name").textContent = e.name;
    modal.querySelector(".evidence-detail-type").textContent = typeInfo.label || e.type;

    const descEl = modal.querySelector(".evidence-detail-desc");
    descEl.textContent = e.desc || e.description || "";

    const locationEl = modal.querySelector(".evidence-detail-location");
    if (locationEl) {
      locationEl.textContent = e.location || "";
      locationEl.parentElement.hidden = !e.location;
    }

    const bibleRefEl = modal.querySelector(".evidence-detail-bible-ref");
    const bibleReadMoreContainer = modal.querySelector(".bible-read-more-container");
    const bibleVerseContent = modal.querySelector(".verse-content[data-target='bible-verse-content']");

    if (e.bibleRef) {
      bibleRefEl.textContent = e.bibleRef;
      bibleRefEl.closest(".evidence-detail-section").hidden = false;
      
      if (bibleReadMoreContainer) {
        bibleReadMoreContainer.innerHTML = "";
        const refs = (e.bibleRefs && e.bibleRefs.length > 0) ? e.bibleRefs.map(r => r.ref) : this.extractBibleReferences(e.bibleRef);
        refs.forEach(ref => {
          const btn = document.createElement("button");
          btn.className = "read-more-btn";
          btn.innerHTML = `<img src='../assets/gfx/book-open-duotone.svg' class='icon-svg' loading='lazy'> Read ${ref}`;
          btn.onclick = () => this.fetchVerseInline(ref, bibleVerseContent, btn);
          bibleReadMoreContainer.appendChild(btn);
        });
      }
      
      if (bibleVerseContent) {
        bibleVerseContent.innerHTML = "";
        bibleVerseContent.hidden = true;
      }
    } else {
      bibleRefEl.closest(".evidence-detail-section").hidden = true;
      if (bibleReadMoreContainer) bibleReadMoreContainer.innerHTML = "";
      if (bibleVerseContent) {
        bibleVerseContent.innerHTML = "";
        bibleVerseContent.hidden = true;
      }
    }

    const prophetLinkEl = modal.querySelector(".evidence-detail-prophetic-link");
    const prophetReadMoreContainer = modal.querySelector(".prophecy-read-more-container");
    const prophetVerseContent = modal.querySelector(".verse-content[data-target='prophecy-verse-content']");

    if (e.prophecy || e.propheticLink) {
      const propheticText = e.prophecy || e.propheticLink || "";
      prophetLinkEl.textContent = propheticText;
      prophetLinkEl.closest(".evidence-detail-section").hidden = false;

      if (prophetReadMoreContainer) {
        prophetReadMoreContainer.innerHTML = "";
        const refs = (e.propheticRefs && e.propheticRefs.length > 0) ? e.propheticRefs.map(r => r.ref) : this.extractBibleReferences(propheticText);
        refs.forEach(ref => {
          const btn = document.createElement("button");
          btn.className = "read-more-btn";
          btn.innerHTML = `<img src='../assets/gfx/book-open-duotone.svg' class='icon-svg' loading='lazy'> Read ${ref}`;
          btn.onclick = () => this.fetchVerseInline(ref, prophetVerseContent, btn);
          prophetReadMoreContainer.appendChild(btn);
        });
      }

      if (prophetVerseContent) {
        prophetVerseContent.innerHTML = "";
        prophetVerseContent.hidden = true;
      }
    } else {
      prophetLinkEl.closest(".evidence-detail-section").hidden = true;
      if (prophetReadMoreContainer) {
        prophetReadMoreContainer.innerHTML = "";
      }
      if (prophetVerseContent) {
        prophetVerseContent.innerHTML = "";
        prophetVerseContent.hidden = true;
      }
    }

    const investigatorNoteEl = modal.querySelector(".evidence-detail-investigator-note");
    if (investigatorNoteEl) {
      investigatorNoteEl.textContent = e.investigatorNote || e.investigator_note || "";
      investigatorNoteEl.parentElement.hidden = !(e.investigatorNote || e.investigator_note);
    }

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("active"));
  }

  closeEvidenceDetail() {
    const modal = document.getElementById("evidence-detail-modal");
    modal.classList.remove("active");
    setTimeout(() => { modal.hidden = true; }, 200);
  }

  openInventory() {
    const modal = document.getElementById("evidence-inventory-modal");
    if (!modal) return;
    const grid = document.getElementById("inventory-grid");
    const detail = document.getElementById("inventory-detail");
    if (!grid || !detail) return;

    const collected = this.es.getCollected();
    grid.innerHTML = collected.length === 0
      ? `<p class="picker-empty">No evidence collected yet.</p>`
      : collected.map(e => `
          <button class="inventory-item" data-evidence-id="${e.id}" aria-label="View ${e.name}">
            <span class="inventory-icon"><img src="${e.icon}" alt="${e.name}" class="icon-svg" loading="lazy"/></span>
            <span class="inventory-name">${e.name}</span>
          </button>
        `).join("");

    detail.hidden = true;
    detail.innerHTML = "";

    modal.hidden = false;
    requestAnimationFrame(() => modal.classList.add("active"));

    this._bindInventoryGrid(modal);
  }

  _bindInventoryGrid(modal) {
    const grid = modal.querySelector("#inventory-grid");
    if (!grid) return;
    const handler = (e) => {
      const item = e.target.closest(".inventory-item");
      if (item) this._showInventoryDetail(item.dataset.evidenceId);
    };
    grid.addEventListener("click", handler);
  }

  _showInventoryDetail(evidenceId) {
    const detail = document.getElementById("inventory-detail");
    const e = this.es.getById(evidenceId);
    if (!e || !detail) return;
    const typeInfo = this.es.getTypeInfo(e.type);
    detail.innerHTML = `
      <div class="evidence-detail-header">
        <span class="evidence-detail-icon"><img src='../assets/gfx/book-duotone.svg' class='icon-svg' loading='lazy'><img src='${e.icon}' class='icon-svg' loading='lazy'>  </span>
        <div>
          <div class="evidence-detail-name">${e.name}</div>
          <div class="evidence-detail-type">${typeInfo.label || e.type}</div>
        </div>
      </div>
      <div class="evidence-detail-body">
        <div class="evidence-detail-section">
          <div class="evidence-detail-label">Description</div>
          <div class="evidence-detail-desc">${e.desc || e.description || ""}</div>
        </div>
        ${e.location ? `
        <div class="evidence-detail-section">
          <div class="evidence-detail-label">Location Found</div>
          <div class="evidence-detail-location">${e.location}</div>
        </div>` : ''}
        ${e.bibleRef ? `
        <div class="evidence-detail-section prophecy-section">
          <div class="evidence-detail-label"><img src='../assets/gfx/scroll-duotone.svg' class='icon-svg' loading='lazy'> Bible Reference</div>
          <div class="evidence-detail-bible-ref">${e.bibleRef}</div>
          <div class="bible-read-more-container"></div>
          <div class="verse-content" data-target="bible-verse-content" hidden></div>
        </div>` : ''}
        ${e.prophecy || e.propheticLink ? `
        <div class="evidence-detail-section prophecy-section">
          <div class="evidence-detail-label"><img src='../assets/gfx/sparkles-duotone.svg' class='icon-svg' loading='lazy'> Prophecy & Fulfilment</div>
          <div class="evidence-detail-prophetic-link">${e.prophecy || e.propheticLink}</div>
          <div class="prophecy-read-more-container"></div>
          <div class="verse-content" data-target="prophecy-verse-content" hidden></div>
        </div>` : ''}
        ${e.investigatorNote || e.investigator_note ? `
        <div class="evidence-detail-section">
          <div class="evidence-detail-label"><img src='../assets/gfx/search.svg' class='icon-svg' loading='lazy'> Investigator Notes</div>
          <div class="evidence-detail-investigator-note">${e.investigatorNote || e.investigator_note}</div>
        </div>` : ''}
      </div>
    `;
    detail.hidden = false;
    detail.scrollIntoView({ behavior: "smooth" });

    const bibleReadMoreContainer = detail.querySelector(".bible-read-more-container");
    const bibleVerseContent = detail.querySelector(".verse-content[data-target='bible-verse-content']");
    if (e.bibleRef && bibleReadMoreContainer) {
      bibleReadMoreContainer.innerHTML = "";
      const refs = (e.bibleRefs && e.bibleRefs.length > 0) ? e.bibleRefs.map(r => r.ref) : this.extractBibleReferences(e.bibleRef);
      refs.forEach(ref => {
        const btn = document.createElement("button");
        btn.className = "read-more-btn";
        btn.innerHTML = `<img src='../assets/gfx/book-open-duotone.svg' class='icon-svg' loading='lazy'> Read ${ref}`;
        btn.onclick = () => this.fetchVerseInline(ref, bibleVerseContent, btn);
        bibleReadMoreContainer.appendChild(btn);
      });
      if (bibleVerseContent) {
        bibleVerseContent.innerHTML = "";
        bibleVerseContent.hidden = true;
      }
    }

    const prophetReadMoreContainer = detail.querySelector(".prophecy-read-more-container");
    const prophetVerseContent = detail.querySelector(".verse-content[data-target='prophecy-verse-content']");
    if ((e.prophecy || e.propheticLink) && prophetReadMoreContainer) {
      prophetReadMoreContainer.innerHTML = "";
      const propheticText = e.prophecy || e.propheticLink || "";
      const refs = (e.propheticRefs && e.propheticRefs.length > 0) ? e.propheticRefs.map(r => r.ref) : this.extractBibleReferences(propheticText);
      refs.forEach(ref => {
        const btn = document.createElement("button");
        btn.className = "read-more-btn";
        btn.innerHTML = `<img src='../assets/gfx/book-open-duotone.svg' class='icon-svg' loading='lazy'> Read ${ref}`;
        btn.onclick = () => this.fetchVerseInline(ref, prophetVerseContent, btn);
        prophetReadMoreContainer.appendChild(btn);
      });
      if (prophetVerseContent) {
        prophetVerseContent.innerHTML = "";
        prophetVerseContent.hidden = true;
      }
    }
  }

  closeInventory() {
    const modal = document.getElementById("evidence-inventory-modal");
    if (!modal) return;
    modal.classList.remove("active");
    setTimeout(() => { modal.hidden = true; }, 200);
  }

  async fetchVerseInline(refString, targetEl, btnEl) {
    targetEl.innerHTML = `Loading…`;
    targetEl.hidden = false;
    try {
      const parts = refString.match(/((?:\d\s)?[A-Za-z][^0-9]*)\s(\d+):(\d+)/);
      if (!parts) throw new Error('Could not parse reference');
      const apiRef = `${parts[1].toLowerCase().replace(/\s/g, '')}+${parts[2]}:${parts[3]}`;
      const r = await fetch(`https://bible-api.com/${apiRef}?translation=web`);
      const j = await r.json();
      targetEl.innerHTML = `<div class="verse-ref">${j.reference}</div><div>${j.verses[0].text}</div>`;
      this.audio.playClue();
    } catch (err) {
      targetEl.innerHTML = `Could not load verse.`;
    }
  }

  onChatAction(result) {
    this.switchInvTab('people');
    if (result?.type === "talk_complete") { this.switchInvTab('scene'); }
  }

  _showEvidenceToast(html) {
    let toast = document.getElementById('evidence-unlock-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'evidence-unlock-toast';
      toast.className = 'evidence-unlock-toast';
      toast.style.cssText = 'position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:rgba(0,0,0,0.9);color:#fff;padding:12px 20px;border-radius:8px;font-size:0.9rem;z-index:9000;display:flex;align-items:center;gap:10px;border:1px solid var(--gold,#d4a373);box-shadow:0 4px 12px rgba(0,0,0,0.5);max-width:90vw;';
      document.body.appendChild(toast);
    }
    toast.innerHTML = html;
    toast.style.display = 'flex';
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => { toast.style.display = 'none'; }, 6000);
  }
}

// Evidence toast link delegation
document.addEventListener('click', (e) => {
  const link = e.target.closest('.evidence-toast-link');
  if (!link) return;
  const id = link.dataset.evidenceId;
  if (window.ui && typeof window.ui.openInventory === 'function') {
    window.ui.openInventory();
  }
  const toast = document.getElementById('evidence-unlock-toast');
  if (toast) toast.style.display = 'none';
});
