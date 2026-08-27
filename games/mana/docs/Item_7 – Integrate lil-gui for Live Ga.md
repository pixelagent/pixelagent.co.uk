# Item 7 – Integrate lil-gui for Live Game Tuning (★★★★★)

## Overview

As Manna Collector continues to grow, changing gameplay values currently requires editing the source code, saving the file, and refreshing the browser.

**lil-gui** provides a lightweight developer panel that allows you to adjust variables while the game is running. It is widely used in Three.js projects for balancing gameplay and experimenting with graphics settings.

Like Stats.js, lil-gui is a **development tool** and should not be visible in the final release.

---

# Why Use lil-gui?

Instead of changing values like this:

```javascript
this.timeLeft = 60;

this.marketSellPrice = 4;

this.health = 100;
```

You can adjust them live using sliders and buttons.

Changes happen instantly without restarting the game.

---

# Benefits

lil-gui is ideal for tuning:

- Game balance
- Graphics
- Lighting
- Terrain
- Camera
- Weather
- Spawn rates
- Movement speed
- Difficulty
- Debug tools

---

# Step 1 – Install

Using npm:

```bash
npm install lil-gui
```

Or include the CDN version before your game script.

---

# Step 2 – Create the GUI

After the game initializes:

```javascript
const gui = new lil.GUI();
```

Store it inside the game object.

```javascript
gui: null,
```

During initialization:

```javascript
this.gui = new lil.GUI();
```

---

# Step 3 – Add Gameplay Controls

Example:

```javascript
this.gui.add(
    this,
    "timeLeft",
    10,
    120,
    1
);
```

Now the day length can be adjusted while playing.

---

# Step 4 – Health Controls

```javascript
this.gui.add(
    this,
    "health",
    0,
    100
);
```

Useful for testing:

- Damage
- Healing
- Game over
- Difficulty

---

# Step 5 – Money Controls

```javascript
this.gui.add(
    this,
    "money",
    0,
    1000
);
```

No need to play several days just to test the market.

---

# Step 6 – Market Controls

Live tuning of:

```javascript
marketSellPrice

dailyDemand
```

Example:

```javascript
this.gui.add(
    this,
    "marketSellPrice",
    1,
    10,
    1
);
```

and

```javascript
this.gui.add(
    this,
    "dailyDemand",
    10,
    100,
    1
);
```

Perfect for balancing the economy.

---

# Step 7 – Player Controls

Useful settings include:

```javascript
playerSpeed

walkingHealthDrain

pickupRadius
```

Example:

```javascript
this.gui.add(
    this,
    "playerSpeed",
    2,
    10
);
```

Movement can now be adjusted without restarting.

---

# Step 8 – Lighting Controls

Your scene already contains:

- Ambient Light
- Hemisphere Light
- Directional Sun
- Torch Light
- Fog

These are excellent candidates for live tweaking.

Example:

```javascript
this.gui.add(
    this.sunLight,
    "intensity",
    0,
    3
);
```

Likewise:

```javascript
this.gui.add(
    this.scene.fog,
    "near",
    5,
    100
);

this.gui.add(
    this.scene.fog,
    "far",
    20,
    300
);
```

This makes finding the perfect desert atmosphere much faster.

---

# Step 9 – Camera Controls

Useful controls:

```javascript
cameraHeight

cameraDistance

cameraFOV
```

Example:

```javascript
this.gui.add(
    this.camera,
    "fov",
    40,
    90
).onChange(() => {

    this.camera.updateProjectionMatrix();

});
```

---

# Step 10 – Terrain Controls

After integrating Simplex Noise, expose values like:

- Terrain height
- Noise scale
- Dune height
- Detail strength

Example:

```javascript
terrain.height = 8;

terrain.scale = 0.01;
```

Changing these values live allows you to quickly experiment with different landscape styles.

---

# Step 11 – Graphics Controls

Useful future settings:

- Pixelation size
- Bloom strength
- CRT intensity
- Shadow quality
- Draw distance

Example:

```javascript
graphics.pixelSize
```

Changing a slider immediately updates the visual style.

---

# Step 12 – Spawn Controls

Adjust gameplay values without editing code.

Examples:

```javascript
manaSpawnRate

waterSpawnRate

powerupChance
```

This makes balancing much easier.

---

# Step 13 – Time Controls

Useful controls:

```javascript
dayLength

sunSpeed

timeScale
```

Quickly test:

- Sunrise
- Sunset
- Night
- Long days
- Short days

---

# Step 14 – Debug Buttons

Buttons can execute functions.

Example:

```javascript
this.gui.add(
    this,
    "spawnMana"
);
```

Or:

```javascript
this.gui.add(
    this,
    "nextDay"
);
```

Useful developer actions include:

- Spawn manna
- Heal player
- Skip to next day
- Add money
- Rebuild terrain
- Reset player position

---

# Step 15 – Organise into Folders

As the GUI grows, group controls into folders.

Example:

```
Gameplay

Graphics

Lighting

Terrain

Camera

Market

Player

Debug
```

Example:

```javascript
const gameplay =
    this.gui.addFolder("Gameplay");

const graphics =
    this.gui.addFolder("Graphics");

const lighting =
    this.gui.addFolder("Lighting");
```

This keeps the interface organised.

---

# Step 16 – Hide in Production

Only enable lil-gui during development.

Example:

```javascript
const DEBUG = true;

if (DEBUG) {

    this.gui = new lil.GUI();

}
```

Or:

```javascript
if (location.hostname === "localhost") {

    ...

}
```

---

# Suggested Initial Controls

## Gameplay

- Day Length
- Health
- Money
- Market Price
- Daily Demand

## Player

- Walk Speed
- Pickup Radius
- Health Drain

## Graphics

- Pixel Size
- Shadow Intensity
- Fog Distance

## Lighting

- Sun Intensity
- Ambient Light
- Torch Brightness

## Terrain

- Terrain Height
- Noise Scale
- Dune Size

## Debug

- Spawn Mana
- Next Day
- Heal Player
- Game Over
- Reset Game

---

# Integration Checklist

- Install lil-gui
- Add a `gui` property to the game object
- Create the GUI during initialization
- Organise settings into folders
- Expose gameplay variables with sliders
- Add developer buttons for common actions
- Disable the GUI in production builds

---

# Files to Modify

## Game Object

Add:

```javascript
gui: null,
```

---

## init()

After scene creation:

```javascript
this.gui = new lil.GUI();

this.setupGUI();
```

---

## Create a New Method

```javascript
setupGUI() {

    const gameplay =
        this.gui.addFolder("Gameplay");

    gameplay.add(
        this,
        "timeLeft",
        10,
        120
    );

    gameplay.add(
        this,
        "health",
        0,
        100
    );

}
```

Expand this method over time as new systems are added.

---

# Future Uses

As Manna Collector grows, lil-gui will become increasingly useful for tuning:

- Simplex Noise terrain
- MeshBVH settings
- Bloom
- CRT shaders
- Weather
- NPC behaviour
- Animal spawning
- Particle systems
- Market economy
- Difficulty balancing

It allows rapid experimentation without repeatedly editing source code or restarting the game.

---

# Benefits for Manna Collector

Integrating **lil-gui** provides an interactive developer control panel that dramatically speeds up balancing and visual tuning. Rather than constantly modifying code and refreshing the browser, developers can adjust gameplay, lighting, terrain, graphics, and economy settings in real time.

Combined with **Stats.js**, lil-gui forms an excellent development toolkit, making it much easier to optimise and polish Manna Collector as new features are introduced.