import * as THREE from "../creek-games-3d/three.module.js";

const FIGHTERS = [
  {
    id: "marcus-king",
    name: "Marcus King",
    nickname: "The Mauler",
    weightClass: "Light Heavyweight",
    record: "18-3",
    tagline: "Pressure boxer with heavy hands and a strong chin.",
    palette: { primary: "#d9472e", secondary: "#ffe2ce", skin: "#d9a072" },
    stats: { health: 118, stamina: 102, power: 88, speed: 74, chin: 84 }
  },
  {
    id: "diego-hale",
    name: "Diego Hale",
    nickname: "Viper Step",
    weightClass: "Welterweight",
    record: "22-6",
    tagline: "Fast footwork, sharp jabs, and dangerous counter kicks.",
    palette: { primary: "#1f8a70", secondary: "#d8f8e8", skin: "#b67d55" },
    stats: { health: 104, stamina: 116, power: 72, speed: 92, chin: 70 }
  },
  {
    id: "isaiah-brooks",
    name: "Isaiah Brooks",
    nickname: "Cold Circuit",
    weightClass: "Middleweight",
    record: "15-2",
    tagline: "Technical striker with a deep gas tank and clean range control.",
    palette: { primary: "#2e63d8", secondary: "#dde9ff", skin: "#9d6a4f" },
    stats: { health: 110, stamina: 112, power: 78, speed: 82, chin: 76 }
  },
  {
    id: "rico-santos",
    name: "Rico Santos",
    nickname: "Southside Flame",
    weightClass: "Featherweight",
    record: "24-7",
    tagline: "Explosive kickboxer who can erase stamina in a hurry.",
    palette: { primary: "#f06a21", secondary: "#fff0d6", skin: "#c68558" },
    stats: { health: 96, stamina: 108, power: 82, speed: 90, chin: 64 }
  },
  {
    id: "caleb-ward",
    name: "Caleb Ward",
    nickname: "Granite",
    weightClass: "Heavyweight",
    record: "13-1",
    tagline: "Slow starter, massive power, and absurd durability.",
    palette: { primary: "#6e7487", secondary: "#e1e6f1", skin: "#c4926c" },
    stats: { health: 126, stamina: 88, power: 94, speed: 58, chin: 92 }
  },
  {
    id: "noah-stryker",
    name: "Noah Stryker",
    nickname: "Night Shift",
    weightClass: "Lightweight",
    record: "20-5",
    tagline: "Balanced all-rounder who punishes mistakes with clean combinations.",
    palette: { primary: "#8746ff", secondary: "#e8dcff", skin: "#ba845b" },
    stats: { health: 108, stamina: 110, power: 80, speed: 84, chin: 78 }
  },
  {
    id: "trent-colter",
    name: "Trent Colter",
    nickname: "Chain Grip",
    weightClass: "Middleweight",
    record: "17-4",
    tagline: "Compact pressure fighter with strong counters and stubborn defense.",
    palette: { primary: "#bf3f3f", secondary: "#ffe2dc", skin: "#8f5d45" },
    stats: { health: 112, stamina: 98, power: 86, speed: 72, chin: 82 }
  },
  {
    id: "malik-frost",
    name: "Malik Frost",
    nickname: "North Wind",
    weightClass: "Welterweight",
    record: "19-3",
    tagline: "Long-range striker with clean entries and quick exits.",
    palette: { primary: "#39a4db", secondary: "#dff7ff", skin: "#9d6d4d" },
    stats: { health: 102, stamina: 114, power: 74, speed: 90, chin: 72 },
    hair: { style: "dreads", color: "#211813" }
  },
  {
    id: "devin-rowe",
    name: "Devin Rowe",
    nickname: "Switchblade",
    weightClass: "Bantamweight",
    record: "26-8",
    tagline: "Quick hands, shifting angles, and relentless combo pace.",
    palette: { primary: "#18a05e", secondary: "#def8e7", skin: "#b78161" },
    stats: { health: 94, stamina: 120, power: 68, speed: 96, chin: 60 }
  },
  {
    id: "owen-kade",
    name: "Owen Kade",
    nickname: "Iron Harbor",
    weightClass: "Heavyweight",
    record: "11-0",
    tagline: "Big frame, punishing hooks, and enough chin for a brawl.",
    palette: { primary: "#4c566b", secondary: "#dfe5ef", skin: "#a87654" },
    stats: { health: 128, stamina: 84, power: 96, speed: 56, chin: 94 }
  },
  {
    id: "julian-vega",
    name: "Julian Vega",
    nickname: "Flashpoint",
    weightClass: "Lightweight",
    record: "21-6",
    tagline: "Kick-heavy striker who stays dangerous deep into the round.",
    palette: { primary: "#f78c28", secondary: "#fff1d9", skin: "#ca8c67" },
    stats: { health: 100, stamina: 118, power: 79, speed: 88, chin: 66 }
  },
  {
    id: "cam-denver",
    name: "Cam Denver",
    nickname: "Overtime",
    weightClass: "Featherweight",
    record: "28-9",
    tagline: "Well-rounded veteran built for long fights and ugly exchanges.",
    palette: { primary: "#2f60c8", secondary: "#dce7ff", skin: "#8d5b40" },
    stats: { health: 106, stamina: 109, power: 77, speed: 83, chin: 80 }
  },
  {
    id: "samir-reign",
    name: "Samir Reign",
    nickname: "Golden Hour",
    weightClass: "Light Heavyweight",
    record: "16-2",
    tagline: "Polished shot selection with a mean body-kick rhythm.",
    palette: { primary: "#c89b1d", secondary: "#fff3c6", skin: "#ac7657" },
    stats: { health: 114, stamina: 104, power: 84, speed: 78, chin: 79 }
  },
  {
    id: "cohas-mcoko",
    name: "Cohas Mcoko",
    nickname: "The Real Deal",
    weightClass: "Middleweight",
    record: "23-1",
    tagline: "Measured pressure, sharp counters, and the kind of timing that breaks rhythm.",
    palette: { primary: "#8d2f2f", secondary: "#efe5de", skin: "#8f6347" },
    stats: { health: 116, stamina: 111, power: 87, speed: 81, chin: 88 }
  },
  {
    id: "maya-vale",
    name: "Maya Vale",
    nickname: "Ice Wire",
    weightClass: "Women's Flyweight",
    record: "18-2",
    tagline: "Calm footwork, sharp counters, and a very clean jab game.",
    palette: { primary: "#3d74d6", secondary: "#dde8ff", skin: "#a9785f" },
    stats: { health: 102, stamina: 118, power: 72, speed: 91, chin: 77 }
  },
  {
    id: "talia-cross",
    name: "Talia Cross",
    nickname: "Crimson Storm",
    weightClass: "Women's Bantamweight",
    record: "21-5",
    tagline: "Aggressive combinations and a pace that keeps piling on pressure.",
    palette: { primary: "#c33f49", secondary: "#ffe1df", skin: "#8e6047" },
    stats: { health: 108, stamina: 112, power: 81, speed: 86, chin: 79 }
  },
  {
    id: "nina-quade",
    name: "Nina Quade",
    nickname: "Deadlock",
    weightClass: "Women's Strawweight",
    record: "25-4",
    tagline: "Technically sharp everywhere with excellent timing on level changes and exits.",
    palette: { primary: "#2c9b74", secondary: "#def8ee", skin: "#c08a68" },
    stats: { health: 98, stamina: 120, power: 69, speed: 94, chin: 73 }
  },
  {
    id: "sierra-knox",
    name: "Sierra Knox",
    nickname: "Heavy Hands",
    weightClass: "Women's Featherweight",
    record: "16-1",
    tagline: "Explosive boxing entries with enough power to change a fight instantly.",
    palette: { primary: "#8b5bdb", secondary: "#ece1ff", skin: "#9c6b52" },
    stats: { health: 112, stamina: 104, power: 89, speed: 78, chin: 84 }
  },
  {
    id: "jade-moreno",
    name: "Jade Moreno",
    nickname: "Night Current",
    weightClass: "Women's Flyweight",
    record: "19-3",
    tagline: "Slick movement fighter who chips away with fast straight shots and kicks.",
    palette: { primary: "#1f8d8a", secondary: "#d8f8f6", skin: "#7f573f" },
    stats: { health: 100, stamina: 116, power: 74, speed: 92, chin: 74 }
  },
  {
    id: "brook-hart",
    name: "Brook Hart",
    nickname: "Rattleshot",
    weightClass: "Women's Bantamweight",
    record: "14-2",
    tagline: "Low stance, big overhands, and a rough clinch-break striking style.",
    palette: { primary: "#d97a29", secondary: "#fff0db", skin: "#b8815f" },
    stats: { health: 110, stamina: 101, power: 85, speed: 80, chin: 82 }
  },
  {
    id: "lena-sato",
    name: "Lena Sato",
    nickname: "Silent Flash",
    weightClass: "Women's Atomweight",
    record: "27-6",
    tagline: "Very fast in and out with precise kicks and a constant angle game.",
    palette: { primary: "#4a63d8", secondary: "#e1e7ff", skin: "#d0a182" },
    stats: { health: 92, stamina: 122, power: 64, speed: 97, chin: 68 }
  },
  {
    id: "aria-sloan",
    name: "Aria Sloan",
    nickname: "Goldfang",
    weightClass: "Women's Featherweight",
    record: "20-4",
    tagline: "Patient hunter with heavy body work and strong late-round pressure.",
    palette: { primary: "#c4971f", secondary: "#fff1c8", skin: "#96684c" },
    stats: { health: 114, stamina: 107, power: 83, speed: 79, chin: 86 }
  },
  {
    id: "jose-jakson-will",
    name: "Jose Jakson Will",
    nickname: "Southline",
    weightClass: "Welterweight",
    record: "17-3",
    tagline: "Sharp pressure boxing, quick counters, and a strong finish when the pace rises.",
    palette: { primary: "#2f78b9", secondary: "#e2eefb", skin: "#9a6a4b" },
    stats: { health: 109, stamina: 108, power: 82, speed: 85, chin: 81 }
  },
  {
    id: "islas-makacenk",
    name: "Islas Makacenk",
    nickname: "Trophy King",
    weightClass: "Lightweight",
    record: "26-2",
    tagline: "A trophy-winning champion with strong balance, heavy pressure, and elite control of every round.",
    palette: { primary: "#c9a12a", secondary: "#fff0bf", skin: "#a27352" },
    stats: { health: 118, stamina: 114, power: 90, speed: 83, chin: 89 }
  },
  {
    id: "jason-morales",
    name: "Jason Morales",
    nickname: "Iron Snap",
    weightClass: "Middleweight",
    record: "19-4",
    tagline: "Fast combinations, sharp counters, and a strong late-round push when the fight gets messy.",
    palette: { primary: "#2d6bc8", secondary: "#dfe9ff", skin: "#9c6b4d" },
    stats: { health: 111, stamina: 109, power: 84, speed: 87, chin: 80 },
    hair: { style: "braids", color: "#1b1411" }
  },
  {
    id: "ayo-bona",
    name: "Ayo Bona",
    nickname: "Night Pulse",
    weightClass: "Welterweight",
    record: "18-2",
    tagline: "Sharp reactions, quick feet, and fast combinations that build pressure in a hurry.",
    palette: { primary: "#6b2fb8", secondary: "#efe4ff", skin: "#8f6046" },
    stats: { health: 107, stamina: 112, power: 81, speed: 89, chin: 78 }
  }
];

