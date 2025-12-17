// Game Configuration
const gameConfig = {
    // Game state variables
    gameStarted: false,
    currentLevel: 1,
    score: 0,
    collectablesCollected: 0,
    
    // Player configuration
    player: {
        position: { x: 50, y: 350 },
        velocity: { x: 0, y: 0 },
        width: 45,
        height: 60,
        speed: 5,
        jumping: false,
        jumpHeight: 9, // Jump height power variable
        crouchHeight: 40
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
    
    // NPC messages configuration
    npcMessages: {
        1: [
            "Hello there! Welcome to level 1. Collect all the gold coins to proceed!",
            "Watch out for enemies! They'll reduce your lives.",
            "Use arrow keys to move and space to jump!"
        ],
        2: [
            "Level 2 is more challenging! Be careful with the platforms.",
            "Remember, you can crouch with the S key!",
            "The checkpoint is at the end - reach it to complete the level!"
        ],
        3: [
            "Final level! This one has more complex platforms.",
            "You're doing great! Almost there!",
            "Collect all coins to get the best score!"
        ]
    }
};