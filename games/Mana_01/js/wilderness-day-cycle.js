/* =========================================================================
   WILDERNESS ECONOMY — DAY CYCLE EXAMPLE
   Implements Wilderness_Economy_Systems_Revised.md as a playable loop.
   Vanilla JS, no dependencies — drop straight into a browser game.

   FLOW
   -----------------------------------------------------------------------
   MORNING SESSION (skipped in full on Sabbath, see below)
     1. Tithe — pay 10% + progressive surcharge, chance of a blessing.
        Levite tribe members RECEIVE a share instead of paying.
     2. Collect manna.
     3. Market — buy / sell.

   EVENING SESSION
     1. Night mode begins (player equips torch).
     2. Golden Calf option — pay silver for a temporary sell-price boost,
        at escalating plague risk the more it's used.
     3. Bronze Serpent option — only relevant if manna was wasted that day;
        heals and clears one negative condition, at rising silver cost.

   Repeat. Every 7th day is a Sabbath: no gathering, no movement drain,
   tithe is still collected, small health recovery, narrative event only —
   no market, no Golden Calf, no Bronze Serpent.
   ========================================================================= */

const PHASE = Object.freeze({
  MORNING_TITHE: 'MORNING_TITHE',
  MORNING_GATHER: 'MORNING_GATHER',
  MORNING_MARKET: 'MORNING_MARKET',
  EVENING_NIGHTFALL: 'EVENING_NIGHTFALL',
  EVENING_CALF: 'EVENING_CALF',
  EVENING_SERPENT: 'EVENING_SERPENT',
  SABBATH: 'SABBATH',
  DAY_COMPLETE: 'DAY_COMPLETE'
});

class WildernessDayCycle {
  constructor(opts = {}) {
    // --- core player state ---
    this.money = opts.money ?? 20;
    this.health = opts.health ?? 100;
    this.manna = opts.manna ?? 0;

    // --- tribe / role ---
    this.isLevite = opts.isLevite ?? false;

    // --- market state ---
    this.baseBuyPrice = opts.baseBuyPrice ?? 5;
    this.marketSellPrice = opts.baseSellPrice ?? 8;
    this.marketDemandModifier = 1;
    this.healthyStreak = 0; // consecutive days ending near-full health

    // --- Golden Calf state ---
    this.wrath = 0;               // rises every activation, drives plague chance
    this.lastIdolUseDay = -Infinity;

    // --- Bronze Serpent state ---
    this.serpentUses = 0;

    // --- daily bookkeeping ---
    this.day = 1;
    this.mannaWastedToday = 0;
    this.dailyQuota = opts.dailyQuota ?? 12;
    this.conditions = new Set(); // e.g. 'fatigue'
    this.sabbathEvery = opts.sabbathEvery ?? 7; // every Nth day is a Sabbath

    // --- lifetime stats for end-of-run report ---
    this.stats = {
      silverTithed: 0,
      goldenCalfUses: 0,
      plaguesEndured: 0,
      bronzeSerpentUses: 0,
      perfectDays: 0,
      mannaWasted: 0,
      faithfulnessRating: 0
    };

    this.phase = PHASE.MORNING_TITHE;

    // UI / Three.js integration hooks — override these, don't edit the class.
    this.onNarrativeEvent = opts.onNarrativeEvent || (msg => console.log(msg));
    this.onPhaseChange = opts.onPhaseChange || (() => {});
    this.onEnterNightMode = opts.onEnterNightMode || (() => {}); // toggle torch/lighting in Three.js scene
    this.onExitNightMode = opts.onExitNightMode || (() => {});
  }

  get isSabbath() {
    return this.day % this.sabbathEvery === 0;
  }

  _setPhase(phase) {
    this.phase = phase;
    this.onPhaseChange(phase, this);
  }

  // =======================================================================
  // MORNING SESSION
  // =======================================================================

  /** Call this to begin the day. Handles the Sabbath branch automatically. */
  startMorning() {
    if (this.isSabbath) {
      this._runSabbath();
      return;
    }
    this._setPhase(PHASE.MORNING_TITHE);
    this._payTithe();
    this._setPhase(PHASE.MORNING_GATHER);
  }

  _payTithe() {
    if (this.isLevite) {
      // Levites don't pay in — they receive a share of the communal tithe.
      const share = Math.round((this.money || 1) * 0.10);
      this.money += share;
      this.onNarrativeEvent(`The Levites are given their portion of the Lord's tithe — you receive ${share} silver.`);
      return { received: share };
    }

    const base = Math.round(this.money * 0.10);
    const surchargeRate =
      this.money > 300 ? 0.05 :
      this.money > 150 ? 0.02 : 0;
    const surcharge = Math.round(this.money * surchargeRate);
    const total = base + surcharge;

    this.money -= total;
    this.stats.silverTithed += total;
    this.onNarrativeEvent("The Levites collect the Lord's portion.");

    // Synergy: never having touched the Golden Calf slightly raises the odds.
    const blessingChance = 0.15 + (this.stats.goldenCalfUses === 0 ? 0.05 : 0);
    if (Math.random() < blessingChance) this._grantBlessing();

    return { paid: total };
  }

