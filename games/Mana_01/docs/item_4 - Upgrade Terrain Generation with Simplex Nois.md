# Item 4 – Upgrade Terrain Generation with Simplex Noise (★★★★★)

## Overview

The current terrain generation uses a combination of sine and cosine waves to create rolling dunes.

```javascript
getTerrainHeight(x, z) {
    let height = 0;
    height += Math.sin(x * 0.05) * 2;
    height += Math.sin(z * 0.04) * 2.5;
    height += Math.cos((x + z) * 0.03) * 1.5;
    return height;
}
```

This works surprisingly well for a prototype, but the repeating wave patterns become obvious as the player explores further from the starting area.

Replacing this system with **Simplex Noise** will create much more natural-looking terrain while requiring only minimal changes to the existing code.

---

# Why switch?

Simplex Noise produces smooth, natural height variation without obvious repeating patterns.

Benefits include:

- ✅ More realistic desert dunes
- ✅ Rolling hills
- ✅ Rocky outcrops
- ✅ Natural valleys
- ✅ Oasis depressions
- ✅ Infinite non-repeating terrain
- ✅ Better procedural generation

Unlike sine waves, noise creates terrain that feels organic.

---

# Current Terrain

Current landscape generation is based on mathematical waves.

```javascript
height += Math.sin(x * 0.05) * 2;
height += Math.sin(z * 0.04) * 2.5;
height += Math.cos((x + z) * 0.03) * 1.5;
```

This creates:

- repeating ridges
- predictable hills
- visible patterns over long distances

These become noticeable once the player walks several terrain tiles away.

---

# Recommended Library

Use:

```
simplex-noise
```

or

```
fast-simplex-noise
```

Both are lightweight and widely used in procedural games.

---

# Step 1 – Add the Library

For modules:

```bash
npm install simplex-noise
```

For the current HTML version:

```html
<script src="https://cdn.jsdelivr.net/npm/simplex-noise@4.0.3/dist/umd/simplex-noise.min.js"></script>
```

Load it before the game script.

---

# Step 2 – Create a Noise Generator

During game initialization:

```javascript
const noise = new SimplexNoise();
```

Store it as:

```javascript
this.noise = new SimplexNoise();
```

---

# Step 3 – Replace getTerrainHeight()

Instead of:

```javascript
getTerrainHeight(x, z) {

    let height = 0;

    height += Math.sin(x * 0.05) * 2;
    height += Math.sin(z * 0.04) * 2.5;
    height += Math.cos((x + z) * 0.03) * 1.5;

    return height;

}
```

Use:

```javascript
getTerrainHeight(x, z) {

    return this.noise.noise2D(
        x * 0.01,
        z * 0.01
    ) * 8;

}
```

Immediately the terrain becomes smoother and more varied.

---

# Step 4 – Layer Multiple Noise Frequencies

The best terrain combines several layers of noise.

Example:

```javascript
getTerrainHeight(x, z) {

    let h = 0;

    h += this.noise.noise2D(x * 0.003, z * 0.003) * 12;

    h += this.noise.noise2D(x * 0.01, z * 0.01) * 4;

    h += this.noise.noise2D(x * 0.04, z * 0.04) * 1;

    return h;

}
```

This creates:

- large dunes
- medium hills
- small surface detail

This technique is known as **fractal noise** or **octaves**.

---

# Step 5 – Generate Better Biomes

Noise can control more than height.

For example:

```javascript
const moisture =
    this.noise.noise2D(
        x * 0.002,
        z * 0.002
    );
```

Then choose terrain types.

Example:

```
High height
↓

Rock

Low height
↓

Sand

Very low height
↓

Oasis
```

This naturally creates different regions without hardcoding locations.

---

# Step 6 – Improve Terrain Colours

Instead of colouring terrain purely by height, combine height and slope.

Example:

```
Flat

↓

Light sand

Steep

↓

Dark rock

Low wet areas

↓

Green vegetation
```

This produces much richer landscapes.

---

# Step 7 – Improve Object Placement

Instead of randomly placing rocks and trees, use the terrain.

Examples:

```
High rocky areas

↓

More rocks

Low areas

↓

Palm trees

Near water

↓

Bushes

Open dunes

↓

Nothing
```

The world begins to feel intentionally designed even though it is fully procedural.

---

# Step 8 – Better Landmark Placement

Your current landmarks are manually positioned.

With noise you can automatically search for:

- hilltops
- valleys
- flat ground
- cliffs

Then place:

- Temple
- Camp
- Oasis
- Split Rock

in locations that naturally fit the landscape.

---

# Step 9 – Future Possibilities

Simplex Noise can also drive:

- Wind strength
- Sand colour variation
- Dust storms
- Vegetation density
- Water level
- Animal spawning
- Resource spawning
- Weather systems

Using one consistent noise source keeps the world cohesive.

---

# Performance

Simplex Noise is extremely fast.

Since your terrain is already generated tile-by-tile, replacing the height calculation has very little impact on performance.

No other parts of the terrain generation system need major changes.

---

# Files to Update

Most of the work is limited to:

- `getTerrainHeight()`
- `createTile()`
- Terrain colouring
- Object placement logic

The rest of the world generation can remain unchanged.

---

# Benefits for Manna Collector

Replacing the current sine-wave terrain with Simplex Noise will make the wilderness feel far more natural and varied.

Players will encounter rolling dunes, rocky ridges, shallow basins, and organic landscapes without obvious repetition. It also lays the foundation for future features such as biomes, dynamic weather, better landmark placement, and procedural resource distribution.

This is one of the highest-impact visual improvements you can make while requiring only a small change to the existing terrain generation code.
I prefer this response