import * as THREE from 'three';
import { config as gameConfig } from './config.js';

function createTextSprite(text, options = {}) {
  const fontSize = options.fontSize || 64;
  const fontFamily = options.fontFamily || 'Cinzel, serif';
  const color = options.color || '#3b2a16';
  const outlineColor = options.outlineColor || '#f1e3bf';
  const outlineWidth = options.outlineWidth || 4;
  const strokeColor = options.strokeColor || '#5a3f22';
  const strokeWidth = options.strokeWidth || 2;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  ctx.font = `${fontSize}px ${fontFamily}`;
  const metrics = ctx.measureText(text);
  const padding = outlineWidth + strokeWidth + 10;
  canvas.width = Math.ceil(metrics.width) + padding * 2;
  canvas.height = fontSize + padding * 2;

  ctx.font = `${fontSize}px ${fontFamily}`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  if (outlineWidth > 0) {
    ctx.strokeStyle = outlineColor;
    ctx.lineWidth = outlineWidth * 2;
    ctx.lineJoin = 'round';
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2);
  }

  if (strokeWidth > 0) {
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth * 2;
    ctx.lineJoin = 'round';
    ctx.globalAlpha = 0.8;
    ctx.strokeText(text, canvas.width / 2, canvas.height / 2);
    ctx.globalAlpha = 1;
  }

  ctx.fillStyle = color;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  const material = new THREE.SpriteMaterial({ map: texture, transparent: true });
  const sprite = new THREE.Sprite(material);
  const scale = options.scale || 4;
  sprite.scale.set(scale * (canvas.width / canvas.height), scale, 1);
  return sprite;
}

export class SceneManager {
  constructor(game) {
    this.game = game;
  }

  createLandscape() {
    const locations = [
      { name: 'Camp', pos: [20, 0, -20], color: 0x5a2d0c },
      { name: 'Oasis', pos: [-25, 0, -15], color: 0x115511 },
      { name: 'Split Rock', pos: [0, 0, 25], color: 0x555555 },
      { name: 'Temple', pos: [-20, 0, 20], color: 0x997300 },
      { name: 'Wilderness', pos: [25, 0, 15], color: 0x5a4a35 },
    ];

    locations.forEach((loc) => {
      const locY = this.game.getTerrainHeight(loc.pos[0], loc.pos[2]);

      const markerGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 8);
      const markerMaterial = new THREE.MeshLambertMaterial({
        color: loc.color,
        emissive: loc.color,
        emissiveIntensity: 0.3,
      });
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(loc.pos[0], locY + 0.15, loc.pos[2]);
      this.game.scenery.push(marker);
      this.game.scene.add(marker);

      const flagGroup = this.createLocationFlag(loc.name, loc.pos[0], locY, loc.pos[2]);
      flagGroup.visible = false;
      Object.assign(flagGroup.userData, { targetX: loc.pos[0], targetZ: loc.pos[2], radius: 12 });

      this.game.scene.add(flagGroup);
      this.game.locationSprites.push(flagGroup);

      if (loc.name === 'Camp') {
        this.createCampfire(loc.pos[0] + 2, locY, loc.pos[2] - 2);
        // Add some tents and market stalls
        this.createTent(loc.pos[0] - 2, locY, loc.pos[2] + 1, Math.PI / 4);
        this.createTent(loc.pos[0] + 1, locY, loc.pos[2] + 3, -Math.PI / 3);
        this.createMarketStall(loc.pos[0] + 4, locY, loc.pos[2], -Math.PI / 2);
        this.createMarketStall(loc.pos[0] + 4, locY, loc.pos[2] + 2.5, -Math.PI / 2);

        if (this.game.particleManager) {
          const marketPosition = new THREE.Vector3(loc.pos[0] + 4, locY + 2.2, loc.pos[2] + 1.25);
          this.game.particleManager.createEmitter('confetti', marketPosition);
        }
      } else if (loc.name === 'Split Rock') {
        this.createSplitRock(loc.pos[0], locY, loc.pos[2]);
      } else if (loc.name === 'Temple') {
        this.createTemple(loc.pos[0], locY, loc.pos[2]);
      } else {
        // Generic scenery for Oasis and Wilderness
        for (let i = 0; i < 9; i++) {
          const angle = Math.random() * Math.PI * 2;
          const dist = 3 + Math.random() * 5;
          const itemX = loc.pos[0] + Math.cos(angle) * dist;
          const itemZ = loc.pos[2] + Math.sin(angle) * dist;
          const itemY = this.game.getTerrainHeight(itemX, itemZ);

          const roll = Math.random();
          if (roll < 0.45) {
            this.createRock(itemX, itemY, itemZ);
          } else if (roll < 0.75) {
            this.createRoundTree(itemX, itemY, itemZ);
          } else {
            this.createPalmTree(itemX, itemY, itemZ);
          }
        }
      }
    });

