// Player module
const player = {};

// Physics constants (can be overridden via config)
const PLAYER_PHYSICS = {
    GRAVITY: 0.8,
    JUMP_FORCE: -15,
    MOVE_SPEED: 5,
    MAX_FALL_SPEED: 20,
    FRICTION: 0.8,
    ACCELERATION: 1.5
};

// Initialize player
function initPlayer(config) {
    player.position = { ...config.position };
    player.velocity = { ...config.velocity };
    player.width = config.width;
    player.height = config.height;
    player.speed = config.speed;
    player.jumping = config.jumping;
    player.jumpHeight = config.jumpHeight;
    player.crouchHeight = config.crouchHeight;
    player.originalHeight = config.height;

    // Visual offset settings
    player.margin = config.margin || { top: 0, bottom: 0, left: 0, right: 0 };
    player.padding = config.padding || { top: 0, bottom: 0, left: 0, right: 0 };

    // Enhanced player state
    player.grounded = false;
    player.jumpCount = 0;
    player.maxJumps = 1; // Can be increased for double jump
    player.hasDoubleJump = false;
    player.invulnerable = false;
    player.invulnerableTimer = 0;
    player.facing = 1; // 1 = right, -1 = left
    player.disabled = false;

    // Jump input tracking to prevent continuous jumping
    player.jumpPressed = false;
}

// Update player position with enhanced physics
function updatePlayer(keys, playerVelocity, gravity, isJumping, groundLevel, canvas, gameConfig, platforms, camera) {
    // Handle invulnerability timer
    if (player.invulnerable) {
        player.invulnerableTimer--;
        if (player.invulnerableTimer <= 0) {
            player.invulnerable = false;
        }
    }

    // Apply gravity with max fall speed
    const onSurface = canPlayerJump(player, groundLevel, platforms);
    if (!onSurface) {
        playerVelocity.y += gravity;
        // Cap fall speed to prevent excessive velocity
        playerVelocity.y = Math.min(playerVelocity.y, PLAYER_PHYSICS.MAX_FALL_SPEED);
    } else {
        if (playerVelocity.y > 0) {
            playerVelocity.y = 0;
            isJumping = false;
            player.jumpCount = 0; // Reset jump count when landing
        }
    }

    // Apply horizontal movement with acceleration
    if (keys.rightKey.pressed) {
        playerVelocity.x = Math.min(playerVelocity.x + PLAYER_PHYSICS.ACCELERATION, player.speed);
        player.facing = 1;
    } else if (keys.leftKey.pressed) {
        playerVelocity.x = Math.max(playerVelocity.x - PLAYER_PHYSICS.ACCELERATION, -player.speed);
        player.facing = -1;
    } else {
        // Apply friction for smooth deceleration
        playerVelocity.x *= PLAYER_PHYSICS.FRICTION;
        if (Math.abs(playerVelocity.x) < 0.1) {
            playerVelocity.x = 0;
        }
    }

    // Update player position (world coordinates)
    player.position.x += playerVelocity.x;
    player.position.y += playerVelocity.y;

    // Boundary checks in world coordinates
    if (player.position.x < 0) {
        player.position.x = 0;
        playerVelocity.x = 0;
    }

    // If camera + level width is provided, clamp player to level bounds
    if (camera && typeof camera.levelWidth === 'number') {
        const maxX = Math.max(0, camera.levelWidth - player.width);
        if (player.position.x > maxX) {
            player.position.x = maxX;
            playerVelocity.x = 0;
        }
    }

    // Check for platform collisions
    const platformResult = checkPlatformCollisions(player, playerVelocity, platforms, isJumping);
    isJumping = platformResult.isJumping;
    player.grounded = platformResult.onPlatform;

    // Prevent falling through bottom (world ground)
    if (player.position.y > groundLevel) {
        player.position.y = groundLevel;
        playerVelocity.y = 0;
        isJumping = false;
        player.jumpCount = 0;
        player.grounded = true;
    }

    // Reset isJumping if player is on ground and not moving upward
    if (player.position.y >= groundLevel - 1 && playerVelocity.y >= 0) {
        isJumping = false;
    }

    return isJumping;
}

// Handle jump input with double jump support
function handlePlayerJump(keys, playerVelocity, isJumping, groundLevel, platforms) {
    const jumpKey = keys['ArrowUp'] || keys['w'] || keys[' '];

    // Check if player can jump (grounded or has double jump available)
    const canJump = player.grounded || (player.hasDoubleJump && player.jumpCount < player.maxJumps);

    if (jumpKey && canJump && !player.jumpPressed) {
        playerVelocity.y = PLAYER_PHYSICS.JUMP_FORCE;
        player.jumpCount++;
        player.jumpPressed = true;
        player.grounded = false;
        return true;
    }

    // Reset jump pressed flag when key is released
    if (!jumpKey) {
        player.jumpPressed = false;
    }

    return isJumping;
}

// Make player invulnerable for a duration
function makePlayerInvulnerable(duration = 2000) {
    player.invulnerable = true;
    player.invulnerableTimer = duration / 16; // Convert ms to frames (assuming 60fps)
}

// Check if player can jump
function canPlayerJump(player, groundLevel, platforms) {
    if (player.position.y >= groundLevel - 5) {
        return true;
    }

    const raycastDistance = 10;
    const playerBottom = player.position.y + player.height;
    const playerCenterX = player.position.x + player.width / 2;

    for (const platform of platforms) {
        if (playerBottom <= platform.position.y &&
            playerBottom + raycastDistance >= platform.position.y) {
            if (player.position.x + player.width > platform.position.x &&
                player.position.x < platform.position.x + platform.width) {
                return true;
            }
        }
    }

    return false;
}

// Check platform collisions with enhanced detection
function checkPlatformCollisions(player, playerVelocity, platforms, isJumping) {
    let onPlatform = false;

    for (const platform of platforms) {
        // Skip collision check if moving upward (jumping through platform)
        if (playerVelocity.y < 0) continue;

        if (player.position.x + player.width > platform.position.x &&
            player.position.x < platform.position.x + platform.width &&
            player.position.y + player.height > platform.position.y &&
            player.position.y + player.height < platform.position.y + platform.height + playerVelocity.y) {

            player.position.y = platform.position.y - player.height;
            playerVelocity.y = 0;
            isJumping = false;
            onPlatform = true;
            break;
        }
    }

    return { onPlatform, isJumping };
}

// Grant double jump ability
function grantDoubleJump() {
    player.hasDoubleJump = true;
    player.maxJumps = 2;
}

// Reset player state (for respawning)
function resetPlayerState(startPosition) {
    player.position = { ...startPosition };
    player.velocity = { x: 0, y: 0 };
    player.grounded = false;
    player.jumpCount = 0;
    player.invulnerable = false;
    player.invulnerableTimer = 0;
    player.jumpPressed = false;
}

export {
    player,
    initPlayer,
    updatePlayer,
    canPlayerJump,
    checkPlatformCollisions,
    handlePlayerJump,
    makePlayerInvulnerable,
    grantDoubleJump,
    resetPlayerState,
    PLAYER_PHYSICS
};
