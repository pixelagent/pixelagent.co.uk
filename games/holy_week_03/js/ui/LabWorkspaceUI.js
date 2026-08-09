import { OPERATIONS } from "../gameplay/deductionEngine.js";

export class LabWorkspaceUI {
  constructor(deductionEngine, evidenceSystem, accessibility, onResult) {
    this.de = deductionEngine;
    this.es = evidenceSystem;
    this.a11y = accessibility;
    this.onResult = onResult;

    // Track current tab for info buttons
    this.currentTab = "compare";
    this.selectedCardId = null;
    this._pendingResultModal = null;
  }

  render() {
    return `
      <div id="lab-workspace" role="region" aria-label="Lab Workspace">

        <div>

          <div class="lab-header-row">
            <h3 class="section-title">Deduction Lab</h3>
          </div>
          <div class="prophecy-lab-intro">
            <span>Gain points by correctly analyzing evidence.</span>
          </div>

          <div class="lab-actions" role="group" aria-label="Analysis operations">
            <button class="lab-btn active" data-lw-tab="compare" aria-label="Compare: Are these consistent?">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-magnifying-glass"></i></span>
              <span class="lab-btn-label">Compare</span>
            </button>
            <button class="lab-btn" data-lw-tab="link" aria-label="Link: Do they point to the same conclusion?">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-link"></i></span>
              <span class="lab-btn-label">Link</span>
            </button>
            <button class="lab-btn" data-lw-tab="timeline" aria-label="Timeline: What happened first?">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-clock"></i></span>
              <span class="lab-btn-label">Timeline</span>
            </button>
            <button class="lab-btn" data-lw-tab="contradict" aria-label="Contradict: Do these conflict?">
              <span class="lab-btn-icon" aria-hidden="true"><i class="fa-solid fa-bolt"></i></span>
              <span class="lab-btn-label">Contradict</span>
            </button>
          </div>



          <div id="lw-feedback" class="lw-feedback" role="status" aria-live="polite"></div>

           <div id="lw-panel-compare" class="tab-panel active" role="tabpanel" aria-label="Comparator">
 <div class="actions-bar">
               <button class="btn-secondary" id="lw-comp-clear">Clear</button>
               <button class="btn-submit" id="lw-comp-test">Compare</button>
             </div>
           <div class="listgrid">  

           

            <div class="comparator-stage">
              <div class="comparator-slots">
                <div class="comparator-slot" id="lw-comp-slot-0">
                  <div class="slot-label" aria-hidden="true"><span class="sr-only">Slot A</span></div>
                  <div id="lw-comp-card-0"><span class="slot-label">Slot A</span></div>
                </div>
                <div class="comparator-slot" id="lw-comp-slot-1">
                  <div class="slot-label" aria-hidden="true"><span class="sr-only">Slot B</span></div>
                  <div id="lw-comp-card-1"><span class="slot-label">Slot B</span></div>
                </div>
              </div>
            </div>
           
            <div class="card-pool-grid" id="lw-comp-bank"></div>
            <div class="compare-progress" id="lw-compare-progress">
              <span class="compare-progress-label">Pairs found:</span>
              <span class="compare-progress-count">0/0</span>
            </div>
            <div class="matched-pairs-panel" id="lw-matched-pairs">
              <div class="matched-pairs-header">Matched Pairs</div>
              <div class="matched-pairs-list" id="lw-matched-pairs-list"></div>
            </div>
          </div>
            
           
          </div>

          <div id="lw-panel-link" class="tab-panel" role="tabpanel" aria-label="Evidence folders">
          <div class="actions-bar">
              <button class="btn-submit" id="lw-folder-submit">Verify Folders</button>
            </div>
            
            <div class="listgrid">  
               </div>
            
           

           <div class="folder-grid" id="lw-folder-grid"></div>
            <p style="font-size:0.72rem; color: var(--text-muted); margin-bottom:6px;">Unfiled items:</p>

            <div class="card-pool-grid" id="lw-folder-bank"></div>

       
          </div>

          <div id="lw-panel-timeline" class="tab-panel" role="tabpanel" aria-label="Timeline">
                <div class="actions-bar">
              <button class="btn-secondary" id="lw-timeline-clear">Clear</button>
              <button class="btn-submit" id="lw-timeline-test">Verify Chronology</button>
            </div>
            <div class="listgrid">

            
            <div class="timeline-vertical-box" id="lw-timeline-steps"></div>
            <p style="font-size:0.72rem; color: var(--text-muted); margin-bottom:6px;">Unassigned items:</p>
           
            <div class="card-pool-grid" id="lw-timeline-bank"></div>
            </div>

        
            
          </div>

          <div id="lw-panel-contradict" class="tab-panel" role="tabpanel" aria-label="Shredder">
            <div class="actions-bar">
              <button class="btn-submit" id="lw-shredder-submit">Verify Shredded</button>
            </div>
          <div class="listgrid">  

              
            <div class="desk-stage">
              <div class="desk-station" id="lw-candle">
                <div class="station-emoji"><img src="../assets/gfx/flame-duotone.svg" class="icon-svg" loading="lazy"  alt=""></div>
                <div class="station-title">Candlelight Inspector</div>
                <div class="candle-viewer" id="lw-candle-viewer"></div>
              </div>
              <div class="desk-station" id="lw-shredder">
                <div class="station-emoji"><img src="../assets/gfx/scissors-duotone.svg" class="icon-svg" loading="lazy"  alt=""></div>
                <div class="station-title" style="color:var(--red)">Shredder Bin</div>
                <span style="font-size:0.68rem; color:#fca5a5; margin-top:2px;">Drag fake evidence here.</span>
              </div>
            </div>
            <p style="font-size:0.72rem; color: var(--text-muted); margin-bottom:4px;">Active items:</p>
           
            <div class="card-pool-grid" id="lw-desk-bank"></div>
              <p style="font-size:0.72rem; color:var(--red); margin-bottom:4px;">Shredded bin (tap to restore):</p>
            <div class="trash-archive-box card-pool-grid" id="lw-shredded-bank"></div>
            </div>

          


       
            
          </div>

          <div id="lw-modal-mask" class="modal-mask" onclick="this.classList.remove('open')">
            <div class="modal-card" onclick="event.stopPropagation()">
              <div class="modal-header">
                <div id="lw-modal-title" class="modal-title">Title</div>
                <button class="modal-close" onclick="document.getElementById('lw-modal-mask').classList.remove('open')">✕</button>
              </div>
              <div id="lw-modal-body" class="modal-body">Description...</div>
              <div id="lw-modal-detail"></div>
            </div>
          </div>

          <div id="lw-result-modal-mask" class="modal-mask" onclick="this.classList.remove('open')">
            <div class="modal-card result-celebration" onclick="event.stopPropagation()">
              <div class="celebration-stars" aria-hidden="true">
                <span class="star star-1">✦</span>
                <span class="star star-2">✦</span>
                <span class="star star-3">✦</span>
                <span class="star star-4">✦</span>
                <span class="star star-5">✦</span>
                <span class="star star-6">✦</span>
                <span class="star star-7">✦</span>
                <span class="star star-8">✦</span>
              </div>
              <div class="modal-header">
                <div id="lw-result-modal-title" class="modal-title celebration-title">🎉 Amazing Work!</div>
                <button class="modal-close" onclick="document.getElementById('lw-result-modal-mask').classList.remove('open')">✕</button>
              </div>
              <div id="lw-result-modal-body" class="modal-body celebration-body"></div>
              <div id="lw-result-modal-detail" class="celebration-detail"></div>
            </div>
          </div>
        </div>
      </div>`;
  }

