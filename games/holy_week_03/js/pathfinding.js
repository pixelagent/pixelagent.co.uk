/**
 * Pathfinding Module - A* algorithm and waypoint navigation
 */

import * as THREE from 'three';

/**
 * Waypoint Graph for NPC navigation
 */
export class WaypointGraph {
  constructor() {
    this.nodes = new Map(); // id -> WaypointNode
  }

  /**
   * Add a waypoint node
   * @param {string} id - Unique node identifier
   * @param {THREE.Vector3} position - World position
   * @param {string[]} connections - Array of connected node IDs
   */
  addNode(id, position, connections = []) {
    this.nodes.set(id, {
      id,
      position: position.clone(),
      connections: [...connections]
    });
  }

  /**
   * Connect two nodes bidirectionally
   * @param {string} idA
   * @param {string} idB
   */
  connect(idA, idB) {
    const nodeA = this.nodes.get(idA);
    const nodeB = this.nodes.get(idB);
    if (nodeA && nodeB) {
      if (!nodeA.connections.includes(idB)) nodeA.connections.push(idB);
      if (!nodeB.connections.includes(idA)) nodeB.connections.push(idA);
    }
  }

  /**
   * Get node by ID
   * @param {string} id
   * @returns {WaypointNode|null}
   */
  getNode(id) {
    return this.nodes.get(id) || null;
  }

  /**
   * Find nearest node to a position
   * @param {THREE.Vector3} position
   * @returns {WaypointNode|null}
   */
  findNearestNode(position) {
    let nearest = null;
    let minDist = Infinity;
    for (const node of this.nodes.values()) {
      const dist = node.position.distanceToSquared(position);
      if (dist < minDist) {
        minDist = dist;
        nearest = node;
      }
    }
    return nearest;
  }

  /**
   * Get distance between two nodes (for A* heuristic)
   * @param {string} idA
   * @param {string} idB
   * @returns {number}
   */
  getDistance(idA, idB) {
    const nodeA = this.nodes.get(idA);
    const nodeB = this.nodes.get(idB);
    if (!nodeA || !nodeB) return Infinity;
    return nodeA.position.distanceTo(nodeB.position);
  }
}

/**
 * A* Pathfinder
 */
export class Pathfinder {
  constructor(graph) {
    this.graph = graph;
  }

  /**
   * Find shortest path between two nodes using A*
   * @param {string} startId - Start node ID
   * @param {string} goalId - Goal node ID
   * @returns {string[]} Array of node IDs forming the path
   */
  findPath(startId, goalId) {
    const openSet = new Set([startId]);
    const closedSet = new Set();
    const cameFrom = new Map();
    const gScore = new Map(); // Cost from start
    const fScore = new Map(); // Estimated total cost

    gScore.set(startId, 0);
    fScore.set(startId, this.graph.getDistance(startId, goalId));

    while (openSet.size > 0) {
      // Find node in openSet with lowest fScore
      let current = null;
      let lowestF = Infinity;
      for (const id of openSet) {
        const f = fScore.get(id) || Infinity;
        if (f < lowestF) {
          lowestF = f;
          current = id;
        }
      }

      if (!current) break;

      if (current === goalId) {
        // Reconstruct path
        return this.reconstructPath(cameFrom, current);
      }

      openSet.delete(current);
      closedSet.add(current);

      const currentNode = this.graph.getNode(current);
      if (!currentNode) continue;

      for (const neighborId of currentNode.connections) {
        if (closedSet.has(neighborId)) continue;

        const tentativeG = (gScore.get(current) || 0) + 
                          this.graph.getDistance(current, neighborId);

        if (!openSet.has(neighborId)) {
          openSet.add(neighborId);
        } else if (tentativeG >= (gScore.get(neighborId) || Infinity)) {
          continue;
        }

        cameFrom.set(neighborId, current);
        gScore.set(neighborId, tentativeG);
        fScore.set(neighborId, tentativeG + this.graph.getDistance(neighborId, goalId));
      }
    }

    return []; // No path found
  }

  /**
   * Reconstruct path from cameFrom map
   * @param {Map} cameFrom
   * @param {string} current
   * @returns {string[]}
   */
  reconstructPath(cameFrom, current) {
    const path = [current];
    while (cameFrom.has(current)) {
      current = cameFrom.get(current);
      path.unshift(current);
    }
    return path;
  }