const VENUES = [
  {
    id: "las-vegas-apex",
    name: "Las Vegas Apex",
    location: "Las Vegas, Nevada",
    description: "Tight, bright, and loud under sharp white lights.",
    theme: {
      sky: "#33415d",
      glow: "#111827",
      floor: "#9ba5b3",
      floorDark: "#5a6270"
    }
  },
  {
    id: "rio-night-dome",
    name: "Rio Night Dome",
    location: "Rio de Janeiro, Brazil",
    description: "Warm gold lighting with a late-night main event feel.",
    theme: {
      sky: "#5b2d19",
      glow: "#1e1010",
      floor: "#a77751",
      floorDark: "#5a3628"
    }
  },
  {
    id: "tokyo-strike-hall",
    name: "Tokyo Strike Hall",
    location: "Tokyo, Japan",
    description: "Cool blue production, dark crowd, and a polished mat.",
    theme: {
      sky: "#243b63",
      glow: "#101b2f",
      floor: "#8196b4",
      floorDark: "#49566d"
    }
  },
  {
    id: "desert-thunder-arena",
    name: "Desert Thunder Arena",
    location: "Abu Dhabi, UAE",
    description: "Hot amber floodlights with a high-stakes title-night look.",
    theme: {
      sky: "#6d4426",
      glow: "#23140b",
      floor: "#ba8d5a",
      floorDark: "#6a4a2f"
    }
  },
  {
    id: "madison-garden-card",
    name: "Madison Garden Card",
    location: "New York City, New York",
    description: "Bright television lights, a packed lower bowl, and a huge main-card feel.",
    theme: {
      sky: "#273348",
      glow: "#10161f",
      floor: "#b7bcc4",
      floorDark: "#4a515c"
    }
  },
  {
    id: "london-prime-arena",
    name: "London Prime Arena",
    location: "London, England",
    description: "Cool steel lighting with a crisp championship-night presentation.",
    theme: {
      sky: "#30415a",
      glow: "#111822",
      floor: "#98a7b8",
      floorDark: "#475464"
    }
  },
  {
    id: "miami-bayside-fightnight",
    name: "Miami Bayside Fightnight",
    location: "Miami, Florida",
    description: "Hot coastal colors, flashy production, and a louder crowd palette.",
    theme: {
      sky: "#4f486e",
      glow: "#1c1530",
      floor: "#b89fbe",
      floorDark: "#624c73"
    }
  },
  {
    id: "mexico-city-summit",
    name: "Mexico City Summit",
    location: "Mexico City, Mexico",
    description: "Sharp emerald lighting and a tense high-altitude title-fight vibe.",
    theme: {
      sky: "#294b43",
      glow: "#0d1f1b",
      floor: "#86aa95",
      floorDark: "#35584d"
    }
  },
  {
    id: "seoul-neon-dome",
    name: "Seoul Neon Dome",
    location: "Seoul, South Korea",
    description: "Deep blue shadows, bright edge lights, and a slick modern broadcast look.",
    theme: {
      sky: "#243760",
      glow: "#0d1326",
      floor: "#8ea4d8",
      floorDark: "#3a4d79"
    }
  },
  {
    id: "sydney-harbour-card",
    name: "Sydney Harbour Card",
    location: "Sydney, Australia",
    description: "Clean white spotlights with a brighter premium-event floor treatment.",
    theme: {
      sky: "#355470",
      glow: "#152230",
      floor: "#c5d0d8",
      floorDark: "#60717d"
    }
  },
  {
    id: "sao-paulo-warzone",
    name: "Sao Paulo Warzone",
    location: "Sao Paulo, Brazil",
    description: "Warmer shadows, golden highlights, and a rougher fight-night atmosphere.",
    theme: {
      sky: "#5f3b2a",
      glow: "#24130f",
      floor: "#b48b68",
      floorDark: "#6e4a36"
    }
  },
  {
    id: "backyard-brawl-ring",
    name: "Backyard Brawl Ring",
    location: "Creek County Backyard",
    description: "A scrappy outdoor backyard setup with rough lights, dark fencing, and a homemade fight-night feel.",
    theme: {
      sky: "#3e4b2f",
      glow: "#182012",
      floor: "#8f9773",
      floorDark: "#4c5638"
    }
  },
  {
    id: "chicago-electric-unit-ring",
    name: "Chicago Electric Unit Ring",
    location: "Chicago, Illinois",
    description: "A blacked-out electric fight setup with hard shadows, dim steel lighting, and a colder industrial feel.",
    theme: {
      sky: "#14161c",
      glow: "#05070b",
      floor: "#2b2f38",
      floorDark: "#0d1015"
    }
  },
  {
    id: "o2-ring",
    name: "O2 Ring",
    location: "San Antonio, Texas",
    description: "A dark Texas fight-night build with a square ring, bright rope lines, and cold overhead event lighting.",
    theme: {
      sky: "#18253d",
      glow: "#09111d",
      floor: "#7d9cc7",
      floorDark: "#24344d"
    }
  },
  {
    id: "vka-ring",
    name: "VKA Ring",
    location: "Edmonton, Canada",
    description: "A cold Canadian arena build with sharp lights, deep shadows, and VKA branding over the cage.",
    signText: "VKA",
    matText: ["VKA"],
    theme: {
      sky: "#2b1242",
      glow: "#08050d",
      floor: "#7a1737",
      floorDark: "#3a185f"
    }
  },
  {
    id: "philadelhia-brawl-zone",
    name: "Philadelhia Brawl Zone",
    location: "Philadelphia, Pennsylvania",
    description: "A red, white, and blue east-coast fight setup with Liberty Bell branding and a loud rough-edged crowd feel.",
    matText: ["PHILA"],
    matIcon: "liberty-bell",
    matLogoColor: "#1f4b9b",
    matAccentColor: "#c61c30",
    theme: {
      sky: "#1c3772",
      glow: "#9f1428",
      floor: "#f4f6fb",
      floorDark: "#24478c"
    }
  },
  {
    id: "sim-championchip-card",
    name: "Sim Championchip Card",
    location: "Sim Arena District",
    description: "A bright title-night setup with polished lighting, a clean premium mat, and a big championship-event feel.",
    theme: {
      sky: "#28385f",
      glow: "#0f1727",
      floor: "#c1c8d4",
      floorDark: "#58657d"
    }
  },
  {
    id: "sacramento-gasparilla-war",
    name: "Sacramento Gasparilla War",
    location: "Sacramento, California",
    description: "A hot fight-night build with dusty gold lighting, deep red shadows, and a rough main-event war-card feel.",
    theme: {
      sky: "#5f341f",
      glow: "#26110b",
      floor: "#b89568",
      floorDark: "#6d2a22"
    }
  },
  {
    id: "los-angeles-jaguar-ring",
    name: "Los Angeles Jaguar Ring",
    location: "Los Angeles, California",
    description: "A sleek west-coast fight card with black-and-gold lighting, sharp shadows, and a polished big-city main-event feel.",
    theme: {
      sky: "#342812",
      glow: "#0d0b08",
      floor: "#c4a357",
      floorDark: "#4a3a18"
    }
  },
  {
    id: "jumanjite",
    name: "Jumanjite",
    location: "Ancient Cobra Temple",
    description: "An ancient Indian cobra-gold fight setting with warm temple shadows, rich metallic highlights, and a mythic arena vibe.",
    theme: {
      sky: "#6c4f1f",
      glow: "#24170a",
      floor: "#c7a14b",
      floorDark: "#6f5421"
    }
  }
];

const ATTACKS = {
  jab: { key: "f", label: "jab", damage: 5, staminaCost: 10, range: 122, windup: 90, active: 110, recovery: 170, knockback: 18 },
  heavy: { key: "shift+f", label: "heavy", damage: 9, staminaCost: 18, range: 132, windup: 150, active: 140, recovery: 260, knockback: 30 },
  kick: { key: "g", label: "kick", damage: 11, staminaCost: 20, range: 152, windup: 170, active: 160, recovery: 280, knockback: 36 },
  slam: { key: "r", label: "body slam", damage: 10, staminaCost: 24, range: 96, windup: 220, active: 150, recovery: 380, knockback: 54 },
  submission: { key: "t", label: "submission", damage: 4, staminaCost: 22, range: 88, windup: 250, active: 260, recovery: 420, knockback: 0 }
};

const ARENA = {
  roundLengths: [30, 30],
  maxRounds: 2,
  openingCountdown: 3,
  betweenRoundsCountdown: 3,
  roundBreakLength: 5.2
};

const BALANCE = {
  player: {
    healthBonus: 24,
    staminaBonus: 28,
    damageMultiplier: 1.18,
    incomingDamageMultiplier: 0.58,
    incomingStaminaMultiplier: 0.68
  },
  cpu: {
    damageMultiplier: 0.72,
    incomingDamageMultiplier: 1,
    incomingStaminaMultiplier: 1
  },
  cpuAi: {
    decisionDelayMultiplier: 1.42,
    moveSpeedMultiplier: 0.8,
    strikeChance: 0.34,
    grappleChance: 0.12,
    submissionChance: 0.1,
    reactionBlockChance: 0.04
  }
};

const SETUP_STAGES = ["fighter", "opponent", "venue", "overview"];
const SETUP_FADE_MS = 180;
const SETUP_ADVANCE_DELAY_MS = 220;

const setupState = {
  fighterId: null,
  opponentId: null,
  venueId: null,
  currentStage: "fighter",
  lastLaunchMode: "play"
};

const app = {
  setupScreen: document.getElementById("setupScreen"),
  fightScreen: document.getElementById("fightScreen"),
  setupStageFrame: document.getElementById("setupStageFrame"),
  fighterGrid: document.getElementById("fighterGrid"),
  opponentGrid: document.getElementById("opponentGrid"),
  venueGrid: document.getElementById("venueGrid"),
  summaryPlayer: document.getElementById("summaryPlayer"),
  summaryOpponent: document.getElementById("summaryOpponent"),
  venueSummary: document.getElementById("venueSummary"),
  setupMessage: document.getElementById("setupMessage"),
  startButton: document.getElementById("startButton"),
  watchButton: document.getElementById("watchButton"),
  fightTitle: document.getElementById("fightTitle"),
  fightVenueLine: document.getElementById("fightVenueLine"),
  roundTimer: document.getElementById("roundTimer"),
  statusChip: document.getElementById("statusChip"),
  fightStatusHeading: document.getElementById("fightStatusHeading"),
  fightStatusCopy: document.getElementById("fightStatusCopy"),
  playerHudName: document.getElementById("playerHudName"),
  cpuHudName: document.getElementById("cpuHudName"),
  playerHealthFill: document.getElementById("playerHealthFill"),
  playerStaminaFill: document.getElementById("playerStaminaFill"),
  cpuHealthFill: document.getElementById("cpuHealthFill"),
  cpuStaminaFill: document.getElementById("cpuStaminaFill"),
  sceneMount: document.getElementById("sceneMount"),
  arenaStage: document.getElementById("arenaStage"),
  fightOverlay: document.getElementById("fightOverlay"),
  overlayKicker: document.getElementById("overlayKicker"),
  overlayTitle: document.getElementById("overlayTitle"),
  overlayBody: document.getElementById("overlayBody"),
  fightLog: document.getElementById("fightLog"),
  backToSetupButton: document.getElementById("backToSetupButton"),
  returnToLobbyButton: document.getElementById("returnToLobbyButton"),
  restartFightButton: document.getElementById("restartFightButton")
};

app.setupStages = Array.from(document.querySelectorAll(".setup-stage"));
app.progressSteps = Array.from(document.querySelectorAll("[data-progress-step]"));
app.stageJumpButtons = Array.from(document.querySelectorAll("[data-jump-stage]"));

let matchState = null;
let animationFrameId = 0;
let lastFrameTime = 0;
let stageTransitionTimeoutId = 0;
let stageAdvanceTimeoutId = 0;
const heldKeys = new Set();
const world = {
  scene: null,
  camera: null,
  renderer: null,
  clock: null,
  playerRoot: null,
  cpuRoot: null,
  playerRig: null,
  cpuRig: null,
  venueSign: null,
  floorMat: null,
  crowdRing: [],
  floorGlow: null,
  cageLinks: [],
  cageRails: [],
  cagePosts: [],
  spotlights: [],
  apron: null,
  upperBowl: null,
  lowerBowl: null,
  overheadRig: null,
  backyardGroup: null,
  backyardGround: null,
  backyardTrampolineMat: null,
  backyardTrampolinePad: null,
  backyardTrampolineLegs: [],
  backyardFence: [],
  backyardTrees: [],
  backyardHouse: null,
  jumanjiteGroup: null,
  jumanjiteMat: null,
  jumanjiteApron: null,
  jumanjitePosts: [],
  jumanjiteRopes: [],
  jumanjiteStatue: null,
  jumanjiteTorches: [],
  o2RingGroup: null,
  o2RingMat: null,
  o2RingApron: null,
  o2RingPosts: [],
  o2RingRopes: [],
  o2RingPillars: [],
  o2RingSign: null,
  cameraTarget: { x: 0, y: 3.8, z: 0 },
  cameraPosition: { x: 0, y: 8.6, z: 17.6 },
  cameraShake: 0
};

function getFighterById(id) {
  return FIGHTERS.find((fighter) => fighter.id === id) ?? null;
}

function getVenueById(id) {
  return VENUES.find((venue) => venue.id === id) ?? null;
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function getRoundLength(roundNumber) {
  return ARENA.roundLengths[roundNumber - 1] ?? ARENA.roundLengths[ARENA.roundLengths.length - 1];
}

function formatClock(seconds) {
  const safeSeconds = Math.max(0, Math.ceil(seconds));
  const minutes = Math.floor(safeSeconds / 60);
  const remainder = safeSeconds % 60;
  return `${minutes}:${String(remainder).padStart(2, "0")}`;
}

function scaleStat(value) {
  return `${clamp(value, 0, 100)}%`;
}

function createStatRows(stats) {
  return `
    <div class="stats-grid">
      <div class="stat-row">
        <span>Power</span>
        <div class="stat-meter"><span class="stat-meter-fill" style="width:${scaleStat(stats.power)}"></span></div>
      </div>
      <div class="stat-row">
        <span>Speed</span>
        <div class="stat-meter"><span class="stat-meter-fill" style="width:${scaleStat(stats.speed)}"></span></div>
      </div>
      <div class="stat-row">
        <span>Stamina</span>
        <div class="stat-meter"><span class="stat-meter-fill" style="width:${scaleStat(stats.stamina)}"></span></div>
      </div>
      <div class="stat-row">
        <span>Chin</span>
        <div class="stat-meter"><span class="stat-meter-fill" style="width:${scaleStat(stats.chin)}"></span></div>
      </div>
    </div>
  `;
}

function renderSelectionCards() {
  app.fighterGrid.innerHTML = "";
  app.opponentGrid.innerHTML = "";
  app.venueGrid.innerHTML = "";

  FIGHTERS.forEach((fighter) => {
    const playerCard = buildFighterCard(fighter, "fighter");
    const opponentCard = buildFighterCard(fighter, "opponent");
    app.fighterGrid.appendChild(playerCard);
    app.opponentGrid.appendChild(opponentCard);
  });

  VENUES.forEach((venue) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-card";
    button.dataset.kind = "venue";
    button.dataset.id = venue.id;
    button.style.setProperty("--venue-sky", venue.theme.sky);
    button.style.setProperty("--venue-glow", venue.theme.glow);
    button.style.setProperty("--venue-floor", venue.theme.floor);
    button.style.setProperty("--venue-floor-dark", venue.theme.floorDark);
    button.innerHTML = `
      <div class="venue-card-top">
        <div>
          <h3 class="fighter-name">${venue.name}</h3>
          <p class="venue-location">${venue.location}</p>
        </div>
        <span class="venue-badge">Arena</span>
      </div>
      <div class="venue-preview"></div>
      <p class="venue-description">${venue.description}</p>
    `;
    button.addEventListener("click", () => {
      setupState.venueId = venue.id;
      syncSetupUi();
      scheduleSetupAdvance("overview");
    });
    app.venueGrid.appendChild(button);
  });

  syncSetupUi({ targetStage: "fighter", instant: true });
}

function buildFighterCard(fighter, kind) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "option-card";
  button.dataset.kind = kind;
  button.dataset.id = fighter.id;
  button.style.setProperty("--swatch-primary", fighter.palette.primary);
  button.style.setProperty("--swatch-secondary", fighter.palette.secondary);
  button.innerHTML = `
    <div class="fighter-card-top">
      <div>
        <h3 class="fighter-name">${fighter.name}</h3>
        <p class="fighter-meta">${fighter.nickname} · ${fighter.weightClass} · ${fighter.record}</p>
      </div>
      <div class="fighter-swatch" aria-hidden="true"></div>
    </div>
    <span class="fighter-badge">${kind === "fighter" ? "Player Pick" : "CPU Pick"}</span>
    <p class="fighter-tagline">${fighter.tagline}</p>
    ${createStatRows(fighter.stats)}
  `;

  button.addEventListener("click", () => {
    if (kind === "fighter") {
      setupState.fighterId = fighter.id;
      if (setupState.opponentId === fighter.id) {
        setupState.opponentId = null;
      }
      syncSetupUi();
      scheduleSetupAdvance("opponent");
    } else {
      if (setupState.fighterId === fighter.id) {
        return;
      }
      setupState.opponentId = fighter.id;
      syncSetupUi();
      scheduleSetupAdvance("venue");
    }
  });

  return button;
}