  _grantBlessing() {
    const roll = Math.random();
    if (roll < 1 / 3) {
      this.health = Math.min(100, this.health + 10);
      this.onNarrativeEvent('A quiet blessing settles over the camp. (+10 Health)');
    } else if (roll < 2 / 3) {
      this.money += 15;
      this.onNarrativeEvent('A quiet blessing — a stranger presses silver into your hand. (+15 Silver)');
    } else {
      this.marketDemandModifier *= 1.2;
      this.onNarrativeEvent('A quiet blessing — word spreads of honest trade. (+20% market demand today)');
    }
  }

  /**
   * Report the result of the gathering minigame. Amount comes from
   * whatever gather/collection mechanic already exists in the game;
   * this just applies the economy rules to it.
   */
  collectManna(gatheredAmount) {
    const quota = this.dailyQuota;
    const kept = Math.min(gatheredAmount, quota);
    const overflow = Math.max(0, gatheredAmount - quota);

    this.manna += kept;
    this.mannaWastedToday = overflow;
    this.stats.mannaWasted += overflow;

    if (overflow === 0 && gatheredAmount >= quota) this.stats.perfectDays += 1;

    this._setPhase(PHASE.MORNING_MARKET);
    return { kept, wasted: overflow };
  }

  // --- Market (buy/sell) ---

  get buyPrice() {
    // Synergy: high wealth makes merchants charge more.
    let price = this.baseBuyPrice;
    if (this.money > 300) price = Math.round(price * 1.25);
    else if (this.money > 150) price = Math.round(price * 1.1);
    return price;
  }

  buyFromMarket(qty = 1) {
    const cost = this.buyPrice * qty;
    if (this.money < cost) return { success: false, reason: 'not enough silver' };
    this.money -= cost;
    this.manna += qty;
    return { success: true, cost };
  }

  sellToMarket(qty = 1) {
    qty = Math.min(qty, this.manna);
    if (qty <= 0) return { success: false, reason: 'nothing to sell' };
    const revenue = Math.round(this.marketSellPrice * qty * this.marketDemandModifier);
    this.manna -= qty;
    this.money += revenue;
    return { success: true, revenue };
  }

  /** Call once morning trading is finished. */
  endMorning() {
    this._setPhase(PHASE.EVENING_NIGHTFALL);
  }

  // =======================================================================
  // EVENING SESSION
  // =======================================================================

  /** Torches lit, night mode begins. */
  startEvening() {
    this._setPhase(PHASE.EVENING_NIGHTFALL);
    this.onNarrativeEvent('Torches are lit as darkness falls over the camp.');
    this.onEnterNightMode(this);
    this._setPhase(PHASE.EVENING_CALF);
  }

  offerGoldenCalf() {
    const cost = 30;
    return {
      cost,
      affordable: this.money >= cost,
      plagueChanceIfUsed: this._plagueChanceForWrath(this.wrath + 1)
    };
  }

  activateGoldenCalf() {
    const cost = 30;
    if (this.money < cost) return { success: false, reason: 'not enough silver' };

    this.money -= cost;
    this.wrath += 1;
    this.lastIdolUseDay = this.day;
    this.stats.goldenCalfUses += 1;

    this.marketSellPrice = Math.min(12, Math.round(this.marketSellPrice * 1.5));
    this.onNarrativeEvent('Travellers whisper of the Golden Calf... your goods fetch a better price.');

    const plagueChance = this._plagueChanceForWrath(this.wrath);
    let plague = false;
    if (Math.random() < plagueChance) {
      plague = true;
      this._triggerPlague();
    }

    this._setPhase(PHASE.EVENING_SERPENT);
    return { success: true, newSellPrice: this.marketSellPrice, wrath: this.wrath, plague };
  }

  _plagueChanceForWrath(wrath) {
    if (wrath <= 1) return 0;
    if (wrath === 2) return 0.15;
    if (wrath === 3) return 0.35;
    if (wrath === 4) return 0.60;
    return 1.0; // 5+
  }

  _triggerPlague() {
    // Plague severity isn't specified in the design doc — tune this to taste.
    this.health = Math.max(0, this.health - 25);
    this.conditions.add('fatigue');
    this.stats.plaguesEndured += 1;
    this.onNarrativeEvent('A plague sweeps through the camp. The people suffer for their idolatry.');
  }

  offerBronzeSerpent() {
    const nextUse = this.serpentUses + 1;
    const cost = this._serpentCost(nextUse);
    return {
      cost,
      relevant: this.mannaWastedToday > 0,
      affordable: this.money >= cost
    };
  }

