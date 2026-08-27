import * as THREE from 'three';
import { GameState } from './GameState.js';
import { config as gameConfig } from './config.js';

// Rotate a horizontal (x,z) vector around the Y axis by `angle` radians, then re-normalize.
function rotateHeadingY(vec, angle) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const x = vec.x * cos + vec.z * sin;
  const z = -vec.x * sin + vec.z * cos;
  vec.x = x;
  vec.z = z;
  vec.normalize();
}

export class PlayerManager {
  constructor(game) {
    this.game = game;
    this.player = null;
    this.animationTime = 0;
    this.dustEmitter = null;
    this.velocityY = 0;   // vertical velocity for jumping
    this.jumpOffset = 0;  // current height above the ground while airborne
    this.isJumping = false;
  }

  createPlayer() {
    const group = new THREE.Group();

    const dressGeometry = new THREE.CylinderGeometry(0.42, 0.4, 0.5, 8);
    const dressMaterial = new THREE.MeshPhongMaterial({ color: GameState.player.dressColor });
    const dress = new THREE.Mesh(dressGeometry, dressMaterial);
    dress.position.y = 0.1;
    dress.castShadow = true;
    dress.userData = { isDress: true };
    group.add(dress);

    const bodyGeometry = new THREE.SphereGeometry(0.35, 8, 8);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: GameState.player.bodyColor });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.scale.set(1, 1.1, 0.9);
    body.position.y = 0.35;
    body.castShadow = true;
    group.add(body);

    const headGeometry = new THREE.SphereGeometry(0.28, 8, 8);
    const headMaterial = new THREE.MeshPhongMaterial({ color: GameState.player.headColor });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.y = 0.95;
    head.castShadow = true;
    group.add(head);

    const eyeGeometry = new THREE.SphereGeometry(0.12, 6, 6);
    const eyeWhiteMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
    const leftEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
    leftEye.position.set(-0.12, 1.05, 0.2);
    group.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeometry, eyeWhiteMaterial);
    rightEye.position.set(0.12, 1.05, 0.2);
    group.add(rightEye);

    const pupilGeometry = new THREE.SphereGeometry(0.06, 4, 4);
    const pupilMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
    const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    leftPupil.position.set(-0.12, 1.05, 0.28);
    group.add(leftPupil);

    const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
    rightPupil.position.set(0.12, 1.05, 0.28);
    group.add(rightPupil);

    const leftFoot = new THREE.Mesh(eyeGeometry, pupilMaterial);
    leftFoot.position.set(-0.15, 0.08, 0.15);
    leftFoot.userData = { isLeftFoot: true };
    group.add(leftFoot);

    const rightFoot = new THREE.Mesh(eyeGeometry, pupilMaterial);
    rightFoot.position.set(0.15, 0.08, 0.15);
    rightFoot.userData = { isRightFoot: true };
    group.add(rightFoot);

    group.position.set(0, 0, 0);
    this.player = group;
    return this.player;
  }

  updatePlayerAppearance() {
    if (!this.player || !this.game) return;
    const oldPosition = this.player.position.clone();
    const oldRotation = this.player.quaternion.clone();

    // If dust trail is active, destroy it before replacing the player object
    if (this.dustEmitter) {
      this.game.particleManager.stopEmitter(this.dustEmitter, false);
      this.dustEmitter = null;
    }

    this.game.scene.remove(this.player);
    this.player = this.createPlayer();
    this.player.position.copy(oldPosition);
    this.player.quaternion.copy(oldRotation);
    this.game.scene.add(this.player);
    // Keep Game's player reference in sync — the camera and other systems read
    // `game.player`, so a stale reference here would make the camera follow the
    // old (removed) group instead of the visible one.
    this.game.player = this.player;
  }

  update() {
    if (!this.player) return;

    this.animationTime++;
    this.handleMovement();
    this.animateBob();
    this.handleDustTrail();
    this.checkCollisions();
  }

  handleMovement() {
    const settings = this.game.getDifficultySettings();
    const heading = this.game.cameraHeading; // persistent horizontal facing (Vector3)
    const Y = new THREE.Vector3(0, 1, 0);

    const isMovingWithKeys = this.game.input.up || this.game.input.down || this.game.input.left || this.game.input.right;
    if (isMovingWithKeys) {
      // Steering: left/right yaw the heading at a controlled rate. This is stable (no
      // camera-relative feedback loop that made the view spin when strafing).
      const turn = gameConfig.player.turnSpeed;
      if (this.game.input.left) rotateHeadingY(heading, turn);
      if (this.game.input.right) rotateHeadingY(heading, -turn);

      const moveDir = new THREE.Vector3();
      if (this.game.input.up) moveDir.add(heading);
      if (this.game.input.down) moveDir.sub(heading);

      // Face the heading when steering in place, otherwise face the move direction.
      const faceDir = moveDir.length() > 0 ? moveDir.clone().normalize() : heading.clone().normalize();
      const targetAngle = Math.atan2(faceDir.x, faceDir.z);
      const targetQuaternion = new THREE.Quaternion().setFromAxisAngle(Y, targetAngle);
      this.player.quaternion.slerp(targetQuaternion, gameConfig.player.rotateSpeed);

      if (moveDir.length() > 0) {
        moveDir.normalize();
        this.player.position.add(moveDir.multiplyScalar(settings.moveSpeed));

        this.game.clickTarget = null;
        GameState.player.position.x = this.player.position.x;
        GameState.player.position.y = this.player.position.y;
        GameState.player.position.z = this.player.position.z;
        this.game.drainHealthFromMovement(settings);
      }

      this.game.cameraHeading.copy(heading).normalize();
    } else if (this.game.clickTarget) {
      const clickDir = new THREE.Vector3().subVectors(this.game.clickTarget, this.player.position);
      const clickDist = clickDir.length();
      const step = Math.min(settings.moveSpeed, clickDist);
      if (clickDist > 0) clickDir.normalize();

      this.player.position.add(clickDir.multiplyScalar(step));
      const targetAngle = Math.atan2(clickDir.x, clickDir.z);
      const targetQuaternion = new THREE.Quaternion().setFromAxisAngle(Y, targetAngle);
      this.player.quaternion.slerp(targetQuaternion, gameConfig.player.rotateSpeed);
      this.game.cameraHeading.copy(clickDir);
      this.player.rotation.y = Math.atan2(clickDir.x, clickDir.z);
      if (clickDist <= step + 0.1) {
        this.game.clickTarget = null;
      }
      this.game.drainHealthFromMovement(settings);
    }
  }

  jump() {
    if (this.isJumping) return; // ignore if already airborne
    this.isJumping = true;
    this.velocityY = gameConfig.player.jumpVelocity;
  }

  animateBob() {
    const t = this.animationTime;
    const isMoving = this.game.input.up || this.game.input.down || this.game.input.left || this.game.input.right || (this.game.clickTarget && this.player.position.distanceTo(this.game.clickTarget) > 0.2);

    // Calculate the desired Y position based on the actual rendered terrain mesh
    // (raycast, not the analytic noise function) so the player never floats or sinks
    // relative to what's visually on screen.
    const groundY = this.game.getSurfaceHeight(this.player.position.x, this.player.position.z);
    let bobOffset = 0;
    if (isMoving) {
      bobOffset = Math.sin(t * gameConfig.player.bob.speed) * gameConfig.player.bob.amount;
    } else {
      bobOffset = Math.sin(t * gameConfig.player.idle.speed) * gameConfig.player.idle.amount;
    }

    // Jump arc: integrate vertical velocity with gravity; land back on the ground.
    if (this.isJumping) {
      this.jumpOffset += this.velocityY;
      this.velocityY -= gameConfig.player.gravity;
      if (this.jumpOffset <= 0) {
        this.jumpOffset = 0;
        this.velocityY = 0;
        this.isJumping = false;
      }
    }

    this.player.position.y = groundY + 0.25 + this.jumpOffset + bobOffset; // standing offset + jump + bob
  }

  handleDustTrail() {
    if (!this.game.particleManager) return;

    // Emit a trail while the player is walking OR airborne (jumping).
    const isWalking = this.game.input.up || this.game.input.down || this.game.input.left || this.game.input.right || this.game.clickTarget;
    const isMoving = isWalking || this.isJumping;

    if (isMoving && !this.dustEmitter) {
      // Player started moving / jumping, create the dust trail and attach it to the player model
      this.dustEmitter = this.game.particleManager.createEmitter('dust', this.player);
    } else if (!isMoving && this.dustEmitter) {
      // Player stopped, gracefully stop the emitter and clean up
      this.game.particleManager.stopEmitter(this.dustEmitter, true);
      this.dustEmitter = null;
    }
  }

  checkCollisions() {
    const playerRadius = 0.4; // Approximate player radius, based on dress geometry
    this.game.obstacleColliders.forEach((collider) => {
      const colliderPosition = collider.position;
      const playerPosition = this.player.position;
      let collisionRadius = 0;

      if (collider.geometry instanceof THREE.SphereGeometry) {
        collisionRadius = playerRadius + collider.geometry.parameters.radius;
      } else if (collider.geometry instanceof THREE.CylinderGeometry) {
        collisionRadius = playerRadius + collider.geometry.parameters.radiusTop;
      } else {
        return; // Unsupported collider type
      }

      // Use 2D distance for collision check on the XZ plane
      const dx = playerPosition.x - colliderPosition.x;
      const dz = playerPosition.z - colliderPosition.z;
      const dist = Math.sqrt(dx * dx + dz * dz);

      if (dist < collisionRadius) {
        const overlap = collisionRadius - dist;
        const pushDir = new THREE.Vector3(dx, 0, dz).normalize();
        this.player.position.add(pushDir.multiplyScalar(overlap));
      }
    });
  }
}