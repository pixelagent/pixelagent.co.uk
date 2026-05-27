// ============================================================
// LOCATION SYSTEM — world map, regions, unlocks, travel
// ============================================================

const LOCATIONS = {
  jerusalem: { id: "jerusalem", name: "🌿 Triumphal Entry into Jerusalem", region: "Jerusalem", icon: "🐴", color: "#60a5fa", fact: "Jesus entered Jerusalem riding on a donkey, fulfilling prophecy.", ambiance: "Crowds wave palm branches and shout 'Hosanna!'" },
  temple: { id: "temple", name: "⛪ Cleansing of the Temple", region: "Jerusalem", icon: "🕍", color: "#f59e0b", fact: "Jesus drove out the money changers, declaring the Temple should be a house of prayer.", ambiance: "Tables overturned, coins scattered, and animals released." },
  upperroom: { id: "upperroom", name: "🍷 The Last Supper", region: "Jerusalem", icon: "🍷", color: "#34d399", fact: "Jesus shared the Passover meal with his disciples and instituted the Lord's Supper.", ambiance: "The upper room is prepared with bread and wine." },
  garden: { id: "garden", name: "✝️ The Resurrection", region: "Jerusalem", icon: "✨", color: "#a78bfa", fact: "Jesus rose from the dead on the third day, defeating death.", ambiance: "The tomb is empty, and angels announce Jesus is alive." }
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
    return this.caseManager.getUnlockedCases().filter(c => c.location === locationId);
  }
}
