import { GameState, GameSummary } from './GameState.js';

export class UIManager {
  constructor(game) {
    this.game = game;
    this.initDOMElements();
  }

  initDOMElements() {
    this.dom = {
      score: document.getElementById('score'),
      day: document.getElementById('day'),
      time: document.getElementById('time'),
      mana: document.getElementById('mana'),
      manaQuota: document.getElementById('mana-quota'),
      gold: document.getElementById('gold'),
      healthValue: document.getElementById('healthValue'),
      healthBarFill: document.getElementById('healthBarFill'),
      healthStatus: document.getElementById('healthStatus'),
      wealthValue: document.getElementById('wealthValue'),
      wealthBarFill: document.getElementById('wealthBarFill'),
      locationPopup: document.getElementById('locationPopup'),
      locationPopupContent: document.getElementById('locationPopupContent'),
      locationDisplay: document.getElementById('location-display'),
      // Modals
      menuModal: document.getElementById('menuModal'),
      difficultyModal: document.getElementById('difficultyModal'),
      characterStep: document.getElementById('characterStep'),
      tribeButtons: document.getElementById('tribeButtons'),
      householdStep: document.getElementById('householdStep'),
      dayEndModal: document.getElementById('dayEndModal'),
      gameOverModal: document.getElementById('gameOverModal'),
      marketModal: document.getElementById('marketModal'),
      pauseModal: document.getElementById('pauseModal'),
      eveningModal: document.getElementById('eveningModal'),
      faithPanel: document.getElementById('faithPanel'),
      // Day End Modal fields
      dayEndTitle: document.getElementById('dayEndTitle'),
      dayManaCount: document.getElementById('dayManaCount'),
      daySold: document.getElementById('daySold'),
      dayWasted: document.getElementById('dayWasted'),
      dayRevenue: document.getElementById('dayRevenue'),
      dayScore: document.getElementById('dayScore'),
      dayHealth: document.getElementById('dayHealth'),
      dayHealthStatus: document.getElementById('dayHealthStatus'),
      dayWealth: document.getElementById('dayWealth'),
      dayHealthBar: document.getElementById('dayHealthBar'),
      dayWealthBar: document.getElementById('dayWealthBar'),
      dayEndBtn: document.getElementById('dayEndBtn'),
      // Game Over Modal fields
      finalScore: document.getElementById('finalScore'),
      survivedDays: document.getElementById('survivedDays'),
      // Market Modal fields
      dailyDemand: document.getElementById('dailyDemand'),
      sellPrice: document.getElementById('sellPrice'),
      buyPrice: document.getElementById('buyPrice'),
      playerMoney: document.getElementById('playerMoney'),
      playerMana: document.getElementById('playerMana'),
      manaForSale: document.getElementById('manaForSale'),
      marketMood: document.getElementById('marketMood'),
      marketStatus: document.getElementById('marketStatus'),
      marketWasteWarning: document.getElementById('marketWasteWarning'),
      // HUD & Controls
      hud: document.getElementById('hud'),
      healthBarContainer: document.getElementById('healthBarContainer'),
      wealthBarContainer: document.getElementById('wealthBarContainer'),
      mobileControls: document.getElementById('mobileControls'),
      mobileToggleBtn: document.getElementById('mobileToggleBtn'),
      // Top right controls
      pauseIcon: document.getElementById('pauseIcon'),
      audioIcon: document.getElementById('audioIcon'),
      aboutPanel: document.getElementById('aboutPanel'),
    };
  }

