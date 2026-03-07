// Import modules
import { player, initPlayer, updatePlayer, canPlayerJump, checkPlatformCollisions, makePlayerInvulnerable, resetPlayerState, PLAYER_PHYSICS } from './player.js';
import { updateEnemies, initEnemy, checkEnemyCollision, checkProjectileCollision, getEnemyProjectiles, resetEnemyStates, removeEnemy, ENEMY_TYPES } from './enemy.js';
import { checkCollectableCollisions } from './collectable.js';

document.addEventListener('DOMContentLoaded', () => {
    // Access gameConfig from window (defined in config.js)
    const gameConfig = window.gameConfig;

    const startGameButton = document.getElementById('start-game');
    const gameContainer = document.querySelector('.game-container');
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const popup = document.getElementById('portfolio-popup');
    const closeBtn = document.querySelector('.close-btn');

    // Initialize Rough.js canvas variable
    let roughCanvas;

    // Set canvas size to full screen and scale with window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        // Initialize Rough.js canvas when size changes
        roughCanvas = rough.canvas(canvas);
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Game state from config
    let gameStarted = gameConfig.gameStarted;
    let currentLevel = gameConfig.currentLevel;
    let score = gameConfig.score;
    let collectablesCollected = gameConfig.collectablesCollected;
    let gameOver = false;
    let animationId;
    let parallaxManager;
    let uiManager;

    // Camera variables for level scrolling
    let camera = {
        x: 0,
        y: 0,
        levelWidth: 0,
        levelHeight: 0
    };

    // Simple physics variables
    let playerVelocity = { x: 0, y: 0 };
    let gravity = 0.5;
    let isJumping = false;
    let groundLevel;
    // Track previous jump state to emit landing effects
    let previousIsJumping = false;
    // Counter used to emit periodic running dust while moving
    let runDustCounter = 0;

    // Initialize player
    initPlayer(gameConfig.player);
    // Ensure player input / movement is enabled by default
    player.disabled = false;

    // Listen for dialogue open/close events to disable/enable player
    window.addEventListener('ink-dialogue-opened', () => {
        player.disabled = true;
        // Stop any current movement
        keys.rightKey.pressed = false;
        keys.leftKey.pressed = false;
    });
    window.addEventListener('ink-dialogue-closed', () => {
        player.disabled = false;
    });

    // Initialize ground level after player is defined
    groundLevel = canvas.height - player.height;
    console.log('Initial ground level set to:', groundLevel, 'Canvas height:', canvas.height, 'Player height:', player.height);

    // Keys state
    const keys = {
        rightKey: { pressed: false },
        leftKey: { pressed: false }
    };

    // Game elements from config
    let platforms = [...gameConfig.elements.platforms];
    let checkpoints = [...gameConfig.elements.checkpoints];
    let backgrounds = [...gameConfig.elements.backgrounds || []];
    let scenes = [...gameConfig.elements.scenes || []];
    let boxes = [...gameConfig.elements.boxes || []];
    let npcs = [...gameConfig.elements.npcs || []];
    // Per-NPC repeat counters keyed by `${level}:${npcIndex}`
    let npcRepeatCounters = new Map();
    let collectables = [...gameConfig.elements.collectables];
    let enemies = [...gameConfig.elements.enemies];

    // Box physics - add velocity to each box
    let boxVelocities = [];

    // Texture manager
    let textureManager;

    // Player SVG image
    let playerSvg = new Image();
    let playerSvgLoaded = false;
    playerSvg.onload = function () {
        playerSvgLoaded = true;
        console.log('Player SVG loaded successfully');
    };

    playerSvg.onerror = function () {
        console.error('Failed to load player SVG');
    };

    // Set crossOrigin to prevent any container issues
    playerSvg.crossOrigin = 'anonymous';
    playerSvg.src = 'assets/player.svg';

    // Rough.js drawing cache to prevent animation
    let roughCache = {
        platforms: new Map(),
        collectables: new Map(),
        checkpoints: new Map(),
        enemies: new Map(),
        npcs: new Map(),
        scenes: new Map(),
        backgrounds: new Map(),
        player: null
    };

    // Load SVG level
    function loadSVGLevel(level) {
        fetch(`levels/level${level}.svg`)
            .then(response => response.text())
            .then(svgText => {
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');

                // Get SVG viewBox dimensions
                const viewBox = svgDoc.documentElement.getAttribute('viewBox');
                if (!viewBox) {
                    console.error('SVG viewBox attribute not found in level', level);
                    // Fallback to default dimensions
                    initGame();
                    return;
                }
                const [, , svgWidth, svgHeight] = viewBox.split(' ').map(Number);

                // Calculate scale factor to fit vertically
                const scale = canvas.height / svgHeight;
                const scaledWidth = svgWidth * scale;

                // Set camera level dimensions for scrolling
                camera.levelWidth = scaledWidth;
                camera.levelHeight = canvas.height;
                groundLevel = canvas.height - player.height;

                // Parse platforms
                platforms = [];
                const platformElements = svgDoc.querySelectorAll('#platforms rect');
                platformElements.forEach(element => {
                    platforms.push({
                        position: {
                            x: parseFloat(element.getAttribute('x')) * scale,
                            y: parseFloat(element.getAttribute('y')) * scale
                        },
                        width: parseFloat(element.getAttribute('width')) * scale,
                        height: parseFloat(element.getAttribute('height')) * scale
                    });
                });

                // Parse collectables
                collectables = [];
                const collectableElements = svgDoc.querySelectorAll('#collectables rect');
                collectableElements.forEach(element => {
                    collectables.push({
                        position: {
                            x: parseFloat(element.getAttribute('x')) * scale,
                            y: parseFloat(element.getAttribute('y')) * scale
                        },
                        width: parseFloat(element.getAttribute('width')) * scale,
                        height: parseFloat(element.getAttribute('height')) * scale
                    });
                });

                // Parse scenes
                scenes = [];
                const sceneElements = svgDoc.querySelectorAll('#scenes rect');
                sceneElements.forEach(element => {
                    scenes.push({
                        position: {
                            x: parseFloat(element.getAttribute('x')) * scale,
                            y: parseFloat(element.getAttribute('y')) * scale
                        },
                        width: parseFloat(element.getAttribute('width')) * scale,
                        height: parseFloat(element.getAttribute('height')) * scale
                    });
                });

                // Parse boxes
                boxes = [];
                const boxElements = svgDoc.querySelectorAll('#boxes rect');
                boxElements.forEach((element, index) => {
                    boxes.push({
                        position: {
                            x: parseFloat(element.getAttribute('x')) * scale,
                            y: parseFloat(element.getAttribute('y')) * scale
                        },
                        width: parseFloat(element.getAttribute('width')) * scale,
                        height: parseFloat(element.getAttribute('height')) * scale,
                        velocity: { x: 0, y: 0 } // Add velocity for physics
                    });

                    // Initialize box velocity
                    boxVelocities[index] = { x: 0, y: 0 };
                });

                // Parse backgrounds
                backgrounds = [];
                const backgroundElements = svgDoc.querySelectorAll('#backgrounds rect');
                backgroundElements.forEach(element => {
                    backgrounds.push({
                        position: {
                            x: parseFloat(element.getAttribute('x')) * scale,
                            y: parseFloat(element.getAttribute('y')) * scale
                        },
                        width: parseFloat(element.getAttribute('width')) * scale,
                        height: parseFloat(element.getAttribute('height')) * scale
                    });
                });

                // Parse checkpoints
                checkpoints = [];
                const checkpointElements = svgDoc.querySelectorAll('#checkpoints rect');
                checkpointElements.forEach(element => {
                    checkpoints.push({
                        position: {
                            x: parseFloat(element.getAttribute('x')) * scale,
                            y: parseFloat(element.getAttribute('y')) * scale
                        },
                        width: parseFloat(element.getAttribute('width')) * scale,
                        height: parseFloat(element.getAttribute('height')) * scale,
                        claimed: false
                    });
                });

                // Parse enemies with type support
                enemies = [];
                const enemyElements = svgDoc.querySelectorAll('#enemies rect');
                enemyElements.forEach((element, index) => {
                    // Get enemy type from data attribute or default to 'walker'
                    const enemyType = element.getAttribute('data-type') || 'walker';
                    const enemyConfig = ENEMY_TYPES[enemyType] || ENEMY_TYPES.walker;

                    enemies.push({
                        position: {
                            x: parseFloat(element.getAttribute('x')) * scale,
                            y: parseFloat(element.getAttribute('y')) * scale
                        },
                        width: parseFloat(element.getAttribute('width')) * scale,
                        height: parseFloat(element.getAttribute('height')) * scale,
                        type: enemyType,
                        speed: parseFloat(element.getAttribute('data-speed')) || enemyConfig.speed,
                        patrolRange: parseFloat(element.getAttribute('data-patrol')) || enemyConfig.patrolRange,
                        direction: 1,
                        color: enemyConfig.color
                    });

                    // Initialize enemy state
                    initEnemy(enemies[enemies.length - 1], index);
                });

                // Parse NPCs - handle both old and new formats
                npcs = [];
                const npcGroups = svgDoc.querySelectorAll('#npcs > g[id="npc"]');

                if (npcGroups.length > 0) {
                    // New format with show/hide layers
                    npcGroups.forEach((npcGroup, index) => {
                        const showRect = npcGroup.querySelector('#show rect');
                        const hideRect = npcGroup.querySelector('#hide rect');
                        const hideText = npcGroup.querySelector('#hide path');

                        if (showRect) {
                            npcs.push({
                                showLayer: {
                                    x: parseFloat(showRect.getAttribute('x')) * scale,
                                    y: parseFloat(showRect.getAttribute('y')) * scale,
                                    width: parseFloat(showRect.getAttribute('width')) * scale,
                                    height: parseFloat(showRect.getAttribute('height')) * scale
                                },
                                hideLayer: hideRect ? {
                                    x: parseFloat(hideRect.getAttribute('x')) * scale,
                                    y: parseFloat(hideRect.getAttribute('y')) * scale,
                                    width: parseFloat(hideRect.getAttribute('width')) * scale,
                                    height: parseFloat(hideRect.getAttribute('height')) * scale,
                                    text: hideText ? 'I' : ''
                                } : null,
                                message: getNPCMessage(currentLevel, index),
                                showHideLayer: false,
                                interacted: false
                            });
                        }
                    });
                } else {
                    // Old format - single rectangles
                    const npcElements = svgDoc.querySelectorAll('#npcs rect');
                    npcElements.forEach((element, index) => {
                        npcs.push({
                            showLayer: {
                                x: parseFloat(element.getAttribute('x')) * scale,
                                y: parseFloat(element.getAttribute('y')) * scale,
                                width: parseFloat(element.getAttribute('width')) * scale,
                                height: parseFloat(element.getAttribute('height')) * scale
                            },
                            hideLayer: null,
                            message: getNPCMessage(currentLevel, index),
                            showHideLayer: false,
                            interacted: false
                        });
                    });
                }

                // Parse startpoint and set player position
                const startpointElement = svgDoc.querySelector('#startpoint rect');
                if (startpointElement) {
                    player.position.x = parseFloat(startpointElement.getAttribute('x')) * scale;
                    player.position.y = parseFloat(startpointElement.getAttribute('y')) * scale;
                } else {
                    // Default start position
                    player.position.x = 50;
                    player.position.y = canvas.height - player.height - 100;
                }
                // Reset player velocity
                playerVelocity.x = 0;
                playerVelocity.y = 0;
                isJumping = false;
                camera.x = 0;
                camera.y = 0;
                console.log('Player position set to:', player.position.x, player.position.y);
            })
            .catch(error => {
                console.error('Error loading SVG level:', error);
                // Fallback to default level
                initGame();
            });
    }

    // Update collectables counter display
    function updateCollectablesCounter() {
        const counterElement = document.getElementById('collectables-count');
        if (counterElement) {
            counterElement.textContent = collectablesCollected;
        }
    }

    // Initialize simple physics system
    function initPhysicsEngine() {
        // Initialize simple physics variables
        playerVelocity = { x: 0, y: 0 };
        gravity = gameConfig.gravity;
        isJumping = false;
        // Use level ground if available so falling off tall levels triggers correct ground collision
        groundLevel = (typeof camera.levelHeight === 'number') ? (camera.levelHeight - player.height) : (canvas.height - player.height);

        console.log('Simple physics system initialized. Ground level:', groundLevel);
    }

    // Initialize texture manager
    function initTextureManager() {
        textureManager = new TextureManager(ctx);

        // Load textures from default configuration
        const textureConfig = TextureManager.getDefaultTextureConfig();
        textureManager.loadTexturesFromConfig(textureConfig);
    }

    // Initialize parallax manager
    function initParallaxManager() {
        parallaxManager = new ParallaxManager(ctx, canvas, gameConfig);
    }

    // Initialize UI manager
    function initUIManager() {
        uiManager = new UIManager();
        uiManager.init();
    }

    // Set up event listeners
    function setupEventListeners() {
        console.log('Setting up keyboard event listeners');

    }

    // Update lives display
    function updateLivesDisplay() {
        const livesCounter = document.querySelector('.lives-counter');
        if (livesCounter) {
            // Clear existing hearts
            livesCounter.innerHTML = '';

            // Add all hearts (3 total) in reverse order, applying 'lost' class to those beyond current lives
            for (let i = 2; i >= 0; i--) {
                const heart = document.createElement('span');
                heart.className = 'life';

                const heartIcon = document.createElement('img');
                heartIcon.src = 'assets/ui/heart.svg';
                heartIcon.alt = 'Heart';
                heartIcon.className = 'heart-icon';

                // Apply 'lost' class if this heart represents a lost life
                if (i >= lives) {
                    heartIcon.classList.add('lost');
                }

                heart.appendChild(heartIcon);
                livesCounter.appendChild(heart);
            }
        }
    }


    // Get NPC message configuration object (keeps backward compatibility with previous string format)
    // Returns either an object { path, repeat } or string fallback
    function getNPCMessage(level, npcIndex) {
        const entry = gameConfig.npcMessages[level]?.[npcIndex];
        if (!entry) return "Hello! Keep going to find more collectables!";
        // Backwards compatible: if entry is a string, return as-is
        if (typeof entry === 'string') return entry;
        return entry;
    }

    // Initialize game
    function initGame() {
        loadSVGLevel(currentLevel);
        uiManager.setCollectablesCollected(collectablesCollected);
    }

    // Start game
    startGameButton.addEventListener('click', () => {
        document.querySelector('.portfolio-container').style.display = 'none';
        gameContainer.style.display = 'block';
        gameStarted = true;
        console.log('Game started! Setting up event listeners.');

        // Set up event listeners after game starts
        setupEventListeners();

        initGame();
        animate();
    });

    // Game loop
    function animate() {
        animationId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Get z-index from config for draw order
        const zIndex = gameConfig.zIndex;

        // Update and draw parallax background (always first, z-index 0)
        parallaxManager.update(player, keys, camera);
        parallaxManager.draw(camera);

        // Create draw functions with their z-index values
        const drawFunctions = [];

        // Backgrounds (z-index: 0)
        if (zIndex.backgrounds === 0) {
            backgrounds.forEach(background => drawBackgrounds(background));
        } else {
            drawFunctions.push({ z: zIndex.backgrounds, draw: () => backgrounds.forEach(background => drawBackgrounds(background)) });
        }

        // Scenes (z-index: 10)
        drawFunctions.push({ z: zIndex.scenes, draw: () => scenes.forEach(scene => drawScenes(scene)) });

        // Boxes (z-index: 20)
        drawFunctions.push({ z: zIndex.boxes, draw: () => boxes.forEach(box => drawBoxes(box)) });

        // Platforms (z-index: 30)
        drawFunctions.push({ z: zIndex.platforms, draw: () => platforms.forEach(platform => drawPlatforms(platform)) });

        // Collectables (z-index: 40)
        drawFunctions.push({ z: zIndex.collectables, draw: () => collectables.forEach(collectable => drawCollectables(collectable)) });

        // Checkpoints (z-index: 50)
        drawFunctions.push({ z: zIndex.checkpoints, draw: () => checkpoints.forEach(checkpoint => drawCheckpoints(checkpoint)) });

        // Enemies (z-index: 60)
        drawFunctions.push({ z: zIndex.enemies, draw: () => enemies.forEach((enemy, index) => drawEnemies(enemy, index)) });

        // Enemy projectiles (z-index: 65)
        drawFunctions.push({ z: zIndex.enemyProjectiles, draw: drawEnemyProjectiles });

        // NPCs (z-index: 70)
        drawFunctions.push({ z: zIndex.npcs, draw: () => npcs.forEach(npc => drawNPCs(npc)) });

        // Player (z-index: 100)
        drawFunctions.push({ z: zIndex.player, draw: drawPlayer });

        // Sort by z-index and draw
        drawFunctions.sort((a, b) => a.z - b.z);
        drawFunctions.forEach(item => item.draw());

        // Update player position with enhanced physics
        isJumping = updatePlayer(keys, playerVelocity, gravity, isJumping, groundLevel, canvas, gameConfig, platforms, camera);

        // Update camera to follow player
        if (camera.levelWidth > 0) {
            // Center camera on player horizontally
            camera.x = player.position.x - canvas.width / 2 + player.width / 2;
            // Clamp camera to level bounds
            camera.x = Math.max(0, Math.min(camera.x, camera.levelWidth - canvas.width));
        }
        if (camera.levelHeight > 0) {
            // Center camera on player vertically (optional, for tall levels)
            camera.y = player.position.y - canvas.height / 2 + player.height / 2;
            // Clamp camera to level bounds
            camera.y = Math.max(0, Math.min(camera.y, camera.levelHeight - canvas.height));
        }

        // Update enemies with enhanced AI (pass camera for world bounds)
        updateEnemies(enemies, gameConfig.enemy, canvas, camera);

        // Update box physics
        updateBoxes();

        // Check for box-player collisions
        checkBoxCollisions();

        // Check for collisions
        checkCollisions();
    }

    // Draw functions for each game object type
    function drawBackgrounds(background) {
        const drawX = background.position.x - camera.x;
        const drawY = background.position.y - camera.y;

        if (textureManager && textureManager.getPattern('background')) {
            const pattern = textureManager.getPattern('background');
            if (pattern && typeof pattern.setTransform === 'function') {
                pattern.setTransform(new DOMMatrix().translate(-camera.x, -camera.y));
            }
            ctx.fillStyle = pattern;
        } else {
            ctx.fillStyle = textureManager ? textureManager.getFallbackColor('background') : '#f0f0f0';
        }
        ctx.fillRect(drawX, drawY, background.width, background.height);

        roughCanvas.rectangle(drawX, drawY, background.width, background.height, {
            fill: 'transparent',
            stroke: 'rgba(0, 0, 0, 0.2)',
            strokeWidth: 2,
            roughness: 0.5,
            fillStyle: 'solid',
            seed: 100
        });
    }

    function drawScenes(scene) {
        const drawX = scene.position.x - camera.x;
        const drawY = scene.position.y - camera.y;

        if (textureManager && textureManager.getPattern('scene')) {
            const pattern = textureManager.getPattern('scene');
            if (pattern && typeof pattern.setTransform === 'function') {
                pattern.setTransform(new DOMMatrix().translate(-camera.x, -camera.y));
            }
            ctx.fillStyle = pattern;
        } else {
            ctx.fillStyle = 'rgba(100, 200, 100, 0.7)';
        }
        ctx.fillRect(drawX, drawY, scene.width, scene.height);

        roughCanvas.rectangle(drawX, drawY, scene.width, scene.height, {
            fill: 'transparent',
            stroke: 'rgba(0, 0, 0, 0.2)',
            strokeWidth: 2,
            roughness: 1.2,
            fillStyle: 'solid',
            seed: 101
        });
    }

    function drawBoxes(box) {
        const drawX = box.position.x - camera.x;
        const drawY = box.position.y - camera.y;

        if (textureManager && textureManager.getPattern('box')) {
            const pattern = textureManager.getPattern('box');
            if (pattern && typeof pattern.setTransform === 'function') {
                pattern.setTransform(new DOMMatrix().translate(-camera.x, -camera.y));
            }
            ctx.fillStyle = pattern;
        } else {
            ctx.fillStyle = textureManager ? textureManager.getFallbackColor('box') : '#8B4513';
        }
        ctx.fillRect(drawX, drawY, box.width, box.height);

        roughCanvas.rectangle(drawX, drawY, box.width, box.height, {
            fill: 'transparent',
            stroke: 'rgba(0, 0, 0, 0.3)',
            strokeWidth: 2,
            roughness: 1.5,
            fillStyle: 'solid',
            seed: 109
        });
    }

    function drawPlatforms(platform) {
        const drawX = platform.position.x - camera.x;
        const drawY = platform.position.y - camera.y;

        if (textureManager && textureManager.getPattern('platform')) {
            const pattern = textureManager.getPattern('platform');
            if (pattern && typeof pattern.setTransform === 'function') {
                pattern.setTransform(new DOMMatrix().translate(-camera.x, -camera.y));
            }
            ctx.fillStyle = pattern;
        } else {
            ctx.fillStyle = textureManager ? textureManager.getFallbackColor('platform') : '#000';
        }
        ctx.fillRect(drawX, drawY, platform.width, platform.height);

        roughCanvas.rectangle(drawX, drawY, platform.width, platform.height, {
            fill: 'transparent',
            stroke: 'rgba(0, 0, 0, 0.3)',
            strokeWidth: 3,
            roughness: 2.0,
            fillStyle: 'solid',
            seed: 102
        });
    }

    function drawCollectables(collectable) {
        const drawX = collectable.position.x - camera.x;
        const drawY = collectable.position.y - camera.y;

        ctx.fillStyle = 'gold';
        ctx.fillRect(drawX, drawY, collectable.width, collectable.height);

        roughCanvas.circle(drawX + collectable.width / 2, drawY + collectable.height / 2, collectable.width, {
            fill: 'transparent',
            stroke: '#FFD700',
            strokeWidth: 2,
            roughness: 1.5,
            fillStyle: 'solid',
            seed: 103
        });
    }

    function drawCheckpoints(checkpoint) {
        if (!checkpoint.claimed) {
            const drawX = checkpoint.position.x - camera.x;
            const drawY = checkpoint.position.y - camera.y;

            if (textureManager && textureManager.getPattern('checkpoint')) {
                ctx.fillStyle = textureManager.getPattern('checkpoint');
            } else {
                ctx.fillStyle = textureManager ? textureManager.getFallbackColor('checkpoint') : 'green';
            }
            ctx.fillRect(drawX, drawY, checkpoint.width, checkpoint.height);

            roughCanvas.rectangle(drawX, drawY, checkpoint.width, checkpoint.height, {
                fill: 'transparent',
                stroke: '#228B22',
                strokeWidth: 3,
                roughness: 1.8,
                fillStyle: 'solid',
                seed: 104
            });
        }
    }

    function drawEnemies(enemy, index) {
        const drawX = enemy.position.x - camera.x;
        const drawY = enemy.position.y - camera.y;

        const enemyColor = enemy.color || ENEMY_TYPES[enemy.type]?.color || '#ff5252';
        ctx.fillStyle = enemyColor;

        if (enemy.type === 'flyer') {
            ctx.beginPath();
            ctx.moveTo(drawX + enemy.width / 2, drawY);
            ctx.lineTo(drawX, drawY + enemy.height);
            ctx.lineTo(drawX + enemy.width, drawY + enemy.height);
            ctx.closePath();
            ctx.fill();
        } else if (enemy.type === 'jumper') {
            ctx.fillRect(drawX + 2, drawY, enemy.width - 4, enemy.height - 6);
            ctx.fillRect(drawX, drawY + enemy.height - 6, 6, 6);
            ctx.fillRect(drawX + enemy.width - 6, drawY + enemy.height - 6, 6, 6);
        } else if (enemy.type === 'shooter') {
            ctx.beginPath();
            ctx.arc(drawX + enemy.width / 2, drawY + enemy.height / 2, enemy.width / 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(drawX + enemy.width, drawY + enemy.height / 2 - 3, 10, 6);
        } else {
            ctx.fillRect(drawX, drawY, enemy.width, enemy.height);
        }

        roughCanvas.rectangle(drawX, drawY, enemy.width, enemy.height, {
            fill: 'transparent',
            stroke: '#8B0000',
            strokeWidth: 2,
            roughness: 2.5,
            fillStyle: 'solid',
            seed: 105 + index
        });
    }

    function drawEnemyProjectiles() {
        const projectiles = getEnemyProjectiles();
        projectiles.forEach(proj => {
            const projDrawX = proj.x - camera.x;
            const projDrawY = proj.y - camera.y;
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(projDrawX, projDrawY, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    function drawNPCs(npc) {
        const drawX = npc.showLayer.x - camera.x;
        const drawY = npc.showLayer.y - camera.y;

        ctx.fillStyle = 'rgba(200, 100, 200, 0.8)';
        ctx.fillRect(drawX, drawY, npc.showLayer.width, npc.showLayer.height);

        roughCanvas.rectangle(drawX, drawY, npc.showLayer.width, npc.showLayer.height, {
            fill: 'transparent',
            stroke: 'white',
            strokeWidth: 2,
            roughness: 1.0,
            fillStyle: 'solid',
            seed: 106
        });

        if (npc.showHideLayer && npc.hideLayer) {
            const hideDrawX = npc.hideLayer.x - camera.x;
            const hideDrawY = npc.hideLayer.y - camera.y;
            ctx.fillStyle = 'rgba(100, 200, 100, 0.8)';
            ctx.fillRect(hideDrawX, hideDrawY, npc.hideLayer.width, npc.hideLayer.height);

            roughCanvas.rectangle(hideDrawX, hideDrawY, npc.hideLayer.width, npc.hideLayer.height, {
                fill: 'transparent',
                stroke: '#228B22',
                strokeWidth: 1,
                roughness: 1.5,
                fillStyle: 'solid',
                seed: 107
            });

            if (npc.hideLayer.text) {
                ctx.fillStyle = 'black';
                ctx.font = 'bold 16px Arial';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.fillText(npc.hideLayer.text,
                    hideDrawX + npc.hideLayer.width / 2,
                    hideDrawY + npc.hideLayer.height / 2);
            }
        }
    }

    function drawPlayer() {
        const playerDrawX = player.position.x - camera.x + (gameConfig.player.margin?.left || 0) - (gameConfig.player.margin?.right || 0);
        const playerDrawY = player.position.y - camera.y + (gameConfig.player.margin?.top || 0) - (gameConfig.player.margin?.bottom || 0);
        const drawWidth = player.width - (gameConfig.player.padding?.left || 0) - (gameConfig.player.padding?.right || 0);
        const drawHeight = player.height - (gameConfig.player.padding?.top || 0) - (gameConfig.player.padding?.bottom || 0);

        if (playerSvgLoaded) {
            ctx.drawImage(playerSvg, playerDrawX, playerDrawY, drawWidth, drawHeight);
        } else {
            ctx.fillStyle = 'blue';
            ctx.fillRect(playerDrawX, playerDrawY, drawWidth, drawHeight);
        }
    }


    // Raycast-based function to check if player can jump
    function canPlayerJump() {
        // Check if player is near ground level
        if (player.position.y >= groundLevel - 5) {
            console.log('Player is on ground level - can jump');
            return true;
        }

        // Raycast downward to detect platforms
        const raycastDistance = 10; // How far to check below player
        const playerBottom = player.position.y + player.height;
        const playerCenterX = player.position.x + player.width / 2;

        console.log('Raycasting for jump detection. Player bottom:', playerBottom, 'Checking', raycastDistance, 'pixels below');

        // Check if there's a platform directly below the player
        for (const platform of platforms) {
            // Check if player is above this platform
            if (playerBottom <= platform.position.y &&
                playerBottom + raycastDistance >= platform.position.y) {

                // Check if player is horizontally overlapping with platform
                if (player.position.x + player.width > platform.position.x &&
                    player.position.x < platform.position.x + platform.width) {

                    console.log('Raycast hit platform! Can jump.');
                    return true;
                }
            }
        }

        console.log('No ground or platform detected - cannot jump');
        return false;
    }

    // Update box physics
    function updateBoxes() {
        boxes.forEach((box, index) => {
            // Apply gravity to boxes
            boxVelocities[index].y += gravity;
            box.position.y += boxVelocities[index].y;

            // Check for platform collisions
            for (const platform of platforms) {
                // Check if box is falling onto platform
                if (boxVelocities[index].y >= 0 &&
                    box.position.x + box.width > platform.position.x &&
                    box.position.x < platform.position.x + platform.width &&
                    box.position.y + box.height > platform.position.y &&
                    box.position.y + box.height < platform.position.y + box.height + boxVelocities[index].y) {

                    // Land on platform
                    box.position.y = platform.position.y - box.height;
                    boxVelocities[index].y = 0;
                    break;
                }
            }

            // Check for ground collision
            if (box.position.y > groundLevel) {
                box.position.y = groundLevel;
                boxVelocities[index].y = 0;
            }
        });
    }

    // Check for box-player collisions and handle pushing
    function checkBoxCollisions() {
        boxes.forEach((box, index) => {
            // Check if player is colliding with box
            if (player.position.x + player.width > box.position.x &&
                player.position.x < box.position.x + box.width &&
                player.position.y + player.height > box.position.y &&
                player.position.y < box.position.y + box.height) {

                console.log('Player-box collision detected');

                // Determine collision direction and handle pushing
                const playerCenterX = player.position.x + player.width / 2;
                const boxCenterX = box.position.x + box.width / 2;

                // Horizontal pushing
                if (Math.abs(playerCenterX - boxCenterX) > Math.abs((player.position.y + player.height / 2) - (box.position.y + box.height / 2))) {
                    // Player is to the left of box - push right
                    if (playerCenterX < boxCenterX && keys.rightKey.pressed) {
                        box.position.x += 2; // Push box right
                        console.log('Pushing box right');
                    }
                    // Player is to the right of box - push left
                    else if (playerCenterX > boxCenterX && keys.leftKey.pressed) {
                        box.position.x -= 2; // Push box left
                        console.log('Pushing box left');
                    }
                }

                // Vertical collision (player on top of box)
                if (player.position.y + player.height <= box.position.y + 10 &&
                    playerVelocity.y >= 0 &&
                    Math.abs(playerCenterX - boxCenterX) < (player.width + box.width) / 2) {

                    // Player can stand on top of box
                    player.position.y = box.position.y - player.height;
                    playerVelocity.y = 0;
                    isJumping = false;
                    console.log('Player standing on box');
                }
            }
        });
    }

    // Check for collisions
    function checkCollisions() {
        // Check for collectables (capture updated count returned by helper)
        collectablesCollected = checkCollectableCollisions(player, collectables, collectablesCollected, uiManager, window.audioManager, camera, canvas);

        // Check for checkpoints
        checkpoints.forEach((checkpoint, index) => {
            if (
                player.position.x + player.width > checkpoint.position.x &&
                player.position.x < checkpoint.position.x + checkpoint.width &&
                player.position.y + player.height > checkpoint.position.y &&
                player.position.y < checkpoint.position.y + checkpoint.height
            ) {
                if (!checkpoint.claimed) {
                    checkpoint.claimed = true;
                    uiManager.showLevelComplete();

                    // Play checkpoint sound
                    if (window.audioManager) {
                        window.audioManager.playCheckpoint();
                    }

                    // Close any open dialogue before loading next level
                    if (window.inkDialogue && typeof window.inkDialogue.close === 'function') {
                        window.inkDialogue.close();
                    }

                    setTimeout(() => {
                        currentLevel++;
                        if (currentLevel > 3) {
                            currentLevel = 1;
                        }
                        initGame();
                        player.position.x = 50;
                        player.position.y = 350;
                        uiManager.hideLevelComplete();
                    }, 2000);
                }
            }
        });

        // Check for enemies with enhanced collision detection (stomp vs damage)
        enemies.forEach((enemy, index) => {
            // Initialize enemy if needed
            if (!enemy.type) {
                initEnemy(enemy, index);
            }

            const collision = checkEnemyCollision(player, enemy, playerVelocity);

            if (collision.isColliding && !player.invulnerable) {
                if (collision.isStomping) {
                    // Player stomped on enemy - defeat it and bounce
                    removeEnemy(index);
                    playerVelocity.y = PLAYER_PHYSICS.JUMP_FORCE * 0.7; // Bounce after stomp
                    if (window.audioManager) {
                        window.audioManager.playCollectable(); // Use collectable sound for defeat
                    }
                } else {
                    // Player took damage from enemy
                    if (uiManager.loseLife()) {
                        // Game over - reset player position and set game over state
                        player.position.x = 50;
                        player.position.y = 350;
                        gameOver = true;
                    } else {
                        // Just lost a life - make invulnerable and reset position
                        player.position.x = 50;
                        player.position.y = 350;
                        makePlayerInvulnerable(2000); // 2 seconds of invulnerability
                    }
                }
            }
        });

        // Check for enemy projectiles
        const projectiles = getEnemyProjectiles();
        if (checkProjectileCollision(player, projectiles) && !player.invulnerable) {
            if (uiManager.loseLife()) {
                player.position.x = 50;
                player.position.y = 350;
                gameOver = true;
            } else {
                player.position.x = 50;
                player.position.y = 350;
                makePlayerInvulnerable(2000);
            }
        }

        // Check for NPCs
        npcs.forEach((npc, index) => {
            const showLayer = npc.showLayer;

            if (
                player.position.x + player.width > showLayer.x &&
                player.position.x < showLayer.x + showLayer.width &&
                player.position.y + player.height > showLayer.y &&
                player.position.y < showLayer.y + showLayer.height
            ) {
                // Determine if this NPC should show its interaction hint based on level-level repeat config
                const counterKey = `${currentLevel}:${index}`;
                const levelEntries = gameConfig.npcMessages[currentLevel] || [];
                let levelRepeat = null;
                if (levelEntries.length > 0 && levelEntries[0] && typeof levelEntries[0] === 'object' && levelEntries[0].repeat && !levelEntries[0].path) {
                    levelRepeat = levelEntries[0].repeat;
                }

                let allowedProximity = true;
                if (levelRepeat) {
                    const seen = npcRepeatCounters.get(counterKey) || 0;
                    const type = levelRepeat.type || 'times';
                    const count = typeof levelRepeat.count === 'number' ? levelRepeat.count : 1;
                    if (type === 'once') allowedProximity = seen < 1;
                    else if (type === 'times') allowedProximity = seen < count;
                    else if (type === 'forever') allowedProximity = true;
                }

                // Only show the interaction hint when allowed by repeat rules
                if (allowedProximity) {
                    npc.showHideLayer = true;
                } else {
                    npc.showHideLayer = false;
                }
            } else {
                // When player moves away hide the hint
                // Do not mutate repeat counters here
                npc.showHideLayer = false;
            }
        });
    }

    document.addEventListener('keyup', (e) => {
        if (!gameStarted || gameOver || player.disabled) return;

        // Handle movement key releases
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            keys.rightKey.pressed = false;
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            keys.leftKey.pressed = false;
        }

        // Handle crouch key release - return to full height and adjust position
        if (e.key === 's' || e.key === 'S') {
            const heightDifference = player.originalHeight - player.height;
            player.position.y += heightDifference; // Move player down to keep base in same place
            player.height = player.originalHeight;
            console.log('Crouch released. Height restored to:', player.height, 'Position adjusted to:', player.position.y);
        }
    });

    document.addEventListener('keydown', (e) => {
        console.log('Key down event:', e.key, 'Game started:', gameStarted, 'Game over:', gameOver);

        if (!gameStarted || gameOver || player.disabled) return;

        // Handle movement keys
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            keys.rightKey.pressed = true;
            console.log('Right key pressed');
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            keys.leftKey.pressed = true;
            console.log('Left key pressed');
        }

        // Handle jumping with simple physics
        if ((e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w' || e.key === 'W')) {
            console.log('Jump key detected! Player Y:', player.position.y, 'Is jumping:', isJumping);
            // Check if player can jump using raycast-based detection
            const canJump = canPlayerJump();

            if (canJump && !isJumping) {
                playerVelocity.y = -player.jumpHeight;
                isJumping = true;
                console.log('Jump triggered! Velocity:', playerVelocity.y, 'Player Y:', player.position.y);
            } else {
                console.log('Jump not triggered. Can jump:', canJump, 'Is jumping:', isJumping);
            }
        }

        // Handle crouch - reduce height from top, keep base in same place
        if (e.key === 's' || e.key === 'S') {
            const heightDifference = player.height - player.crouchHeight;
            player.position.y -= heightDifference; // Move player up to keep base in same place
            player.height = player.crouchHeight;
            console.log('Crouching. Height set to:', player.height, 'Position adjusted to:', player.position.y);
        }

        // Check for 'I' key press to show NPC dialog
        if (e.key === 'i' || e.key === 'I') {
            // Find the first NPC with showHideLayer true
            const activeNPC = npcs.find(npc => npc.showHideLayer);
            if (activeNPC) {
                // Determine npc index for repeat tracking
                const npcIndex = npcs.findIndex(npc => npc === activeNPC);
                const counterKey = `${currentLevel}:${npcIndex}`;

                // Choose a random message entry from gameConfig.npcMessages[currentLevel]
                const levelEntries = gameConfig.npcMessages[currentLevel] || [];
                // Support array-level repeat config: first element may be { repeat: { ... } } applying to all options
                let levelRepeat = null;
                let options = levelEntries;
                if (options.length > 0 && options[0] && typeof options[0] === 'object' && options[0].repeat && !options[0].path) {
                    levelRepeat = options[0].repeat;
                    options = options.slice(1);
                }

                let chosenEntry = null;
                if (options.length === 0) {
                    chosenEntry = { path: 'assets/dialogue/Story/Chapter_01/The Basket.json' };
                } else {
                    const rand = Math.floor(Math.random() * options.length);
                    const raw = options[rand];
                    chosenEntry = (typeof raw === 'string') ? { path: raw } : raw;
                }

                // Determine which repeat configuration to use: array-level repeat takes priority, otherwise per-entry repeat
                const repeatCfg = levelRepeat || (chosenEntry ? chosenEntry.repeat : null);

                // Apply repeat rules using repeatCfg
                let allowed = true;
                if (repeatCfg) {
                    const type = repeatCfg.type || 'times';
                    const count = typeof repeatCfg.count === 'number' ? repeatCfg.count : 1;
                    const seen = npcRepeatCounters.get(counterKey) || 0;
                    if (type === 'once') {
                        allowed = seen < 1;
                    } else if (type === 'times') {
                        allowed = seen < count;
                    } else if (type === 'forever') {
                        allowed = true;
                    }
                    if (!allowed) {
                        activeNPC.showHideLayer = false;
                        return;
                    }
                    if (allowed && (type === 'times' || type === 'once')) {
                        npcRepeatCounters.set(counterKey, seen + 1);
                    }
                }

                const path = chosenEntry.path || 'assets/dialogue/Story/Chapter_01/The Basket.json';
                if (window.inkDialogue && typeof window.inkDialogue.startStoryFromPath === 'function') {
                    const allowRepeatOpt = (repeatCfg && (repeatCfg.type === 'forever' || (repeatCfg.type === 'times' && repeatCfg.count > 1))) || (chosenEntry && chosenEntry.repeat && (chosenEntry.repeat.type === 'forever' || (chosenEntry.repeat.type === 'times' && chosenEntry.repeat.count > 1)));
                    window.inkDialogue.startStoryFromPath(path, { allowRepeat: !!allowRepeatOpt });
                } else {
                    uiManager.showNPCDialog(path);
                }
                activeNPC.showHideLayer = false; // Hide the layer after showing dialog
                if (window.audioManager) {
                    window.audioManager.playNPC();
                }
            }
        }
    });

    // Initialize texture manager
    initTextureManager();

    // Initialize physics engine
    initPhysicsEngine();

    // Initialize parallax manager
    initParallaxManager();

    // Initialize UI manager
    initUIManager();

});
