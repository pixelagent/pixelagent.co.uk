import * as THREE from 'three';
import { NPC_PAD } from './config.js';

export class NPC {
    constructor(data, planetR, scene, modelMgr, toonShader = null) {
        this.data = data;
        this.planetR = planetR;
        this.scene = scene;
        this.modelMgr = modelMgr;
        this.toonShader = toonShader;
        this.mesh = null;
        this.bodyMesh = null; // Reference to mesh that bobs
        this.createMesh();
    }

    createMesh() {
        const grp = new THREE.Group();

        // 1. Build Base Shading / Pad layout attachments...
        // Base Pad with toon shader
        const padToon = this.toonShader.createToonGroup(
            new THREE.CylinderGeometry(2.5, 2.5, 0.2, 16),
            NPC_PAD.baseColor,
            0.05,
            { emissive: NPC_PAD.emissive }
        );
        grp.add(padToon.group);

        // NPC Body: use ModelManager if GLB system, else primitive
        if (this.modelMgr && this.modelMgr.system === 'glb') {
            const modelKey = this.getModelKey();
            const npcModel = this.modelMgr.getModel(modelKey);
            if (npcModel) {
                const clonedModel = npcModel.clone();
                // Update materials to toon
                clonedModel.traverse((child) => {
                    if (child.isMesh && child.material) {
                        child.material = this.toonShader.createToonMaterial(this.data.color);
                    }
                });
                grp.add(clonedModel);

                // Assume the first mesh in the model is the body for bobbing
                this.bodyMesh = clonedModel.children[0];
                if (this.bodyMesh) {
                    // Store original Y offset for bobbing
                    this.bodyMesh.userData.originalY = this.bodyMesh.position.y;
                }
            } else {
                // Fallback to capsule + head sphere
                this.bodyMesh = this.buildCapsuleBody(grp);
            }
        } else {
            // Primitive fallback with toon shader: capsule body + head sphere
            this.bodyMesh = this.buildCapsuleBody(grp);
        }

        // 2. Resolve flat Cartesian / legacy spherical position
        // The world is a planet (radius this.planetR). Grid/scene data is authored
        // in small flat Cartesian coords (x, 0, z), so project those onto the
        // planet surface near the player's spawn pole (north pole) — otherwise the
        // NPC would be buried at the planet's centre and never visible.
        if (this.data.isGridNPC || (this.data.pos && this.data.pos.length === 3)) {
            const x = this.data.pos[0];
            const z = this.data.pos[2];
            // Treat (x, planetR, z) as a direction and project onto the surface.
            const dir = new THREE.Vector3(x, this.planetR, z).normalize();
            const surfPos = dir.multiplyScalar(this.planetR);
            grp.position.copy(surfPos);
            grp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), surfPos.clone().normalize());
        } else if (this.data.position) {
            // Explicitly format direct transform positions from case layout - Cartesian coords
            grp.position.set(this.data.position.x, this.data.position.y + 1, this.data.position.z);
            // Normalize to planet radius and orient
            const pos = grp.position.clone().normalize().multiplyScalar(this.planetR);
            grp.position.copy(pos);
            const upVector = pos.clone().normalize();
            grp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), upVector);
        } else if (this.data.pos && this.data.pos.length >= 2) {
            // Legacy normalized spherical coordinate arrays [phi, theta]
            const p = new THREE.Vector3().setFromSphericalCoords(
                this.planetR,
                this.data.pos[0] * Math.PI,
                this.data.pos[1] * Math.PI * 2
            );
            grp.position.copy(p);
            grp.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), p.clone().normalize());
        }

        this.scene.add(grp);
        this.mesh = grp;
    }

    /**
     * Builds a capsule body (radius 1, length 2) plus a head sphere on top,
     * both shaded with the toon shader. Returns the body mesh reference used
     * for bobbing. The whole body group is parented to `grp`.
     */
    buildCapsuleBody(grp) {
        const bodyGroup = new THREE.Group();
        bodyGroup.position.y = 1.5;

        // Capsule body
        const bodyToon = this.toonShader.createToonGroup(
            new THREE.CapsuleGeometry(1, 2),
            this.data.color,
            0.1
        );
        bodyToon.mainMesh.userData.originalY = 0; // bodyGroup holds the y offset
        bodyGroup.add(bodyToon.group);

        // Head sphere (sits atop the capsule)
        const headToon = this.toonShader.createToonGroup(
            new THREE.SphereGeometry(0.8, 16, 16),
            this.data.color,
            0.1
        );
        headToon.group.position.y = 2.2;
        bodyGroup.add(headToon.group);

        grp.add(bodyGroup);
        return bodyToon.mainMesh;
    }

    getModelKey() {
        // Map NPC IDs to model keys matching MODELS config (camelCase)
        const idMap = {
            1: 'npcEcho',
            2: 'npcHorizon',
            3: 'npcSpire',
            4: 'npcKeeper'
        };
        return idMap[this.data.id] || 'npcEcho';
    }

    updateBobbing() {
        if (this.bodyMesh) {
            const originalY = this.bodyMesh.userData.originalY || 1.5;
            this.bodyMesh.position.y = originalY + Math.sin(Date.now() * 0.002 + this.data.id) * 0.2;
        }
    }

    getWorldPosition() {
        return this.mesh.position;
    }

    getScreenPosition(camera, planetR) {
        const pPos = this.getWorldPosition();
        // NPCs live on the planet surface — offset the label along the surface normal.
        const up = pPos.clone().normalize();
        return pPos.clone().add(up.clone().multiplyScalar(5)).project(camera);
    }
}
