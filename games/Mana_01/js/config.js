export const config = {
  // Game state
  game: {
    initialState: 'menu',
    dayLength: 60, // seconds
  },

  audio: {
    musicVolume: 0.05,
    sfxVolume: 0.8,
  },

  gameplay: {
    healthPenaltyMultiplier: 1.2,
    healthBonusNoWaste: 8,
    healthPenaltyWasteMultiplier: 1.5,
    quotaDoubleDay6: 2,
    quotaDoubleDay7: 2,
  },

  // Wilderness Economy (see docs/Wilderness_Economy_Systems_Revised.md).
  // These layer tithe / Golden Calf / Bronze Serpent / Sabbath narrative
  // systems on top of the core gather-and-sell loop.
  wilderness: {
    enabled: true,
    sabbathDay: 7,            // every Nth day is a Sabbath (rest, tithe, heal, no gather)
    sabbathHeal: 10,          // health restored on the Sabbath
    goldenCalfCost: 30,       // silver to bow before the Golden Calf
    plagueHealthLoss: 25,     // health lost when a plague strikes
    // Tribe id that RECEIVES the tithe instead of paying it (the priestly tribe).
    leviteTribeId: 'levi',
    // A calf-boosted sell price is capped here (matches the design doc).
    calfSellPriceCap: 12,
  },

  // Day / Night cycle visuals.
  dayNight: {
    enabled: true,
    // How quickly lighting eases toward its target each second (0-1 per frame-ish).
    transitionSpeed: 1.8,
    // Lowest daylight factor reached at dusk while still "day" (1 = noon, 0 = night).
    duskFloor: 0.42,
    day: {
      skyColor: '#bcd8f2',
      fogColor: '#b3d9ff',
      sunIntensity: 1.6,
      moonIntensity: 0.0,
      ambient: 0.6,
      hemi: 0.5,
      torch: 0.0,
      exposure: 1.9,
    },
    night: {
      skyColor: '#0a1330',
      fogColor: '#0c1a3c',
      sunIntensity: 0.08,
      moonIntensity: 0.9,
      ambient: 0.22,
      hemi: 0.14,
      torch: 4.0,
      exposure: 1.25,
    },
    moonColor: '#7f9dff',
    torchColor: '#ffb257',
    torchDistance: 22,
  },

  // Player settings
  player: {
    initialHealth: 100,
    initialMoney: 50,
    rotateSpeed: 0.05,
    turnSpeed: 0.035, // radians/frame for left/right steering (yaw)
    jumpVelocity: 0.14, // initial upward velocity when jumping
    gravity: 0.012,     // downward acceleration applied per frame while airborne
    bob: {
      speed: 0.2,
      amount: 0.05,
    },
    idle: {
      speed: 0.05,
      amount: 0.02,
    },
  },

  // Manna settings (defaults; real per-day counts/quotas come from the Tribe base profile * household modifier)
  manna: {
    count: {
      single: 35,
      couple: 50,
      family: 70,
    },
    quota: {
      single: 40,
      couple: 60,
      family: 80,
    },
  },

  // Household size is a modifier applied on top of the chosen Tribe's base profile.
  // single = swift but fragile (less to gather, faster); family = many mouths (more to gather, slower).
  household: {
    single: { moveSpeed: 1.15, manaCount: 0.85, quota: 0.8, moveDrain: 0.85, label: 'Single' },
    couple: { moveSpeed: 1.0, manaCount: 1.0, quota: 1.0, moveDrain: 1.0, label: 'Couple' },
    family: { moveSpeed: 0.85, manaCount: 1.15, quota: 1.25, moveDrain: 1.15, label: 'Family' },
  },

  market: {
    baseSellPrice: 4,
    minDemand: 5,
    demandFactor: 1000,
    closedChance: 0.6,
    priceModifier: {
      shortage: { min: 1.4, range: 0.6 },
      glut: { min: 0.3, range: 0.4 },
      surplus: { min: 0.6, range: 0.3 },
      balanced: { min: 0.9, range: 0.2 },
    },
  },

  // UI & Display
  display: {
    minLoadingTime: 1600,
  },

  // Terrain settings
  terrain: {
    noiseEnabled: true,
    scale: 0.02,
    height: 1,
    octaves: 4,
    persistence: 0.5,
    lacunarity: 2.0,
  },

  scene: {
    colors: {
      skyColor1: '#ffecd6',
      skyColor2: '#ffd1a4',
      skyColor3: '#c4b0ff',
      skyColor4: '#8a70ff',
      fogColor: '#b3d9ff',
      terrainColor1: '#d1c082', // low, yellower sand
      terrainColor2: '#c3b079', // mid-low
      terrainColor3: '#b5a171', // mid-high
      terrainColor4: '#a79168', // high
    },
    fog: {
      near: 40,
      far: 70,
    },
    ambientLight: {
      intensity: 0.6,
    },
    hemiLight: {
      skyColor: '#b3d9ff',
      groundColor: '#c1a584',
      intensity: 0.5,
    },
    sunLight: {
      intensity: 1.6,
      pos: { x: 40, y: 30, z: 40 },
      shadow: {
        mapSize: 2048,
        camera: { near: 0.5, far: 120, left: -50, right: 50, top: 50, bottom: -50 },
        bias: -0.0015,
        normalBias: 0.02,
        radius: 2,
      },
    },
    tileSize: 1000,
    gridRadius: 1,
    manaPickup: {
      bobOffset: 0.5,
      bobSpeed: 0.05,
      bobAmount: 0.1,
      rotationSpeed: 0.02,
      pickupDistance: 1.5,
    },
    birds: {
      count: {
        min: 5,
        max: 8,
      },
      flightHeight: {
        min: 30,
        max: 50,
      },
      speed: {
        min: 0.15,
        max: 0.35,
      },
      turn: {
        speed: 0.003,
        amount: 0.02,
      },
      bounds: 90,
      flapAmount: 0.6,
      bobAmount: 1.5,
    },
  },

  camera: {
    initialFov: 65,
    lerpFactor: 0.09,       // higher = snappier, tighter follow
    followDistance: 13,     // how far behind the player the camera sits
    followHeight: 11,       // how high above the player the camera sits
  },

  // Debug settings
  debug: {
    stats: false, // Set to true to show the panel, false to hide it
    gui: false,
  },

  // Post-processing settings
  postprocessing: {
    bloom: {
      strength: 0.3,
      radius: 0.2,
      threshold: 0.97,
    },
    toneMappingExposure: 1.9,
    vignette: {
      offset: 1.0, // Note: this was already in config
      darkness: 0.9,
    },
  }
};