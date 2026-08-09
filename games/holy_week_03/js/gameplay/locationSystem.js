// ============================================================
// LOCATION SYSTEM — world map, regions, unlocks, travel
// ============================================================

const LOCATIONS = {
  jerusalem: {
    id: "jerusalem",
    name: "<img src='../assets/gfx/house-duotone.svg' class='icon-svg' loading='lazy'> Jerusalem",
    region: "Jerusalem",
    icon: '../assets/gfx/house-duotone.svg',
    color: "#60a5fa",
    fact: "The city where Jesus entered triumphantly, taught in the Temple, and was crucified.",
    ambiance: "Bustling streets, market cries, and the weight of history in every stone."
  },
  temple: {
    id: "temple",
    name: "<img src='../assets/gfx/church-duotone.svg' class='icon-svg' loading='lazy'> Jerusalem Temple",
    region: "Jerusalem",
    icon: '../assets/gfx/church-duotone.svg',
    color: "#f59e0b",
    fact: "The center of Jewish worship where Jesus taught and confronted the religious leaders.",
    ambiance: "Crowds listening intently, murmuring scribes, and echoing debates in the outer courts."
  },
  temple_treasury: {
    id: "temple_treasury",
    name: "<img src='../assets/gfx/coins-duotone.svg' class='icon-svg' loading='lazy'> Temple Treasury",
    region: "Jerusalem",
    icon: '../assets/gfx/coins-duotone.svg',
    color: "#facc15",
    fact: "Located in the Court of the Women, where thirteen trumpet-shaped chests received offerings.",
    ambiance: "The clinking of coins and the quiet footsteps of worshippers."
  },
  temple_inner: {
    id: "temple_inner",
    name: "<img src='../assets/gfx/flame-duotone.svg' class='icon-svg' loading='lazy'> Inner Temple Courts",
    region: "Jerusalem",
    icon: '../assets/gfx/flame-duotone.svg',
    color: "#ffffff",
    fact: "The inner courts were reserved for the priesthood and ritual sacrifices.",
    ambiance: "The smell of incense and the chanting of levitical choirs."
  },
  upperroom: {
    id: "upperroom",
    name: "<img src='../assets/gfx/bread-duotone.svg' class='icon-svg' loading='lazy'> The Upper Room",
    region: "Jerusalem",
    icon: '../assets/gfx/bread-duotone.svg',
    color: "#34d399",
    fact: "Jesus shared the Passover meal with his disciples and instituted the New Covenant.",
    ambiance: "The upper room is prepared with bread and wine."
  },
  garden: {
    id: "garden",
    name: "<img src='../assets/gfx/cross-duotone.svg' class='icon-svg' loading='lazy'> The Garden Tomb",
    region: "Jerusalem",
    icon: '../assets/gfx/cross-duotone.svg',
    color: "#a78bfa",
    fact: "Jesus rose from the dead on the third day, defeating death.",
    ambiance: "The tomb is empty, and angels announce Jesus is alive."
  },
  bethany: {
    id: "bethany",
    name: "<img src='../assets/gfx/house-chimney-duotone.svg' class='icon-svg' loading='lazy'> Bethany",
    region: "Judea",
    icon: '../assets/gfx/house-chimney-duotone.svg',
    color: "#8b7355",
    fact: "Home of Lazarus, Mary, and Martha. A place of friendship and miraculous restoration.",
    ambiance: "Quiet village life mixed with the tension of Temple surveillance."
  },
  bethany_road: {
    id: "bethany_road",
    name: "<img src='../assets/gfx/tree-duotone.svg' class='icon-svg' loading='lazy'> Road to Bethany",
    region: "Judea",
    icon: '../assets/gfx/tree-duotone.svg',
    color: "#4a5d23",
    fact: "The path Jesus walked daily during His final week, where He taught His disciples through signs.",
    ambiance: "Dusty roads and the rustle of olive trees."
  },
  mount_of_olives: {
    id: "mount_of_olives",
    name: "<img src='../assets/gfx/sunrise-duotone.svg' class='icon-svg' loading='lazy'> Mount of Olives",
    region: "Jerusalem",
    icon: '../assets/gfx/sunrise-duotone.svg',
    color: "#10b981",
    fact: "Jesus taught His disciples about the end times and prayed in Gethsemane at its foot.",
    ambiance: "Olive groves, panoramic views of the Temple, and the weight of prophecy."
  },
  gethsemane: {
    id: "gethsemane",
    name: "<img src='../assets/gfx/leaf-duotone.svg' class='icon-svg' loading='lazy'> Garden of Gethsemane",
    region: "Mount of Olives",
    icon: '../assets/gfx/leaf-duotone.svg',
    color: "#1a1a0d",
    fact: "Meaning 'Oil Press,' this garden was a frequent place of prayer for Jesus and His disciples.",
    ambiance: "Night birds and the rustle of ancient olive leaves in the breeze."
  },
  high_priest_palace: {
    id: "high_priest_palace",
    name: "<img src='../assets/gfx/balance-scale-duotone.svg' class='icon-svg' loading='lazy'> Palace of Caiaphas",
    region: "Jerusalem",
    icon: '../assets/gfx/balance-scale-duotone.svg',
    color: "#3d2b1f",
    fact: "The setting for the illegal midnight assembly of the Sanhedrin.",
    ambiance: "Whispers in the dark and the crackle of a charcoal fire in the courtyard."
  },
  praetorium: {
    id: "praetorium",
    name: "<img src='../assets/gfx/building-columns-duotone.svg' class='icon-svg' loading='lazy'> The Praetorium",
    region: "Jerusalem",
    icon: '../assets/gfx/building-columns-duotone.svg',
    color: "#8b0000",
    fact: "The Roman headquarters in Jerusalem, where Jesus was tried and condemned.",
    ambiance: "The rhythmic marching of Roman boots and the cold echoes of stone halls."
  },
  gabbatha: {
    id: "gabbatha",
    name: "<img src='../assets/gfx/theater-masks-duotone.svg' class='icon-svg' loading='lazy'> The Stone Pavement",
    region: "Jerusalem",
    icon: '../assets/gfx/theater-masks-duotone.svg',
    color: "#444444",
    fact: "Known in Aramaic as Gabbatha, this was where Pilate sat on the judgment seat.",
    ambiance: "The roar of a manipulated crowd demanding a verdict."
  },
  golgotha: {
    id: "golgotha",
    name: "<img src='../assets/gfx/skull-duotone.svg' class='icon-svg' loading='lazy'> Golgotha",
    region: "Jerusalem",
    icon: '../assets/gfx/skull-duotone.svg',
    color: "#2a1810",
    fact: "The 'Place of the Skull' where Jesus was crucified outside the city walls.",
    ambiance: "Thunder rolling in a darkened sky and the sound of hammer on iron."
  },
  sea_of_galilee: {
    id: "sea_of_galilee",
    name: "<img src='../assets/gfx/boat-duotone.svg' class='icon-svg' loading='lazy'> Sea of Galilee",
    region: "Galilee",
    icon: '../assets/gfx/boat-duotone.svg',
    color: "#4fa3e8",
    fact: "The shore where the Risen Lord shared breakfast with His disciples.",
    ambiance: "Waves lapping against the shore and the smell of fish cooking over coals."
  },
  emmaus_road: {
    id: "emmaus_road",
    name: "<img src='../assets/gfx/arrow-right-duotone.svg' class='icon-svg' loading='lazy'> Road to Emmaus",
    region: "Judea",
    icon: '../assets/gfx/arrow-right-duotone.svg',
    color: "#78716c",
    fact: "The road where two disciples walked with the risen Jesus, their hearts burning as He explained the Scriptures.",
    ambiance: "Dusty road at dusk, the rhythm of footsteps, and a stranger's voice opening the Word."
  },
  pool_of_bethesda: {
    id: "pool_of_bethesda",
    name: "<img src='../assets/gfx/jar-duotone.svg' class='icon-svg' loading='lazy'> Pool of Bethesda",
    region: "Jerusalem",
    icon: '../assets/gfx/jar-duotone.svg',
    color: "#0ea5e9",
    fact: "A healing pool near the Sheep Gate where Jesus healed a crippled man who had been waiting 38 years.",
    ambiance: "The quiet splash of water and the whisper of those waiting for a miracle."
  },
  akeldama: {
    id: "akeldama",
    name: "<img src='../assets/gfx/leaves-duotone.svg' class='icon-svg' loading='lazy'> Field of Blood",
    region: "Jerusalem",
    icon: '../assets/gfx/leaves-duotone.svg',
    color: "#7f1d1d",
    fact: "The potter's field purchased with Judas's betrayal money, where he met his end.",
    ambiance: "Red clay soil and the weight of a wasted life."
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

  getActData() {
    const allCases = this.caseManager.getAllCases();
    const unlocked = this.caseManager.getUnlockedCases().map(c => c.id);
    const actMap = {};

    allCases.forEach(c => {
      const act = c.actLabel || "Act I - The Triumphal Entry";
      if (!actMap[act]) {
        actMap[act] = {
          label: act,
          cases: [],
          locations: new Set(),
          activeCases: 0,
          solvedCases: 0
        };
      }
      actMap[act].cases.push(c);
      if (c.location) actMap[act].locations.add(c.location);
      if (unlocked.includes(c.id)) actMap[act].activeCases++;
      if (this.caseManager.getCaseProgress(c.id)?.solved) actMap[act].solvedCases++;
    });

    return Object.values(actMap).map(act => ({
      ...act,
      locations: Array.from(act.locations),
      isUnlocked: act.activeCases > 0,
      allSolved: act.cases.length > 0 && act.solvedCases === act.cases.length
    }));
  }

  getCasesForAct(actLabel) {
    const unlockedIds = this.caseManager.getUnlockedCases().map(c => c.id);
    const allCases = this.caseManager.getAllCases();
    return allCases.filter(c => (c.actLabel || "Act I - The Triumphal Entry") === actLabel).map(c => ({
      ...c,
      isLocked: !unlockedIds.includes(c.id)
    }));
  }
}