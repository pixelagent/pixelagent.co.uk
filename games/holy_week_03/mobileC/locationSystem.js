// ============================================================
// LOCATION SYSTEM — Shared world map, regions, and travel logic
// ============================================================

const LOCATIONS = {
  jerusalem: {
    id: "jerusalem",
    name: "<img src='../assets/gfx/leaf-duotone.svg' class='icon-svg' loading='lazy'> The Triumphal Entry",
    region: "Jerusalem",
    icon: '../assets/gfx/horse-duotone.svg',
    color: "#60a5fa",
    fact: "Jesus entered Jerusalem riding on a donkey, fulfilling prophecy.",
    ambiance: "Crowds wave palm branches and shout 'Hosanna!'"
  },
  temple: {
    id: "temple",
    name: "<img src='../assets/gfx/church-duotone.svg' class='icon-svg' loading='lazy'> The Temple Courts",
    region: "Jerusalem",
    icon: '../assets/gfx/scroll-duotone.svg',
    color: "#f59e0b",
    fact: "Religious leaders attempted to trap Jesus with trick questions, but His wisdom silenced them completely.",
    ambiance: "Crowds listening intently, murmuring scribes, and echoing debates in the outer courts."
  },
  temple_treasury: {
    id: "temple_treasury",
    name: "<img src='../assets/gfx/coins-duotone.svg' class='icon-svg' loading='lazy'> The Treasury",
    region: "Temple Courts",
    icon: '../assets/gfx/coins-duotone.svg',
    color: "#facc15",
    fact: "The treasury was located in the Court of the Women, where thirteen trumpet-shaped chests received offerings.",
    ambiance: "The clinking of coins and the quiet footsteps of worshippers."
  },
  temple_inner: {
    id: "temple_inner",
    name: "<img src='../assets/gfx/building-columns-duotone.svg' class='icon-svg' loading='lazy'>️ Inner Temple Courts",
    region: "Temple",
    icon: '../assets/gfx/flame-duotone.svg',
    color: "#ffffff",
    fact: "The inner courts were reserved for the priesthood and ritual sacrifices.",
    ambiance: "The smell of incense and the chanting of levitical choirs."
  },
  bethany: {
    id: "bethany",
    name: "<img src='../assets/gfx/house-chimney-duotone.svg' class='icon-svg' loading='lazy'> Village of Bethany",
    region: "Judea",
    icon: '../assets/gfx/house-duotone.svg',
    color: "#8b7355",
    fact: "Located on the eastern slope of the Mount of Olives, it was the home of Lazarus, Mary, and Martha.",
    ambiance: "Quiet village life mixed with the tension of Temple surveillance."
  },
  bethany_road: {
    id: "bethany_road",
    name: "<img src='../assets/gfx/arrow-down-duotone.svg' class='icon-svg' loading='lazy'> Road to Bethany",
    region: "Judea",
    icon: '../assets/gfx/tree-duotone.svg',
    color: "#4a5d23",
    fact: "The path Jesus walked daily during His final week, where He taught His disciples through signs.",
    ambiance: "Dusty roads and the rustle of olive trees."
  },
  gethsemane: {
    id: "gethsemane",
    name: "<img src='../assets/gfx/leaf-duotone.svg' class='icon-svg' loading='lazy'> Garden of Gethsemane",
    region: "Mount of Olives",
    icon: '../assets/gfx/moon-duotone.svg',
    color: "#1a1a0d",
    fact: "Meaning 'Oil Press,' this garden was a frequent place of prayer for Jesus and His disciples.",
    ambiance: "Night birds and the rustle of ancient olive leaves in the breeze."
  },
  high_priest_palace: {
    id: "high_priest_palace",
    name: "<img src='../assets/gfx/balance-scale-duotone.svg' class='icon-svg' loading='lazy'> Palace of Caiaphas",
    region: "Jerusalem",
    icon: '../assets/gfx/flame-duotone.svg',
    color: "#3d2b1f",
    fact: "The setting for the illegal midnight assembly of the Sanhedrin.",
    ambiance: "Whispers in the dark and the crackle of a charcoal fire in the courtyard."
  },
  praetorium: {
    id: "praetorium",
    name: "<img src='../assets/gfx/building-columns-duotone.svg' class='icon-svg' loading='lazy'>️ The Praetorium",
    region: "Jerusalem",
    icon: '../assets/gfx/eagle-duotone.svg',
    color: "#8b0000",
    fact: "The Roman headquarters in Jerusalem, likely the Fortress of Antonia or Herod's Palace.",
    ambiance: "The rhythmic marching of Roman boots and the cold echoes of stone halls."
  },
  gabbatha: {
    id: "gabbatha",
    name: "<img src='../assets/gfx/theater-masks-duotone.svg' class='icon-svg' loading='lazy'> The Stone Pavement",
    region: "Jerusalem",
    icon: '../assets/gfx/balance-scale-duotone.svg',
    color: "#444444",
    fact: "Known in Aramaic as Gabbatha, this was where Pilate sat on the judgment seat.",
    ambiance: "The roar of a manipulated crowd demanding a verdict."
  },
  golgotha: {
    id: "golgotha",
    name: "<img src='../assets/gfx/cross-duotone.svg' class='icon-svg' loading='lazy'> Calvary",
    region: "Jerusalem",
    icon: '../assets/gfx/skull-duotone.svg',
    color: "#2a1810",
    fact: "The 'Place of the Skull' located outside the city walls.",
    ambiance: "Thunder rolling in a darkened sky and the sound of hammer on iron."
  },
  galilee: {
    id: "galilee",
    name: "<img src='../assets/gfx/sunrise-duotone.svg' class='icon-svg' loading='lazy'> Sea of Galilee",
    region: "Galilee",
    icon: '../assets/gfx/boat-duotone.svg',
    color: "#4fa3e8",
    fact: "The shore where the Risen Lord shared breakfast with His disciples.",
    ambiance: "Waves lapping against the shore and the smell of fish cooking over coals."
  },
  upperroom: {
    id: "upperroom",
    name: "<img src='../assets/gfx/bread-duotone.svg' class='icon-svg' loading='lazy'> The Last Supper",
    region: "Jerusalem",
    icon: '../assets/gfx/wine-duotone.svg',
    color: "#34d399",
    fact: "Jesus shared the Passover meal with his disciples and instituted the New Covenant.",
    ambiance: "The upper room is prepared with bread and wine."
  },
  garden: {
    id: "garden",
    name: "<img src='../assets/gfx/cross-duotone.svg' class='icon-svg' loading='lazy'> The Resurrection",
    region: "Jerusalem",
    icon: '../assets/gfx/sparkles-duotone.svg',
    color: "#a78bfa",
    fact: "Jesus rose from the dead on the third day, defeating death.",
    ambiance: "The tomb is empty, and angels announce Jesus is alive."
  },
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
}