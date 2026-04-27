import * as THREE from '../lib/three.module.js';
import { FBXLoader } from '../lib/FBXLoader.js';

let mixer, idleAction, walkAction, leftTurnAction, rightTurnAction, currentAction;
let player;

export function initPlayer() {
  const loader = new FBXLoader();
  loader.load('/assets/Idle.fbx', (fbx) => {
    player = fbx;
    player.scale.set(0.05, 0.05, 0.05);
    player.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    scene.add(player);

    mixer = new THREE.AnimationMixer(player);
    idleAction = mixer.clipAction(fbx.animations[0]);
    idleAction.play();
    currentAction = idleAction;

    loader.load('/assets/Walking.fbx', (fbx2) => {
      walkAction = mixer.clipAction(fbx2.animations[0]);

      loader.load('/assets/Left_Turn.fbx', (fbx3) => {
        leftTurnAction = mixer.clipAction(fbx3.animations[0]);
        leftTurnAction.loop = THREE.LoopOnce;
        leftTurnAction.clampWhenFinished = true;

        loader.load('/assets/Right_Turn.fbx', (fbx4) => {
          rightTurnAction = mixer.clipAction(fbx4.animations[0]);
          rightTurnAction.loop = THREE.LoopOnce;
          rightTurnAction.clampWhenFinished = true;

          player.position.set(0, 100, 0);
        });
      });
    });
  });
}

export function getPlayer() { return player; }
export function getMixer() { return mixer; }
export function getActions() { return { idleAction, walkAction, leftTurnAction, rightTurnAction, currentAction }; }
export function setCurrentAction(action) { currentAction = action; }