  /**
   * Convert node ID path to world positions
   * @param {string[]} nodePath
   * @returns {THREE.Vector3[]}
   */
  getPathPositions(nodePath) {
    return nodePath.map(id => {
      const node = this.graph.getNode(id);
      return node ? node.position.clone() : null;
    }).filter(p => p !== null);
  }
}

/**
 * Path Following Controller for NPCs
 */
export class PathFollower {
  constructor(npc, graph, speed = 1.0) {
    this.npc = npc;
    this.graph = graph;
    this.speed = speed;
    this.path = []; // Array of THREE.Vector3
    this.currentWaypointIndex = 0;
    this.isFollowing = false;
  }

  /**
   * Set a path to follow
   * @param {THREE.Vector3[]} pathPositions
   */
  setPath(pathPositions) {
    this.path = pathPositions;
    this.currentWaypointIndex = 0;
    this.isFollowing = pathPositions.length > 0;
  }

  /**
   * Set path using node IDs
   * @param {string[]} nodeIds
   */
  setPathFromNodeIds(nodeIds) {
    this.path = nodeIds.map(id => {
      const node = this.graph.getNode(id);
      return node ? node.position.clone() : null;
    }).filter(p => p !== null);
    this.currentWaypointIndex = 0;
    this.isFollowing = this.path.length > 0;
  }

  /**
   * Update NPC position along path
   * @param {number} deltaTime
   * @param {THREE.Vector3} planetCenter
   * @returns {THREE.Vector3|null} Movement delta or null if path complete
   */
  update(deltaTime, planetCenter) {
    if (!this.isFollowing || this.path.length === 0) {
      this.isFollowing = false;
      return null;
    }

    if (this.currentWaypointIndex >= this.path.length) {
      this.isFollowing = false;
      return null;
    }

    const currentPos = this.npc.mesh.position.clone();
    const targetPos = this.path[this.currentWaypointIndex].clone();

    // Project target onto sphere surface
    const toCenter = targetPos.clone().sub(planetCenter);
    const planetRadius = toCenter.length();
    toCenter.normalize();
    const surfaceTarget = planetCenter.clone().add(
      toCenter.multiplyScalar(planetRadius)
    );

    // Move toward target
    const direction = surfaceTarget.clone().sub(currentPos);
    const distance = direction.length();

    const arrivalThreshold = 0.5;
    if (distance < arrivalThreshold) {
      this.currentWaypointIndex++;
      if (this.currentWaypointIndex >= this.path.length) {
        this.isFollowing = false;
        return null;
      }
      return this.update(deltaTime, planetCenter); // Continue to next waypoint
    }

    direction.normalize();
    const moveDelta = direction.multiplyScalar(this.speed * deltaTime);
    
    // Constrain to sphere surface
    const newPos = currentPos.clone().add(moveDelta);
    const toNewCenter = newPos.clone().sub(planetCenter);
    toNewCenter.normalize().multiplyScalar(planetRadius);
    newPos.copy(planetCenter.clone().add(toNewCenter));

    this.npc.mesh.position.copy(newPos);

    // Orient NPC toward movement direction
    const tangentForward = new THREE.Vector3();
    let referenceUp = new THREE.Vector3(0, 1, 0);
    // Avoid degenerate cross-product when "up" is parallel to the radial direction
    // (NPC is crossing exactly over the north or south pole of the planet).
    if (Math.abs(toNewCenter.dot(referenceUp)) > 0.99) {
        referenceUp.set(0, 0, 1);
    }
    tangentForward.crossVectors(toNewCenter, referenceUp);
    if (tangentForward.lengthSq() > 0.0001) {
      const targetQuat = new THREE.Quaternion();
      targetQuat.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        tangentForward.normalize()
      );
      this.npc.mesh.quaternion.slerp(targetQuat, 5 * deltaTime);
    }

    return moveDelta;
  }

  /**
   * Stop following current path
   */
  stop() {
    this.isFollowing = false;
    this.path = [];
    this.currentWaypointIndex = 0;
  }

  /**
   * Check if still following path
   * @returns {boolean}
   */
  isActive() {
    return this.isFollowing && this.currentWaypointIndex < this.path.length;
  }
}
