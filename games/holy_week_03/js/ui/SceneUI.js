import { getIntroHtml, getIntroText } from "../utils.js";

function iconMarkup(icon) {
    if (!icon) return '';
    if (String(icon).includes('<img')) return String(icon);
    if (String(icon).endsWith('.svg')) return `<img src="${icon}" class="icon-svg" loading="lazy">`;
    return String(icon);
}

export class SceneUI {
    constructor(caseManager, evidenceSystem, accessibility, ui) {
        this.cm = caseManager;
        this.es = evidenceSystem;
        this.a11y = accessibility;
        this.ui = ui;
    }

    render() {
        const c = this.cm.getActiveCase();
        if (!c) return '';

        const introText = getIntroText(c.intro) || c.subtitle;
        const introMarkup = this.a11y.getAll().simple_mode
            ? `<p class="scene-intro">${this.a11y.simplify(introText)}</p>`
            : getIntroHtml(c.intro, c.subtitle);

        const hasCanvas = this.ui && (typeof this.ui.init3DScene === 'function' || typeof this.ui.init2DScene === 'function');
        const canvasMount = hasCanvas ? `<div id="scene-canvas-mount" style="display:none;"></div>` : '';
        const nextBtn = hasCanvas ? `<button class="scene-next-btn" id="scene-next-btn">Next</button>` : '';
        const evidenceGrid = !hasCanvas ? this.renderEvidenceGrid() : '';

        return `
            <div class="scene-intro-panel">
                <h3 class="section-title">Crime Scene</h3>
                <div class="prophecy-scene-intro">Examine the scene and tap glowing objects to collect evidence for your investigation.</div>
                ${introMarkup}
                ${nextBtn}
            </div>
            ${canvasMount}
            ${evidenceGrid}`;
    }

    renderEvidenceGrid() {
        const c = this.cm.getActiveCase();
        if (!c) return '';
        return `
            <div class="evidence-grid">
                ${(c.evidencePool || []).map(e => {
                    const col = this.es.collected.includes(e.id);
                    return `<div class="evidence-card ${col ? 'collected' : 'locked'}" 
                                 onclick="${col ? `openEvidenceDetail('${e.id}')` : ''}">
                                <div class="evidence-card-icon">${iconMarkup(e.icon)}</div>
                                <div class="evidence-card-name">${e.name}</div>
                            </div>`;
                }).join("")}
            </div>`;
    }

    openNPCChat(npcId) {
        const npc = this.ui.ns.getNPC(npcId);
        if (!npc) return;

        this.ui.dm.setActiveNPC(npc);
        const c = this.ui.cm.getActiveCase();
        const caseId = c?.id || this.ui.cm.activeCaseId || null;
        const loadedStory = this.ui.dm.getStory(npcId, caseId);

        const handleUnlocks = () => {
            let count = 0;

            if (Array.isArray(npc?.unlocksEvidence)) {
                npc.unlocksEvidence.forEach(id => {
                    const alreadyCollected = typeof this.ui.es.isCollected === "function" ? this.ui.es.isCollected(id) : false;
                    if (alreadyCollected) return;
                    const discovered = this.ui.es.discover(id);
                    const evidence = discovered || (typeof this.ui.es.getById === "function" ? this.ui.es.getById(id) : null);
                    this.ui.peopleUI.addSystem(`<img src='../assets/gfx/lock-open-duotone.svg' class='icon-svg' loading='lazy'> New clue: ${evidence?.name || id}`, npcId);
                    count++;
                });
            }

            if (npc?.revealsProphecy) {
                const prophecy = this.ui.es.getProphecyById(npc.revealsProphecy);
                if (prophecy) {
                    const caseProgress = this.ui.cm.getCaseProgress?.(caseId);
                    const alreadyFound = caseProgress?.propheciesFound?.includes(npc.revealsProphecy);
                    if (!alreadyFound) {
                        const currentStatus = this.ui.cm?.getCodexStatus?.(npc.revealsProphecy);
                        if (currentStatus === 'unseen') {
                            this.ui.cm?.setCodexStatus?.(npc.revealsProphecy, 'rumor');
                        }
                        this.ui.peopleUI.addSystem(`<img src='../assets/gfx/chat-duotone.svg' class='icon-svg' loading='lazy'> New Rumor: ${prophecy.reference}`, npcId);
                        count++;
                    }
                }
            }

            if (Array.isArray(npc?.unlocksSuspects)) {
                npc.unlocksSuspects.forEach(suspectId => {
                    const cm = this.ui.npcs?.caseManager;
                    const wasUnlocked = typeof cm?.isSuspectUnlocked === "function" ? cm.isSuspectUnlocked(suspectId) : false;

                    if (typeof this.ui.npcs.unlockSuspect === "function") {
                        this.ui.npcs.unlockSuspect(suspectId);
                    }
                    if (typeof cm?.discoverSuspect === "function") cm.discoverSuspect(suspectId);
                    else if (typeof cm?.unlockSuspect === "function") cm.unlockSuspect(suspectId);

                    const isUnlocked = typeof cm?.isSuspectUnlocked === "function" ? cm.isSuspectUnlocked(suspectId) : !!this.ui.npcs.getState?.(suspectId)?.isSuspectUnlocked;
                    if (!isUnlocked || wasUnlocked) return;

                    if (this.ui.onChatAction) {
                        this.ui.onChatAction({ type: "reveal_suspect", suspectId, npcId });
                    }

                    const suspect = this.ui.ns.getNPC(suspectId);
                    this.ui.peopleUI.addSystem(`<img src='../assets/gfx/balance-scale-duotone.svg' class='icon-svg' loading='lazy'> New suspect identified: ${suspect ? suspect.name : suspectId}`, npcId);
                    count++;
                });
            }

            return count;
        };

        if (loadedStory) {
            const story = this.ui.dm.createStory(npcId, caseId);
            this.ui.dm.openDialogue(npc, story,
                () => {
                    const unlocked = handleUnlocks();
                    const peopleView = document.getElementById("inv-people");
                    if (peopleView) this.ui.peopleUI._refreshNPCFeed(npcId, peopleView);
                    if (this.ui.onChatAction) this.ui.onChatAction({ type: "talk_complete", npcId, unlocked });
                },
                (text, type) => this.ui.peopleUI.addMessage(type === 'player' ? 'Investigator' : npc.name, text, type, {}, npcId)
            );
        } else {
            const talkFn = (typeof this.ui.ns.talkProgressive === "function" && this.ui.ns.talkProgressive.bind(this.ui.ns)) ||
                           (typeof this.ui.ns.talk === "function" && this.ui.ns.talk.bind(this.ui.ns));
            const result = talkFn ? talkFn(npcId) : null;
            if (result) {
                const unlocked = handleUnlocks();
                this.ui.peopleUI.addMessage(result.speaker, result.text, "npc", { wasCorrected: result.wasCorrected }, npcId);
                const peopleView = document.getElementById("inv-people");
                if (peopleView) this.ui.peopleUI._refreshNPCFeed(npcId, peopleView);
                if (this.ui.onChatAction) this.ui.onChatAction({ type: "talk_complete", npcId, unlocked });
            }
        }
    }
}