# Item 6 – Integrate Stats.js for Performance Monitoring (★★★★☆)

## Overview

As Manna Collector grows with larger terrain, post-processing, particle effects, lighting, animations, and more interactive objects, it becomes increasingly difficult to judge performance simply by how the game "feels."

**Stats.js** is a lightweight performance monitor used by many Three.js developers. It displays real-time information about your game's rendering performance, making it much easier to identify bottlenecks while developing.

Unlike gameplay features, Stats.js is a **developer tool** and should only be enabled during development.

---

# Why Use Stats.js?

Stats.js provides live information about:

- Frames Per Second (FPS)
- Frame rendering time (ms)
- JavaScript update time
- Memory usage (where supported)
- Performance changes after new features are added

This allows you to quickly determine whether a new feature improves or hurts performance.

---

# Benefits

Using Stats.js makes it easy to monitor:

- Terrain generation
- Infinite terrain streaming
- Raycasting
- Particle effects
- Post-processing
- Lighting
- Shadow quality
- Animation performance
- Mobile optimisation

---

# Step 1 – Install

Using npm:

```bash
npm install stats.js
```

Or include the library from a CDN before your game script.

---

# Step 2 – Create the Stats Panel

After your game initializes:

```javascript
const stats = new Stats();

document.body.appendChild(stats.dom);
```

A small panel appears in the top-left corner of the screen.

---

# Step 3 – Store It

Add a property to your game object:

```javascript
stats: null,
```

During initialization:

```javascript
this.stats = new Stats();

document.body.appendChild(this.stats.dom);
```

---

# Step 4 – Update Every Frame

Inside your animation loop.

Current:

```javascript
animate() {

    requestAnimationFrame(() => this.animate());

    ...

}
```

Updated:

```javascript
animate() {

    this.stats.begin();

    requestAnimationFrame(() => this.animate());

    ...

    this.stats.end();

}
```

Now every frame is automatically measured.

---

# Step 5 – Position the Panel

The default location is the upper-left corner.

Optionally move it:

```javascript
stats.dom.style.left = "10px";

stats.dom.style.top = "10px";
```

Or:

```javascript
stats.dom.style.right = "10px";

stats.dom.style.left = "auto";
```

---

# Step 6 – Hide in Production

Stats.js should not appear in the released game.

Example:

```javascript
const DEBUG = true;

if (DEBUG) {

    this.stats = new Stats();

    document.body.appendChild(this.stats.dom);

}
```

Or:

```javascript
if (location.hostname === "localhost") {

    ...

}
```

---

# Step 7 – Measure Optimisation

Stats.js is especially useful after adding:

- EffectComposer
- Bloom
- Pixel shaders
- MeshBVH
- Particle systems
- Dynamic shadows
- Larger worlds

You can immediately see whether performance improves or decreases.

---

# Step 8 – Optimise Terrain Streaming

Your game dynamically creates and removes terrain tiles:

```javascript
createTile()

updateTileGrid()
```

Watch the FPS while:

- Walking quickly
- Rotating the camera
- Loading new terrain
- Entering new areas

If FPS drops significantly, you'll know the terrain system needs optimisation.

---

# Step 9 – Test Different Graphics Settings

When adding future graphics options such as:

- High
- Medium
- Low

Stats.js makes it easy to compare performance.

Example:

| Setting | FPS |
|----------|----:|
| High | 58 |
| Medium | 88 |
| Low | 120 |

---

# Step 10 – Mobile Testing

Stats.js is particularly valuable when testing on phones and tablets.

Watch how FPS changes when enabling:

- Shadows
- Bloom
- Water effects
- Larger draw distances
- Higher resolution rendering

This helps determine sensible default settings for lower-powered devices.

---

# Common Performance Targets

| Platform | Target FPS |
|----------|-----------:|
| Desktop | 60+ |
| High-end Mobile | 60 |
| Mid-range Mobile | 45–60 |
| Older Devices | 30+ |

Maintaining consistent frame times is generally more important than achieving very high FPS.

---

# Suggested Development Workflow

Whenever you add a new feature:

1. Enable Stats.js
2. Record the current FPS
3. Add the feature
4. Compare performance
5. Optimise if necessary

This prevents performance issues from accumulating over time.

---

# Integration Checklist

- Install Stats.js
- Add a `stats` property to the game object
- Create the Stats panel during initialization
- Call `stats.begin()` at the start of each animation frame
- Call `stats.end()` at the end of each animation frame
- Hide the panel in production builds

---

# Files to Modify

## Game Object

Add:

```javascript
stats: null,
```

---

## init()

After scene setup:

```javascript
this.stats = new Stats();

document.body.appendChild(this.stats.dom);
```

---

## animate()

Wrap the frame:

```javascript
this.stats.begin();

...

this.stats.end();
```

---

# Future Uses

Stats.js will become increasingly valuable as you add:

- Simplex Noise terrain
- MeshBVH
- Bloom
- CRT shaders
- Weather systems
- NPCs
- Animals
- Particle effects
- Dynamic lighting
- Large procedural worlds

It provides immediate feedback whenever a new feature impacts performance.

---

# Benefits for Manna Collector

Integrating **Stats.js** provides a simple yet powerful way to monitor performance throughout development. It requires only a few lines of code, has virtually no impact on development workflow, and makes it much easier to identify performance regressions before they become noticeable to players.

While it won't change gameplay directly, Stats.js is an invaluable tool for ensuring Manna Collector continues to run smoothly as more advanced graphics, terrain systems, and gameplay features are added.