function syncSetupUi(options = {}) {
  const selectedFighter = getFighterById(setupState.fighterId);
  const selectedOpponent = getFighterById(setupState.opponentId);
  const selectedVenue = getVenueById(setupState.venueId);

  document.querySelectorAll('[data-kind="fighter"]').forEach((card) => {
    card.classList.toggle("selected", card.dataset.id === setupState.fighterId);
  });

  document.querySelectorAll('[data-kind="opponent"]').forEach((card) => {
    const isSameAsPlayer = card.dataset.id === setupState.fighterId;
    card.classList.toggle("selected", card.dataset.id === setupState.opponentId);
    card.classList.toggle("disabled", isSameAsPlayer);
    card.disabled = isSameAsPlayer;
  });

  document.querySelectorAll('[data-kind="venue"]').forEach((card) => {
    card.classList.toggle("selected", card.dataset.id === setupState.venueId);
  });

  app.summaryPlayer.innerHTML = selectedFighter
    ? `
      <span class="matchup-role">Player</span>
      <strong>${selectedFighter.name}</strong>
      <p>${selectedFighter.nickname} · ${selectedFighter.weightClass}<br />${selectedFighter.tagline}</p>
    `
    : `
      <span class="matchup-role">Player</span>
      <strong>Select a fighter</strong>
      <p>Speed, power, and gas tank will change how the match feels.</p>
    `;

  app.summaryOpponent.innerHTML = selectedOpponent
    ? `
      <span class="matchup-role">CPU</span>
      <strong>${selectedOpponent.name}</strong>
      <p>${selectedOpponent.nickname} · ${selectedOpponent.weightClass}<br />${selectedOpponent.tagline}</p>
    `
    : `
      <span class="matchup-role">CPU</span>
      <strong>Select an opponent</strong>
      <p>The CPU will use the same stat profile as the card you choose.</p>
    `;

  app.venueSummary.innerHTML = selectedVenue
    ? `
      <p class="section-label">Venue</p>
      <strong>${selectedVenue.name}</strong>
      <p>${selectedVenue.location}<br />${selectedVenue.description}</p>
    `
    : `
      <p class="section-label">Venue</p>
      <strong>Pick an arena</strong>
      <p>Each venue uses a different color palette, crowd lighting, and mat design.</p>
    `;

  const canStart = Boolean(selectedFighter && selectedOpponent && selectedVenue);
  app.startButton.disabled = !canStart;
  app.watchButton.disabled = !canStart;
  app.setupMessage.textContent = getSetupMessage(selectedFighter, selectedOpponent, selectedVenue);

  const fallbackStage = getAllowedSetupStage(setupState.currentStage);
  if (options.targetStage) {
    transitionSetupStage(options.targetStage, { instant: Boolean(options.instant) });
  } else if (fallbackStage !== setupState.currentStage) {
    transitionSetupStage(fallbackStage, { instant: true });
  } else {
    updateSetupProgress();
  }
}

function getSetupMessage(selectedFighter, selectedOpponent, selectedVenue) {
  if (!selectedFighter) {
    return "Choose the fighter you want to control.";
  }
  if (!selectedOpponent) {
    return "Choose the CPU opponent for this match.";
  }
  if (!selectedVenue) {
    return "Pick a venue before the fight card can go live.";
  }
  return `${selectedFighter.name} vs ${selectedOpponent.name} is ready at ${selectedVenue.name}. You can play it yourself or watch both fighters battle with AI.`;
}

function canLaunchMatch() {
  return Boolean(setupState.fighterId && setupState.opponentId && setupState.venueId);
}

function getFirstIncompleteStage() {
  if (!setupState.fighterId) {
    return "fighter";
  }
  if (!setupState.opponentId) {
    return "opponent";
  }
  if (!setupState.venueId) {
    return "venue";
  }
  return "overview";
}

function getAllowedSetupStage(requestedStage) {
  const requestedIndex = SETUP_STAGES.indexOf(requestedStage);
  if (requestedIndex === -1) {
    return getFirstIncompleteStage();
  }

  const highestUnlockedIndex = SETUP_STAGES.indexOf(getFirstIncompleteStage());
  return SETUP_STAGES[Math.min(requestedIndex, highestUnlockedIndex)];
}

function clearSetupTimers() {
  window.clearTimeout(stageTransitionTimeoutId);
  window.clearTimeout(stageAdvanceTimeoutId);
}

function setActiveSetupStage(stage) {
  setupState.currentStage = stage;
  app.setupStages.forEach((section) => {
    const isActive = section.dataset.stage === stage;
    section.hidden = !isActive;
  });
  updateSetupProgress();
}

function transitionSetupStage(targetStage, { instant = false } = {}) {
  const allowedStage = getAllowedSetupStage(targetStage);
  window.clearTimeout(stageAdvanceTimeoutId);

  if (allowedStage === setupState.currentStage && !instant) {
    updateSetupProgress();
    return;
  }

  if (instant) {
    app.setupStageFrame.classList.remove("is-fading");
    setActiveSetupStage(allowedStage);
    return;
  }

  window.clearTimeout(stageTransitionTimeoutId);
  app.setupStageFrame.classList.add("is-fading");
  stageTransitionTimeoutId = window.setTimeout(() => {
    setActiveSetupStage(allowedStage);
    window.requestAnimationFrame(() => {
      app.setupStageFrame.classList.remove("is-fading");
    });
  }, SETUP_FADE_MS);
}

function scheduleSetupAdvance(targetStage) {
  window.clearTimeout(stageAdvanceTimeoutId);
  stageAdvanceTimeoutId = window.setTimeout(() => {
    transitionSetupStage(targetStage);
  }, SETUP_ADVANCE_DELAY_MS);
}

function updateSetupProgress() {
  const activeIndex = SETUP_STAGES.indexOf(setupState.currentStage);
  const highestUnlockedIndex = SETUP_STAGES.indexOf(getFirstIncompleteStage());

  app.progressSteps.forEach((step) => {
    const stepIndex = SETUP_STAGES.indexOf(step.dataset.progressStep);
    step.classList.toggle("is-active", stepIndex === activeIndex);
    step.classList.toggle("is-complete", stepIndex < highestUnlockedIndex);
    step.classList.toggle("is-locked", stepIndex > highestUnlockedIndex);
  });
}

function resetSetupFlow() {
  clearSetupTimers();
  setupState.fighterId = null;
  setupState.opponentId = null;
  setupState.venueId = null;
  setupState.currentStage = "fighter";
  setupState.lastLaunchMode = "play";
  syncSetupUi({ targetStage: "fighter", instant: true });
}

function createCombatant(fighter, role) {
  const balance = role === "player" ? BALANCE.player : BALANCE.cpu;
  const maxHealth = fighter.stats.health + balance.healthBonus;
  const maxStamina = fighter.stats.stamina + balance.staminaBonus;
  return {
    role,
    profile: fighter,
    x: 0,
    health: maxHealth,
    maxHealth,
    stamina: maxStamina,
    maxStamina,
    attack: null,
    hitFlash: 0,
    moveIntent: 0,
    blockHeld: false,
    defeated: false,
    aiTimer: 0,
    aiBehavior: "circle"
  };
}

function createMatchState(launchMode = "play") {
  const playerProfile = getFighterById(setupState.fighterId);
  const cpuProfile = getFighterById(setupState.opponentId);
  const venue = getVenueById(setupState.venueId);

  return {
    venue,
    player: createCombatant(playerProfile, "player"),
    cpu: createCombatant(cpuProfile, "cpu"),
    spectatorMode: launchMode === "watch",
    round: 1,
    maxRounds: ARENA.maxRounds,
    timer: getRoundLength(1),
    phase: "countdown",
    countdown: ARENA.openingCountdown,
    intermission: 0,
    overlayVisible: true,
    winner: null,
    log: [
      `${playerProfile.name} enters first.`,
      `${cpuProfile.name} makes the walk.`,
      `${venue.name} is ready for the opening bell.`
    ]
  };
}

function startFight(launchMode = "play") {
  if (!canLaunchMatch()) {
    return;
  }

  stopAnimationLoop();
  setupState.lastLaunchMode = launchMode;
  matchState = createMatchState(launchMode);
  heldKeys.clear();
  app.setupScreen.hidden = true;
  app.fightScreen.hidden = false;
  setStartingPositions(matchState);
  init3DIfNeeded();
  applyVenueTheme(matchState.venue);
  applyFighterTheme(matchState.player.profile, world.playerRig, false);
  applyFighterTheme(matchState.cpu.profile, world.cpuRig, true);
  app.fightTitle.textContent = matchState.spectatorMode
    ? `${matchState.player.profile.name} vs ${matchState.cpu.profile.name} · Watch Mode`
    : `${matchState.player.profile.name} vs ${matchState.cpu.profile.name}`;
  app.fightVenueLine.textContent = `${matchState.venue.name} · ${matchState.venue.location}`;
  app.playerHudName.textContent = matchState.player.profile.name;
  app.cpuHudName.textContent = matchState.cpu.profile.name;
  app.statusChip.textContent = "Round 1 Ready";
  setOverlay("Round 1", String(ARENA.openingCountdown), "Touch gloves and get ready.");
  updateStatus(
    "Opening bell incoming",
    matchState.spectatorMode
      ? "Watch mode is active. Both fighters will be controlled by AI, and close fights can spill into round 2."
      : "Use your jab to manage range and keep enough stamina for heavier shots if the fight stretches into round 2."
  );
  renderLog();
  updateHud();
  layoutCombatants();
  startAnimationLoop();
}

function restartFight() {
  if (!setupState.fighterId || !setupState.opponentId || !setupState.venueId) {
    return;
  }
  startFight(setupState.lastLaunchMode);
}

function returnToSetup() {
  stopAnimationLoop();
  matchState = null;
  heldKeys.clear();
  app.fightScreen.hidden = true;
  app.setupScreen.hidden = false;
  resetSetupFlow();
}

function applyVenueTheme(venue) {
  if (!world.scene) {
    return;
  }
  const isBackyard = venue.id === "backyard-brawl-ring";
  const isJumanjite = venue.id === "jumanjite";
  const isO2Ring = venue.id === "o2-ring";
  const useStandardArena = !isBackyard && !isJumanjite && !isO2Ring;
  world.scene.background = new THREE.Color(venue.theme.sky);
  world.scene.fog = new THREE.Fog(venue.theme.sky, 18, 46);
  world.floorMat.material.color.set(venue.theme.floor);
  world.floorMat.material.map = createMatTexture(
    venue.theme.floor,
    venue.theme.floorDark,
    venue.matLogoColor ?? venue.theme.glow,
    venue.matText ?? ["Fight", "Simulator"],
    venue.matIcon ?? null,
    venue.matAccentColor ?? venue.theme.glow
  );
  world.floorMat.material.map.needsUpdate = true;
  world.floorGlow.material.color.set(venue.theme.floorDark);
  if (world.apron) {
    world.apron.material.color.set(venue.theme.glow);
  }
  if (world.lowerBowl) {
    world.lowerBowl.material.color.set(venue.theme.floorDark);
  }
  if (world.upperBowl) {
    world.upperBowl.material.color.set(venue.theme.glow);
  }
  const venueSignText = venue.signText ?? venue.name;
  world.venueSign.material.map = createTextTexture(venueSignText, venue.theme.glow, "#f4e0ae", 512, 128, 50);
  world.venueSign.material.map.needsUpdate = true;

  world.crowdRing.forEach((segment, index) => {
    const mix = index % 2 === 0 ? venue.theme.glow : venue.theme.floorDark;
    segment.material.color.set(mix);
  });

  world.cageLinks.forEach((panel) => {
    panel.material.color.set("#bfcad8");
  });

  world.cageRails.forEach((rail, index) => {
    rail.material.color.set(index % 3 === 2 ? "#111418" : "#232a35");
  });

  world.spotlights.forEach((light, index) => {
    light.color.set(index % 2 === 0 ? "#fff4d7" : venue.theme.floor);
  });

  setStandardArenaVisibility(useStandardArena);
  setBackyardVenueMode(isBackyard, venue);
  setJumanjiteVenueMode(isJumanjite, venue);
  setO2RingVenueMode(isO2Ring, venue);
}

function setStandardArenaVisibility(isVisible) {
  if (world.apron) {
    world.apron.visible = isVisible;
  }
  if (world.floorMat) {
    world.floorMat.visible = isVisible;
  }
  if (world.floorGlow) {
    world.floorGlow.visible = isVisible;
  }
  if (world.lowerBowl) {
    world.lowerBowl.visible = isVisible;
  }
  if (world.upperBowl) {
    world.upperBowl.visible = isVisible;
  }
  if (world.overheadRig) {
    world.overheadRig.visible = isVisible;
  }
  if (world.venueSign) {
    world.venueSign.visible = isVisible;
  }
  world.crowdRing.forEach((item) => {
    item.visible = isVisible;
  });
  world.cageLinks.forEach((item) => {
    item.visible = isVisible;
  });
  world.cageRails.forEach((item) => {
    item.visible = isVisible;
  });
  world.cagePosts.forEach((item) => {
    item.visible = isVisible;
  });
}

function applyFighterTheme(fighter, rig, mirror) {
  if (!rig) {
    return;
  }
  const hairConfig = fighter.hair ?? null;
  rig.torso.material.color.set(fighter.palette.primary);
  rig.waist.material.color.set("#141920");
  rig.accent.material.color.set(fighter.palette.secondary);
  rig.head.material.color.set(fighter.palette.skin);
  rig.neck.material.color.set(fighter.palette.skin);
  rig.upperArmLeft.material.color.set(fighter.palette.skin);
  rig.upperArmRight.material.color.set(fighter.palette.skin);
  rig.forearmLeft.material.color.set(fighter.palette.skin);
  rig.forearmRight.material.color.set(fighter.palette.skin);
  rig.thighLeft.material.color.set("#1a212b");
  rig.thighRight.material.color.set("#1a212b");
  rig.shinLeft.material.color.set("#1d2631");
  rig.shinRight.material.color.set("#1d2631");
  rig.gloveLeft.material.color.set(fighter.palette.primary);
  rig.gloveRight.material.color.set(fighter.palette.primary);
  rig.bootLeft.material.color.set("#0c0f14");
  rig.bootRight.material.color.set("#0c0f14");
  if (rig.hairGroup) {
    rig.hairGroup.visible = Boolean(hairConfig);
  }
  if (rig.hairCap) {
    rig.hairCap.visible = hairConfig?.style === "braids" || hairConfig?.style === "dreads";
  }
  if (rig.braids?.length) {
    rig.braids.forEach((braid) => {
      braid.visible = hairConfig?.style === "braids";
      if (hairConfig?.color) {
        braid.material.color.set(hairConfig.color);
      }
    });
  }
  if (rig.dreads?.length) {
    rig.dreads.forEach((dread) => {
      dread.visible = hairConfig?.style === "dreads";
      if (hairConfig?.color) {
        dread.material.color.set(hairConfig.color);
      }
    });
  }
  if (rig.hairCap && hairConfig?.color) {
    rig.hairCap.material.color.set(hairConfig.color);
  }
  rig.baseScale = {
    x: mirror ? -1 : 1,
    y: 1 + (fighter.stats.health - 100) * 0.0014,
    z: 1 + (fighter.stats.power - 75) * 0.0011
  };
  rig.root.scale.set(rig.baseScale.x, rig.baseScale.y, rig.baseScale.z);
}

