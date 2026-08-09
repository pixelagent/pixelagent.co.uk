import { DIALOGUE_ID_MAP } from "../js/gameplay/dialogueMaps.js";
import { actions } from "../js/config.js";

const TILE_SIZE = 32;
let MAP_SIZE = 128;
const VIEW_WIDTH = 512;
const VIEW_HEIGHT = 512;

const PALETTE = {
    border_brown: '#4a3b2c',
    sand_light:   '#e9c46a',
    sand_dark:    '#dfb24c',
    sand_wave:    '#d4a373',
    clay_wall:    '#cd7f60',
    clay_dark:    '#b06548',
    clay_light:   '#de9678',
    roof_wood:    '#6e463b',
    water_deep:   '#204859',
    water_surf:   '#2e5d72',
    water_shore:  '#688880',
    palm_leaf:    '#3a5a40',
    palm_trunk:   '#a06a42',
    bush_green:   '#588157',
    pattern_brown:'#5c4033',
    sky_blue:     '#00bbf9',
    sprite_white: '#ffffff'
};

const PLAYER_CONFIG = {
    startX: 28,
    startY: 35,
    lives: 3,
    prayers: 3,
    heals: 1,
    visuals: {
        bodyColor: PALETTE.sky_blue,
        accentColor: PALETTE.pattern_brown,
        eyeColor: '#ffffff',
        pupilColor: '#000000',
        ghostAlpha: 0.5
    }
};

const ENEMY_CONFIG = {
    soldierGroupsCount: 4,
    soldierMinPerGroup: 3,
    soldierMaxPerGroup: 6,
    sadduceesCount: 4,
    phariseesCount: 6,
    types: {
        SOLDIER:  { speed: 0.04, pattern: 'patrol' },
        SADDUCEE: { speed: 0.03, pattern: 'wander' },
        PHARISEE: { speed: 0.03, pattern: 'square' }
    },
    visuals: {
        SOLDIER: [
            { tunicColor: '#dc2626', armorColor: '#991b1b', helmetColor: '#7f8c8d', plumeColor: '#dc2626', shieldColor: '#95a5a6', skinColor: '#f5cba7' },
            { tunicColor: '#7e22ce', armorColor: '#581c87', helmetColor: '#eab308', plumeColor: '#b91c1c', shieldColor: '#95a5a6', skinColor: '#f5cba7' },
            { tunicColor: '#1e3a8a', armorColor: '#172554', helmetColor: '#475569', plumeColor: '#3b82f6', shieldColor: '#95a5a6', skinColor: '#f5cba7' }
        ],
        SADDUCEE: { outerRobe: '#9333ea', innerRobe: '#6b21a8', headwear: '#4a235a', accentColor: '#f1c40f', skinColor: '#f5cba7' },
        PHARISEE: { outerRobe: '#0284c7', innerRobe: '#0369a1', headwear: '#1e40af', accentColor: '#0284c7', skinColor: '#f5cba7' }
    }
};

const TILE_LEGEND = { '.': 0, '~': 1, '#': 2, '=': 3, 'R': 4, 'W': 5, 'B': 6 };

function getStitchNoise(px, py) {
    const value = Math.sin(px * 12.9898 + py * 78.233) * 43758.5453123;
    return value - Math.floor(value);
}

function getTileAt(col, row, levelMap) {
    if (col < 0 || col >= MAP_SIZE || row < 0 || row >= MAP_SIZE) return 2;
    return levelMap[row][col];
}

export class Scene2D {
    constructor(ui) {
        this.ui = ui;
        this.canvas = null;
        this.ctx = null;
        this.levelMap = [];
        this.colliderMap = [];
        this.npcs = [];
        this.particles = [];
        this.enemies = [];
        this.MAX_PARTICLES = 40;
        this.running = false;
        this.container = null;
        this.gameKeys = {};
        this._animFrame = null;
        this._lastMoveTime = 0;
        this._moveDelay = 120;
        this.tileCache = [];
        this.app = null;
        this.world = null;
        this.playerLayer = null;
        this.npcLayer = null;
        this.enemyLayer = null;
        this.particleLayer = null;
        this.uiWorldLayer = null;
        this.minimapLayer = null;
        this.tilemapTexture = null;
        this.bakeCanvas = null;
        this.bakeCtx = null;
        this.waterTiles = [];
        this.tilemapSprite = null;
        this.playerG = null;
        this.particlesG = null;
        this.minimapDynamic = null;
        this.camera = { x: 0, y: 0 };
        this.isDialogueOpen = false;
        this.gameOver = false;
        this.player = null;
        this.npcEntities = [];
        this.enemyEntities = [];
        this.mapPixelSize = 0;
    }

    async init(containerId) {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        this.container.innerHTML = `
            <div id="game-container"><div id="lives-display"></div></div>
            <div id="game-over-screen" class="game-overlay" style="display:none;"><h1>GAME OVER</h1><button id="btn-try-again">Try Again</button></div>
            <div id="ui-controls-overlay">
                <div class="dpad">
                    <div class="btn" id="btn-up">▲</div>
                    <div class="btn" id="btn-left">◀</div>
                    <div class="btn" id="btn-right">▶</div>
                    <div class="btn" id="btn-down">▼</div>
                </div>
                <div class="action-group"><div id="btn-action" class="btn-action disabled">TALK</div></div>
                <div class="action-group"><div id="btn-action-prayer" class="btn-action">PRAY</div><div id="prayer-count" class="action-count">x3</div></div>
                <div class="action-group"><div id="btn-action-heal" class="btn-action">HEAL</div><div id="heal-count" class="action-count">x1</div></div>
                <div class="btn-ui">
                    <div id="btn-actions"><img src="../assets/gfx/list.svg" class="icon-svg" loading="lazy"></div>
                    <div id="btn-inventory"><img src="../assets/gfx/backpack-duotone.svg" class="icon-svg" loading="lazy"></div>
                    <div id="btn-talk"><img src="../assets/gfx/chat-duotone.svg" class="icon-svg" loading="lazy"></div>
                </div>
                <div id="actions-popup" class="actions-popup"><div id="actions-list"></div></div>
            </div>
        `;
        this._bindControls();
        this._setupActionsPanel();
        this._initializeGame();
        await this._initPixi();
        this.running = true;
        this._gameLoop();
    }

