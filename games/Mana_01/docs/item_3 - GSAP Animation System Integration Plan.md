# GSAP Animation System Integration Plan

## Goal

Integrate **GSAP (GreenSock Animation Platform)** into Manna Collector
to replace manual animation code with smoother, easier-to-maintain
animations.

GSAP excels at creating polished game feel with minimal code.

------------------------------------------------------------------------

# Why GSAP?

The game currently animates many objects manually by incrementing values
every frame.

Examples include:

-   Floating score text
-   Pickup effects
-   UI popups
-   Camera movement
-   Character bounce
-   Market transitions

GSAP simplifies these animations while providing easing, sequencing, and
callbacks.

------------------------------------------------------------------------

# Benefits

-   Smooth professional animations
-   Less animation code
-   Easier maintenance
-   Powerful easing functions
-   Timelines for complex sequences
-   Excellent performance

------------------------------------------------------------------------

# Step 1 -- Add GSAP

Include GSAP before your main game script:

``` html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
```

------------------------------------------------------------------------

# Step 2 -- Replace Manual UI Animations

Current code manually adds/removes CSS classes.

Instead:

``` javascript
gsap.from(modal, {
    scale: 0.8,
    opacity: 0,
    duration: 0.4,
    ease: "back.out(1.7)"
});
```

Use this for:

-   Menu
-   Game Over
-   Market
-   Day Complete
-   Difficulty Selection

------------------------------------------------------------------------

# Step 3 -- Mana Pickup Animation

Instead of instantly disappearing:

``` javascript
gsap.to(mana.scale,{
    x:0,
    y:0,
    z:0,
    duration:0.25,
    ease:"back.in"
});
```

Add:

-   sparkle
-   rotation
-   fade

before removing the mesh.

------------------------------------------------------------------------

# Step 4 -- Floating Score Text

Instead of CSS-only animation:

``` javascript
gsap.to(text,{
    y:"-=40",
    opacity:0,
    duration:1,
    ease:"power2.out",
    onComplete:()=>text.remove()
});
```

------------------------------------------------------------------------

# Step 5 -- Camera Movement

Current camera movement can be interpolated manually.

Replace large jumps with:

``` javascript
gsap.to(camera.position,{
    x:newX,
    y:newY,
    z:newZ,
    duration:0.6,
    ease:"power2.out"
});
```

Result:

-   smoother tracking
-   cinematic feel

------------------------------------------------------------------------

# Step 6 -- Character Bounce

Idle animation:

``` javascript
gsap.to(player.position,{
    y:"+=0.1",
    duration:0.8,
    repeat:-1,
    yoyo:true,
    ease:"sine.inOut"
});
```

------------------------------------------------------------------------

# Step 7 -- Market Animation

Animate:

-   opening
-   closing
-   buttons
-   sold items
-   silver counter

Example:

``` javascript
gsap.from("#marketModal",{
    y:40,
    opacity:0,
    duration:0.35
});
```

------------------------------------------------------------------------

# Step 8 -- Coin Counter

Animate increasing silver:

``` javascript
gsap.to(counter,{
    value:newAmount,
    duration:0.8,
    onUpdate(){
        label.innerHTML=Math.floor(counter.value);
    }
});
```

Produces satisfying number rolling.

------------------------------------------------------------------------

# Step 9 -- Timeline Animations

Example sequence:

1.  Mana collected
2.  Sparkle
3.  Score popup
4.  Coin animation
5.  Sound effect

Using:

``` javascript
const tl = gsap.timeline();

tl.to(...)
  .to(...)
  .to(...);
```

------------------------------------------------------------------------

# Recommended Replacements

Replace manual animations for:

-   Floating text
-   Star bursts
-   Player idle
-   Pickup scaling
-   UI transitions
-   Camera movement
-   Market window
-   Button pop animations

Leave gameplay logic unchanged.

------------------------------------------------------------------------

# Testing Checklist

-   All menus animate correctly
-   Camera remains smooth
-   Pickups animate properly
-   No dropped frames
-   Mobile performance acceptable
-   No console errors