  updateHUD() {
    const oldScore = parseInt(this.dom.score.textContent) || 0;
    const oldMana = parseInt(this.dom.mana.textContent) || 0;
    const oldHealth = parseInt(this.dom.healthValue.textContent) || 100;
    const oldWealth = parseInt(this.dom.wealthValue.textContent) || 0;

    this.dom.score.textContent = GameState.player.score;
    this.dom.day.textContent = GameState.world.day;
    this.dom.time.textContent = Math.max(0, GameState.world.timeLeft);
    this.dom.healthValue.textContent = Math.round(GameState.player.health);
    this.dom.healthBarFill.style.width = Math.max(0, GameState.player.health) + '%';
    this.dom.wealthValue.textContent = GameState.player.money;
    this.dom.wealthBarFill.style.width = Math.min(100, (GameState.player.money / 500) * 100) + '%';
    this.dom.mana.textContent = GameState.session.dayManaCollected;
    this.dom.manaQuota.textContent = this.game.manaQuota;
    this.dom.gold.textContent = GameState.player.money;
    this.dom.healthStatus.textContent = this.game.getHealthStatus();

    if (GameState.player.score > oldScore) {
      const scoreDiff = GameState.player.score - oldScore;
      if (!isNaN(scoreDiff) && scoreDiff > 0) {
        this.animateValue(this.dom.score, 'updated', 600);
        const screenX = window.innerWidth * 0.15;
        const screenY = window.innerHeight * 0.2;
        this.createFloatingText('+' + scoreDiff, screenX, screenY, '#b8862f');
        for (let i = 0; i < 3; i++) {
          setTimeout(() => {
            this.createStarBurst(screenX + (Math.random() - 0.5) * 100, screenY + (Math.random() - 0.5) * 40);
          }, i * 100);
        }
      }
    }

    if (GameState.session.dayManaCollected > oldMana) {
      this.animateValue(this.dom.mana, 'updated', 500);
    }

    if (Math.round(GameState.player.health) !== oldHealth) {
      this.dom.healthBarFill.classList.add('pulse');
      setTimeout(() => this.dom.healthBarFill.classList.remove('pulse'), 400);

      const healthScreenX = window.innerWidth * 0.5;
      const healthScreenY = window.innerHeight * 0.85;
      if (GameState.player.health < oldHealth) {
        this.createFloatingText('-' + Math.round(oldHealth - GameState.player.health), healthScreenX, healthScreenY, '#7a2118');
      } else if (GameState.player.health > oldHealth) {
        this.createFloatingText('+' + Math.round(GameState.player.health - oldHealth), healthScreenX, healthScreenY, '#5c6b3e');
      }
    }

    if (GameState.player.money !== oldWealth) {
      this.dom.wealthBarFill.classList.add('pulse');
      setTimeout(() => this.dom.wealthBarFill.classList.remove('pulse'), 400);
    }

    if (GameState.player.health <= 30) {
      this.dom.healthBarFill.style.background = 'linear-gradient(90deg, #a8392c, #7a2118)';
    } else if (GameState.player.health <= 60) {
      this.dom.healthBarFill.style.background = 'linear-gradient(90deg, #e0ad4f, #b8862f)';
    } else {
      this.dom.healthBarFill.style.background = 'linear-gradient(90deg, #6f8a3f, #91ab53)';
    }
  }

  createFloatingText(text, x, y, color = '#ffd93d') {
    const el = document.createElement('div');
    el.className = 'score-pop';
    el.textContent = text;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.color = color;
    document.getElementById('gameContainer').appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }

  createStarBurst(x, y) {
    const el = document.createElement('div');
    el.className = 'star-burst';
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    document.getElementById('gameContainer').appendChild(el);
    setTimeout(() => el.remove(), 800);
  }

  animateValue(element, animationClass, duration = 600) {
    element.classList.remove(animationClass);
    void element.offsetWidth;
    element.classList.add(animationClass);
    setTimeout(() => element.classList.remove(animationClass), duration);
  }

  hideAllModals() {
    document.querySelectorAll('.modal').forEach((m) => m.classList.remove('active'));
  }

  showMenu() {
    this.hideAllModals();
    this.dom.menuModal.classList.add('active');
    this.dom.hud.style.display = 'none';
    this.dom.mobileControls.style.display = 'none';

    // New logic to show/hide save game container
    const saveContainer = document.getElementById('saveGameContainer');
    const beginBtn = document.getElementById('beginJourneyBtn');
    if (GameSummary.hasSave) {
      document.getElementById('saveDay').textContent = GameSummary.day;
      document.getElementById('saveScore').textContent = GameSummary.score;
      document.getElementById('saveTribe').textContent = (GameSummary.tribe || 'judah').charAt(0).toUpperCase() + (GameSummary.tribe || 'judah').slice(1);
      document.getElementById('saveDifficulty').textContent = (GameSummary.difficulty || 'couple').charAt(0).toUpperCase() + (GameSummary.difficulty || 'couple').slice(1);
      document.getElementById('saveHealth').textContent = Math.round(GameSummary.health);
      document.getElementById('saveMoney').textContent = GameSummary.money;
      saveContainer.style.display = 'block';
      beginBtn.style.display = 'none';
    } else {
      saveContainer.style.display = 'none';
      beginBtn.style.display = 'block';
    }

    this.dom.healthBarContainer.style.display = 'none';
    this.dom.wealthBarContainer.style.display = 'none';
  }

  showDifficultyScreen() {
    this.hideAllModals();
    this.showTribeStep();
    this.dom.difficultyModal.classList.add('active');
  }

  showTribeStep() {
    if (this.dom.characterStep) this.dom.characterStep.style.display = 'block';
    if (this.dom.householdStep) this.dom.householdStep.style.display = 'none';
  }

