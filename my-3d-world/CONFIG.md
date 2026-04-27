# Configuration File (js/config.js)

This file centralizes all major settings for the 3D world application.

## Structure

### 1. Loading Screen (`config.loading`)
- `svg`: Path to the loading spinner SVG
- `text`: Loading message text
- `color`: Text color
- `background`: Background overlay (supports rgba)

### 2. Scene (`config.backgroundColor`)
- Three.js Color value for scene background

### 3. Audio (`config.musicUrl`)
- Path to background music file

### 4. World (`config.world`)
- `earth`: Path to the earth GLB model
- `earthScale`: Multiplier for earth size (default: 8)
- `planetRadius`: Base radius for physics calculations (default: 20)

### 5. Player (`config.player`)
- `scale`: Player model scale (default: 0.05)
- `startHeight`: Initial Y position above terrain (default: 100)

### 6. Physics & Movement (`config.physics`)
- `acceleration`: Movement acceleration (default: 20)
- `deceleration`: Movement deceleration when no input (default: 10)
- `maxSpeed`: Maximum movement speed (default: 6)
- `rotateSpeed`: Rotation speed when pressing left/right (default: 0.5)
- `raycastOffset`: Height above player for terrain raycast (default: 200)
- `orbitAfterSeconds`: Seconds of stillness before orbit mode (default: 2)
- `orbitSpeed`: Orbiting camera rotation speed (default: 0.2)
- `orbitRadius`: Orbit camera radius (default: 20)
- `orbitHeight`: Orbit camera height (default: 10)
- `camDistanceMoving`: Camera Z-offset when moving (default: -30)
- `camDistanceStill`: Camera Z-offset when still (default: -18)
- `camHeightMoving`: Camera Y-offset when moving (default: 15)
- `camHeightStill`: Camera Y-offset when still (default: 9)
- `camLerpSpeed`: Camera position smoothing (default: 0.02)
- `turnLerpSpeed`: Player turning smoothing (default: 0.02)

### 7. Animation (`config.animation`)
- `walkSpeedThreshold`: Speed threshold to switch to walk animation (default: 0.2)
- `walkTimeScaleMultiplier`: Walk animation speed multiplier (default: 1.5)
- `turnFadeDuration`: Crossfade duration for turn animations (default: 0.2)
- `idleFadeDuration`: Crossfade duration for idle animations (default: 0.2)

### 8. Animation Assets (`config.animations`)
- `idle`: Path to idle animation FBX
- `walking`: Path to walking animation FBX
- `leftTurn`: Path to left turn animation FBX
- `rightTurn`: Path to right turn animation FBX

### 9. Wipe Transition (`config.wipeTransition`)
- `enabled`: Enable/disable wipe effect
- `direction`: Transition direction ('left', 'right', 'up', 'down', 'center')
- `speed`: Transition speed in seconds
- `color`: Wipe color (hex)
- `duration`: Wipe duration in milliseconds
- `easing`: Easing function

### 10. Tasks Checklist (`config.tasks`)
Array of task objects with:
- `name`: Task display name
- `current`: Current progress
- `total`: Total required

### 11. Inventory (`config.inventory`)
Array of item objects with:
- `name`: Item display name
- `quantity`: Item count
