import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import { GUI } from 'lil-gui';
import FastNoiseLite from 'fastnoise-lite'; // Your FastNoiseLite import is correct
import { config as gameConfig } from './config.js'; // This was correct, but I'm confirming it's here.
import { GameState, GameSummary, createWildernessState } from './GameState.js';import { AudioManager } from './AudioManager.js';
import { PlayerManager } from './PlayerManager.js';
import { SceneManager } from './SceneManager.js';
import { UIManager } from './UIManager.js';
import { ParticleManager } from './ParticleManager.js';
import { SaveManager } from './SaveManager.js';
import { MarketSimulation } from './MarketSimulation.js';
import { DayNightManager } from './DayNightManager.js';
import { WildernessManager } from './WildernessManager.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader.js';

export class Game {
  constructor(loadingScreen) {
    this.loadingScreen = loadingScreen;

    // Internal state
    this.manaQuota = 0;
    this.marketSimulation = new MarketSimulation();
    this.input = { up: false, down: false, left: false, right: false };
    this.clickTarget = null;
    this.mobileVisible = false;
    this.animationTime = 0;

    this.tileUpdateTimer = 0;
    this.tileUpdateInterval = 0.5; // seconds
    this.colors = gameConfig.scene.colors;

    // Terrain generation
    this.terrain = {
      noise: null,
      scale: gameConfig.terrain.scale,
      height: gameConfig.terrain.height,
      octaves: gameConfig.terrain.octaves,
      persistence: gameConfig.terrain.persistence,
      lacunarity: gameConfig.terrain.lacunarity,
      noiseEnabled: gameConfig.terrain.noiseEnabled,
    };
    // Managers
    this.ripples = {
      enabled: this.terrain.noiseEnabled,
      amplitude: 0.2,
    };
    this.scenery = [];
    this.tileHeightGrids = {};
    this.TILE_SIZE = gameConfig.scene.tileSize;
    this.GRID_RADIUS = gameConfig.scene.gridRadius;
    this.audioManager = null;
    this.playerManager = null;
    this.sceneManager = null;
    this.uiManager = null;
    this.particleManager = null;
    this.saveManager = null;
    this.dayNightManager = null;
    this.wildernessManager = null;
    this.stats = null;
    this.gui = null;

    // Three.js objects
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.player = null;
    this.composer = null;
    this.sunLight = null;
    this.vignettePass = null;
    this.torchLight = null;
    this.sandTexture = null;
    this.clock = new THREE.Clock();

    // Scene objects
    this.manaPickups = [];
    this.locationSprites = [];
    this.obstacleColliders = [];
    this.birds = [];
    this.tiles = {};
    this.TILE_SIZE = 1000;
    this.GRID_RADIUS = 1;
  }

  async init() {
    this.loadingScreen.setProgress(10);
    this.audioManager = new AudioManager();
    this.playerManager = new PlayerManager(this);
    this.uiManager = new UIManager(this);
    this.sceneManager = new SceneManager(this);
    this.saveManager = new SaveManager(this);
    this.dayNightManager = new DayNightManager(this);
    this.wildernessManager = new WildernessManager(this);
    this.loadingScreen.setProgress(25);

    if (this.terrain.noiseEnabled) {
      this.terrain.noise = new FastNoiseLite();
      this.terrain.noise.SetNoiseType(FastNoiseLite.NoiseType.OpenSimplex2);
      // Neutralize FastNoiseLite's built-in frequency/fractal handling —
      // getTerrainHeight() already does its own scale/octave/persistence/lacunarity loop,
      // so we want GetNoise() to behave like a raw single-octave sampler (same as
      // simplex-noise's createNoise2D() did) rather than double-applying frequency.
      this.terrain.noise.SetFrequency(1);
      this.terrain.noise.SetFractalType(FastNoiseLite.FractalType.None);
      // Optional: randomize the seed each load, since simplex-noise did this by default.
      // Leave it out if you want the same terrain every time you refresh.
      // this.terrain.noise.SetSeed(Math.floor(Math.random() * 65536));
    } else {
      console.warn('FastNoiseLite failed to load; terrain will be flat.');
    }

    this.sandTexture = this.generateSandTexture();
    await this.loadTribes();
    this.setupEventListeners();
    this.loadingScreen.setProgress(40);

    this.createThreeJsScene();
    this.loadingScreen.setProgress(85);
    if (this.dayNightManager) this.dayNightManager.init();
    this.setupPostProcessing();
    this.loadingScreen.setProgress(97);
    this.animate();

    if (gameConfig.debug && gameConfig.debug.stats) {
      this.stats = new Stats();
      this.stats.showPanel(0); // 0: fps, 1: ms, 2: mem
      document.body.appendChild(this.stats.dom);
      this.stats.dom.style.position = 'fixed';
      this.stats.dom.style.zIndex = '9999';
      this.stats.dom.style.top = '0px';
      this.stats.dom.style.transformOrigin = 'top left';
      this.stats.dom.style.transform = 'scale(2)'; // You can change 2 to 1.5, 3, etc. to make it bigger or smaller

    }

    if (gameConfig.debug.gui) {
      this.gui = new GUI();
      this.setupGUI();
    }

    // Load any previous save summary so the menu can offer "Continue Journey".
    await this.saveManager.loadSummary();

    // If there's no active game state from a load, go to menu
    if (GameState.world.gameState === 'menu') this.showMenu();

    this.setupUIEventListeners(); // Set up UI listeners after potential state load

    this.loadingScreen.hide();
  }

