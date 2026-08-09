/**
 * Collider Module - Collision detection and trigger volumes
 */

import * as THREE from 'three';

/**
 * Collider types
 * @readonly
 * @enum {string}
 */
export const ColliderType = {
  SPHERE: 'sphere',
  BOX: 'box',
  CAPSULE: 'capsule',
  MESH: 'mesh'
};

/**
 * Collision shape base class
 */
export class CollisionShape {
  /**
   * @param {ColliderType} type
   * @param {THREE.Vector3} position
   * @param {THREE.Quaternion} rotation
   */
  constructor(type, position, rotation) {
    this.type = type;
    this.position = position || new THREE.Vector3();
    this.rotation = rotation || new THREE.Quaternion();
    this.userData = {};
  }

  /**
   * Check if a point is inside this collider
   * @param {THREE.Vector3} point
   * @returns {boolean}
   */
  containsPoint(point) {
    return false;
  }

  /**
   * Check collision with another collider
   * @param {CollisionShape} other
   * @returns {boolean}
   */
  collidesWith(other) {
    return false;
  }
}

/**
 * Sphere Collider
 */
export class SphereCollider extends CollisionShape {
  /**
   * @param {number} radius
   * @param {THREE.Vector3} position
   */
  constructor(radius, position) {
    super(ColliderType.SPHERE, position);
    this.radius = radius;
  }

  containsPoint(point) {
    return this.position.distanceTo(point) <= this.radius;
  }

  collidesWith(other) {
    switch (other.type) {
      case ColliderType.SPHERE:
        return this.position.distanceTo(other.position) <= (this.radius + other.radius);
      case ColliderType.BOX:
        return this._sphereBoxCollision(other);
      case ColliderType.CAPSULE:
        return this._sphereCapsuleCollision(other);
      default:
        return false;
    }
  }

  /**
   * Sphere vs Box collision (AABB)
   * @param {BoxCollider} box
   * @returns {boolean}
   */
  _sphereBoxCollision(box) {
    // Find closest point on box to sphere center
    const closest = new THREE.Vector3();
    closest.copy(this.position);
    
    // Clamp to box bounds
    const half = box.halfSize;
    const min = new THREE.Vector3().copy(box.position).sub(half);
    const max = new THREE.Vector3().copy(box.position).add(half);
    
    closest.x = Math.max(min.x, Math.min(max.x, closest.x));
    closest.y = Math.max(min.y, Math.min(max.y, closest.y));
    closest.z = Math.max(min.z, Math.min(max.z, closest.z));
    
    return this.position.distanceTo(closest) <= this.radius;
  }

  /**
   * Sphere vs Capsule collision
   * @param {CapsuleCollider} capsule
   * @returns {boolean}
   */
  _sphereCapsuleCollision(capsule) {
    // Find closest point on capsule segment to sphere center
    const capsuleDir = capsule.end.clone().sub(capsule.start);
    const toSphere = this.position.clone().sub(capsule.start);
    const t = Math.max(0, Math.min(1, toSphere.dot(capsuleDir) / capsuleDir.lengthSq()));
    
    const closest = capsule.start.clone().add(capsuleDir.multiplyScalar(t));
    return this.position.distanceTo(closest) <= (this.radius + capsule.radius);
  }
}

/**
 * Box Collider (AABB - Axis Aligned Bounding Box)
 */
export class BoxCollider extends CollisionShape {
  /**
   * @param {THREE.Vector3} halfSize - Half extents (width/2, height/2, depth/2)
   * @param {THREE.Vector3} position
   * @param {THREE.Quaternion} rotation
   */
  constructor(halfSize, position, rotation) {
    super(ColliderType.BOX, position, rotation);
    this.halfSize = halfSize || new THREE.Vector3(0.5, 0.5, 0.5);
    this.min = new THREE.Vector3();
    this.max = new THREE.Vector3();
    this._updateBounds();
  }

  _updateBounds() {
    this.min.copy(this.position).sub(this.halfSize);
    this.max.copy(this.position).add(this.halfSize);
  }

  containsPoint(point) {
    return point.x >= this.min.x && point.x <= this.max.x &&
           point.y >= this.min.y && point.y <= this.max.y &&
           point.z >= this.min.z && point.z <= this.max.z;
  }

