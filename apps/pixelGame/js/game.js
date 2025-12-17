document.addEventListener('DOMContentLoaded', () => {
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
    
    // Simple physics variables
    let playerVelocity = { x: 0, y: 0 };
    let gravity = 0.5;
    let isJumping = false;
    let groundLevel;

    // Player object from config
    const player = {
        position: { ...gameConfig.player.position },
        velocity: { ...gameConfig.player.velocity },
        width: gameConfig.player.width,
        height: gameConfig.player.height,
        speed: gameConfig.player.speed,
        jumping: gameConfig.player.jumping
    };
    
    // Initialize ground level after player is defined
    groundLevel = canvas.height - player.height;
    console.log('Initial ground level set to:', groundLevel, 'Canvas height:', canvas.height, 'Player height:', player.height);

    // Keys state
    const keys = {
        rightKey: { pressed: false },
        leftKey: { pressed: false }
    };

    // Game elements from config
    let collectables = [...gameConfig.elements.collectables];
    let platforms = [...gameConfig.elements.platforms];
    let checkpoints = [...gameConfig.elements.checkpoints];
    let enemies = [...gameConfig.elements.enemies];
    let backgrounds = [...gameConfig.elements.backgrounds || []];
    let scenes = [...gameConfig.elements.scenes || []];
    let boxes = [...gameConfig.elements.boxes || []];
    let npcs = [...gameConfig.elements.npcs || []];
    
    // Box physics - add velocity to each box
    let boxVelocities = [];

    // Texture manager
    let textureManager;
    
    // Player SVG image
    let playerSvg = new Image();
    let playerSvgLoaded = false;
    playerSvg.onload = function() {
        playerSvgLoaded = true;
        console.log('Player SVG loaded successfully');
    };
    
    playerSvg.onerror = function() {
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
                const [, , svgWidth, svgHeight] = viewBox.split(' ').map(Number);
                
                // Calculate scale factor to fit vertically
                const scale = canvas.height / svgHeight;
                const scaledWidth = svgWidth * scale;
                
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
                
                // Parse enemies
                enemies = [];
                const enemyElements = svgDoc.querySelectorAll('#enemies rect');
                enemyElements.forEach(element => {
                    enemies.push({
                        position: {
                            x: parseFloat(element.getAttribute('x')) * scale,
                            y: parseFloat(element.getAttribute('y')) * scale
                        },
                        width: parseFloat(element.getAttribute('width')) * scale,
                        height: parseFloat(element.getAttribute('height')) * scale,
                        speed: gameConfig.enemy.speed,
                        direction: 1
                    });
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
        groundLevel = canvas.height - player.height;
        
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


    // Get NPC message based on level and NPC index
    function getNPCMessage(level, npcIndex) {
        return gameConfig.npcMessages[level]?.[npcIndex] || "Hello! Keep going to find more collectables!";
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

    // Update enemies
    function updateEnemies() {
        enemies.forEach(enemy => {
            enemy.position.x += gameConfig.enemy.speed * enemy.direction;
            
            // Simple boundary check for patrol behavior
            if (enemy.position.x <= 0 || enemy.position.x + enemy.width >= canvas.width) {
                enemy.direction *= -1;
            }
        });
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
                if (Math.abs(playerCenterX - boxCenterX) > Math.abs((player.position.y + player.height/2) - (box.position.y + box.height/2))) {
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


    // Game loop
    function animate() {
        animationId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        
        // Update and draw parallax background
        parallaxManager.update(player, keys);
        parallaxManager.draw();

        // Draw background elements with textures and Rough.js outlines
        backgrounds.forEach(background => {
            // Fill with texture first
            if (textureManager && textureManager.getPattern('background')) {
                ctx.fillStyle = textureManager.getPattern('background');
            } else {
                ctx.fillStyle = textureManager ? textureManager.getFallbackColor('background') : '#f0f0f0';
            }
            ctx.fillRect(background.position.x, background.position.y, background.width, background.height);
            
            // Add Rough.js sketch outline
            roughCanvas.rectangle(background.position.x, background.position.y, background.width, background.height, {
                fill: 'transparent',
                stroke: 'rgba(0, 0, 0, 0.2)',
                strokeWidth: 2,
                roughness: 0.5,
                fillStyle: 'solid',
                seed: 100
            });
        });
        
        // Draw scenes with textures and Rough.js outlines
        scenes.forEach(scene => {
            // Fill with texture first
            if (textureManager && textureManager.getPattern('scene')) {
                ctx.fillStyle = textureManager.getPattern('scene');
            } else {
                ctx.fillStyle = 'rgba(100, 200, 100, 0.7)';
            }
            ctx.fillRect(scene.position.x, scene.position.y, scene.width, scene.height);
            
            // Add Rough.js sketch outline
            roughCanvas.rectangle(scene.position.x, scene.position.y, scene.width, scene.height, {
                fill: 'transparent',
                stroke: 'rgba(0, 0, 0, 0.2)',
                strokeWidth: 2,
                roughness: 1.2,
                fillStyle: 'solid',
                seed: 101
            });
        });

        // Draw boxes with textures and Rough.js outlines
        boxes.forEach(box => {
            // Fill with texture first
            if (textureManager && textureManager.getPattern('box')) {
                ctx.fillStyle = textureManager.getPattern('box');
            } else {
                ctx.fillStyle = textureManager ? textureManager.getFallbackColor('box') : '#8B4513';
            }
            ctx.fillRect(box.position.x, box.position.y, box.width, box.height);
            
            // Add Rough.js sketch outline
            roughCanvas.rectangle(box.position.x, box.position.y, box.width, box.height, {
                fill: 'transparent',
                stroke: 'rgba(0, 0, 0, 0.3)',
                strokeWidth: 2,
                roughness: 1.5,
                fillStyle: 'solid',
                seed: 109
            });
        });

        // Draw platforms with textures and Rough.js outlines
        platforms.forEach(platform => {
            // Fill with texture first
            if (textureManager && textureManager.getPattern('platform')) {
                ctx.fillStyle = textureManager.getPattern('platform');
            } else {
                ctx.fillStyle = textureManager ? textureManager.getFallbackColor('platform') : '#000';
            }
            ctx.fillRect(platform.position.x, platform.position.y, platform.width, platform.height);
            
            // Add Rough.js sketch outline
            roughCanvas.rectangle(platform.position.x, platform.position.y, platform.width, platform.height, {
                fill: 'transparent',
                stroke: 'rgba(0, 0, 0, 0.3)',
                strokeWidth: 3,
                roughness: 2.0,
                fillStyle: 'solid',
                seed: 102
            });
        });

        // Draw collectables with Rough.js outlines only
        collectables.forEach(collectable => {
            // Fill with gold first
            ctx.fillStyle = 'gold';
            ctx.fillRect(collectable.position.x, collectable.position.y, collectable.width, collectable.height);
            
            // Add Rough.js sketch outline
            roughCanvas.circle(collectable.position.x + collectable.width/2, collectable.position.y + collectable.height/2, collectable.width, {
                fill: 'transparent',
                stroke: '#FFD700',
                strokeWidth: 2,
                roughness: 1.5,
                fillStyle: 'solid',
                seed: 103
            });
        });

        // Draw checkpoints with textures and Rough.js outlines
        checkpoints.forEach(checkpoint => {
            if (!checkpoint.claimed) {
                // Fill with texture first
                if (textureManager && textureManager.getPattern('checkpoint')) {
                    ctx.fillStyle = textureManager.getPattern('checkpoint');
                } else {
                    ctx.fillStyle = textureManager ? textureManager.getFallbackColor('checkpoint') : 'green';
                }
                ctx.fillRect(checkpoint.position.x, checkpoint.position.y, checkpoint.width, checkpoint.height);
                
                // Add Rough.js sketch outline
                roughCanvas.rectangle(checkpoint.position.x, checkpoint.position.y, checkpoint.width, checkpoint.height, {
                    fill: 'transparent',
                    stroke: '#228B22',
                    strokeWidth: 3,
                    roughness: 1.8,
                    fillStyle: 'solid',
                    seed: 104
                });
            }
        });

        // Draw enemies with Rough.js outlines only
        enemies.forEach(enemy => {
            // Fill with red first
            ctx.fillStyle = 'red';
            ctx.fillRect(enemy.position.x, enemy.position.y, enemy.width, enemy.height);
            
            // Add Rough.js sketch outline
            roughCanvas.rectangle(enemy.position.x, enemy.position.y, enemy.width, enemy.height, {
                fill: 'transparent',
                stroke: '#8B0000',
                strokeWidth: 2,
                roughness: 2.5,
                fillStyle: 'solid',
                seed: 105
            });
        });
        
        // Draw NPCs with color fills and Rough.js outlines
        npcs.forEach(npc => {
            // Draw show layer (always visible) - fill with color first
            ctx.fillStyle = 'rgba(200, 100, 200, 0.8)';
            ctx.fillRect(npc.showLayer.x, npc.showLayer.y, npc.showLayer.width, npc.showLayer.height);
            
            // Add Rough.js sketch outline
            roughCanvas.rectangle(npc.showLayer.x, npc.showLayer.y, npc.showLayer.width, npc.showLayer.height, {
                fill: 'transparent',
                stroke: 'white',
                strokeWidth: 2,
                roughness: 1.0,
                fillStyle: 'solid',
                seed: 106
            });
            
            // Draw hide layer if it should be shown
            if (npc.showHideLayer && npc.hideLayer) {
                ctx.fillStyle = 'rgba(100, 200, 100, 0.8)';
                ctx.fillRect(npc.hideLayer.x, npc.hideLayer.y, npc.hideLayer.width, npc.hideLayer.height);
                
                // Add Rough.js sketch outline
                roughCanvas.rectangle(npc.hideLayer.x, npc.hideLayer.y, npc.hideLayer.width, npc.hideLayer.height, {
                    fill: 'transparent',
                    stroke: '#228B22',
                    strokeWidth: 1,
                    roughness: 1.5,
                    fillStyle: 'solid',
                    seed: 107
                });
                
                // Draw the "I" text
                if (npc.hideLayer.text) {
                    ctx.fillStyle = 'black';
                    ctx.font = 'bold 16px Arial';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(npc.hideLayer.text,
                                npc.hideLayer.x + npc.hideLayer.width / 2,
                                npc.hideLayer.y + npc.hideLayer.height / 2);
                }
            }
        });
        
        // Draw player using SVG with no container borders
        if (playerSvgLoaded) {
            // Draw the SVG directly to canvas
            ctx.drawImage(playerSvg, player.position.x, player.position.y, player.width, player.height);
            
            // Add Rough.js sketch outline around the player
            roughCanvas.rectangle(player.position.x, player.position.y, player.width, player.height, {
                fill: 'transparent',
                stroke: '#00008B',
                strokeWidth: 2,
                roughness: 1.2,
                fillStyle: 'solid',
                seed: 108
            });
        } else {
            // Fallback to blue rectangle if SVG not loaded yet
            ctx.fillStyle = 'blue';
            ctx.fillRect(player.position.x, player.position.y, player.width, player.height);
            
            // Add Rough.js sketch outline
            roughCanvas.rectangle(player.position.x, player.position.y, player.width, player.height, {
                fill: 'transparent',
                stroke: '#00008B',
                strokeWidth: 2,
                roughness: 1.2,
                fillStyle: 'solid',
                seed: 108
            });
        }

        // Update player position
        updatePlayer();

        // Update enemies
        updateEnemies();

        // Update box physics
        updateBoxes();

        // Check for box-player collisions
        checkBoxCollisions();

        // Check for collisions
        checkCollisions();
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
    
    // Check if player is on any platform
    function checkPlatformCollisions() {
        let onPlatform = false;
        
        // Check collision with platforms
        for (const platform of platforms) {
            // Check if player is falling onto platform
            if (playerVelocity.y >= 0 &&
                player.position.x + player.width > platform.position.x &&
                player.position.x < platform.position.x + platform.width &&
                player.position.y + player.height > platform.position.y &&
                player.position.y + player.height < platform.position.y + platform.height + playerVelocity.y) {
                 
                // Land on platform
                player.position.y = platform.position.y - player.height;
                playerVelocity.y = 0;
                isJumping = false;
                onPlatform = true;
                console.log('Landed on platform');
                break;
            }
        }
        
        return onPlatform;
    }
    
    // Update player position using simple physics
    function updatePlayer() {
        console.log('UpdatePlayer - Current velocity:', playerVelocity.y, 'Is jumping:', isJumping);
        
        // Apply gravity - ALWAYS apply gravity when not on surface, regardless of jumping state
        const onSurface = canPlayerJump(); // Use the new raycast-based function
        if (!onSurface) {
            playerVelocity.y += gravity;
            console.log('Applying gravity. New velocity:', playerVelocity.y);
        } else {
            // Player is on a surface
            if (playerVelocity.y > 0) { // Only reset velocity if falling (not when jumping)
                playerVelocity.y = 0;
                isJumping = false;
                console.log('On surface, resetting velocity to 0');
            }
        }
          
        // Apply horizontal movement
        if (keys.rightKey.pressed) {
            playerVelocity.x = gameConfig.player.speed;
        } else if (keys.leftKey.pressed) {
            playerVelocity.x = -gameConfig.player.speed;
        } else {
            // Apply friction when no keys are pressed
            playerVelocity.x *= 0.8;
            if (Math.abs(playerVelocity.x) < 0.1) {
                playerVelocity.x = 0;
            }
        }
          
        // Update player position
        player.position.x += playerVelocity.x;
        player.position.y += playerVelocity.y;
        console.log('New position:', player.position.y);
          
        // Boundary checks
        if (player.position.x < 0) {
            player.position.x = 0;
            playerVelocity.x = 0;
        }
        if (player.position.x >= canvas.width - player.width) {
            player.position.x = canvas.width - player.width;
            playerVelocity.x = 0;
        }
          
        // Prevent falling through bottom
        if (player.position.y > groundLevel) {
            player.position.y = groundLevel;
            playerVelocity.y = 0;
            isJumping = false;
        }
          
        // Update ground level if player height changed (e.g., due to crouching)
        groundLevel = canvas.height - player.height;
    }

    // Check for collisions
    function checkCollisions() {
        // Check for collectables
        collectables.forEach((collectable, index) => {
            if (
                player.position.x + player.width > collectable.position.x &&
                player.position.x < collectable.position.x + collectable.width &&
                player.position.y + player.height > collectable.position.y &&
                player.position.y < collectable.position.y + collectable.height
            ) {
                collectables.splice(index, 1);
                collectablesCollected++;
                uiManager.setCollectablesCollected(collectablesCollected);
                uiManager.showCollectablePopup();
                
                // Play collectable sound
                if (window.audioManager) {
                    window.audioManager.playCollectable();
                }
            }
        });

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
        
        // Check for enemies
        enemies.forEach((enemy, index) => {
            if (
                player.position.x + player.width > enemy.position.x &&
                player.position.x < enemy.position.x + enemy.width &&
                player.position.y + player.height > enemy.position.y &&
                player.position.y < enemy.position.y + enemy.height
            ) {
                if (uiManager.loseLife()) {
                   // Game over - reset player position and set game over state
                   player.position.x = 50;
                   player.position.y = 350;
                   gameOver = true;
               } else {
                   // Just lost a life - reset player position
                   player.position.x = 50;
                   player.position.y = 350;
               }
            }
        });
        
        // Check for NPCs
        npcs.forEach((npc, index) => {
            const showLayer = npc.showLayer;
            
            if (
                player.position.x + player.width > showLayer.x &&
                player.position.x < showLayer.x + showLayer.width &&
                player.position.y + player.height > showLayer.y &&
                player.position.y < showLayer.y + showLayer.height
            ) {
                if (!npc.interacted) {
                    npc.showHideLayer = true;
                    npc.interacted = true;
                }
            }
        });
    }

    document.addEventListener('keyup', (e) => {
        if (!gameStarted || gameOver) return;
        
        // Handle movement key releases
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
            keys.rightKey.pressed = false;
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
            keys.leftKey.pressed = false;
        }
        
        // Handle crouch key release - return to full height and adjust position
        if (e.key === 's' || e.key === 'S') {
            const heightDifference = gameConfig.player.height - gameConfig.player.crouchHeight;
            player.position.y += heightDifference; // Move player down to keep base in same place
            player.height = gameConfig.player.height;
            console.log('Crouch released. Height restored to:', player.height, 'Position adjusted to:', player.position.y);
        }
    });

    document.addEventListener('keydown', (e) => {
        console.log('Key down event:', e.key, 'Game started:', gameStarted, 'Game over:', gameOver);
        
        if (!gameStarted || gameOver) return;
        
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
                playerVelocity.y = -gameConfig.player.jumpHeight;
                isJumping = true;
                console.log('Jump triggered! Velocity:', playerVelocity.y, 'Player Y:', player.position.y);
            } else {
                console.log('Jump not triggered. Can jump:', canJump, 'Is jumping:', isJumping);
            }
        }
        
        // Handle crouch - reduce height from top, keep base in same place
        if (e.key === 's' || e.key === 'S') {
            const heightDifference = gameConfig.player.height - gameConfig.player.crouchHeight;
            player.position.y -= heightDifference; // Move player up to keep base in same place
            player.height = gameConfig.player.crouchHeight;
            console.log('Crouching. Height set to:', player.height, 'Position adjusted to:', player.position.y);
        }
        
        // Check for 'I' key press to show NPC dialog
        if (e.key === 'i' || e.key === 'I') {
            // Find the first NPC with showHideLayer true
            const activeNPC = npcs.find(npc => npc.showHideLayer);
            if (activeNPC) {
                uiManager.showNPCDialog(activeNPC.message);
                activeNPC.showHideLayer = false; // Hide the layer after showing dialog
                
                // Play NPC interaction sound
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