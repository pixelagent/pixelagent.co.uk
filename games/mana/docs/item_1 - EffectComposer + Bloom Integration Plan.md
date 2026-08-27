# EffectComposer + Bloom Integration Plan

## Goal

Replace the game's custom post-processing pipeline with the official
Three.js **EffectComposer** while preserving the current retro pixel-art
look.

This provides a foundation for adding professional post-processing
effects such as Bloom, FXAA, Film Grain, Vignette and CRT shaders.

------------------------------------------------------------------------

# Current Renderer

Current render flow:

    Scene
        ↓
    WebGLRenderTarget
        ↓
    Custom Pixel Shader
        ↓
    Screen

This already works well but is difficult to extend.

------------------------------------------------------------------------

# New Renderer

Desired render flow:

    Scene
        ↓
    RenderPass
        ↓
    BloomPass
        ↓
    Pixel Shader Pass
        ↓
    Film Grain (optional)
        ↓
    Vignette (optional)
        ↓
    OutputPass

------------------------------------------------------------------------

# Benefits

-   Official Three.js rendering pipeline
-   Easier to maintain
-   Compatible with future effects
-   Better lighting
-   Selectively glowing objects
-   Cleaner rendering code

------------------------------------------------------------------------

# Step 1 -- Add required modules

Import:

``` javascript
EffectComposer
RenderPass
ShaderPass
OutputPass
UnrealBloomPass
```

from the Three.js examples package.

------------------------------------------------------------------------

# Step 2 -- Remove the old pipeline

Delete or replace:

-   renderTarget
-   postScene
-   postCamera
-   postMaterial
-   setupPostProcessing()

These are replaced by EffectComposer.

------------------------------------------------------------------------

# Step 3 -- Create the composer

After creating the renderer:

``` javascript
composer = new EffectComposer(renderer);

composer.addPass(
    new RenderPass(scene,camera)
);
```

------------------------------------------------------------------------

# Step 4 -- Add Bloom

``` javascript
const bloom =
new UnrealBloomPass(
    new THREE.Vector2(
        window.innerWidth,
        window.innerHeight
    ),
    0.8,
    0.4,
    0.85
);

composer.addPass(bloom);
```

Suggested starting values:

  Property      Value
  ----------- -------
  Strength        0.8
  Radius          0.4
  Threshold      0.85

------------------------------------------------------------------------

# Step 5 -- Convert the pixel shader

Move the existing fragment shader into a ShaderPass.

Keep:

-   pixelation
-   colour quantisation
-   scanlines

Only the wrapping changes.

------------------------------------------------------------------------

# Step 6 -- Replace renderer.render()

Current:

``` javascript
renderer.render(scene,camera);
```

Replace with:

``` javascript
composer.render();
```

------------------------------------------------------------------------

# Step 7 -- Resize handling

Update:

``` javascript
composer.setSize(
    window.innerWidth,
    window.innerHeight
);
```

inside the resize event.

------------------------------------------------------------------------

# Step 8 -- Bloom only on emissive objects (optional)

Increase emissive intensity for:

-   Mana
-   Temple
-   Campfire
-   Coins
-   Market

Example:

``` javascript
material.emissiveIntensity = 2;
```

Bloom automatically enhances these objects.

------------------------------------------------------------------------

# Step 9 -- Optional future passes

Once EffectComposer is working you can easily add:

-   FXAA
-   SMAA
-   Film Grain
-   Vignette
-   CRT
-   Heat Distortion
-   Motion Blur

without changing the renderer again.

------------------------------------------------------------------------

# Testing Checklist

-   Game loads
-   No console errors
-   Camera still works
-   Pixelation preserved
-   Bloom visible
-   Resize works
-   FPS remains stable
-   Mobile rendering works

------------------------------------------------------------------------

# Expected Visual Improvements

Before:

-   Flat lighting
-   No glow
-   Manual post-processing

After:

-   Magical glowing manna
-   Richer sunset lighting
-   Better highlights
-   Professional rendering pipeline
-   Easier future upgrades

------------------------------------------------------------------------

# Estimated Work

Approximately 250--400 lines modified.

Primary functions affected:

-   createThreeJsScene()
-   setupPostProcessing()
-   animate()
-   onWindowResize()

Gameplay code is unaffected.