  showHouseholdStep() {
    if (this.dom.characterStep) this.dom.characterStep.style.display = 'none';
    if (this.dom.householdStep) this.dom.householdStep.style.display = 'block';
  }

  showGameUI() {
    this.hideAllModals();
    this.dom.hud.style.display = 'block';
    this.dom.healthBarContainer.style.display = 'block';
    this.dom.wealthBarContainer.style.display = 'block';
    this.toggleMobileControls(this.game.mobileVisible);
  }

  toggleAbout() {
    this.dom.aboutPanel.classList.toggle('open');
  }

  togglePause(paused) {
    if (paused) {
      this.dom.pauseIcon.className = 'fas fa-play';
      this.dom.pauseModal.classList.add('active');
    } else {
      this.dom.pauseIcon.className = 'fas fa-pause';
      this.dom.pauseModal.classList.remove('active');
    }
  }

  toggleAudioIcon(muted) {
    this.dom.audioIcon.className = muted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
  }

  toggleMobileControls(visible) {
    if (visible) {
      this.dom.mobileControls.style.display = 'grid';
      this.dom.mobileToggleBtn.style.opacity = '1';
    } else {
      this.dom.mobileControls.style.display = 'none';
      this.dom.mobileToggleBtn.style.opacity = '0.5';
    }
  }

  buildTribeButtons(tribes) {
    const container = this.dom.tribeButtons;
    if (!container) return;
    container.innerHTML = '';
    tribes.forEach((tribe) => {
      const btn = document.createElement('button');
      btn.className = 'tribe-btn' + (tribe.id === GameState.player.selectedTribe ? ' selected' : '');
      btn.dataset.tribe = tribe.id;
      btn.style.setProperty('--tribe-color', tribe.color);
      btn.innerHTML = `
        <span class="tribe-swatch" style="background:${tribe.color}"></span>
        <span class="tribe-name">${tribe.name}</span>
        <span class="tribe-epithet">${tribe.epithet}</span>
        <span class="tribe-quota">Needs ${tribe.settings.quota} manna</span>
      `;
      btn.addEventListener('click', () => {
        this.game.selectTribe(tribe.id);
        this.game.audioManager.play('click');
      });
      container.appendChild(btn);
    });
  }

  selectTribe(tribeId) {
    document.querySelectorAll('.tribe-btn').forEach((btn) => {
      btn.classList.remove('selected');
      if (btn.dataset.tribe === tribeId) btn.classList.add('selected');
    });
  }

  updateLocationDisplay(flagUserData) {
    const locName =
      flagUserData.targetX === 20
        ? 'Camp'
        : flagUserData.targetX === -25
          ? 'Oasis'
          : flagUserData.targetZ === 25
            ? 'Split Rock'
            : flagUserData.targetX === -20
              ? 'Temple'
              : 'Wilderness';
    const currentLoc = this.dom.locationDisplay.textContent;
    if (currentLoc !== 'Location: ' + locName) {
      this.dom.locationDisplay.textContent = 'Location: ' + locName;
      this.animateValue(this.dom.locationDisplay, 'updated', 500);
      this.dom.locationDisplay.classList.add('location-flash');
      setTimeout(() => this.dom.locationDisplay.classList.remove('location-flash'), 1000);
    }
  }

  showMarket(game) {
    this.updateMarket(game);
    this.dom.marketModal.classList.add('active');
  }

  hideMarket() {
    this.dom.marketModal.classList.remove('active');
  }

  updateMarket(game) {
    this.dom.dailyDemand.textContent = GameState.market.dailyDemand;
    this.dom.sellPrice.textContent = GameState.market.sellPrice;
    this.dom.playerMoney.textContent = GameState.player.money;
    this.dom.playerMana.textContent = GameState.session.dayManaCollected;
    this.dom.marketMood.textContent = GameState.market.mood || 'The traders seem fair today.';
    // Optional market fields — not present in every HTML layout, so guard against null.
    if (this.dom.buyPrice) this.dom.buyPrice.textContent = GameState.market.buyPrice;
    if (this.dom.manaForSale) this.dom.manaForSale.textContent = GameState.market.manaForSale;

    if (this.dom.marketStatus) {
      this.dom.marketStatus.className = 'market-status market-status-' + (GameState.market.status || 'balanced');
    }

    const remainingDemand = Math.max(0, GameState.market.dailyDemand - GameState.market.manaSoldToday);
    const hasExcess = GameState.session.dayManaCollected > remainingDemand;
    this.dom.marketWasteWarning.style.display = hasExcess ? 'inline' : 'none';
    this.dom.marketWasteWarning.textContent = hasExcess ? 'Warning: Excess manna may spoil if unsold!' : '';
  }

