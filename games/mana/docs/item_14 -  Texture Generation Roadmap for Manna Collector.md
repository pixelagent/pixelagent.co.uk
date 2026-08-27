
# Texture Generation Roadmap for Manna Collector

## Goal

Replace flat colours and manually created materials with a lightweight PBR texture workflow while keeping the stylised desert aesthetic.

---

# Phase 1 - Build the Texture Library (1-2 days)

## Sources

### Poly Haven
- Sand
- Rock
- Stone
- Wood

### AmbientCG
- Dirt
- Gravel
- Mud
- Cloth
- Metal

### TextureLab
Generate custom:
- Ancient stone
- Desert sand
- Temple walls
- Worn wood
- Cloth patterns

Deliverable:
- `/assets/textures/`

---

# Phase 2 - Prioritise Game Assets

## High Priority

- Terrain
- Rocks
- Temple
- Market stalls
- Oasis ground

## Medium Priority

- Trees
- Barrels
- Crates
- Wells
- Bridges

## Low Priority

- Decorative props
- Small clutter

---

# Phase 3 - Material Pipeline

Each material should include when available:

- Base Color
- Normal Map
- Roughness
- Ambient Occlusion

Use MeshStandardMaterial for world objects.

---

# Phase 4 - Terrain Improvements

Blend multiple materials:

- Soft sand
- Packed paths
- Oasis soil
- Rock outcrops

Future enhancement:
- Procedural texture blending by terrain height.

---

# Phase 5 - Building Materials

Assign themed materials:

|Object|Material|
|---|---|
|Temple|Weathered sandstone|
|Market|Wood & canvas|
|Camp|Fabric & timber|
|Oasis|Wet rock|
|Ruins|Cracked stone|

---

# Phase 6 - Performance

Optimise by:

- Compressing textures
- Reusing materials
- Limiting texture sizes
- Using mipmaps

Suggested sizes:

- Terrain: 2048px
- Buildings: 1024px
- Props: 512px

---

# Phase 7 - Polish

Add:

- Sand variation
- Moss near water
- Footpaths
- Weathering
- Edge wear

---

# Milestones

## Milestone 1
Textured terrain.

## Milestone 2
Textured landmarks.

## Milestone 3
Textured buildings.

## Milestone 4
Environmental variation.

## Milestone 5
Performance optimisation.

## Success Criteria

- Desert feels more alive.
- Minimal increase in loading time.
- Stable frame rate.
- Consistent biblical art style.
- Compatible with existing bloom and pixelation shaders.