  setupGUI() {
    if (!this.gui) return;
    const gameplay = this.gui.addFolder("Gameplay");
    gameplay.add(GameState.world, "timeLeft", 10, 120, 1).name("Day Length (s)");
    gameplay.add(GameState.world, "day", 1, 100, 1).name("Current Day");

    const player = this.gui.addFolder("Player").onFinishChange(() => {
      this.playerManager.updatePlayerAppearance();
    });
    player.addColor(GameState.player, "headColor").name("Head Color");
    player.addColor(GameState.player, "bodyColor").name("Body Color");
    player.addColor(GameState.player, "dressColor").name("Dress Color");
    player.add(GameState.player, "money", 0, 1000);

    const market = this.gui.addFolder("Market");
    market.add(GameState.market, "sellPrice", 1, 10, 1).name("Sell Price");
    market.add(GameState.market, "dailyDemand", 10, 100, 1).name("Daily Demand");

    const lighting = this.gui.addFolder("Lighting");
    lighting.add(this.sunLight, "intensity", 0, 3).name("Sun Intensity");
    lighting.addColor(gameConfig.scene.colors, 'fogColor').name('Fog Color').onChange((value) => {
      this.scene.fog.color.set(value);
    });
    lighting.add(this.scene.fog, "near", 5, 100).name("Fog Near");
    lighting.add(this.scene.fog, "far", 20, 300).name("Fog Far");

    const sceneColors = this.gui.addFolder("Scene Colors");
    sceneColors.addColor(this.colors, 'skyColor1').name('Sky Top').onChange(() => this.updateSky());
    sceneColors.addColor(this.colors, 'skyColor2').name('Sky Middle').onChange(() => this.updateSky());
    sceneColors.addColor(this.colors, 'skyColor3').name('Sky Low').onChange(() => this.updateSky());
    sceneColors.addColor(this.colors, 'skyColor4').name('Sky Bottom').onChange(() => this.updateSky());
    sceneColors.addColor(this.colors, 'terrainColor1').name('Terrain Low').onFinishChange(() => this.rebuildWorld());
    sceneColors.addColor(this.colors, 'terrainColor2').name('Terrain Mid-Low').onFinishChange(() => this.rebuildWorld());
    sceneColors.addColor(this.colors, 'terrainColor3').name('Terrain Mid-High').onFinishChange(() => this.rebuildWorld());
    sceneColors.addColor(this.colors, 'terrainColor4').name('Terrain High').onFinishChange(() => this.rebuildWorld());


    const postProcessing = this.gui.addFolder("Post-processing");
    postProcessing.add(this.bloomPass, "strength", 0, 2, 0.05).name("Bloom Strength");
    postProcessing.add(this.bloomPass, "radius", 0, 1, 0.01).name("Bloom Radius");
    postProcessing.add(this.bloomPass, "threshold", 0, 1, 0.01).name("Bloom Threshold");
    postProcessing.add(this.vignettePass.uniforms.offset, 'value', 0, 2, 0.05).name('Vignette Offset');
    postProcessing.add(this.vignettePass.uniforms.darkness, 'value', 0, 2, 0.05).name('Vignette Darkness');

    const terrainGUI = this.gui.addFolder("Terrain");
    terrainGUI.add(this.terrain, 'noiseEnabled').name('Enable Noise').onFinishChange(() => this.rebuildWorld());
    terrainGUI.add(this.ripples, 'enabled').name('Enable Ripples').onFinishChange(() => this.rebuildWorld());
    terrainGUI.add(this.ripples, 'amplitude', 0, 1, 0.05).name('Ripple Amplitude').onFinishChange(() => this.rebuildWorld());
    terrainGUI.add(this.terrain, 'scale', 0.001, 0.1, 0.001).name('Noise Scale').onFinishChange(() => this.rebuildWorld());
    terrainGUI.add(this.terrain, 'height', 0, 20, 0.5).name('Noise Height').onFinishChange(() => this.rebuildWorld());
    terrainGUI.add(this.terrain, 'octaves', 1, 8, 1).name('Noise Octaves').onFinishChange(() => this.rebuildWorld());


    const camera = this.gui.addFolder("Camera");
    camera.add(this.camera, "fov", 40, 90).onChange(() => {
      this.camera.updateProjectionMatrix();
    });

    const debug = this.gui.addFolder("Debug");
    debug.add(this, 'endDay').name('End Day');
    debug.add(this, 'gameOver').name('Game Over');
    debug.add(this.saveManager, 'saveGame').name('Save Game');
    debug.add(this.saveManager, 'loadGame').name('Load Game & Reload');
    debug.add(this.saveManager, 'newGame').name('New Game (Deletes Save)');
  }

  updateSky() {
    const skyCanvas = document.createElement('canvas');
    skyCanvas.width = 256;
    skyCanvas.height = 256;
    const ctx = skyCanvas.getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 256);
    gradient.addColorStop(0, gameConfig.scene.colors.skyColor1);
    gradient.addColorStop(0.3, gameConfig.scene.colors.skyColor2);
    gradient.addColorStop(0.7, gameConfig.scene.colors.skyColor3);
    gradient.addColorStop(1, gameConfig.scene.colors.skyColor4);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    if (this.scene.background && this.scene.background.dispose) {
      this.scene.background.dispose();
    }

