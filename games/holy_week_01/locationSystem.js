// ============================================================
// LOCATION SYSTEM — world map, regions, unlocks, travel
// ============================================================

const LOCATIONS = {
  jerusalem: {
    id: "jerusalem",
    name: "🌿 Triumphal Entry into Jerusalem",
    region: "Jerusalem",
    icon: "🐴",
    color: "#60a5fa",
    fact: "Jesus entered Jerusalem riding on a donkey, fulfilling prophecy.",
    ambiance: "Crowds wave palm branches and shout 'Hosanna!'"
  },
  temple: {
    id: "temple",
    name: "🕍 Temple Courts Confrontation",
    region: "Jerusalem",
    icon: "📜",
    color: "#f59e0b",
    fact: "Religious leaders attempted to trap Jesus with trick questions, but His wisdom silenced them completely.",
    ambiance: "Crowds listening intently, murmuring scribes, and echoing debates in the outer courts."
  },
  upperroom: {
    id: "upperroom",
    name: "🍷 The Last Supper",
    region: "Jerusalem",
    icon: "🍷",
    color: "#34d399",
    fact: "Jesus shared the Passover meal with his disciples and instituted the New Covenant.",
    ambiance: "The upper room is prepared with bread and wine."
  },
  garden: {
    id: "garden",
    name: "✝️ The Resurrection",
    region: "Jerusalem",
    icon: "✨",
    color: "#a78bfa",
    fact: "Jesus rose from the dead on the third day, defeating death.",
    ambiance: "The tomb is empty, and angels announce Jesus is alive."
  }
};

export class LocationSystem {
  constructor(caseManager) {
    this.caseManager = caseManager;
    this.currentLocation = null;
  }

  getLocation(id) {
    return LOCATIONS[id] || null;
  }

  getAllLocations() {
    return Object.values(LOCATIONS);
  }

  // Returns locations with their unlock status + case assignment
  getMapData() {
    const allCases = this.caseManager.getAllCases();
    const unlocked = this.caseManager.getUnlockedCases().map(c => c.id);

    return this.getAllLocations().map(loc => {
      const assignedCases = allCases.filter(c => c.location === loc.id);
      const activeCases = assignedCases.filter(c => unlocked.includes(c.id));
      const solvedCases = assignedCases.filter(c => this.caseManager.getCaseProgress(c.id)?.solved);

      return {
        ...loc,
        cases: assignedCases,
        activeCases,
        solvedCases,
        isUnlocked: activeCases.length > 0,
        allSolved: assignedCases.length > 0 && solvedCases.length === assignedCases.length,
      };
    });
  }

  travelTo(locationId) {
    const loc = this.getLocation(locationId);
    if (!loc) return null;
    this.currentLocation = loc;
    return loc;
  }

  getCasesAtLocation(locationId) {
    return this.caseManager.getAllCases().filter(c => c.location === locationId);
  }

  getUnlockedCasesAtLocation(locationId) {
    const unlockedIds = this.caseManager.getUnlockedCases().map(c => c.id);
    const allCases = this.caseManager.getAllCases();
    return allCases.filter(c => {
      if (c.location !== locationId) return false;
      return unlockedIds.includes(c.id);
    });
  }

  getAllCasesAtLocation(locationId) {
    const unlockedIds = this.caseManager.getUnlockedCases().map(c => c.id);
    const allCases = this.caseManager.getAllCases();
    return allCases.filter(c => c.location === locationId).map(c => ({
      ...c,
      isLocked: !unlockedIds.includes(c.id)
    }));
  }
}
