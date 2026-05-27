// ============================================================
// NPC SYSTEM — state machines, dialogue, contradiction tracking
// ============================================================

export class NPCSystem {
  constructor(caseManager, evidenceSystem) {
    this.caseManager = caseManager;
    this.evidenceSystem = evidenceSystem;
    this.npcStates = {};   // npcId -> { mood, pressureLevel, contradictions, memory }
  }

  loadCase(caseData) {
    this.npcStates = {};
    caseData.npcs.forEach(npc => {
      this.npcStates[npc.id] = {
        mood: "neutral",        // neutral | cautious | pressured | exposed | friendly
        pressureLevel: 0,       // 0-100
        contradictions: [],
        memory: [],             // evidence IDs shown to this NPC
      };
    });
  }

  getNPCs() {
    const c = this.caseManager.getActiveCase();
    return c ? c.npcs : [];
  }

  getNPC(id) {
    return this.getNPCs().find(n => n.id === id) || null;
  }

  getState(npcId) {
    return this.npcStates[npcId] || null;
  }

  // Basic greeting / question response
  talk(npcId) {
    const npc = this.getNPC(npcId);
    const state = this.getState(npcId);
    if (!npc || !state) return null;

    const mood = state.mood;
    const line = npc.dialogue[mood] || npc.dialogue.neutral;

    this._addMemory(npcId, { type: "talk", mood });
    return { speaker: npc.name, text: line, mood };
  }

  // Show evidence to NPC — they react based on their role + truthfulness
  showEvidence(npcId, evidenceId) {
    const npc = this.getNPC(npcId);
    const state = this.getState(npcId);
    const evidence = this.evidenceSystem.getById(evidenceId);
    if (!npc || !state || !evidence) return null;

    // Already shown?
    if (state.memory.includes(evidenceId)) {
      return { speaker: npc.name, text: npc.dialogue.repeat || "I already told you what I know about that.", mood: state.mood };
    }

    state.memory.push(evidenceId);

    // Look for a specific reaction
    const reaction = npc.reactions?.[evidenceId];
    if (reaction) {
      if (reaction.isLie && npc.id === this.caseManager.getActiveCase()?.truth?.culprit) {
        state.pressureLevel = Math.min(100, state.pressureLevel + 25);
        this._updateMood(npcId, state);
      }
      this._addMemory(npcId, { type: "shown_evidence", evidenceId, reaction: reaction.text });
      return { speaker: npc.name, text: reaction.text, mood: state.mood, revealedClue: reaction.revealedClue || null };
    }

    // Generic reaction by type
    const genericReactions = {
      physical:      "Hmm. I'm not sure how that connects to me.",
      testimonial:   "That's not what I said at all.",
      digital:       "I don't know anything about that data.",
      environmental: "The environment? Could be anyone.",
      analytical:    "Numbers can be misleading, you know.",
    };

    const text = genericReactions[evidence.type] || "Interesting. So what?";
    this._addMemory(npcId, { type: "shown_evidence", evidenceId, reaction: text });
    return { speaker: npc.name, text, mood: state.mood };
  }

  // Challenge NPC with a contradiction between two evidence items
  challenge(npcId, evidenceAId, evidenceBId) {
    const npc = this.getNPC(npcId);
    const state = this.getState(npcId);
    if (!npc || !state) return null;

    const key = `${evidenceAId}+${evidenceBId}`;
    const contradiction = npc.contradictions?.[key] || npc.contradictions?.[`${evidenceBId}+${evidenceAId}`];

    if (contradiction) {
      state.pressureLevel = Math.min(100, state.pressureLevel + 40);
      state.contradictions.push(key);
      this._updateMood(npcId, state);
      return { speaker: npc.name, text: contradiction.exposed, mood: state.mood, breakthrough: true };
    }

    return { speaker: npc.name, text: npc.dialogue.pressured || "You can't prove anything.", mood: state.mood, breakthrough: false };
  }

  _updateMood(npcId, state) {
    if (state.pressureLevel >= 80) state.mood = "exposed";
    else if (state.pressureLevel >= 50) state.mood = "pressured";
    else if (state.pressureLevel >= 25) state.mood = "cautious";
  }

  _addMemory(npcId, entry) {
    if (this.npcStates[npcId]) {
      this.npcStates[npcId].memory.push(entry);
    }
  }

  getMoodColor(mood) {
    return { neutral: "#94a3b8", cautious: "#fbbf24", pressured: "#f97316", exposed: "#ef4444", friendly: "#34d399" }[mood] || "#94a3b8";
  }

  getMoodLabel(mood) {
    return { neutral: "Calm", cautious: "Uneasy", pressured: "Nervous", exposed: "Rattled", friendly: "Helpful" }[mood] || mood;
  }
}
