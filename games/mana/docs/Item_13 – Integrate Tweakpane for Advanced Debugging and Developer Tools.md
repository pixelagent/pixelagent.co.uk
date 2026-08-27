
# 13. Integrating Detect GPU into Manna Collector

## Overview

Detect GPU automatically benchmarks the player's graphics hardware and assigns a graphics tier.

Instead of forcing every device to use identical settings, the game can automatically select:

- High
- Medium
- Low

This is especially valuable for mobile devices and older laptops.

## Why

Current game always enables the same rendering features:

- Dynamic lighting
- Bloom
- Pixelation
- Large terrain
- High terrain resolution
- Full draw distance

Some devices can easily handle these while others struggle.

Detect GPU allows the game to adjust quality before gameplay begins.

## Installation

```bash
npm install detect-gpu
```

or

```html
<script type="module">
import { getGPUTier } from "detect-gpu";
</script>
```

## Create a Graphics Manager

Create:

```text
GraphicsManager.js
```

Responsibilities:

- Detect GPU tier
- Configure renderer
- Configure EffectComposer
- Configure terrain quality
- Configure particle count
- Configure shadow quality

## Suggested Graphics Profiles

### High

- Full bloom
- Maximum terrain detail
- Long draw distance
- High particle count
- Dynamic shadows
- High resolution rendering

### Medium

- Moderate bloom
- Medium terrain detail
- Reduced particles
- Medium draw distance
- Lower shadow resolution

### Low

- Bloom disabled
- Reduced terrain segments
- Short draw distance
- Minimal particles
- Shadows disabled
- Lower renderer pixel ratio

## Game Integration

Run detection during the loading screen before creating the world.

Example flow:

```text
Loading Screen
      ↓
Detect GPU
      ↓
Select Graphics Profile
      ↓
Create Renderer
      ↓
Create Terrain
      ↓
Start Game
```

## Systems to Scale

|System|High|Medium|Low|
|---|---|---|---|
|Bloom|On|Reduced|Off|
|Terrain Segments|80|48|24|
|Draw Distance|3 tiles|2 tiles|1 tile|
|Particles|100%|60%|25%|
|Shadows|High|Medium|Off|
|Pixel Ratio|Device|1.0|0.75|

## Mobile Optimisations

When a mobile GPU is detected:

- Reduce particle count
- Lower render resolution
- Disable expensive shadows
- Reduce bloom intensity
- Shorten view distance

These changes significantly improve battery life and frame rate.

## Recommended Implementation Order

1. Detect GPU during loading
2. Create GraphicsManager
3. Configure renderer settings
4. Scale EffectComposer quality
5. Adjust terrain generation
6. Adjust particle limits

## Notes

Keep all graphics settings inside a single GraphicsManager instead of scattering quality checks throughout the game. This makes future optimisation much easier and allows players to override the automatic settings from an Options menu later.


# Item 13 – Integrate Tweakpane for Advanced Debugging and Developer Tools (★★★★★)

## Overview

As Manna Collector becomes more sophisticated, debugging individual systems becomes increasingly challenging. While **lil-gui** is excellent for adjusting variables, **Tweakpane** provides a much more modern and extensible interface for creating professional developer tools.

Tweakpane is a lightweight UI library designed specifically for live debugging, configuration, performance monitoring, and development workflows. It supports folders, tabs, graphs, buttons, color pickers, monitors, and custom plugins.

Rather than replacing **lil-gui**, Tweakpane can eventually become the primary development dashboard for the game.

---

# Why Tweakpane?

Instead of manually editing values:

```javascript
player.speed = 6;
```

or using browser developer tools, Tweakpane provides an interactive control panel.

Example:

```
Player

Speed
[------|----]

Health
[=========]

Money
250

Position
X: 42
Y: 3
Z: 18
```

Everything updates live.

---

# Benefits

Tweakpane is ideal for:

- Live debugging
- Performance tuning
- Graphics settings
- Terrain generation
- Weather controls
- Camera controls
- Developer cheats
- Live monitoring
- Color editing
- Testing gameplay

---

# Why Use Tweakpane Instead of Only lil-gui?

Both libraries are excellent.

**lil-gui**

- Small
- Extremely simple
- Great for prototypes

**Tweakpane**

- Modern interface
- Better layout
- Tabs
- Graphs
- Live monitors
- Better plugin ecosystem
- Easier to scale for larger projects

As Manna Collector grows, Tweakpane becomes increasingly valuable.

---

# Step 1 – Install

Using npm:

```bash
npm install tweakpane
```

Or include the CDN version before your game script.

---

# Step 2 – Create the Debug Panel

After the game initializes:

```javascript
const pane = new Pane();
```

Store it inside the game object.

```javascript
debugPane: null,
```

During initialization:

```javascript
this.debugPane = new Pane();
```

---

# Step 3 – Create Sections

Rather than one long list, organise controls.

Example:

```
Player

World

Terrain

Graphics

Lighting

Market

Audio

Debug
```

```javascript
const playerFolder =
    pane.addFolder({

        title: "Player"

    });
```

---

# Step 4 – Player Controls

Expose useful variables.

```javascript
playerFolder.addBinding(

    GameState.player,

    "health",

    {

        min: 0,

        max: 100

    }

);
```

Likewise:

- Money
- Speed
- Pickup radius
- Stamina

---

# Step 5 – Live Position Monitor

Unlike lil-gui, Tweakpane supports monitors.

Example:

```javascript
playerFolder.addMonitor(

    player.position,

    "x"

);
```

Also monitor:

- Y
- Z
- FPS
- Velocity

These values update automatically.

---

# Step 6 – Terrain Controls

Once Simplex Noise is integrated, expose:

```javascript
Terrain.scale

Terrain.height

Terrain.detail
```

