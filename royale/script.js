const STORAGE_KEY = "royale-equipped-skin";
const EMOTE_STORAGE_KEY = "royale-equipped-emote";

const skins = [
  {
    id: "default-ranger",
    name: "Default Ranger",
    rarity: "Common",
    set: "Launch Crew",
    theme: "Scout green + amber trim",
    tagline: "Balanced starter outfit for first-drop matches.",
    unlocked: true,
    palette: {
      body: "#4d6d57",
      accent: "#f1b53b",
      head: "#f4c69a",
      hair: "#1b2335",
      boots: "#232833",
      shadow: "rgba(3, 6, 13, 0.28)"
    }
  },
  {
    id: "darth-vadar",
    name: "Darth Vadar",
    rarity: "Legendary",
    set: "Shadow Empire",
    theme: "Obsidian armor + crimson visor",
    tagline: "A dark-side drop-in with a premium locker price.",
    unlocked: false,
    cost: 600,
    currency: "Royale Coins",
    palette: {
      body: "#1b1d24",
      accent: "#d84a54",
      head: "#d7c2b0",
      hair: "#0a0c11",
      boots: "#060709",
      shadow: "rgba(0, 0, 0, 0.42)"
    }
  },
  {
    id: "daphy-duck",
    name: "Daphy Duck",
    rarity: "Epic",
    set: "Toon Trouble",
    theme: "Midnight feathers + orange bill",
    tagline: "A chaotic cartoon drop with the same premium coin cost.",
    unlocked: false,
    cost: 600,
    currency: "Royale Coins",
    palette: {
      body: "#15181f",
      accent: "#f28d2f",
      head: "#171a22",
      hair: "#0d1016",
      boots: "#f28d2f",
      shadow: "rgba(5, 7, 10, 0.34)"
    }
  },
  {
    id: "marshmello",
    name: "Marshmello",
    rarity: "Icon",
    set: "Festival Pulse",
    theme: "Gloss white + neon black trim",
    tagline: "Festival-ready drop gear with a brighter premium tier.",
    unlocked: false,
    cost: 650,
    currency: "Royale Coins",
    palette: {
      body: "#f3f3f1",
      accent: "#121317",
      head: "#fffdf8",
      hair: "#121317",
      boots: "#ffffff",
      shadow: "rgba(9, 10, 13, 0.22)"
    }
  },
  {
    id: "spider-man",
    name: "Spider Man",
    rarity: "Icon",
    set: "City Swing",
    theme: "Crimson web suit + midnight trim",
    tagline: "Skyline-ready movement gear with premium coin pricing.",
    unlocked: false,
    cost: 650,
    currency: "Royale Coins",
    palette: {
      body: "#be1e2d",
      accent: "#214fbe",
      head: "#be1e2d",
      hair: "#13233f",
      boots: "#214fbe",
      shadow: "rgba(7, 11, 22, 0.3)"
    }
  },
  {
    id: "bart-simpson",
    name: "Bart Simpson",
    rarity: "Bundle",
    set: "Springfield Family Pack",
    theme: "Cartoon yellow + red shirt + blue shorts",
    tagline: "Bundle includes Bart Simpson, Marge Simpson, and Homer Simpson.",
    unlocked: false,
    cost: 900,
    currency: "Royale Coins",
    palette: {
      body: "#ef5336",
      accent: "#2e6edb",
      head: "#f7d54c",
      hair: "#121212",
      boots: "#2e6edb",
      shadow: "rgba(14, 15, 19, 0.28)"
    }
  },
  {
    id: "huggy-wuggy",
    name: "Huggy Wuggy",
    rarity: "Epic",
    set: "Toy Terror",
    theme: "Electric blue fur + bright red trim",
    tagline: "A creepy toy-themed drop skin with a higher coin cost.",
    unlocked: false,
    cost: 710,
    currency: "Royale Coins",
    palette: {
      body: "#1697d7",
      accent: "#d93d46",
      head: "#1aa0e3",
      hair: "#0f6f9d",
      boots: "#f2cf42",
      shadow: "rgba(4, 23, 34, 0.32)"
    }
  }
];

const emotes = [
  {
    id: "dance-master",
    name: "Dance Master",
    rarity: "Rare",
    set: "Launch Moves",
    tagline: "The first Royale emote: a clean victory-floor dance routine.",
    unlocked: true,
    icon: "♪",
    move: "dance-master"
  },
  {
    id: "sky-stepper",
    name: "Sky Stepper",
    rarity: "Rare",
    set: "Launch Moves",
    tagline: "Quick side steps with a bounce built for rooftop wins.",
    unlocked: true,
    icon: "⇄",
    move: "sky-stepper"
  },
  {
    id: "laser-shuffle",
    name: "Laser Shuffle",
    rarity: "Epic",
    set: "Neon Night",
    tagline: "Fast footwork and sharp arm cuts like a club spotlight hit.",
    unlocked: true,
    icon: "✦",
    move: "laser-shuffle"
  },
  {
    id: "meteor-clap",
    name: "Meteor Clap",
    rarity: "Epic",
    set: "Impact Series",
    tagline: "A heavy stomp-and-clap combo with arena-finisher energy.",
    unlocked: true,
    icon: "☄",
    move: "meteor-clap"
  },
  {
    id: "glitch-wiggle",
    name: "Glitch Wiggle",
    rarity: "Rare",
    set: "Signal Break",
    tagline: "A twitchy loop that feels like the lobby just desynced.",
    unlocked: true,
    icon: "≈",
    move: "glitch-wiggle"
  },
  {
    id: "crown-spin",
    name: "Crown Spin",
    rarity: "Icon",
    set: "Victory Circuit",
    tagline: "A showy spin with a final pose for last-player standing moments.",
    unlocked: true,
    icon: "♛",
    move: "crown-spin"
  }
];

