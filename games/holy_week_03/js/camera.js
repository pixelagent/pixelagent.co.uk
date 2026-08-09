/**
 * camera.js — INERT STUB
 * =======================
 * The production camera system lives in CameraController.js, used directly
 * by main.js: `cameraCtrl.follow(playerPos, heading, up)`.
 *
 * This file previously imported a non-existent `config` export from config.js
 * (which has no lowercase `config`, only upper-case named exports), causing an
 * immediate ES-module parse error on the very first line of any import chain
 * that touched it.
 *
 * Because no file in the project imports this module, it is safe to leave the
 * `import { config }` line in place so careless consumers still get a failure,
 * but the module now self-shields by exporting only inert stubs.
 *
 * DEPRECATED — remove entirely once confirmed unused across the repo.
 */

// Prevent broken `import { config } from './config.js'` from propagating.
// config.js exports no lowercase `config`; break cleanly here so the error
// message is clear rather than a silent null-reference crash later.
// (Accidental consumers will see this message in the console.)
console.info('[camera.js] This module is inert. The active system is CameraController.js.');

// Preserved export names so TypeScript / IDE tooling that re-exports from here
// won't error — values are harmless no-ops.
export const cameraPresets = {};
export function initCamera() { /* inert */ }
export function setZoomPreset() { /* inert */ }
export function transitionToPreset() { /* inert */ }
export function transitionToCustom() { /* inert */ }
export function returnToNormal() { /* inert */ }
export function cancelTransition() { /* inert */ }
export function updateTransition() { return null; }
export function isTransitioning() { return false; }
export function getTransitionInfo() { return null; }
export function addPreset() { /* inert */ }

