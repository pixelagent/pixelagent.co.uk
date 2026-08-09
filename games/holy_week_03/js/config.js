// Configuration object - npcs, locations, quests, actions, audio paths
const basePath = '../assets/audio/';
const baseNPCPath = '../assets/dialogue/exmaples/';
const baseModelPath = '../assets/models/';
const baseIconPath = '../assets/gfx/';

// ============================================================================
// RENDERING SYSTEM CONFIGURATION
// ============================================================================

// Color definitions (moved up to avoid hoisting issues)
export const COLORS = {
    cyan: 0x00f2ff,      // Cyan accent
    orange: 0xffaa00,    // Orange accent
    purple: 0xff00ff,    // Purple accent
    green: 0x00ff88,     // Success green

    lightRed: 0x440000,  // Light red (for player glow, less intense than pure red)
    red: 0xff0000,       // Alert red (standard bright red)
    torchRed: 0xff3333,   // Bright red for torch light (more vibrant than darkRed)
    darkRed: 0x663300,   // Dark red (for emissive glows)

    lightBlue: 0x88ccff,      // Soft blue for stars
    blue: 0x4488ff,      // Info blue
    white: 0xffffff,     // White
    black: 0x000000,     // Black
    gray: 0x888888,      // Neutral gray
    darkGray: 0x333333,  // Dark gray
    veryDarkGray : 0x111111,   // Very dark gray (for NPC pads)
    deepSpaceBlack : 0x020205,   // Deep space black (for night sky background)
    brown: 0x966F33,     // Brown (for trails/day)
    beige: 0xffffee,    // Beige (for sun sphere)
    yellow: 0xffff00,    // Yellow (for sun)
    shard: 0xa020f0,     // Purple for signal shards
    shardEmissive: 0x4a0080, // Dark red emissive for shards
crystal: 0x00f2ff,   // Cyan for crystal clusters (same as cyan)
    crystalEmissive: 0x004444, // Dark blue emissive for crystals
    bird: 0x333333,   // Dark grey birds
    dust: 0xaa8855,   // Sandy brown dust
     
};

// NPC Pad colors (used in NPC.js for base pad)
export const NPC_PAD = {
    baseColor: COLORS.darkGray,      // Dark gray base pad
    emissive: COLORS.veryDarkGray        // Dim emissive for pad
};

// Fallback primitive configs (used when MODEL_SYSTEM === 'primitives')
export const PRIMITIVE_CONFIG = {
    player: { type: 'box', size: [1.2, 2, 1.2], color: COLORS.red },
    npcEcho: { type: 'capsule', radius: 1, length: 2, color: COLORS.cyan },
    npcHorizon: { type: 'capsule', radius: 1, length: 2, color: COLORS.orange },
    npcSpire: { type: 'capsule', radius: 1, length: 2, color: COLORS.green },
    npcKeeper: { type: 'capsule', radius: 1, length: 2, color: COLORS.purple },
    pickupCell: { type: 'sphere', radius: 1, color: COLORS.orange },
    pickupShard: { type: 'octahedron', radius: 0.9, color: COLORS.shard, emissive: COLORS.shardEmissive },
    planet: { type: 'icosahedron', radius: 50, segments: 5, color: COLORS.green },
    tower: { type: 'box', size: [3, 10, 3], color: COLORS.gray },
    rocks: { type: 'box', size: [2, 4, 2], color: COLORS.gray },
    crystalCluster: { type: 'cone', radius: 0.8, height: 4, segments: 5, color: COLORS.cyan, emissive: COLORS.crystalEmissive, transparent: true, opacity: 0.9 }
};

// Planet configuration
export const PLANET = {
    radius: 50,                  // Planet radius
    segments: 5,                 // Geometry segments
    color: COLORS.green,             // Planet surface color (brighter green)
    toonRampLevels: 6,           // Toon shading levels
    shadowBias: 0.0001           // Shadow bias for artifacts
};

// Player configuration
export const PLAYER = {
    bodySize: { x: 0.5, y: 1, z: 0.5 },  // Collision box size
    meshColor: COLORS.red,          // Player mesh color
    jumpImpulse: 12,              // Jump impulse force
    mass: 1,                      // Player mass
    linearDamping: 0.9,           // Movement damping
    fixedRotation: true           // Lock rotation
};