function startAnimationLoop() {
  lastFrameTime = performance.now();
  animationFrameId = window.requestAnimationFrame(stepFrame);
}

function stopAnimationLoop() {
  if (animationFrameId) {
    window.cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }
}

function stepFrame(timestamp) {
  if (!matchState) {
    return;
  }

  const deltaMs = Math.min(40, timestamp - lastFrameTime);
  lastFrameTime = timestamp;
  updateMatch(deltaMs / 1000);
  layoutCombatants();
  render3D(deltaMs / 1000);
  updateHud();

  if (matchState) {
    animationFrameId = window.requestAnimationFrame(stepFrame);
  }
}

function updateMatch(deltaSeconds) {
  if (matchState.phase === "countdown") {
    updateCountdownPhase(deltaSeconds);
    return;
  }

  if (matchState.phase === "intermission") {
    updateIntermissionPhase(deltaSeconds);
    return;
  }

  if (matchState.phase !== "live") {
    return;
  }

  matchState.timer = Math.max(0, matchState.timer - deltaSeconds);
  clampCombatantsToArena();
  updateCombatantTimers(matchState.player, deltaSeconds);
  updateCombatantTimers(matchState.cpu, deltaSeconds);
  if (matchState.spectatorMode) {
    handleCpu(matchState.player, matchState.cpu, deltaSeconds);
  } else {
    handlePlayer(matchState.player, deltaSeconds);
  }
  handleCpu(matchState.cpu, matchState.player, deltaSeconds);
  resolveAttacks(matchState.player, matchState.cpu);
  resolveAttacks(matchState.cpu, matchState.player);
  enforceSpacing(matchState.player, matchState.cpu);
  checkForWinner();
}

function updateCountdownPhase(deltaSeconds) {
  matchState.countdown -= deltaSeconds;
  if (matchState.countdown <= 0) {
    matchState.phase = "live";
    matchState.overlayVisible = false;
    app.fightOverlay.classList.add("hidden");
    updateStatus(
      `Round ${matchState.round} live`,
      matchState.spectatorMode
        ? "Spectator mode is active. Watch both fighters manage distance, stamina, and counters on their own."
        : "Work behind the jab, then spend stamina on heavier shots when the CPU is in range."
    );
    app.statusChip.textContent = matchState.spectatorMode ? `Watch R${matchState.round}` : `Round ${matchState.round}`;
    pushLog(matchState.round === 1 ? "The referee steps back and the fight is on." : `Round ${matchState.round} begins.`);
    return;
  }

  const display = Math.max(1, Math.ceil(matchState.countdown));
  setOverlay(
    `Round ${matchState.round}`,
    String(display),
    matchState.round === 1 ? "Touch gloves and get ready." : `Corners clear. Round ${matchState.round} is about to start.`
  );
}

function updateIntermissionPhase(deltaSeconds) {
  matchState.intermission -= deltaSeconds;
  app.statusChip.textContent = "Cutscene";
  updateStatus("Between rounds", "A short cutscene is playing while both corners reset their fighters for round 2.");
  setOverlay("Round Break", "Round 2", `Both corners go to work. Round 2 starts in ${Math.max(1, Math.ceil(matchState.intermission))}.`);

  if (matchState.intermission <= 0) {
    startNextRound();
  }
}

function updateCombatantTimers(combatant, deltaSeconds) {
  combatant.stamina = Math.min(combatant.maxStamina, combatant.stamina + (14 + combatant.profile.stats.stamina * 0.05) * deltaSeconds);
  combatant.hitFlash = Math.max(0, combatant.hitFlash - deltaSeconds);

  if (!combatant.attack) {
    return;
  }

  combatant.attack.elapsed += deltaSeconds * 1000;
  const moveName = combatant.attack.type;
  const spec = ATTACKS[moveName];

  if (combatant.attack.phase === "windup" && combatant.attack.elapsed >= spec.windup) {
    combatant.attack.phase = "active";
  } else if (
    combatant.attack.phase === "active" &&
    combatant.attack.elapsed >= spec.windup + spec.active
  ) {
    combatant.attack.phase = "recovery";
  } else if (
    combatant.attack.phase === "recovery" &&
    combatant.attack.elapsed >= spec.windup + spec.active + spec.recovery
  ) {
    combatant.attack = null;
  }
}

function handlePlayer(player, deltaSeconds) {
  const metrics = getArenaMetrics();
  const moveLeft = heldKeys.has("a");
  const moveRight = heldKeys.has("d");
  player.blockHeld = heldKeys.has("e");
  player.moveIntent = 0;

  if (player.attack?.phase === "active" || player.attack?.phase === "windup") {
    return;
  }

  if (moveLeft && !moveRight) {
    player.moveIntent = -1;
  } else if (moveRight && !moveLeft) {
    player.moveIntent = 1;
  }

  const speed = 110 + player.profile.stats.speed * 1.35;
  player.x = clamp(player.x + player.moveIntent * speed * deltaSeconds, metrics.minX, metrics.maxX);
}

function handleCpu(cpu, player, deltaSeconds) {
  const metrics = getArenaMetrics();
  cpu.aiTimer -= deltaSeconds;
  const distance = player.x - cpu.x;
  const absDistance = Math.abs(distance);
  cpu.blockHeld = false;
  cpu.moveIntent = 0;

  if (cpu.attack?.phase === "active" || cpu.attack?.phase === "windup") {
    return;
  }

  if (player.attack?.phase === "active" && absDistance < 170 && Math.random() < BALANCE.cpuAi.reactionBlockChance) {
    cpu.blockHeld = true;
  }

  if (cpu.aiTimer <= 0) {
    cpu.aiTimer = (0.18 + Math.random() * 0.34) * BALANCE.cpuAi.decisionDelayMultiplier;
    if (absDistance > 140) {
      cpu.aiBehavior = "close";
    } else if (cpu.stamina < 20) {
      cpu.aiBehavior = "retreat";
    } else if (Math.random() < 0.4) {
      cpu.aiBehavior = "strike";
    } else {
      cpu.aiBehavior = "circle";
    }
  }

  if (cpu.aiBehavior === "close") {
    cpu.moveIntent = distance > 0 ? 1 : -1;
  } else if (cpu.aiBehavior === "retreat") {
    cpu.moveIntent = distance > 0 ? -1 : 1;
  } else if (cpu.aiBehavior === "circle" && absDistance > 118) {
    cpu.moveIntent = distance > 0 ? 1 : -1;
  }

  const speed = (92 + cpu.profile.stats.speed * 1.24) * BALANCE.cpuAi.moveSpeedMultiplier;
  cpu.x = clamp(cpu.x + cpu.moveIntent * speed * deltaSeconds, metrics.minX, metrics.maxX);

  if (cpu.aiBehavior === "strike" && !cpu.attack && absDistance <= 156 && Math.random() < BALANCE.cpuAi.strikeChance) {
    let attackName = null;
    if (
      absDistance <= ATTACKS.submission.range &&
      player.stamina <= player.maxStamina * 0.22 &&
      Math.random() < BALANCE.cpuAi.submissionChance
    ) {
      attackName = "submission";
    } else if (absDistance <= ATTACKS.slam.range && Math.random() < BALANCE.cpuAi.grappleChance) {
      attackName = "slam";
    } else {
      const options = ["jab", "jab", "heavy", "kick"];
      attackName = options[Math.floor(Math.random() * options.length)];
    }
    tryStartAttack(cpu, attackName, true);
    cpu.aiBehavior = "circle";
  }
}

function tryStartAttack(combatant, attackName, isCpu = false) {
  if (!matchState || matchState.phase !== "live") {
    return;
  }

  if (combatant.attack || combatant.defeated) {
    return;
  }

  const spec = ATTACKS[attackName];
  if (!spec || combatant.stamina < spec.staminaCost) {
    return;
  }

  if (attackName === "slam" || attackName === "submission") {
    const opponent = combatant.role === "player" ? matchState.cpu : matchState.player;
    const distance = opponent ? Math.abs(combatant.x - opponent.x) : Number.POSITIVE_INFINITY;
    if (distance > spec.range + 10) {
      if (!isCpu) {
        updateStatus("Too far out", `${spec.label[0].toUpperCase()}${spec.label.slice(1)} needs close range to start.`);
      }
      return;
    }
  }

  combatant.stamina -= spec.staminaCost;
  combatant.attack = {
    type: attackName,
    elapsed: 0,
    phase: "windup",
    landed: false
  };

  if (!isCpu) {
    app.statusChip.textContent = `Player ${spec.label}`;
  }
}

function resolveAttacks(attacker, defender) {
  if (!attacker.attack || attacker.attack.phase !== "active" || attacker.attack.landed || matchState?.phase !== "live") {
    return;
  }

  const spec = ATTACKS[attacker.attack.type];
  const distance = Math.abs(attacker.x - defender.x);
  if (distance > spec.range || defender.defeated) {
    return;
  }

  attacker.attack.landed = true;
  const metrics = getArenaMetrics();
  const isSlam = attacker.attack.type === "slam";
  const isSubmission = attacker.attack.type === "submission";
  const attackerBalance = attacker.role === "player" ? BALANCE.player : BALANCE.cpu;
  const defenderBalance = defender.role === "player" ? BALANCE.player : BALANCE.cpu;
  const baseDamage = spec.damage + attacker.profile.stats.power * 0.12;
  const reducedByChin = defender.profile.stats.chin * 0.06;
  let damage = Math.max(2, Math.round((baseDamage - reducedByChin) * (isSlam ? 0.84 : isSubmission ? 0.45 : 0.7)));
  let staminaDamage = Math.max(5, Math.round(spec.staminaCost * (isSubmission ? 1.36 : isSlam ? 1.28 : 1.18) + attacker.profile.stats.power * 0.05));

  if (defender.blockHeld) {
    damage = Math.max(2, Math.round(damage * 0.38));
    staminaDamage = Math.max(3, Math.round(staminaDamage * 0.72));
    pushLog(`${defender.profile.name} blocks most of the ${spec.label}.`);
    world.cameraShake = Math.max(world.cameraShake, 0.06);
  } else {
    pushLog(`${attacker.profile.name} lands a ${spec.label}.`);
    world.cameraShake = Math.max(world.cameraShake, attackTypeToShake(spec.label));
  }

  damage = Math.max(1, Math.round(damage * attackerBalance.damageMultiplier * defenderBalance.incomingDamageMultiplier));
  staminaDamage = Math.max(2, Math.round(staminaDamage * defenderBalance.incomingStaminaMultiplier));

  if (isSubmission) {
    const staminaEdge = 1 - defender.stamina / Math.max(1, defender.maxStamina);
    const healthEdge = 1 - defender.health / Math.max(1, defender.maxHealth);
    let finishChance = 0.12 + staminaEdge * 0.5 + healthEdge * 0.24;
    if (defender.blockHeld) {
      finishChance *= 0.55;
    }
    if (defender.stamina <= defender.maxStamina * 0.18 || defender.health <= defender.maxHealth * 0.22) {
      finishChance += 0.18;
    }
    finishChance = clamp(finishChance, 0.08, 0.86);

    if (Math.random() < finishChance) {
      updateStatus(`${attacker.profile.name} locks it in`, `${defender.profile.name} taps to the submission.`);
      pushLog(`${attacker.profile.name} forces the tap with a tight submission attempt.`);
      finishFight(attacker.role, `${attacker.profile.name} wins by submission.`);
      return;
    }

    damage = Math.max(1, Math.round(damage * 0.6));
    pushLog(`${defender.profile.name} survives the submission attempt and scrambles free.`);
    updateStatus(`${defender.profile.nickname} escapes`, `${defender.profile.name} fights the hands and breaks loose.`);
  }

  defender.stamina = Math.max(0, defender.stamina - staminaDamage);
  defender.health = Math.max(0, defender.health - damage);
  defender.hitFlash = 0.22;
  defender.x = clamp(
    defender.x + (attacker.role === "player" ? 1 : -1) * spec.knockback,
    metrics.minX,
    metrics.maxX
  );
  updateStatus(
    defender.health <= 0 ? `${attacker.profile.name} scores the finish` : `${attacker.profile.nickname} connects`,
    defender.health <= 0
      ? `${defender.profile.name} cannot continue.`
      : isSlam
        ? `${attacker.profile.name} drove through with a body slam.`
        : isSubmission
          ? `${attacker.profile.name} nearly finished the submission.`
          : `${attacker.profile.name} clipped ${defender.profile.name} with a ${spec.label}.`
  );
}

function enforceSpacing(player, cpu) {
  const metrics = getArenaMetrics();
  const minGap = 86;
  const distance = cpu.x - player.x;
  if (distance >= minGap) {
    return;
  }
  const push = (minGap - distance) / 2;
  player.x = clamp(player.x - push, metrics.minX, metrics.maxX);
  cpu.x = clamp(cpu.x + push, metrics.minX, metrics.maxX);
}

function checkForWinner() {
  if (!matchState) {
    return;
  }

  if (matchState.player.health <= 0) {
    finishFight("cpu", `${matchState.cpu.profile.name} wins by KO/TKO.`);
    return;
  }

  if (matchState.cpu.health <= 0) {
    finishFight("player", `${matchState.player.profile.name} wins by KO/TKO.`);
    return;
  }

  if (matchState.timer <= 0) {
    if (matchState.round < matchState.maxRounds) {
      beginRoundIntermission();
      return;
    }

    finishFightByDecision();
  }
}

function beginRoundIntermission() {
  if (!matchState) {
    return;
  }

  matchState.phase = "intermission";
  matchState.intermission = ARENA.roundBreakLength;
  resetCombatantForRoundBreak(matchState.player);
  resetCombatantForRoundBreak(matchState.cpu);
  setStartingPositions(matchState);
  layoutCombatants();
  pushLog(`Round ${matchState.round} ends. The corners get to work before round 2.`);
  app.fightOverlay.classList.remove("hidden");
}

function resetCombatantForRoundBreak(combatant) {
  combatant.attack = null;
  combatant.hitFlash = 0;
  combatant.moveIntent = 0;
  combatant.blockHeld = false;
  combatant.stamina = Math.min(combatant.maxStamina, combatant.stamina + combatant.maxStamina * 0.42);
}