const modes = [
  {
    id: "royale-island",
    name: "Royale Island",
    map: "Island",
    status: "Mode 1",
    description: "Drop onto an island, collect health and guns, and fight through AI skins until the round is over.",
    objective: "Stay alive and clear the island before the round ends.",
    loot: ["Health packs", "Starter pistols", "Assault rifles", "Ammo pickups"],
    threats: ["AI skins patrol the island", "The island gets dangerous when you push without loot", "Running out of health ends the round"],
    enemies: 6,
    guns: ["Pistol", "Shotgun", "SMG", "Assault Rifle", "Sniper"],
    territories: [
      { name: "Coral Cove", x: 104, y: 84, width: 214, height: 146, color: "rgba(104, 208, 255, 0.16)" },
      { name: "Palm Ridge", x: 344, y: 84, width: 246, height: 136, color: "rgba(255, 211, 107, 0.14)" },
      { name: "Crash Site", x: 620, y: 86, width: 220, height: 154, color: "rgba(255, 120, 104, 0.14)" },
      { name: "Mango Marsh", x: 132, y: 266, width: 250, height: 156, color: "rgba(115, 227, 141, 0.14)" },
      { name: "Center Ruins", x: 410, y: 244, width: 184, height: 150, color: "rgba(200, 165, 255, 0.14)" },
      { name: "Storm Dock", x: 626, y: 276, width: 188, height: 148, color: "rgba(102, 135, 255, 0.14)" }
    ],
    obstacles: [
      { name: "Cove Crate", x: 176, y: 150, width: 62, height: 42, color: "#7f6042" },
      { name: "Ridge Rock", x: 432, y: 142, width: 88, height: 54, color: "#738292" },
      { name: "Crash Barrier", x: 696, y: 146, width: 74, height: 46, color: "#8a6a52" },
      { name: "Marsh Stone", x: 242, y: 324, width: 82, height: 52, color: "#6d7f84" },
      { name: "Ruins Pillar", x: 470, y: 286, width: 66, height: 66, color: "#887d95" },
      { name: "Dock Container", x: 692, y: 334, width: 92, height: 56, color: "#58708f" }
    ]
  }
];

const weaponCatalog = {
  Pistol: { damage: 18, fireDelay: 0.32, bulletSpeed: 620, spread: 0.035, range: 620, ammoPickup: 18, pellets: 1, color: "#ffd166" },
  Shotgun: { damage: 10, fireDelay: 0.8, bulletSpeed: 540, spread: 0.24, range: 300, ammoPickup: 10, pellets: 5, color: "#ff9f43" },
  SMG: { damage: 9, fireDelay: 0.11, bulletSpeed: 680, spread: 0.09, range: 520, ammoPickup: 36, pellets: 1, color: "#5de0ff" },
  "Assault Rifle": { damage: 13, fireDelay: 0.18, bulletSpeed: 760, spread: 0.05, range: 700, ammoPickup: 28, pellets: 1, color: "#8eff8b" },
  Sniper: { damage: 42, fireDelay: 1.1, bulletSpeed: 980, spread: 0.015, range: 900, ammoPickup: 6, pellets: 1, color: "#dcb6ff" }
};

const GAME_WIDTH = 960;
const GAME_HEIGHT = 540;
const ISLAND_BOUNDS = { x: 86, y: 62, width: 788, height: 416 };
const PLAYER_RADIUS = 18;
const ENEMY_RADIUS = 16;
const PICKUP_RADIUS = 14;
const AI_SKIN_POOL = skins.slice(1);

const preview = document.getElementById("skinPreview");
const skinGrid = document.getElementById("skinGrid");
const emoteGrid = document.getElementById("emoteGrid");
const modeGrid = document.getElementById("modeGrid");
const nameNode = document.getElementById("equippedSkinName");
const taglineNode = document.getElementById("equippedSkinTagline");
const rarityNode = document.getElementById("equippedSkinRarity");
const setNode = document.getElementById("equippedSkinSet");
const themeNode = document.getElementById("equippedSkinTheme");
const equippedEmoteNode = document.getElementById("equippedEmoteName");
const emotePreviewLabel = document.getElementById("emotePreviewLabel");
const playEmoteButton = document.getElementById("playEmoteButton");
const matchPanel = document.getElementById("matchPanel");
const matchTitle = document.getElementById("matchTitle");
const matchStatus = document.getElementById("matchStatus");
const matchHealth = document.getElementById("matchHealth");
const matchGun = document.getElementById("matchGun");
const matchAmmo = document.getElementById("matchAmmo");
const matchEnemies = document.getElementById("matchEnemies");
const matchLog = document.getElementById("matchLog");
const restartMatchButton = document.getElementById("restartMatchButton");
const gameCanvas = document.getElementById("gameCanvas");
const overlay = document.getElementById("gameOverlay");
const overlayTitle = document.getElementById("overlayTitle");
const overlayBody = document.getElementById("overlayBody");
const gameContext = gameCanvas.getContext("2d");

const getSkinById = (id) => skins.find((skin) => skin.id === id) ?? skins[0];
const getEmoteById = (id) => emotes.find((emote) => emote.id === id) ?? emotes[0];
const getModeById = (id) => modes.find((mode) => mode.id === id) ?? modes[0];

const getInitialSkin = () => {
  const savedSkinId = window.localStorage.getItem(STORAGE_KEY);
  const savedSkin = getSkinById(savedSkinId);
  return savedSkin.unlocked ? savedSkin : skins[0];
};