// NPC color palette
export const NPC_COLORS = {
    echo: COLORS.cyan,         // Cyan - UNIT-01 ECHO
    horizon: COLORS.orange,     // Orange - UNIT-02 HORIZON
    spire: COLORS.green,       // Green - SPIRE_MINOR
    keeper: COLORS.purple,       // Purple - DATA_KEEPER
};


// ============================================================================
// RENDERING SYSTEM CONFIGURATION
// ============================================================================
/**
 * ICON_SYSTEM: Choose between FontAwesome and inline SVG icons.
 *   - 'fontawesome': Loads FontAwesome CDN and uses CSS classes.
 *   - 'svg': Uses local SVG files from assets/gfx/ via IconManager.
 *
 * MODEL_SYSTEM: Choose between primitive geometries and GLB 3D models.
 *   - 'primitives': Uses Three.js built-in geometries (boxes, spheres, capsules).
 *   - 'glb': Loads .glb files from assets/models/ via ModelManager.
 *
 * To switch systems, simply change these values and ensure required assets exist.
 */
export const ICON_SYSTEM = 'svg'; // 'fontawesome' | 'svg'
export const MODEL_SYSTEM = 'primitives'; // 'primitives' | 'glb'
export const USE_TOON_SHADER = true; // Enable toon shading (false = use MeshStandardMaterial)

// Debug flags: force primitive rendering for specific objects even in GLB mode
// Useful when GLB models are missing or you want to see fallback primitives
export const DEBUG_FORCE_PRIMITIVES = {
    player: false,       // Set true to see box primitive instead of player.glb
    planet: false,       // Set true to see icosahedron primitive instead of earth.glb
    npcs: false,         // Set true to see capsule primitives instead of NPC GLBs
    pickups: false       // Set true to see sphere/octahedron primitives instead of GLBs
};



// ============================================================================
// ICON CONFIGURATION
// ============================================================================
// Icon mappings for SVG system (file paths)
export const ICONS = {
    // UI buttons
    quest: baseIconPath + 'list.svg',
    inventory: baseIconPath + 'inventory.svg',
    actions: baseIconPath + 'list.svg',
    soundOn: baseIconPath + 'music.svg',
    soundOff: baseIconPath + 'music_off.svg',
    day: baseIconPath + 'day.svg',
    night: baseIconPath + 'night.svg',
    // Action icons (for floating icons & action list)
    scan: baseIconPath + 'search.svg',
    repair: baseIconPath + 'wrench.svg',
    hack: baseIconPath + 'laptop-code.svg',
    heal: baseIconPath + 'first-aid.svg',
    // Inventory item icons
    circle: baseIconPath + 'circle.svg',
    memory: baseIconPath + 'memory.svg',
    gem: baseIconPath + 'gem.svg',
    // Quest icons
    checkFull: baseIconPath + 'check-square-full.svg',
    checkEmpty: baseIconPath + 'check-square-empty.svg'
};

// FontAwesome icon class names (for FA system)
export const FA_ICONS = {
    quest: 'fas fa-list-check',
    inventory: 'fas fa-boxes-stacked',
    actions: 'fas fa-cogs',
    soundOn: 'fas fa-volume-up',
    soundOff: 'fas fa-volume-off',
    scan: 'fas fa-search',
    repair: 'fas fa-wrench',
    hack: 'fas fa-laptop-code',
    heal: 'fas fa-first-aid',
    circle: 'fas fa-circle',
    memory: 'fas fa-memory',
    gem: 'fas fa-gem',
    interact: 'fas fa-hand-pointer',
    day: 'fas fa-sun',
    night: 'fas fa-moon'
};

// ── MODEL PATHS (used when MODEL_SYSTEM === 'glb') ───────────────────────
export const MODELS = {
    player: baseModelPath + 'player/player.glb',    // Player character GLB
    npcEcho: baseModelPath + 'npcs/npc_echo.glb',
    npcHorizon: baseModelPath + 'npcs/npc_horizon.glb',
    npcSpire: baseModelPath + 'npcs/npc_spire.glb',
    npcKeeper: baseModelPath + 'npcs/npc_keeper.glb',
    pickupCell: baseModelPath + 'cell.glb',
    pickupShard: baseModelPath + 'shard.glb',
    // Environment
    planet: baseModelPath + 'earth.glb',
    tower: baseModelPath + 'tower.glb',
    rocks: baseModelPath + 'rocks.glb',
    house: baseModelPath + 'house.glb'
};

