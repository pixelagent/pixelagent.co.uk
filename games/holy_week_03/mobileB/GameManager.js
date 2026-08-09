/**
 * GameManager orchestrates high-level game flow, including case progression,
 * act milestones, and overall completion logic.
 */
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
export class GameManager {
  constructor(cm, ui, es, ns, de, chainManager) {
    this.cm = cm;
    this.ui = ui;
    this.es = es;
    this.ns = ns;
    this.de = de;
    this.chainManager = chainManager;
  }

  /** Starts a specific case and prepares all sub-systems. */
  async startCase(caseId) {
    this.cm.startCase(caseId);
    const c = this.cm.getCase(caseId);
    if (!c) return;

    // Initialize sub-system states for the new case
    this.es.loadCase(c);
    await this.ns.loadCase(c);
    this.de.loadCase();

    // Play act-specific background music with fade
    if (this.ui.audio && c.actLabel) {
      this.ui.audio.fadeToAct(c.actLabel);
      // Play day/night ambient based on case timeOfDay
      if (c.timeOfDay) {
        this.ui.audio.playTimeAmbience(c.timeOfDay);
      }
    }

    // Direct UI to prepare the investigation environment
    await this.ui.setupInvestigation(c);

    if (window.scene3d && window.scene3d.loadCase) {
      await window.scene3d.loadCase(c.id);
    }

    this.loadWorldModel(c);
  }

  /** Loads the 3D model for the current case. */
  loadWorldModel(caseData) {
    if (!window.scene3d || !caseData.worldModel) return;

    const scene = window.scene3d.sceneMgr.scene;
    const loader = new GLTFLoader();

    // Clear existing model
    if (window.scene3d.worldModel) {
      scene.remove(window.scene3d.worldModel);
    }

    loader.load(caseData.worldModel, (gltf) => {
      const model = gltf.scene;
      window.scene3d.worldModel = model;

      // Optional: Apply case-specific properties like city layer visibility
      const showCityLayer = caseData.showCityLayer !== false;
      const cityLayer = model.getObjectByName('cities');
      if (cityLayer) {
        cityLayer.visible = showCityLayer;
      }

      scene.add(model);
    });
  }

  /** Processes a suspect accusation and handles the win/loss flow. */
  accuse(suspectId) {
    const result = this.cm.submitAccusation(suspectId);
    if (!result) return;

    this.ui.renderResult(result);
    this.ui.showScreen("result");

    if (result.correct) {
      this.ui.audio.playComplete();
      const currentCase = this.cm.getActiveCase();
      if (currentCase) this.checkActComplete(currentCase);
      this.checkGameComplete();
      this.checkChains();
    } else {
      this.ui.audio.playError();
    }
    this.checkGameOver();
  }

  /** Checks all active detective chains and notifies UI of any completions. */
  checkChains() {
    if (!this.chainManager) return;
    const completed = this.chainManager.checkAllChains();
    completed.forEach(chain => {
      this.ui.a11y.announce(`Hidden chain completed: ${chain.name}.`, true);
    });
  }

  /** Checks if all cases in the current act are solved and handles the transition. */
  checkActComplete(caseData) {
    const act = caseData.actLabel;
    if (!act) return;

    const allCases = this.cm.getAllCases();
    const actCases = allCases.filter(c => c.actLabel === act);
    const allSolved = actCases.every(c => this.cm.getCaseProgress(c.id)?.solved);

    if (allSolved) {
      this.nextAct(act);
    }
  }

  /** Handles the narrative transition between Acts. */
  nextAct(completedAct) {
    if (this.ui.audio) this.ui.audio.playHighStakes();
    this.ui.a11y.announce(`${completedAct} complete! New areas of Jerusalem are now accessible on the map.`, true);
    this.ui.renderMap();
  }

  /** Evaluates if the entire Holy Week narrative has been resolved. */
  checkGameComplete() {
    const allCases = this.cm.getAllCases();
    const solvedCount = allCases.filter(c => this.cm.getCaseProgress(c.id)?.solved).length;
    
    if (solvedCount > 0 && solvedCount === allCases.length) {
      const progress = this.cm.getProgress();
      this.ui.showGameComplete(progress.totalScore, progress.rank);
      return true;
    }
    return false;
  }

  /** Checks if the player has lost due to excessive doubt or zero reputation. */
  checkGameOver() {
    const progress = this.cm.getProgress();
    if (!progress) return false;

    const doubt = progress.doubt || 0;
    if (doubt >= 50) {
      this.ui.showGameOver('doubt');
      return true;
    }

    if (progress.reputations) {
      const reps = Object.values(progress.reputations);
      if (reps.some(r => r <= 0)) {
        this.ui.showGameOver('reputation');
        return true;
      }
    }

    return false;
  }

  /** Wipes all progress and returns the player to the start of Act I - The Triumphal Entry. */
  resetGame() {
    this.cm.resetProgress();
    this.ui.closeResetModal();
    document.getElementById("game-complete-modal")?.classList.remove("active");
    this.ui.renderMap();
    this.ui.a11y.announce("Game reset. All progress cleared. Choose a location to begin.");
  }
}