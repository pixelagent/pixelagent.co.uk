document.addEventListener('DOMContentLoaded', () => {
    const startGameButton = document.getElementById('start-game');
    const gameContainer = document.querySelector('.game-container');
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const popup = document.getElementById('portfolio-popup');
    const closeBtn = document.querySelector('.close-btn');

    // Set canvas size to full screen and scale with window
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Game state from config
    let gameStarted = gameConfig.gameStarted;
    let currentLevel = gameConfig.currentLevel;
    let score = gameConfig.score;
    let collectablesCollected = gameConfig.collectablesCollected;
    let animationId;
    let backgroundX = 0;

    // Player object from config
    const player = {
        position: { ...gameConfig.player.position },
        velocity: { ...gameConfig.player.velocity },
        width: gameConfig.player.width,
        height: gameConfig.player.height,
        speed: gameConfig.player.speed,
        jumping: gameConfig.player.jumping
    };

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

    // Load SVG level
    function loadSVGLevel(level) {
        fetch(`level${level}.svg`)
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

    // Initialize game
    function initGame() {
        loadSVGLevel(currentLevel);
        updateCollectablesCounter();
    }

    // Start game
    startGameButton.addEventListener('click', () => {
        document.querySelector('.portfolio-container').style.display = 'none';
        gameContainer.style.display = 'block';
        gameStarted = true;
        initGame();
        animate();
    });

    // Close popup
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Show popup
    function showPopup() {
        popup.style.display = 'block';
    }

    // Level complete notification
    function showLevelComplete() {
        const levelComplete = document.getElementById('level-complete');
        levelComplete.style.display = 'block';
    }

    function hideLevelComplete() {
        const levelComplete = document.getElementById('level-complete');
        levelComplete.style.display = 'none';
    }

    // Game over notification
    function showGameOver() {
        const gameOver = document.getElementById('game-over');
        gameOver.style.display = 'block';
    }

    function hideGameOver() {
        const gameOver = document.getElementById('game-over');
        gameOver.style.display = 'none';
    }

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

    // Show collectable popup
    function showCollectablePopup() {
        const popupContent = document.querySelector('.popup-content');
        popupContent.innerHTML = `
            <span class="close-btn">&times;</span>
            <h2>Collectable Found!</h2>
            <p>You found a collectable! Great job!</p>
        `;
        popup.style.display = 'block';
        
        // Reattach close button event listener
        const closeBtn = document.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
        });
    }

    // Game loop
    function animate() {
        animationId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw parallax background
        drawParallaxBackground();

        // Draw platforms
        ctx.fillStyle = '#000';
        platforms.forEach(platform => {
            ctx.fillRect(platform.position.x, platform.position.y, platform.width, platform.height);
        });

        // Draw collectables
        ctx.fillStyle = 'gold';
        collectables.forEach(collectable => {
            ctx.fillRect(collectable.position.x, collectable.position.y, collectable.width, collectable.height);
        });

        // Draw checkpoints
        ctx.fillStyle = 'green';
        checkpoints.forEach(checkpoint => {
            if (!checkpoint.claimed) {
                ctx.fillRect(checkpoint.position.x, checkpoint.position.y, checkpoint.width, checkpoint.height);
            }
        });

        // Draw enemies
        ctx.fillStyle = 'red';
        enemies.forEach(enemy => {
            ctx.fillRect(enemy.position.x, enemy.position.y, enemy.width, enemy.height);
        });

        // Draw player
        ctx.fillStyle = 'blue';
        ctx.fillRect(player.position.x, player.position.y, player.width, player.height);

        // Update player position
        updatePlayer();

        // Update enemies
        updateEnemies();

        // Check for collisions
        checkCollisions();
    }

    // Draw parallax background
    function drawParallaxBackground() {
        // Draw the background SVG
        const backgroundImg = new Image();
        backgroundImg.src = 'background.svg';
        
        // Calculate scale factor to fit vertically
        const scale = canvas.height / 400;
        const scaledWidth = 2000 * scale;
        
        // Draw two instances of the background for seamless looping
        ctx.drawImage(backgroundImg, backgroundX, 0, scaledWidth, canvas.height);
        ctx.drawImage(backgroundImg, backgroundX + scaledWidth, 0, scaledWidth, canvas.height);
        
        // Update background position based on player movement
        if (keys.rightKey.pressed && player.position.x < 400) {
            backgroundX -= gameConfig.backgroundSpeed;
        } else if (keys.leftKey.pressed && player.position.x > 100) {
            backgroundX += gameConfig.backgroundSpeed;
        }
        
        // Reset background position for seamless looping
        if (backgroundX <= -scaledWidth) {
            backgroundX = 0;
        }
    }

    // Update player position
    function updatePlayer() {
        player.position.x += player.velocity.x;
        player.position.y += player.velocity.y;

        // Apply gravity
        if (player.position.y + player.height + player.velocity.y <= canvas.height) {
            if (player.position.y < 0) {
                player.position.y = 0;
                player.velocity.y = gameConfig.gravity;
            }
            player.velocity.y += gameConfig.gravity;
        } else {
            player.velocity.y = 0;
        }

        // Boundary checks
        if (player.position.x < 0) player.position.x = 0;
        if (player.position.x >= canvas.width - player.width)
            player.position.x = canvas.width - player.width;

        // Movement logic
        if (keys.rightKey.pressed && player.position.x < 400) {
            player.velocity.x = gameConfig.player.speed;
        } else if (keys.leftKey.pressed && player.position.x > 100) {
            player.velocity.x = -gameConfig.player.speed;
        } else {
            player.velocity.x = 0;
            if (keys.rightKey.pressed) {
                platforms.forEach((platform) => (platform.position.x -= gameConfig.player.speed));
                collectables.forEach((collectable) => (collectable.position.x -= gameConfig.player.speed));
                checkpoints.forEach((checkpoint) => (checkpoint.position.x -= gameConfig.player.speed));
                enemies.forEach((enemy) => (enemy.position.x -= gameConfig.player.speed));
            } else if (keys.leftKey.pressed) {
                platforms.forEach((platform) => (platform.position.x += gameConfig.player.speed));
                collectables.forEach((collectable) => (collectable.position.x += gameConfig.player.speed));
                checkpoints.forEach((checkpoint) => (checkpoint.position.x += gameConfig.player.speed));
                enemies.forEach((enemy) => (enemy.position.x += gameConfig.player.speed));
            }
        }

        // Platform collision
        platforms.forEach((platform) => {
            if (
                player.position.x < platform.position.x + platform.width &&
                player.position.x + player.width > platform.position.x &&
                player.position.y + player.height <= platform.position.y &&
                player.position.y + player.height + player.velocity.y >= platform.position.y
            ) {
                player.velocity.y = 0;
                player.position.y = platform.position.y - player.height;
            }
        });
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
                updateCollectablesCounter();
                showCollectablePopup();
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
                        showLevelComplete();
                        setTimeout(() => {
                            currentLevel++;
                            if (currentLevel > 3) {
                                currentLevel = 1;
                            }
                            initGame();
                            player.position.x = 50;
                            player.position.y = 350;
                            hideLevelComplete();
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
                showGameOver();
            }
        });
    }

    // Keyboard controls
    const movePlayer = (key, xVelocity, isPressed) => {
        switch (key) {
            case 'ArrowLeft':
            case 'a':
            case 'A':
                keys.leftKey.pressed = isPressed;
                player.velocity.x = isPressed ? -xVelocity : 0;
                break;
            case 'ArrowUp':
            case ' ':
            case 'w':
            case 'W':
                player.velocity.y -= gameConfig.player.jumpHeight;
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                keys.rightKey.pressed = isPressed;
                player.velocity.x = isPressed ? xVelocity : 0;
                break;
            case 's':
            case 'S':
                // Crouch functionality
                player.height = gameConfig.player.crouchHeight;
                break;
        }
    };

    document.addEventListener('keyup', (e) => {
        if (!gameStarted) return;
        movePlayer(e.key, 0, false);
        
        if (e.key === 's' || e.key === 'S') {
            player.height = 30;
        }
    });

    document.addEventListener('keydown', (e) => {
        if (!gameStarted) return;
        movePlayer(e.key, gameConfig.player.speed, true);
    });

    // Remove the about me popup
    document.getElementById('portfolio-popup').style.display = 'none';
    
    // Restart game button
    document.getElementById('restart-game').addEventListener('click', () => {
        hideGameOver();
        currentLevel = 1;
        collectablesCollected = 0;
        initGame();
        player.position.x = 50;
        player.position.y = 350;
    });
});