------------------------------------------------------------------------

# Expected Improvements

Before:

-   Abrupt movement
-   Manual interpolation
-   CSS-only effects

After:

-   Smooth transitions
-   Cinematic motion
-   Better game feel
-   Cleaner animation code

------------------------------------------------------------------------

# Future Uses

GSAP can later power:

-   Weather transitions
-   Day/night cycle
-   Boss introductions
-   Achievement popups
-   NPC dialogue
-   Inventory animations
-   Cut-scenes

------------------------------------------------------------------------

# Estimated Work

Approximately 100--200 lines modified.

Gameplay mechanics remain unchanged; only presentation and animation
code are improved.


# Item 12 – Integrate GSAP for Smooth Animations and UI Transitions (★★★★★)

## Overview

Manna Collector currently relies primarily on manual updates within the game loop for movement and UI changes. While this works well for gameplay, animations such as menu transitions, notifications, camera movements, and visual effects require a lot of custom code.

**GSAP (GreenSock Animation Platform)** is one of the most popular JavaScript animation libraries. It provides high-performance, easy-to-read animations for both DOM elements and Three.js objects.

Rather than manually interpolating values over time, GSAP allows complex animations to be described in just a few lines of code.

---

# Why GSAP?

Instead of writing:

```javascript
button.style.opacity += 0.01;

button.style.transform =
    `translateY(${y}px)`;
```

every frame, GSAP lets you write:

```javascript
gsap.to(button, {

    opacity: 1,

    y: 0,

    duration: 0.5

});
```

The animation is smoother, easier to maintain, and far less error-prone.

---

# Benefits

GSAP can animate:

- UI panels
- Buttons
- Notifications
- Camera movement
- Player effects
- Lighting
- Object scaling
- Floating collectibles
- Day/night transitions
- Scene fades

---

# Step 1 – Install

Using npm:

```bash
npm install gsap
```

Or include the CDN version before your game script.

---

# Step 2 – Fade Menus

Current menus likely appear instantly.

Instead, animate them.

```javascript
gsap.from("#menu", {

    opacity: 0,

    duration: 0.5

});
```

Or hide them:

```javascript
gsap.to("#menu", {

    opacity: 0,

    duration: 0.4

});
```

Menus now feel much more polished.

---

# Step 3 – Animate Notifications

Instead of instantly showing messages:

```
+5 Silver
```

Slide them onto the screen.

```javascript
gsap.from(notification, {

    y: -20,

    opacity: 0,

    duration: 0.4

});
```

---

# Step 4 – Button Feedback

Buttons feel more responsive with subtle scaling.

Example:

```javascript
gsap.to(button, {

    scale: 0.95,

    duration: 0.1,

    yoyo: true,

    repeat: 1

});
```

Useful for:

- Buy
- Sell
- Pause
- Resume
- New Game

---

# Step 5 – Floating Manna

Instead of static collectibles:

```javascript
mana.position.y
```

Animate them continuously.

```javascript
gsap.to(mana.position, {

    y: "+=0.3",

    duration: 1.5,

    repeat: -1,

    yoyo: true

});
```

The manna gently bobs up and down, making it easier to spot.

---

# Step 6 – Collection Animation

When manna is collected:

- Shrink
- Fade
- Rise upwards

Example:

```javascript
gsap.to(mana.scale, {

    x: 0,

    y: 0,

    z: 0,

    duration: 0.2

});
```

Followed by removing the object from the scene.

---

# Step 7 – Camera Movement

Smoothly move the camera instead of snapping.

Example:

```javascript
gsap.to(camera.position, {

    x: target.x,

    y: target.y,

    z: target.z,

    duration: 1

});
```

Useful for:

- Starting the game
- Entering the market
- Sleeping
- Game over
- Cutscenes

---

# Step 8 – Animate the Day Cycle

Instead of instantly changing lighting:

```javascript
sun.intensity = 0.5;
```

Animate it.

```javascript
gsap.to(sun, {

    intensity: 0.5,

    duration: 4

});
```