function startNextRound() {
  if (!matchState) {
    return;
  }

  matchState.round += 1;
  matchState.timer = getRoundLength(matchState.round);
  matchState.phase = "countdown";
  matchState.countdown = ARENA.betweenRoundsCountdown;
  matchState.overlayVisible = true;
  setStartingPositions(matchState);
  layoutCombatants();
  app.statusChip.textContent = `Round ${matchState.round} Ready`;
  updateStatus("Corners clear", `Round ${matchState.round} is about to begin.`);
}

function finishFightByDecision() {
  const playerHealth = matchState.player.health;
  const cpuHealth = matchState.cpu.health;
  if (playerHealth === cpuHealth) {
    finishFight("draw", "The judges call it a draw.");
  } else if (playerHealth > cpuHealth) {
    finishFight("player", `${matchState.player.profile.name} wins the decision.`);
  } else {
    finishFight("cpu", `${matchState.cpu.profile.name} wins the decision.`);
  }
}

function finishFight(winner, headline) {
  if (!matchState || matchState.phase === "finished") {
    return;
  }

  matchState.phase = "finished";
  matchState.winner = winner;
  matchState.player.defeated = winner === "cpu";
  matchState.cpu.defeated = winner === "player";
  pushLog(headline);
  setOverlay("Official Result", winner === "draw" ? "Draw" : "Fight Over", headline);
  app.fightOverlay.classList.remove("hidden");
  app.statusChip.textContent = winner === "draw" ? "Draw" : winner === "player" ? "Player Won" : "CPU Won";
  updateStatus(
    headline,
    winner === "draw"
      ? "Time expired with both fighters still standing."
      : "Restart the match or head back to the setup screen to book another fight."
  );
}

function updateHud() {
  if (!matchState) {
    return;
  }

  app.roundTimer.textContent =
    matchState.phase === "intermission"
      ? `CUT ${Math.max(1, Math.ceil(matchState.intermission))}`
      : `R${matchState.round} ${formatClock(matchState.timer)}`;
  app.playerHealthFill.style.width = `${(matchState.player.health / matchState.player.maxHealth) * 100}%`;
  app.playerStaminaFill.style.width = `${(matchState.player.stamina / matchState.player.maxStamina) * 100}%`;
  app.cpuHealthFill.style.width = `${(matchState.cpu.health / matchState.cpu.maxHealth) * 100}%`;
  app.cpuStaminaFill.style.width = `${(matchState.cpu.stamina / matchState.cpu.maxStamina) * 100}%`;
}

function layoutCombatants() {
  if (!matchState || !world.playerRoot || !world.cpuRoot) {
    return;
  }

  const metrics = getArenaMetrics();
  const playerWorldX = mapStageXToWorld(matchState.player.x, metrics);
  const cpuWorldX = mapStageXToWorld(matchState.cpu.x, metrics);
  world.playerRoot.position.x = playerWorldX;
  world.cpuRoot.position.x = cpuWorldX;
}

function getArenaMetrics() {
  const width = app.arenaStage.clientWidth || 960;
  const fighterWidth = 120;
  const sidePadding = Math.max(18, Math.round(width * 0.04));
  return {
    width,
    fighterWidth,
    minX: sidePadding,
    maxX: Math.max(sidePadding, width - fighterWidth - sidePadding)
  };
}

function setStartingPositions(state) {
  const metrics = getArenaMetrics();
  state.player.x = clamp(metrics.width * 0.18, metrics.minX, metrics.maxX);
  state.cpu.x = clamp(metrics.width * 0.68, metrics.minX, metrics.maxX);
}

function clampCombatantsToArena() {
  if (!matchState) {
    return;
  }
  const metrics = getArenaMetrics();
  matchState.player.x = clamp(matchState.player.x, metrics.minX, metrics.maxX);
  matchState.cpu.x = clamp(matchState.cpu.x, metrics.minX, metrics.maxX);
}

function setOverlay(kicker, title, body) {
  app.overlayKicker.textContent = kicker;
  app.overlayTitle.textContent = title;
  app.overlayBody.textContent = body;
  app.fightOverlay.classList.remove("hidden");
}

function init3DIfNeeded() {
  if (world.renderer) {
    resize3D();
    return;
  }

  world.scene = new THREE.Scene();
  world.scene.background = new THREE.Color("#33415d");
  world.scene.fog = new THREE.Fog("#33415d", 18, 46);

  world.camera = new THREE.PerspectiveCamera(52, app.sceneMount.clientWidth / app.sceneMount.clientHeight, 0.1, 120);
  world.camera.position.set(0, 8.6, 17.6);
  world.camera.lookAt(0, 4, 0);

  world.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  world.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  world.renderer.setSize(app.sceneMount.clientWidth, app.sceneMount.clientHeight);
  world.renderer.shadowMap.enabled = true;
  world.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  app.sceneMount.appendChild(world.renderer.domElement);

  world.clock = new THREE.Clock();

  const hemi = new THREE.HemisphereLight("#ffffff", "#46617a", 1.25);
  world.scene.add(hemi);

  const key = new THREE.DirectionalLight("#fff4d9", 1.2);
  key.position.set(9, 16, 10);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -20;
  key.shadow.camera.right = 20;
  key.shadow.camera.top = 20;
  key.shadow.camera.bottom = -20;
  world.scene.add(key);

  const fill = new THREE.PointLight("#ff8c6a", 0.8, 40, 2);
  fill.position.set(-7, 7, 7);
  world.scene.add(fill);

  const rim = new THREE.PointLight("#8ec5ff", 0.52, 46, 2);
  rim.position.set(8, 6, -9);
  world.scene.add(rim);

  const platform = new THREE.Mesh(
    new THREE.CylinderGeometry(8.6, 9.6, 0.9, 8),
    new THREE.MeshStandardMaterial({ color: "#233140", roughness: 0.88 })
  );
  platform.position.y = 0.45;
  platform.receiveShadow = true;
  platform.castShadow = true;
  world.scene.add(platform);

  world.apron = new THREE.Mesh(
    new THREE.CylinderGeometry(10.4, 11.6, 0.8, 8),
    new THREE.MeshStandardMaterial({ color: "#111827", roughness: 0.92 })
  );
  world.apron.position.y = 0.05;
  world.apron.receiveShadow = true;
  world.scene.add(world.apron);

  world.floorMat = new THREE.Mesh(
    new THREE.CylinderGeometry(7.4, 7.4, 0.3, 8),
    new THREE.MeshStandardMaterial({
      color: "#8d8f8f",
      roughness: 0.82,
      map: createMatTexture("#d6d9de", "#1f2732", "#151a21")
    })
  );
  world.floorMat.position.y = 0.9;
  world.floorMat.receiveShadow = true;
  world.scene.add(world.floorMat);

  world.floorGlow = new THREE.Mesh(
    new THREE.RingGeometry(7.8, 9.2, 8),
    new THREE.MeshBasicMaterial({ color: "#515456", side: THREE.DoubleSide })
  );
  world.floorGlow.rotation.x = -Math.PI / 2;
  world.floorGlow.position.y = 0.93;
  world.scene.add(world.floorGlow);

  const fenceMaterial = new THREE.MeshStandardMaterial({ color: "#dfe7f5", roughness: 0.35, metalness: 0.45 });
  const cageLinkTexture = createCageMeshTexture();
  const cageLinkAlpha = createCageAlphaTexture();
  for (let i = 0; i < 8; i += 1) {
    const angle = (i / 8) * Math.PI * 2;
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 3.8, 10), fenceMaterial);
    post.position.set(Math.cos(angle) * 8.1, 2.1, Math.sin(angle) * 8.1);
    post.castShadow = true;
    world.scene.add(post);
    world.cagePosts.push(post);

    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 3.1, 0.34),
      new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? "#c2332c" : "#1d2330", roughness: 0.84 })
    );
    pad.position.copy(post.position);
    pad.position.y = 1.55;
    pad.castShadow = true;
    world.scene.add(pad);
    world.crowdRing.push(pad);

    const segmentAngle = angle + Math.PI / 8;
    const linkPanel = new THREE.Mesh(
      new THREE.PlaneGeometry(5.45, 2.85),
      new THREE.MeshStandardMaterial({
        color: "#b9c4d2",
        metalness: 0.34,
        roughness: 0.76,
        map: cageLinkTexture,
        alphaMap: cageLinkAlpha,
        transparent: true,
        side: THREE.DoubleSide,
        opacity: 0.84
      })
    );
    linkPanel.position.set(Math.cos(segmentAngle) * 7.78, 2.45, Math.sin(segmentAngle) * 7.78);
    linkPanel.lookAt(0, 2.45, 0);
    world.scene.add(linkPanel);
    world.cageLinks.push(linkPanel);

    for (const railY of [1.08, 2.05, 3.02]) {
      const rail = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 5.4, 12),
        new THREE.MeshStandardMaterial({ color: railY === 3.02 ? "#111418" : "#232a35", roughness: 0.62, metalness: 0.3 })
      );
      rail.position.set(Math.cos(segmentAngle) * 7.86, railY, Math.sin(segmentAngle) * 7.86);
      rail.rotation.z = Math.PI / 2;
      rail.lookAt(0, railY, 0);
      rail.rotateX(Math.PI / 2);
      world.scene.add(rail);
      world.cageRails.push(rail);
    }
  }

  world.lowerBowl = new THREE.Mesh(
    new THREE.CylinderGeometry(14, 16, 4.2, 24, 1, true),
    new THREE.MeshStandardMaterial({ color: "#121722", roughness: 0.98, side: THREE.DoubleSide })
  );
  world.lowerBowl.position.y = 2.1;
  world.scene.add(world.lowerBowl);

  world.upperBowl = new THREE.Mesh(
    new THREE.CylinderGeometry(17.5, 20.5, 5.4, 24, 1, true),
    new THREE.MeshStandardMaterial({ color: "#0f141e", roughness: 0.98, side: THREE.DoubleSide })
  );
  world.upperBowl.position.y = 6.6;
  world.scene.add(world.upperBowl);

  for (let i = 0; i < 84; i += 1) {
    const crowdBlock = new THREE.Mesh(
      new THREE.BoxGeometry(0.34, 0.9 + (i % 4) * 0.14, 0.34),
      new THREE.MeshStandardMaterial({ color: i % 2 === 0 ? "#1a2230" : "#2b3544", roughness: 0.98 })
    );
    const angle = (i / 84) * Math.PI * 2;
    const ring = i % 3 === 0 ? 17.2 : 13 + (i % 3) * 1.4;
    const height = i % 3 === 0 ? 8.5 : 4.6 + (i % 3) * 1.05;
    crowdBlock.position.set(Math.cos(angle) * ring, height, Math.sin(angle) * ring);
    world.scene.add(crowdBlock);
  }

  world.overheadRig = new THREE.Group();
  world.overheadRig.position.y = 12.2;
  world.scene.add(world.overheadRig);

  const truss = new THREE.Mesh(
    new THREE.TorusGeometry(7.9, 0.14, 12, 48),
    new THREE.MeshStandardMaterial({ color: "#464f5f", metalness: 0.6, roughness: 0.45 })
  );
  truss.rotation.x = Math.PI / 2;
  world.overheadRig.add(truss);

  for (let i = 0; i < 4; i += 1) {
    const angle = (i / 4) * Math.PI * 2;
    const spotlight = new THREE.SpotLight(i % 2 === 0 ? "#fff4d7" : "#d9e6ff", 1.3, 40, 0.44, 0.48, 1.2);
    spotlight.position.set(Math.cos(angle) * 6.8, 0, Math.sin(angle) * 6.8);
    spotlight.target.position.set(0, 1.3, 0);
    world.scene.add(spotlight);
    world.scene.add(spotlight.target);
    world.spotlights.push(spotlight);

    const lamp = new THREE.Mesh(
      new THREE.CylinderGeometry(0.18, 0.24, 0.5, 12),
      new THREE.MeshStandardMaterial({ color: "#1d232c", roughness: 0.52, metalness: 0.42 })
    );
    lamp.position.copy(spotlight.position);
    lamp.rotation.z = Math.PI / 2;
    world.overheadRig.add(lamp);
  }

  createBackyardVenue();
  createJumanjiteVenue();
  createO2RingVenue();

  world.venueSign = new THREE.Mesh(
    new THREE.PlaneGeometry(7.2, 1.5),
    new THREE.MeshBasicMaterial({ map: createTextTexture("Fight Simulator", "#173553", "#f4e0ae", 512, 128, 50), transparent: true })
  );
  world.venueSign.position.set(0, 8.2, -8.8);
  world.scene.add(world.venueSign);

  world.playerRig = createFighterRig();
  world.playerRoot = world.playerRig.root;
  world.playerRoot.position.set(-3.5, 0.95, 0);
  world.scene.add(world.playerRoot);

  world.cpuRig = createFighterRig();
  world.cpuRoot = world.cpuRig.root;
  world.cpuRoot.position.set(3.5, 0.95, 0);
  world.scene.add(world.cpuRoot);
}

