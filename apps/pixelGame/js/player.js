// Player module
const player = {};

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
}

// Update player position
function updatePlayer(keys, playerVelocity, gravity, isJumping, groundLevel, canvas, gameConfig, platforms) {
    // Apply gravity
    const onSurface = canPlayerJump(player, groundLevel, platforms);
    if (!onSurface) {
        playerVelocity.y += gravity;
    } else {
        if (playerVelocity.y > 0) {
            playerVelocity.y = 0;
            isJumping = false;
        }
    }

    // Apply horizontal movement
    if (keys.rightKey.pressed) {
        playerVelocity.x = player.speed;
    } else if (keys.leftKey.pressed) {
        playerVelocity.x = -player.speed;
    } else {
        playerVelocity.x *= 0.8;
        if (Math.abs(playerVelocity.x) < 0.1) {
            playerVelocity.x = 0;
        }
    }

    // Update player position
    player.position.x += playerVelocity.x;
    player.position.y += playerVelocity.y;

    // Boundary checks
    if (player.position.x < 0) {
        player.position.x = 0;
        playerVelocity.x = 0;
    }
    if (player.position.x >= canvas.width - player.width) {
        player.position.x = canvas.width - player.width;
        playerVelocity.x = 0;
    }

    // Check for platform collisions
    const platformResult = checkPlatformCollisions(player, playerVelocity, platforms, isJumping);
    isJumping = platformResult.isJumping;

    // Prevent falling through bottom
    if (player.position.y > groundLevel) {
        player.position.y = groundLevel;
        playerVelocity.y = 0;
        isJumping = false;
    }

    // Update ground level
    groundLevel = canvas.height - player.height;

    // Reset isJumping if player is on ground and not moving upward
    if (player.position.y >= groundLevel - 1 && playerVelocity.y >= 0) {
        isJumping = false;
    }

    return isJumping;
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

// Check platform collisions
function checkPlatformCollisions(player, playerVelocity, platforms, isJumping) {
    let onPlatform = false;

    for (const platform of platforms) {
        if (playerVelocity.y >= 0 &&
            player.position.x + player.width > platform.position.x &&
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

export { player, initPlayer, updatePlayer, canPlayerJump, checkPlatformCollisions };