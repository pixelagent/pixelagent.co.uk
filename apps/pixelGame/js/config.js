// Game Configuration
// Use window.gameConfig to ensure global accessibility from ES modules
window.gameConfig = {
    // Game state variables
    gameStarted: false,
    currentLevel: 1,
    score: 0,
    collectablesCollected: 0,

    // Player configuration
    player: {
        position: { x: 50, y: 350 },
        velocity: { x: 0, y: 0 },
        width: 40,
        height: 58,
        speed: 7,
        jumping: false,
        jumpHeight: 9, // Jump height power variable
        crouchHeight: 45,
        // Visual offset for drawing the player sprite within the collision box
        margin: {
            top: 0,      // Pixels to offset sprite from top of hitbox
            bottom: -10,   // Pixels to offset sprite from bottom of hitbox
            left: 0,     // Pixels to offset sprite from left of hitbox
            right: 0     // Pixels to offset sprite from right of hitbox
        },
        padding: {
            top: 0,      // Extra space inside hitbox at top
            bottom: 0,   // Extra space inside hitbox at bottom
            left: 0,     // Extra space inside hitbox at left
            right: 0     // Extra space inside hitbox at right
        }
    },

    // Game mechanics
    backgroundSpeed: 0.5,
    gravity: 0.5,

    // Enemy configuration
    enemy: {
        speed: 2,
        patrolRange: 100
    },

    // Game elements
    elements: {
        platforms: [],
        collectables: [],
        checkpoints: [],
        enemies: [],
        scenes: [],
        boxes: []
    },

    // Z-index (draw order) for game objects - lower numbers drawn first (background)
    // Higher numbers drawn on top
    zIndex: {
        backgrounds: 0,
        scenes: 10,
        boxes: 120,
        platforms: 30,
        collectables: 40,
        checkpoints: 50,
        enemies: 60,
        enemyProjectiles: 65,
        npcs: 70,
        player: 100
    },

    // Texture configuration
    textures: {
        platform: 'diagonal-stripes',
        checkpoint: 'radiant-gradient',
        scene: 'repeating-chevrons',
        box: 'stacked-steps-haikei'
    },

    // Fallback colors for when textures fail to load
    fallbackColors: {
        'platform': '#000',
        'checkpoint': 'green',
        'scene': '#121ca0ff',
        'box': '#8B4513',
        'collectable': 'gold',
        'enemy': 'red',
        'player': 'blue'
    },

    // NPC messages configuration - reference ink JSON and playback options
    // Each entry is an array for the level. You may optionally place a first element with only a `repeat` field
    // to apply the repeat rule to all following options in that array. Example:
    // 1: [ { repeat: { type: 'times', count: 4 } }, { path: 'storyA.json' }, { path: 'storyB.json' } ]
    npcMessages: {
        1: [
            { repeat: { type: 'times', count: 4 } },
            { path: 'assets/dialogue/Story/Chapter_01/The Basket.json' },
            { path: 'assets/dialogue/Story/Chapter_01/The River\'s Gift.json' },
            { path: 'assets/dialogue/Story/Chapter_01/The Basket.json' }
        ],
        2: [
            { repeat: { type: 'times', count: 4 } },
            { path: 'assets/dialogue/Story/Chapter_01/The Basket.json' },
            { path: 'assets/dialogue/Story/Chapter_01/The River\'s Gift.json' },
            { path: 'assets/dialogue/Story/Chapter_01/The Basket.json' }
        ],
        3: [
            { repeat: { type: 'times', count: 4 } },
            { path: 'assets/dialogue/Story/Chapter_03/Flight into the Desert.json' },
            { path: 'assets/dialogue/Story/Chapter_02/The Hidden Name.json' },
            { path: 'assets/dialogue/Story/Chapter_01/The Basket.json' }
        ]
    }
};