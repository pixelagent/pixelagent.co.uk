class ParallaxManager {
    constructor(ctx, canvas, gameConfig) {
        this.ctx = ctx;
        this.canvas = canvas;
        this.gameConfig = gameConfig;
        this.backgroundX = 0;
        this.backgroundImg = null;
        this.lastPlayerX = 0;
        
        // Load background image
        this.loadBackgroundImage();
    }
    
    loadBackgroundImage() {
        this.backgroundImg = new Image();
        this.backgroundImg.src = 'assets/backgrounds/background.svg';
    }
    
    update(player, keys) {
        // Calculate scale factor to fit vertically
        const scale = this.canvas.height / 400;
        const scaledWidth = 2000 * scale;
        
        // Update background position based on player movement
        // The key fix: continue parallax even when the level starts moving
        // by tracking the player's movement relative to the camera
        
        const playerMovement = player.position.x - this.lastPlayerX;
        this.lastPlayerX = player.position.x;
        
        // Always update parallax based on player movement, regardless of position
        if (keys.rightKey.pressed) {
            this.backgroundX -= this.gameConfig.backgroundSpeed;
        } else if (keys.leftKey.pressed) {
            this.backgroundX += this.gameConfig.backgroundSpeed;
        }
        
        // Reset background position for seamless looping
        if (this.backgroundX <= -scaledWidth) {
            this.backgroundX = 0;
        } else if (this.backgroundX > 0) {
            this.backgroundX = -scaledWidth + (this.backgroundX % scaledWidth);
        }
    }
    
    draw() {
        if (!this.backgroundImg || !this.backgroundImg.complete) {
            return;
        }
        
        // Calculate scale factor to fit vertically
        const scale = this.canvas.height / 400;
        const scaledWidth = 2000 * scale;
        
        // Draw two instances of the background for seamless looping
        this.ctx.drawImage(this.backgroundImg, this.backgroundX, 0, scaledWidth, this.canvas.height);
        this.ctx.drawImage(this.backgroundImg, this.backgroundX + scaledWidth, 0, scaledWidth, this.canvas.height);
    }
    
    reset() {
        this.backgroundX = 0;
        this.lastPlayerX = 0;
    }
}