  collidesWith(other) {
    switch (other.type) {
      case ColliderType.SPHERE:
        return other.collidesWith(this); // Reverse and use sphere's implementation
      case ColliderType.BOX:
        return this._boxBoxCollision(other);
      case ColliderType.CAPSULE:
        // Approximate: check sphere collision against all capsule points
        return this._boxCapsuleCollision(other);
      default:
        return false;
    }
  }

  /**
   * AABB vs AABB collision
   * @param {BoxCollider} other
   * @returns {boolean}
   */
  _boxBoxCollision(other) {
    return this.min.x <= other.max.x && this.max.x >= other.min.x &&
           this.min.y <= other.max.y && this.max.y >= other.min.y &&
           this.min.z <= other.max.z && this.max.z >= other.min.z;
  }

  /**
   * Box vs Capsule collision (approximation)
   * @param {CapsuleCollider} capsule
   * @returns {boolean}
   */
  _boxCapsuleCollision(capsule) {
    // Sample points along capsule and check box collision
    const steps = 8;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const point = capsule.start.clone().lerp(capsule.end, t);
      if (this.containsPoint(point)) {
        return true;
      }
    }
    return false;
  }
}

/**
 * Capsule Collider
 */
export class CapsuleCollider extends CollisionShape {
  /**
   * @param {THREE.Vector3} start - Start of capsule
   * @param {THREE.Vector3} end - End of capsule
   * @param {number} radius
   * @param {THREE.Quaternion} rotation
   */
  constructor(start, end, radius, rotation) {
    super(ColliderType.CAPSULE, start, rotation);
    this.start = start.clone();
    this.end = end.clone();
    this.radius = radius;
  }

  get length() {
    return this.start.distanceTo(this.end);
  }

  containsPoint(point) {
    // Project point onto capsule line segment
    const capsuleDir = this.end.clone().sub(this.start);
    const lengthSq = capsuleDir.lengthSq();
    if (lengthSq === 0) {
      return point.distanceTo(this.start) <= this.radius;
    }
    
    const t = Math.max(0, Math.min(1, 
      point.clone().sub(this.start).dot(capsuleDir) / lengthSq
    ));
    const projection = this.start.clone().add(capsuleDir.multiplyScalar(t));
    return point.distanceTo(projection) <= this.radius;
  }

  collidesWith(other) {
    switch (other.type) {
      case ColliderType.SPHERE:
        return other.collidesWith(this);
      case ColliderType.BOX:
        return other.collidesWith(this);
      case ColliderType.CAPSULE:
        return this._capsuleCapsuleCollision(other);
      default:
        return false;
    }
  }

  /**
   * Capsule vs Capsule collision
   * @param {CapsuleCollider} other
   * @returns {boolean}
   */
  _capsuleCapsuleCollision(other) {
    // Simplified: check distance between segments
    const closest1 = this._closestPointOnSegment(this.start, this.end, other.start);
    const closest2 = this._closestPointOnSegment(other.start, other.end, closest1);
    const dist = closest1.distanceTo(closest2);
    return dist <= (this.radius + other.radius);
  }

  /**
   * Find closest point on segment to a point
   * @param {THREE.Vector3} segStart
   * @param {THREE.Vector3} segEnd
   * @param {THREE.Vector3} point
   * @returns {THREE.Vector3}
   */
  _closestPointOnSegment(segStart, segEnd, point) {
    const segVec = segEnd.clone().sub(segStart);
    const segLenSq = segVec.lengthSq();
    if (segLenSq === 0) return segStart.clone();
    
    const t = Math.max(0, Math.min(1,
      point.clone().sub(segStart).dot(segVec) / segLenSq
    ));
    return segStart.clone().add(segVec.multiplyScalar(t));
  }
}

/**
 * Trigger Volume - Special collider that fires events
 */
export class Trigger {
  /**
   * @param {CollisionShape} shape
   * @param {string} type - Trigger type (e.g., 'area', 'quest', 'location')
   * @param {string} value - Identifier for the trigger
   */
  constructor(shape, type, value) {
    this.shape = shape;
    this.type = type;
    this.value = value;
    this.isActive = false;
    this.triggeredObjects = new Set();
  }

