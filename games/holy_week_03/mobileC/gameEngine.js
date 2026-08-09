import { MobileApp } from "./mobileApp.js";
import { CaseManager } from "./../js/gameplay/caseManager.js";
import { EvidenceSystem } from './../js/gameplay/evidenceSystem.js';
import { NPCSystem } from './npcSystem.js';
import { PROFILE_ID_MAP } from './npcSystem.js';
import { DeductionEngine } from './../js/gameplay/deductionEngine.js';
import { LocationSystem } from './../js/gameplay/locationSystem.js';
import { AccessibilityManager } from "../js/ui/AccessibilityManager.js";
import { LabWorkspaceUI } from "../js/ui/LabWorkspaceUI.js";
import { AudioManager } from "./audioManager.js"; // Mobile uses its own AudioManager
import { DialogueManager } from "./dialogueManager.js";

import { UIManager } from "./UIManager.js";
import { GameManager } from "./GameManager.js";
import { ChainManager } from "./../js/gameplay/chainManager.js";

// Case Data Imports
import { act1CaseA, act1CaseB, act1CaseC } from "./../js/act1_case.js";
import { act2CaseA, act2CaseB, act2CaseC, act2CaseD } from "./../js/act2_case.js";
import { act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE } from "./../js/act3_case.js";
import { act4CaseA, act4CaseB, act4CaseC } from "./../js/act4_case.js";

export class GameEngine {
  constructor(config = {}) {
    this.config = config;

    // Core Systems
    this.cm = new CaseManager();
    this.app = new MobileApp({
      tabs: [
        { id: 'scene', label: 'Scene', icon: '../assets/gfx/search.svg' },
        { id: 'evidence', label: 'Evidence', icon: '../assets/gfx/backpack-duotone.svg' },
        { id: 'people', label: 'People', icon: '../assets/gfx/chat-duotone.svg' },
        { id: 'lab', label: 'Lab', icon: '../assets/gfx/microscope-duotone.svg' },
         { id: 'codex', label: 'Codex', icon: '../assets/gfx/scroll-duotone.svg' },
         { id: 'accuse', label: 'Accuse', icon: '../assets/gfx/balance-scale-duotone.svg' }
      ],
      views: ['scene', 'evidence', 'people', 'lab', 'codex', 'accuse']
    });

    this.a11y = new AccessibilityManager({ app: this.app });
    this.es = new EvidenceSystem(this.cm, this.config);
    this.ns = new NPCSystem(this.cm, this.es);
    this.de = new DeductionEngine(this.cm, this.es);
    this.ls = new LocationSystem(this.cm);
    this.audio = new AudioManager();

    this.dm = new DialogueManager();
    if (window.inkjs) this.dm.setInkLib(window.inkjs);

    this.labUI = new LabWorkspaceUI(this.de, this.es, this.a11y);

    this.chainManager = new ChainManager(this.cm);
    this.chainManager.onChainCompleted = (chain) => {
      this.ui.showChainComplete?.(chain);
    };

    this.ui = new UIManager(this.cm, this.es, this.ns, this.de, this.ls, this.a11y, this.audio, this.dm, this.app, this.labUI, this.chainManager);
    const introData = document.getElementById('prophecy-people-intro-data');
    if (introData) this.ui.peopleUI.peopleIntroHtml = introData.innerHTML;
    this.gm = new GameManager(this.cm, this.ui, this.es, this.ns, this.de, this.chainManager);
    this.ui.gameManager = this.gm;

    this.registerCases();
  }

  registerCases() {
    const cases = [
      act1CaseA, act1CaseB, act1CaseC,
      act2CaseA, act2CaseB, act2CaseC, act2CaseD,
      act3CaseA, act3CaseB, act3CaseC, act3CaseD, act3CaseE,
      act4CaseA, act4CaseB, act4CaseC
    ];

    cases.forEach(c => {
      if (this.config.unlockAllCases) c.requires = null;
      this.cm.registerCase(c);
    });
  }

  async init() {
    this.a11y.restorePreferences();
    if (this.ui.bindUICallbacks) this.ui.bindUICallbacks();

    // Global exports for HTML event handlers
    window.cm = this.cm;
    window.ui = this.ui;
    window.audio = this.audio;
    window.showScreen = this.ui.showScreen.bind(this.ui);
    window.switchInvTab = this.ui.switchInvTab.bind(this.ui);
    window.openAct = this.ui.openAct.bind(this.ui);
    window.openLocation = this.ui.openLocation.bind(this.ui);
    window.startCase = this.gm.startCase.bind(this.gm);
    window.accuse = this.gm.accuse.bind(this.gm);
    window.toggleSuspect = function (btn) {
      const accordion = btn.closest('.suspect-accordion');
      if (!accordion) return;
      const isExpanded = accordion.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    };
    window.goBack = () => this.ui.goBack();
    window.openEvidenceDetail = this.ui.openEvidenceDetail.bind(this.ui);
    window.closeEvidenceDetail = this.ui.closeEvidenceDetail.bind(this.ui);
    window.openInventory = this.ui.openInventory.bind(this.ui);
    window.closeInventory = this.ui.closeInventory.bind(this.ui);
    window.showInstructionsModal = this.ui.showInstructionsModal.bind(this.ui);
    window.closeInstructionsModal = this.ui.closeInstructionsModal.bind(this.ui);
    window.showResetModal = this.ui.showResetModal.bind(this.ui);
    window.closeResetModal = this.ui.closeResetModal.bind(this.ui);
    window.playAgain = this.gm.resetGame.bind(this.gm);
    window.attemptProphecyMatch = this.ui.codexUI.attemptProphecyMatch.bind(this.ui.codexUI);
    window.closeGameComplete = this.ui.closeGameComplete.bind(this.ui);
    window.showProphecyDetail = this.ui.showProphecyDetail.bind(this.ui);

    this.ui.renderMap();
    this.audio.setEnabled(this.a11y.getAll().sound);
    this.audio.playMorningAmbience();

    this.preloadAssets();

    setTimeout(() => {
      this.ui.showInstructionsModal(true);
      this.gm.checkGameComplete();
      this.gm.checkChains();
    }, 800);
  }

  async preloadAssets() {
    const profileUrls = new Set();
    const storyNpcs = [];
    this.cm.getAllCases().forEach(c => {
      (c.npcs || []).forEach(npc => {
        if (npc.profileFile) profileUrls.add(PROFILE_ID_MAP[npc.profileFile] || npc.profileFile);
        if (npc.hasDialogue) storyNpcs.push({ caseId: c.id, npc });
      });
    });
    const storyLoads = storyNpcs.map(({ caseId, npc }) => this.dm.loadStoryForNPC(npc, caseId));
    const profileLoads = Array.from(profileUrls).map(url => this.ns.loader.loadProfile(url));
    await Promise.all([...storyLoads, ...profileLoads]);
  }
}