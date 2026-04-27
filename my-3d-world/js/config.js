/**
 * 3D Globe Starter - Config
 */

const config = {
  // Color scheme
  backgroundColor: 0x0a0a1a,

  // Loading screen
  loading: {
    background: '#0a0a1a',
    color: '#e0e0e0',
    text: 'Exploring...'
  },

  // Music URL
  musicUrl: 'assets/audio/c-style-963hz-energie-arcturienne-463699.mp3',

  // SVG icons and images
  icons: {
    loading: 'assets/gfx/loading.svg',
    audioOn: 'assets/gfx/music.svg',
    audioOff: 'assets/gfx/music_off.svg',
    checklist: 'assets/gfx/list.svg',
    inventory: 'assets/gfx/inventory.svg',
    // Placeholder paths - update with actual SVG files
    heart: 'assets/gfx/heart.svg',
    trophy: 'assets/gfx/trophy.svg',
    settings: 'assets/gfx/settings.svg',
    home: 'assets/gfx/home.svg',
    play: 'assets/gfx/play.svg',
    pause: 'assets/gfx/pause.svg',
    next: 'assets/gfx/next.svg',
    previous: 'assets/gfx/previous.svg',
    volumeUp: 'assets/gfx/volume_up.svg',
    volumeDown: 'assets/gfx/volume_down.svg',
    share: 'assets/gfx/share.svg',
    download: 'assets/gfx/download.svg',
    upload: 'assets/gfx/upload.svg',
    edit: 'assets/gfx/edit.svg',
    delete: 'assets/gfx/delete.svg',
    add: 'assets/gfx/add.svg',
    remove: 'assets/gfx/remove.svg',
    arrowLeft: 'assets/gfx/arrow_left.svg',
    arrowRight: 'assets/gfx/arrow_right.svg',
    arrowUp: 'assets/gfx/arrow_up.svg',
    arrowDown: 'assets/gfx/arrow_down.svg',
    check: 'assets/gfx/check.svg',
    cross: 'assets/gfx/cross.svg',
    warning: 'assets/gfx/warning.svg',
    error: 'assets/gfx/error.svg',
    success: 'assets/gfx/success.svg'
  },

  // World/terrain settings
  world: {
    earth: 'assets/earth.glb',
    earthScale: 100,
    planetRadius: 300
  },

  // Player settings
  player: {
    scale: 0.15,
    startHeight: 350
  },

  // Animation settings
  animations: {
    idle: 'assets/player_skin/Idle.fbx',
    walking: 'assets/player_skin/Walking.fbx',
    leftTurn: 'assets/player_skin/Left_Turn.fbx',
    rightTurn: 'assets/player_skin/Right_Turn.fbx',
    jump: 'assets/player_skin/Jump.fbx'
  },

  // Physics & movement settings
  physics: {
    acceleration: 50,
    deceleration: 30,
    maxSpeed: 100,
    rotateSpeed: 2.5,
    orbitAfterSeconds: 3,
    orbitSpeed: 0.3,
    orbitRadius: 200,
    orbitHeight: 120,
    camDistanceMoving: 100,
    camDistanceStill: 250,
    camDistanceMin: 50,
    camDistanceMax: 500,
    camHeightMoving: 80,
    camHeightStill: 200,
    camLerpSpeed: 0.1,
    raycastOffset: 350
  },

  // Animation settings
  animation: {
    turnFadeDuration: 0.15,
    idleFadeDuration: 0.5,
    walkSpeedThreshold: 0.5,
    walkTimeScaleMultiplier: 1.5
  },

  // Toon rendering settings
  toon: {
    enabled: true,
    rampLevels: 3,
    outlineColor: 0x1a3a5c,
    outlineWidth: 1.02
  },

  // Tasks checklist
  tasks: [
    { name: 'Explore terrain', current: 0, total: 1 },
    { name: 'Find hidden objects', current: 0, total: 5 },
    { name: 'Visit all biomes', current: 0, total: 4 }
  ],

  // Inventory items
  inventory: [
    { name: "Sword", quantity: 1 },
    { name: "Shield", quantity: 1 },
    { name: "Potion", quantity: 5 },
    { name: "Key", quantity: 2 }
  ]
};

export { config };