    this.scatterRocks();
  }

  createLocationFlag(name, x, y, z) {
    const group = new THREE.Group();

    // Pole
    const poleGeometry = new THREE.CylinderGeometry(0.09, 0.12, 7.5, 8);
    const poleMaterial = new THREE.MeshLambertMaterial({ color: 0x5a3f22 });
    const pole = new THREE.Mesh(poleGeometry, poleMaterial);
    pole.position.y = 3.75;
    pole.castShadow = true;
    group.add(pole);

    // Gold finial
    const finialGeometry = new THREE.SphereGeometry(0.22, 8, 8);
    const finialMaterial = new THREE.MeshLambertMaterial({ color: 0xb8862f, emissive: 0x6b4f1a, emissiveIntensity: 0.25 });
    const finial = new THREE.Mesh(finialGeometry, finialMaterial);
    finial.position.y = 7.6;
    finial.castShadow = true;
    group.add(finial);

    // Parchment banner canvas texture
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#e8d4a3';
    ctx.fillRect(0, 0, 512, 320);
    const grd = ctx.createRadialGradient(256, 110, 40, 256, 160, 320);
    grd.addColorStop(0, 'rgba(255,248,220,0.55)');
    grd.addColorStop(1, 'rgba(120,80,30,0.25)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 512, 320);

    ctx.strokeStyle = '#5a3f22';
    ctx.lineWidth = 10;
    ctx.strokeRect(10, 10, 492, 300);
    ctx.strokeStyle = '#b8862f';
    ctx.lineWidth = 3;
    ctx.strokeRect(22, 22, 468, 276);

    ctx.fillStyle = '#3b2a16';
    ctx.font = 'bold 70px "Cinzel", Georgia, serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(name, 256, 160);

    ctx.strokeStyle = '#7a2118';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(70, 210);
    ctx.lineTo(442, 210);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(canvas);

    // Cloth-style flag mesh, segmented so it can ripple like a waving flag
    const flagWidth = 3.6;
    const flagHeight = 2.3;
    const flagGeometry = new THREE.PlaneGeometry(flagWidth, flagHeight, 16, 10);
    const flagMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      side: THREE.DoubleSide,
    });
    const flagMesh = new THREE.Mesh(flagGeometry, flagMaterial);
    flagMesh.position.set(flagWidth / 2 + 0.12, 6.0, 0);
    flagMesh.castShadow = true;
    flagMesh.userData.basePositions = Float32Array.from(flagGeometry.attributes.position.array);
    flagMesh.userData.waveSeed = Math.random() * 100;
    group.add(flagMesh);

    group.position.set(x, y, z);
    // Face roughly toward the camp center so flags read naturally in the world
    group.rotation.y = Math.atan2(-x, -z);

    group.userData.flagMesh = flagMesh;
    group.userData.name = name;
    return group;
  }

  createCampfire(x, y, z) {
    const firePitGroup = new THREE.Group();
    firePitGroup.position.set(x, y, z);

    // Create some rocks for the fire pit
    const rockMaterial = new THREE.MeshLambertMaterial({ color: 0x4a3a25 });
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const rockRadius = 0.7;
      const rockX = Math.cos(angle) * rockRadius;
      const rockZ = Math.sin(angle) * rockRadius;
      const rockSize = 0.2 + Math.random() * 0.15;
      const rockGeometry = new THREE.IcosahedronGeometry(rockSize, 0);
      const rock = new THREE.Mesh(rockGeometry, rockMaterial);
      rock.position.set(rockX, rockSize * 0.4, rockZ);
      rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      rock.castShadow = true;
      firePitGroup.add(rock);
    }

    // Create some logs
    const logMaterial = new THREE.MeshLambertMaterial({ color: 0x3a230e });
    const logGeometry = new THREE.CylinderGeometry(0.08, 0.08, 1.0, 5);

    const log1 = new THREE.Mesh(logGeometry, logMaterial);
    log1.position.y = 0.1;
    log1.rotation.set(0.2, Math.PI / 4, Math.PI / 2);
    log1.castShadow = true;
    firePitGroup.add(log1);

    const log2 = new THREE.Mesh(logGeometry, logMaterial);
    log2.position.y = 0.2;
    log2.rotation.set(-0.2, -Math.PI / 3, Math.PI / 2);
    log2.castShadow = true;
    firePitGroup.add(log2);

    this.game.scene.add(firePitGroup);

    // Add particle effects for smoke, embers, and the flames themselves
    const firePosition = new THREE.Vector3(x, y + 0.2, z);
    if (this.game.particleManager) {
      this.game.particleManager.createEmitter('smoke', firePosition);
      this.game.particleManager.createEmitter('embers', firePosition);
      this.game.particleManager.createEmitter('campfire', firePosition);
    }
  }

  animateFlagWave(flagMesh, time) {
    if (!flagMesh || !flagMesh.geometry || !flagMesh.userData.basePositions) return;

    const geometry = flagMesh.geometry;
    const posAttr = geometry.attributes.position;
    const base = flagMesh.userData.basePositions;
    const seed = flagMesh.userData.waveSeed;
    const halfWidth = geometry.parameters.width / 2;

    for (let i = 0; i < posAttr.count; i++) {
      const bx = base[i * 3];
      const by = base[i * 3 + 1];
      // 0 at the pole edge, 1 at the free-flying edge
      const ratio = (bx + halfWidth) / (halfWidth * 2);
      const wave = Math.sin(time * 0.06 + seed + bx * 1.6 + by * 0.6) * 0.22 * ratio
        + Math.sin(time * 0.1 + seed * 1.7 + bx * 0.8) * 0.08 * ratio;
      posAttr.setZ(i, wave);
      posAttr.setY(i, by - ratio * 0.04 * Math.sin(time * 0.04 + seed));
    }
    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();
  }

  createRock(x, y, z, sizeOverride) {
    const sizeRoll = Math.random();
    let rockSize;
    if (sizeOverride) {
      rockSize = sizeOverride;
    } else if (sizeRoll < 0.4) {
      rockSize = 0.2 + Math.random() * 0.25; // pebble
    } else if (sizeRoll < 0.8) {
      rockSize = 0.5 + Math.random() * 0.5; // medium
    } else {
      rockSize = 1.1 + Math.random() * 0.9; // boulder
    }
    const rockColors = [0x4a3a25, 0x6b5a42, 0x5c4a32, 0x3a3a3a];
    const rockGeometry = new THREE.IcosahedronGeometry(rockSize, 1);
    const rockMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff, // Use white and tint with vertex colors
      vertexColors: true,
    });
    const rock = new THREE.Mesh(rockGeometry, rockMaterial);
    rock.position.set(x, y + rockSize * 0.45, z);
    rock.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    rock.scale.y *= 0.7 + Math.random() * 0.3;
    rock.castShadow = true;
    rock.receiveShadow = true;
    this.game.scenery.push(rock);
    this.game.scene.add(rock);

    // Add vertex colors to the rock for variation
    const baseColor = new THREE.Color(rockColors[Math.floor(Math.random() * rockColors.length)]);
    const colors = [];
    for (let i = 0; i < rockGeometry.attributes.position.count; i++) {
      const c = baseColor.clone().multiplyScalar(0.8 + Math.random() * 0.4);
      colors.push(c.r, c.g, c.b);
    }
    rockGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    const colliderGeometry = new THREE.SphereGeometry(rockSize * 0.6, 8, 8);
    const colliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const collider = new THREE.Mesh(colliderGeometry, colliderMaterial);
    collider.position.copy(rock.position);
    collider.userData.isCollider = true;
    this.game.scene.add(collider);
    this.game.obstacleColliders.push(collider);

    return rock;
  }
    

  createRoundTree(x, y, z) {
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, 2, 8);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x4a2306 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, y + 1, z);
    trunk.castShadow = true;
    this.game.scenery.push(trunk);
    this.game.scene.add(trunk);

    const foliageGeometry = new THREE.SphereGeometry(1, 8, 8);
    const foliageMaterial = new THREE.MeshLambertMaterial({ color: 0x115511 });
    const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
    foliage.position.set(x, y + 2, z);
    foliage.castShadow = true;
    this.game.scenery.push(foliage);
    this.game.scene.add(foliage);

    const treeColliderGeometry = new THREE.CylinderGeometry(0.8, 0.8, 2.5, 8);
    const treeColliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const treeCollider = new THREE.Mesh(treeColliderGeometry, treeColliderMaterial);
    treeCollider.position.set(x, y + 1.25, z);
    treeCollider.userData.isCollider = true;
    this.game.scene.add(treeCollider);
    this.game.obstacleColliders.push(treeCollider);
  }

  createPalmTree(x, y, z) {
    const group = new THREE.Group();
    const lean = (Math.random() - 0.5) * 0.25;

    const trunkGeometry = new THREE.CylinderGeometry(0.12, 0.25, 3.2, 6);
    const trunkMaterial = new THREE.MeshLambertMaterial({ color: 0x6b4423 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 1.6;
    trunk.rotation.z = lean;
    trunk.castShadow = true;
    group.add(trunk);

    const frondMaterial = new THREE.MeshLambertMaterial({ color: 0x2d6a1f, side: THREE.DoubleSide });
    const frondCount = 6;
    for (let i = 0; i < frondCount; i++) {
      const frondGeometry = new THREE.ConeGeometry(0.35, 2.2, 4, 1, true);
      const frond = new THREE.Mesh(frondGeometry, frondMaterial);
      const a = (Math.PI * 2 * i) / frondCount;
      frond.position.set(Math.sin(lean) * 3.2, 3.15, 0);
      frond.rotation.z = Math.PI / 2 + Math.sin(a) * 0.9 + lean;
      frond.rotation.y = a;
      frond.castShadow = true;
      group.add(frond);
    }

    group.position.set(x, y, z);
    group.rotation.y = Math.random() * Math.PI * 2;
    this.game.scenery.push(group);
    this.game.scene.add(group);

    const palmColliderGeometry = new THREE.CylinderGeometry(0.5, 0.5, 3.5, 6);
    const palmColliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const palmCollider = new THREE.Mesh(palmColliderGeometry, palmColliderMaterial);
    palmCollider.position.set(x, y + 1.75, z);
    palmCollider.userData.isCollider = true;
    this.game.scene.add(palmCollider);
    this.game.obstacleColliders.push(palmCollider);
  }

  scatterRocks() {
    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 8 + Math.random() * 40;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;
      const y = this.game.getTerrainHeight(x, z);
      this.createRock(x, y, z);
    }
  }

createBirds() {
    const birdCount = gameConfig.scene.birds.count.min + Math.floor(Math.random() * (gameConfig.scene.birds.count.max - gameConfig.scene.birds.count.min + 1));
    for (let i = 0; i < birdCount; i++) {
      const birdGroup = new THREE.Group();
      const wingGeometry = new THREE.BoxGeometry(2, 0.2, 0.5);
      const wingMaterial = new THREE.MeshLambertMaterial({ color: 0x111111 });
      const wings = new THREE.Mesh(wingGeometry, wingMaterial);
      birdGroup.add(wings);

      const bodyGeometry = new THREE.SphereGeometry(0.3, 6, 6);
      const bodyMaterial = new THREE.MeshLambertMaterial({ color: 0x050505 });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      body.scale.set(1, 0.8, 0.6);
      birdGroup.add(body);

      const startX = (Math.random() - 0.5) * 100;
      const startZ = (Math.random() - 0.5) * 100;
      const baseHeight = gameConfig.scene.birds.flightHeight.min + Math.random() * (gameConfig.scene.birds.flightHeight.max - gameConfig.scene.birds.flightHeight.min);
      birdGroup.position.set(startX, baseHeight, startZ);

      // Give each bird its own gentle random heading and flight rhythm
      const heading = Math.random() * Math.PI * 2;
      const speed = gameConfig.scene.birds.speed.min + Math.random() * (gameConfig.scene.birds.speed.max - gameConfig.scene.birds.speed.min);
      birdGroup.userData.vx = Math.sin(heading) * speed;
      birdGroup.userData.vz = Math.cos(heading) * speed;
      birdGroup.userData.baseHeight = baseHeight;
      birdGroup.userData.wingRotation = Math.random() * Math.PI * 2;
      birdGroup.userData.flapSpeed = 8 + Math.random() * 6;
      birdGroup.userData.bobSpeed = 0.4 + Math.random() * 0.3;
      birdGroup.userData.turnSeed = Math.random() * 1000;
      birdGroup.userData.wings = wings;

      this.game.scene.add(birdGroup);
      this.game.birds.push(birdGroup);
    }
  }

  /**
   * Animate the flock of birds: gentle wandering flight, wing flapping, and a slow bob.
   * @param {number} deltaTime - Seconds since the last frame.
   */
  updateBirds(deltaTime) {
    const bounds = gameConfig.scene.birds.bounds;
    this.game.birds.forEach((bird) => {
      const data = bird.userData;

      // Occasionally drift the heading so birds wander instead of flying dead straight
      const driftAngle = Math.sin(this.game.animationTime * gameConfig.scene.birds.turn.speed + data.turnSeed) * gameConfig.scene.birds.turn.amount;
      const speed = Math.hypot(data.vx, data.vz);
      const currentHeading = Math.atan2(data.vx, data.vz) + driftAngle;
      data.vx = Math.sin(currentHeading) * speed;
      data.vz = Math.cos(currentHeading) * speed;

      bird.position.x += data.vx;
      bird.position.z += data.vz;

      // Wrap around when a bird flies past the edge of the flyable area
      if (bird.position.x > bounds) bird.position.x = -bounds;
      if (bird.position.x < -bounds) bird.position.x = bounds;
      if (bird.position.z > bounds) bird.position.z = -bounds;
      if (bird.position.z < -bounds) bird.position.z = bounds;

      // Face the direction of travel
      bird.rotation.y = Math.atan2(data.vx, data.vz);

      // Flap wings and bob gently up and down
      data.wingRotation += deltaTime * data.flapSpeed;
      if (data.wings) {
        data.wings.rotation.z = Math.sin(data.wingRotation) * gameConfig.scene.birds.flapAmount;
      }
      bird.position.y = data.baseHeight + Math.sin(data.wingRotation * data.bobSpeed) * gameConfig.scene.birds.bobAmount;
    });
  }

  spawnPickups() {
    const settings = this.game.getDifficultySettings();
    for (let i = 0; i < settings.manaCount; i++) {
      const angle = (Math.PI * 2 * i) / settings.manaCount;
      const distance = 15 + Math.random() * 10;
      const px = Math.cos(angle) * distance;
      const pz = Math.sin(angle) * distance;
      const py = this.game.getSurfaceHeight(px, pz) + gameConfig.scene.manaPickup.bobOffset;

      const mana = this.createManaPickup(px, py, pz);
      this.game.scene.add(mana);
      this.game.manaPickups.push(mana);
    }
  }

  createManaPickup(x, y, z) {
    const geometry = new THREE.OctahedronGeometry(0.5, 0);
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff, emissive: 0xeeeeff });
    const mana = new THREE.Mesh(geometry, material);
    mana.position.set(x, y, z);
    mana.castShadow = true;
    mana.userData = {
      isPickup: true,
      points: 1,
      sickness: 5,
      vx: (Math.random() - 0.5) * 0.02,
      vz: (Math.random() - 0.5) * 0.02,
    };
    return mana;
  }

  createTile(centerX, centerZ) {
    const size = this.game.TILE_SIZE;
    const segments = 80;
    const geometry = new THREE.PlaneGeometry(size, size, segments, segments);
    const posAttr = geometry.getAttribute('position');
    const heights = [];
    let maxH = -Infinity,
      minH = Infinity;

    for (let i = 0; i < posAttr.count; i++) {
      const localX = posAttr.getX(i);
      const localY = posAttr.getY(i);
      const worldX = localX + centerX;
      const worldZ = -localY + centerZ;
      const h = this.game.getTerrainHeight(worldX, worldZ);
      posAttr.setZ(i, h);
      heights.push(h);
      if (h > maxH) maxH = h;
      if (h < minH) minH = h;
    }

    const range = maxH - minH || 1;
    const colorArray = [];
    const hasVariation = range > 0.01;
    // 4x4 Bayer ordered-dither matrix — jitters the height-band threshold so the
    // sand colours stipple/blend between bands instead of showing hard contour lines.
    const BAYER_4X4 = [
      [0, 8, 2, 10],
      [12, 4, 14, 6],
      [3, 11, 1, 9],
      [15, 7, 13, 5],
    ];
    // World-space dither cell size (smaller = finer stipple). Using world position
    // (not vertex index) keeps the pattern seamless across tile edges.
    const DITHER_CELL = 0.6;
    const DITHER_STRENGTH = 0.14; // how far the banding threshold can jitter
    for (let i = 0; i < heights.length; i++) {
      const worldX = posAttr.getX(i) + centerX;
      const worldZ = -posAttr.getY(i) + centerZ;
      const norm = hasVariation ? (heights[i] - minH) / range : 0.5; // Normalize height

      const bx = ((Math.floor(worldX / DITHER_CELL) % 4) + 4) % 4;
      const bz = ((Math.floor(worldZ / DITHER_CELL) % 4) + 4) % 4;
      const ditherOffset = (BAYER_4X4[bz][bx] / 16 - 0.5) * DITHER_STRENGTH;
      const dNorm = norm + ditherOffset;

      const c = new THREE.Color(); // Re-use the color object
      if (dNorm < 0.25) c.set(gameConfig.scene.colors.terrainColor1);
      else if (dNorm < 0.45) c.set(gameConfig.scene.colors.terrainColor2);
      else if (dNorm < 0.65) c.set(gameConfig.scene.colors.terrainColor3);
      else c.set(gameConfig.scene.colors.terrainColor4);
      colorArray.push(c.r, c.g, c.b); // Push the RGB components
    }

    geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(colorArray), 3));
    posAttr.needsUpdate = true;
    geometry.computeVertexNormals();

    const material = new THREE.MeshStandardMaterial({
      vertexColors: true,
      map: this.game.sandTexture,
      roughness: 0.95, // Sand is very matte
      metalness: 0.0,  // Sand is not metallic
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(centerX, 0, centerZ);
    mesh.receiveShadow = true;

    // Cache the height grid for fast getSurfaceHeight() lookups
    const gridSize = segments + 1;
    const tileGrid = { grid: heights, gridSize, segmentSize: size / segments, size, centerX, centerZ };
    const gx = Math.round(centerX / size);
    const gz = Math.round(centerZ / size);
    const key = `${gx},${gz}`;
    this.game.tileHeightGrids[key] = tileGrid;
    this.game.tiles[key] = mesh;
    this.game.scene.add(mesh);
  }

  createTent(x, y, z, rotationY) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = rotationY;

    const tentMaterial = new THREE.MeshLambertMaterial({
      color: 0xd2b48c, // Tan color
      side: THREE.DoubleSide,
    });

    const tentPoleMaterial = new THREE.MeshLambertMaterial({ color: 0x5a3f22 });

    // Main tent fabric
    const tentGeometry = new THREE.ConeGeometry(1.5, 2, 4, 1, true);
    const tentMesh = new THREE.Mesh(tentGeometry, tentMaterial);
    tentMesh.rotation.y = Math.PI / 4; // Align flat side forward
    tentMesh.position.y = 1;
    tentMesh.scale.z = 0.7; // Make it less deep
    tentMesh.castShadow = true;
    group.add(tentMesh);

    // Center pole
    const poleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2.2, 6);
    const pole = new THREE.Mesh(poleGeometry, tentPoleMaterial);
    pole.position.y = 1.1;
    group.add(pole);

    const tentColliderGeometry = new THREE.CylinderGeometry(1, 1, 2, 8);
    const tentColliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const tentCollider = new THREE.Mesh(tentColliderGeometry, tentColliderMaterial);
    tentCollider.position.set(x, y + 1, z);
    tentCollider.userData.isCollider = true;
    this.game.scene.add(tentCollider);
    this.game.obstacleColliders.push(tentCollider);
  }

  createSplitRock(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    const rockMaterial = new THREE.MeshLambertMaterial({ color: 0x555555 });
    const rockGeometry = new THREE.IcosahedronGeometry(6, 1);

    // Deform the geometry vertices for a more natural look
    const pos = rockGeometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const v = new THREE.Vector3().fromBufferAttribute(pos, i);
      v.multiplyScalar(1 + (Math.random() - 0.5) * 0.3);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    rockGeometry.computeVertexNormals();

    // Create two halves
    const rock1 = new THREE.Mesh(rockGeometry, rockMaterial);
    rock1.position.x = -0.4;
    rock1.rotation.set(0.1, 0.2, 0.3);
    rock1.castShadow = true;
    rock1.receiveShadow = true;
    group.add(rock1);

    const rock2 = rock1.clone();
    rock2.position.x = 0.4;
    rock2.rotation.set(-0.1, -0.2, -0.3);
    group.add(rock2);

    this.game.scenery.push(group);
    this.game.scene.add(group);

    // Add a collider
    const colliderGeometry = new THREE.CylinderGeometry(6, 6, 8, 12);
    const colliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const collider = new THREE.Mesh(colliderGeometry, colliderMaterial);
    collider.position.set(x, y + 4, z);
    collider.userData.isCollider = true;
    this.game.scene.add(collider);
    this.game.obstacleColliders.push(collider);
  }

  createTemple(x, y, z) {
    const group = new THREE.Group();
    group.position.set(x, y, z);

    const templeMaterial = new THREE.MeshLambertMaterial({ color: 0x997300 });
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x7a5c00 });

    // Base
    const baseGeometry = new THREE.BoxGeometry(12, 1, 12);
    const base = new THREE.Mesh(baseGeometry, templeMaterial);
    base.position.y = 0.5;
    base.receiveShadow = true;
    group.add(base);

    // Roof
    const roofGeometry = new THREE.BoxGeometry(13, 1, 13);
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 4.5;
    roof.castShadow = true;
    group.add(roof);

    // Pillars
    const pillarGeometry = new THREE.CylinderGeometry(0.4, 0.4, 3, 8);
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        if (i === 0 || i === 3 || j === 0 || j === 3) {
          const pillar = new THREE.Mesh(pillarGeometry, templeMaterial);
          pillar.position.set((i - 1.5) * 3, 2.5, (j - 1.5) * 3);
          pillar.castShadow = true;
          group.add(pillar);
        }
      }
    }

    // Courtyard Walls
    const wallGeometry = new THREE.BoxGeometry(18, 1.5, 0.5);
    const wallPositions = [
      { pos: [0, 0.75, 9], rot: 0 },
      { pos: [0, 0.75, -9], rot: 0 },
      { pos: [9, 0.75, 0], rot: Math.PI / 2 },
      { pos: [-9, 0.75, 0], rot: Math.PI / 2 },
    ];
    wallPositions.forEach(w => {
      const wall = new THREE.Mesh(wallGeometry, templeMaterial);
      wall.position.set(w.pos[0], w.pos[1], w.pos[2]);
      wall.rotation.y = w.rot;
      wall.castShadow = true;
      group.add(wall);
    });

    this.game.scenery.push(group);
    this.game.scene.add(group);

    // Add a collider for the whole temple area
    const colliderGeometry = new THREE.CylinderGeometry(9, 9, 4, 16);
    const colliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const collider = new THREE.Mesh(colliderGeometry, colliderMaterial);
    collider.position.set(x, y + 2, z);
    collider.userData.isCollider = true;
    this.game.scene.add(collider);
    this.game.obstacleColliders.push(collider);

    // Golden sparkles drifting up around the temple roof
    if (this.game.particleManager) {
      this.game.particleManager.createEmitter('sparkle', new THREE.Vector3(x, y + 5.5, z));
    }
  }

  createMarketStall(x, y, z, rotationY) {
    const group = new THREE.Group();
    group.position.set(x, y, z);
    group.rotation.y = rotationY;

    const woodMaterial = new THREE.MeshLambertMaterial({ color: 0x6b4423 });
    const clothMaterial = new THREE.MeshLambertMaterial({ color: 0xa03333 });

    // Table
    const tableTopGeo = new THREE.BoxGeometry(2, 0.2, 1);
    const tableTop = new THREE.Mesh(tableTopGeo, woodMaterial);
    tableTop.position.y = 0.8;
    tableTop.castShadow = true;
    group.add(tableTop);

    const legGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.8, 4);
    const legPositions = [
      { x: -0.8, z: 0.35 }, { x: 0.8, z: 0.35 },
      { x: -0.8, z: -0.35 }, { x: 0.8, z: -0.35 }
    ];
    legPositions.forEach(p => {
      const leg = new THREE.Mesh(legGeo, woodMaterial);
      leg.position.set(p.x, 0.4, p.z);
      leg.castShadow = true;
      group.add(leg);
    });

    // Awning
    const awningGeo = new THREE.PlaneGeometry(2.2, 1.2);
    const awning = new THREE.Mesh(awningGeo, clothMaterial);
    awning.position.set(0, 1.8, 0);
    awning.rotation.x = -0.2;
    awning.castShadow = true;
    group.add(awning);

    const colliderGeometry = new THREE.CylinderGeometry(1, 1, 2, 8);
    const colliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const collider = new THREE.Mesh(colliderGeometry, colliderMaterial);
    collider.position.set(x, y + 1, z);
    collider.userData.isCollider = true;
    this.game.scene.add(collider);
    this.game.obstacleColliders.push(collider);
  }
}