    _bindControls() {
        const bindBtn = (id, key) => {
            const btn = this.container.querySelector(`#${id}`);
            if (!btn) return;
            const start = (e) => { e.preventDefault(); this.gameKeys[key] = true; };
            const end = (e) => { e.preventDefault(); delete this.gameKeys[key]; };
            btn.addEventListener('pointerdown', start);
            btn.addEventListener('pointerup', end);
            btn.addEventListener('pointercancel', end);
            btn.addEventListener('pointerleave', end);
        };
        bindBtn('btn-up', 'KeyW');
        bindBtn('btn-down', 'KeyS');
        bindBtn('btn-left', 'KeyA');
        bindBtn('btn-right', 'KeyD');

        const talkButton = this.container.querySelector('#btn-action');
        if (talkButton) talkButton.addEventListener('pointerdown', (e) => { e.preventDefault(); this._handleTalk(); });

        const prayerButton = this.container.querySelector('#btn-action-prayer');
        if (prayerButton) prayerButton.addEventListener('pointerdown', (e) => { e.preventDefault(); this.usePlayerAction('prayer'); });

        const healButton = this.container.querySelector('#btn-action-heal');
        if (healButton) healButton.addEventListener('pointerdown', (e) => { e.preventDefault(); this.usePlayerAction('heal'); });

        const actionBtn = this.container.querySelector('#btn-talk');
        if (actionBtn) actionBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); this._handleTalk(); });

        const inventoryBtn = this.container.querySelector('#btn-inventory');
        if (inventoryBtn) inventoryBtn.addEventListener('pointerdown', (e) => { e.preventDefault(); if (this.ui && typeof this.ui.openInventory === 'function') this.ui.openInventory(); });

        const tryAgainBtn = this.container.querySelector('#btn-try-again');
        if (tryAgainBtn) tryAgainBtn.addEventListener('click', () => location.reload());

        this._keyState = {};
        window.addEventListener('keydown', (e) => { if (!this._keyState[e.code]) { this._keyState[e.code] = true; this.gameKeys[e.code] = true; } });
        window.addEventListener('keyup', (e) => { this._keyState[e.code] = false; delete this.gameKeys[e.code]; });
    }

    _setupActionsPanel() {
        const btnActions = this.container.querySelector('#btn-actions');
        const actionsPopup = this.container.querySelector('#actions-popup');
        if (btnActions) {
            btnActions.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                if (!actionsPopup) return;
                if (actionsPopup.classList.contains('open')) { actionsPopup.classList.remove('open'); return; }
                const parent = btnActions.closest('.btn-ui');
                const containerRect = this.container.getBoundingClientRect();
                if (parent) {
                    const parentRect = parent.getBoundingClientRect();
                    actionsPopup.style.left = (parentRect.left - containerRect.left - 80) + 'px';
                    actionsPopup.style.top = (parentRect.top - containerRect.top) + 'px';
                }
                actionsPopup.classList.add('open');
            });
        }
        const actionsList = this.container.querySelector('#actions-list');
        if (actionsList) {
            actionsList.innerHTML = actions.map(a => `<div class="action-item" data-action-id="${a.id}"><img src="${a.icon}" alt="${a.name}" class="action-icon"/></div>`).join('');
            actionsList.querySelectorAll('.action-item').forEach(item => {
                item.addEventListener('pointerdown', (e) => {
                    e.stopPropagation();
                    const action = actions.find(a => a.id === item.dataset.actionId);
                    if (action) this._showFloatingActionIcon(action.icon);
                });
            });
        }
    }

    _showFloatingActionIcon(iconText) {
        const icon = document.createElement('div');
        icon.className = 'floating-action-icon';
        const iconStr = String(iconText);
        if (iconStr.endsWith('.svg')) icon.innerHTML = `<img src="${iconStr}" class="icon-svg" loading="lazy">`;
        else if (iconStr.startsWith('<')) icon.innerHTML = iconStr;
        else icon.textContent = iconStr;

        const rect = this.container.getBoundingClientRect();
        const startX = rect.left + rect.width * 0.5 + (Math.random() - 0.5) * 60;
        const startY = rect.top + rect.height * 0.7 + (Math.random() - 0.5) * 20;
        icon.style.left = `${startX}px`;
        icon.style.top = `${startY}px`;
        icon.style.transform = 'translate(0, 0) scale(2)';
        icon.style.opacity = '1';
        document.body.appendChild(icon);

        const duration = 3000;
        const travelDistance = 500;
        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const scale = 2 - progress;
            const translateY = -travelDistance * progress;
            icon.style.transform = `translate(0, ${translateY}px) scale(${scale})`;
            let opacity;
            if (progress < 0.2) opacity = 1;
            else if (progress < 0.6) opacity = 1 - ((progress - 0.2) / 0.4);
            else opacity = 0;
            icon.style.opacity = opacity;
            if (progress < 1) requestAnimationFrame(animate);
            else icon.remove();
        };
        requestAnimationFrame(animate);
    }

    _initializeGame() {
        for (let r = 0; r < MAP_SIZE; r++) { this.levelMap[r] = []; this.colliderMap[r] = []; for (let c = 0; c < MAP_SIZE; c++) { this.levelMap[r][c] = 0; this.colliderMap[r][c] = 0; } }
        this._preRenderTiles();
        this.player = {
            x: PLAYER_CONFIG.startX, y: PLAYER_CONFIG.startY,
            renderX: PLAYER_CONFIG.startX * TILE_SIZE, renderY: PLAYER_CONFIG.startY * TILE_SIZE,
            startX: PLAYER_CONFIG.startX, startY: PLAYER_CONFIG.startY,
            facing: 'down', isMoving: false,
            lives: PLAYER_CONFIG.lives, prayers: PLAYER_CONFIG.prayers, heals: PLAYER_CONFIG.heals,
            invisibleUntil: 0
        };
        this.camera = { x: this.player.renderX - VIEW_WIDTH / 2, y: this.player.renderY - VIEW_HEIGHT / 2 };
        for (let i = 0; i < this.MAX_PARTICLES; i++) {
            this.particles.push({ x: Math.random() * VIEW_WIDTH, y: Math.random() * VIEW_HEIGHT, speed: 1.5 + Math.random() * 2, size: 2 + Math.floor(Math.random() * 2), opacity: 0.1 + Math.random() * 0.3 });
        }
    }

    _findWalkableSpawn() {
        const cx = Math.floor(MAP_SIZE / 2); const cy = Math.floor(MAP_SIZE / 2);
        for (let radius = 0; radius < MAP_SIZE; radius++) {
            for (let dx = -radius; dx <= radius; dx++) {
                for (let dy = -radius; dy <= radius; dy++) {
                    if (Math.abs(dx) !== radius && Math.abs(dy) !== radius) continue;
                    const x = cx + dx; const y = cy + dy;
                    if (x >= 0 && x < MAP_SIZE && y >= 0 && y < MAP_SIZE && this._isWalkable(x, y)) return { x, y };
                }
            }
        }
        return { x: cx, y: cy };
    }

    loadCase(caseId, tilemapData) {
        this.npcs = [];
        this.enemies = [];
        this.gameOver = false;
        const overlay = document.getElementById('game-over-screen');
        if (overlay) overlay.style.display = 'none';

        const npcDefs = this.ui?.cm?.getActiveCase()?.npcs || [];
        const defaultPositions = [{ x: 28, y: 33 }, { x: 42, y: 31 }, { x: 14, y: 31 }];
        npcDefs.forEach((npc, i) => {
            const pos = defaultPositions[i] || { x: 28 + (i % 3) * 5, y: 33 + Math.floor(i / 3) * 2 };
            this.npcs.push({ id: npc.id, name: npc.name, x: pos.x, y: pos.y, location: npc.location || '', animOffset: (Math.PI / 3) * i, avatar: npc.avatar || "<img src='../assets/gfx/user-duotone.svg' class='icon-svg' loading='lazy'>" });
        });

        if (tilemapData?.background) {
            const rows = tilemapData.gridSize?.rows || tilemapData.background.length;
            const cols = tilemapData.gridSize?.cols || tilemapData.background[0]?.length || MAP_SIZE;
            MAP_SIZE = Math.max(rows, cols);
            this.levelMap = []; this.colliderMap = [];
            for (let r = 0; r < rows; r++) {
                this.levelMap[r] = []; this.colliderMap[r] = [];
                for (let c = 0; c < cols; c++) {
                    const bgRow = tilemapData.background[r] || '';
                    const tileChar = bgRow[c] || '.';
                    this.levelMap[r][c] = TILE_LEGEND[tileChar] ?? 0;
                    const colRow = tilemapData.collider?.[r] || '';
                    this.colliderMap[r][c] = colRow[c] === 'X' ? 1 : 0;
                }
            }
            if (tilemapData.npcSpawns && tilemapData.npcSpawns.length > 0) {
                tilemapData.npcSpawns.forEach((spawn, i) => {
                    const sx = spawn.x ?? spawn.col ?? 0;
                    const sy = spawn.y ?? spawn.row ?? 0;
                    this.npcs.push({ id: spawn.id || `npc_${i}`, name: spawn.name || spawn.label || spawn.id || `Witness ${i + 1}`, x: sx, y: sy, location: spawn.location || '', animOffset: (Math.PI / 3) * i, avatar: "<img src='../assets/gfx/user-duotone.svg' class='icon-svg' loading='lazy'>" });
                });
            }
            const spawn = this._findWalkableSpawn();
            const pConf = tilemapData.playerConfig || {};
            this.player.x = pConf.startX ?? spawn.x;
            this.player.y = pConf.startY ?? spawn.y;
            this.player.startX = this.player.x;
            this.player.startY = this.player.y;
            this.player.renderX = this.player.x * TILE_SIZE;
            this.player.renderY = this.player.y * TILE_SIZE;
            this.player.facing = 'down';
            this.player.isMoving = false;
            this.player.lives = pConf.lives ?? PLAYER_CONFIG.lives;
            this.player.prayers = pConf.prayers ?? PLAYER_CONFIG.prayers;
            this.player.heals = pConf.heals ?? PLAYER_CONFIG.heals;
            this.player.invisibleUntil = 0;
            this.camera.x = this.player.renderX - VIEW_WIDTH / 2;
            this.camera.y = this.player.renderY - VIEW_HEIGHT / 2;
            this.updateLivesDisplay();
            this.updateActionCounts();
            if (tilemapData.enemySpawns && tilemapData.enemySpawns.length > 0) {
                this._spawnEnemiesFromSpawns(tilemapData.enemySpawns);
            } else if (tilemapData.enemyConfig) {
                this.spawnEnemies(tilemapData.enemyConfig);
            } else if (tilemapData.enemies) {
                this._spawnEnemiesFromGrid(tilemapData.enemies);
            }
            if (this.app) this._rebuildPixiWorld();
        }
    }

    _preRenderTiles() {
        this.tileCache = [];
        const tileIds = Object.values(TILE_LEGEND);
        for (const id of tileIds) {
            const canvas = document.createElement('canvas');
            canvas.width = TILE_SIZE; canvas.height = TILE_SIZE;
            const ctx = canvas.getContext('2d');
            const ts = TILE_SIZE;
            let baseColor = PALETTE.sand_light;
            if (id === 1) baseColor = PALETTE.water_deep;
            if (id === 2) baseColor = PALETTE.palm_trunk;
            if (id === 3) baseColor = PALETTE.sand_wave;
            if (id === 4) baseColor = PALETTE.roof_wood;
            if (id === 5) baseColor = PALETTE.clay_wall;
            if (id === 6) baseColor = PALETTE.bush_green;
            ctx.fillStyle = baseColor; ctx.fillRect(0, 0, ts, ts);
            for (let y = 0; y < ts; y += 2) {
                for (let x = 0; x < ts; x += 2) {
                    const seed = getStitchNoise(id * ts + x, y);
                    switch (id) {
                        case 0: ctx.fillStyle = (seed > 0.88) ? PALETTE.sand_dark : PALETTE.sand_light; ctx.fillRect(x, y, 2, 2); break;
                        case 1:
                            let dynamicWave = Math.sin((x) * 0.08 + (y) * 0.06) * 0.5 + 0.5;
                            if (dynamicWave > 0.40) { ctx.fillStyle = ((x + y) % 4 === 0 || seed > 0.52) ? PALETTE.water_surf : PALETTE.water_deep; }
                            else { ctx.fillStyle = ((x + y) % 4 === 2 || seed > 0.75) ? PALETTE.water_surf : PALETTE.water_deep; }
                            ctx.fillRect(x, y, 2, 2); break;
                        case 2: if ((x - ts / 2) * (x - ts / 2) + (y - ts / 2) * (y - ts / 2) < 180) { ctx.fillStyle = (seed > 0.4) ? PALETTE.palm_leaf : '#2a3f2c'; ctx.fillRect(x, y, 2, 2); } break;
                        case 3: if (y % 8 === 0 || (x + (Math.floor(y / 8) % 2) * 8) % 16 === 0) { ctx.fillStyle = PALETTE.roof_wood; ctx.fillRect(x, y, 2, 2); } else if (seed > 0.88) { ctx.fillStyle = PALETTE.clay_light; ctx.fillRect(x, y, 2, 2); } break;
                        case 4: if (y % 6 === 0) { ctx.fillStyle = '#4a2f27'; ctx.fillRect(x, y, 2, 2); } break;
                        case 5: if (y % 10 === 0) { ctx.fillStyle = PALETTE.clay_dark; ctx.fillRect(x, y, 2, 2); } else if (seed > 0.7) { ctx.fillStyle = PALETTE.clay_light; ctx.fillRect(x, y, 2, 2); } break;
                        case 6: if (seed > 0.45) { ctx.fillStyle = '#3a5a40'; ctx.fillRect(x, y, 2, 2); } break;
                    }
                }
            }
            this.tileCache[id] = canvas;
        }
    }

    _getFrontNPC() {
        let lookX = this.player.x; let lookY = this.player.y;
        if (this.player.facing === 'up') lookY--;
        if (this.player.facing === 'down') lookY++;
        if (this.player.facing === 'left') lookX--;
        if (this.player.facing === 'right') lookX++;
        return this.npcs.find(n => n.x === lookX && n.y === lookY) || null;
    }

    _isWalkable(gx, gy) {
        if (gx < 0 || gx >= MAP_SIZE || gy < 0 || gy >= MAP_SIZE) return false;
        const backgroundTile = this.levelMap[gy][gx];
        const colliderTile = this.colliderMap[gy]?.[gx] || 0;
        if (colliderTile === 1 || backgroundTile === 1 || backgroundTile === 2 || backgroundTile === 4 || backgroundTile === 5 || backgroundTile === 6) return false;
        if (this.npcs.some(n => n.x === gx && n.y === gy)) return false;
        if (this.enemies.some(e => Math.floor(e.x) === gx && Math.floor(e.y) === gy)) return false;
        return true;
    }

    _movePlayer(dx, dy, dir) {
        this.player.facing = dir;
        if (this._isWalkable(this.player.x + dx, this.player.y + dy)) { this.player.x += dx; this.player.y += dy; this.player.isMoving = true; }
        this._updateTalkButton();
    }

    _handleTalk() {
        const targetNpc = this._getFrontNPC();
        if (targetNpc) {
            this.isDialogueOpen = true;
            if (this.ui && typeof this.ui.handleNpcInteraction === 'function') this.ui.handleNpcInteraction('talk', targetNpc.id);
            setTimeout(() => { this.isDialogueOpen = false; this.player.invisibleUntil = Date.now() + 2000; }, 2000);
        }
    }

    _updateTalkButton() {
        const talkButton = this.container?.querySelector('#btn-action');
        if (!talkButton) return;
        if (this._getFrontNPC()) talkButton.classList.add('active');
        else talkButton.classList.remove('active');
    }

    updateLivesDisplay() { const el = document.getElementById('lives-display'); if (el) el.textContent = 'Lives: ' + this.player.lives; }
    updateActionCounts() { const p = document.getElementById('prayer-count'); const h = document.getElementById('heal-count'); if (p) p.textContent = 'x' + this.player.prayers; if (h) h.textContent = 'x' + this.player.heals; }

    usePlayerAction(actionType) {
        if (actionType === 'prayer' && this.player.prayers > 0) {
            this.player.prayers--;
            this.enemies.forEach(e => { if (e.type === 'SADDUCEE' || e.type === 'PHARISEE') e.stoppedUntil = Date.now() + 5000; });
        } else if (actionType === 'heal' && this.player.heals > 0) {
            this.player.heals--;
            this.enemies.forEach(e => { if (e.type === 'SOLDIER') e.stoppedUntil = Date.now() + 5000; });
        }
        this.updateActionCounts();
    }

    handlePlayerArrested() {
        this.isDialogueOpen = true;
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;background:black;opacity:0;transition:opacity 0.2s;z-index:500;pointer-events:none;';
        const gc = document.getElementById('game-container');
        if (gc) gc.appendChild(overlay);
        setTimeout(() => { overlay.style.opacity = '1'; }, 10);
        setTimeout(() => {
            this.player.x = this.player.startX; this.player.y = this.player.startY;
            this.player.invisibleUntil = Date.now() + 4000;
            overlay.style.opacity = '0';
            setTimeout(() => { overlay.remove(); this.isDialogueOpen = false; }, 200);
        }, 400);
    }

    _findValidSpawnTile(nearX = null, nearY = null, maxRadius = 3) {
        let attempts = 0;
        while (attempts < 100) {
            let rx, ry;
            if (nearX !== null && nearY !== null) { rx = nearX + Math.floor(Math.random() * (maxRadius * 2 + 1)) - maxRadius; ry = nearY + Math.floor(Math.random() * (maxRadius * 2 + 1)) - maxRadius; }
            else { rx = Math.floor(Math.random() * MAP_SIZE); ry = Math.floor(Math.random() * MAP_SIZE); }
            if (this._isWalkable(rx, ry) && (Math.abs(rx - this.player.x) > 5 || Math.abs(ry - this.player.y) > 5)) {
                if (!this.enemies.some(e => Math.floor(e.x) === rx && Math.floor(e.y) === ry)) return { x: rx, y: ry };
            }
            attempts++;
        }
        return null;
    }

    spawnSingleEnemy(type, posX, posY, groupId = null) {
        const variant = type === 'SOLDIER' ? Math.floor(Math.random() * ENEMY_CONFIG.visuals.SOLDIER.length) : 0;
        const typeDef = ENEMY_CONFIG.types[type];
        this.enemies.push({
            x: posX, y: posY, renderX: posX * TILE_SIZE, renderY: posY * TILE_SIZE,
            type, groupId, variant, pattern: typeDef.pattern, speed: typeDef.speed,
            stoppedUntil: 0, moveTimer: 0, state: 'wander', dir: 'down',
            wanderDir: Math.floor(Math.random() * 4), isMoving: false,
            squareBaseX: posX, squareBaseY: posY, squarePhase: Math.floor(Math.random() * 4)
        });
    }

    spawnEnemies(config) {
        this.enemies = [];
        const eConf = config || {};
        const sg = eConf.soldierGroupsCount ?? ENEMY_CONFIG.soldierGroupsCount;
        const smin = eConf.soldierMinPerGroup ?? ENEMY_CONFIG.soldierMinPerGroup;
        const smax = eConf.soldierMaxPerGroup ?? ENEMY_CONFIG.soldierMaxPerGroup;
        const sc = eConf.sadduceesCount ?? ENEMY_CONFIG.sadduceesCount;
        const pc = eConf.phariseesCount ?? ENEMY_CONFIG.phariseesCount;
        for (let g = 0; g < sg; g++) {
            let center = this._findValidSpawnTile();
            if (center) {
                const groupSize = Math.floor(Math.random() * (smax - smin + 1)) + smin;
                for (let i = 0; i < groupSize; i++) { let pos = this._findValidSpawnTile(center.x, center.y, 1) || center; this.spawnSingleEnemy('SOLDIER', pos.x, pos.y, g); }
            }
        }
        for (let i = 0; i < sc; i++) { let pos = this._findValidSpawnTile(); if (pos) this.spawnSingleEnemy('SADDUCEE', pos.x, pos.y); }
        for (let i = 0; i < pc; i++) { let pos = this._findValidSpawnTile(); if (pos) this.spawnSingleEnemy('PHARISEE', pos.x, pos.y); }
    }

    _spawnEnemiesFromSpawns(spawns) {
        this.enemies = [];
        const typeMap = { 'R': 'SOLDIER', 'S': 'SADDUCEE', 'P': 'PHARISEE' };
        spawns.forEach((spawn, i) => {
            const row = spawn.row ?? spawn.y ?? 0;
            const col = spawn.col ?? spawn.x ?? 0;
            const typeKey = (spawn.type || 'R').toUpperCase();
            const type = typeMap[typeKey] || 'SOLDIER';
            if (row >= 0 && row < MAP_SIZE && col >= 0 && col < MAP_SIZE && this._isWalkable(col, row)) {
                this.spawnSingleEnemy(type, col, row, type === 'SOLDIER' ? i : null);
            }
        });
    }

    _spawnEnemiesFromGrid(grid) {
        this.enemies = [];
        const typeMap = { 'R': 'SOLDIER', 'S': 'SADDUCEE', 'P': 'PHARISEE' };
        const rows = grid.length;
        const cols = grid[0]?.length || 0;
        for (let r = 0; r < rows; r++) {
            const row = grid[r] || '';
            for (let c = 0; c < cols; c++) {
                const ch = row[c] || '.';
                if (ch !== '.' && typeMap[ch.toUpperCase()]) {
                    const type = typeMap[ch.toUpperCase()];
                    if (this._isWalkable(c, r)) {
                        this.spawnSingleEnemy(type, c, r, type === 'SOLDIER' ? (r * cols + c) : null);
                    }
                }
            }
        }
    }

    updateEnemies() {
        const now = Date.now();
        const chaseRadius = 8;
        const playerVisible = Date.now() > this.player.invisibleUntil;
        const alertedGroups = new Set();
        if (playerVisible) {
            this.enemies.forEach(enemy => {
                if (enemy.type === 'SOLDIER' && enemy.groupId !== null) {
                    const dx = this.player.x - enemy.x; const dy = this.player.y - enemy.y;
                    if (Math.sqrt(dx * dx + dy * dy) < chaseRadius) alertedGroups.add(enemy.groupId);
                }
            });
        }
        this.enemies.forEach(enemy => {
            if (this.isDialogueOpen || now < enemy.stoppedUntil) { enemy.state = 'stopped'; enemy.isMoving = false; return; }
            const dx = this.player.x - enemy.x; const dy = this.player.y - enemy.y; const dist = Math.sqrt(dx * dx + dy * dy);
            if (playerVisible && (dist < chaseRadius || (enemy.type === 'SOLDIER' && alertedGroups.has(enemy.groupId)))) enemy.state = 'chase';
            else enemy.state = 'wander';
            enemy.moveTimer = (enemy.moveTimer || 0) + 1;
            const chaseSpeedMult = enemy.state === 'chase' ? 1.8 : 1.0;
            const moveInterval = Math.floor(60 / (enemy.speed * 10 * chaseSpeedMult));
            if (enemy.moveTimer >= moveInterval) {
                enemy.moveTimer = 0; let mx = 0, my = 0;
                if (enemy.state === 'chase' && playerVisible) {
                    const adx = Math.abs(dx); const ady = Math.abs(dy);
                    if (adx >= ady) {
                        mx = dx > 0 ? 1 : -1;
                        if (!this._isWalkable(Math.floor(enemy.x) + mx, Math.floor(enemy.y))) { mx = 0; my = dy > 0 ? 1 : -1; if (!this._isWalkable(Math.floor(enemy.x), Math.floor(enemy.y) + my)) { my = 0; mx = dx > 0 ? -1 : 1; if (!this._isWalkable(Math.floor(enemy.x) + mx, Math.floor(enemy.y))) { mx = 0; my = dy > 0 ? -1 : 1; if (!this._isWalkable(Math.floor(enemy.x), Math.floor(enemy.y) + my)) { mx = 0; my = 0; } } } }
                    } else if (ady > 0) {
                        my = dy > 0 ? 1 : -1;
                        if (!this._isWalkable(Math.floor(enemy.x), Math.floor(enemy.y) + my)) { my = 0; mx = dx > 0 ? 1 : -1; if (!this._isWalkable(Math.floor(enemy.x) + mx, Math.floor(enemy.y))) { mx = 0; my = dy > 0 ? -1 : 1; if (!this._isWalkable(Math.floor(enemy.x), Math.floor(enemy.y) + my)) { mx = 0; my = 0; } } }
                    }
                } else {
                    let tethered = false;
                    if (enemy.type === 'SOLDIER' && enemy.groupId !== null) {
                        const squadLeader = this.enemies.find(e => e.type === 'SOLDIER' && e.groupId === enemy.groupId);
                        if (squadLeader && squadLeader !== enemy) {
                            const ldx = squadLeader.x - enemy.x; const ldy = squadLeader.y - enemy.y; const distToLeader = Math.sqrt(ldx * ldx + ldy * ldy);
                            if (distToLeader > 1.5) { tethered = true; if (Math.abs(ldx) >= Math.abs(ldy)) mx = ldx > 0 ? 1 : -1; else my = ldy > 0 ? 1 : -1; }
                        }
                    }
                    if (!tethered) {
                        if (enemy.pattern === 'square') {
                            const seq = [[1,0],[0,1],[-1,0],[0,-1]]; const step = seq[enemy.squarePhase % 4]; mx = step[0]; my = step[1];
                            if (!this._isWalkable(Math.floor(enemy.x) + mx, Math.floor(enemy.y) + my)) { mx = 0; my = 0; enemy.squarePhase = (enemy.squarePhase + 1) % 4; }
                        } else {
                            const dirs = [[0,-1],[0,1],[-1,0],[1,0]]; const pick = enemy.wanderDir || 0; const dir = dirs[pick]; mx = dir[0]; my = dir[1];
                            enemy.wanderDir = (pick + 1 + Math.floor(Math.random() * 2)) % 4;
                        }
                    }
                }
                const nx = Math.floor(enemy.x) + mx; const ny = Math.floor(enemy.y) + my;
                if (this._isWalkable(nx, ny)) { enemy.x += mx; enemy.y += my; enemy.isMoving = true; enemy.dir = mx !== 0 ? (mx > 0 ? 'right' : 'left') : (my > 0 ? 'down' : 'up'); if (enemy.pattern === 'square' && mx === 0 && my === 0) enemy.squarePhase = (enemy.squarePhase + 1) % 4; }
                else { enemy.isMoving = false; if (enemy.state === 'wander') { enemy.wanderDir = Math.floor(Math.random() * 4); if (enemy.pattern === 'square') enemy.squarePhase = (enemy.squarePhase + 1) % 4; } }
            }
            enemy.renderX += (enemy.x * TILE_SIZE - enemy.renderX) * 0.15;
            enemy.renderY += (enemy.y * TILE_SIZE - enemy.renderY) * 0.15;
        });
    }

    async _initPixi() {
        if (typeof PIXI === 'undefined') { console.warn('PixiJS not loaded'); return; }
        this.app = new PIXI.Application();
        await this.app.init({ width: VIEW_WIDTH, height: VIEW_HEIGHT, backgroundColor: 0x120f0d, antialias: false, resolution: 1, autoDensity: false });
        const gc = document.getElementById('game-container');
        if (gc) gc.insertBefore(this.app.canvas, document.getElementById('lives-display'));
        this.world = new PIXI.Container(); this.app.stage.addChild(this.world);
        this.npcLayer = new PIXI.Container(); this.playerLayer = new PIXI.Container(); this.enemyLayer = new PIXI.Container(); this.uiWorldLayer = new PIXI.Container(); this.particleLayer = new PIXI.Container(); this.minimapLayer = new PIXI.Container();
        this.world.addChild(this.npcLayer); this.world.addChild(this.playerLayer); this.world.addChild(this.enemyLayer); this.world.addChild(this.uiWorldLayer);
        this.app.stage.addChild(this.particleLayer); this.app.stage.addChild(this.minimapLayer);
        this._bakeTilemap(); this._createPlayerGraphics(); this._createParticleGraphics(); this._createMinimap(); this._createNPCEntities(); this._createEnemyEntities();
        this.app.ticker.add(() => { if (this.running) this._updatePixi(); });
    }

    _bakeTilemap() {
        if (this.tilemapSprite) {
            this.world.removeChild(this.tilemapSprite);
            this.tilemapSprite.destroy();
            this.tilemapSprite = null;
        }
        this.mapPixelSize = MAP_SIZE * TILE_SIZE;
        this.bakeCanvas = document.createElement('canvas'); this.bakeCanvas.width = this.mapPixelSize; this.bakeCanvas.height = this.mapPixelSize;
        this.bakeCtx = this.bakeCanvas.getContext('2d'); this.bakeCtx.imageSmoothingEnabled = false;
        this.waterTiles = [];
        for (let r = 0; r < MAP_SIZE; r++) { for (let c = 0; c < MAP_SIZE; c++) { const id = this.levelMap[r][c]; if (id === 1) this.waterTiles.push({ col: c, row: r }); const cached = this.tileCache[id]; if (cached) this.bakeCtx.drawImage(cached, c * TILE_SIZE, r * TILE_SIZE); } }
        this.tilemapTexture = PIXI.Texture.from(this.bakeCanvas);
        if (this.tilemapTexture.source) this.tilemapTexture.source.scaleMode = 'nearest';
        this.tilemapSprite = new PIXI.Sprite(this.tilemapTexture);
        this.world.addChildAt(this.tilemapSprite, 0);
    }

    _refreshWaterTiles() {
        if (!this.bakeCtx || !this.tilemapTexture) return;
        for (const t of this.waterTiles) { const cached = this.tileCache[1]; if (cached) { this.bakeCtx.clearRect(t.col * TILE_SIZE, t.row * TILE_SIZE, TILE_SIZE, TILE_SIZE); this.bakeCtx.drawImage(cached, t.col * TILE_SIZE, t.row * TILE_SIZE); } }
        if (this.tilemapTexture.source) this.tilemapTexture.source.update();
    }

    _createPlayerGraphics() { this.playerG = new PIXI.Graphics(); this.playerLayer.addChild(this.playerG); }
    _createParticleGraphics() { this.particlesG = new PIXI.Graphics(); this.particleLayer.addChild(this.particlesG); }

    _createMinimap() {
        const mRadius = 48; const mCx = VIEW_WIDTH - mRadius - 16; const mCy = mRadius + 16; const pSize = (mRadius * 2) / MAP_SIZE;
        const mStartX = mCx - mRadius; const mStartY = mCy - mRadius;
        const minimapRing = new PIXI.Graphics(); minimapRing.circle(mCx, mCy, mRadius + 3).fill('#2c2219').stroke({ width: 3, color: '#d4a373' }); this.minimapLayer.addChild(minimapRing);
        const minimapMask = new PIXI.Graphics().circle(mCx, mCy, mRadius).fill(0xffffff); this.minimapLayer.addChild(minimapMask);
        const minimapTerrain = new PIXI.Graphics(); minimapTerrain.mask = minimapMask; minimapTerrain.rect(mCx - mRadius, mCy - mRadius, mRadius * 2, mRadius * 2).fill('#120f0d'); minimapTerrain.circle(mCx, mCy, mRadius * 0.4).stroke({ width: 1, color: 'rgba(212, 163, 115, 0.15)' }); minimapTerrain.circle(mCx, mCy, mRadius * 0.7).stroke({ width: 1, color: 'rgba(212, 163, 115, 0.15)' });
        for (let r = 0; r < MAP_SIZE; r++) { for (let c = 0; c < MAP_SIZE; c++) { const id = this.levelMap[r][c]; if (id === 3) minimapTerrain.rect(mStartX + (c * pSize), mStartY + (r * pSize), pSize, pSize).fill('rgba(233, 196, 106, 0.35)'); else if (id === 1) minimapTerrain.rect(mStartX + (c * pSize), mStartY + (r * pSize), pSize, pSize).fill('rgba(32, 72, 89, 0.6)'); else if (id === 5 || id === 4 || id === 2) minimapTerrain.rect(mStartX + (c * pSize), mStartY + (r * pSize), pSize, pSize).fill('#1c1510'); } }
        this.minimapLayer.addChild(minimapTerrain);
        this.minimapDynamic = new PIXI.Graphics(); this.minimapDynamic.mask = new PIXI.Graphics().circle(mCx, mCy, mRadius).fill(0xffffff); this.minimapLayer.addChild(this.minimapDynamic.mask); this.minimapLayer.addChild(this.minimapDynamic);
    }

    _createNPCEntities() {
        this.npcLayer.removeChildren();
        this.npcEntities = [];
        this.npcs.forEach(n => {
            n.shadowG = new PIXI.Graphics();
            n.spriteG = new PIXI.Graphics();
            n.nameBg = new PIXI.Graphics();
            n.nameText = new PIXI.Text({ text: n.name, style: { fontFamily: 'monospace', fontWeight: 'bold', fontSize: 11, fill: 0xffffff } });
            n.nameText.anchor.set(0.5, 0.5);
            this.npcLayer.addChild(n.shadowG, n.spriteG);
            this.uiWorldLayer.addChild(n.nameBg, n.nameText);
            n.nameBg.visible = false; n.nameText.visible = false;
            this.npcEntities.push(n);
        });
    }

    _createEnemyEntities() {
        this.enemyLayer.removeChildren();
        this.enemyEntities = [];
        this.enemies.forEach(e => {
            e.spriteG = new PIXI.Graphics();
            e.zzzText = new PIXI.Text({ text: 'Zzz', style: { fontFamily: 'monospace', fontWeight: 'bold', fontSize: 12, fill: 0x00ffff } });
            e.zzzText.anchor.set(0.5, 1); e.zzzText.alpha = 0.7; e.zzzText.visible = false;
            this.enemyLayer.addChild(e.spriteG);
            this.uiWorldLayer.addChild(e.zzzText);
            this.enemyEntities.push(e);
        });
    }

    _rebuildPixiWorld() {
        this.uiWorldLayer.removeChildren();
        this._bakeTilemap();
        this._createNPCEntities();
        this._createEnemyEntities();
    }

    _drawHumanoidGraphics(g, startX, startY, size, bounce, facing, visuals, isGhost = false) {
        const q = size / 4; const sx = startX; const sy = startY - bounce;
        g.clear();
        for (let i = 0; i < 4; i++) { const color = (i === 1) ? (visuals.accentColor || PALETTE.pattern_brown) : (visuals.bodyColor || PALETTE.sprite_white); g.rect(sx, sy + (i * q), size, q).fill(color); }
        let eyeY = sy + q + 2; let eX1 = sx + 4; let eX2 = sx + 14;
        if (facing === 'left') { eX1 -= 2; eX2 -= 2; } if (facing === 'right') { eX1 += 2; eX2 += 2; } if (facing === 'up') eyeY -= 2;
        g.rect(eX1, eyeY, 4, 4).fill(visuals.eyeColor || '#ffffff'); g.rect(eX2, eyeY, 4, 4).fill(visuals.eyeColor || '#ffffff');
        let pupilX1 = eX1 + 1; let pupilX2 = eX2 + 1;
        if (facing === 'right') { pupilX1 += 1; pupilX2 += 1; } if (facing === 'left') { pupilX1 -= 1; pupilX2 -= 1; }
        g.rect(pupilX1, eyeY + 1, 2, 2).fill(visuals.pupilColor || '#000000'); g.rect(pupilX2, eyeY + 1, 2, 2).fill(visuals.pupilColor || '#000000');
        g.alpha = isGhost ? (PLAYER_CONFIG.visuals.ghostAlpha || 0.5) : 1.0;
    }

    _drawEnemyGraphics(g, enemy, bounce) {
        const ts = TILE_SIZE; const sx = enemy.renderX; const sy = enemy.renderY - bounce; const type = enemy.type;
        g.clear();
        if (type === 'SOLDIER') {
            const variantIndex = enemy.variant || 0; const vis = ENEMY_CONFIG.visuals.SOLDIER[variantIndex] || ENEMY_CONFIG.visuals.SOLDIER[0];
            g.rect(sx + 6, sy + 10, ts - 12, ts - 14).fill(vis.tunicColor); g.rect(sx + 8, sy + 12, ts - 16, ts - 18).fill(vis.armorColor);
            g.rect(sx + 10, sy + 4, ts - 20, 8).fill(vis.skinColor); g.rect(sx + 8, sy + 2, ts - 16, 5).fill(vis.helmetColor);
            g.rect(sx + 12, sy - 3, 4, 6).fill(vis.plumeColor); g.rect(sx + ts - 12, sy + 14, 8, 10).fill(vis.shieldColor);
            g.rect(sx + 12, sy + 6, 4, 4).fill(vis.skinColor); g.rect(sx + ts - 16, sy + 6, 4, 4).fill(vis.skinColor);
        } else if (type === 'SADDUCEE') {
            const vis = ENEMY_CONFIG.visuals.SADDUCEE;
            g.rect(sx + 8, sy + 8, ts - 16, ts - 12).fill(vis.outerRobe); g.rect(sx + 10, sy + 10, ts - 20, ts - 16).fill(vis.innerRobe);
            g.rect(sx + 12, sy + 4, ts - 24, 7).fill(vis.skinColor); g.rect(sx + 14, sy - 5, ts - 28, 10).fill(vis.headwear);
            g.rect(sx + 4, sy + 14, 6, 8).fill(vis.accentColor); g.rect(sx + 14, sy + 6, 4, 3).fill(vis.skinColor); g.rect(sx + ts - 18, sy + 6, 4, 3).fill(vis.skinColor);
        } else if (type === 'PHARISEE') {
            const vis = ENEMY_CONFIG.visuals.PHARISEE;
            g.rect(sx + 6, sy + 8, ts - 12, ts - 12).fill(vis.outerRobe); g.rect(sx + 8, sy + 10, ts - 16, ts - 16).fill(vis.innerRobe);
            g.rect(sx + 10, sy + 3, ts - 20, 8).fill(vis.skinColor); g.rect(sx + 12, sy - 4, ts - 24, 8).fill(vis.headwear);
            g.rect(sx + 4, sy + 14, ts - 8, 3).fill(vis.accentColor); g.rect(sx + 12, sy + 5, 4, 3).fill(vis.skinColor); g.rect(sx + ts - 16, sy + 5, 4, 3).fill(vis.skinColor);
        }
    }

    _drawMinimapDynamic(time) {
        this.minimapDynamic.clear();
        const mRadius = 48; const mCx = VIEW_WIDTH - mRadius - 16; const mCy = mRadius + 16; const pSize = (mRadius * 2) / MAP_SIZE; const mStartX = mCx - mRadius; const mStartY = mCy - mRadius;
        this.npcs.forEach(n => { this.minimapDynamic.circle(mStartX + (n.x * pSize) + pSize / 2, mStartY + (n.y * pSize) + pSize / 2, 2.5).fill('#ff0055'); });
        this.enemies.forEach(e => { this.minimapDynamic.circle(mStartX + (e.x * pSize) + pSize / 2, mStartY + (e.y * pSize) + pSize / 2, 2).fill('#dc2626'); });
        const playerPulse = Math.abs(Math.sin(time / 180)) * 1.5;
        this.minimapDynamic.circle(mStartX + (this.player.x * pSize) + pSize / 2, mStartY + (this.player.y * pSize) + pSize / 2, 2.5 + playerPulse).fill(PLAYER_CONFIG.visuals.bodyColor);
        const sweepAngle = (time * 0.0025) % (Math.PI * 2); const sweepLX = mCx + Math.cos(sweepAngle) * mRadius; const sweepLY = mCy + Math.sin(sweepAngle) * mRadius;
        this.minimapDynamic.moveTo(mCx, mCy).lineTo(sweepLX, sweepLY).stroke({ width: 1.5, color: 'rgba(0, 245, 212, 0.3)' });
    }

    _updatePixi() {
        const time = Date.now();
        this._refreshWaterTiles();

        let targetX = this.player.x * TILE_SIZE; let targetY = this.player.y * TILE_SIZE;
        this.player.renderX += (targetX - this.player.renderX) * 0.18; this.player.renderY += (targetY - this.player.renderY) * 0.18;
        if (Math.abs(targetX - this.player.renderX) < 0.2 && Math.abs(targetY - this.player.renderY) < 0.2) { this.player.renderX = targetX; this.player.renderY = targetY; this.player.isMoving = false; }

        let targetCamX = this.player.renderX - VIEW_WIDTH / 2 + TILE_SIZE / 2; let targetCamY = this.player.renderY - VIEW_HEIGHT / 2 + TILE_SIZE / 2;
        this.camera.x += (targetCamX - this.camera.x) * 0.1; this.camera.y += (targetCamY - this.camera.y) * 0.1;
        this.camera.x = Math.max(0, Math.min(this.camera.x, MAP_SIZE * TILE_SIZE - VIEW_WIDTH)); this.camera.y = Math.max(0, Math.min(this.camera.y, MAP_SIZE * TILE_SIZE - VIEW_HEIGHT));
        this.world.position.set(-this.camera.x, -this.camera.y);

        this.updateEnemies();

        const activeTargetNPC = this._getFrontNPC();

        this.npcEntities.forEach(n => {
            let bounce = Math.abs(Math.sin((time / 200) + n.animOffset)) * 4;
            let nx = n.x * TILE_SIZE; let ny = n.y * TILE_SIZE;
            n.shadowG.clear(); n.shadowG.rect(nx + 4, ny + 28, TILE_SIZE - 8, 4).fill('rgba(26, 20, 16, 0.4)');
            this._drawHumanoidGraphics(n.spriteG, nx + 4, ny + 4, TILE_SIZE - 8, bounce, 'down', n.visuals || { bodyColor: PALETTE.sprite_white, accentColor: PALETTE.pattern_brown, eyeColor: '#ffffff', pupilColor: '#000000' }, false);
            if (n === activeTargetNPC) {
                const tagX = nx + TILE_SIZE / 2; const tagY = ny - bounce - 8;
                n.nameText.text = n.name; n.nameText.position.set(tagX, tagY);
                const textWidth = n.nameText.width; const textHeight = 14; const padX = 6; const padY = 4;
                n.nameBg.clear(); n.nameBg.rect(tagX - textWidth / 2 - padX, tagY - textHeight / 2 - padY, textWidth + padX * 2, textHeight + padY * 2).fill('rgba(26, 20, 16, 0.85)').stroke({ width: 1, color: '#00f5d4' });
                n.nameBg.visible = true; n.nameText.visible = true;
            } else { n.nameBg.visible = false; n.nameText.visible = false; }
        });

        let walkBounce = this.player.isMoving ? Math.abs(Math.sin(time * 0.015)) * 5 : 0;
        const isPlayerGhost = time < this.player.invisibleUntil;
        this._drawHumanoidGraphics(this.playerG, this.player.renderX + 4, this.player.renderY + 4, TILE_SIZE - 8, walkBounce, this.player.facing, PLAYER_CONFIG.visuals, isPlayerGhost);

        this.enemyEntities.forEach(enemy => {
            let bounce = enemy.isMoving ? Math.abs(Math.sin((time / 150) + enemy.x)) * 4 : 0;
            this._drawEnemyGraphics(enemy.spriteG, enemy, bounce);
            if (Date.now() < enemy.stoppedUntil || enemy.state === 'stopped') { enemy.zzzText.position.set(enemy.renderX + TILE_SIZE / 2, enemy.renderY - bounce - 5); enemy.zzzText.visible = true; } else { enemy.zzzText.visible = false; }
            if (Date.now() > this.player.invisibleUntil && Math.abs(this.player.x - enemy.x) < 0.8 && Math.abs(this.player.y - enemy.y) < 0.8) {
                this.player.lives--; this.updateLivesDisplay();
                if (this.player.lives <= 0) { this.gameOver = true; const goScreen = document.getElementById('game-over-screen'); if (goScreen) goScreen.style.display = 'flex'; }
                else { this.handlePlayerArrested(); }
            }
        });

        this.particlesG.clear();
        this.particles.forEach(p => {
            p.x -= p.speed; p.y += p.speed * 0.5;
            if (p.x < -10) { p.x = VIEW_WIDTH + 10; p.y = Math.random() * VIEW_HEIGHT; }
            if (p.y > VIEW_HEIGHT + 10) { p.y = -10; p.x = Math.random() * VIEW_WIDTH; }
            this.particlesG.rect(p.x, p.y, p.size * 2, p.size).fill({ color: '#dfb24c', alpha: p.opacity });
        });

        this._drawMinimapDynamic(time);
    }

    _gameLoop() {
        if (!this.running) return;
        this._animFrame = requestAnimationFrame(() => this._gameLoop());
        const time = Date.now();
        if (time - this._lastMoveTime > this._moveDelay) {
            if (this.gameKeys['KeyW'] || this.gameKeys['ArrowUp']) { this._movePlayer(0, -1, 'up'); this._lastMoveTime = time; }
            else if (this.gameKeys['KeyS'] || this.gameKeys['ArrowDown']) { this._movePlayer(0, 1, 'down'); this._lastMoveTime = time; }
            else if (this.gameKeys['KeyA'] || this.gameKeys['ArrowLeft']) { this._movePlayer(-1, 0, 'left'); this._lastMoveTime = time; }
            else if (this.gameKeys['KeyD'] || this.gameKeys['ArrowRight']) { this._movePlayer(1, 0, 'right'); this._lastMoveTime = time; }
        }
        const nearbyNPC = this._getFrontNPC();
        if (nearbyNPC && this.ui) this.ui.discoverNPC(nearbyNPC.id);
    }

    stop() {
        this.running = false;
        if (this._animFrame) cancelAnimationFrame(this._animFrame);
        if (this.app) { this.app.destroy(true); this.app = null; }
    }
}