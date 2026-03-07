// Enemy module

// Enemy types configuration
const ENEMY_TYPES = {
    walker: {
        color: '#ff5252',
        speed: 1,
        patrolRange: 100,
        jumpForce: 0
    },
    flyer: {
        color: '#ff9800',
        speed: 1.5,
        patrolRange: 80,
        jumpForce: 0
    },
    jumper: {
        color: '#9c27b0',
        speed: 1.2,
        patrolRange: 60,
        jumpForce: -12,
        jumpInterval: 60
    },
    shooter: {
        color: '#f44336',
        speed: 0.5,
        patrolRange: 40,
        shootInterval: 90
    }
};

// Enemy state management
const enemyStates = new Map();

// Initialize enemy with enhanced properties
function initEnemy(enemy, index) {
    const type = enemy.type || 'walker';
    const config = ENEMY_TYPES[type] || ENEMY_TYPES.walker;

    // Set default properties
    enemy.type = type;
    enemy.speed = enemy.speed || config.speed;
    enemy.patrolRange = enemy.patrolRange || config.patrolRange;
    enemy.direction = enemy.direction || 1;
    enemy.color = enemy.color || config.color;

    // Initialize state for this enemy
    enemyStates.set(index, {
        startX: enemy.position.x,
        startY: enemy.position.y,
        vx: enemy.speed * enemy.direction,
        vy: 0,
        time: 0,
        lastJumpTime: 0,
        lastShootTime: 0,
        projectiles: []
    });

    return enemy;
}

// Update enemies with enhanced AI behaviors
function updateEnemies(enemies, config, canvas, camera = { x: 0, y: 0 }) {
    enemies.forEach((enemy, index) => {
        // Initialize enemy if not already done
        if (!enemyStates.has(index)) {
            enemy = initEnemy(enemy, index);
        }

        const state = enemyStates.get(index);
        state.time++;

        // Get world bounds for patrol behavior
        const worldLeft = camera.x;
        const worldRight = camera.x + canvas.width;

        // Update based on enemy type
        switch (enemy.type) {
            case 'walker':
                updateWalker(enemy, state, worldLeft, worldRight);
                break;
            case 'flyer':
                updateFlyer(enemy, state);
                break;
            case 'jumper':
                updateJumper(enemy, state, config.gravity || 0.5);
                break;
            case 'shooter':
                updateShooter(enemy, state);
                break;
            default:
                updateWalker(enemy, state, worldLeft, worldRight);
        }

        // Update projectile positions for shooters
        if (enemy.type === 'shooter' && state.projectiles) {
            updateProjectiles(state, canvas, camera);
        }

        // Store updated state
        enemyStates.set(index, state);
    });
}

// Walker enemy - patrols back and forth on ground
function updateWalker(enemy, state, worldLeft, worldRight) {
    // Move horizontally
    enemy.position.x += enemy.speed * state.vx;

    // Check patrol bounds
    const distanceFromStart = enemy.position.x - state.startX;
    if (Math.abs(distanceFromStart) > enemy.patrolRange) {
        state.vx *= -1;
        enemy.direction = state.vx > 0 ? 1 : -1;
    }

    // Keep within world bounds
    if (enemy.position.x <= worldLeft || enemy.position.x + enemy.width >= worldRight) {
        state.vx *= -1;
        enemy.direction = state.vx > 0 ? 1 : -1;
    }
}

// Flyer enemy - moves in sine wave pattern
function updateFlyer(enemy, state) {
    // Horizontal movement with sine wave
    const horizontalOffset = Math.sin(state.time * 0.02) * enemy.patrolRange;
    enemy.position.x = state.startX + horizontalOffset;

    // Vertical bobbing motion
    const verticalOffset = Math.cos(state.time * 0.03) * 30;
    enemy.position.y = state.startY + verticalOffset;
}

