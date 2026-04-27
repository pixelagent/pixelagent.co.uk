/**
 * 3D Globe Starter - Main Application
 * Handles initialization, game loop, input, camera, UI, and player controller
 */

import * as THREE from './lib/three.module.js';
import { config } from './js/config.js';
import { scene, camera, renderer, loadingDiv, light, ambientLight } from './js/scene.js';
import { initWorld, stickPlayerToTerrain } from './js/world.js';
import { initPlayer, getPlayer, getMixer, getActions, setCurrentAction } from './js/player.js';

// ============================================
// Global State
// ============================================
let worldInitialized = false;
let playerInitialized = false;
let audioInitialized = false;
let assetsLoaded = false;

// Movement state
const keys = { 
  w: false, a: false, s: false, d: false, 
  up: false, down: false, left: false, right: false, 
  space: false 
};
let currentSpeed = 0;
let targetRotation = 0;
let isMoving = false;
let stillTimer = 0;

// Jump state
let verticalVelocity = 0;
let isGrounded = false;
const gravity = 980; // units per second^2
const jumpImpulse = 250;

// Camera state
let currentCamDistance = config.physics.camDistanceMoving;
let currentCamHeight = config.physics.camHeightMoving;
let targetCamPosition = new THREE.Vector3();
let orbitTime = 0;

// Audio
const bgMusic = document.getElementById('bg-music');

// Clock & FPS
const clock = new THREE.Clock();
let frameCount = 0;
let lastFpsUpdate = 0;

// ============================================
// Initialization
// ============================================
init();

function init() {
  // Initialize scene
  initWorld(scene);
  worldInitialized = true;

  // Initialize player models and animations
  initPlayer();
  playerInitialized = true;

  // Setup camera and renderer
  camera.position.set(0, config.physics.camHeightStill, config.physics.camDistanceStill);
  camera.far = 5000;
  camera.updateProjectionMatrix();

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Setup additional lighting
  light.position.set(50, 100, 50);
  light.castShadow = true;
  light.shadow.mapSize.width = 4096;
  light.shadow.mapSize.height = 4096;
  light.shadow.camera.near = 10;
  light.shadow.camera.far = 1000;
  light.shadow.camera.left = -300;
  light.shadow.camera.right = 300;
  light.shadow.camera.top = 300;
  light.shadow.camera.bottom = -300;
  light.shadow.bias = -0.0005;

  ambientLight.intensity = 0.4;
  scene.add(ambientLight);

  // Setup input handlers
  setupKeyboardInput();
  setupMouseWheelZoom();
  setupWindowResize();
  setupUIControls();

  // Populate UI
  populateChecklist();
  populateInventory();

  // Hide loading screen shortly (assets load async)
  setTimeout(() => {
    if (loadingDiv) {
      loadingDiv.style.transition = 'opacity 0.5s';
      loadingDiv.style.opacity = '0';
      setTimeout(() => loadingDiv.remove(), 600);
    }
    assetsLoaded = true;
  }, 2000);

  // Start animation loop
  animate();
}

// ============================================
// Input Handlers
// ============================================
function setupKeyboardInput() {
  window.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w' || key === 'arrowup') keys.w = true;
    if (key === 's' || key === 'arrowdown') keys.s = true;
    if (key === 'a' || key === 'arrowleft') keys.a = true;
    if (key === 'd' || key === 'arrowright') keys.d = true;
    if (key === ' ') { keys.space = true; e.preventDefault(); }
  });

  window.addEventListener('keyup', (e) => {
    const key = e.key.toLowerCase();
    if (key === 'w' || key === 'arrowup') keys.w = false;
    if (key === 's' || key === 'arrowdown') keys.s = false;
    if (key === 'a' || key === 'arrowleft') keys.a = false;
    if (key === 'd' || key === 'arrowright') keys.d = false;
    if (key === ' ') keys.space = false;
  });
}

function setupMouseWheelZoom() {
  window.addEventListener('wheel', (e) => {
    e.preventDefault();
    const zoomSpeed = 15;
    currentCamDistance += e.deltaY * 0.01 * zoomSpeed;
    currentCamDistance = THREE.MathUtils.clamp(
      currentCamDistance, 
      config.physics.camDistanceMin, 
      config.physics.camDistanceMax
    );
  }, { passive: false });
}