  bindEvents(container) {
    this.root = container.querySelector("#lab-workspace");
    if (!this.root) return;

    this._initState();
    this._restoreActiveTab();
    this._setFeedback("Tap items or use buttons to complete each task.");
    this._renderBanks();

    this.root.querySelectorAll(".lab-btn[data-lw-tab]").forEach(btn => {
      btn.addEventListener("click", () => {
        this.root.querySelectorAll(".lab-btn[data-lw-tab]").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        const tab = btn.dataset.lwTab;
        this.root.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
        const panel = this.root.querySelector(`#lw-panel-${tab}`);
        if (panel) panel.classList.add("active");
        this.currentTab = tab;
      });
    });

    this.root.querySelector("#lw-comp-clear")?.addEventListener("click", () => this._clearComparator());
    this.root.querySelector("#lw-comp-test")?.addEventListener("click", () => this._testComparator());
    this.root.querySelector("#lw-folder-submit")?.addEventListener("click", () => this._submitFolders());
    this.root.querySelector("#lw-timeline-clear")?.addEventListener("click", () => this._clearTimeline());
    this.root.querySelector("#lw-timeline-test")?.addEventListener("click", () => this._testTimeline());
    this.root.querySelector("#lw-shredder-submit")?.addEventListener("click", () => this._submitShredder());

    if (!container.dataset.lwBound) {
      container.dataset.lwBound = "1";
      container.addEventListener("click", (e) => {
        const slot = e.target.closest(".comparator-slot");
        if (slot && !e.target.closest(".ev-info-btn")) {
          const idx = parseInt(slot.id.replace("lw-comp-slot-", ""), 10);
          if (this.compareSlots[idx]) {
            this.compareSlots[idx] = null;
            this._renderComparatorSlots();
            this._renderComparatorBank();
            this._setFeedback(`Cleared Slot ${idx === 0 ? 'A' : 'B'}.`);
          } else {
            this._activeComparatorSlotIndex = idx;
            this._setFeedback(`Slot ${idx === 0 ? 'A' : 'B'} selected. Tap an item to place.`, "success");
          }
          return;
        }

        const folderHeader = e.target.closest(".folder-tray-header");
        if (folderHeader) {
          const tray = folderHeader.closest(".folder-tray");
          if (tray) tray.classList.toggle("expanded");
          return;
        }

        const folder = e.target.closest(".folder-tray");
        if (folder && !e.target.closest(".ev-card, .ev-info-btn, [data-folder-info]")) {
          this._activeFolderKey = folder.dataset.folder;
          this._setFeedback(`Tap an item to file into ${folderInfoData[this._activeFolderKey]?.title || this._activeFolderKey}.`, "success");
          return;
        }

        const stepHeader = e.target.closest(".step-header[data-step-toggle]");
        if (stepHeader) {
          const step = stepHeader.closest(".timeline-step");
          if (step) step.classList.toggle("expanded");
          return;
        }

        const step = e.target.closest(".timeline-step");
        if (step && !e.target.closest(".ev-card, .ev-info-btn")) {
          this._activeTimelineStep = parseInt(step.dataset.step, 10);
          this._setFeedback(`Tap an item to place into step ${this._activeTimelineStep}.`, "success");
          return;
        }

        const deskStation = e.target.closest(".desk-station");
        if (deskStation && !e.target.closest(".ev-card, .ev-info-btn")) {
          if (deskStation.id === "lw-candle") this._activeDeskStation = "candle";
          if (deskStation.id === "lw-shredder") this._activeDeskStation = "shredder";
          this._setFeedback(this._activeDeskStation === "candle" ? "Tap item to inspect under candlelight." : "Tap item to shred.");
          return;
        }

        const infoBtn = e.target.closest(".ev-info-btn");
        if (infoBtn) {
          e.stopPropagation();
          const id = infoBtn.dataset.evidenceId;
          this._openDetail(id);
          return;
        }

        const card = e.target.closest(".ev-card");
        if (card) {
          const id = card.dataset.evidenceId;
          const item = this.evidence.find(i => i.id === id);
          if (!item) return;

          // Clicking a card that's already in a comparator slot removes it
          const slot = card.closest(".comparator-slot");
          if (slot) {
            const idx = parseInt(slot.id.replace("lw-comp-slot-", ""), 10);
            if (this.compareSlots[idx]?.id === id) {
              this.compareSlots[idx] = null;
              this._renderComparatorSlots();
              this._renderComparatorBank();
              this._setFeedback(`Removed ${item.name} from Slot ${idx === 0 ? 'A' : 'B'}.`);
              return;
            }
          }

          // Clicking a card that's already in a timeline step removes it
          const timelineStep = card.closest(".timeline-step");
          if (timelineStep) {
            const step = parseInt(timelineStep.dataset.step, 10);
            const idx = this.timelineSlots[step]?.indexOf(id);
            if (idx >= 0) {
              this.timelineSlots[step].splice(idx, 1);
              this._renderTimelineSteps();
              this._renderTimelineBank();
              this._setFeedback(`Removed ${item.name} from Step ${step}.`);
              return;
            }
          }

          if (this._activeComparatorSlotIndex !== null) {
            this.compareSlots[this._activeComparatorSlotIndex] = item;
            this._activeComparatorSlotIndex = null;
            this._renderComparatorSlots();
            this._renderComparatorBank();
            this._setFeedback(`Placed ${item.name} in comparison.`, "success");
          } else if (this._activeFolderKey) {
            if (!this.folderState[this._activeFolderKey]) this.folderState[this._activeFolderKey] = [];
            if (!this.folderState[this._activeFolderKey].includes(id)) {
              this.folderState[this._activeFolderKey].push(id);
              this._renderFolderContents();
              this._setFeedback(`Filed ${item.name}.`, "success");
              const tray = this.root.querySelector(`.folder-tray[data-folder="${this._activeFolderKey}"]`);
              if (tray) tray.classList.add("expanded");
            } else {
              this.folderState[this._activeFolderKey] = this.folderState[this._activeFolderKey].filter(i => i !== id);
              this._renderFolderContents();
              this._setFeedback(`Unfiled ${item.name}.`, "success");
            }
          } else if (this._activeTimelineStep) {
            const step = this._activeTimelineStep;
            if (!this.timelineSlots[step]) this.timelineSlots[step] = [];
            const idx = this.timelineSlots[step].indexOf(id);
            if (idx >= 0) {
              this.timelineSlots[step].splice(idx, 1);
            } else {
              this.timelineSlots[step].push(id);
              const stepEl = this.root.querySelector(`.timeline-step[data-step="${step}"]`);
              if (stepEl) stepEl.classList.add("expanded");
            }
            this._activeTimelineStep = null;
            this._renderTimelineSteps();
            this._renderTimelineBank();
          } else if (this._activeDeskStation === "candle") {
            this.candleItem = item;
            this._activeDeskStation = null;
            this._renderCandleViewer();
            this._renderDeskBank();
            this.onResult?.({ scoreDelta: -1 });
          } else if (this._activeDeskStation === "shredder") {
            this.deskItems = this.deskItems.filter(i => i.id !== id);
            if (!this.shreddedItems.find(i => i.id === id)) this.shreddedItems.push(item);
            this._renderDeskBank();
            this._renderShreddedBank();
            this._setFeedback(`Shredded ${item.name}.`, "success");
          } else {
            this._setFeedback(`Select an action for ${item.name} first.`, "error");
          }
        }
      });

      // Drag and drop events
      container.addEventListener("dragstart", (e) => {
        const card = e.target.closest(".ev-card");
        if (!card) return;
        const id = card.dataset.evidenceId;
        e.dataTransfer.setData('text/plain', id);
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => card.classList.add('dragging'), 0);
      }, true);

      container.addEventListener("dragend", (e) => {
        const card = e.target.closest(".ev-card");
        if (card) card.classList.remove('dragging');
        this.root.querySelectorAll('.drop-hover').forEach(el => el.classList.remove('drop-hover'));
      }, true);

      container.addEventListener("dragover", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step, .desk-station, #lw-desk-bank, #lw-shredded-bank");
        if (dropZone) {
          e.preventDefault();
          e.dataTransfer.dropEffect = 'move';
        }
      });