// Jumper enemy - hops around
function updateJumper(enemy, state, gravity) {
    // Horizontal movement
    enemy.position.x += enemy.speed * state.vx;

    // Check patrol bounds
    const distanceFromStart = enemy.position.x - state.startX;
    if (Math.abs(distanceFromStart) > enemy.patrolRange) {
        state.vx *= -1;
        enemy.direction = state.vx > 0 ? 1 : -1;
    }

    // Periodic jumping
    const jumpInterval = ENEMY_TYPES.jumper.jumpInterval;
    if (state.time - state.lastJumpTime >= jumpInterval) {
        state.vy = ENEMY_TYPES.jumper.jumpForce;
        state.lastJumpTime = state.time;
    }

    // Apply gravity
    state.vy += gravity * 0.5;
    enemy.position.y += state.vy;

    // Ground constraint
    if (enemy.position.y > state.startY) {
        enemy.position.y = state.startY;
        state.vy = 0;
    }
}

// Shooter enemy - stationary with projectile attacks
function updateShooter(enemy, state) {
    // Slight horizontal oscillation
    const horizontalOffset = Math.sin(state.time * 0.01) * 20;
    enemy.position.x = state.startX + horizontalOffset;

    // Create projectiles periodically
    const shootInterval = ENEMY_TYPES.shooter.shootInterval;
    if (state.time - state.lastShootTime >= shootInterval) {
        // Create a new projectile
        state.projectiles.push({
            x: enemy.position.x + enemy.width / 2,
            y: enemy.position.y + enemy.height / 2,
            vx: enemy.direction * 5,
            vy: 0,
            life: 100
        });
        state.lastShootTime = state.time;
    }
}

// Update projectile positions
function updateProjectiles(state, canvas, camera) {
    state.projectiles = state.projectiles.filter(proj => {
        proj.x += proj.vx;
        proj.y += proj.vy;
        proj.life--;

        // Remove if off screen or expired
        return proj.life > 0 &&
            proj.x > camera.x - 50 &&
            proj.x < camera.x + canvas.width + 50;
    });
}

// Get projectiles for rendering
function getEnemyProjectiles() {
    const allProjectiles = [];
    enemyStates.forEach((state, index) => {
        if (state.projectiles) {
            state.projectiles.forEach(proj => {
                allProjectiles.push({ ...proj, enemyIndex: index });
            });
        }
    });
    return allProjectiles;
}

// Check collision between player and enemy (with stomp detection)
function checkEnemyCollision(player, enemy, playerVelocity) {
    const playerBottom = player.position.y + player.height;
    const playerCenterX = player.position.x + player.width / 2;
    const enemyCenterX = enemy.position.x + enemy.width / 2;
    const enemyTop = enemy.position.y;

    // Check if player is above enemy and falling
    const isStomping = playerVelocity.y > 0 &&
        playerBottom < enemyTop + enemy.height * 0.5 &&
        Math.abs(playerCenterX - enemyCenterX) < enemy.width * 0.7;

    // Check general collision
    const isColliding = player.position.x + player.width > enemy.position.x &&
        player.position.x < enemy.position.x + enemy.width &&
        player.position.y + player.height > enemy.position.y &&
        player.position.y < enemy.position.y + enemy.height;

    return {
        isColliding,
        isStomping: isStomping && isColliding
    };
}

// Check collision between player and projectiles
function checkProjectileCollision(player, projectiles) {
    for (const proj of projectiles) {
        const dist = Math.sqrt(
            Math.pow(player.position.x + player.width / 2 - proj.x, 2) +
            Math.pow(player.position.y + player.height / 2 - proj.y, 2)
        );
        if (dist < player.width / 2 + 5) { // 5 is projectile radius
            return true;
        }
    }
    return false;
}

// Reset enemy states (for level transitions)
function resetEnemyStates() {
    enemyStates.clear();
}

// Remove enemy (when defeated)
function removeEnemy(index) {
    enemyStates.delete(index);
}

export {
    updateEnemies,
    initEnemy,
    checkEnemyCollision,
    checkProjectileCollision,
    getEnemyProjectiles,
    resetEnemyStates,
    removeEnemy,
    ENEMY_TYPES
};
