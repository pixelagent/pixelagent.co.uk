# Troika Three Text Integration Plan

## Goal

Replace the current canvas-based location labels with **Troika Three
Text** so that all in-world text remains crisp at any zoom level,
supports outlines/shadows, and removes the need to generate canvas
textures.

## Why

The current `createLocationFlag()` builds a `CanvasTexture` for every
location.

### Current drawbacks

-   Text becomes blurry when zooming in.
-   Every label needs its own texture.
-   Text changes require regenerating a canvas.
-   Styling (outline, shadow) is awkward.
-   Memory usage grows with additional labels.

### Troika advantages

-   Crisp vector-quality text
-   GPU accelerated
-   Excellent performance
-   Easy outlines
-   Easy shadows
-   Real font support
-   Easy animation

------------------------------------------------------------------------

## Step 1 -- Add Troika

Include the module before your game starts.

``` html
<script type="module">
import { Text } from 'https://unpkg.com/troika-three-text/dist/troika-three-text.esm.js';
</script>
```

If moving to ES modules, also import Three.js as a module instead of the
CDN global.

------------------------------------------------------------------------

## Step 2 -- Replace `createLocationFlag()`

Remove the existing canvas texture generation.

Keep: - Pole - Finial - Group positioning

Replace only the banner with a `Text` object.

Example:

``` javascript
const label = new Text();

label.text = name;
label.fontSize = 0.55;
label.color = 0x3b2a16;
label.anchorX = "center";
label.anchorY = "middle";

label.outlineWidth = 0.03;
label.outlineColor = 0xf1e3bf;

label.position.set(0,6,0);

label.sync();

group.add(label);
```

Store the label reference in:

``` javascript
group.userData.label = label;
```

------------------------------------------------------------------------

## Step 3 -- Remove obsolete code

Delete:

-   `animateFlagWave()`

It is no longer required.

------------------------------------------------------------------------

## Step 4 -- Remove animation calls

Delete any code that calls:

``` javascript
animateFlagWave(...)
```

inside the render loop.

------------------------------------------------------------------------

## Step 5 -- Optional floating animation

Inside `animate()`:

``` javascript
group.userData.label.position.y =
    6 + Math.sin(time*0.002)*0.1;
```

------------------------------------------------------------------------

## Step 6 -- Improve appearance

Recommended properties:

``` javascript
label.font =
"/fonts/Cinzel-Regular.ttf";

label.outlineWidth = 0.03;

label.outlineColor = 0xf1e3bf;

label.strokeWidth = 0.01;

label.strokeColor = 0x5a3f22;
```

------------------------------------------------------------------------

## Expected Result

### Before

-   Canvas texture
-   Fixed resolution
-   Slightly blurry
-   Hard to style

### After

-   Sharp text
-   Infinite resolution
-   Easy outlines
-   Easy shadows
-   Lower memory usage

------------------------------------------------------------------------

## Testing Checklist

-   Labels appear correctly
-   No console errors
-   Text remains sharp when zooming
-   Labels rotate correctly
-   FPS unchanged
-   Mobile still works

------------------------------------------------------------------------

## Next Phase

After Troika integration:

**EffectComposer + Bloom**

This will allow:

-   Glowing manna
-   Temple glow
-   Sparkling coins
-   Better night lighting