  showDayMessage(message) {
    const el = document.createElement('div');
    el.style.cssText = `
      position: fixed;
      top: 18%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-family: 'Cinzel', serif;
      font-size: 22px;
      color: var(--parch-light);
      text-shadow: 0 2px 8px rgba(0,0,0,0.6);
      background: rgba(59,42,22,0.75);
      padding: 14px 28px;
      border-radius: 10px;
      border: 2px solid var(--gold);
      z-index: 200;
      pointer-events: none;
      opacity: 1;
      transition: opacity 0.8s ease;
    `;
    el.textContent = message;
    document.body.appendChild(el);
    setTimeout(() => { el.style.opacity = '0'; }, 2500);
    setTimeout(() => el.remove(), 3400);
  }

  showDayEnd(game, manaBonus) {
    this.hideAllModals();
    this.dom.hud.style.display = 'none';
    this.dom.dayEndModal.classList.add('active');

    this.dom.dayEndTitle.textContent = `Day ${GameState.world.day} Complete!`;
    this.dom.dayManaCount.textContent = GameState.session.dayManaGathered;
    this.dom.daySold.textContent = GameState.market.manaSoldToday;
    this.dom.dayWasted.textContent = GameState.session.dayManaCollected;
    this.dom.dayRevenue.textContent = GameState.market.manaSoldToday * GameState.market.sellPrice;
    this.dom.dayScore.textContent = GameState.player.score;
    this.dom.dayHealth.textContent = Math.round(GameState.player.health);
    this.dom.dayHealthStatus.textContent = game.getHealthStatus();
    this.dom.dayWealth.textContent = GameState.player.money;

    this.dom.dayHealthBar.style.width = Math.max(0, GameState.player.health) + '%';
    this.dom.dayWealthBar.style.width = Math.min(100, (GameState.player.money / 500) * 100) + '%';

    if (GameState.player.health <= 30) {
      this.dom.dayHealthBar.style.background = 'linear-gradient(90deg, #a8392c, #7a2118)';
    } else if (GameState.player.health <= 60) {
      this.dom.dayHealthBar.style.background = 'linear-gradient(90deg, #e0ad4f, #b8862f)';
    } else {
      this.dom.dayHealthBar.style.background = 'linear-gradient(90deg, #6f8a3f, #91ab53)';
    }

    this.dom.dayEndBtn.textContent = GameState.player.health <= 0 ? 'Game Over' : `Continue to Day ${GameState.world.day + 1}`;
  }

  showGameOver(game, faith = null) {
    this.hideAllModals();
    this.dom.hud.style.display = 'none';
    this.dom.gameOverModal.classList.add('active');
    this.dom.finalScore.textContent = GameState.player.score;
    this.dom.survivedDays.textContent = GameState.world.day;

    const faithBox = document.getElementById('gameOverFaith');
    if (faithBox && faith) {
      const label = game.wildernessManager
        ? game.wildernessManager.faithfulnessLabel(faith.faithfulnessRating)
        : '';
      faithBox.innerHTML =
        `<div class="gameover-faith-rating">Faithfulness: <span>${faith.faithfulnessRating}</span> — ${label}</div>` +
        `<div class="gameover-faith-grid">` +
        `<span>Silver Tithed: ${faith.silverTithed}</span>` +
        `<span>Perfect Days: ${faith.perfectDays}</span>` +
        `<span>Golden Calf Uses: ${faith.goldenCalfUses}</span>` +
        `<span>Plagues Endured: ${faith.plaguesEndured}</span>` +
        `<span>Bronze Serpent Uses: ${faith.bronzeSerpentUses}</span>` +
        `<span>Manna Wasted: ${faith.mannaWasted}</span>` +
        `</div>`;
      faithBox.style.display = 'block';
    } else if (faithBox) {
      faithBox.style.display = 'none';
    }
  }

  showLocationPopup(name) {
    // This popup is disabled for now as it duplicates the in-world text.
    // The in-world text is now the primary location indicator.
    return;
  }

  // ===================================================================
  // WILDERNESS ECONOMY UI (tithe narrative, evening temptations, faith)
  // ===================================================================

