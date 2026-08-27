import { GameState } from './GameState.js';
import { config as gameConfig } from './config.js';
import { WildernessDayCycle } from './wilderness-day-cycle.js';

/**
 * WildernessManager
 * -----------------
 * Bridges the standalone WildernessDayCycle logic engine
 * (js/wilderness-day-cycle.js) with the live game state, UI and 3D scene.
 *
 * The cycle class owns the *rules* (tithe bands, plague odds, serpent costs,
 * blessings, Sabbath); this manager owns the *wiring*: it syncs silver /
 * wellbeing / day between GameState and the cycle before each operation,
 * routes narrative lines to on-screen toasts, and persists the accumulating
 * faith stats so a saved journey keeps its history.
 */
export class WildernessManager {
  constructor(game) {
    this.game = game;
    this.cfg = gameConfig.wilderness;

    this.cycle = new WildernessDayCycle({
      sabbathEvery: this.cfg.sabbathDay || 7,
      onNarrativeEvent: (msg) => this._narrate(msg),
    });
  }

  _narrate(msg) {
    if (this.game.uiManager && this.game.uiManager.showNarrative) {
      this.game.uiManager.showNarrative(msg);
    } else {
      console.log('[wilderness]', msg);
    }
  }

  get isLevite() {
    return GameState.player.selectedTribe === this.cfg.leviteTribeId;
  }

  get isSabbath() {
    const n = this.cfg.sabbathDay || 7;
    return GameState.world.day % n === 0;
  }

  // ---- state sync -------------------------------------------------------

  _rehydrate() {
    const w = GameState.wilderness;
    const c = this.cycle;
    c.wrath = w.wrath || 0;
    c.serpentUses = w.serpentUses || 0;
    c.lastIdolUseDay = (w.lastIdolUseDay ?? -999);
    c.conditions = new Set(w.conditions || []);
    c.stats = { ...c.stats, ...(w.stats || {}) };
    c.mannaWastedToday = w.mannaWastedToday || 0;
    c.day = GameState.world.day;
    c.money = GameState.player.money;
    c.health = GameState.player.health;
    c.isLevite = this.isLevite;
    c.marketSellPrice = GameState.market.sellPrice;
    c.marketDemandModifier = 1;
  }

  _persist() {
    const w = GameState.wilderness;
    const c = this.cycle;
    w.wrath = c.wrath;
    w.serpentUses = c.serpentUses;
    w.lastIdolUseDay = (c.lastIdolUseDay === -Infinity ? -999 : c.lastIdolUseDay);
    w.conditions = Array.from(c.conditions);
    w.stats = { ...w.stats, ...c.stats };
    GameState.player.money = Math.max(0, Math.round(c.money));
    GameState.player.health = Math.max(0, Math.min(100, c.health));
  }

  // ---- morning ----------------------------------------------------------

  /**
   * Runs the dawn events for the current day: the tithe (and any blessing) on
   * a normal day, or the full Sabbath rest on the seventh day.
   * Returns { isSabbath }.
   */
  startDay() {
    if (!this.cfg.enabled) return { isSabbath: false };
    this._rehydrate();

    // cycle.startMorning() handles the Sabbath branch itself.
    this.cycle.startMorning();

    // A blessing may have raised market demand for today — capture and reset it
    // so the game's own market simulation can fold it in.
    if (this.cycle.marketDemandModifier > 1) {
      GameState.wilderness.demandBonus = this.cycle.marketDemandModifier;
    }
    this.cycle.marketDemandModifier = 1;

    this._persist();
    return { isSabbath: this.isSabbath };
  }

  // ---- market bonuses ---------------------------------------------------

  /**
   * Fold any pending Golden Calf price boost (from last night) and blessing
   * demand boost (from this dawn) into today's freshly simulated market.
   * Call right after Game.simulateMarket().
   */
  applyPendingMarketBonuses() {
    // The Sabbath holds no market, so don't burn a pending Golden Calf boost or
    // blessing demand today — let them carry to the next trading day.
    if (this.isSabbath) return;

    const w = GameState.wilderness;
    if (w.pendingSellBonus) {
      GameState.market.sellPrice = Math.min(
        this.cfg.calfSellPriceCap,
        Math.round(GameState.market.sellPrice * 1.5)
      );
      w.pendingSellBonus = false;
      this._narrate('The Golden Calf still lingers — buyers pay more for your manna today.');
    }
    if (w.demandBonus && w.demandBonus > 1) {
      GameState.market.dailyDemand = Math.round(GameState.market.dailyDemand * w.demandBonus);
      w.demandBonus = 1;
    }
  }

  // ---- waste bookkeeping (Bronze Serpent trigger) -----------------------

  /**
   * Record the manna that spoiled today (unsold basket + any gather overflow).
   * @param {number} wasted total manna wasted
   * @param {number} gathered total gathered today
   * @param {number} quota the day's quota
   */
  recordWaste(wasted, gathered, quota) {
    const w = GameState.wilderness;
    w.mannaWastedToday = Math.max(0, Math.round(wasted));
    w.stats.mannaWasted += w.mannaWastedToday;
    if (w.mannaWastedToday === 0 && gathered >= quota && quota > 0) {
      w.stats.perfectDays += 1;
    }
  }

  // ---- evening ----------------------------------------------------------

  /** Returns the offers to show in the evening panel. */
  openEvening() {
    this._rehydrate();
    return {
      calf: this.cycle.offerGoldenCalf(),
      serpent: this.cycle.offerBronzeSerpent(),
      wrath: this.cycle.wrath,
      wasted: GameState.wilderness.mannaWastedToday,
    };
  }

  activateGoldenCalf() {
    this._rehydrate();
    const result = this.cycle.activateGoldenCalf();
    if (result.success) {
      // The boosted sell price is applied to the *next* day's market.
      GameState.wilderness.pendingSellBonus = true;
    }
    this._persist();
    return result;
  }

  useBronzeSerpent() {
    this._rehydrate();
    const result = this.cycle.useBronzeSerpent();
    this._persist();
    return result;
  }

  // ---- end of run -------------------------------------------------------

  finalizeStats() {
    this._rehydrate();
    const stats = this.cycle.finalizeStats();
    GameState.wilderness.stats = { ...GameState.wilderness.stats, ...stats };
    return GameState.wilderness.stats;
  }

  faithfulnessLabel(rating) {
    if (rating >= 120) return 'Faithful Servant';
    if (rating >= 70) return 'Steadfast';
    if (rating >= 35) return 'Wavering';
    if (rating >= 10) return 'Faltering';
    return 'Lost in the Wilderness';
  }
}
