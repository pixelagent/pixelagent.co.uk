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
        width: 30,
        height: 30,
        speed: 5,
        jumping: false,
        jumpHeight: 6, // Jump height power variable
        crouchHeight: 20
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
        enemies: []
    }
};