function createBackyardVenue() {
  world.backyardGroup = new THREE.Group();
  world.backyardGroup.visible = false;
  world.scene.add(world.backyardGroup);

  world.backyardGround = new THREE.Mesh(
    new THREE.CircleGeometry(22, 48),
    new THREE.MeshStandardMaterial({ color: "#5f7f46", roughness: 0.96 })
  );
  world.backyardGround.rotation.x = -Math.PI / 2;
  world.backyardGround.position.y = -0.02;
  world.backyardGround.receiveShadow = true;
  world.backyardGroup.add(world.backyardGround);

  const dirtPatch = new THREE.Mesh(
    new THREE.CircleGeometry(10.8, 32),
    new THREE.MeshStandardMaterial({ color: "#6b5b42", roughness: 1 })
  );
  dirtPatch.rotation.x = -Math.PI / 2;
  dirtPatch.position.y = -0.005;
  world.backyardGroup.add(dirtPatch);

  const fenceMaterial = new THREE.MeshStandardMaterial({ color: "#9f774d", roughness: 0.92 });
  for (let i = 0; i < 14; i += 1) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(2.3, 2.2, 0.16), fenceMaterial);
    const angle = (i / 14) * Math.PI * 2;
    panel.position.set(Math.cos(angle) * 16.5, 1.1, Math.sin(angle) * 16.5);
    panel.lookAt(0, 1.1, 0);
    world.backyardGroup.add(panel);
    world.backyardFence.push(panel);
  }

  world.backyardHouse = new THREE.Group();
  const houseBase = new THREE.Mesh(
    new THREE.BoxGeometry(7.6, 3.8, 4.6),
    new THREE.MeshStandardMaterial({ color: "#ddd7c8", roughness: 0.92 })
  );
  houseBase.position.y = 1.9;
  houseBase.castShadow = true;
  houseBase.receiveShadow = true;
  world.backyardHouse.add(houseBase);
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4.4, 2.6, 4),
    new THREE.MeshStandardMaterial({ color: "#5e3d2a", roughness: 0.88 })
  );
  roof.rotation.y = Math.PI / 4;
  roof.position.y = 5.0;
  roof.castShadow = true;
  world.backyardHouse.add(roof);
  world.backyardHouse.position.set(-9.8, 0, -10.8);
  world.backyardGroup.add(world.backyardHouse);

  for (const treePos of [
    { x: 10.8, z: -12.2 },
    { x: 13.4, z: -8.4 },
    { x: -13.2, z: 9.6 }
  ]) {
    const tree = new THREE.Group();
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(0.34, 0.42, 3.4, 10),
      new THREE.MeshStandardMaterial({ color: "#6f4e37", roughness: 0.94 })
    );
    trunk.position.y = 1.7;
    trunk.castShadow = true;
    tree.add(trunk);
    const leaves = new THREE.Mesh(
      new THREE.SphereGeometry(1.9, 18, 14),
      new THREE.MeshStandardMaterial({ color: "#4d7538", roughness: 0.98 })
    );
    leaves.position.y = 4.2;
    leaves.castShadow = true;
    tree.add(leaves);
    tree.position.set(treePos.x, 0, treePos.z);
    world.backyardGroup.add(tree);
    world.backyardTrees.push(tree);
  }

  const trampolineGroup = new THREE.Group();
  world.backyardGroup.add(trampolineGroup);
  const trampolineFrame = new THREE.Mesh(
    new THREE.TorusGeometry(7.45, 0.34, 18, 48),
    new THREE.MeshStandardMaterial({ color: "#21262f", roughness: 0.5, metalness: 0.3 })
  );
  trampolineFrame.rotation.x = Math.PI / 2;
  trampolineFrame.position.y = 1.18;
  trampolineFrame.castShadow = true;
  trampolineGroup.add(trampolineFrame);

  world.backyardTrampolinePad = new THREE.Mesh(
    new THREE.TorusGeometry(6.95, 0.42, 18, 48),
    new THREE.MeshStandardMaterial({ color: "#2f6fd2", roughness: 0.78 })
  );
  world.backyardTrampolinePad.rotation.x = Math.PI / 2;
  world.backyardTrampolinePad.position.y = 1.17;
  trampolineGroup.add(world.backyardTrampolinePad);

  world.backyardTrampolineMat = new THREE.Mesh(
    new THREE.CircleGeometry(6.5, 36),
    new THREE.MeshStandardMaterial({ color: "#171b20", roughness: 0.9 })
  );
  world.backyardTrampolineMat.rotation.x = -Math.PI / 2;
  world.backyardTrampolineMat.position.y = 1.16;
  world.backyardTrampolineMat.receiveShadow = true;
  trampolineGroup.add(world.backyardTrampolineMat);

  for (let i = 0; i < 6; i += 1) {
    const leg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.12, 0.12, 1.18, 10),
      new THREE.MeshStandardMaterial({ color: "#8a939d", roughness: 0.52, metalness: 0.4 })
    );
    const angle = (i / 6) * Math.PI * 2;
    leg.position.set(Math.cos(angle) * 5.2, 0.58, Math.sin(angle) * 5.2);
    leg.castShadow = true;
    trampolineGroup.add(leg);
    world.backyardTrampolineLegs.push(leg);
  }
}

function setBackyardVenueMode(isBackyard, venue) {
  if (!world.backyardGroup) {
    return;
  }

  world.backyardGroup.visible = isBackyard;

  if (isBackyard) {
    world.backyardGround.material.color.set(venue.theme.sky);
    world.backyardTrampolinePad.material.color.set("#3167cf");
    world.backyardTrampolineMat.material.color.set("#101418");
  }
}

function createJumanjiteVenue() {
  world.jumanjiteGroup = new THREE.Group();
  world.jumanjiteGroup.visible = false;
  world.scene.add(world.jumanjiteGroup);

  world.jumanjiteApron = new THREE.Mesh(
    new THREE.BoxGeometry(18.4, 0.74, 18.4),
    new THREE.MeshStandardMaterial({ color: "#5e461a", roughness: 0.92 })
  );
  world.jumanjiteApron.position.y = 0.35;
  world.jumanjiteApron.receiveShadow = true;
  world.jumanjiteGroup.add(world.jumanjiteApron);

  world.jumanjiteMat = new THREE.Mesh(
    new THREE.BoxGeometry(14.2, 0.28, 14.2),
    new THREE.MeshStandardMaterial({ color: "#c7a14b", roughness: 0.86 })
  );
  world.jumanjiteMat.position.y = 0.9;
  world.jumanjiteMat.receiveShadow = true;
  world.jumanjiteGroup.add(world.jumanjiteMat);

  const postMaterial = new THREE.MeshStandardMaterial({ color: "#2a2113", roughness: 0.82 });
  const ropeColors = ["#6f5421", "#c7a14b", "#6f5421"];
  const corners = [
    { x: -7.2, z: -7.2 },
    { x: 7.2, z: -7.2 },
    { x: 7.2, z: 7.2 },
    { x: -7.2, z: 7.2 }
  ];

  corners.forEach((corner) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.42, 3.7, 0.42), postMaterial);
    post.position.set(corner.x, 2.0, corner.z);
    post.castShadow = true;
    world.jumanjiteGroup.add(post);
    world.jumanjitePosts.push(post);
  });

  const ropeRuns = [
    { from: corners[0], to: corners[1] },
    { from: corners[1], to: corners[2] },
    { from: corners[2], to: corners[3] },
    { from: corners[3], to: corners[0] }
  ];

  ropeRuns.forEach((run) => {
    const dx = run.to.x - run.from.x;
    const dz = run.to.z - run.from.z;
    const length = Math.hypot(dx, dz);
    const midX = (run.from.x + run.to.x) / 2;
    const midZ = (run.from.z + run.to.z) / 2;
    const angle = Math.atan2(dz, dx);

    ropeColors.forEach((color, index) => {
      const rope = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, length - 0.55, 12),
        new THREE.MeshStandardMaterial({ color, roughness: 0.72, metalness: 0.12 })
      );
      rope.rotation.z = Math.PI / 2;
      rope.rotation.y = angle;
      rope.position.set(midX, 1.28 + index * 0.7, midZ);
      rope.castShadow = true;
      world.jumanjiteGroup.add(rope);
      world.jumanjiteRopes.push(rope);
    });
  });

  world.jumanjiteStatue = new THREE.Group();
  const statueBase = new THREE.Mesh(
    new THREE.CylinderGeometry(1.3, 1.8, 1.2, 10),
    new THREE.MeshStandardMaterial({ color: "#72531c", roughness: 0.9 })
  );
  statueBase.position.y = 0.6;
  statueBase.castShadow = true;
  world.jumanjiteStatue.add(statueBase);

  const snakeBody = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.86, 0.22, 80, 12, 2, 3),
    new THREE.MeshStandardMaterial({ color: "#a9852e", roughness: 0.58, metalness: 0.32 })
  );
  snakeBody.rotation.x = Math.PI / 2;
  snakeBody.position.y = 2.0;
  snakeBody.castShadow = true;
  world.jumanjiteStatue.add(snakeBody);

  const snakeHead = new THREE.Mesh(
    new THREE.SphereGeometry(0.44, 18, 14),
    new THREE.MeshStandardMaterial({ color: "#b49135", roughness: 0.54, metalness: 0.28 })
  );
  snakeHead.scale.set(1, 1.15, 0.82);
  snakeHead.position.set(0, 3.1, 0.6);
  snakeHead.castShadow = true;
  world.jumanjiteStatue.add(snakeHead);

  const hoodLeft = new THREE.Mesh(
    new THREE.ConeGeometry(0.48, 1.1, 3),
    new THREE.MeshStandardMaterial({ color: "#b49135", roughness: 0.58, metalness: 0.24 })
  );
  hoodLeft.rotation.z = -0.74;
  hoodLeft.rotation.x = Math.PI / 2;
  hoodLeft.position.set(-0.42, 3.05, 0.45);
  world.jumanjiteStatue.add(hoodLeft);

  const hoodRight = hoodLeft.clone();
  hoodRight.rotation.z = 0.74;
  hoodRight.position.set(0.42, 3.05, 0.45);
  world.jumanjiteStatue.add(hoodRight);

  world.jumanjiteStatue.position.set(0, 0, -11.4);
  world.jumanjiteGroup.add(world.jumanjiteStatue);

  for (const x of [-8.6, 8.6]) {
    const pillar = new THREE.Group();
    const shaft = new THREE.Mesh(
      new THREE.CylinderGeometry(0.5, 0.62, 4.6, 10),
      new THREE.MeshStandardMaterial({ color: "#7b5d26", roughness: 0.88 })
    );
    shaft.position.y = 2.3;
    shaft.castShadow = true;
    pillar.add(shaft);

    const bowl = new THREE.Mesh(
      new THREE.CylinderGeometry(0.56, 0.42, 0.42, 12),
      new THREE.MeshStandardMaterial({ color: "#3e2b12", roughness: 0.7 })
    );
    bowl.position.y = 4.75;
    bowl.castShadow = true;
    pillar.add(bowl);

    const flame = new THREE.PointLight("#f3b149", 0.9, 20, 2);
    flame.position.set(0, 5.1, 0);
    pillar.add(flame);

    pillar.position.set(x, 0, -9.2);
    world.jumanjiteGroup.add(pillar);
    world.jumanjiteTorches.push(pillar);
  }
}

function setJumanjiteVenueMode(isJumanjite, venue) {
  if (!world.jumanjiteGroup) {
    return;
  }

  world.jumanjiteGroup.visible = isJumanjite;

  if (isJumanjite) {
    world.jumanjiteApron.material.color.set(venue.theme.floorDark);
    world.jumanjiteMat.material.color.set(venue.theme.floor);
    world.jumanjiteRopes.forEach((rope, index) => {
      rope.material.color.set(index % 3 === 1 ? "#d8b35a" : "#76531f");
    });
  }
}

function createO2RingVenue() {
  world.o2RingGroup = new THREE.Group();
  world.o2RingGroup.visible = false;
  world.scene.add(world.o2RingGroup);

  world.o2RingApron = new THREE.Mesh(
    new THREE.BoxGeometry(18.8, 0.82, 18.8),
    new THREE.MeshStandardMaterial({ color: "#24344d", roughness: 0.9 })
  );
  world.o2RingApron.position.y = 0.36;
  world.o2RingApron.receiveShadow = true;
  world.o2RingGroup.add(world.o2RingApron);

  world.o2RingMat = new THREE.Mesh(
    new THREE.BoxGeometry(14.6, 0.24, 14.6),
    new THREE.MeshStandardMaterial({ color: "#7d9cc7", roughness: 0.84 })
  );
  world.o2RingMat.position.y = 0.9;
  world.o2RingMat.receiveShadow = true;
  world.o2RingGroup.add(world.o2RingMat);

  const postMaterial = new THREE.MeshStandardMaterial({ color: "#101722", roughness: 0.56, metalness: 0.26 });
  const ropeColors = ["#d9ecff", "#5fa1ff", "#d9ecff"];
  const corners = [
    { x: -7.3, z: -7.3 },
    { x: 7.3, z: -7.3 },
    { x: 7.3, z: 7.3 },
    { x: -7.3, z: 7.3 }
  ];

  corners.forEach((corner) => {
    const post = new THREE.Mesh(new THREE.BoxGeometry(0.46, 3.8, 0.46), postMaterial);
    post.position.set(corner.x, 2.02, corner.z);
    post.castShadow = true;
    world.o2RingGroup.add(post);
    world.o2RingPosts.push(post);
  });

  const ropeRuns = [
    { from: corners[0], to: corners[1] },
    { from: corners[1], to: corners[2] },
    { from: corners[2], to: corners[3] },
    { from: corners[3], to: corners[0] }
  ];

  ropeRuns.forEach((run) => {
    const dx = run.to.x - run.from.x;
    const dz = run.to.z - run.from.z;
    const length = Math.hypot(dx, dz);
    const midX = (run.from.x + run.to.x) / 2;
    const midZ = (run.from.z + run.to.z) / 2;
    const angle = Math.atan2(dz, dx);

    ropeColors.forEach((color, index) => {
      const rope = new THREE.Mesh(
        new THREE.CylinderGeometry(0.085, 0.085, length - 0.62, 12),
        new THREE.MeshStandardMaterial({ color, roughness: 0.66, metalness: 0.14 })
      );
      rope.rotation.z = Math.PI / 2;
      rope.rotation.y = angle;
      rope.position.set(midX, 1.3 + index * 0.72, midZ);
      rope.castShadow = true;
      world.o2RingGroup.add(rope);
      world.o2RingRopes.push(rope);
    });
  });

  for (const pillarPos of [
    { x: -10.2, z: -10.2 },
    { x: 10.2, z: -10.2 },
    { x: 10.2, z: 10.2 },
    { x: -10.2, z: 10.2 }
  ]) {
    const pillar = new THREE.Group();
    const shaft = new THREE.Mesh(
      new THREE.BoxGeometry(0.7, 6.2, 0.7),
      new THREE.MeshStandardMaterial({ color: "#1a2433", roughness: 0.64, metalness: 0.24 })
    );
    shaft.position.y = 3.1;
    shaft.castShadow = true;
    pillar.add(shaft);

    const cap = new THREE.Mesh(
      new THREE.BoxGeometry(1.1, 0.42, 1.1),
      new THREE.MeshStandardMaterial({ color: "#97b8e7", roughness: 0.4, metalness: 0.3 })
    );
    cap.position.y = 6.45;
    cap.castShadow = true;
    pillar.add(cap);

    pillar.position.set(pillarPos.x, 0, pillarPos.z);
    world.o2RingGroup.add(pillar);
    world.o2RingPillars.push(pillar);
  }

  world.o2RingSign = new THREE.Mesh(
    new THREE.PlaneGeometry(5.2, 1.24),
    new THREE.MeshBasicMaterial({ map: createTextTexture("O2 RING", "#0b1320", "#d8ecff", 512, 128, 54), transparent: true })
  );
  world.o2RingSign.position.set(0, 7.1, -9.6);
  world.o2RingGroup.add(world.o2RingSign);
}