Adjusting sliders instantly regenerates terrain.

This makes balancing much faster.

---

# Step 7 – Lighting Controls

Useful bindings:

```javascript
sun.intensity

ambient.intensity

fog.near

fog.far
```

Color pickers:

```javascript
pane.addBinding(

    sky,

    "color"

);
```

Perfect for experimenting with desert lighting.

---

# Step 8 – Graphics Settings

Expose values such as:

- Shadow quality
- Pixel size
- Bloom strength
- Draw distance
- Anti-aliasing

Changing values live lets you compare visual quality against performance.

---

# Step 9 – Audio Controls

Useful controls:

- Music volume
- Sound effects
- Ambient volume
- Master volume

Example:

```javascript
pane.addBinding(

    AudioSettings,

    "masterVolume",

    {

        min: 0,

        max: 1

    }

);
```

This works well alongside **Howler.js**.

---

# Step 10 – Market Controls

Expose:

- Sell price
- Daily demand
- Random variation

Useful while balancing the economy.

---

# Step 11 – Weather Controls

Future weather systems become easy to test.

Examples:

```
Sunny

Cloudy

Sandstorm

Night

Fog
```

Selecting a weather type immediately updates the scene.

---

# Step 12 – Performance Monitoring

Display values that update every frame.

Examples:

```
FPS

Frame Time

Draw Calls

Visible Objects

Terrain Tiles

Memory Usage
```

These complement **Stats.js**.

---

# Step 13 – Debug Actions

Buttons can call functions.

Example:

```javascript
pane.addButton({

    title: "Spawn Mana"

});
```

Useful actions include:

- Spawn manna
- Heal player
- Skip day
- Reset player
- Rebuild terrain
- Save game
- Load game

---

# Step 14 – Camera Controls

Adjust:

- Distance
- Height
- Field of view
- Rotation speed

Example:

```javascript
pane.addBinding(

    camera,

    "fov",

    {

        min: 40,

        max: 90

    }

);
```

Remember to update the projection matrix after changing the FOV.

---

# Step 15 – Debug Information

Display useful read-only values.

Examples:

```
Current Day

Current Seed

Money

Player Position

Health

Current FPS

Terrain Chunks

Loaded Objects

Manna Remaining
```

These are excellent for debugging gameplay.

---

# Step 16 – Multiple Tabs

As the panel grows, separate it into tabs.

Example:

```
Gameplay

Graphics

World

Performance

Audio

Developer
```

This keeps the interface organised even with dozens of controls.

---

# Step 17 – Developer Cheats

Useful buttons:

- Infinite Health
- Unlimited Money
- Unlock Everything
- Spawn Treasure
- Reveal Map
- Complete Day

These should only be available in debug builds.

---

# Step 18 – Hide in Production

Like Stats.js and lil-gui, Tweakpane should not appear in the release version.

Example:

```javascript
const DEBUG = true;

if (DEBUG) {

    this.debugPane = new Pane();

}
```

Or enable only on localhost.

---

# Suggested Layout

```
Player

    Health

    Money

    Speed

    Position

World

    Day

    Weather

    Time

Terrain

    Height

    Scale

    Detail

Lighting

    Sun

    Ambient

    Fog

Graphics

    Pixel Size

    Bloom

    Draw Distance

Audio

    Music

    Effects

Performance

    FPS

    Frame Time

    Memory

Developer

    Spawn Mana

    Save Game

    Load Game

    Next Day

    Reset Player
```

---

# Integration Checklist

- Install Tweakpane
- Create a developer panel
- Organise controls into folders or tabs
- Add bindings for gameplay variables
- Add live monitors
- Add developer buttons
- Display performance metrics
- Hide the panel in production builds

---

# Files to Modify

## Game Object

Add:

```javascript
debugPane: null,
```

---

## init()

Create the panel.

```javascript
this.debugPane = new Pane();

this.setupDebugPane();
```

---

## Create a New Method

```javascript
setupDebugPane() {

    const player = this.debugPane.addFolder({

        title: "Player"

    });

    player.addBinding(

        GameState.player,

        "health",

        {

            min: 0,

            max: 100

        }

    );

}
```

Expand this method as new systems are added.

---

# Recommended Integration Order

As more of the previous improvements are implemented, expose them through Tweakpane:

1. **GameState (Item 9)** — Monitor player, world, and market data.
2. **LocalForage (Item 10)** — Add Save Game, Load Game, and New Game buttons.
3. **SeedRandom (Item 11)** — Display the current world seed and allow entering a custom seed.
4. **Howler.js (Item 8)** — Add master, music, and effects volume controls.
5. **Simplex Noise (Item 4)** — Tune terrain height, frequency, and detail.
6. **Stats.js (Item 6)** — Display FPS, frame time, and memory alongside gameplay information.
7. **GSAP (Item 12)** — Enable or disable animation effects and adjust animation speed for testing.

---

# Future Enhancements

Tweakpane provides an excellent foundation for future developer tools, including:

- AI debugging
- NPC inspectors
- Quest editors
- Terrain visualisation
- Lighting presets
- Weather presets
- Performance graphs
- Save file inspection
- Live shader controls
- Procedural generation debugging

---

# Benefits for Manna Collector

Integrating **Tweakpane** gives Manna Collector a professional-grade developer dashboard for inspecting, tuning, and testing nearly every aspect of the game. While players will never see it, it greatly improves development speed by making gameplay balancing, terrain generation, graphics tuning, and debugging far more efficient.

Combined with **Stats.js**, **GameState**, **LocalForage**, **SeedRandom**, **Howler.js**, and **GSAP**, Tweakpane becomes the central hub for developing and refining the game, helping ensure new features can be tested and adjusted quickly as the project continues to grow.