// Model scale factors (apply when loading GLB)
export const MODEL_SCALES = {
    planet: 2  ,      // earth.glb already at radius 50
    player: 1,
    npcEcho: 1,
    npcHorizon: 1,
    npcSpire: 1,
    npcKeeper: 1,
    pickupCell: 1,
    pickupShard: 1,
    tower: 1,
    rocks: 1,
    house: 1
};

// Scene configuration
export const SCENE = {
    background: COLORS.deepSpaceBlack,        // Dark background
    fogColor: 0x050a1a,                       // Atmospheric deep blue/grey
    fogDensity: 0.005,                        // Lower density for better depth
    fogNear: 20,                              // Linear fog start
    fogFar: 180,                             // Linear fog end (opaque)
    ambientLight: COLORS.deepSpaceBlack,      // Ambient light color
    ambientIntensity: 0.1,       // Ambient light strength
    sunColor: COLORS.white,          // Sunlight color
    sunIntensity: 1.2,           // Sunlight intensity (higher for toon shading)
    shadowMapSize: 2048,         // Shadow map resolution
    // Sun sphere (visual)
    sunSphereColor: COLORS.yellow,    // Sun sphere color
    // Moon light
    moonColor: COLORS.blue,         // Moon light color
    moonIntensity: 1.2,          // Moon light intensity
    // Hemisphere light
    hemiGroundColorDay: COLORS.darkGray, // Hemisphere light ground color (day)
    hemiGroundColorNight: COLORS.deepSpaceBlack, // Hemisphere light ground color (night)
    hemiIntensityDay: 0.4,       // Hemisphere light intensity (day)
    hemiIntensityNight: 0,       // Hemisphere light intensity (night)
    // Ambient light night multiplier
    ambientNightMultiplier: 0.1, // Ambient light intensity multiplier at night
    // Star field
    starColor: COLORS.lightBlue,         // Star field color
    // Player torch settings
    torchColor: COLORS.cyan,        // Torch light color (cyan or COLORS.torchRed for red)
    torchIntensityDay: 0,        // Torch off during day
    torchIntensityNightGLB: 300,       // Torch intensity for GLB mode at night
    torchIntensityNightPrimitive: 600,   // Torch intensity for primitive mode at night
    torchDistance: 10,          // Light reach distance (increased for better coverage)
    torchDecay: 1                // Light falloff value (linear)
    /*
    Range: 0 to 3 (theoretical), but practical values:
    0 — No decay (constant brightness at any distance, unrealistic)
    1 — Linear falloff (light dims proportionally with distance)
    2 — Quadratic/physical decay (realistic point light, light falls off with inverse square of distance) ← most common, physically correct
    3 — Cubic decay (extremely rapid falloff, rarely used)
    */
};

// Outline color for toon shading
export const OUTLINE_COLOR = COLORS.black; // Match background for silhouette effect

export const SOUND = {
    // UI sounds
    panelOpen: basePath + 'panel_open.mp3',
    panelClose: basePath + 'panel_close.mp3',
    buttonClick: basePath + 'button_click.mp3',
    questDone: basePath + 'quest_complete.mp3',
    victory: basePath + 'victory_fanfare.mp3',
    pickup: basePath + 'pickup.mp3',
    // Ambient
    birds: basePath + 'bird_song.mp3',
    // Music
    bgMusic: basePath + 'bg_music.mp3',
    // NPC-specific (by ID)
    npc: {
        1: { enter: basePath + 'echo_enter.mp3', exit: basePath + 'echo_exit.mp3' },
        2: { enter: basePath + 'horizon_enter.mp3', exit: basePath + 'horizon_exit.mp3' },
        3: { enter: basePath + 'spire_enter.mp3', exit: basePath + 'spire_exit.mp3' },
        4: { enter: basePath + 'keeper_enter.mp3', exit: basePath + 'keeper_exit.mp3' }
    }
};