function setupWindowResize() {
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

function setupUIControls() {
  const audioBtn = document.getElementById('audio-btn');
  if (audioBtn) {
    audioBtn.addEventListener('click', toggleAudio);
  }
}

// ============================================
// UI Population
// ============================================
function populateChecklist() {
  const list = document.getElementById('tasks-list');
  if (!list || !config.tasks) return;
  list.innerHTML = '';
  config.tasks.forEach(task => {
    const li = document.createElement('li');
    li.textContent = `${task.name} (${task.current}/${task.total})`;
    li.id = `task-${task.name.replace(/\s/g, '-').toLowerCase()}`;
    list.appendChild(li);
  });
}

function populateInventory() {
  const list = document.getElementById('inventory-list');
  if (!list || !config.inventory) return;
  list.innerHTML = '';
  config.inventory.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} x${item.quantity}`;
    list.appendChild(li);
  });
}

// ============================================
// Audio
// ============================================
function initAudio() {
  if (audioInitialized) return;
  bgMusic.volume = 0.5;
  bgMusic.play().catch(() => {
    console.log('Audio autoplay blocked; waiting for interaction');
  });
  audioInitialized = true;
}

function toggleAudio() {
  if (bgMusic.paused) {
    bgMusic.play();
  } else {
    bgMusic.pause();
  }
}

// ============================================
// Player Movement & Animation
// ============================================
function updatePlayer(deltaTime) {
  const player = getPlayer();
  const mixer = getMixer();
  const actions = getActions();
  const { idleAction, walkAction, leftTurnAction, rightTurnAction } = actions;

  if (!player || !mixer) return;

  // Input
  let moveInput = 0;
  let turnInput = 0;
  if (keys.w) moveInput += 1;
  if (keys.s) moveInput -= 1;
  if (keys.a) turnInput += 1;
  if (keys.d) turnInput -= 1;

  // Acceleration / Deceleration
  const accel = config.physics.acceleration * deltaTime;
  const decel = config.physics.deceleration * deltaTime;
  const maxSpd = config.physics.maxSpeed;

  if (moveInput !== 0) {
    currentSpeed = THREE.MathUtils.clamp(
      currentSpeed + accel * moveInput,
      -maxSpd, maxSpd
    );
  } else {
    if (currentSpeed > 0) {
      currentSpeed = Math.max(0, currentSpeed - decel * deltaTime);
    } else if (currentSpeed < 0) {
      currentSpeed = Math.min(0, currentSpeed + decel * deltaTime);
    }
  }

  // Apply jump
  if (keys.space && isGrounded) {
    verticalVelocity = jumpImpulse;
    isGrounded = false;
  }

  // Gravity
  verticalVelocity -= gravity * deltaTime;
  player.position.y += verticalVelocity * deltaTime;

  // Ground check via raycast to terrain
  checkGrounded(player);

  // Position update
  if (Math.abs(currentSpeed) > 0.01) {
    const moveDist = currentSpeed * deltaTime;
    const forward = new THREE.Vector3(0, 0, 1).applyQuaternion(player.quaternion);
    player.position.addScaledVector(forward, moveDist);
  }

  // Rotation
  if (Math.abs(turnInput) > 0) {
    const rotAmt = config.physics.rotateSpeed * turnInput * deltaTime;
    targetRotation += rotAmt;
  }
  player.rotation.y = THREE.MathUtils.lerp(player.rotation.y, targetRotation, config.physics.turnLerpSpeed);

  // Keep on terrain
  stickPlayerToTerrain(player);

  // Animation selection
  updateAnimations(deltaTime, moveInput, turnInput, actions);

  // Update mixer
  mixer.update(deltaTime);

  // Still timer for orbit mode
  isMoving = Math.abs(currentSpeed) > config.animation.walkSpeedThreshold;
  stillTimer = isMoving ? 0 : stillTimer + deltaTime;
}

function checkGrounded(player) {
  // Simple ground check: raycast down from player feet
  const origin = player.position.clone();
  origin.y -= 10; // Slightly below center
  const raycaster = new THREE.Raycaster(origin, new THREE.Vector3(0, -1, 0), 0, 50);
  const hits = raycaster.intersectObject(scene, true);
  const validHits = hits.filter(h => !h.object.userData.isOutline);
  if (validHits.length > 0) {
    isGrounded = true;
    verticalVelocity = 0;
    // Snap to ground
    player.position.y = validHits[0].point.y + (player.geometry?.boundingBox?.max.y || 10);
  }
}

function updateAnimations(deltaTime, moveInput, turnInput, actions) {
  const { idleAction, walkAction, leftTurnAction, rightTurnAction, currentAction } = actions;
  if (!currentAction) return;

  // Jump animation trigger (played once)
  if (!isGrounded && currentAction !== actions.jumpAction) {
    // Could play jump if available
    // For now, just handle walk/turn/idle
  }

  // Turning takes priority when stationary
  if (turnInput !== 0 && !isMoving) {
    if (turnInput < 0 && currentAction !== rightTurnAction) {
      setCurrentAction(rightTurnAction);
      rightTurnAction.reset().play();
    } else if (turnInput > 0 && currentAction !== leftTurnAction) {
      setCurrentAction(leftTurnAction);
      leftTurnAction.reset().play();
    }
    return;
  }

  // Movement
  if (isMoving) {
    if (currentAction !== walkAction) {
      setCurrentAction(walkAction);
      walkAction.reset().play();
    }
    walkAction.timeScale = Math.abs(currentSpeed) / config.physics.maxSpeed * config.animation.walkTimeScaleMultiplier;
  } else {
    if (currentAction !== idleAction) {
      setCurrentAction(idleAction);
      idleAction.reset().play();
    }
  }
}

// ============================================
// Camera Follow
// ============================================
function updateCamera(deltaTime) {
  const player = getPlayer();
  if (!player) return;

  // Choose target distance/height based on movement/stillness
  const isStill = !isMoving && stillTimer > config.physics.orbitAfterSeconds;
  const baseDist = isStill ? config.physics.camDistanceStill : config.physics.camDistanceMoving;
  const baseHeight = isStill ? config.physics.camHeightStill : config.physics.camHeightMoving;

  // Apply user zoom offset (mouse wheel)
  const zoomOffset = currentCamDistance - config.physics.camDistanceMoving;
  const targetDist = baseDist + zoomOffset;

  // Smooth approach
  currentCamDistance = THREE.MathUtils.lerp(currentCamDistance, targetDist, config.physics.camLerpSpeed);
  currentCamHeight = THREE.MathUtils.lerp(currentCamHeight, baseHeight, config.physics.camLerpSpeed);

  // Compute ideal camera position behind player
  const dir = new THREE.Vector3(0, 0, 1).applyQuaternion(player.quaternion);
  const offset = dir.multiplyScalar(currentCamDistance);
  targetCamPosition.copy(player.position).add(offset);
  targetCamPosition.y += currentCamHeight;

  // Follow
  camera.position.lerp(targetCamPosition, config.physics.camLerpSpeed);
  camera.lookAt(player.position.x, player.position.y + 20, player.position.z);

  // Orbit mode
  if (isStill) {
    orbitTime += deltaTime * config.physics.orbitSpeed;
    const ox = Math.sin(orbitTime) * config.physics.orbitRadius;
    const oz = Math.cos(orbitTime) * config.physics.orbitRadius;
    const orbitPos = new THREE.Vector3(
      player.position.x + ox,
      player.position.y + config.physics.orbitHeight,
      player.position.z + oz
    );
    camera.position.lerp(orbitPos, 0.02);
  }
}

// ============================================
// Animation Loop
// ============================================
function animate() {
  requestAnimationFrame(animate);

  const deltaTime = clock.getDelta();

  if (worldInitialized && playerInitialized) {
    updatePlayer(deltaTime);
    updateCamera(deltaTime);
  }

  // FPS counter (debug)
  frameCount++;
  const now = performance.now();
  if (now - lastFpsUpdate >= 1000) {
    console.debug(`FPS: ${frameCount}`);
    frameCount = 0;
    lastFpsUpdate = now;
  }

  renderer.render(scene, camera);
}

// ============================================
// Cleanup
// ============================================
window.addEventListener('beforeunload', () => {
  if (bgMusic) {
    bgMusic.pause();
    bgMusic.currentTime = 0;
  }
});

console.log('3D Globe initialized - camera zoom via scroll wheel (min:'
  + config.physics.camDistanceMin + ', max:' + config.physics.camDistanceMax + ')');
