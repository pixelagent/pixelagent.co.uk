import * as THREE from 'three';
import * as CANNON from 'cannon';
import { SCENE, MODEL_SYSTEM, PRIMITIVE_CONFIG, COLORS } from './../config.js';

export class Player {
    constructor(world, scene, modelMgr, toonShader = null) {
        this.world = world;
        this.scene = scene;
        this.modelMgr = modelMgr;
        this.toonShader = toonShader;
        this.planetR = 100;
        this.canJump = true;
        this.wasGrounded = false;
        this.camHeading = new THREE.Vector3(0, 0, 1);
        this.trailParticles = [];

        this.setupPhysics();
        this.setupMesh();
        this.setupTorch();
    }
 

    setupPhysics() {
        this.pBody = new CANNON.Body({
            mass: 1,
            shape: new CANNON.Box(new CANNON.Vec3(0.5, 1, 0.5)),
            fixedRotation: true,
            linearDamping: 0.3 // Increased to stop movement when input ends
        });
        this.pBody.position.set(0, this.planetR + 10, 0);
        this.world.addBody(this.pBody);
    }

setupMesh() {
        this.playerMesh = new THREE.Group();

        if (this.modelMgr && this.modelMgr.system === 'glb') {
            // Use GLB model with toon materials
            const playerModel = this.modelMgr.getModel('player');
            if (playerModel) {
                const clonedModel = playerModel.clone();
                // Update materials to toon
                clonedModel.traverse((child) => {
                 if (child.isMesh && child.material) {
                        child.material = this.toonShader.createToonMaterial(PRIMITIVE_CONFIG.player.color);
                        // Store reference to main body material for VFX
                        if (!this.bodyMaterial) {
                            this.bodyMaterial = child.material;
                        }
                    }
                });
                this.playerMesh.add(clonedModel);
            } else {
             // Fallback to capsule mesh instead of box
             const geometry = new THREE.CapsuleGeometry(0.5, 1.6, 4, 8);
             const material = new THREE.MeshToonMaterial({ color: PRIMITIVE_CONFIG.player.color });
             const mesh = new THREE.Mesh(geometry, material);
             this.playerMesh.add(mesh);
             this.bodyMaterial = material;
            }
        } else {
            // Use capsule mesh instead of box for toon shader
            const geometry = new THREE.CapsuleGeometry(0.5, 1.6, 4, 8);
            const toonGroup = this.toonShader.createToonGroup(geometry, PRIMITIVE_CONFIG.player.color, 0.05);
            this.playerMesh.add(toonGroup.group);
            // Store reference to main body material for VFX
            this.bodyMaterial = toonGroup.mainMesh.material;
        }

        // Scale/position adjustment if needed
        this.playerMesh.scale.set(1, 1, 1);

        // Ensure player casts shadows
        this.playerMesh.traverse((child) => {
            if (child.isMesh) {
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });

        this.scene.add(this.playerMesh);
    }

     setupTorch() {
        // Adjust torch intensity based on model system
        const baseIntensity = MODEL_SYSTEM === 'glb' ? SCENE.torchIntensityNightGLB : SCENE.torchIntensityNightPrimitive;

        // Create torch light with proper range for area lighting
        this.torch = new THREE.PointLight(
            SCENE.torchColor,
            0, // Start at 0 (day mode)
            SCENE.torchDistance,
            SCENE.torchDecay
        );
        this.torch.position.set(0, 1.5, 1); // Position in front of player, above center
        // Torch should NOT cast shadows onto the player - it's an ambient light source
        // Shadows from torch cause self-shadowing artifacts on the player mesh
        this.torch.castShadow = false;
        this.playerMesh.add(this.torch);

        // Store the target intensity for night mode on the torch object
        this.torch.targetIntensity = baseIntensity;

         // Also add a subtle emissive effect to the player material for torch visibility
         if (this.bodyMaterial) {
             // Store original emissive for restoration
             this.originalEmissive = this.bodyMaterial.emissive ? this.bodyMaterial.emissive.clone() : new THREE.Color(COLORS.black);
         }

        // Debug: Confirm torch creation
        console.log('Torch created for', MODEL_SYSTEM, 'mode:', {
            targetIntensity: this.torch.targetIntensity,
            distance: this.torch.distance,
            decay: this.torch.decay,
            color: this.torch.color.getHex()
        });
    }

    getPosition() {
        return new THREE.Vector3().copy(this.pBody.position);
    }

    getVelocity() {
        return new THREE.Vector3().copy(this.pBody.velocity);
    }

    getRotation() {
        const up = this.getPosition().clone().normalize();
        return up;
    }

    applyMovement(moveDir) {
        const pPos = this.getPosition();
        const up = pPos.clone().normalize();

        if (moveDir.lengthSq() > 0) {
            moveDir.normalize();
            const speed = 18;

            // Preserve radial (upward) velocity so jumping isn't interrupted by horizontal movement
            const radialVel = this.pBody.velocity.dot(new CANNON.Vec3(up.x, up.y, up.z));

            this.pBody.velocity.set(
                moveDir.x * speed + up.x * radialVel,
                moveDir.y * speed + up.y * radialVel,
                moveDir.z * speed + up.z * radialVel
            );
        } else {
            // Stop horizontal velocity when no input
            const vel = this.pBody.velocity;
            const upVec = new THREE.Vector3(up.x, up.y, up.z);
            const hVel = new THREE.Vector3(vel.x, vel.y, vel.z);
            const horizontalVel = hVel.projectOnPlane(upVec);
            // Remove horizontal component, keep only radial velocity
            this.pBody.velocity.set(
                up.x * hVel.dot(upVec),
                up.y * hVel.dot(upVec),
                up.z * hVel.dot(upVec)
            );
        }
    }

    update(deltaTime = 1 / 60) {
        // Apply gravity (towards planet center)
        const pPos = this.getPosition();
        const up = pPos.clone().normalize();

        // Apply a constant downward force towards the planet center
        const gravity = new CANNON.Vec3(up.x * -75, up.y * -75, up.z * -75);
        this.pBody.applyForce(gravity, this.pBody.position);

        // Ground check for jump and landing detection
        const isGrounded = pPos.length() < this.planetR + 1.6;
        if (isGrounded && !this.wasGrounded) {
            // Just landed - emit event for decal system
            window.dispatchEvent(new CustomEvent('playerLand', {
                detail: { position: pPos.clone(), up: up.clone() }
            }));
        }
        this.wasGrounded = isGrounded;
        this.canJump = isGrounded;

        // Sync mesh to physics body
        this.playerMesh.position.copy(pPos);
        this.playerMesh.up.copy(up);
        this.playerMesh.lookAt(
            pPos.clone().add(this.camHeading.clone().projectOnPlane(up).normalize())
        );
    }

    jump() {
        if (this.canJump) {
            const up = this.getPosition().clone().normalize();
            this.pBody.wakeUp();
            this.pBody.applyImpulse(
                new CANNON.Vec3(up.x * 15, up.y * 15, up.z * 15),
                this.pBody.position
            );
            this.canJump = false;
            this.wasGrounded = true; // Mark as having been on ground to trigger 'land' later
            return true;
        }
        return false;
    }

    sleep() {
        this.pBody.sleep();
    }

    wakeUp() {
        this.pBody.wakeUp();
        this.pBody.velocity.set(0, 0, 0);
    }

    resetTarget() {
        this.pBody.velocity.set(0, 0, 0);
    }






    updateTrail(dt = 1/60) {
        // Update trail particles (fade and remove)
        for (let i = this.trailParticles.length - 1; i >= 0; i--) {
            const p = this.trailParticles[i];
            p.life -= dt * 0.015; // Slow fade rate
            const scale = Math.max(0.1, p.life); // Prevent negative scaling
            p.mesh.scale.setScalar(scale);
            p.mesh.material.opacity = Math.max(0, p.life);

            if (p.life <= 0) {
                this.scene.remove(p.mesh);
                // Dispose of geometry and material to free memory
                if (p.mesh.geometry) p.mesh.geometry.dispose();
                if (p.mesh.material) p.mesh.material.dispose();
                this.trailParticles.splice(i, 1);
            }
        }
    }

}
