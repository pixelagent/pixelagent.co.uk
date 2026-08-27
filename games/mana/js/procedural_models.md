# Procedurally Generated 3D Models

The following JavaScript functions can be added to `js/SceneManager.js` to procedurally generate the requested 3D models using Three.js. This method is efficient and keeps all model generation logic within the game's codebase.

Each function is designed to be self-contained, creating the visual mesh and a corresponding invisible collider for physics interactions.

---

### 1. Campsite Tent

This function creates a simple A-frame tent. It can be called multiple times around the existing campfire to create a more complete campsite.

```javascript
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

    this.game.scene.add(group);

    // Add a collider for the tent
    const tentColliderGeometry = new THREE.CylinderGeometry(1, 1, 2, 8);
    const tentColliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const tentCollider = new THREE.Mesh(tentColliderGeometry, tentColliderMaterial);
    tentCollider.position.set(x, y + 1, z);
    tentCollider.userData.isCollider = true;
    this.game.scene.add(tentCollider);
    this.game.obstacleColliders.push(tentCollider);
  }
```

**Example Usage (in `createLandscape`):**
```javascript
// In SceneManager.js, inside createLandscape()
if (loc.name === 'Camp') {
    this.createCampfire(loc.pos[0] + 2, locY, loc.pos[2] - 2);
    // Add some tents
    this.createTent(loc.pos[0] - 2, locY, loc.pos[2] + 1, Math.PI / 4);
    this.createTent(loc.pos[0] + 1, locY, loc.pos[2] + 3, -Math.PI / 3);
}
```

---

### 2. Large Rock Split Down the Middle

This function creates a large boulder that appears to be split in two. It achieves this by creating two slightly deformed rock meshes and placing them close together.

```javascript
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
```

---

### 3. Temple with a Courtyard

This generates a simple, single-story temple structure with pillars and a surrounding courtyard wall.

```javascript
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

    this.game.scene.add(group);

    // Add a collider for the whole temple area
    const colliderGeometry = new THREE.BoxGeometry(18, 4, 18);
    const colliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const collider = new THREE.Mesh(colliderGeometry, colliderMaterial);
    collider.position.set(x, y + 2, z);
    collider.userData.isCollider = true;
    this.game.scene.add(collider);
    this.game.obstacleColliders.push(collider);
  }
```

---

### 4. Market Stall

This function creates a single market stall with a table and an awning. It can be called multiple times to create a bustling market area.

```javascript
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

    this.game.scene.add(group);

    // Add a collider
    const colliderGeometry = new THREE.BoxGeometry(2, 2, 1);
    const colliderMaterial = new THREE.MeshBasicMaterial({ visible: false });
    const collider = new THREE.Mesh(colliderGeometry, colliderMaterial);
    collider.position.set(0, 1, 0); // Local position
    group.add(collider); // Add to group to inherit transforms
    collider.userData.isCollider = true;
    this.game.obstacleColliders.push(collider);
  }
```