function setO2RingVenueMode(isO2Ring, venue) {
  if (!world.o2RingGroup) {
    return;
  }

  world.o2RingGroup.visible = isO2Ring;

  if (isO2Ring) {
    world.o2RingApron.material.color.set(venue.theme.floorDark);
    world.o2RingMat.material.color.set(venue.theme.floor);
    world.o2RingRopes.forEach((rope, index) => {
      rope.material.color.set(index % 3 === 1 ? "#5fa1ff" : "#e3f1ff");
    });
    if (world.o2RingSign?.material?.map) {
      world.o2RingSign.material.map = createTextTexture(venue.name, venue.theme.glow, "#d8ecff", 512, 128, 54);
      world.o2RingSign.material.map.needsUpdate = true;
    }
  }
}

function createFighterRig() {
  const root = new THREE.Group();

  const torsoMaterial = new THREE.MeshStandardMaterial({ color: "#ff6a48", roughness: 0.62 });
  const accentMaterial = new THREE.MeshStandardMaterial({ color: "#ffd9cf", roughness: 0.56 });
  const skinMaterial = new THREE.MeshStandardMaterial({ color: "#f0b98d", roughness: 0.68 });
  const hairMaterial = new THREE.MeshStandardMaterial({ color: "#1d1713", roughness: 0.78 });
  const shortMaterial = new THREE.MeshStandardMaterial({ color: "#18202d", roughness: 0.8 });
  const shinMaterial = new THREE.MeshStandardMaterial({ color: "#1f2732", roughness: 0.82 });
  const gloveMaterial = new THREE.MeshStandardMaterial({ color: "#ff6a48", roughness: 0.54 });
  const bootMaterial = new THREE.MeshStandardMaterial({ color: "#0c0f14", roughness: 0.85 });

  const torsoPivot = new THREE.Group();
  torsoPivot.position.y = 2.55;
  root.add(torsoPivot);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.22, 1.8, 0.78), torsoMaterial);
  torso.castShadow = true;
  torsoPivot.add(torso);

  const waist = new THREE.Mesh(new THREE.BoxGeometry(0.98, 0.46, 0.62), shortMaterial);
  waist.position.set(0, -1.08, 0);
  waist.castShadow = true;
  torsoPivot.add(waist);

  const accent = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.92, 0.08), accentMaterial);
  accent.position.set(0, 0.08, 0.43);
  torsoPivot.add(accent);

  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.19, 0.26, 16), skinMaterial);
  neck.position.set(0, 1.02, 0);
  neck.castShadow = true;
  torsoPivot.add(neck);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.4, 20, 16), skinMaterial);
  head.scale.set(1.02, 1.12, 1.02);
  head.position.set(0, 1.56, 0.02);
  head.castShadow = true;
  torsoPivot.add(head);

  const hairGroup = new THREE.Group();
  hairGroup.position.set(0, 0.05, -0.02);
  hairGroup.visible = false;
  head.add(hairGroup);

  const hairCap = new THREE.Mesh(new THREE.SphereGeometry(0.405, 18, 14), hairMaterial);
  hairCap.scale.set(1.02, 0.74, 1.04);
  hairCap.position.set(0, 0.08, -0.03);
  hairCap.castShadow = true;
  hairGroup.add(hairCap);

  const braidOffsets = [-0.2, -0.09, 0.02, 0.13, 0.24];
  const braids = braidOffsets.map((xOffset, index) => {
    const braid = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.042, 0.64, 7), hairMaterial);
    braid.position.set(xOffset, -0.2 - Math.abs(xOffset) * 0.08, -0.34 - Math.abs(xOffset) * 0.08);
    braid.rotation.x = 0.28 + Math.abs(xOffset) * 0.38;
    braid.rotation.z = xOffset * -0.2;
    braid.castShadow = true;
    hairGroup.add(braid);

    const braidTip = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 8), hairMaterial);
    braidTip.position.set(0, -0.34, 0);
    braidTip.castShadow = true;
    braid.add(braidTip);

    braid.userData.baseRotationX = braid.rotation.x;
    braid.userData.baseRotationZ = braid.rotation.z;
    braid.userData.phase = index * 0.6;
    return braid;
  });

  const sideBraidLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.035, 0.46, 7), hairMaterial);
  sideBraidLeft.position.set(-0.36, -0.04, -0.12);
  sideBraidLeft.rotation.set(0.2, 0.22, -0.3);
  sideBraidLeft.castShadow = true;
  sideBraidLeft.userData.baseRotationX = sideBraidLeft.rotation.x;
  sideBraidLeft.userData.baseRotationZ = sideBraidLeft.rotation.z;
  sideBraidLeft.userData.phase = 3.6;
  hairGroup.add(sideBraidLeft);
  braids.push(sideBraidLeft);

  const sideBraidRight = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.035, 0.46, 7), hairMaterial);
  sideBraidRight.position.set(0.36, -0.04, -0.12);
  sideBraidRight.rotation.set(0.2, -0.22, 0.3);
  sideBraidRight.castShadow = true;
  sideBraidRight.userData.baseRotationX = sideBraidRight.rotation.x;
  sideBraidRight.userData.baseRotationZ = sideBraidRight.rotation.z;
  sideBraidRight.userData.phase = 4.2;
  hairGroup.add(sideBraidRight);
  braids.push(sideBraidRight);

  const dreadOffsets = [-0.28, -0.18, -0.08, 0.04, 0.16, 0.27];
  const dreads = dreadOffsets.map((xOffset, index) => {
    const dread = new THREE.Mesh(new THREE.CylinderGeometry(0.034, 0.044, 0.86, 8), hairMaterial);
    dread.position.set(xOffset, -0.18 - Math.abs(xOffset) * 0.04, -0.3 - Math.abs(xOffset) * 0.04);
    dread.rotation.x = 0.18 + Math.abs(xOffset) * 0.28;
    dread.rotation.z = xOffset * -0.14;
    dread.castShadow = true;
    dread.visible = false;
    hairGroup.add(dread);

    const dreadTip = new THREE.Mesh(new THREE.SphereGeometry(0.036, 10, 8), hairMaterial);
    dreadTip.position.set(0, -0.44, 0);
    dreadTip.castShadow = true;
    dread.add(dreadTip);

    dread.userData.baseRotationX = dread.rotation.x;
    dread.userData.baseRotationZ = dread.rotation.z;
    dread.userData.phase = index * 0.58;
    return dread;
  });

  const sideDreadLeft = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.038, 0.74, 8), hairMaterial);
  sideDreadLeft.position.set(-0.38, -0.12, -0.08);
  sideDreadLeft.rotation.set(0.18, 0.18, -0.2);
  sideDreadLeft.castShadow = true;
  sideDreadLeft.visible = false;
  sideDreadLeft.userData.baseRotationX = sideDreadLeft.rotation.x;
  sideDreadLeft.userData.baseRotationZ = sideDreadLeft.rotation.z;
  sideDreadLeft.userData.phase = 3.7;
  hairGroup.add(sideDreadLeft);
  dreads.push(sideDreadLeft);

  const sideDreadRight = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.038, 0.74, 8), hairMaterial);
  sideDreadRight.position.set(0.38, -0.12, -0.08);
  sideDreadRight.rotation.set(0.18, -0.18, 0.2);
  sideDreadRight.castShadow = true;
  sideDreadRight.visible = false;
  sideDreadRight.userData.baseRotationX = sideDreadRight.rotation.x;
  sideDreadRight.userData.baseRotationZ = sideDreadRight.rotation.z;
  sideDreadRight.userData.phase = 4.3;
  hairGroup.add(sideDreadRight);
  dreads.push(sideDreadRight);

  const shoulderLeft = new THREE.Group();
  shoulderLeft.position.set(-0.82, 0.68, 0);
  torsoPivot.add(shoulderLeft);
  const upperArmLeft = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.54, 4, 8), skinMaterial);
  upperArmLeft.position.y = -0.34;
  upperArmLeft.castShadow = true;
  shoulderLeft.add(upperArmLeft);
  const elbowLeft = new THREE.Group();
  elbowLeft.position.y = -0.68;
  shoulderLeft.add(elbowLeft);
  const forearmLeft = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.48, 4, 8), skinMaterial);
  forearmLeft.position.y = -0.3;
  forearmLeft.castShadow = true;
  elbowLeft.add(forearmLeft);
  const gloveLeft = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.24, 0.38), gloveMaterial);
  gloveLeft.position.set(0, -0.62, 0.08);
  gloveLeft.castShadow = true;
  elbowLeft.add(gloveLeft);

  const shoulderRight = new THREE.Group();
  shoulderRight.position.set(0.82, 0.68, 0);
  torsoPivot.add(shoulderRight);
  const upperArmRight = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.54, 4, 8), skinMaterial);
  upperArmRight.position.y = -0.34;
  upperArmRight.castShadow = true;
  shoulderRight.add(upperArmRight);
  const elbowRight = new THREE.Group();
  elbowRight.position.y = -0.68;
  shoulderRight.add(elbowRight);
  const forearmRight = new THREE.Mesh(new THREE.CapsuleGeometry(0.14, 0.48, 4, 8), skinMaterial);
  forearmRight.position.y = -0.3;
  forearmRight.castShadow = true;
  elbowRight.add(forearmRight);
  const gloveRight = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.24, 0.38), gloveMaterial);
  gloveRight.position.set(0, -0.62, 0.08);
  gloveRight.castShadow = true;
  elbowRight.add(gloveRight);

  const hipLeft = new THREE.Group();
  hipLeft.position.set(-0.34, -1.3, 0);
  torsoPivot.add(hipLeft);
  const thighLeft = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.72, 4, 8), shortMaterial);
  thighLeft.position.y = -0.48;
  thighLeft.castShadow = true;
  hipLeft.add(thighLeft);
  const kneeLeft = new THREE.Group();
  kneeLeft.position.y = -0.94;
  hipLeft.add(kneeLeft);
  const shinLeft = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.74, 4, 8), shinMaterial);
  shinLeft.position.y = -0.45;
  shinLeft.castShadow = true;
  kneeLeft.add(shinLeft);
  const bootLeft = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.18, 0.64), bootMaterial);
  bootLeft.position.set(0, -0.92, 0.16);
  bootLeft.castShadow = true;
  kneeLeft.add(bootLeft);

  const hipRight = new THREE.Group();
  hipRight.position.set(0.34, -1.3, 0);
  torsoPivot.add(hipRight);
  const thighRight = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.72, 4, 8), shortMaterial);
  thighRight.position.y = -0.48;
  thighRight.castShadow = true;
  hipRight.add(thighRight);
  const kneeRight = new THREE.Group();
  kneeRight.position.y = -0.94;
  hipRight.add(kneeRight);
  const shinRight = new THREE.Mesh(new THREE.CapsuleGeometry(0.16, 0.74, 4, 8), shinMaterial);
  shinRight.position.y = -0.45;
  shinRight.castShadow = true;
  kneeRight.add(shinRight);
  const bootRight = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.18, 0.64), bootMaterial);
  bootRight.position.set(0, -0.92, 0.16);
  bootRight.castShadow = true;
  kneeRight.add(bootRight);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.96, 24),
    new THREE.MeshBasicMaterial({ color: "#000000", transparent: true, opacity: 0.22 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.02;
  root.add(shadow);

  return {
    root,
    torsoPivot,
    torso,
    waist,
    accent,
    neck,
    head,
    hairGroup,
    hairCap,
    braids,
    dreads,
    shoulderLeft,
    shoulderRight,
    elbowLeft,
    elbowRight,
    upperArmLeft,
    upperArmRight,
    forearmLeft,
    forearmRight,
    gloveLeft,
    gloveRight,
    hipLeft,
    hipRight,
    kneeLeft,
    kneeRight,
    thighLeft,
    thighRight,
    shinLeft,
    shinRight,
    bootLeft,
    bootRight,
    shadow
  };
}

function render3D(deltaSeconds) {
  if (!world.renderer || !matchState) {
    return;
  }

  animateRig(world.playerRig, matchState.player, deltaSeconds, false);
  animateRig(world.cpuRig, matchState.cpu, deltaSeconds, true);
  updateCamera(deltaSeconds);
  world.camera.lookAt(world.cameraTarget.x, world.cameraTarget.y, world.cameraTarget.z);
  world.renderer.render(world.scene, world.camera);
}

function animateRig(rig, combatant, deltaSeconds, mirrored) {
  const time = performance.now() * 0.0065;
  const walk = combatant.moveIntent !== 0 && !combatant.attack && !combatant.defeated;
  const idle = Math.sin(time * 0.55);
  const step = walk ? Math.sin(time * 1.65) : 0;
  const bob = walk ? Math.abs(Math.sin(time * 1.65)) * 0.06 : 0.015 + Math.abs(idle) * 0.01;
  const attackType = combatant.attack?.type ?? null;
  const attackPhase = combatant.attack?.phase ?? null;
  const frontSign = mirrored ? -1 : 1;
  const scaleY = rig.baseScale?.y ?? 1;
  const scaleZ = rig.baseScale?.z ?? 1;
  const opponentX = combatant.role === "player" ? world.cpuRoot?.position.x ?? 0 : world.playerRoot?.position.x ?? 0;
  const selfX = combatant.role === "player" ? world.playerRoot?.position.x ?? 0 : world.cpuRoot?.position.x ?? 0;
  const faceYaw = clamp((opponentX - selfX) * 0.055, -0.18, 0.18);

  rig.root.position.y = 0.95 + bob;
  rig.root.rotation.z = combatant.defeated ? (mirrored ? 1.55 : -1.55) : 0;
  rig.root.rotation.y = (mirrored ? Math.PI : 0) + faceYaw * (mirrored ? -1 : 1);
  rig.root.scale.set(frontSign, combatant.defeated ? scaleY * 0.92 : scaleY, scaleZ);

  rig.torsoPivot.rotation.z = combatant.hitFlash > 0 ? -0.16 * frontSign : idle * 0.014;
  rig.torsoPivot.rotation.x = combatant.blockHeld ? -0.08 : idle * 0.01;
  rig.torsoPivot.rotation.y = walk ? step * 0.04 : idle * 0.024;

  rig.hipLeft.rotation.x = walk ? step * 0.34 : idle * 0.012;
  rig.hipRight.rotation.x = walk ? -step * 0.34 : -idle * 0.012;
  rig.kneeLeft.rotation.x = walk ? Math.max(0, -step) * 0.3 : 0.06;
  rig.kneeRight.rotation.x = walk ? Math.max(0, step) * 0.3 : 0.06;
  rig.shoulderLeft.rotation.x = walk ? -step * 0.26 : -0.34 + idle * 0.014;
  rig.shoulderRight.rotation.x = walk ? step * 0.26 : -0.3 - idle * 0.014;
  rig.shoulderLeft.rotation.z = mirrored ? -0.14 : 0.14;
  rig.shoulderRight.rotation.z = mirrored ? 0.16 : -0.16;
  rig.hipRight.rotation.z = 0;
  rig.hipLeft.rotation.z = 0;
  rig.elbowLeft.rotation.x = -0.64;
  rig.elbowRight.rotation.x = -0.52;
  rig.head.rotation.y = clamp(faceYaw * 2.2, -0.28, 0.28);
  rig.head.rotation.x = combatant.blockHeld ? 0.08 : 0;
  rig.head.rotation.z = 0;

  if (combatant.blockHeld && !combatant.defeated) {
    rig.shoulderLeft.rotation.z = mirrored ? -0.88 : 0.88;
    rig.shoulderRight.rotation.z = mirrored ? 0.88 : -0.88;
    rig.shoulderLeft.rotation.x = -0.9;
    rig.shoulderRight.rotation.x = -0.9;
    rig.elbowLeft.rotation.x = -1.22;
    rig.elbowRight.rotation.x = -1.22;
  }

  if (attackType === "jab") {
    rig.shoulderRight.rotation.z = mirrored ? 0.26 : -0.26;
    rig.shoulderRight.rotation.x = attackPhase === "active" ? -1.08 : -0.64;
    rig.elbowRight.rotation.x = attackPhase === "active" ? -0.24 : -0.7;
    rig.torsoPivot.rotation.y += mirrored ? -0.14 : 0.14;
  } else if (attackType === "heavy") {
    rig.torsoPivot.rotation.z = mirrored ? 0.22 : -0.22;
    rig.torsoPivot.rotation.y += mirrored ? -0.22 : 0.22;
    rig.shoulderRight.rotation.z = mirrored ? 0.46 : -0.46;
    rig.shoulderRight.rotation.x = attackPhase === "active" ? -1.42 : -0.92;
    rig.elbowRight.rotation.x = attackPhase === "active" ? 0.08 : -0.48;
  } else if (attackType === "kick") {
    rig.hipRight.rotation.x = attackPhase === "active" ? -1.08 : -0.52;
    rig.kneeRight.rotation.x = attackPhase === "active" ? 0.56 : 0.22;
    rig.hipRight.rotation.z = mirrored ? -0.08 : 0.08;
    rig.shoulderLeft.rotation.x = -0.42;
    rig.shoulderRight.rotation.x = -0.28;
  } else if (attackType === "slam") {
    rig.torsoPivot.rotation.x = attackPhase === "active" ? 0.34 : 0.2;
    rig.torsoPivot.rotation.y += mirrored ? -0.18 : 0.18;
    rig.hipLeft.rotation.x = attackPhase === "active" ? -0.74 : -0.28;
    rig.hipRight.rotation.x = attackPhase === "active" ? -0.74 : -0.28;
    rig.kneeLeft.rotation.x = attackPhase === "active" ? 0.82 : 0.34;
    rig.kneeRight.rotation.x = attackPhase === "active" ? 0.82 : 0.34;
    rig.shoulderLeft.rotation.x = -1.18;
    rig.shoulderRight.rotation.x = -1.18;
    rig.elbowLeft.rotation.x = -0.48;
    rig.elbowRight.rotation.x = -0.48;
  } else if (attackType === "submission") {
    rig.torsoPivot.rotation.x = attackPhase === "active" ? 0.48 : 0.28;
    rig.torsoPivot.rotation.y += mirrored ? -0.1 : 0.1;
    rig.hipLeft.rotation.x = attackPhase === "active" ? -0.42 : -0.16;
    rig.hipRight.rotation.x = attackPhase === "active" ? -0.42 : -0.16;
    rig.kneeLeft.rotation.x = attackPhase === "active" ? 0.5 : 0.24;
    rig.kneeRight.rotation.x = attackPhase === "active" ? 0.5 : 0.24;
    rig.shoulderLeft.rotation.x = -1.02;
    rig.shoulderRight.rotation.x = -1.02;
    rig.shoulderLeft.rotation.z = mirrored ? -0.28 : 0.28;
    rig.shoulderRight.rotation.z = mirrored ? 0.28 : -0.28;
    rig.elbowLeft.rotation.x = -0.2;
    rig.elbowRight.rotation.x = -0.2;
    rig.head.rotation.x = 0.16;
  }

  if (combatant.hitFlash > 0) {
    const hitBoost = 0.45 * combatant.hitFlash;
    rig.torso.material.emissive.setRGB(hitBoost, hitBoost * 0.38, hitBoost * 0.32);
    rig.head.rotation.z = -0.08 * frontSign;
  } else {
    rig.torso.material.emissive.setRGB(0, 0, 0);
    rig.head.rotation.z = 0;
  }

  if (rig.braids?.length) {
    const swayBase = walk ? step * 0.12 : idle * 0.05;
    rig.braids.forEach((braid) => {
      const phase = braid.userData.phase ?? 0;
      const braidSwing = Math.sin(time * 0.9 + phase) * 0.045 + swayBase;
      braid.rotation.x = (braid.userData.baseRotationX ?? 0) + Math.abs(braidSwing) * 0.7;
      braid.rotation.z = (braid.userData.baseRotationZ ?? 0) + braidSwing * 0.45;
    });
  }
  if (rig.dreads?.length) {
    const swayBase = walk ? step * 0.18 : idle * 0.08;
    rig.dreads.forEach((dread) => {
      const phase = dread.userData.phase ?? 0;
      const dreadSwing = Math.sin(time * 0.82 + phase) * 0.075 + swayBase;
      dread.rotation.x = (dread.userData.baseRotationX ?? 0) + Math.abs(dreadSwing) * 0.88;
      dread.rotation.z = (dread.userData.baseRotationZ ?? 0) + dreadSwing * 0.34;
    });
  }

  rig.shadow.material.opacity = combatant.defeated ? 0.12 : 0.22;
}

function updateCamera(deltaSeconds) {
  if (!matchState) {
    return;
  }
  if (matchState.phase === "intermission") {
    const orbit = performance.now() * 0.00042;
    const desiredX = Math.sin(orbit) * 4.4;
    const desiredY = 6.9 + Math.sin(orbit * 1.4) * 0.35;
    const desiredZ = 13.8 + Math.cos(orbit) * 1.1;
    const easing = Math.min(1, deltaSeconds * 2.4);
    world.cameraPosition.x += (desiredX - world.cameraPosition.x) * easing;
    world.cameraPosition.y += (desiredY - world.cameraPosition.y) * easing;
    world.cameraPosition.z += (desiredZ - world.cameraPosition.z) * easing;
    world.camera.position.set(world.cameraPosition.x, world.cameraPosition.y, world.cameraPosition.z);
    world.cameraTarget.x += (0 - world.cameraTarget.x) * easing;
    world.cameraTarget.y += (3.4 - world.cameraTarget.y) * easing;
    world.cameraTarget.z += (0 - world.cameraTarget.z) * easing;
    return;
  }

  const midpoint = (world.playerRoot.position.x + world.cpuRoot.position.x) / 2;
  const separation = Math.abs(world.playerRoot.position.x - world.cpuRoot.position.x);
  const desiredX = midpoint * 0.32;
  const desiredY = 7.5 + separation * 0.14;
  const desiredZ = 12.8 + separation * 0.92;

  const easing = Math.min(1, deltaSeconds * 3.2);
  world.cameraPosition.x += (desiredX - world.cameraPosition.x) * easing;
  world.cameraPosition.y += (desiredY - world.cameraPosition.y) * easing;
  world.cameraPosition.z += (desiredZ - world.cameraPosition.z) * easing;
  world.cameraShake = Math.max(0, world.cameraShake - deltaSeconds * 0.85);
  const shakeX = world.cameraShake > 0 ? (Math.random() - 0.5) * world.cameraShake : 0;
  const shakeY = world.cameraShake > 0 ? (Math.random() - 0.5) * world.cameraShake * 0.55 : 0;
  const shakeZ = world.cameraShake > 0 ? (Math.random() - 0.5) * world.cameraShake * 0.35 : 0;
  world.camera.position.set(world.cameraPosition.x + shakeX, world.cameraPosition.y + shakeY, world.cameraPosition.z + shakeZ);

  world.cameraTarget.x += (midpoint - world.cameraTarget.x) * easing;
  world.cameraTarget.y += (3.8 - world.cameraTarget.y) * easing;
  world.cameraTarget.z += (0 - world.cameraTarget.z) * easing;
}

function mapStageXToWorld(stageX, metrics) {
  const normalized = (stageX - metrics.minX) / Math.max(1, metrics.maxX - metrics.minX);
  return -4.6 + normalized * 9.2;
}

function resize3D() {
  if (!world.renderer) {
    return;
  }
  const width = app.sceneMount.clientWidth || 960;
  const height = app.sceneMount.clientHeight || 560;
  world.camera.aspect = width / height;
  world.camera.updateProjectionMatrix();
  world.renderer.setSize(width, height);
  world.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
}

function createTextTexture(text, bgColor, fgColor, width, height, fontSize) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = fgColor;
  ctx.font = `700 ${fontSize}px Bebas Neue, sans-serif`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text.toUpperCase(), width / 2, height / 2 + 4);
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createMatTexture(baseColor, lineColor, logoColor, logoLines = ["Fight", "Simulator"], logoIcon = null, accentColor = "#c2332c") {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.translate(canvas.width / 2, canvas.height / 2);
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 18;
  ctx.beginPath();
  for (let i = 0; i < 8; i += 1) {
    const angle = (-Math.PI / 2) + (i * Math.PI) / 4;
    const radius = 360;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.stroke();

  const normalizedLines = Array.isArray(logoLines) ? logoLines : [logoLines];

  if (logoIcon === "liberty-bell") {
    drawLibertyBell(ctx, {
      x: 0,
      y: -72,
      scale: 1.02,
      fill: logoColor,
      stroke: lineColor,
      crack: accentColor
    });
    ctx.fillStyle = accentColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 110px Bebas Neue, sans-serif";
    ctx.fillText(String(normalizedLines[0] ?? "PHILA").toUpperCase(), 0, 154);
  } else if (normalizedLines.length === 1) {
    ctx.fillStyle = logoColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 196px Bebas Neue, sans-serif";
    ctx.fillText(String(normalizedLines[0]).toUpperCase(), 0, 14);
  } else {
    ctx.fillStyle = logoColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "700 118px Bebas Neue, sans-serif";
    ctx.fillText(String(normalizedLines[0]).toUpperCase(), 0, -40);
    ctx.fillText(String(normalizedLines[1]).toUpperCase(), 0, 78);
  }

  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 10;
  ctx.beginPath();
  ctx.arc(0, 0, 164, 0, Math.PI * 2);
  ctx.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function drawLibertyBell(ctx, { x, y, scale = 1, fill, stroke, crack }) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.fillStyle = fill;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 16;

  ctx.beginPath();
  ctx.moveTo(-118, -98);
  ctx.bezierCurveTo(-132, -176, -76, -222, 0, -226);
  ctx.bezierCurveTo(76, -222, 132, -176, 118, -98);
  ctx.lineTo(106, 44);
  ctx.bezierCurveTo(88, 112, 44, 146, 0, 154);
  ctx.bezierCurveTo(-44, 146, -88, 112, -106, 44);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-132, -102);
  ctx.lineTo(132, -102);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(-154, -102);
  ctx.lineTo(-126, -154);
  ctx.lineTo(126, -154);
  ctx.lineTo(154, -102);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(0, 52, 24, 0, Math.PI * 2);
  ctx.fillStyle = stroke;
  ctx.fill();

  ctx.strokeStyle = crack;
  ctx.lineWidth = 14;
  ctx.beginPath();
  ctx.moveTo(22, -36);
  ctx.lineTo(-6, 8);
  ctx.lineTo(18, 36);
  ctx.lineTo(-16, 88);
  ctx.stroke();

  ctx.restore();
}

function createCageMeshTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(220, 230, 240, 0.75)";
  ctx.lineWidth = 2;
  for (let x = -canvas.width; x < canvas.width * 2; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + canvas.width, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, canvas.height);
    ctx.lineTo(x + canvas.width, 0);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function createCageAlphaTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(0,0,0,0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "rgba(255,255,255,0.9)";
  ctx.lineWidth = 2.4;
  for (let x = -canvas.width; x < canvas.width * 2; x += 24) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x + canvas.width, canvas.height);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, canvas.height);
    ctx.lineTo(x + canvas.width, 0);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function attackTypeToShake(label) {
  if (label === "body slam") {
    return 0.3;
  }
  if (label === "heavy") {
    return 0.22;
  }
  if (label === "kick") {
    return 0.18;
  }
  if (label === "submission") {
    return 0.08;
  }
  return 0.11;
}

function updateStatus(heading, copy) {
  app.fightStatusHeading.textContent = heading;
  app.fightStatusCopy.textContent = copy;
}

function pushLog(message) {
  if (!matchState) {
    return;
  }
  matchState.log.unshift(message);
  matchState.log = matchState.log.slice(0, 8);
  renderLog();
}

function renderLog() {
  if (!matchState) {
    app.fightLog.innerHTML = "";
    return;
  }
  app.fightLog.innerHTML = matchState.log
    .map((line) => `<div class="log-line">${line}</div>`)
    .join("");
}

function handleKeyDown(event) {
  const key = event.key.toLowerCase();
  if (["a", "d", "e", "f", "g", "r", "t", "shift"].includes(key)) {
    event.preventDefault();
  }

  heldKeys.add(key);

  if (!matchState || matchState.phase !== "live" || event.repeat) {
    return;
  }

  if (matchState.spectatorMode) {
    return;
  }

  if (key === "f" && event.shiftKey) {
    tryStartAttack(matchState.player, "heavy");
  } else if (key === ATTACKS.jab.key) {
    tryStartAttack(matchState.player, "jab");
  } else if (key === ATTACKS.kick.key) {
    tryStartAttack(matchState.player, "kick");
  } else if (key === ATTACKS.slam.key) {
    tryStartAttack(matchState.player, "slam");
  } else if (key === ATTACKS.submission.key) {
    tryStartAttack(matchState.player, "submission");
  }
}

function handleKeyUp(event) {
  heldKeys.delete(event.key.toLowerCase());
}

app.startButton.addEventListener("click", () => startFight("play"));
app.watchButton.addEventListener("click", () => startFight("watch"));
app.restartFightButton.addEventListener("click", restartFight);
app.returnToLobbyButton.addEventListener("click", returnToSetup);
app.backToSetupButton.addEventListener("click", returnToSetup);
app.stageJumpButtons.forEach((button) => {
  button.addEventListener("click", () => {
    transitionSetupStage(button.dataset.jumpStage);
  });
});
window.addEventListener("resize", () => {
  resize3D();
  clampCombatantsToArena();
  layoutCombatants();
});
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

renderSelectionCards();