  /** A stacking parchment toast for narrative events ("The Levites collect..."). */
  showNarrative(msg) {
    let container = document.getElementById('narrativeToasts');
    if (!container) {
      container = document.createElement('div');
      container.id = 'narrativeToasts';
      container.className = 'narrative-toasts';
      document.getElementById('gameContainer').appendChild(container);
    }
    const el = document.createElement('div');
    el.className = 'narrative-toast';
    el.textContent = msg;
    container.appendChild(el);
    // Fade in, hold, then remove.
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => el.classList.remove('show'), 4200);
    setTimeout(() => el.remove(), 4800);
  }

  showEvening(game) {
    this.hideAllModals();
    this.dom.hud.style.display = 'none';
    if (this.dom.eveningModal) this.dom.eveningModal.classList.add('active');
    this.refreshEvening(game, {});
  }

  hideEvening() {
    if (this.dom.eveningModal) this.dom.eveningModal.classList.remove('active');
  }

  refreshEvening(game, outcome = {}) {
    if (!game.wildernessManager) return;
    const info = game.wildernessManager.openEvening();

    const narrativeEl = document.getElementById('eveningNarrative');
    if (narrativeEl) {
      if (outcome.calfResult) {
        narrativeEl.textContent = outcome.calfResult.plague
          ? 'You bow before the Calf — and a plague answers your idolatry.'
          : 'You bow before the Calf. Its glitter promises richer trade.';
      } else if (outcome.serpentResult) {
        narrativeEl.textContent = 'You look upon the Bronze Serpent, and healing flows through the camp.';
      } else {
        narrativeEl.textContent = 'Torches are lit as darkness falls over the camp.';
      }
    }

    // --- Golden Calf ---
    const calf = info.calf;
    const calfDesc = document.getElementById('calfDesc');
    const calfBtn = document.getElementById('goldenCalfBtn');
    if (calfDesc) {
      const pct = Math.round(calf.plagueChanceIfUsed * 100);
      calfDesc.innerHTML =
        `Travellers whisper of the Golden Calf. Bow, and tomorrow's goods sell dearer.` +
        `<br><span class="evening-cost">Cost: ${calf.cost} silver</span>` +
        ` &middot; <span class="evening-risk">Plague risk: ${pct}%</span>` +
        ` &middot; Wrath: ${info.wrath}`;
    }
    if (calfBtn) {
      calfBtn.disabled = !calf.affordable;
      calfBtn.textContent = calf.affordable ? `Bow before the Calf (${calf.cost})` : 'Not enough silver';
    }

    // --- Bronze Serpent ---
    const serpent = info.serpent;
    const serpentOption = document.getElementById('serpentOption');
    const serpentDesc = document.getElementById('serpentDesc');
    const serpentBtn = document.getElementById('bronzeSerpentBtn');
    if (serpentDesc && serpentBtn) {
      if (!serpent.relevant) {
        serpentDesc.innerHTML = 'No manna was wasted today. The fiery serpents keep their distance — there is nothing to heal.';
        serpentBtn.disabled = true;
        serpentBtn.textContent = 'Not needed tonight';
      } else {
        serpentDesc.innerHTML =
          `Fiery serpents enter the camp. Look upon the Bronze Serpent to be healed (+40 wellbeing) and ease one affliction.` +
          `<br><span class="evening-cost">Cost: ${serpent.cost} silver</span>`;
        serpentBtn.disabled = !serpent.affordable;
        serpentBtn.textContent = serpent.affordable ? `Look upon the Serpent (${serpent.cost})` : 'Not enough silver';
      }
    }
    if (serpentOption) serpentOption.classList.toggle('evening-option-muted', !serpent.relevant);
  }

  setDayNightIcon(mode) {
    const btn = document.getElementById('dayNightBtn');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (icon) icon.className = mode === 'night' ? 'fas fa-moon' : 'fas fa-sun';
  }

  toggleFaithPanel(game) {
    if (!this.dom.faithPanel) return;
    const opening = !this.dom.faithPanel.classList.contains('open');
    if (opening) this.updateFaithPanel(game);
    this.dom.faithPanel.classList.toggle('open');
  }

  updateFaithPanel(game) {
    const w = GameState.wilderness || {};
    const stats = w.stats || {};
    const setText = (id, val) => {
      const el = document.getElementById(id);
      if (el) el.textContent = val;
    };
    setText('faithTithed', stats.silverTithed || 0);
    setText('faithCalf', stats.goldenCalfUses || 0);
    setText('faithPlagues', stats.plaguesEndured || 0);
    setText('faithSerpent', stats.bronzeSerpentUses || 0);
    setText('faithPerfect', stats.perfectDays || 0);
    setText('faithWasted', stats.mannaWasted || 0);
    setText('faithWrath', w.wrath || 0);
    const cond = (w.conditions && w.conditions.length) ? w.conditions.join(', ') : 'None';
    setText('faithConditions', cond);
  }
}