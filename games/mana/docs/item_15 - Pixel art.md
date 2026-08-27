# Pixel Art / Retro Visual Overhaul Roadmap

## Manna Collector – Retro Wilderness Edition

---

# Goal

Transform **Manna Collector** into a stylized retro experience inspired by:

* SNES RPGs
* PS1-era adventure games
* Retro CRT displays
* Pixel-art fantasy worlds

The game already includes basic post-processing pixelation. This roadmap expands that system into a complete retro visual pipeline.

---

# Current Status

## Already Implemented

### Pixelation Shader

Current post-processing includes:

* Screen pixelation
* Basic color quantization
* Scanline effect


---

# Phase 1 – Enhanced Pixel Perfect Rendering

## Objective

Create a sharper and more authentic low-resolution appearance.

### Tasks

* Add configurable render scale

Examples:

```text
100% = Modern
75%  = Light Retro
50%  = SNES Style
25%  = PS1 Style
```

### Implementation

Render scene to:

```javascript
WebGLRenderTarget
```

Then upscale using:

```javascript
NearestFilter
```

### Benefits

* Crisp pixel edges
* Consistent retro appearance
* Better performance

### Priority

⭐⭐⭐⭐⭐ Critical

---

# Phase 2 – Color Palette Reduction

## Objective

Reduce colors to mimic retro hardware limitations.

### Options

### SNES Mode

```text
32–64 colors
```

### Genesis Mode

```text
16–32 colors
```

### PS1 Mode

```text
64–128 colors
```

### Shader Work

Replace:

```glsl
float colors = 16.0;
```

with configurable palettes.

### Benefits

* Strong retro identity
* More artistic cohesion
* Less visual noise

### Priority

⭐⭐⭐⭐⭐ Critical

---

# Phase 3 – Bayer Dithering

## Objective

Simulate classic color blending techniques.

### Add

* 4×4 Bayer Matrix
* 8×8 Bayer Matrix

### Visual Effect

Instead of:

```text
Smooth gradients
```

Use:

```text
Retro patterned shading
```

Examples:

* Sky gradients
* Desert sand
* Sunlight transitions
* Fog

### Benefits

* Authentic console feel
* More perceived color depth

### Priority

⭐⭐⭐⭐ High

---

# Phase 4 – Retro CRT Shader

## Objective

Simulate an old television display.

### Features

#### Scanlines

```text
Horizontal dark lines
```

#### Curvature

```text
Slight screen bend
```

#### Phosphor Glow

```text
Soft pixel bloom
```

#### Chromatic Aberration

```text
Tiny RGB separation
```

#### Edge Distortion

```text
Subtle screen warping
```

### Recommended

CRT-Lottes Shader

### Benefits

* Instantly recognizable retro aesthetic
* Works extremely well with pixel art

### Priority

⭐⭐⭐⭐ High

---

# Phase 5 – PS1 Visual Mode

## Objective

Create an optional PlayStation 1 look.

### Features

#### Vertex Jitter

```text
Floating geometry
```

#### Affine Texture Warping

```text
Texture wobble
```

#### Reduced Draw Distance

```text
Heavy fog
```

#### Low Resolution

```text
320×240 internal rendering
```

### Optional Toggle

```text
Visual Mode:
[Modern]
[SNES]
[PS1]
```

### Priority

⭐⭐⭐ Medium

---

# Phase 6 – Pixel Art UI

## Objective

Bring HUD and menus into the retro style.

### Replace

Current:

```text
High-resolution parchment UI
```

With:

```text
Pixel parchment UI
```

### Elements

* Pixel fonts
* Pixel borders
* Pixel icons
* Pixel buttons

### Font Suggestions

* Press Start 2P
* VT323
* Pixel Operator

### Priority

⭐⭐⭐⭐ High

---

# Phase 7 – Retro Lighting Model

## Objective

Reduce modern lighting realism.

### Adjust

Current:

```text
Bloom
Fog
PBR-like shading
Smooth gradients
```

Toward:

```text
Flat lighting
Vertex coloring
Hard shadows
```

### Benefits

* Better consistency with pixel visuals
* More retro authenticity

### Priority

⭐⭐⭐ Medium

---

# Phase 8 – Visual Presets System

## Objective

Allow players to choose a style.

### Presets

#### Modern

```text
Current graphics
```

#### SNES

```text
Pixel Scale: 2x
64 Colors
Bayer Dithering
Light CRT
```

#### PS1

```text
Pixel Scale: 4x
Vertex Jitter
Affine Warp
Heavy Fog
CRT
```

#### Desert Relic

```text
Sepia Palette
Heavy Dithering
Strong CRT
```

### Settings Menu

```text
Visual Style
 ├─ Modern
 ├─ SNES
 ├─ PS1
 └─ Desert Relic
```

### Priority

⭐⭐⭐⭐ High

---

# Technical Architecture

## New Post Processing Stack

```text
RenderPass
    ↓
BloomPass
    ↓
PaletteReductionPass
    ↓
BayerDitherPass
    ↓
CRTPass
    ↓
PixelPerfectPass
    ↓
VignettePass
```

---

# Suggested Development Order

## Sprint 1

* Pixel Perfect Render Target
* Configurable Resolution Scale
* Visual Settings Menu

## Sprint 2

* Palette Reduction Shader
* Bayer Dithering Shader

## Sprint 3

* CRT-Lottes Shader Integration
* Scanlines
* Curvature

## Sprint 4

* SNES Preset
* PS1 Preset
* Desert Relic Preset

## Sprint 5

* Pixel UI Overhaul
* Retro Fonts
* Pixel Icons

---

# Success Criteria

The player should immediately recognize the game as:

> "A retro wilderness adventure inspired by classic SNES and PS1 games."

Visual goals:

* Crisp pixel rendering
* Retro color palettes
* CRT display effects
* Dithered gradients
* Distinct visual presets
* Improved performance through lower render resolution

---

# Future Enhancements

## Optional

### Pixel Character Sprites

Replace 3D character models with:

```text
Billboard sprites
```

### Dynamic Day/Night Palettes

Palette swaps based on time.

### VHS Mode

Additional effects:

* Noise
* Tracking errors
* Screen flicker

### Handheld Mode

Inspired by:

* Game Boy
* Game Boy Color
* Game Boy Advance

Palette swaps only.

---

**Status:** Planned
**Target Version:** v4.x
**Estimated Effort:** Medium–High
**Visual Impact:** Extremely High
