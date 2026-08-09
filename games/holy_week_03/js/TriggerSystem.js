/**
 * TriggerSystem - Auto-binding trigger system for Three.js scenes
 * Parses object names from Blender (TRIGGER_Type_Data) and attaches behaviour
 */

import * as THREE from '../lib/three.module.js';
import { COLORS } from './../config.js';

/**
 * Parse Blender-style name: PREFIX_Type_Value[_param=value]
 * Examples:
 *   TRIGGER_PlaceName_TownSquare
 *   TRIGGER_QuestComplete_FindSword_radius=5
 *   NPC_Blacksmith_IntroDialogue_dialogue=blacksmith_intro
 */
export function parseName(name) {
  const parts = name.split('_');

  const result = {
    category: parts[0] || '',
    type: parts[1] || '',
    value: parts[2] || ''
  };

  // Parse optional parameters: key=value
  const paramRegex = /(\w+)=([\w.]+)/g;
  let match;
  while ((match = paramRegex.exec(name)) !== null) {
    const key = match[1];
    const val = match[2];
    result[key] = isNaN(val) ? val : Number(val);
  }

  return result;
}

/**
 * TriggerSystem manages all trigger objects in the scene
 */
export class TriggerSystem {
  constructor(scene, options = {}) {
    this.scene = scene;
    this.triggers = [];
    this.debugMode = options.debugMode || false;
    this.debugObjects = [];
  }

  /**
   * Scan scene for named objects and auto-bind triggers
   */
  scanAndBind() {
    if (!this.scene) return;

    this.scene.traverse((obj) => {
      if (!obj.name) return;

      if (obj.name.startsWith('TRIGGER_')) {
        this.bindTrigger(obj);
      }
    });

    console.log(`[TriggerSystem] Bound ${this.triggers.length} trigger(s)`);
  }

  /**
   * Bind a trigger to a scene object
   */
  bindTrigger(obj) {
    const data = parseName(obj.name);

    const trigger = {
      object: obj,
      category: data.category,
      type: data.type,
      value: data.value,
      radius: data.radius || 3,
      once: data.once || false,
      active: false,
      fired: false
    };

    this.triggers.push(trigger);

    if (this.debugMode) {
      this._createDebugVisual(trigger);
    }

    // Also check userData for overrides
    if (obj.userData.triggerRadius !== undefined) {
      trigger.radius = obj.userData.triggerRadius;
    }
    if (obj.userData.triggerOnce !== undefined) {
      trigger.once = obj.userData.triggerOnce;
    }
  }

