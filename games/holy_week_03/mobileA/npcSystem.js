// ============================================================
// NPC SYSTEM — state machines, dialogue, contradiction tracking
// ============================================================

const profilePath = '../characters';

export const PROFILE_ID_MAP = {
  annas: profilePath + "/annas.json",
  martha: profilePath + "/martha.json",
  nicodemus: profilePath + "/nicodemus.json",
  peter: profilePath + "/peter.json",
  mary_magdalene: profilePath + "/mary_magdalene.json",
  joseph_arimathea: profilePath + "/joseph_arimathea.json",
  maluch: profilePath + "/maluch.json",
  bethesda_witness: profilePath + "/bethesda_witness.json",
  mount_teacher: profilePath + "/mount_teacher.json",
  simon_leper: profilePath + "/simon_leper.json",
  john_mark: profilePath + "/john_mark.json",
  rhoda: profilePath + "/rhoda.json",
  judas: profilePath + "/judas.json",
  malchus: profilePath + "/malchus.json",
  garrison_guard: profilePath + "/garrison_guard.json",
  pilate_secretary: profilePath + "/pilate_secretary.json",
  thomas: profilePath + "/thomas.json",
  nathanael_disciple: profilePath + "/nathanael_disciple.json",
  barabbas: profilePath + "/barabbas.json",
  centurion_longinus: profilePath + "/centurion_longinus.json",
  pashhur: profilePath + "/pashhur.json",
  john_apostle: profilePath + "/john_apostle.json",
  tobias_owner: profilePath + "/tobias_owner.json",
  jemimah: profilePath + "/jemimah.json",
  eleazar: profilePath + "/eleazar.json",
  malachi_moneychanger: profilePath + "/malachi_moneychanger.json",
  trial_rumors: profilePath + "/trial_rumors.json",
  samuel_scribe: profilePath + "/samuel_scribe.json",
  mary_bethany: profilePath + "/mary_bethany_anointing.json",
  hillel_scribe: profilePath + "/hillel_scribe.json",
  nathanael_pharisee: profilePath + "/nathanael_pharisee.json",
  caiaphas: profilePath + "/caiaphas.json",
  market_informant: profilePath + "/market_informant.json",
  market_vendor: profilePath + "/market_vendor.json",
  pontius_pilate: profilePath + "/pontius_pilate.json",
  simon_pharisee: profilePath + "/simon_pharisee.json",
  temple_priest: profilePath + "/temple_priest.json",
  city_gossip: profilePath + "/city_gossip.json",
  displaced_merchant: profilePath + "/displaced_merchant.json",
  devout_follower: profilePath + "/devout_follower.json",
  sadducee_authority: profilePath + "/sadducee_authority.json",
  ananias_witness: profilePath + "/ananias_witness.json",
  temple_merchant: profilePath + "/temple_merchant.json",
  upper_room_prep: profilePath + "/upper_room_prep.json", // Existing
  nathan_gardener: profilePath + "/nathan_gardener.json", // New
  andrew_disciple: profilePath + "/andrew_disciple.json", // New
  secret_visit: profilePath + "/secret_visit.json",
  simon_cyrene: profilePath + "/simon_cyrene.json",
  local_traveler: profilePath + "/local_traveler.json",
  rich_young_ruler: profilePath + "/rich_young_ruler.json",
  judas_iscariot: profilePath + "/judas.json",
  malchus_servant: profilePath + "/malchus.json",
  roman_soldier: profilePath + "/execution_soldier.json",
};

class CharacterLoader {
  constructor() {
    this.cache = new Map();
  }

  async loadProfile(url) {
    if (this.cache.has(url)) return this.cache.get(url);
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      this.cache.set(url, data);
      return data;
    } catch (e) {
      console.error(`[CharacterLoader] Failed to load profile: ${url}`, e);
      return null;
    }
  }
}

export class NPCSystem {
  constructor(caseManager, evidenceSystem) {
    this.caseManager = caseManager;
    this.es = evidenceSystem;
    this.loader = new CharacterLoader();
    this.npcStates = {};
  }