Likewise animate:

- Fog
- Sky colour
- Ambient light
- Hemisphere light

This creates a natural sunrise and sunset.

---

# Step 9 – Market Transactions

When the player sells manna:

- Money counter increases smoothly
- Floating coins appear
- "Sold!" message pops up

Example:

```javascript
gsap.from("#money", {

    scale: 1.4,

    duration: 0.25

});
```

---

# Step 10 – Health Bar Animation

Instead of instantly updating:

```
100 → 75
```

Animate the width.

```javascript
gsap.to(healthBar, {

    width: "75%",

    duration: 0.3

});
```

This provides much clearer feedback.

---

# Step 11 – Chain Animations

GSAP timelines allow multiple animations to play in sequence.

Example:

```javascript
const tl = gsap.timeline();

tl.to(menu, {

    opacity: 0

});

tl.to(camera.position, {

    z: 10

});

tl.to(player.scale, {

    x: 1,

    y: 1,

    z: 1

});
```

This is perfect for game start and cutscenes.

---

# Step 12 – Animate Three.js Objects

GSAP works directly with Three.js.

Example:

```javascript
gsap.to(tree.rotation, {

    y: Math.PI,

    duration: 5

});
```

Or:

```javascript
gsap.to(torchLight, {

    intensity: 2,

    duration: 0.4,

    repeat: -1,

    yoyo: true

});
```

Useful for:

- Torches
- Water
- Windmills
- Crystals
- NPCs

---

# Step 13 – Treasure Effects

When collecting rare manna:

Animate:

- Scale
- Glow
- Rotation
- Particle burst

Example:

```javascript
gsap.to(mana.rotation, {

    y: Math.PI * 2,

    duration: 0.5

});
```

---

# Step 14 – Pause Menu

Animate the pause overlay.

```javascript
gsap.from(pauseMenu, {

    scale: 0.9,

    opacity: 0,

    duration: 0.3

});
```

This feels much smoother than simply toggling visibility.

---

# Step 15 – Future Weather

Animate weather transitions.

Examples:

- Fog rolling in
- Sandstorm intensity
- Rain clouds
- Lightning flashes

Rather than changing values instantly, GSAP interpolates them smoothly.

---

# Suggested Animation Targets

## User Interface

- Menus
- Buttons
- Notifications
- Health bar
- Money counter
- Day counter

## Three.js Scene

- Camera
- Lights
- Fog
- Player
- Manna
- Trees
- Water
- NPCs

## Gameplay

- Item collection
- Market sales
- Day transitions
- Sleep animation
- Game over
- Victory screen

---

# Integration Checklist

- Install GSAP
- Animate menus
- Animate notifications
- Add button feedback
- Animate manna collectibles
- Smooth camera movements
- Animate lighting transitions
- Create reusable timelines
- Replace manual interpolation where appropriate

---

# Files to Modify

## Game Initialisation

Import GSAP.

```javascript
import { gsap } from "gsap";
```

Or load it from a CDN.

---

## UI

Replace instant visibility changes with GSAP animations.

---

## Player

Animate:

- Collection
- Damage
- Healing

---

## Camera

Replace snapping with smooth movement.

---

## Lighting

Animate:

- Sun intensity
- Fog
- Ambient light
- Sky colour

---

# Future Enhancements

GSAP opens the door to many polished features:

- Intro cinematic
- Camera flyovers
- Dialogue animations
- NPC interactions
- Quest completion effects
- Treasure chest opening
- Dynamic weather
- Victory celebrations
- Smooth scene transitions

---

# Benefits for Manna Collector

Integrating **GSAP** significantly improves the presentation and feel of Manna Collector without requiring major architectural changes. It replaces repetitive animation code with a powerful, readable API that works seamlessly with both the game's HTML interface and Three.js scene.

Combined with **Stats.js**, **lil-gui**, **Howler.js**, and the procedural improvements from earlier items, GSAP helps elevate the overall polish of the game, making interactions feel smoother, more responsive, and far more enjoyable for players.