    const skyTexture = new THREE.CanvasTexture(skyCanvas);
    this.scene.background = skyTexture;
  }

  generateSandTexture() {
    const size = 512;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Create a fine grainy pattern
    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const noise = Math.random() * 25;
        ctx.fillStyle = `rgb(${220 + noise}, ${190 + noise}, ${150 + noise})`;
        ctx.fillRect(x, y, 1, 1);
      }
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(20, 20); // Tile the texture for finer grain
    return texture;
  }

  getTerrainHeight(x, z) {
    if (!this.terrain.noiseEnabled || !this.terrain.noise) return 0;

    let height = 0;
    let frequency = this.terrain.scale;
    let amplitude = this.terrain.height;

    for (let i = 0; i < this.terrain.octaves; i++) {
      height += this.terrain.noise.GetNoise(x * frequency, z * frequency) * amplitude;
      amplitude *= this.terrain.persistence;
      frequency *= this.terrain.lacunarity;
    }

    if (this.ripples.enabled) {
      const ripple1 = Math.sin(x * 0.15 + z * 0.05) * this.ripples.amplitude;
      const ripple2 = Math.sin(x * 0.04 - z * 0.08) * (this.ripples.amplitude * 0.7);
      const microGrain = Math.sin(x * 1.2) * Math.cos(z * 1.2) * (this.ripples.amplitude * 0.1);
      height += ripple1 + ripple2 + microGrain;
    }

    return height;
  }

  getSurfaceHeight(x, z) {
    const gx = Math.round(x / this.TILE_SIZE);
    const gz = Math.round(z / this.TILE_SIZE);
    const tileGrid = this.tileHeightGrids[`${gx},${gz}`];
    if (!tileGrid) return this.getTerrainHeight(x, z);

    const { grid, gridSize, segmentSize, size, centerX, centerZ } = tileGrid;
    const localX = x - centerX;
    const localY = centerZ - z; // inverse of worldZ = -localY + centerZ, used in createTile

    // Fractional grid-space coordinates, clamped to the tile's valid range
    let fx = (localX + size / 2) / segmentSize;
    let fy = (localY + size / 2) / segmentSize;
    const maxIdx = gridSize - 1;
    fx = Math.min(Math.max(fx, 0), maxIdx);
    fy = Math.min(Math.max(fy, 0), maxIdx);

    const ix0 = Math.floor(fx);
    const iy0 = Math.floor(fy);
    const ix1 = Math.min(ix0 + 1, maxIdx);
    const iy1 = Math.min(iy0 + 1, maxIdx);
    const tx = fx - ix0;
    const ty = fy - iy0;

    const h00 = grid[iy0 * gridSize + ix0];
    const h10 = grid[iy0 * gridSize + ix1];
    const h01 = grid[iy1 * gridSize + ix0];
    const h11 = grid[iy1 * gridSize + ix1];

    const hTop = h00 + (h10 - h00) * tx;
    const hBottom = h01 + (h11 - h01) * tx;
    return hTop + (hBottom - hTop) * ty;
  }

  rebuildTerrain() {
    // Clear existing tiles
    for (const key in this.tiles) {
      const mesh = this.tiles[key];
      this.scene.remove(mesh);
      if (mesh.material && mesh.material.map) mesh.material.map.dispose();
      mesh.geometry.dispose();
      mesh.material.dispose();
      delete this.tiles[key];
      delete this.tileHeightGrids[key];
    }

    // Re-create tiles around the player
    this.updateTileGrid();
  }

  rebuildWorld() {
    // Clear existing scenery
    this.scenery.forEach(obj => {
      this.scene.remove(obj);
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
    });
    this.scenery = [];

    this.obstacleColliders.forEach(c => this.scene.remove(c));
    this.obstacleColliders = [];

    this.locationSprites.forEach(s => this.scene.remove(s));
    this.locationSprites = [];

    this.rebuildTerrain();
    this.sceneManager.createLandscape();
  }

  updateTileGrid() {
    if (!this.player) return;
    const TILE = this.TILE_SIZE; // TILE_SIZE is very large, likely a bug. Let's assume it's for a single large plane for now.
    const px = this.player.position.x;
    const pz = this.player.position.z;
    const playerGX = Math.floor((px + TILE / 2) / TILE);
    const playerGZ = Math.floor((pz + TILE / 2) / TILE);

    const keys = Object.keys(this.tiles);
    for (let k = 0; k < keys.length; k++) {
      const key = keys[k];
      const [gx, gz] = key.split(',').map(Number);
      if (Math.abs(gx - playerGX) > this.GRID_RADIUS || Math.abs(gz - playerGZ) > this.GRID_RADIUS) {
        const mesh = this.tiles[key];
        this.scene.remove(mesh);
        if (mesh.material && mesh.material.map) {
          mesh.material.map.dispose();
        }
        mesh.geometry.dispose();
        mesh.material.dispose();
        delete this.tiles[key];
      }
    }

    for (let dx = -this.GRID_RADIUS; dx <= this.GRID_RADIUS; dx++) {
      for (let dz = -this.GRID_RADIUS; dz <= this.GRID_RADIUS; dz++) {
        const gx = playerGX + dx;
        const gz = playerGZ + dz;
        const key = `${gx},${gz}`;
        if (!this.tiles[key]) {
          this.sceneManager.createTile(gx * TILE, gz * TILE);
        }
      }
    }
  }

  toggleAudio() {
    GameState.settings.muted = !GameState.settings.muted;
    this.saveManager.saveGame();
    Howler.mute(GameState.settings.muted);
    this.uiManager.toggleAudioIcon(GameState.settings.muted);
  }

  toggleAbout() {
    this.uiManager.toggleAbout();
    this.audioManager.play('click');
  }

  togglePause() {
    if (GameState.world.gameState !== 'playing') return;
    GameState.world.paused = !GameState.world.paused;
    this.audioManager.play('pause');
    this.uiManager.togglePause(GameState.world.paused);
  }

  manualSave() {
    this.saveManager.saveGame();
    this.uiManager.createFloatingText('Game Saved!', window.innerWidth / 2, window.innerHeight / 2, '#5c6b3e');
    this.audioManager.play('sell'); // Re-using a pleasant sound for confirmation
  }

  toggleMobileControls() {
    this.mobileVisible = !this.mobileVisible;
    this.uiManager.toggleMobileControls(this.mobileVisible);
    this.audioManager.play('click');
  }

  toggleDayNight() {
    if (!this.dayNightManager || !this.dayNightManager.enabled) return;
    const mode = this.dayNightManager.toggle();
    this.uiManager.setDayNightIcon(mode);
    this.audioManager.play('click');
  }

  toggleFaithPanel() {
    this.uiManager.toggleFaithPanel(this);
    this.audioManager.play('click');
  }

  setupUIEventListeners() {
    // This function can be called multiple times, so we use a helper
    // to avoid adding duplicate listeners.
    const addClickListener = (id, handler) => {
      const element = document.getElementById(id);
      if (element) {
        // Remove old listener before adding new one
        if (element.handler) {
          element.removeEventListener('click', element.handler);
        }
        element.handler = handler.bind(this);
        element.addEventListener('click', element.handler);
      }
    };

    addClickListener('beginJourneyBtn', this.showDifficultyScreen);
    addClickListener('continueJourneyBtn', this.continueJourney.bind(this));
    addClickListener('newGameBtn', this.startNewGameWarning.bind(this));
    addClickListener('toHouseholdBtn', this.showHouseholdStep);
    addClickListener('backToTribeBtn', this.showTribeStep);
    addClickListener('backToMenuBtn', this.showMenu);
    addClickListener('dayEndBtn', this.continueToNextDay);
    addClickListener('tryAgainBtn', this.showDifficultyScreen);
    addClickListener('gameOverMenuBtn', this.showMenu);
    addClickListener('sellManaBtn', this.sellMana.bind(this));
    addClickListener('sellAllManaBtn', this.sellAllMana.bind(this));
    addClickListener('buyManaBtn', this.buyMana.bind(this));
    addClickListener('leaveMarketBtn', this.hideMarket.bind(this));
    addClickListener('goldenCalfBtn', this.activateGoldenCalf.bind(this));
    addClickListener('bronzeSerpentBtn', this.useBronzeSerpent.bind(this));
    addClickListener('eveningRestBtn', this.finishEvening.bind(this));
    addClickListener('resumeBtn', this.togglePause);
    addClickListener('manualSaveBtn', this.manualSave);
    addClickListener('pauseMenuBtn', this.showMenu);
  }

  setupEventListeners() {
    document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    document.addEventListener('keyup', (e) => this.handleKeyUp(e));
    document.getElementById('canvas').addEventListener('click', (e) => this.handleClick(e));

    document.getElementById('btnUp').addEventListener('mousedown', () => (this.input.up = true));
    document.getElementById('btnUp').addEventListener('mouseup', () => (this.input.up = false));
    document.getElementById('btnDown').addEventListener('mousedown', () => (this.input.down = true));
    document.getElementById('btnDown').addEventListener('mouseup', () => (this.input.down = false));
    document.getElementById('btnLeft').addEventListener('mousedown', () => (this.input.left = true));
    document.getElementById('btnLeft').addEventListener('mouseup', () => (this.input.left = false));
    document.getElementById('btnRight').addEventListener('mousedown', () => (this.input.right = true));
    document.getElementById('btnRight').addEventListener('mouseup', () => (this.input.right = false));

    ['btnUp', 'btnDown', 'btnLeft', 'btnRight'].forEach((id) => {
      const btn = document.getElementById(id);
      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const key = id.replace('btn', '').toLowerCase();
        this.input[key] = true;
      });
      btn.addEventListener('touchend', (e) => {
        e.preventDefault();
        const key = id.replace('btn', '').toLowerCase();
        this.input[key] = false;
      });
    });

    window.addEventListener('resize', () => this.onWindowResize());

    const jumpBtn = document.getElementById('btnJump');
    if (jumpBtn) {
      jumpBtn.addEventListener('mousedown', (e) => { e.preventDefault(); this.jump(); });
      jumpBtn.addEventListener('touchstart', (e) => { e.preventDefault(); this.jump(); });
    }

    document.getElementById('audioBtn').addEventListener('click', () => this.toggleAudio());
    document.getElementById('aboutBtn').addEventListener('click', () => this.toggleAbout());
    document.getElementById('closeAbout').addEventListener('click', () => this.toggleAbout());
    document.getElementById('pauseBtn').addEventListener('click', () => this.togglePause());
    document.getElementById('mobileToggleBtn').addEventListener('click', () => this.toggleMobileControls());

    const dayNightBtn = document.getElementById('dayNightBtn');
    if (dayNightBtn) dayNightBtn.addEventListener('click', () => this.toggleDayNight());
    const faithBtn = document.getElementById('faithBtn');
    if (faithBtn) faithBtn.addEventListener('click', () => this.toggleFaithPanel());
    const closeFaith = document.getElementById('closeFaith');
    if (closeFaith) closeFaith.addEventListener('click', () => this.toggleFaithPanel());

    // Setup for buttons that trigger game state changes
    document.querySelectorAll('.btn-difficulty').forEach(btn => {
      btn.addEventListener('click', () => {
        this.startGame(btn.dataset.difficulty);
        this.audioManager.play('click');
      });
    });
  }

  handleKeyDown(e) {
    if (e.key === 'Escape') {
      this.togglePause();
      return;
    }
    if (e.key === 'ArrowUp' || e.key === 'w') this.input.up = true;
    if (e.key === 'ArrowDown' || e.key === 's') this.input.down = true;
    if (e.key === 'ArrowLeft' || e.key === 'a') this.input.left = true;
    if (e.key === 'ArrowRight' || e.key === 'd') this.input.right = true;
    if (e.code === 'Space' || e.key === ' ') {
      e.preventDefault(); // stop the page from scrolling
      this.jump();
    }
  }

  jump() {
    if (GameState.world.gameState !== 'playing') return;
    this.playerManager.jump();
  }

  handleKeyUp(e) {
    if (e.key === 'ArrowUp' || e.key === 'w') this.input.up = false;
    if (e.key === 'ArrowDown' || e.key === 's') this.input.down = false;
    if (e.key === 'ArrowLeft' || e.key === 'a') this.input.left = false;
    if (e.key === 'ArrowRight' || e.key === 'd') this.input.right = false;
  }

  handleClick(e) {
    if (GameState.world.gameState !== 'playing') return;
    if (e.target.id !== 'canvas') return;

    const mouse = new THREE.Vector2((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);

    if (!this.camera) return;

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, this.camera);

    const grounds = this.scene.children.filter((obj) => obj.geometry && obj.geometry instanceof THREE.PlaneGeometry);
    if (grounds.length === 0) return;

    const intersection = raycaster.intersectObjects(grounds);
    if (intersection.length > 0) {
      const point = intersection[0].point;
      this.clickTarget = new THREE.Vector3(point.x, point.y, point.z);
    }
  }

  onWindowResize() {
    if (!this.camera || !this.renderer) return;
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    if (this.composer) {
      this.composer.setSize(window.innerWidth, window.innerHeight);
    }
  }

  createThreeJsScene() {
    this.scene = new THREE.Scene();
    this.uiScene = new THREE.Scene();
    this.cameraHeading = new THREE.Vector3(0, 0, -1);
    // Create the particle manager before building the landscape, so scenery
    // emitters (campfire, temple sparkles, market confetti) actually spawn.
    this.particleManager = new ParticleManager(this.scene);
    this.updateSky();

    this.updateTileGrid();

    const ambientLight = new THREE.AmbientLight(0xffffff, gameConfig.scene.ambientLight.intensity);
    this.scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(gameConfig.scene.hemiLight.skyColor, gameConfig.scene.hemiLight.groundColor, gameConfig.scene.hemiLight.intensity);
    this.scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffe5b4, gameConfig.scene.sunLight.intensity);
    sunLight.position.set(gameConfig.scene.sunLight.pos.x, gameConfig.scene.sunLight.pos.y, gameConfig.scene.sunLight.pos.z);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = gameConfig.scene.sunLight.shadow.mapSize;
    sunLight.shadow.mapSize.height = gameConfig.scene.sunLight.shadow.mapSize;
    sunLight.shadow.camera.near = gameConfig.scene.sunLight.shadow.camera.near;
    sunLight.shadow.camera.far = gameConfig.scene.sunLight.shadow.camera.far;
    sunLight.shadow.camera.left = gameConfig.scene.sunLight.shadow.camera.left;
    sunLight.shadow.camera.right = gameConfig.scene.sunLight.shadow.camera.right;
    sunLight.shadow.camera.top = gameConfig.scene.sunLight.shadow.camera.top;
    sunLight.shadow.camera.bottom = gameConfig.scene.sunLight.shadow.camera.bottom;
    sunLight.shadow.bias = gameConfig.scene.sunLight.shadow.bias;
    sunLight.shadow.normalBias = gameConfig.scene.sunLight.shadow.normalBias;
    sunLight.shadow.radius = gameConfig.scene.sunLight.shadow.radius;
    const sunTarget = new THREE.Object3D();
    this.scene.add(sunTarget);
    sunLight.target = sunTarget;
    this.scene.add(sunLight);
    this.sunLight = sunLight;

    this.scene.fog = new THREE.Fog(gameConfig.scene.colors.fogColor, gameConfig.scene.fog.near, gameConfig.scene.fog.far);

    this.updateTileGrid(); // Create initial tiles before placing objects on them
    this.sceneManager.createLandscape();
    this.sceneManager.createBirds();
    this.player = this.playerManager.createPlayer();
    this.player.position.set(0, this.getSurfaceHeight(0, 0), 0);
    this.scene.add(this.player);

    this.camera = new THREE.PerspectiveCamera(gameConfig.camera.initialFov, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.set(25, 30, 25);
    this.camera.lookAt(0, 0, 0);

    const canvas = document.getElementById('canvas');
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = gameConfig.postprocessing.toneMappingExposure;
    this.renderer.vertexColors = true;
  }

  setupPostProcessing() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));

    this.bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      gameConfig.postprocessing.bloom.strength,
      gameConfig.postprocessing.bloom.radius,
      gameConfig.postprocessing.bloom.threshold
    );
    this.composer.addPass(this.bloomPass);

    this.vignettePass = new ShaderPass(VignetteShader);
    this.vignettePass.uniforms['offset'].value = gameConfig.postprocessing.vignette.offset;
    this.vignettePass.uniforms['darkness'].value = gameConfig.postprocessing.vignette.darkness;
    this.composer.addPass(this.vignettePass);
  }

  async loadTribes() {
    try {
      const data = await fetch('./js/tribes.json');
      const json = await data.json();
      this.tribes = json.tribes || [];
      this.tribeMap = Object.fromEntries(this.tribes.map((t) => [t.id, t]));
    } catch (err) {
      console.error('Failed to load tribes.json:', err);
      this.tribes = [];
      this.tribeMap = {};
    }
    // Build the tribe selection buttons once the data is available.
    if (this.uiManager && this.tribes.length) {
      this.uiManager.buildTribeButtons(this.tribes);
    }
  }

  getTribe() {
    return this.tribeMap[GameState.player.selectedTribe] || this.tribes[0] || null;
  }

  getDifficultySettings() {
    // Combined profile: Tribe base settings modified by the chosen Household size.
    const tribe = this.getTribe();
    const mod = gameConfig.household[GameState.world.difficulty] || gameConfig.household.couple;
    if (!tribe) {
      // Fallback if tribes failed to load.
      const legacy = {
        single: { moveSpeed: gameConfig.player.moveSpeed.single, manaCount: gameConfig.manna.count.single, moveDrain: gameConfig.player.healthDrain.single, quota: gameConfig.manna.quota.single },
        couple: { moveSpeed: gameConfig.player.moveSpeed.couple, manaCount: gameConfig.manna.count.couple, moveDrain: gameConfig.player.healthDrain.couple, quota: gameConfig.manna.quota.couple },
        family: { moveSpeed: gameConfig.player.moveSpeed.family, manaCount: gameConfig.manna.count.family, moveDrain: gameConfig.player.healthDrain.family, quota: gameConfig.manna.quota.family },
      };
      return legacy[GameState.world.difficulty];
    }
    const s = tribe.settings;
    return {
      moveSpeed: s.moveSpeed * mod.moveSpeed,
      manaCount: Math.max(1, Math.round(s.manaCount * mod.manaCount)),
      moveDrain: s.moveDrain * mod.moveDrain,
      quota: Math.max(1, Math.round(s.quota * mod.quota)),
      startMoney: s.startMoney,
      startHealth: s.startHealth,
    };
  }

  selectTribe(tribeId) {
    GameState.player.selectedTribe = tribeId;
    const tribe = this.getTribe();
    if (tribe && tribe.color) {
      GameState.player.dressColor = parseInt(tribe.color.replace('#', '0x'));
    }
    this.playerManager.updatePlayerAppearance();
    this.uiManager.selectTribe(tribeId);
  }

  showMenu() {
    GameState.world.gameState = 'menu';
    this.clickTarget = null;
    if (this.dayNightManager) this.dayNightManager.disable();
    this.uiManager.showMenu();
    this.audioManager.playMenuMusic();
    this.setupUIEventListeners();
  }

  showDifficultyScreen() {
    GameState.world.gameState = 'difficulty';
    this.uiManager.showDifficultyScreen();
  }

  showHouseholdStep() {
    this.uiManager.showHouseholdStep();
    this.audioManager.play('click');
  }

  showTribeStep() {
    this.uiManager.showTribeStep();
    this.audioManager.play('click');
  }

  async continueJourney() {
    await this.saveManager.loadGame();
  }

  startNewGameWarning() {
    if (window.confirm('This will delete your previous journey. Are you sure you want to start anew?')) {
      this.saveManager.newGame(); // This will reload the page
    }
  }

  hideMarket() {
    this.uiManager.hideMarket();
    if (GameState.world.gameState !== 'market') return;
    // After the day's market, night falls and the evening temptations appear.
    if (this.wildernessManager && gameConfig.wilderness.enabled) {
      this.enterEvening();
    } else {
      GameState.world.gameState = 'dayend';
      this.processDayEndStats();
    }
  }

  sellMana(sellAmount = 5) {
    // Selling is only allowed at the end-of-day market.
    if (GameState.world.gameState !== 'market') return;
    // The Sell 5 button passes a click event; coerce anything non-numeric back to the default.
    if (typeof sellAmount !== 'number' || !Number.isFinite(sellAmount)) sellAmount = 5;
    const remainingDemand = Math.max(0, GameState.market.dailyDemand - GameState.market.manaSoldToday);
    const availableToSell = Math.min(sellAmount, GameState.session.dayManaCollected, remainingDemand);

    if (availableToSell <= 0) {
      const msg = GameState.session.dayManaCollected <= 0 ? 'No manna to sell!' : 'No one is buying any more today!';
      this.uiManager.createFloatingText(msg, window.innerWidth / 2, window.innerHeight / 2, '#7a2118');
      return;
    }
    GameState.session.dayManaCollected -= availableToSell;
    GameState.market.manaSoldToday += availableToSell;
    const revenue = availableToSell * GameState.market.sellPrice;
    GameState.player.money += revenue;
    this.uiManager.updateHUD();
    this.uiManager.updateMarket(this);
    this.uiManager.createFloatingText(`+${revenue} silver`, window.innerWidth / 2, window.innerHeight / 2, '#b8862f');
    this.audioManager.play('sell');
  }

  sellAllMana() {
    if (GameState.world.gameState !== 'market') return;
    const remainingDemand = Math.max(0, GameState.market.dailyDemand - GameState.market.manaSoldToday);
    const availableToSell = Math.min(GameState.session.dayManaCollected, remainingDemand);
    if (availableToSell <= 0) {
      const msg = GameState.session.dayManaCollected <= 0 ? 'No manna to sell!' : 'No one is buying any more today!';
      this.uiManager.createFloatingText(msg, window.innerWidth / 2, window.innerHeight / 2, '#7a2118');
      return;
    }
    this.sellMana(availableToSell);
  }

  buyMana(buyAmount = 5) {
    if (GameState.world.gameState !== 'market') return;
    if (typeof buyAmount !== 'number' || !Number.isFinite(buyAmount)) buyAmount = 5;
    const cost = buyAmount * GameState.market.buyPrice;
    if (GameState.player.money < cost) {
      this.uiManager.createFloatingText('Not enough silver!', window.innerWidth / 2, window.innerHeight / 2, '#7a2118');
      return;
    }
    if (GameState.market.manaForSale <= 0) {
      this.uiManager.createFloatingText('No manna for sale!', window.innerWidth / 2, window.innerHeight / 2, '#7a2118');
      return;
    }
    const amount = Math.min(buyAmount, GameState.market.manaForSale);
    GameState.player.money -= amount * GameState.market.buyPrice;
    GameState.market.manaForSale -= amount;
    GameState.session.dayManaCollected += amount;
    this.uiManager.updateHUD();
    this.uiManager.updateMarket(this);
    this.uiManager.createFloatingText(`+${amount} manna`, window.innerWidth / 2, window.innerHeight / 2, '#5c6b3e');
    this.audioManager.play('buy');
  }

  simulateMarket() {
    const result = this.marketSimulation.simulate(
      this.manaQuota,
      GameState.session.dayManaCollected,
      GameState.world.difficulty
    );

    GameState.market.status = result.marketStatus;
    GameState.market.sellPrice = Math.max(1, Math.round(gameConfig.market.baseSellPrice * result.priceModifier));
    GameState.market.dailyDemand = Math.max(gameConfig.market.minDemand, Math.round(result.totalSold / gameConfig.market.demandFactor));
    GameState.market.manaForSale = Math.max(0, Math.round(result.totalWasted));
    GameState.market.mood = this.marketSimulation.getMarketMood(result.marketStatus);
    GameState.session.playerWaste = result.playerWaste;
    GameState.session.playerWasteValue = result.playerWasteValue;

    // On most days, the market is quiet as everyone has enough.
    const isMarketClosed = Math.random() < gameConfig.market.closedChance && GameState.world.day > 1;
    if (isMarketClosed) {
      GameState.market.dailyDemand = 0;
      GameState.market.manaForSale = 0;
      GameState.market.mood = "The market is quiet. It seems everyone has enough manna for today.";
    }
  }

  updateManaQuota() {
    const settings = this.getDifficultySettings();
    let baseQuota = settings.quota;

    // On day 6 or 7, the quota is doubled.
    if (GameState.world.day === 6 || GameState.world.day === 7) {
      baseQuota *= gameConfig.gameplay.quotaDoubleDay6;
    }
    this.manaQuota = baseQuota;
  }

  showNewDayMessage() {
    let message;
    if (this.wildernessManager && this.wildernessManager.isSabbath) {
      message = `Day ${GameState.world.day}: The Sabbath. Rest — no manna is gathered, yet the tithe is given.`;
    } else if (GameState.world.day === 6) {
      message = `Day 6: A great need is felt in the land. The quota is doubled to ${this.manaQuota}!`;
    } else {
      message = `Day ${GameState.world.day}: Collect ${this.manaQuota} manna to survive.`;
    }
    this.uiManager.showDayMessage(message);
  }

  startGame(household) {
    GameState.world.difficulty = household;
    const profile = this.getDifficultySettings();
    GameState.world.gameState = 'playing';
    GameState.player.score = 0;
    GameState.world.timeLeft = gameConfig.game.dayLength;
    GameState.world.day = 1;
    GameState.player.health = profile.startHealth;
    GameState.session.dayManaCollected = 0;
    GameState.session.dayManaGathered = 0;
    GameState.player.money = gameConfig.player.initialMoney + (profile.startMoney || 0);
    GameState.market.manaSoldToday = 0;
    this.animationTime = 0;
    this.clickTarget = null;

    this.updateManaQuota();
    this.simulateMarket();

    // Reset the wilderness economy for a fresh journey, then run the dawn tithe.
    this.resetWilderness();
    if (this.dayNightManager) this.dayNightManager.enable();
    this.uiManager.setDayNightIcon('day');
    this.runDawn();
    this.uiManager.showGameUI();
    this.uiManager.updateHUD();
    if (GameState.world.day !== 7) {
      this.sceneManager.spawnPickups();
    }
    this.setupUIEventListeners();
    this.audioManager.playGameMusic();
    this.startDayTimer();
    this.showNewDayMessage();
  }

  /** Reset all wilderness-economy state for a brand new journey. */
  resetWilderness() {
    GameState.wilderness = createWildernessState();
  }

  /**
   * Run the dawn events for the current day (the tithe, or the Sabbath rest),
   * then fold any pending market bonuses into today's prices.
   * @returns {boolean} whether today is a Sabbath.
   */
  runDawn() {
    if (!this.wildernessManager) return false;
    const { isSabbath } = this.wildernessManager.startDay();
    this.wildernessManager.applyPendingMarketBonuses();
    this.uiManager.updateHUD();
    return isSabbath;
  }

  resumeFromLoad() {
    // Called by SaveManager after loading a game state
    if (GameState.world.gameState === 'playing' || GameState.world.gameState === 'dayend') {
      const settings = this.getDifficultySettings();
      this.manaQuota = settings.quota;
      this.uiManager.showGameUI();
      this.uiManager.updateHUD();
      this.player.position.set(GameState.player.position.x, GameState.player.position.y, GameState.player.position.z);
      this.playerManager.updatePlayerAppearance();
      this.setupUIEventListeners();
      this.uiManager.togglePause(GameState.world.paused);
      if (GameState.world.gameState === 'playing') {
        this.sceneManager.spawnPickups();
        this.audioManager.playGameMusic();
        if (this.dayNightManager) this.dayNightManager.enable();
      }
      if (GameState.world.timeLeft > 0 && GameState.world.gameState === 'playing') this.startDayTimer();
    }
  }

  startDayTimer() {
    if (this.dayTimerInterval) clearInterval(this.dayTimerInterval);
    GameState.world.timeLeft = gameConfig.game.dayLength;
    this.dayTimerInterval = setInterval(() => {
      if (GameState.world.paused) return;
      GameState.world.timeLeft--;
      this.uiManager.updateHUD();
      if (GameState.world.timeLeft <= 0) {
        clearInterval(this.dayTimerInterval);
        this.endDay();
      }
    }, 1000);
  }

  endDay() {
    if (this.dayTimerInterval) clearInterval(this.dayTimerInterval);
    if (GameState.world.gameState !== 'playing' && GameState.world.gameState !== 'market') return;

    // Sabbath: no market and no evening trade — the dawn already collected the
    // tithe and granted rest. Go straight to the day's reckoning.
    if (this.wildernessManager && this.wildernessManager.isSabbath) {
      if (this.dayNightManager) this.dayNightManager.setNight();
      this.uiManager.setDayNightIcon('night');
      this.wildernessManager.recordWaste(0, GameState.session.dayManaGathered, this.manaQuota);
      GameState.world.gameState = 'dayend';
      this.processDayEndStats();
      return;
    }

    GameState.world.gameState = 'market';
    this.uiManager.showMarket(this);
  }

  /**
   * Nightfall. Whatever manna is still in the basket spoils, torches are lit,
   * and the player is tempted by the Golden Calf / offered the Bronze Serpent.
   */
  enterEvening() {
    const wasted = GameState.session.dayManaCollected;
    if (this.wildernessManager) {
      this.wildernessManager.recordWaste(wasted, GameState.session.dayManaGathered, this.manaQuota);
    }
    GameState.world.gameState = 'evening';
    if (this.dayNightManager) this.dayNightManager.setNight();
    this.uiManager.setDayNightIcon('night');
    this.audioManager.play('click');
    this.uiManager.showEvening(this);
  }

  activateGoldenCalf() {
    if (GameState.world.gameState !== 'evening' || !this.wildernessManager) return;
    const result = this.wildernessManager.activateGoldenCalf();
    if (!result.success) {
      this.uiManager.createFloatingText('Not enough silver!', window.innerWidth / 2, window.innerHeight / 2, '#7a2118');
      return;
    }
    this.audioManager.play('buy');
    this.uiManager.updateHUD();
    this.uiManager.refreshEvening(this, { calfResult: result });
  }

  useBronzeSerpent() {
    if (GameState.world.gameState !== 'evening' || !this.wildernessManager) return;
    const result = this.wildernessManager.useBronzeSerpent();
    if (!result.success) {
      this.uiManager.createFloatingText('Not enough silver!', window.innerWidth / 2, window.innerHeight / 2, '#7a2118');
      return;
    }
    this.audioManager.play('sell');
    this.uiManager.updateHUD();
    this.uiManager.refreshEvening(this, { serpentResult: result });
  }

  finishEvening() {
    this.uiManager.hideEvening();
    GameState.world.gameState = 'dayend';
    this.processDayEndStats();
  }

  processDayEndStats() {
    const isSabbath = this.wildernessManager && this.wildernessManager.isSabbath;
    const wasted = GameState.session.dayManaCollected;
    let healthDelta = 0;
    if (!isSabbath) {
      if (GameState.session.dayManaGathered < this.manaQuota) {
        healthDelta = (GameState.session.dayManaGathered - this.manaQuota) * gameConfig.gameplay.healthPenaltyMultiplier;
      } else if (GameState.session.dayManaGathered >= this.manaQuota && wasted === 0) {
        healthDelta += gameConfig.gameplay.healthBonusNoWaste;
      } else if (wasted > 0) {
        healthDelta -= wasted * gameConfig.gameplay.healthPenaltyWasteMultiplier;
      }
    }

    GameState.player.health = Math.max(0, Math.min(100, GameState.player.health + healthDelta));

    const manaBonus = Math.max(0, GameState.session.dayManaGathered - this.manaQuota - wasted);
    GameState.player.score += manaBonus;

    this.clickTarget = null;
    this.uiManager.showDayEnd(this, manaBonus);
    this.audioManager.play('dayEnd');
    this.saveManager.saveGame();
  }

  continueToNextDay() {
    if (GameState.player.health <= 0) {
      this.gameOver();
      return;
    }
    GameState.world.day++;
    GameState.world.timeLeft = gameConfig.game.dayLength;
    GameState.session.dayManaCollected = 0;
    GameState.session.dayManaGathered = 0;
    GameState.market.manaSoldToday = 0;
    this.clickTarget = null;
    this.updateManaQuota();
    this.simulateMarket();

    this.manaPickups.forEach((p) => this.scene.remove(p));
    this.manaPickups = [];

    if (this.player) this.player.position.set(0, this.getSurfaceHeight(0, 0), 0);
    this.uiManager.hideAllModals();
    this.uiManager.showGameUI();
    GameState.world.gameState = 'playing';
    // A new dawn breaks — restore daylight and run the morning tithe / Sabbath.
    if (this.dayNightManager) this.dayNightManager.setDay();
    this.uiManager.setDayNightIcon('day');
    this.runDawn();
    this.uiManager.updateHUD();
    this.setupUIEventListeners();
    this.audioManager.playGameMusic();
    if (GameState.world.day !== 7) {
      this.sceneManager.spawnPickups();
    }
    this.startDayTimer();
    this.showNewDayMessage();
    this.saveManager.saveGame();
  }

  gameOver() {
    GameState.world.gameState = 'gameover';
    this.clickTarget = null;
    if (this.dayNightManager) this.dayNightManager.disable();
    let faith = null;
    if (this.wildernessManager) faith = this.wildernessManager.finalizeStats();
    this.audioManager.play('gameOver');
    this.audioManager.stopAllMusic();
    this.setupUIEventListeners();
    this.uiManager.showGameOver(this, faith);
  }

  getHealthStatus() {
    if (GameState.player.health > 75) return 'Abundant';
    if (GameState.player.health > 50) return 'Content';
    if (GameState.player.health > 25) return 'Weary';
    return 'Perishing';
  }

  drainHealthFromMovement(settings) {
    if (GameState.player.health <= 0) return;
    // On the Sabbath the journey wearies no one — no movement drain.
    if (this.wildernessManager && this.wildernessManager.isSabbath) return;
    GameState.player.health = Math.max(0, GameState.player.health - settings.moveDrain);
    this.uiManager.updateHUD();
    if (GameState.player.health <= 0) {
      this.audioManager.play('hurt');
      this.gameOver();
    }
  }

  animate() {
    if (this.stats) this.stats.begin();

    requestAnimationFrame(() => this.animate());

    const deltaTime = this.clock.getDelta();
    this.animationTime++;

    if (this.particleManager) {
      this.particleManager.update(deltaTime);
    }

    if (this.sceneManager && this.birds.length) {
      this.sceneManager.updateBirds(deltaTime);
    }

    if (GameState.world.gameState === 'playing' && this.player && !GameState.world.paused) {
      this.playerManager.update();

      this.tileUpdateTimer += deltaTime;
      if (this.tileUpdateTimer > this.tileUpdateInterval) {
        this.updateTileGrid();
        this.tileUpdateTimer = 0;
      }

      this.locationSprites.forEach((flagGroup) => {
        const distToZone = this.player.position.distanceTo(new THREE.Vector3(flagGroup.userData.targetX, this.player.position.y, flagGroup.userData.targetZ));
        flagGroup.visible = distToZone <= flagGroup.userData.radius;

        if (flagGroup.visible) {
          // Ripple the cloth banner and update the location readout.
          this.sceneManager.animateFlagWave(flagGroup.userData.flagMesh, this.animationTime);
          this.uiManager.updateLocationDisplay(flagGroup.userData);
        }
      });

      this.manaPickups = this.manaPickups.filter((mana) => {
        const pickupFloor = this.getSurfaceHeight(mana.position.x, mana.position.z) + gameConfig.scene.manaPickup.bobOffset;
        mana.position.y = pickupFloor + Math.sin(this.animationTime * gameConfig.scene.manaPickup.bobSpeed) * gameConfig.scene.manaPickup.bobAmount;
        mana.rotation.y += gameConfig.scene.manaPickup.rotationSpeed;

        if (this.playerManager.player.position.distanceTo(mana.position) < gameConfig.scene.manaPickup.pickupDistance) {
          const screenPos = mana.position.clone().project(this.camera);
          const screenX = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
          const screenY = (-screenPos.y * 0.5 + 0.5) * window.innerHeight;

          if (!isNaN(screenX) && !isNaN(screenY)) {
            this.uiManager.createFloatingText('+' + mana.userData.points, screenX, screenY, '#48dbfb');
            this.uiManager.createStarBurst(screenX, screenY);
          }

          this.scene.remove(mana);
          GameState.player.score += mana.userData.points;
          GameState.session.dayManaCollected++;
          GameState.session.dayManaGathered++;
          this.audioManager.play('pickup');
          this.uiManager.updateHUD();
          return false;
        }
        return true;
      });
    }

    if (this.player && this.camera) {
      const playerPos = this.player.position;

      // Check if player position is valid before using it to prevent camera errors
      if (playerPos && !isNaN(playerPos.x)) {
        const heading = this.cameraHeading.clone().normalize();
        const targetCamPos = playerPos
          .clone()
          .add(heading.multiplyScalar(-gameConfig.camera.followDistance))
          .add(new THREE.Vector3(0, gameConfig.camera.followHeight, 0));
        this.camera.position.lerp(targetCamPos, gameConfig.camera.lerpFactor);
        this.camera.lookAt(playerPos);
      }
    }

    if (this.sunLight && this.player) {
      this.sunLight.position.set(this.player.position.x + 40, this.player.position.y + 35, this.player.position.z + 25);
      this.sunLight.target.position.copy(this.player.position);
      this.sunLight.target.updateMatrixWorld();
    }

    if (this.dayNightManager) {
      this.dayNightManager.update(deltaTime);
    }

    if (this.renderer && this.scene && this.camera) {
      this.composer.render();
    }

    if (this.stats) this.stats.end();
  }
}