  async loadCase(caseData) {
    this.npcStates = {};

    const allNPCs = [...(caseData.npcs || [])];
    const progress = this.caseManager.getCaseProgress(caseData.id);
    const discovered = (progress && progress.unlockedSuspects) || [];

    for (const npc of allNPCs) {
      if (!npc) continue;
      let pFile = npc.profileFile;
      // Resolve ID reference if it doesn't look like a direct path
      if (pFile && !pFile.includes('/') && !pFile.endsWith('.json')) {
        pFile = PROFILE_ID_MAP[pFile];
      }
      if (pFile) {
        const profile = await this.loader.loadProfile(pFile);
        if (profile) {
          // Merge profile data, allowing case-specific NPC fields to override shared profile defaults
          Object.assign(npc, { ...profile, ...npc });
        }
      }

      this.npcStates[npc.id] = {
        mood: "neutral",
        pressureLevel: 0,
        contradictions: [],
        memory: [],
        hasFailedChallenge: false,
        correctedLies: [],
        talkStep: 0,
        isSuspect: npc.isSuspect || false,
        isSuspectUnlocked: npc.isSuspectUnlocked || discovered.includes(npc.id) || npc.id === "none"
      };
    }

    // Ensure all suspects have state even if not in NPCs array
    if (caseData.suspects) {
      caseData.suspects.forEach(s => {
        if (s.id && !this.npcStates[s.id]) {
          this.npcStates[s.id] = {
            mood: "neutral",
            pressureLevel: 0,
            contradictions: [],
            memory: [],
            hasFailedChallenge: false,
            correctedLies: [],
            talkStep: 0,
            isSuspect: true,
            isSuspectUnlocked: discovered.includes(s.id) || s.id === "none"
          };
        }
      });
    }
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

  unlockSuspect(npcId) {
    console.log(`[NPCSystem] unlockSuspect called for: ${npcId}, activeCaseId: ${this.caseManager?.activeCaseId}`);
    const state = this.getState(npcId);
    if (state) {
      state.isSuspectUnlocked = true;
    }
    if (typeof this.caseManager?.discoverSuspect === "function") {
      console.log(`[NPCSystem] Calling caseManager.discoverSuspect for: ${npcId}`);
      this.caseManager.discoverSuspect(npcId);
    } else if (typeof this.caseManager?.unlockSuspect === "function") {
      console.log(`[NPCSystem] Calling caseManager.unlockSuspect for: ${npcId}`);
      this.caseManager.unlockSuspect(npcId);
    }
  }

  // Basic greeting / question response
  talk(npcId) {
    const npc = this.getNPC(npcId);
    const state = this.getState(npcId);
    if (!npc || !state || !npc.dialogue) return null;

    const mood = state.mood;
    const node = npc.dialogue[mood] || npc.dialogue.neutral;

    // Handle object-based dialogue with lie/correction logic
    if (node && typeof node === 'object' && node.text) {
      const isCorrected = state.correctedLies.includes(mood);
      const text = isCorrected ? (node.correction || node.text) : node.text;

      this._addMemory(npcId, { type: "talk", mood, isLie: node.isLie && !isCorrected });
      return {
        speaker: npc.name,
        text,
        mood,
        isLie: node.isLie && !isCorrected,
        wasCorrected: isCorrected
      };
    }

    this._addMemory(npcId, { type: "talk", mood });
    return { speaker: npc.name, text: node, mood };
  }

  // Ordered dialogue stages used when no ink story is available.
  // Each Talk click advances one stage; 'repeat' loops on itself.
  static DIALOGUE_STAGES = ["neutral", "cautious", "pressured", "exposed", "repeat"];

  /**
   * Progressive talk for NPCs whose dialogue is supplied as a plain object
   * (no ink story JSON). Advances one stage per Talk click. At the final
   * 'repeat' stage it keeps repeating the same line.
   */
  talkProgressive(npcId) {
    const npc = this.getNPC(npcId);
    const state = this.getState(npcId);
    if (!npc || !state || !npc.dialogue) return null;

    const stages = NPCSystem.DIALOGUE_STAGES.filter(s => npc.dialogue[s] != null);
    if (stages.length === 0) return null;

    const step = Math.min(state.talkStep, stages.length - 1);
    const stage = stages[step];
    // Once we reach the last stage (repeat), stop advancing so it loops.
    if (step < stages.length - 1) state.talkStep += 1;

    const node = npc.dialogue[stage];
    let text;
    let wasCorrected = false;
    if (node && typeof node === "object" && node.text) {
      wasCorrected = state.correctedLies.includes(stage);
      text = wasCorrected ? (node.correction || node.text) : node.text;
      this._addMemory(npcId, { type: "talk", stage, isLie: node.isLie && !wasCorrected });
    } else {
      text = node;
      this._addMemory(npcId, { type: "talk", stage });
    }

    return { speaker: npc.name, text, mood: stage, stage, wasCorrected };
  }

  // Show evidence to NPC — they react based on their role + truthfulness
  showEvidence(npcId, evidenceId) {
    const npc = this.getNPC(npcId);
    const state = this.getState(npcId);
    const evidence = this.es.getById(evidenceId);
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

      // Check for prophecy unlock in reaction
      if (reaction.revealsProphecy) {
        const currentStatus = this.caseManager.getCodexStatus(reaction.revealsProphecy);
        if (currentStatus === 'unseen') {
          this.caseManager.setCodexStatus(reaction.revealsProphecy, 'rumor');
        }
      }

      this._addMemory(npcId, { type: "shown_evidence", evidenceId, reaction: reaction.text });
      return { speaker: npc.name, text: reaction.text, mood: state.mood, revealedClue: reaction.revealedClue || null, revealedProphecy: reaction.revealsProphecy || null };
    }

    const npcReactions = npc.genericReactions || {
      physical: "Hmm. I'm not sure how that connects to me.",
      testimonial: "That's not what I said at all.",
      digital: "I don't know anything about that data.",
      environmental: "The environment? Could be anyone.",
      analytical: "Numbers can be misleading, you know.",
      prophecy: "A prophecy fulfilled? I see the connection now.",
    };

    const text = npcReactions[evidence.type] || "Interesting. So what?";
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

      // Check if this contradiction corrects a lying dialogue node
      let correctedNode = null;
      if (contradiction.corrects && !state.correctedLies.includes(contradiction.corrects)) {
        state.correctedLies.push(contradiction.corrects);
        correctedNode = contradiction.corrects;
      }

      // Check for prophecy unlock in contradiction
      if (contradiction.revealsProphecy) {
        const currentStatus = this.caseManager.getCodexStatus(contradiction.revealsProphecy);
        if (currentStatus === 'unseen') {
          this.caseManager.setCodexStatus(contradiction.revealsProphecy, 'rumor');
        }
      }

      // Reputation Bonus for precise investigation
      if (!state.hasFailedChallenge && npc.faction) {
        this.caseManager.updateReputation(npc.faction, 5);
      }

      this.caseManager.recordBreakthrough(npcId, key);

      return {
        speaker: npc.name,
        text: contradiction.exposed,
        mood: state.mood,
        breakthrough: true,
        correctedNode,
        revealedProphecy: contradiction.revealsProphecy || null
      };
    }

    // Failure Logic
    state.hasFailedChallenge = true;
    state.pressureLevel = Math.min(100, state.pressureLevel + 5);
    this._updateMood(npcId, state);

    if (typeof this.caseManager.updateDoubt === 'function') {
      this.caseManager.updateDoubt(10);
    }
    if (npc.faction && typeof this.caseManager.updateReputation === 'function') {
      this.caseManager.updateReputation(npc.faction, -15);
    }
    if (typeof this.caseManager.recordFailedChallenge === 'function') {
      this.caseManager.recordFailedChallenge();
    }

    return {
      speaker: npc.name,
      text: npc.dialogue.noContradiction || `No contradiction found between "${this.es.getById(evidenceAId)?.name || evidenceAId}" and "${this.es.getById(evidenceBId)?.name || evidenceBId}". Try a different pairing.`,
      mood: state.mood,
      breakthrough: false
    };
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
