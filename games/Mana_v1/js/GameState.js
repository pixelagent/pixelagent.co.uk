import { config } from './config.js';

/** Factory for a fresh Wilderness Economy state (single source of truth). */
export function createWildernessState() {
  return {
    wrath: 0,                 // rises with every Golden Calf use, drives plague odds
    serpentUses: 0,           // Bronze Serpent uses (drives escalating cost)
    lastIdolUseDay: -999,     // last day the Golden Calf was used
    conditions: [],           // active negative conditions e.g. 'fatigue'
    mannaWastedToday: 0,      // manna that spoiled today (Bronze Serpent trigger)
    pendingSellBonus: false,  // a Golden Calf boost waiting to apply next market
    demandBonus: 1,           // a blessing's market-demand boost for the next market
    stats: {
      silverTithed: 0,
      goldenCalfUses: 0,
      plaguesEndured: 0,
      bronzeSerpentUses: 0,
      perfectDays: 0,
      mannaWasted: 0,
      faithfulnessRating: 0,
    },
  };
}

export const GameState = {
  version: 1,

  player: {
    health: config.player.initialHealth,
    money: config.player.initialMoney,
    mana: 0,
    score: 0,
    position: { x: 0, y: 0, z: 0 },
    selectedTribe: 'judah',
    dressColor: 0xc49030,
    headColor: 0x332211, // Skin color
    bodyColor: 0x332211, // Skin color
  },

  world: {
    day: 1,
    timeLeft: config.game.dayLength,
    difficulty: 'normal',
    paused: false,
    gameState: config.game.initialState,
  },

  market: {
    sellPrice: 4,
    buyPrice: 6,
    dailyDemand: 0,
    manaSoldToday: 0,
    manaForSale: 0,
    status: 'balanced',
    mood: 'The traders seem fair today.',
  },

  session: {
    dayManaGathered: 0, // Total gathered this day for health calculation
    dayManaCollected: 0, // Current basket for selling
    playerWaste: 0,
    playerWasteValue: 0,
  },

  // Wilderness Economy systems (tithe / Golden Calf / Bronze Serpent / Sabbath).
  // Persisted so a saved journey keeps its wrath, debts and faith stats.
  wilderness: createWildernessState(),

  settings: {
    muted: false,
  }
};

export const GameSummary = {
  hasSave: false,
  score: 0,
  day: 1,
  tribe: 'judah',
  difficulty: 'couple',
  health: 100,
  money: 50,
};