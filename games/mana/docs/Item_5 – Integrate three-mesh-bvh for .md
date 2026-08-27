# Item 5 – Integrate three-mesh-bvh for Faster Raycasting and Collision (★★★★★)

## Overview

The game currently performs mouse picking by raycasting against every terrain tile in the scene.

```javascript
const raycaster = new THREE.Raycaster();

raycaster.setFromCamera(mouse, this.camera);

const intersection = raycaster.intersectObjects(grounds);
```

This works well while the world is relatively small.

However, as the world expands with more terrain tiles, scenery, collectibles, and interactive objects, the number of triangle intersection tests grows rapidly.

**three-mesh-bvh** dramatically accelerates these operations by replacing the default brute-force triangle search with a Bounding Volume Hierarchy (BVH).

For large procedural worlds this is one of the biggest performance improvements available for Three.js.

---

# Why MeshBVH?

Without MeshBVH

```
Ray
 │
 ├── Test triangle 1
 ├── Test triangle 2
 ├── Test triangle 3
 ├── Test triangle 4
 ├── ...
 └── Test every triangle
```

With MeshBVH

```
Ray
 │
 ├── Test bounding box
 │
 ├── Skip entire regions
 │
 ├── Test small branch
 │
 └── Hit triangle
```

Instead of checking thousands of triangles, the ray often checks only a few dozen.

---

# Benefits

MeshBVH improves:

- Mouse picking
- Terrain raycasting
- Click-to-move
- Collision detection
- Physics queries
- Future AI navigation
- Large procedural worlds

The larger the world becomes, the larger the performance gain.

---

# Current Usage in Manna Collector

Your game already raycasts terrain here:

```javascript
const raycaster = new THREE.Raycaster();

raycaster.setFromCamera(mouse, this.camera);

const intersection =
    raycaster.intersectObjects(grounds);
```

This is an ideal candidate for MeshBVH.

---

# Step 1 – Install

Using npm:

```bash
npm install three-mesh-bvh
```

Or include the library from a CDN if remaining as a single HTML file.

---

# Step 2 – Import MeshBVH

```javascript
import {
    acceleratedRaycast,
    computeBoundsTree,
    disposeBoundsTree
}
from "three-mesh-bvh";
```

---

# Step 3 – Extend Three.js

Immediately after loading Three.js:

```javascript
THREE.BufferGeometry.prototype.computeBoundsTree =
    computeBoundsTree;

THREE.BufferGeometry.prototype.disposeBoundsTree =
    disposeBoundsTree;

THREE.Mesh.prototype.raycast =
    acceleratedRaycast;
```

From this point onward every mesh automatically uses BVH raycasting.

No other raycasting code needs changing.

---

# Step 4 – Build the BVH

Whenever terrain geometry is created:

Current:

```javascript
geometry.computeVertexNormals();
```

Immediately afterwards:

```javascript
geometry.computeBoundsTree();
```

Only one extra line is required.

---

# Step 5 – Dispose Properly

Your terrain already unloads old tiles.

Current:

```javascript
mesh.geometry.dispose();
```

Replace with:

```javascript
mesh.geometry.disposeBoundsTree();

mesh.geometry.dispose();
```

This frees BVH memory correctly.

---

# Step 6 – Mouse Picking

No changes required.

Current code:

```javascript
raycaster.intersectObjects(grounds);
```

will automatically become much faster.

---

# Step 7 – Terrain Collision

Currently the player height comes from:

```javascript
getTerrainHeight(x,z)
```

In the future, MeshBVH allows collision directly against terrain geometry instead of manually calculating height.

Benefits include:

- Walking on cliffs
- Bridges
- Overhangs
- Caves
- Complex terrain

---

# Step 8 – Future Object Selection

As the world grows you'll likely raycast against:

- Trees
- Rocks
- Mana
- Water
- NPCs
- Market
- Temple

MeshBVH accelerates all of these automatically.

---

# Step 9 – Infinite Terrain

Your game already streams terrain tiles.

```javascript
createTile()

updateTileGrid()
```

Each tile simply computes its own BVH after generation.

Example:

```javascript
createTile(...){

    ...

    geometry.computeVertexNormals();

    geometry.computeBoundsTree();

}
```

Nothing else changes.

---

# Step 10 – Future Physics

MeshBVH also supports:

- Sphere casts
- Capsule collisions
- Character movement
- Sliding
- Ground detection

This makes it an excellent foundation if the game later gains:

- Jumping
- Slopes
- Climbing
- Animals
- Enemies

---

# Expected Performance Improvements

Current world:

- Small improvement

Medium world:

- Noticeable improvement

Large procedural world:

- Significant improvement

Very large infinite world:

- Essential

Many developers report raycasting improvements of **10× to 100×**, depending on scene complexity.

---

# Integration Checklist

- Install **three-mesh-bvh**
- Extend `BufferGeometry`
- Extend `Mesh.raycast`
- Compute a bounds tree for every terrain tile
- Dispose the bounds tree when unloading tiles
- Leave existing raycasting code unchanged

---

# Files to Modify

## Terrain generation

```javascript
createTile()
```

Add:

```javascript
geometry.computeBoundsTree();
```

---

## Tile cleanup

```javascript
updateTileGrid()
```

Replace:

```javascript
mesh.geometry.dispose();
```

with:

```javascript
mesh.geometry.disposeBoundsTree();

mesh.geometry.dispose();
```

---

## Three.js initialization

After loading Three.js:

```javascript
THREE.BufferGeometry.prototype.computeBoundsTree =
    computeBoundsTree;

THREE.BufferGeometry.prototype.disposeBoundsTree =
    disposeBoundsTree;

THREE.Mesh.prototype.raycast =
    acceleratedRaycast;
```

---

# Benefits for Manna Collector

Integrating **three-mesh-bvh** will provide:

- Dramatically faster mouse picking
- Faster terrain intersection tests
- Better scalability for infinite terrain
- Reduced CPU usage during raycasting
- Improved responsiveness as the world grows
- A strong foundation for future collision detection and physics

Because Manna Collector already streams procedural terrain and relies heavily on raycasting for movement and interaction, MeshBVH is one of the highest-impact performance upgrades available with very little integration effort.