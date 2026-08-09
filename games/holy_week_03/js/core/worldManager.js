import * as THREE from 'three';
import * as CANNON from 'cannon';
import { MODEL_SCALES, COLORS, PRIMITIVE_CONFIG } from '../config.js';

export class WorldManager {
    constructor(scene, world, modelMgr = null, toonShader = null, playerBody = null) {
        this.scene = scene;
        this.world = world;
        this.modelMgr = modelMgr;
        this.toonShader = toonShader;
        this.planetR = 100; // Doubled world size
        this.planet = null;
        this.planetMesh = null; // The actual mesh for decal operations
        this.pickups = [];
        this.buildings = [];
        this.crystalClusters = [];
        this.relayTowers = [];
        this.rocks = [];
        this._playerBody = playerBody; // protected reference — never removed by clearCurrentWorld

        this.setupPlanet();
        this.setupPickups();
        this.setupBuildings();
        this.setupCrystalClusters();
        this.setupRelayTowers();
        this.setupRocks();
    }

    setupRocks() {
        for (let i = 0; i < 15; i++) {
            const pos = new THREE.Vector3().setFromSphericalCoords(this.planetR + 2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            let rockMesh;

            if (this.modelMgr && this.modelMgr.system === 'glb') {
                const model = this.modelMgr.getModel('rocks');
                if (model && model.children.length > 0) {
                    const m = model.children[0].clone();
                    m.material = this.toonShader.createToonMaterial(COLORS.gray);
                    m.position.copy(pos);
                    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
                    this.scene.add(m);
                    rockMesh = m;
                } else {
                    const rockToon = this.toonShader.createToonGroup(
                        new THREE.BoxGeometry(2, 4, 2),
                        PRIMITIVE_CONFIG.rocks.color,
                        0.12
                    );
                    rockToon.group.position.copy(pos);
                    rockToon.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
                    this.scene.add(rockToon.group);
                    rockMesh = rockToon.group;
                }
            } else {
                const rockToon = this.toonShader.createToonGroup(
                    new THREE.BoxGeometry(2, 4, 2),
                    PRIMITIVE_CONFIG.rocks.color,
                    0.12
                );
                rockToon.group.position.copy(pos);
                rockToon.group.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
                this.scene.add(rockToon.group);
                rockMesh = rockToon.group;
            }

            // Add physics body for collision
            const body = new CANNON.Body({
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(1, 2, 1))
            });
            body.position.copy(pos);
            body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.random() * Math.PI * 2);
            this.world.addBody(body);

            this.rocks.push(rockMesh);
        }
    }

    setupPlanet() {
        if (this.modelMgr && this.modelMgr.system === 'glb') {
            const planetModel = this.modelMgr.getModel('planet');
            if (planetModel) {
                // Clone the model to avoid modifying the cached version
                const clonedPlanet = planetModel.clone();

                // Ensure materials can receive lighting
                clonedPlanet.traverse((child) => {
                    if (child.isMesh) {
                        // Store the mesh for decal operations
                        if (!this.planetMesh) {
                            this.planetMesh = child;
                        }

                        // Ensure material can receive shadows and lighting
                        if (child.material) {
                            child.material.needsUpdate = true;
                            child.receiveShadow = true;
                            child.castShadow = true; // Planet can also cast shadows in some cases

                            // For GLB materials, ensure they work with our lights
                            if (child.material.isMeshStandardMaterial || child.material.isMeshPhysicalMaterial) {
                                // These materials should work with lighting by default
                            }
                        }
                    }
                });

                // Apply scale if specified
                const scale = MODEL_SCALES.planet || 1;
                clonedPlanet.scale.setScalar(scale);

                this.planet = clonedPlanet;
                this.scene.add(clonedPlanet);

                // Ensure planet receives shadows
                clonedPlanet.traverse((child) => {
                    if (child.isMesh) {
                        child.receiveShadow = true;
                    }
                });
                console.log('Planet GLB loaded:', clonedPlanet);
            } else {
                console.warn('Planet GLB model not found, falling back to primitive');
                // Fallback to primitive
                const planetToon = this.toonShader.createToonGroup(
                    new THREE.IcosahedronGeometry(this.planetR, 5),
                    PRIMITIVE_CONFIG.planet.color,
                    0.005
                );
                this.planet = planetToon.mainMesh;
                this.planetMesh = planetToon.mainMesh;
                this.scene.add(planetToon.group);
            }
        } else {
            // Use toon shader for planet
            const planetToon = this.toonShader.createToonGroup(
                new THREE.IcosahedronGeometry(this.planetR, 5),
                COLORS.green,
                0.005 // Small outline for planet
            );
            this.planet = planetToon.mainMesh;
            this.planetMesh = planetToon.mainMesh; // Store for decals
            this.scene.add(planetToon.group);

            // Ensure toon planet receives shadows
            planetToon.mainMesh.receiveShadow = true;
        }

        this.world.addBody(new CANNON.Body({
            mass: 0,
            shape: new CANNON.Sphere(this.planetR)
        }));
    }

    setupPickups() {
        // Data Cells (orange spheres) - 4
        for (let i = 0; i < 4; i++) {
            let pickupGroup;
            if (this.modelMgr && this.modelMgr.system === 'glb') {
                const model = this.modelMgr.getModel('pickupCell');
                if (model && model.children.length > 0) {
                    const m = model.children[0].clone();
                    m.material = this.toonShader.createToonMaterial(COLORS.orange);
                    m.name = `CELL_${i + 1}`;
                    m.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                    this.toonShader.updateShadowSettings(m);
                    this.scene.add(m);
                    this.pickups.push(m);
                } else {
                    pickupGroup = this.toonShader.createToonGroup(
                        new THREE.SphereGeometry(1),
                        COLORS.green,
                        0.12
                    );
                    pickupGroup.group.name = `CELL_${i + 1}`;
                    pickupGroup.group.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                    this.scene.add(pickupGroup.group);
                    this.pickups.push(pickupGroup.group);
                }
            } else {
                pickupGroup = this.toonShader.createToonGroup(
                    new THREE.SphereGeometry(1),
                    COLORS.green,
                    0.12
                );
                pickupGroup.group.name = `CELL_${i + 1}`;
                pickupGroup.group.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                this.scene.add(pickupGroup.group);
                this.pickups.push(pickupGroup.group);
            }
        }

        // Signal Shards (purple octahedrons) - 4
        for (let i = 0; i < 4; i++) {
            let pickupGroup;
            if (this.modelMgr && this.modelMgr.system === 'glb') {
                const model = this.modelMgr.getModel('pickupShard');
                if (model && model.children.length > 0) {
                    const m = model.children[0].clone();
                    m.material = this.toonShader.createToonMaterial(COLORS.shard, { emissive: COLORS.shardEmissive });
                    m.name = `SHARD_${i + 1}`;
                    m.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                    this.toonShader.updateShadowSettings(m);
                    this.scene.add(m);
                    this.pickups.push(m);
                } else {
                    pickupGroup = this.toonShader.createToonGroup(
                        new THREE.OctahedronGeometry(0.9),
                        COLORS.shard,
                        0.12,
                        { emissive: COLORS.shardEmissive }
                    );
                    pickupGroup.group.name = `SHARD_${i + 1}`;
                    pickupGroup.group.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                    this.scene.add(pickupGroup.group);
                    this.pickups.push(pickupGroup.group);
                }
            } else {
                pickupGroup = this.toonShader.createToonGroup(
                    new THREE.OctahedronGeometry(0.9),
                    COLORS.shard,
                    0.12,
                    { emissive: COLORS.shardEmissive }
                );
                pickupGroup.group.name = `SHARD_${i + 1}`;
                pickupGroup.group.position.setFromSphericalCoords(this.planetR + 1.2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
                this.scene.add(pickupGroup.group);
                this.pickups.push(pickupGroup.group);
            }
        }
    }

    setupBuildings() {
        for (let i = 0; i < 8; i++) {
            const h = Math.random() * 6 + 2;
            let buildingGroup;
            if (this.modelMgr && this.modelMgr.system === 'glb') {
                const model = this.modelMgr.getModel('tower');
                if (model && model.children.length > 0) {
                    const m = model.clone();
                    // Update materials to toon and enable shadows
                    m.traverse((child) => {
                        if (child.isMesh && child.material) {
                            child.material = this.toonShader.createToonMaterial(COLORS.blue);
                            child.castShadow = true;
                            child.receiveShadow = true;
                        }
                    });
                    buildingGroup = m;
                } else {
                    buildingGroup = this.toonShader.createToonGroup(
                        new THREE.BoxGeometry(3, h, 3),
                        COLORS.blue,
                        0.05
                    ).group;
                }
            } else {
                buildingGroup = this.toonShader.createToonGroup(
                    new THREE.BoxGeometry(3, h, 3),
                    COLORS.blue,
                    0.05
                ).group;
            }
            const pos = new THREE.Vector3().setFromSphericalCoords(this.planetR + h / 2, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            buildingGroup.position.copy(pos);
            buildingGroup.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
            this.scene.add(buildingGroup);

            const body = new CANNON.Body({
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(1.5, h / 2, 1.5))
            });
            body.position.copy(pos);
            body.quaternion.copy(buildingGroup.quaternion);
            this.world.addBody(body);

            this.buildings.push(buildingGroup);
        }
    }

    setupCrystalClusters() {
        for (let i = 0; i < 15; i++) {
            const pos = new THREE.Vector3().setFromSphericalCoords(this.planetR, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            const cluster = new THREE.Group();
            const count = Math.floor(Math.random() * 4) + 2;

            for (let j = 0; j < count; j++) {
                const crystalToon = this.toonShader.createToonGroup(
                    new THREE.ConeGeometry(0.8, 4 + Math.random() * 3, 5),
                    COLORS.cyan,
                    0.08,
                    { emissive: COLORS.crystalEmissive, transparent: true, opacity: 0.9 }
                );
                crystalToon.group.position.set((Math.random() - 0.5) * 2, 2, (Math.random() - 0.5) * 2);
                crystalToon.group.rotation.set((Math.random() - 0.5) * 0.6, Math.random() * Math.PI, (Math.random() - 0.5) * 0.6);
                cluster.add(crystalToon.group);
            }

            cluster.position.copy(pos);
            cluster.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
            this.scene.add(cluster);
            this.crystalClusters.push(cluster);
        }
    }

    setupRelayTowers() {
        for (let i = 0; i < 6; i++) {
            const pos = new THREE.Vector3().setFromSphericalCoords(this.planetR, Math.random() * Math.PI, Math.random() * Math.PI * 2);
            const tower = new THREE.Group();

            // Base with toon shader
            const baseToon = this.toonShader.createToonGroup(
                new THREE.CylinderGeometry(1.5, 2, 10, 8),
                COLORS.blue,
                0.05
            );
            baseToon.group.position.y = 5;
            tower.add(baseToon.group);

            // Orb (use basic material for glow effect)
            const orb = new THREE.Mesh(
                new THREE.SphereGeometry(1.5),
                new THREE.MeshStandardMaterial({ color: COLORS.orange, emissive: COLORS.brown })
            );
            orb.position.y = 11;
            orb.castShadow = true;
            tower.add(orb);

            // Ring (keep basic material for visibility)
            const ring = new THREE.Mesh(
                new THREE.TorusGeometry(3.5, 0.2, 8, 24),
                new THREE.MeshBasicMaterial({ color: COLORS.green })
            );
            ring.position.y = 8;
            ring.rotation.x = Math.PI / 2;
            tower.add(ring);

            tower.position.copy(pos);
            tower.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
            this.scene.add(tower);

            const body = new CANNON.Body({
                mass: 0,
                shape: new CANNON.Box(new CANNON.Vec3(1.5, 5, 1.5))
            });
            body.position.copy(pos);
            body.quaternion.copy(tower.quaternion);
            this.world.addBody(body);

            this.relayTowers.push(tower);
        }
    }

    updatePickupCollection(playerPosition, onPickup) {
        for (let i = this.pickups.length - 1; i >= 0; i--) {
            if (playerPosition.distanceTo(this.pickups[i].position) < 3) {
                const itemName = this.pickups[i].name;
                this.scene.remove(this.pickups[i]);
                this.pickups.splice(i, 1);
                if (onPickup) onPickup(itemName);
            }
        }
    }

    getClosestNonDialogueNPC(playerPosition) {
        return null;
    }

    // Add these methods inside your WorldManager class in worldManager.js

    clearCurrentWorld() {
        // 1. Remove and dispose of pickup item meshes
        this.pickups.forEach(p => this.scene.remove(p));
        this.pickups = [];

        // 2. Clear out any custom level buildings or decorative rocks
        this.rocks.forEach(r => {
            this.scene.remove(r);
            if (r.geometry) r.geometry.dispose();
            if (r.material) r.material.dispose();
        });
        this.rocks = [];

        // 3. Clear the environment model mesh if it exists
        if (this.environmentMesh) {
            this.scene.remove(this.environmentMesh);
            this.environmentMesh = null;
        }

        // 4. Clean out DYNAMIC non-player physics bodies from the Cannon world
        // _playerBody reference is injected by Player setup — must never be removed
        if (this.world && this.world.bodies) {
            for (let i = this.world.bodies.length - 1; i >= 0; i--) {
                const body = this.world.bodies[i];

                // Skip the player body and the planet body at all times
                if (body === this._playerBody) continue;
                if (body.mass === 0) continue;   // static / planet

                this.world.bodies.splice(i, 1);
                this.world.removeBody(body);
            }
        }
    }

    setupLevelEnvironment(modelPath) {
        // Dynamically request the specific GLB file using your ModelManager
        if (this.modelMgr && this.modelMgr.system === 'glb') {
            this.modelMgr.loadSpecificGLB(modelPath, (loadedModel) => {
                this.environmentMesh = loadedModel.clone();
                this.scene.add(this.environmentMesh);
                // Apply standard lighting modifications here...
            }); // Properly closing the arrow function and method call
        }
    }

    spawnLevelAssets(levelData) {
        // Spawn level-specific evidence item tokens or parables
        levelData.evidence.forEach(evData => {
            this.createItemToken(evData);
        });

        // Re-initialize or tell NPCSystem to render the specific active NPCs
    }

    /** Create one evidence-item token mesh and add it to the scene + pickups array. */
    createItemToken(evData) {
        const TOKEN_COLORS = [COLORS.orange, COLORS.cyan, COLORS.green, COLORS.yellow];

        const color = TOKEN_COLORS[Math.abs(this._hashString(evData.id)) % TOKEN_COLORS.length];
        const tokenToon = this.toonShader.createToonGroup(
            new THREE.BoxGeometry(1.2, 1.2, 1.2),
            color,
            0.08
        );
        tokenToon.group.name = evData.id;
        tokenToon.group.position.set(evData.position.x, evData.position.y, evData.position.z);
        this.scene.add(tokenToon.group);
        this.pickups.push(tokenToon.group);
    }

    _hashString(s) {
        let h = 0;
        for (let i = 0; i < s.length; i++) {
            h = ((h << 5) - h) + s.charCodeAt(i);
            h |= 0;
        }
        return h;
    }
}