  /**
   * Check if an object is inside the trigger
   * @param {THREE.Vector3|CollisionShape} object - Position or collider
   * @returns {boolean}
   */
  contains(object) {
    if (object instanceof CollisionShape) {
      return this.shape.collidesWith(object);
    } else if (object instanceof THREE.Vector3) {
      return this.shape.containsPoint(object);
    }
    return false;
  }
}

/**
 * Collision Manager - Handles all collision checks
 */
export class CollisionManager {
  constructor() {
    this.colliders = [];
    this.triggers = [];
    this.objectColliders = new Map(); // object -> [colliders]
  }

  /**
   * Register a collider for an object
   * @param {Object} object - The object to track
   * @param {CollisionShape|CollisionShape[]} collider
   */
  register(object, collider) {
    const colliders = Array.isArray(collider) ? collider : [collider];
    this.objectColliders.set(object, colliders);
    this.colliders.push(...colliders);
  }

  /**
   * Unregister an object's colliders
   * @param {Object} object
   */
  unregister(object) {
    const colliders = this.objectColliders.get(object);
    if (colliders) {
      this.colliders = this.colliders.filter(c => !colliders.includes(c));
      this.objectColliders.delete(object);
    }
  }

  /**
   * Add a trigger volume
   * @param {Trigger} trigger
   */
  addTrigger(trigger) {
    this.triggers.push(trigger);
  }

  /**
   * Remove a trigger volume
   * @param {Trigger} trigger
   */
  removeTrigger(trigger) {
    this.triggers = this.triggers.filter(t => t !== trigger);
  }

  /**
   * Check collisions for an object
   * @param {Object} object
   * @returns {Object[]} Array of colliding objects
   */
  checkCollisions(object) {
    const colliders = this.objectColliders.get(object);
    if (!colliders || colliders.length === 0) return [];

    const collisions = [];
    for (const [otherObject, otherColliders] of this.objectColliders) {
      if (otherObject === object) continue;

      for (const col of colliders) {
        for (const otherCol of otherColliders) {
          if (col.collidesWith(otherCol)) {
            collisions.push(otherObject);
            break;
          }
        }
      }
    }
    return collisions;
  }

  /**
   * Check if point collides with any collider
   * @param {THREE.Vector3} point
   * @returns {boolean}
   */
  checkPointCollision(point) {
    for (const collider of this.colliders) {
      if (collider.containsPoint(point)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Update all triggers and fire events
   */
  updateTriggers() {
    for (const trigger of this.triggers) {
      const currentlyTriggered = new Set();

      // Check objects
      for (const [object, colliders] of this.objectColliders) {
        for (const collider of colliders) {
          if (trigger.contains(collider)) {
            currentlyTriggered.add(object);
            break;
          }
        }
      }

      // Check previously triggered objects
      for (const obj of trigger.triggeredObjects) {
        if (!currentlyTriggered.has(obj)) {
          // Exit event
          this._fireEvent(trigger, 'exit', obj);
        }
      }

      // Check newly triggered objects
      for (const obj of currentlyTriggered) {
        if (!trigger.triggeredObjects.has(obj)) {
          // Enter event
          this._fireEvent(trigger, 'enter', obj);
        }
      }

      trigger.triggeredObjects = currentlyTriggered;
    }
  }

   /**
    * Flush all tracked collision and trigger data.
    * Call this explicitly from the LevelManager / WorldManager before loading
    * a new level scene.  Without this call, this.colliders / this.triggers /
    * this.objectColliders retain dangling references to Three.js groups that
    * have been `scene.remove()`-d, causing both a memory leak and needless O(n)
    * collision checks against dead objects.
    */
   clearOldColliders() {
    this.colliders = [];
    this.triggers = [];
    this.objectColliders.clear();
    console.log("Stale collision tree references flushed successfully.");
  }

  /**
   * Alias for clearOldColliders — used by LevelManager to purge stale
   * collision state between level transitions.
   */
  clearLevelColliders() {
    this.clearOldColliders();
  }

  /**
   * Fire trigger event
   * @param {Trigger} trigger
   * @param {string} action - 'enter' or 'exit'
   * @param {Object} object
   */
  _fireEvent(trigger, action, object) {
    const event = new CustomEvent(`trigger${action.charAt(0).toUpperCase() + action.slice(1)}`, {
      detail: {
        trigger,
        object,
        type: trigger.type,
        value: trigger.value
      }
    });
    document.dispatchEvent(event);
  }
}