  useBronzeSerpent() {
    const nextUse = this.serpentUses + 1;
    const cost = this._serpentCost(nextUse);
    if (this.money < cost) return { success: false, reason: 'not enough silver' };

    this.money -= cost;
    this.serpentUses = nextUse;
    this.stats.bronzeSerpentUses += 1;

    this.health = Math.min(100, this.health + 40);
    const [firstCondition] = this.conditions;
    if (firstCondition) this.conditions.delete(firstCondition);

    this.onNarrativeEvent('Fiery serpents enter the camp... but the Bronze Serpent offers healing to those who look upon it.');

    this._setPhase(PHASE.DAY_COMPLETE);
    return { success: true, cost, healthNow: this.health, conditionCleared: firstCondition ?? null };
  }

  _serpentCost(use) {
    const table = [15, 20, 28, 38, 50, 65, 80];
    let cost = use <= table.length
      ? table[use - 1]
      : table[table.length - 1] + (use - table.length) * 15;

    // Synergy: strong tithe history softens the cost; recent idol use raises it.
    if (this.stats.silverTithed > 200) cost = Math.round(cost * 0.9);
    if (this.day - this.lastIdolUseDay <= 2) cost = Math.round(cost * 1.15);

    return cost;
  }

  /** Call once the evening choices are done, whether or not they were used. */
  endEvening() {
    this.onExitNightMode(this);
    this._setPhase(PHASE.DAY_COMPLETE);
  }

  // =======================================================================
  // SABBATH
  // =======================================================================

  _runSabbath() {
    this._setPhase(PHASE.SABBATH);
    this.onNarrativeEvent('The seventh day. No gathering, no trade — only rest.');

    // Tithe is still collected, but there is nothing else: no market,
    // no Golden Calf, no Bronze Serpent.
    this._payTithe();

    this.health = Math.min(100, this.health + 10);
    this.onNarrativeEvent('The camp rests. A small measure of strength returns. (+10 Health)');

    this._setPhase(PHASE.DAY_COMPLETE);
  }

  // =======================================================================
  // END OF DAY
  // =======================================================================

  /** Advances the day counter and rolls stats forward. Call after DAY_COMPLETE. */
  endDay() {
    this.healthyStreak = this.health >= 90 ? this.healthyStreak + 1 : 0;
    // Synergy: a healthy streak improves tomorrow's demand.
    this.marketDemandModifier = this.healthyStreak >= 3 ? 1.1 : 1;

    this.mannaWastedToday = 0;
    this.day += 1;
    this._setPhase(PHASE.MORNING_TITHE);
  }

  // =======================================================================
  // END OF RUN
  // =======================================================================

  finalizeStats() {
    const s = this.stats;
    const raw = s.silverTithed * 0.5
      + s.perfectDays * 10
      - s.goldenCalfUses * 8
      - s.plaguesEndured * 15
      + s.bronzeSerpentUses * 2;
    s.faithfulnessRating = Math.max(0, Math.round(raw));
    return { ...s };
  }
}

/* =========================================================================
   EXAMPLE USAGE — a scripted week, printed to console.
   Run this file directly in a browser console or with `node` (ESM) to see
   the loop play out. Swap the manual `gatheredAmount` numbers for real
   values from your gathering minigame.
   ========================================================================= */

function runExampleWeek() {
  const game = new WildernessDayCycle({
    money: 40,
    isLevite: false,
    onNarrativeEvent: msg => console.log(`— ${msg}`)
  });

  for (let i = 0; i < 7; i++) {
    console.log(`\n===== DAY ${game.day} ${game.isSabbath ? '(Sabbath)' : ''} =====`);

    game.startMorning();

    if (!game.isSabbath) {
      const gathered = 10 + Math.floor(Math.random() * 8); // stand-in for the real minigame
      const result = game.collectManna(gathered);
      console.log(`Gathered ${gathered} manna (kept ${result.kept}, wasted ${result.wasted}).`);

      game.buyFromMarket(1);
      game.sellToMarket(3);
      game.endMorning();

      game.startEvening();

      const calfOffer = game.offerGoldenCalf();
      if (calfOffer.affordable && calfOffer.plagueChanceIfUsed < 0.5) {
        game.activateGoldenCalf();
      }

      const serpentOffer = game.offerBronzeSerpent();
      if (serpentOffer.relevant && serpentOffer.affordable) {
        game.useBronzeSerpent();
      }

      game.endEvening();
    }

    console.log(`End of day ${game.day}: ${game.money} silver, ${game.health} health, ${game.manna} manna.`);
    game.endDay();
  }

  console.log('\n===== END OF RUN =====');
  console.log(game.finalizeStats());
}

// Uncomment to run in a browser console:
// runExampleWeek();

export { WildernessDayCycle, PHASE, runExampleWeek };
