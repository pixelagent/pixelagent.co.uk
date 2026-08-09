import { NPC } from '../NPC.js';

export class NPCSystem {
  constructor(npcData, planetR, scene, modelMgr, toonShader) {
    this.npcStates = {};
    this.npcMeshes = [];
    this._activeNPC = null;
    this.planetR = planetR;
    this.scene = scene;
    this.modelMgr = modelMgr;
    this.toonShader = toonShader;
  }

  async loadNPCs(npcs) {
    for (const npc of npcs || []) {
      if (!npc) continue;
      const npcMesh = new NPC(
        npc,
        this.planetR,
        this.scene,
        this.modelMgr,
        this.toonShader
      );
      this.npcMeshes.push(npcMesh);
      this.npcStates[npc.id] = {
        mood: "neutral",
        pressureLevel: 0,
        contradictions: [],
        memory: [],
        hasFailedChallenge: false,
        correctedLies: [],
        isSuspect: npc.isSuspect || false,
        isSuspectUnlocked: true
      };
    }
  }

  setState(npcId, state) {
    this.npcStates[npcId] = state;
  }

  getState(npcId) {
    return this.npcStates[npcId] || null;
  }

  setActiveNPC(npcObj) {
    this._activeNPC = npcObj;
  }

  getClosestNonDialogueNPC(playerPosition) {
    let closest = null;
    let closestDist = Infinity;
    for (const npc of this.npcMeshes) {
      if (npc.data.hasDialogue) continue;
      const dist = playerPosition.distanceTo(npc.mesh.position);
      if (dist < closestDist) {
        closestDist = dist;
        closest = npc;
      }
    }
    return closest;
  }

  rebuildFromData(npcs) {
    this.npcMeshes.forEach(m => {
      this.scene?.remove(m.mesh);
      m.mesh.traverse?.(child => {
        child.geometry?.dispose();
        if (Array.isArray(child.material)) {
          child.material.forEach(mat => mat.dispose());
        } else {
          child.material?.dispose();
        }
      });
    });
    this.npcMeshes = [];

    for (const npc of npcs || []) {
      if (!npc || !this.scene || !this.modelMgr || !this.toonShader) continue;
      const mesh = new NPC(npc, this.planetR, this.scene, this.modelMgr, this.toonShader);
      this.npcMeshes.push(mesh);
    }
  }
}