  /**
   * Create debug sphere visualization for trigger zone
   */
  _createDebugVisual(trigger) {
    const geometry = new THREE.SphereGeometry(trigger.radius, 16, 16);
    const material = new THREE.MeshBasicMaterial({
      color: COLORS.green,
      transparent: true,
      opacity: 0.15,
      wireframe: true,
      depthTest: false
    });
    const sphere = new THREE.Mesh(geometry, material);
    sphere.position.copy(trigger.object.position);
    this.scene.add(sphere);
    this.debugObjects.push(sphere);

    // Add wireframe at trigger boundary
    const wireGeometry = new THREE.SphereGeometry(trigger.radius, 16, 16);
    const wireMaterial = new THREE.LineBasicMaterial({
      color: COLORS.green,
      transparent: true,
      opacity: 0.3
    });
    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(wireGeometry),
      wireMaterial
    );
    wireframe.position.copy(trigger.object.position);
    this.scene.add(wireframe);
    this.debugObjects.push(wireframe);
  }

  /**
   * Update all triggers based on player position
   */
  update(playerPosition) {
    if (!playerPosition || this.triggers.length === 0) return;

    this.triggers.forEach((trigger) => {
      // Skip if already fired and is one-shot
      if (trigger.fired && trigger.once) return;

      const dist = trigger.object.position.distanceTo(playerPosition);

      if (dist < trigger.radius && !trigger.active) {
        trigger.active = true;
        this._fireTrigger(trigger);

        if (trigger.once) {
          trigger.fired = true;
        }
      } else if (dist >= trigger.radius && trigger.active) {
        trigger.active = false;
        this._exitTrigger(trigger);
      }
    });
  }

  /**
   * Fire trigger action
   */
  _fireTrigger(trigger) {
    console.log(`[Trigger] Fired: ${trigger.type} - ${trigger.value}`);

    const event = new CustomEvent('triggerEnter', {
      detail: { trigger }
    });
    document.dispatchEvent(event);

    switch (trigger.type) {
      case 'PlaceName':
        this._showPlaceName(trigger.value);
        break;

      case 'QuestStart':
      case 'QuestBegin':
        this._startQuest(trigger.value);
        break;

      case 'QuestComplete':
      case 'QuestFinish':
        this._completeQuest(trigger.value);
        break;

      case 'Checkpoint':
        this._activateCheckpoint(trigger.value);
        break;

      case 'AreaEnter':
      case 'Enter':
        this._enterArea(trigger.value);
        break;

      case 'AreaExit':
      case 'Exit':
        this._exitArea(trigger.value);
        break;

      case 'Cutscene':
        this._playCutscene(trigger.value);
        break;

      case 'Sound':
      case 'SFX':
        this._playSound(trigger.value);
        break;

      case 'Collect':
      case 'Item':
        this._collectItem(trigger.value);
        break;

      default:
        console.log(`[Trigger] Unhandled type: ${trigger.type}`);
        break;
    }
  }

  /**
   * Trigger exit action
   */
  _exitTrigger(trigger) {
    const event = new CustomEvent('triggerExit', {
      detail: { trigger }
    });
    document.dispatchEvent(event);
  }

  // ── Trigger Actions ──────────────────────────────────────────────────────

  _showPlaceName(name) {
    const event = new CustomEvent('placeNameShow', { detail: { name } });
    document.dispatchEvent(event);
  }

  _startQuest(questId) {
    const event = new CustomEvent('questStart', { detail: { questId } });
    document.dispatchEvent(event);
  }

  _completeQuest(questId) {
    const event = new CustomEvent('questComplete', { detail: { questId } });
    document.dispatchEvent(event);
  }

  _activateCheckpoint(checkpointId) {
    const event = new CustomEvent('checkpointActivate', { detail: { checkpointId } });
    document.dispatchEvent(event);
  }

  _enterArea(areaName) {
    const event = new CustomEvent('areaEnter', { detail: { areaName } });
    document.dispatchEvent(event);
  }

  _exitArea(areaName) {
    const event = new CustomEvent('areaExit', { detail: { areaName } });
    document.dispatchEvent(event);
  }

  _playCutscene(cutsceneId) {
    const event = new CustomEvent('cutscenePlay', { detail: { cutsceneId } });
    document.dispatchEvent(event);
  }

  _playSound(soundId) {
    const event = new CustomEvent('sfxPlay', { detail: { soundId } });
    document.dispatchEvent(event);
  }

  _collectItem(itemId) {
    const event = new CustomEvent('itemCollect', { detail: { itemId } });
    document.dispatchEvent(event);
  }

  /**
   * Manually add a trigger
   */
  addTrigger(object, type, value, options = {}) {
    const trigger = {
      object,
      category: 'TRIGGER',
      type,
      value,
      radius: options.radius || 3,
      once: options.once || false,
      active: false,
      fired: false
    };
    this.triggers.push(trigger);
    return trigger;
  }

  /**
   * Get all triggers
   */
  getTriggers() {
    return this.triggers;
  }

  /**
   * Get active triggers
   */
  getActiveTriggers() {
    return this.triggers.filter(t => t.active);
  }

  /**
   * Clean up debug visuals
   */
  dispose() {
    this.debugObjects.forEach(obj => {
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) obj.material.dispose();
      if (obj.parent) obj.parent.remove(obj);
    });
    this.debugObjects = [];
  }
}