      container.addEventListener("dragenter", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step, .desk-station, #lw-desk-bank, #lw-shredded-bank");
        if (dropZone) {
          e.preventDefault();
          dropZone.classList.add('drop-hover');
        }
      });

      container.addEventListener("dragleave", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step, .desk-station, #lw-desk-bank, #lw-shredded-bank");
        if (dropZone && !dropZone.contains(e.relatedTarget)) {
          dropZone.classList.remove('drop-hover');
        }
      });

      container.addEventListener("drop", (e) => {
        const dropZone = e.target.closest(".comparator-slot, .folder-tray, .timeline-step, .desk-station, #lw-desk-bank, #lw-shredded-bank");
        if (!dropZone) return;
        e.preventDefault();
        dropZone.classList.remove('drop-hover');
        const id = e.dataTransfer.getData('text/plain');
        if (!id) return;

        if (dropZone.id.startsWith('lw-comp-slot-')) {
          const idx = parseInt(dropZone.id.replace("lw-comp-slot-", ""), 10);
          if (this.compareSlots[idx]?.id === id) {
            this.compareSlots[idx] = null;
            this._setFeedback(`Removed from Slot ${idx === 0 ? 'A' : 'B'}.`);
          } else {
            for (let s = 0; s < 2; s++) {
              if (this.compareSlots[s]?.id === id) {
                this.compareSlots[s] = null;
                break;
              }
            }
            this.compareSlots[idx] = this.evidence.find(i => i.id === id);
            this._setFeedback(`Placed in Slot ${idx === 0 ? 'A' : 'B'}.`, "success");
          }
          this._renderComparatorSlots();
          this._renderComparatorBank();
        } else if (dropZone.classList.contains('folder-tray')) {
          const key = dropZone.dataset.folder;
          if (!this.folderState[key]) this.folderState[key] = [];
          const alreadyHere = this.folderState[key].includes(id);
          for (const k in this.folderState) {
            const idx = this.folderState[k].indexOf(id);
            if (idx >= 0) this.folderState[k].splice(idx, 1);
          }
          if (!alreadyHere) {
            this.folderState[key].push(id);
            this._setFeedback(`Filed item.`, "success");
            const tray = this.root.querySelector(`.folder-tray[data-folder="${key}"]`);
            if (tray) tray.classList.add("expanded");
          } else {
            this._setFeedback(`Unfiled item.`, "success");
          }
          this._renderFolderContents();
        } else if (dropZone.classList.contains('timeline-step')) {
          const step = parseInt(dropZone.dataset.step, 10);
          if (!this.timelineSlots[step]) this.timelineSlots[step] = [];
          const alreadyHere = this.timelineSlots[step].includes(id);
          for (const s in this.timelineSlots) {
            const idx = this.timelineSlots[s].indexOf(id);
            if (idx >= 0) this.timelineSlots[s].splice(idx, 1);
          }
          if (!alreadyHere) {
            this.timelineSlots[step].push(id);
            this._setFeedback(`Placed in Step ${step}.`, "success");
            const stepEl = this.root.querySelector(`.timeline-step[data-step="${step}"]`);
            if (stepEl) stepEl.classList.add("expanded");
          } else {
            this._setFeedback(`Removed from Step ${step}.`, "success");
          }
          this._renderTimelineSteps();
          this._renderTimelineBank();
        } else if (dropZone.id === 'lw-candle') {
          this.candleItem = this.evidence.find(i => i.id === id);
          this._renderCandleViewer();
          this._renderDeskBank();
          this.onResult?.({ scoreDelta: -1 });
        } else if (dropZone.id === 'lw-shredder') {
          this.deskItems = this.deskItems.filter(i => i.id !== id);
          if (!this.shreddedItems.find(i => i.id === id)) {
            this.shreddedItems.push(this.evidence.find(i => i.id === id));
          }
          this._renderDeskBank();
          this._renderShreddedBank();
          this._setFeedback(`Shredded item.`, "success");
        } else if (dropZone.id === 'lw-desk-bank') {
          this.shreddedItems = this.shreddedItems.filter(i => i.id !== id);
          if (!this.deskItems.find(i => i.id === id)) {
            this.deskItems.push(this.evidence.find(i => i.id === id));
          }
          this._renderDeskBank();
          this._renderShreddedBank();
          this._setFeedback(`Restored to desk.`, "success");
        } else if (dropZone.id === 'lw-shredded-bank') {
          this.deskItems = this.deskItems.filter(i => i.id !== id);
          if (!this.shreddedItems.find(i => i.id === id)) {
            this.shreddedItems.push(this.evidence.find(i => i.id === id));
          }
          this._renderDeskBank();
          this._renderShreddedBank();
          this._setFeedback(`Shredded item.`, "success");
        }
      }, true);
    }

    this._flushPendingResultModal();
  }

  _initState() {
    this.score = 0;
    const pool = this.es.getEvidencePool?.() || [];
    const typeMap = { physical: 'physical', testimonial: 'testimonial', analytical: 'analytical', environmental: 'environmental' };
    const categoryMap = { people: 'testimonial', event: 'environmental', prophecy: 'analytical' };
    this.evidence = pool.map(e => ({
      id: e.id,
      name: e.name,
      icon: e.icon || e.emoji || '',
      category: typeMap[e.type] || categoryMap[e.category] || e.category || e.type || 'physical',
      timelineOrder: e.timelineOrder ?? null,
      fake: !!e.fake,
      desc: e.desc || e.name,
      clues: e.clues || { compare: '', link: '', timeline: '', contradict: '' }
    }));
    this.compareSlots = [null, null];
    this.folderState = {};
    this.timelineSlots = {};
    this.deskItems = this.evidence.map(e => ({ ...e }));
    this.shreddedItems = [];
    this.candleItem = null;
    this.activeTab = "compare";
    this._activeComparatorSlotIndex = null;
    this._activeFolderKey = null;
    this._activeTimelineStep = null;
    this._activeDeskStation = null;
    this.selectedCardId = null;
    this.matchedPairs = [];
    this._pendingResultModal = null;
  }

  _renderBanks() {
    this._renderComparatorBank();
    this._renderFolderGrid();
    this._renderFolderContents();
    this._renderTimelineSteps();
    this._renderTimelineBank();
    this._renderDeskBank();
    this._renderShreddedBank();
    this._renderMatchedPairs();
    this._updateCompareProgress();
  }

  _updateCompareProgress() {
    const countEl = this.root.querySelector("#lw-compare-progress .compare-progress-count");
    if (!countEl) return;
    const found = this.matchedPairs.length;
    const total = this._getTotalComparePairs();
    countEl.textContent = `${found}/${total}`;
  }

  _getTotalComparePairs() {
    const items = this.evidence.filter(e => (e.clues?.compare || "").trim());
    const pairSet = new Set();
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const a = items[i];
        const b = items[j];
        const clueA = (a.clues?.compare || "").toLowerCase();
        const clueB = (b.clues?.compare || "").toLowerCase();
        if (clueA.includes(b.name.toLowerCase()) || clueB.includes(a.name.toLowerCase())) {
          const key = [a.id, b.id].sort().join("|");
          pairSet.add(key);
        }
      }
    }
    return pairSet.size;
  }

  _renderMatchedPairs() {
    const list = this.root.querySelector("#lw-matched-pairs-list");
    if (!list) return;
    if (this.matchedPairs.length === 0) {
      list.innerHTML = `<span style="font-size:0.72rem; color:var(--text-dim);">No pairs matched yet</span>`;
      return;
    }
    list.innerHTML = this.matchedPairs.map(([aId, bId]) => {
      const a = this.evidence.find(e => e.id === aId);
      const b = this.evidence.find(e => e.id === bId);
      const aHtml = a ? this._cardHTML(a, "matched") : `<span>${aId}</span>`;
      const bHtml = b ? this._cardHTML(b, "matched") : `<span>${bId}</span>`;
      return `<div class="matched-pair-row">${aHtml}<span class="pair-arrow">→</span>${bHtml}</div>`;
    }).join("");
  }

  _renderComparatorBank() {
    const bank = this.root.querySelector("#lw-comp-bank");
    if (!bank) return;
    const matchedIds = new Set(this.matchedPairs.flat());
    const available = this.evidence.filter(item => !matchedIds.has(item.id));
    bank.innerHTML = available.map(item => {
      const inSlotA = this.compareSlots[0]?.id === item.id;
      const inSlotB = this.compareSlots[1]?.id === item.id;
      const selClass = inSlotA || inSlotB ? "selected" : "";
      const badge = inSlotA ? "A" : inSlotB ? "B" : null;
      return this._cardHTML(item, selClass, badge);
    }).join("");
    if (!bank.dataset.bound) {
      bank.dataset.bound = "1";
      bank.addEventListener("click", (e) => {
        const card = e.target.closest(".ev-card");
        if (!card) return;
        const infoBtn = e.target.closest(".ev-info-btn");
        if (infoBtn) return;
        const item = this.evidence.find(i => i.id === card.dataset.evidenceId);
        if (!item) return;
        const currentSelected = new Set(this.compareSlots.filter(Boolean).map(i => i.id));
        if (currentSelected.has(item.id)) {
          this._setFeedback(`${item.name} is already placed. Tap the slot to remove it.`, "error");
          e.stopPropagation();
          return;
        }
        const empty = this.compareSlots.findIndex(s => s === null);
        if (empty >= 0) {
          this.compareSlots[empty] = item;
        } else {
          this.compareSlots[0] = item;
        }
        this._renderComparatorSlots();
        this._renderComparatorBank();
        this._setFeedback(`Added ${item.name} to comparison.`, "success");
        e.stopPropagation();
      });
    }
  }

  _renderComparatorSlots() {
    for (let i = 0; i < 2; i++) {
      const slot = this.root.querySelector(`#lw-comp-card-${i}`);
      const container = this.root.querySelector(`#lw-comp-slot-${i}`);
      if (!slot || !container) continue;
      const item = this.compareSlots[i];
      if (item) {
        slot.innerHTML = this._cardHTML(item, "selected");
        container.classList.add("filled");
      } else {
        container.setAttribute("data-empty-label", `Slot ${i === 0 ? 'A' : 'B'}`);
        slot.innerHTML = "";
        container.classList.remove("filled");
      }
    }
  }

  _renderFolderGrid() {
    const grid = this.root.querySelector("#lw-folder-grid");
    if (!grid) return;
    const folderTitles = { physical: 'Physical Evidence', testimonial: 'Testimonial Evidence', analytical: 'Analytical Evidence', environmental: 'Environmental Evidence' };
    const folders = [
      { key: 'physical', title: folderTitles['physical'] },
      { key: 'testimonial', title: folderTitles['testimonial'] },
      { key: 'analytical', title: folderTitles['analytical'] },
      { key: 'environmental', title: folderTitles['environmental'] }
    ];
    grid.innerHTML = folders.map(f => `
      <div class="folder-tray" data-folder="${f.key}">
        <div class="folder-tray-header" data-folder-toggle="${f.key}">
          <span class="folder-header-title">${f.title}</span>
          <span class="folder-chevron" aria-hidden="true">▼</span>
        </div>
        <div class="folder-tray-body">
          <div class="folder-content" id="lw-folder-${f.key}"></div>
        </div>
      </div>
    `).join("");

    grid.querySelectorAll("[data-folder-info]").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const key = btn.dataset.folderInfo;
        const info = folderInfoData[key];
        if (!info) return;
        document.getElementById("lw-modal-title").textContent = info.title;
        document.getElementById("lw-modal-body").textContent = info.desc;
        document.getElementById("lw-modal-detail").innerHTML = "";
        document.getElementById("lw-modal-mask").classList.add("open");
      });
    });
  }

  _renderFolderContents() {
    for (const key of ['physical', 'testimonial', 'analytical', 'environmental']) {
      const el = this.root.querySelector(`#lw-folder-${key}`);
      if (!el) continue;
      const ids = this.folderState[key] || [];
      const items = ids.map(id => this.evidence.find(e => e.id === id)).filter(Boolean);
      if (items.length === 0) {
        el.innerHTML = `<span style="font-size:0.72rem; color:var(--text-dim);">Empty</span>`;
      } else {
        el.innerHTML = items.map(i => this._cardHTML(i, "selected")).join("");
      }
    }
    const bank = this.root.querySelector("#lw-folder-bank");
    if (bank) {
      const filed = new Set(Object.values(this.folderState).flat());
      const unfiled = this.evidence.filter(e => !filed.has(e.id));
      bank.innerHTML = unfiled.length ? unfiled.map(i => this._cardHTML(i)).join("") : `<span style="font-size:0.72rem; color:var(--text-dim);">All items filed</span>`;
    }
  }

  _renderTimelineSteps() {
    const stepsEl = this.root.querySelector("#lw-timeline-steps");
    if (!stepsEl) return;
    const orders = [...new Set(this.evidence.filter(e => e.timelineOrder != null).map(e => e.timelineOrder))].sort((a, b) => a - b);
    const steps = orders.map((num, idx) => {
      const count = this.evidence.filter(e => e.timelineOrder === num).length;
      return { num, title: `Event ${num}`, hint: `${count} item${count !== 1 ? 's' : ''}` };
    });
    stepsEl.innerHTML = steps.map(s => {
      const ids = this.timelineSlots[s.num] || [];
      const filled = ids.length > 0 ? "filled" : "";
      const itemsHtml = ids.map(id => {
        const item = this.evidence.find(e => e.id === id);
        return item ? this._cardHTML(item, "selected") : "";
      }).join("");
      const requiredCount = this.evidence.filter(e => e.timelineOrder === s.num).length;
      const badgeHtml = requiredCount > 0 ? `<span class="timeline-badge">${ids.length}/${requiredCount}</span>` : '';
      return `
        <div class="timeline-step ${filled}" data-step="${s.num}">
          <div class="step-header" data-step-toggle="${s.num}">
            <div>
              <span class="step-title">${s.title}</span>
              <span class="step-hint">${s.hint}</span>
              ${badgeHtml}
            </div>
            <span class="step-chevron" aria-hidden="true">▼</span>
          </div>
          <div class="step-body">
            <div class="step-cards-container" id="lw-timeline-step-${s.num}">
              ${itemsHtml || `<span style="font-size:0.72rem; color:var(--text-dim);">Tap item then here</span>`}
            </div>
          </div>
        </div>
      `;
    }).join("");
  }

  _renderTimelineBank() {
    const bank = this.root.querySelector("#lw-timeline-bank");
    if (!bank) return;
    const assigned = new Set(Object.values(this.timelineSlots).flat());
    const unassigned = this.evidence.filter(e => !assigned.has(e.id));
    bank.innerHTML = unassigned.length ? unassigned.map(i => this._cardHTML(i)).join("") : `<span style="font-size:0.72rem; color:var(--text-dim);">All placed</span>`;
  }

  _renderDeskBank() {
    const bank = this.root.querySelector("#lw-desk-bank");
    if (!bank) return;
    bank.innerHTML = this.deskItems.length ? this.deskItems.map(i => this._cardHTML(i, "selected")).join("") : `<span style="font-size:0.72rem; color:var(--text-dim);">All processed</span>`;
  }

  _renderCandleViewer() {
    const viewer = this.root.querySelector("#lw-candle-viewer");
    if (!viewer) return;
    if (!this.candleItem) {
      viewer.innerHTML = `<span style="font-size:0.68rem; color:var(--text-dim);">Drag/tap item here.</span>`;
      return;
    }
    viewer.innerHTML = this._cardHTML(this.candleItem, "selected");
    const card = viewer.querySelector(".ev-card");
    if (this.candleItem.fake) {
      card?.classList.add("wrong-flash");
      this._setFeedback(`Warning: ${this.candleItem.name} looks forged under light. (-1 pt)`, "error");
    } else {
      card?.classList.add("correct-flash");
      this._setFeedback(`${this.candleItem.name} appears genuine. (-1 pt)`, "success");
    }
  }

  _renderShreddedBank() {
    const bank = this.root.querySelector("#lw-shredded-bank");
    if (!bank) return;
    bank.innerHTML = this.shreddedItems.length ? this.shreddedItems.map(i => this._cardHTML(i, "selected")).join("") : `<span style="font-size:0.68rem; color:#fca5a5; pointer-events:none;">Empty</span>`;
  }

  _cardHTML(item, extraClass = "", badge = null) {
    const iconHtml = typeof item.icon === 'string' && item.icon.endsWith('.svg')
      ? `<img src="${item.icon}" class="icon-svg" loading="lazy"  alt="">`
      : item.icon;
    const badgeHtml = badge ? `<span class="sel-badge sel-badge-${badge.toLowerCase()}" aria-hidden="true">${badge}</span>` : '';
    return `<div class="ev-card ${extraClass}" data-evidence-id="${item.id}" draggable="true"><span class="card-icon">${iconHtml}</span><span class="card-name">${item.name}</span>${badgeHtml}<button class="ev-info-btn" data-evidence-id="${item.id}">ⓘ</button></div>`;
  }

  _clearComparator() {
    this.compareSlots = [null, null];
    this._activeComparatorSlotIndex = null;
    this._renderComparatorSlots();
    this._renderComparatorBank();
    this._setFeedback("Comparator cleared.");
  }

  _testComparator() {
    const [a, b] = this.compareSlots;
    if (!a || !b) {
      this._setFeedback("Select two items to compare.", "error");
      return;
    }
    const slot0 = this.root.querySelector("#lw-comp-slot-0");
    const slot1 = this.root.querySelector("#lw-comp-slot-1");
    const card0 = slot0.querySelector(".ev-card");
    const card1 = slot1.querySelector(".ev-card");
    const clueA = (a.clues?.compare || "").toLowerCase();
    const clueB = (b.clues?.compare || "").toLowerCase();
    const match = clueA && clueB && (clueA.includes(b.name.toLowerCase()) || clueB.includes(a.name.toLowerCase()));
    
    if (match) {
      slot0?.classList.add("correct");
      slot1?.classList.add("correct");
      card0?.classList.add("correct-flash");
      card1?.classList.add("correct-flash");
      this._setFeedback(`Match confirmed: ${a.name} & ${b.name}`, "success");
      this.onResult?.({ scoreDelta: 5, feedback: `Match confirmed: ${a.name} & ${b.name}`, feedbackType: "success" });
      const clueText = a.clues?.compare || b.clues?.compare || "Connection established.";
      this._showResultModal("✨ Match Confirmed!", `Match confirmed: ${a.name} & ${b.name}`, `<strong>Insight:</strong> ${clueText}<br><strong>Score:</strong> +5`);
      this._flushPendingResultModal();
      
      this.matchedPairs.push([a.id, b.id]);
      this.compareSlots = [null, null];
      this._renderComparatorSlots();
      this._renderComparatorBank();
      this._renderMatchedPairs();
      this._updateCompareProgress();
      
      const comparable = this.evidence.filter(e => (e.clues?.compare || "").trim());
      const totalPairs = Math.floor(comparable.length / 2);
      if (this.matchedPairs.length >= totalPairs && totalPairs > 0) {
        this._setFeedback("All compare pairs found!", "success");
        this._showResultModal("🎉 Amazing Work!", "All evidence connections have been identified.", `<strong>Reward:</strong> Deduction methodology unlocked.<br><strong>Score:</strong> +25`);
        this._flushPendingResultModal();
      }
      
      setTimeout(() => {
        slot0?.classList.remove("correct", "wrong");
        slot1?.classList.remove("correct", "wrong");
        card0?.classList.remove("correct-flash", "wrong-flash");
        card1?.classList.remove("correct-flash", "wrong-flash");
      }, 1400);
    } else {
      slot0?.classList.add("wrong");
      slot1?.classList.add("wrong");
      card0?.classList.add("wrong-flash");
      card1?.classList.add("wrong-flash");
      this._setFeedback("These do not match. Try again.", "error");
      this.onResult?.({ scoreDelta: -5, feedback: "These do not match.", feedbackType: "error" });
      setTimeout(() => {
        slot0?.classList.remove("correct", "wrong");
        slot1?.classList.remove("correct", "wrong");
        card0?.classList.remove("correct-flash", "wrong-flash");
        card1?.classList.remove("correct-flash", "wrong-flash");
      }, 1400);
    }
  }

  _submitFolders() {
    const expected = {};
    this.evidence.forEach(e => {
      if (!e.timelineOrder && !e.fake) {
        expected[e.category] = (expected[e.category] || 0) + 1;
      }
    });
    let allOk = true;
    let totalCorrect = 0;
    let totalItems = 0;
    for (const key of Object.keys(expected)) {
      const ids = this.folderState[key] || [];
      const count = ids.length;
      totalItems += count;
      const folderEl = this.root.querySelector(`#lw-folder-${key}`);
      if (folderEl) {
        folderEl.classList.remove('correct', 'wrong');
        folderEl.classList.add(count >= expected[key] ? 'correct' : 'wrong');
      }
      if (count < expected[key]) {
        allOk = false;
        this._setFeedback(`Folder ${folderInfoData[key]?.title || key} has ${count}/${expected[key]}.`, "error");
      }
      // Check correctness
      ids.forEach(id => {
        const item = this.evidence.find(e => e.id === id);
        const card = folderEl?.querySelector(`.ev-card[data-evidence-id="${id}"]`);
        if (item && card) {
          totalCorrect++;
          if (item.category === key) {
            card.classList.add("correct-flash");
            card.setAttribute("data-folder-status", "correct");
          } else {
            card.classList.add("wrong-flash");
            card.setAttribute("data-folder-status", "wrong");
            allOk = false;
          }
        }
      });
    }
    const bank = this.root.querySelector("#lw-folder-bank");
    bank?.querySelectorAll(".ev-card").forEach(card => {
      const id = card.dataset.evidenceId;
      const item = this.evidence.find(e => e.id === id);
      if (item && !(item.timelineOrder != null) && !item.fake) {
        card.classList.add("wrong-flash");
        card.setAttribute("data-folder-status", "wrong");
      } else {
        card.classList.add("correct-flash");
        card.setAttribute("data-folder-status", "correct");
      }
    });

    const totalExpected = this.evidence.filter(e => !e.timelineOrder && !e.fake).length;

    if (allOk && totalItems === totalExpected && totalExpected > 0) {
      this._setFeedback("Evidence folders verified.", "success");
      this.onResult?.({ type: 'folder_verify', success: true, scoreDelta: 5, feedback: "Evidence folders verified.", feedbackType: "success" });
      this._showResultModal("🔗 Evidence Linked!", "Evidence folders verified. All items correctly classified.", `<strong>Insight:</strong> Direct, circumstantial, physical, and testimonial evidence properly organized.<br><strong>Score:</strong> +5`);
      this._flushPendingResultModal();
    } else if (totalExpected === 0) {
      this._setFeedback("No items to file.", "error");
      this.onResult?.({ type: 'folder_verify', success: false, scoreDelta: -5, feedback: "No items to file.", feedbackType: "error" });
    } else {
      this._setFeedback("Some items are misfiled.", "error");
      this.onResult?.({ type: 'folder_verify', success: false, scoreDelta: -5, feedback: "Some items are misfiled.", feedbackType: "error" });
    }
    setTimeout(() => {
      this.root.querySelectorAll(".ev-card").forEach(el => el.classList.remove("correct-flash", "wrong-flash"));
      this.root.querySelectorAll("[id^='lw-folder-']").forEach(el => el.classList.remove("correct", "wrong"));
    }, 1400);
  }

  _clearTimeline() {
    this.timelineSlots = {};
    this._activeTimelineStep = null;
    this._renderTimelineSteps();
    this._renderTimelineBank();
    this._setFeedback("Timeline cleared.");
  }

  _testTimeline() {
    let correct = 0;
    const totalTimelineItems = this.evidence.filter(e => e.timelineOrder != null).length;
    const allSteps = [...new Set(this.evidence.filter(e => e.timelineOrder != null).map(e => e.timelineOrder))].sort((a, b) => a - b);
    allSteps.forEach(step => {
      const stepEl = this.root.querySelector(`#lw-timeline-step-${step}`);
      if (!stepEl) return;
      const ids = this.timelineSlots[step] || [];
      if (ids.length === 0) return;
      const allCorrect = ids.every(id => {
        const item = this.evidence.find(e => e.id === id);
        if (item && item.timelineOrder === step) {
          correct++;
          return true;
        }
        return false;
      });
      stepEl.classList.add(allCorrect ? "correct" : "wrong");
      ids.forEach(id => {
        const card = stepEl.querySelector(`.ev-card[data-evidence-id="${id}"]`);
        const item = this.evidence.find(e => e.id === id);
        if (card && item) {
          const isCorrect = item.timelineOrder === step;
          card.classList.add(isCorrect ? "correct-flash" : "wrong-flash");
        }
      });
    });
    if (correct === totalTimelineItems && totalTimelineItems > 0) {
      this._setFeedback("Timeline is correct.", "success");
      this.onResult?.({ type: 'timeline_test', success: true, scoreDelta: 5, feedback: "Timeline is correct.", feedbackType: "success" });
      this._showResultModal("⏱️ Timeline Verified!", "Chronology verified. All events in correct order.", `<strong>Insight:</strong> The sequence of events has been established.<br><strong>Score:</strong> +5`);
      this._flushPendingResultModal();
    } else {
      this._setFeedback(`Timeline has ${correct}/${totalTimelineItems} correct placements.`, "error");
      this.onResult?.({ type: 'timeline_test', success: false, scoreDelta: -5, feedback: `Timeline has ${correct}/${totalTimelineItems} correct placements.`, feedbackType: "error" });
    }
    this._activeTimelineStep = null;
    setTimeout(() => {
      this.root.querySelectorAll(".timeline-step").forEach(el => el.classList.remove("correct", "wrong"));
      this.root.querySelectorAll(".ev-card").forEach(el => el.classList.remove("correct-flash", "wrong-flash"));
    }, 1400);
  }

  _submitShredder() {
    const shreddedIds = new Set(this.shreddedItems.map(i => i.id));
    const deskIds = new Set(this.deskItems.map(i => i.id));
    const shreddedBank = this.root.querySelector("#lw-shredded-bank");
    const deskBank = this.root.querySelector("#lw-desk-bank");

    let correctCount = 0;
    let wrongCount = 0;

    this.evidence.forEach(item => {
      const isFake = !!item.fake;
      const isShredded = shreddedIds.has(item.id);
      const isCorrect = isFake ? isShredded : !isShredded;
      
      if (isCorrect) correctCount++;
      else wrongCount++;

      const card = (isShredded ? shreddedBank : deskBank)?.querySelector(`.ev-card[data-evidence-id="${item.id}"]`);
      if (card) {
        card.classList.add(isCorrect ? "correct-flash" : "wrong-flash");
      }
    });

    const totalFakes = this.evidence.filter(i => i.fake).length;
    const success = wrongCount === 0 && correctCount === this.evidence.length;

    if (success) {
      this._setFeedback(`Shredder verified: ${totalFakes} fake items removed.`, "success");
      this.onResult?.({ type: 'shredder_test', success: true, scoreDelta: 5, feedback: `Shredder verified: ${totalFakes} fake items removed.`, feedbackType: "success" });
      this._showResultModal("💥 Contradiction Found!", `Shredder verified: ${totalFakes} fake items removed.`, `<strong>Insight:</strong> False and misleading evidence identified and removed.<br><strong>Score:</strong> +5`);
      this._flushPendingResultModal();
    } else {
      this._setFeedback(`Shredder incomplete: ${wrongCount} item${wrongCount !== 1 ? 's' : ''} misplaced.`, "error");
      this.onResult?.({ type: 'shredder_test', success: false, scoreDelta: -5, feedback: `Shredder incomplete: ${wrongCount} item${wrongCount !== 1 ? 's' : ''} misplaced.`, feedbackType: "error" });
    }
    setTimeout(() => {
      this.root.querySelectorAll(".ev-card").forEach(el => el.classList.remove("correct-flash", "wrong-flash"));
    }, 1400);
  }

  _setFeedback(text, type = "") {
    const el = this.root.querySelector("#lw-feedback");
    if (!el) return;
    el.className = `lw-feedback ${type}`.trim();
    el.textContent = text;
  }

  _restoreActiveTab() {
    const tab = this.currentTab || "compare";
    this.root.querySelectorAll(".lab-btn[data-lw-tab]").forEach(btn => {
      btn.classList.toggle("active", btn.dataset.lwTab === tab);
    });
    this.root.querySelectorAll(".tab-panel").forEach(p => {
      p.classList.toggle("active", p.id === `lw-panel-${tab}`);
    });
  }

  _openDetail(evId) {
    this.onResult?.({ type: 'detail_view', scoreDelta: -1 });
    const item = this.evidence.find(e => e.id === evId);
    if (!item) return;
    const iconHtml = typeof item.icon === 'string' && item.icon.endsWith('.svg')
      ? `<img src="${item.icon}" class="icon-svg" loading="lazy"  alt="">`
      : item.icon || '';
    document.getElementById("lw-modal-title").innerHTML = `${iconHtml} <span>${item.name}</span>`;
    document.getElementById("lw-modal-body").textContent = item.desc || '';
    const clue = item.clues?.[this.currentTab] || "No hint available.";
    document.getElementById("lw-modal-detail").innerHTML = `
      <div class="detail-row">
        <strong>${this.currentTab.toUpperCase()} HINT:</strong>
        <span>${clue}</span>
      </div>
    `;
    document.getElementById("lw-modal-mask").classList.add("open");
  }

  _showResultModal(title, body, detail) {
    this._pendingResultModal = { title, body, detail: detail || "" };
  }

  _flushPendingResultModal() {
    if (!this._pendingResultModal) return;
    const { title, body, detail } = this._pendingResultModal;
    this._pendingResultModal = null;
    const mask = this.root?.querySelector("#lw-result-modal-mask");
    if (!mask) return;
    const titleEl = mask.querySelector("#lw-result-modal-title");
    const bodyEl = mask.querySelector("#lw-result-modal-body");
    const detailEl = mask.querySelector("#lw-result-modal-detail");
    if (titleEl) titleEl.textContent = title;
    if (bodyEl) bodyEl.textContent = body;
    if (detailEl) detailEl.innerHTML = detail || "";
    mask.classList.add("open");
  }
}

const folderInfoData = {
  physical: { title: "Physical Evidence", desc: "Tangible objects like weapons, DNA, fibres, or physical traces." },
  testimonial: { title: "Testimonial Evidence", desc: "Spoken or written statements from witnesses or specialists." },
  analytical: { title: "Analytical Evidence", desc: "Interpretations, prophetic links, or expert conclusions." },
  environmental: { title: "Environmental Evidence", desc: "Implies a fact through surrounding circumstances or context." }
};