export const actions = [
    { id: "pray", name: "Pray", icon: '../assets/gfx/hand-pointer.svg', description: "Offer a prayer for guidance and insight." },
    { id: "heal", name: "Heal", icon: '../assets/gfx/heart-duotone.svg', description: "A spiritual act of restoration." },
  ];

// Legacy npcs, quests, collectables deprecated - now in level*.js files
// Locations are now loaded dynamically from level data

export const locations = [
    { name: 'LOC_NORTH_SPIRE', pos: [0.1, 0.2], r: 15, questId: 0 },
    { name: 'LOC_FORGOTTEN_GARDEN', pos: [0.4, 0.5], r: 20, questId: 1 },
    { name: 'LOC_TEMPLE_RUINS', pos: [0.8, 0.1], r: 18, questId: 2 }
];

// ============================================================================
// DIALOGUE SYSTEM CONFIGURATION
// ============================================================================
/**
 * Dialogue system uses WhatsApp-style chat interface.
 * Ink.js runtime loaded via CDN (https://unpkg.com/inkjs@2.2.1/dist/ink.js)
 *
 * NPCs with `hasDialogue: true` will load their story from `storyFile` at startup.
 * Stories are stored in npcStories cache and instantiated on conversation start.
 */
export const DIALOGUE = {
    // Ink library detection order
    inkLibrary: ['inkjs', 'ink'],           // window.inkjs or window.ink

    // Dialogue UI timing (ms)
    messageDelay: 800,                      // Delay before main NPC message appears
    typingDelay: 800,                        // Duration of typing indicator before message appears
    fillerDelay: 1200,                      // Delay between filler messages
    choiceDelay: 1200,                      // Delay after choice before continuing

    // Whether to show filler messages during conversation
    enableFiller: true,

    // Auto-scroll behavior
    autoScroll: true,

    // Conversation bubble limits
    maxBubblesPerSegment: 10,               // Prevent spam
};

// ============================================================================
// VFX SYSTEM CONFIGURATION ( Landing Decals, Trails )
// ============================================================================
export const VFX = {
    landingDecal: {
        enabled: true,
        size: 4,                            // World units
        lifetime: 1.5,                      // Seconds before fade
        svgPath: './assets/gfx/dirt.svg',   // Decal texture (black shapes)
        nightColor: COLORS.white,               // Tint color in night mode (white for visibility)
        dayColor: COLORS.black,                  // Tint color in day mode (black - matches dark dirt)
    },
    trail: {
        enabled: true,
        particleSize: 0.3,
        dayColor: COLORS.brown,                 // Brownish by day
        nightColor: COLORS.cyan,               // Cyan by night
        lifetime: 1.0                       // Seconds
    },
    birds: {
        enabled: true,
        count: 20,
        altitude: 80,
        speed: 15,
        color: COLORS.cyan
    }
};

// Day/Night configuration
export const DAY_NIGHT = {
    autoCycle: true,                        //自动时间推进
    cycleSpeed: 0.00002,                    // Slowed down (5x slower)
    dayPosition: 0.25,                      // timeProgress value for full day
    nightPosition: 0.75,                    // timeProgress value for full night
    sky: {
        day: COLORS.lightBlue,                      // Light blue
        night: COLORS.deepSpaceBlack                     // Deep space black
    },
    fogDensity: 0.002,
    // Player emissive glow
    playerGlowDay: COLORS.red,                // No glow during day
    playerGlowNightGLB: COLORS.lightRed,           // Red glow at night (GLB - less intense)
    playerGlowNightPrimitive: COLORS.red,     // Red glow at night (primitives - more intense)
    // Ambient lighting
    ambientDay: 0.6,                        // Ambient light multiplier (day)
    ambientNight: 0.2,                      // Ambient light multiplier (night)
    hemiDay: 0.5,                           // Hemisphere light intensity (day)
    hemiNight: 0                            // Hemisphere light intensity (night)
};

// ============================================================================
// INPUT CONFIGURATION
// ============================================================================
export const CONTROLS = {
    jumpKey: 'Space',
    toggleAutoCycleKey: 'KeyC',
    moveForward: 'KeyW',
    moveBackward: 'KeyS',
    moveLeft: 'KeyA',
    moveRight: 'KeyD'
};