const getInitialEmote = () => {
  const savedEmoteId = window.localStorage.getItem(EMOTE_STORAGE_KEY);
  const savedEmote = getEmoteById(savedEmoteId);
  return savedEmote.unlocked ? savedEmote : emotes[0];
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const randomBetween = (min, max) => min + Math.random() * (max - min);
const randomItem = (items) => items[Math.floor(Math.random() * items.length)];
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
const segmentIntersects = (a, b, c, d) => {
  const denominator = (d.y - c.y) * (b.x - a.x) - (d.x - c.x) * (b.y - a.y);

  if (denominator === 0) {
    return false;
  }

  const ua = ((d.x - c.x) * (a.y - c.y) - (d.y - c.y) * (a.x - c.x)) / denominator;
  const ub = ((b.x - a.x) * (a.y - c.y) - (b.y - a.y) * (a.x - c.x)) / denominator;

  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1;
};

const inputState = {
  up: false,
  down: false,
  left: false,
  right: false,
  firing: false,
  pointerX: GAME_WIDTH * 0.5,
  pointerY: GAME_HEIGHT * 0.5
};

let equippedSkinId = getInitialSkin().id;
let equippedEmoteId = getInitialEmote().id;
let activeEmoteTimeout = null;
let activeModeId = null;
let matchState = null;
let animationFrameId = null;
let previousFrameTime = 0;

const applySkin = (skin) => {
  preview.style.setProperty("--skin-body", skin.palette.body);
  preview.style.setProperty("--skin-accent", skin.palette.accent);
  preview.style.setProperty("--skin-head", skin.palette.head);
  preview.style.setProperty("--skin-hair", skin.palette.hair);
  preview.style.setProperty("--skin-boots", skin.palette.boots);
  preview.style.setProperty("--skin-shadow", skin.palette.shadow);
  nameNode.textContent = skin.name;
  taglineNode.textContent = skin.tagline;
  rarityNode.textContent = skin.rarity;
  setNode.textContent = skin.set;
  themeNode.textContent = skin.theme;

  if (matchState?.player) {
    matchState.player.palette = skin.palette;
  }
};

const applyEmote = (emote) => {
  equippedEmoteNode.textContent = emote.name;
  emotePreviewLabel.textContent = `Emote: ${emote.name}`;
  playEmoteButton.textContent = `Do ${emote.name}`;
  preview.dataset.emoteMove = emote.move;
};

const setOverlay = (title, body, visible) => {
  overlayTitle.textContent = title;
  overlayBody.textContent = body;
  overlay.hidden = !visible;
};

const writeMatchLog = (message, replace = false) => {
  if (replace) {
    matchLog.innerHTML = "";
  }

  const entry = document.createElement("p");
  entry.textContent = message;
  matchLog.prepend(entry);

  while (matchLog.childElementCount > 8) {
    matchLog.removeChild(matchLog.lastElementChild);
  }
};

const syncMatchUi = () => {
  if (!matchState) {
    return;
  }

  matchTitle.textContent = matchState.mode.name;
  matchStatus.textContent = matchState.status;
  matchHealth.textContent = String(Math.max(0, Math.round(matchState.player.health)));
  matchGun.textContent = matchState.player.weapon ?? "None";
  matchAmmo.textContent = matchState.player.weapon ? String(matchState.player.ammo) : "--";
  matchEnemies.textContent = String(matchState.enemies.filter((enemy) => enemy.alive).length);
};

const makeArenaPoint = (padding = 32) => ({
  x: randomBetween(ISLAND_BOUNDS.x + padding, ISLAND_BOUNDS.x + ISLAND_BOUNDS.width - padding),
  y: randomBetween(ISLAND_BOUNDS.y + padding, ISLAND_BOUNDS.y + ISLAND_BOUNDS.height - padding)
});

const getTerritoryAtPoint = (mode, point) =>
  mode.territories?.find((territory) =>
    point.x >= territory.x &&
    point.x <= territory.x + territory.width &&
    point.y >= territory.y &&
    point.y <= territory.y + territory.height
  ) ?? null;

const makePointInTerritory = (territory, padding = 20) => ({
  x: randomBetween(territory.x + padding, territory.x + territory.width - padding),
  y: randomBetween(territory.y + padding, territory.y + territory.height - padding)
});

const pointInsideRect = (point, rect, padding = 0) =>
  point.x >= rect.x - padding &&
  point.x <= rect.x + rect.width + padding &&
  point.y >= rect.y - padding &&
  point.y <= rect.y + rect.height + padding;

const segmentIntersectsRect = (start, end, rect) => {
  if (pointInsideRect(start, rect) || pointInsideRect(end, rect)) {
    return true;
  }

  const topLeft = { x: rect.x, y: rect.y };
  const topRight = { x: rect.x + rect.width, y: rect.y };
  const bottomLeft = { x: rect.x, y: rect.y + rect.height };
  const bottomRight = { x: rect.x + rect.width, y: rect.y + rect.height };

  return (
    segmentIntersects(start, end, topLeft, topRight) ||
    segmentIntersects(start, end, topRight, bottomRight) ||
    segmentIntersects(start, end, bottomRight, bottomLeft) ||
    segmentIntersects(start, end, bottomLeft, topLeft)
  );
};

const resolveEntityObstacleCollision = (entity, radius, obstacles) => {
  obstacles.forEach((obstacle) => {
    const nearestX = clamp(entity.x, obstacle.x, obstacle.x + obstacle.width);
    const nearestY = clamp(entity.y, obstacle.y, obstacle.y + obstacle.height);
    const dx = entity.x - nearestX;
    const dy = entity.y - nearestY;
    const dist = Math.hypot(dx, dy);

    if (dist === 0) {
      const pushLeft = Math.abs(entity.x - obstacle.x);
      const pushRight = Math.abs(entity.x - (obstacle.x + obstacle.width));
      const pushTop = Math.abs(entity.y - obstacle.y);
      const pushBottom = Math.abs(entity.y - (obstacle.y + obstacle.height));
      const minPush = Math.min(pushLeft, pushRight, pushTop, pushBottom);

      if (minPush === pushLeft) {
        entity.x = obstacle.x - radius;
      } else if (minPush === pushRight) {
        entity.x = obstacle.x + obstacle.width + radius;
      } else if (minPush === pushTop) {
        entity.y = obstacle.y - radius;
      } else {
        entity.y = obstacle.y + obstacle.height + radius;
      }

      return;
    }

    if (dist < radius) {
      const overlap = radius - dist;
      entity.x += (dx / dist) * overlap;
      entity.y += (dy / dist) * overlap;
    }
  });
};

const hasLineOfSight = (from, to, obstacles) =>
  !obstacles.some((obstacle) => segmentIntersectsRect(from, to, obstacle));

const makePointAwayFrom = (origin, minDistance, padding = 32) => {
  let point = makeArenaPoint(padding);
  let guard = 0;

  while (distance(point, origin) < minDistance && guard < 40) {
    point = makeArenaPoint(padding);
    guard += 1;
  }

  return point;
};

const createDecorations = () => {
  const decorations = [];

  for (let index = 0; index < 15; index += 1) {
    const point = makeArenaPoint(26);
    decorations.push({
      kind: index % 3 === 0 ? "rock" : "tree",
      x: point.x,
      y: point.y,
      size: randomBetween(14, 24)
    });
  }

  return decorations;
};

const createPickups = (mode, playerSpawn) => {
  const pickups = [];
  const territories = mode.territories ?? [];
  pickups.push({
    type: "gun",
    name: "Pistol",
    ammo: weaponCatalog.Pistol.ammoPickup,
    territory: territories[0]?.name ?? "Island",
    ...makePointAwayFrom(playerSpawn, 90, 24)
  });

  mode.guns.slice(1).forEach((weaponName, index) => {
    const territory = territories[index % territories.length];
    const point = territory ? makePointInTerritory(territory, 24) : makeArenaPoint(26);
    pickups.push({
      type: "gun",
      name: weaponName,
      ammo: weaponCatalog[weaponName].ammoPickup,
      territory: territory?.name ?? "Island",
      ...point
    });
  });

  for (let index = 0; index < 6; index += 1) {
    const territory = territories[index % territories.length];
    const point = territory ? makePointInTerritory(territory, 24) : makeArenaPoint(24);
    pickups.push({
      type: "health",
      amount: Math.round(randomBetween(16, 28)),
      territory: territory?.name ?? "Island",
      ...point
    });
  }

  return pickups;
};

const createEnemy = (playerSpawn, index) => {
  const skin = AI_SKIN_POOL[index % AI_SKIN_POOL.length] ?? skins[0];
  const mode = matchState?.mode ?? modes[0];
  const territory = mode.territories?.[index % mode.territories.length] ?? null;
  const spawn = territory ? makePointInTerritory(territory, 28) : makePointAwayFrom(playerSpawn, 220, 36);
  const aiWeapons = ["Pistol", "SMG", "Assault Rifle"];

  return {
    id: `${skin.id}-${index}`,
    name: skin.name,
    palette: skin.palette,
    x: spawn.x,
    y: spawn.y,
    angle: 0,
    speed: randomBetween(92, 116),
    health: 70,
    weapon: randomItem(aiWeapons),
    fireCooldown: randomBetween(0.9, 1.8),
    sightRange: randomBetween(230, 340),
    wakeDelay: randomBetween(1.2, 2.6),
    strafeSeed: Math.random() > 0.5 ? 1 : -1,
    territory: territory?.name ?? "Island",
    targetType: null,
    targetId: null,
    alive: true
  };
};

const fireWeapon = (owner, angle, isPlayerShot) => {
  const weapon = weaponCatalog[owner.weapon];

  if (!weapon) {
    return;
  }

  if (isPlayerShot) {
    if (owner.ammo <= 0) {
      matchState.status = "Out of ammo. Find another gun on the island.";
      return;
    }

    owner.ammo = Math.max(0, owner.ammo - 1);
  }

  owner.fireCooldown = weapon.fireDelay * (isPlayerShot ? 1 : 2.2);

  for (let pellet = 0; pellet < (weapon.pellets ?? 1); pellet += 1) {
    const spreadAngle = angle + randomBetween(-weapon.spread, weapon.spread);
    matchState.bullets.push({
      x: owner.x + Math.cos(spreadAngle) * (isPlayerShot ? PLAYER_RADIUS : ENEMY_RADIUS),
      y: owner.y + Math.sin(spreadAngle) * (isPlayerShot ? PLAYER_RADIUS : ENEMY_RADIUS),
      vx: Math.cos(spreadAngle) * weapon.bulletSpeed,
      vy: Math.sin(spreadAngle) * weapon.bulletSpeed,
      damage: weapon.damage,
      radius: isPlayerShot ? 4 : 5,
      color: weapon.color,
      fromPlayer: isPlayerShot,
      ownerId: owner.id ?? "player",
      ttl: weapon.range / weapon.bulletSpeed
    });
  }
};

const endRound = (title, body, status) => {
  if (!matchState) {
    return;
  }

  matchState.roundActive = false;
  matchState.status = status;
  syncMatchUi();
  setOverlay(title, body, true);
  writeMatchLog(body);
};

const startMode = (modeId) => {
  const mode = getModeById(modeId);
  const playerTerritory = mode.territories?.find((territory) => territory.name === "Center Ruins") ?? mode.territories?.[0] ?? null;
  const centerCover = mode.obstacles?.find((obstacle) => obstacle.name === "Ruins Pillar");
  const playerSpawn = centerCover
    ? { x: centerCover.x - 42, y: centerCover.y + centerCover.height * 0.5 }
    : playerTerritory
    ? makePointInTerritory(playerTerritory, 28)
    : {
        x: ISLAND_BOUNDS.x + ISLAND_BOUNDS.width * 0.5,
        y: ISLAND_BOUNDS.y + ISLAND_BOUNDS.height * 0.5
      };

  activeModeId = mode.id;
  matchState = {
    mode,
    roundActive: true,
    status: `Round live in ${playerTerritory?.name ?? mode.map}. Find a gun and clear the island.`,
    currentTerritory: playerTerritory?.name ?? mode.map,
    elapsed: 0,
    player: {
      x: playerSpawn.x,
      y: playerSpawn.y,
      radius: PLAYER_RADIUS,
      angle: 0,
      speed: 220,
      health: 100,
      weapon: "Pistol",
      ammo: 24,
      fireCooldown: 0,
      palette: getSkinById(equippedSkinId).palette
    },
    enemies: Array.from({ length: mode.enemies }, (_, index) => createEnemy(playerSpawn, index)),
    pickups: createPickups(mode, playerSpawn),
    bullets: [],
    decorations: createDecorations(),
    obstacles: mode.obstacles ?? []
  };

  matchPanel.hidden = false;
  gameCanvas.focus();
  setOverlay("Royale Island", "You now drop with a pistol. Use crates, rocks, and ruins as cover. Move with WASD or arrows, aim with the mouse, and click or press Space to fire.", false);
  writeMatchLog(`Dropped into ${mode.name} at ${playerTerritory?.name ?? mode.map}. ${mode.description}`, true);
  syncMatchUi();
  ensureGameLoop();
};

const movePlayer = (deltaTime) => {
  const player = matchState.player;
  const horizontal = Number(inputState.right) - Number(inputState.left);
  const vertical = Number(inputState.down) - Number(inputState.up);
  const magnitude = Math.hypot(horizontal, vertical) || 1;

  player.x += (horizontal / magnitude) * player.speed * deltaTime;
  player.y += (vertical / magnitude) * player.speed * deltaTime;
  player.x = clamp(player.x, ISLAND_BOUNDS.x + player.radius, ISLAND_BOUNDS.x + ISLAND_BOUNDS.width - player.radius);
  player.y = clamp(player.y, ISLAND_BOUNDS.y + player.radius, ISLAND_BOUNDS.y + ISLAND_BOUNDS.height - player.radius);
  resolveEntityObstacleCollision(player, player.radius, matchState.obstacles);
  player.angle = Math.atan2(inputState.pointerY - player.y, inputState.pointerX - player.x);
  player.fireCooldown = Math.max(0, player.fireCooldown - deltaTime);

  if (inputState.firing && player.weapon && player.fireCooldown <= 0) {
    fireWeapon(player, player.angle, true);
  }
};

const collectPickups = () => {
  const player = matchState.player;

  matchState.pickups = matchState.pickups.filter((pickup) => {
    if (distance(player, pickup) > player.radius + PICKUP_RADIUS) {
      return true;
    }

    if (pickup.type === "gun") {
      const weaponChanged = player.weapon !== pickup.name;
      player.weapon = pickup.name;
      player.ammo += pickup.ammo;
      matchState.status = weaponChanged ? `${pickup.name} equipped.` : `${pickup.name} ammo restocked.`;
      writeMatchLog(weaponChanged ? `You grabbed a ${pickup.name} in ${pickup.territory}.` : `You found more ammo for ${pickup.name} in ${pickup.territory}.`);
    } else {
      const healed = Math.min(100 - player.health, pickup.amount);
      player.health = clamp(player.health + pickup.amount, 0, 100);
      matchState.status = `Health restored by ${healed}.`;
      writeMatchLog(`You picked up health in ${pickup.territory} and restored ${healed}.`);
    }

    return false;
  });
};

const updateEnemies = (deltaTime) => {
  const player = matchState.player;
  const obstacles = matchState.obstacles;

  matchState.enemies.forEach((enemy) => {
    if (!enemy.alive) {
      return;
    }

    const weapon = weaponCatalog[enemy.weapon];
    const desiredRange = clamp(weapon.range * 0.42, 105, 235);
    const possibleTargets = [];

    if (matchState.elapsed >= enemy.wakeDelay && player.health > 0) {
      possibleTargets.push({
        type: "player",
        id: "player",
        x: player.x,
        y: player.y,
        dist: distance(enemy, player)
      });
    }

    matchState.enemies.forEach((otherEnemy) => {
      if (!otherEnemy.alive || otherEnemy.id === enemy.id) {
        return;
      }

      possibleTargets.push({
        type: "enemy",
        id: otherEnemy.id,
        x: otherEnemy.x,
        y: otherEnemy.y,
        dist: distance(enemy, otherEnemy)
      });
    });

    const visibleTargets = possibleTargets
      .filter((candidate) => candidate.dist <= enemy.sightRange && hasLineOfSight(enemy, candidate, obstacles))
      .sort((left, right) => left.dist - right.dist);

    const target = visibleTargets[0] ?? null;

    if (!target) {
      enemy.fireCooldown = Math.max(0, enemy.fireCooldown - deltaTime);
      enemy.x += Math.cos(enemy.angle + Math.PI * 0.5 * enemy.strafeSeed) * enemy.speed * 0.18 * deltaTime;
      enemy.y += Math.sin(enemy.angle + Math.PI * 0.5 * enemy.strafeSeed) * enemy.speed * 0.18 * deltaTime;
      enemy.x = clamp(enemy.x, ISLAND_BOUNDS.x + ENEMY_RADIUS, ISLAND_BOUNDS.x + ISLAND_BOUNDS.width - ENEMY_RADIUS);
      enemy.y = clamp(enemy.y, ISLAND_BOUNDS.y + ENEMY_RADIUS, ISLAND_BOUNDS.y + ISLAND_BOUNDS.height - ENEMY_RADIUS);
      resolveEntityObstacleCollision(enemy, ENEMY_RADIUS, obstacles);
      return;
    }

    enemy.targetType = target.type;
    enemy.targetId = target.id;
    const angleToTarget = Math.atan2(target.y - enemy.y, target.x - enemy.x);
    enemy.angle = angleToTarget;
    enemy.fireCooldown = Math.max(0, enemy.fireCooldown - deltaTime);

    let moveX = 0;
    let moveY = 0;

    if (target.dist > desiredRange + 20) {
      moveX = Math.cos(angleToTarget);
      moveY = Math.sin(angleToTarget);
    } else if (target.dist < desiredRange - 45) {
      moveX = -Math.cos(angleToTarget);
      moveY = -Math.sin(angleToTarget);
    } else {
      moveX = Math.cos(angleToTarget + Math.PI * 0.5 * enemy.strafeSeed);
      moveY = Math.sin(angleToTarget + Math.PI * 0.5 * enemy.strafeSeed);
    }

    enemy.x += moveX * enemy.speed * deltaTime;
    enemy.y += moveY * enemy.speed * deltaTime;
    enemy.x = clamp(enemy.x, ISLAND_BOUNDS.x + ENEMY_RADIUS, ISLAND_BOUNDS.x + ISLAND_BOUNDS.width - ENEMY_RADIUS);
    enemy.y = clamp(enemy.y, ISLAND_BOUNDS.y + ENEMY_RADIUS, ISLAND_BOUNDS.y + ISLAND_BOUNDS.height - ENEMY_RADIUS);
    resolveEntityObstacleCollision(enemy, ENEMY_RADIUS, obstacles);

    if (target.dist < weapon.range * 0.86 && enemy.fireCooldown <= 0 && hasLineOfSight(enemy, target, obstacles)) {
      fireWeapon(enemy, angleToTarget, false);
    }
  });
};

const updateBullets = (deltaTime) => {
  const player = matchState.player;
  const obstacles = matchState.obstacles;

  matchState.bullets = matchState.bullets.filter((bullet) => {
    const previousPoint = { x: bullet.x, y: bullet.y };
    bullet.x += bullet.vx * deltaTime;
    bullet.y += bullet.vy * deltaTime;
    bullet.ttl -= deltaTime;

    const outsideArena =
      bullet.x < ISLAND_BOUNDS.x ||
      bullet.x > ISLAND_BOUNDS.x + ISLAND_BOUNDS.width ||
      bullet.y < ISLAND_BOUNDS.y ||
      bullet.y > ISLAND_BOUNDS.y + ISLAND_BOUNDS.height;

    if (bullet.ttl <= 0 || outsideArena) {
      return false;
    }

    if (obstacles.some((obstacle) => segmentIntersectsRect(previousPoint, bullet, obstacle) || pointInsideRect(bullet, obstacle))) {
      return false;
    }

    if (bullet.fromPlayer) {
      for (const enemy of matchState.enemies) {
        if (!enemy.alive || enemy.id === bullet.ownerId || distance(bullet, enemy) > ENEMY_RADIUS + bullet.radius) {
          continue;
        }

        enemy.health -= bullet.damage;

        if (enemy.health <= 0) {
          enemy.alive = false;
          matchState.status = `${enemy.name} down. Keep pushing.`;
          writeMatchLog(`You eliminated ${enemy.name}.`);

          if (Math.random() > 0.55) {
            const dropType = Math.random() > 0.45 ? "health" : "gun";
            const dropTerritory = getTerritoryAtPoint(matchState.mode, enemy)?.name ?? matchState.mode.map;
            const drop = {
              type: dropType,
              x: enemy.x,
              y: enemy.y,
              amount: 18,
              name: randomItem(matchState.mode.guns),
              ammo: 12,
              territory: dropTerritory
            };

            if (drop.type === "gun") {
              drop.ammo = weaponCatalog[drop.name].ammoPickup;
            }

            matchState.pickups.push(drop);
          }
        }

        return false;
      }
    } else {
      if (distance(bullet, player) <= PLAYER_RADIUS + bullet.radius) {
        player.health = clamp(player.health - bullet.damage, 0, 100);
        matchState.status = `Under fire. ${Math.max(0, Math.round(player.health))} health left.`;
        return false;
      }

      for (const enemy of matchState.enemies) {
        if (!enemy.alive || distance(bullet, enemy) > ENEMY_RADIUS + bullet.radius) {
          continue;
        }

        enemy.health -= bullet.damage;

        if (enemy.health <= 0) {
          enemy.alive = false;
          writeMatchLog(`${enemy.name} was taken out by another AI skin.`);
        }

        return false;
      }
    }

    return true;
  });
};

const updateMatch = (deltaTime) => {
  if (!matchState?.roundActive) {
    return;
  }

  matchState.elapsed += deltaTime;
  movePlayer(deltaTime);
  const playerTerritory = getTerritoryAtPoint(matchState.mode, matchState.player);
  const territoryName = playerTerritory?.name ?? matchState.mode.map;

  if (territoryName !== matchState.currentTerritory) {
    matchState.currentTerritory = territoryName;
    writeMatchLog(`You entered ${territoryName}.`);
  }

  collectPickups();
  updateEnemies(deltaTime);
  updateBullets(deltaTime);

  if (matchState.player.health <= 0) {
    endRound("You Were Eliminated", "The AI skins cleared you off the island. Press restart and drop again.", "Round lost on Royale Island.");
    return;
  }

  if (matchState.enemies.every((enemy) => !enemy.alive)) {
    endRound("Island Cleared", "Every AI skin is down. Royale Island complete.", "Round won on Royale Island.");
    return;
  }

  matchState.status = `In ${territoryName}. ${matchState.enemies.filter((enemy) => enemy.alive).length} AI skins remain.`;
  syncMatchUi();
};

const drawRoundedRect = (ctx, x, y, width, height, radius) => {
  const rounded = Math.min(radius, width * 0.5, height * 0.5);
  ctx.beginPath();
  ctx.moveTo(x + rounded, y);
  ctx.lineTo(x + width - rounded, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + rounded);
  ctx.lineTo(x + width, y + height - rounded);
  ctx.quadraticCurveTo(x + width, y + height, x + width - rounded, y + height);
  ctx.lineTo(x + rounded, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - rounded);
  ctx.lineTo(x, y + rounded);
  ctx.quadraticCurveTo(x, y, x + rounded, y);
  ctx.closePath();
};

const drawCharacter = (ctx, entity, radius, angle, palette, label, healthRatio) => {
  ctx.save();
  ctx.translate(entity.x, entity.y);
  ctx.rotate(angle);
  ctx.fillStyle = palette.shadow ?? "rgba(0, 0, 0, 0.22)";
  ctx.beginPath();
  ctx.ellipse(0, radius + 8, radius + 7, radius * 0.55, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = palette.body;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(0, 0, radius, -0.7, 0.7);
  ctx.lineTo(0, 0);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = palette.head;
  ctx.beginPath();
  ctx.arc(0, -radius * 0.16, radius * 0.42, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = palette.hair;
  ctx.beginPath();
  ctx.arc(0, -radius * 0.22, radius * 0.26, Math.PI, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = palette.boots;
  ctx.lineWidth = 6;
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(radius + 10, 0);
  ctx.stroke();
  ctx.restore();
  ctx.fillStyle = "rgba(0, 0, 0, 0.42)";
  ctx.fillRect(entity.x - radius, entity.y - radius - 18, radius * 2, 5);
  ctx.fillStyle = "#56e39f";
  ctx.fillRect(entity.x - radius, entity.y - radius - 18, radius * 2 * clamp(healthRatio, 0, 1), 5);
  ctx.fillStyle = "#eff5ff";
  ctx.font = "12px Space Grotesk, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(label, entity.x, entity.y - radius - 24);
};

const renderMatch = () => {
  if (!gameContext) {
    return;
  }

  gameContext.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  gameContext.fillStyle = "#18496d";
  gameContext.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  gameContext.fillStyle = "#d8c78e";
  drawRoundedRect(gameContext, ISLAND_BOUNDS.x - 14, ISLAND_BOUNDS.y - 14, ISLAND_BOUNDS.width + 28, ISLAND_BOUNDS.height + 28, 58);
  gameContext.fill();
  const islandGradient = gameContext.createLinearGradient(0, ISLAND_BOUNDS.y, 0, ISLAND_BOUNDS.y + ISLAND_BOUNDS.height);
  islandGradient.addColorStop(0, "#5ea66c");
  islandGradient.addColorStop(1, "#2f6b43");
  gameContext.fillStyle = islandGradient;
  drawRoundedRect(gameContext, ISLAND_BOUNDS.x, ISLAND_BOUNDS.y, ISLAND_BOUNDS.width, ISLAND_BOUNDS.height, 52);
  gameContext.fill();

  if (!matchState) {
    return;
  }

  (matchState.mode.territories ?? []).forEach((territory) => {
    gameContext.fillStyle = territory.color;
    drawRoundedRect(gameContext, territory.x, territory.y, territory.width, territory.height, 24);
    gameContext.fill();
    gameContext.strokeStyle = "rgba(255, 255, 255, 0.12)";
    gameContext.lineWidth = 1;
    drawRoundedRect(gameContext, territory.x, territory.y, territory.width, territory.height, 24);
    gameContext.stroke();
    gameContext.fillStyle = "rgba(239, 245, 255, 0.88)";
    gameContext.font = "700 16px Space Grotesk, sans-serif";
    gameContext.textAlign = "left";
    gameContext.fillText(territory.name, territory.x + 14, territory.y + 26);
  });

  matchState.decorations.forEach((decoration) => {
    if (decoration.kind === "tree") {
      gameContext.fillStyle = "#1c4f2d";
      gameContext.beginPath();
      gameContext.arc(decoration.x, decoration.y, decoration.size, 0, Math.PI * 2);
      gameContext.fill();
      gameContext.fillStyle = "#114122";
      gameContext.beginPath();
      gameContext.arc(decoration.x + decoration.size * 0.24, decoration.y - decoration.size * 0.18, decoration.size * 0.55, 0, Math.PI * 2);
      gameContext.fill();
    } else {
      gameContext.fillStyle = "#718294";
      drawRoundedRect(gameContext, decoration.x - decoration.size, decoration.y - decoration.size * 0.6, decoration.size * 2, decoration.size * 1.2, 12);
      gameContext.fill();
    }
  });

  matchState.obstacles.forEach((obstacle) => {
    gameContext.fillStyle = obstacle.color;
    drawRoundedRect(gameContext, obstacle.x, obstacle.y, obstacle.width, obstacle.height, 14);
    gameContext.fill();
    gameContext.strokeStyle = "rgba(12, 18, 28, 0.42)";
    gameContext.lineWidth = 2;
    drawRoundedRect(gameContext, obstacle.x, obstacle.y, obstacle.width, obstacle.height, 14);
    gameContext.stroke();
  });

  matchState.pickups.forEach((pickup) => {
    gameContext.save();
    gameContext.translate(pickup.x, pickup.y);

    if (pickup.type === "gun") {
      gameContext.fillStyle = weaponCatalog[pickup.name].color;
      gameContext.beginPath();
      gameContext.moveTo(0, -15);
      gameContext.lineTo(14, 0);
      gameContext.lineTo(0, 15);
      gameContext.lineTo(-14, 0);
      gameContext.closePath();
      gameContext.fill();
      gameContext.fillStyle = "#13233f";
      gameContext.font = "11px Space Grotesk, sans-serif";
      gameContext.textAlign = "center";
      gameContext.fillText(pickup.name[0], 0, 4);
    } else {
      gameContext.fillStyle = "#7ef7a2";
      gameContext.beginPath();
      gameContext.arc(0, 0, 14, 0, Math.PI * 2);
      gameContext.fill();
      gameContext.strokeStyle = "#114d28";
      gameContext.lineWidth = 4;
      gameContext.beginPath();
      gameContext.moveTo(-6, 0);
      gameContext.lineTo(6, 0);
      gameContext.moveTo(0, -6);
      gameContext.lineTo(0, 6);
      gameContext.stroke();
    }

    gameContext.restore();
  });

  matchState.bullets.forEach((bullet) => {
    gameContext.fillStyle = bullet.color;
    gameContext.beginPath();
    gameContext.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    gameContext.fill();
  });

  matchState.enemies.forEach((enemy) => {
    if (!enemy.alive) {
      return;
    }

    drawCharacter(gameContext, enemy, ENEMY_RADIUS, enemy.angle, enemy.palette, enemy.name, enemy.health / 70);
  });

  drawCharacter(gameContext, matchState.player, PLAYER_RADIUS, matchState.player.angle, matchState.player.palette, "You", matchState.player.health / 100);

  if (matchState.roundActive) {
    gameContext.strokeStyle = "rgba(239, 245, 255, 0.75)";
    gameContext.lineWidth = 2;
    gameContext.beginPath();
    gameContext.arc(inputState.pointerX, inputState.pointerY, 10, 0, Math.PI * 2);
    gameContext.stroke();
    gameContext.beginPath();
    gameContext.moveTo(inputState.pointerX - 16, inputState.pointerY);
    gameContext.lineTo(inputState.pointerX + 16, inputState.pointerY);
    gameContext.moveTo(inputState.pointerX, inputState.pointerY - 16);
    gameContext.lineTo(inputState.pointerX, inputState.pointerY + 16);
    gameContext.stroke();
  }
};

const gameLoop = (timestamp) => {
  if (!matchState) {
    animationFrameId = null;
    previousFrameTime = 0;
    return;
  }

  const deltaTime = previousFrameTime ? Math.min((timestamp - previousFrameTime) / 1000, 0.033) : 0.016;
  previousFrameTime = timestamp;
  updateMatch(deltaTime);
  renderMatch();
  animationFrameId = window.requestAnimationFrame(gameLoop);
};

const ensureGameLoop = () => {
  if (animationFrameId !== null) {
    return;
  }

  previousFrameTime = 0;
  animationFrameId = window.requestAnimationFrame(gameLoop);
};

const updatePointer = (event) => {
  const rect = gameCanvas.getBoundingClientRect();
  inputState.pointerX = clamp(((event.clientX - rect.left) / rect.width) * GAME_WIDTH, 0, GAME_WIDTH);
  inputState.pointerY = clamp(((event.clientY - rect.top) / rect.height) * GAME_HEIGHT, 0, GAME_HEIGHT);
};

const playEquippedEmote = () => {
  const emote = getEmoteById(equippedEmoteId);
  preview.classList.remove("is-emoting");
  window.clearTimeout(activeEmoteTimeout);
  void preview.offsetWidth;
  preview.classList.add("is-emoting");
  emotePreviewLabel.textContent = `${emote.name} in progress`;
  playEmoteButton.textContent = `Doing ${emote.name}...`;
  playEmoteButton.disabled = true;
  activeEmoteTimeout = window.setTimeout(() => {
    preview.classList.remove("is-emoting");
    applyEmote(emote);
    playEmoteButton.disabled = false;
  }, 1800);
};

const renderSkinGrid = () => {
  skinGrid.innerHTML = "";

  skins.forEach((skin) => {
    const card = document.createElement("article");
    card.className = "skin-card";

    const swatch = document.createElement("div");
    swatch.className = "skin-swatch";
    swatch.style.setProperty("--swatch-primary", skin.palette.body);
    swatch.style.setProperty("--swatch-secondary", skin.palette.accent);
    swatch.setAttribute("aria-hidden", "true");

    const copy = document.createElement("div");
    copy.className = "skin-copy";
    copy.innerHTML = `
      <h3>${skin.name}</h3>
      <p>${skin.tagline}</p>
      <div class="skin-meta">
        <span class="rarity-pill">${skin.rarity}</span>
        <span class="skin-chip">${skin.set}</span>
        ${skin.unlocked ? "" : `<span class="skin-chip">${skin.cost} ${skin.currency}</span>`}
      </div>
    `;

    const button = document.createElement("button");
    button.className = "equip-button";
    button.type = "button";
    const isEquipped = skin.id === equippedSkinId;
    button.textContent = isEquipped ? "Equipped" : skin.unlocked ? "Equip" : `${skin.cost} Coins`;
    button.disabled = isEquipped || !skin.unlocked;
    button.addEventListener("click", () => {
      equippedSkinId = skin.id;
      window.localStorage.setItem(STORAGE_KEY, equippedSkinId);
      applySkin(skin);
      renderSkinGrid();
    });

    card.append(swatch, copy, button);
    skinGrid.append(card);
  });
};

const renderEmoteGrid = () => {
  emoteGrid.innerHTML = "";

  emotes.forEach((emote) => {
    const card = document.createElement("article");
    card.className = "emote-card";

    const icon = document.createElement("div");
    icon.className = "emote-icon";
    icon.textContent = emote.icon;
    icon.setAttribute("aria-hidden", "true");

    const copy = document.createElement("div");
    copy.className = "skin-copy";
    copy.innerHTML = `
      <h3>${emote.name}</h3>
      <p>${emote.tagline}</p>
      <div class="skin-meta">
        <span class="rarity-pill">${emote.rarity}</span>
        <span class="skin-chip">${emote.set}</span>
      </div>
    `;

    const button = document.createElement("button");
    button.className = "equip-button";
    button.type = "button";
    const isEquipped = emote.id === equippedEmoteId;
    button.textContent = isEquipped ? "Selected" : emote.unlocked ? "Use Emote" : "Locked";
    button.disabled = isEquipped || !emote.unlocked;
    button.addEventListener("click", () => {
      equippedEmoteId = emote.id;
      window.localStorage.setItem(EMOTE_STORAGE_KEY, equippedEmoteId);
      applyEmote(emote);
      renderEmoteGrid();
    });

    card.append(icon, copy, button);
    emoteGrid.append(card);
  });
};

const renderModes = () => {
  modeGrid.innerHTML = "";

  modes.forEach((mode) => {
    const card = document.createElement("article");
    card.className = "mode-card";
    const lootMarkup = mode.loot.map((item) => `<li>${item}</li>`).join("");
    const threatMarkup = mode.threats.map((item) => `<li>${item}</li>`).join("");

    card.innerHTML = `
      <div class="mode-topline">
        <span class="rarity-pill">${mode.status}</span>
        <span class="skin-chip">${mode.map}</span>
      </div>
      <h3>${mode.name}</h3>
      <p class="mode-description">${mode.description}</p>
      <div class="mode-columns">
        <section class="mode-block">
          <p class="mode-label">Objective</p>
          <p>${mode.objective}</p>
        </section>
        <section class="mode-block">
          <p class="mode-label">Loot</p>
          <ul>${lootMarkup}</ul>
        </section>
        <section class="mode-block">
          <p class="mode-label">Round Threats</p>
          <ul>${threatMarkup}</ul>
        </section>
      </div>
      <button class="mode-play-button" type="button">Play ${mode.name}</button>
    `;

    card.querySelector(".mode-play-button").addEventListener("click", () => {
      startMode(mode.id);
      matchPanel.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    modeGrid.append(card);
  });
};

window.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (event.key === "ArrowUp" || key === "w") {
    inputState.up = true;
  }
  if (event.key === "ArrowDown" || key === "s") {
    inputState.down = true;
  }
  if (event.key === "ArrowLeft" || key === "a") {
    inputState.left = true;
  }
  if (event.key === "ArrowRight" || key === "d") {
    inputState.right = true;
  }
  if (event.code === "Space") {
    inputState.firing = true;
    event.preventDefault();
  }
});

window.addEventListener("keyup", (event) => {
  const key = event.key.toLowerCase();
  if (event.key === "ArrowUp" || key === "w") {
    inputState.up = false;
  }
  if (event.key === "ArrowDown" || key === "s") {
    inputState.down = false;
  }
  if (event.key === "ArrowLeft" || key === "a") {
    inputState.left = false;
  }
  if (event.key === "ArrowRight" || key === "d") {
    inputState.right = false;
  }
  if (event.code === "Space") {
    inputState.firing = false;
  }
});

gameCanvas.addEventListener("mousemove", updatePointer);
gameCanvas.addEventListener("mousedown", (event) => {
  updatePointer(event);
  inputState.firing = true;
  gameCanvas.focus();
});

window.addEventListener("mouseup", () => {
  inputState.firing = false;
});

gameCanvas.addEventListener("mouseleave", () => {
  inputState.firing = false;
});

applySkin(getSkinById(equippedSkinId));
applyEmote(getEmoteById(equippedEmoteId));
renderSkinGrid();
renderEmoteGrid();
renderModes();
renderMatch();

playEmoteButton.addEventListener("click", playEquippedEmote);
restartMatchButton.addEventListener("click", () => startMode(activeModeId ?? modes[0].id));
