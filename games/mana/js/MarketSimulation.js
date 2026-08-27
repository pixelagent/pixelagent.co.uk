export class MarketSimulation {
  constructor() {
    this.totalPopulation = 10000;
    this.singleQuota = 40;
    this.coupleQuota = 60;
    this.familyQuota = 80;
  }

  simulate(playerQuota, playerCollected, playerHouseholdType) {
    const householdDistribution = {
      single: 0.5,
      couple: 0.3,
      family: 0.2,
    };

    const results = {
      totalCollected: 0,
      totalWasted: 0,
      totalSold: 0,
      totalNeeded: 0,
      surplus: 0,
      shortage: 0,
      priceModifier: 1.0,
      marketStatus: 'balanced',
      playerWaste: 0,
      playerWasteValue: 0,
    };

    for (let i = 0; i < this.totalPopulation; i++) {
      const roll = Math.random();
      let householdType;
      if (roll < householdDistribution.single) householdType = 'single';
      else if (roll < householdDistribution.single + householdDistribution.couple) householdType = 'couple';
      else householdType = 'family';

      const quota = this.getQuotaForHousehold(householdType);
      results.totalNeeded += quota;

      const collected = Math.max(0, this.simulateCollection(quota));
      results.totalCollected += collected;

      if (collected > quota) {
        results.totalWasted += collected - quota;
      }
    }

    results.surplus = Math.max(0, results.totalCollected - results.totalNeeded);
    results.shortage = Math.max(0, results.totalNeeded - results.totalCollected);
    results.totalSold = results.totalCollected - results.totalWasted;

    if (results.totalCollected < results.totalNeeded * 0.8) {
      results.marketStatus = 'shortage';
      results.priceModifier = 1.4 + Math.random() * 0.6;
    } else if (results.totalCollected > results.totalNeeded * 1.3) {
      results.marketStatus = 'glut';
      results.priceModifier = 0.3 + Math.random() * 0.4;
    } else if (results.totalCollected > results.totalNeeded * 1.1) {
      results.marketStatus = 'surplus';
      results.priceModifier = 0.6 + Math.random() * 0.3;
    } else {
      results.marketStatus = 'balanced';
      results.priceModifier = 0.9 + Math.random() * 0.2;
    }

    if (playerCollected > playerQuota) {
      results.playerWaste = playerCollected - playerQuota;
      if (results.marketStatus === 'glut' || results.marketStatus === 'surplus') {
        results.playerWasteValue = results.playerWaste;
      } else {
        results.playerWasteValue = Math.floor(results.playerWaste * 0.3);
      }
    }

    return results;
  }

  getQuotaForHousehold(type) {
    switch (type) {
      case 'single': return this.singleQuota;
      case 'couple': return this.coupleQuota;
      case 'family': return this.familyQuota;
      default: return this.singleQuota;
    }
  }

  simulateCollection(quota) {
    const baseVariation = quota * 0.4;
    const collected = quota + (Math.random() - 0.5) * 2 * baseVariation;
    return Math.max(0, Math.round(collected));
  }

  getMarketMood(status) {
    switch (status) {
      case 'shortage': return 'Mana is scarce across the land. Traders are offering premium prices, but finding buyers is easy.';
      case 'glut': return 'The markets are flooded. Everyone has more manna than they know what to do with. Prices have collapsed.';
      case 'surplus': return 'There is plenty of manna about. Prices are low and few buyers are looking.';
      case 'balanced':
      default: return 'The traders seem fair today. Supply and demand are in balance.';
    }
  }
}