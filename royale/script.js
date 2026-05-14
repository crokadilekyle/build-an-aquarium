const STORAGE_KEYS = {
  equippedSkin: "royale-equipped-skin",
  equippedEmotes: "royale-equipped-emotes",
  unlockedSkins: "royale-unlocked-skins",
  coins: "royale-coins"
};

const skinDefs = [
  {
    id: "default-ranger",
    name: "Default Ranger",
    rarity: "Common",
    set: "Launch Crew",
    theme: "Scout green + amber trim",
    tagline: "Balanced starter outfit for first-drop matches.",
    cost: 0,
    defaultUnlocked: true,
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
    cost: 600,
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
    cost: 600,
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
    cost: 650,
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
    cost: 650,
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
    cost: 900,
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
    cost: 710,
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
  { id: "dance-master", name: "Dance Master", rarity: "Rare", set: "Launch Moves", tagline: "The first Royale emote: a clean victory-floor dance routine.", icon: "♪", move: "dance-master" },
  { id: "sky-stepper", name: "Sky Stepper", rarity: "Rare", set: "Launch Moves", tagline: "Quick side steps with a bounce built for rooftop wins.", icon: "⇄", move: "sky-stepper" },
  { id: "laser-shuffle", name: "Laser Shuffle", rarity: "Epic", set: "Neon Night", tagline: "Fast footwork and sharp arm cuts like a club spotlight hit.", icon: "✦", move: "laser-shuffle" },
  { id: "meteor-clap", name: "Meteor Clap", rarity: "Epic", set: "Impact Series", tagline: "A heavy stomp-and-clap combo with arena-finisher energy.", icon: "☄", move: "meteor-clap" },
  { id: "glitch-wiggle", name: "Glitch Wiggle", rarity: "Rare", set: "Signal Break", tagline: "A twitchy loop that feels like the lobby just desynced.", icon: "≈", move: "glitch-wiggle" },
  { id: "crown-spin", name: "Crown Spin", rarity: "Icon", set: "Victory Circuit", tagline: "A showy spin with a final pose for last-player standing moments.", icon: "♛", move: "crown-spin" }
];

const modes = [
  {
    id: "royale-island",
    name: "Royale Island",
    map: "Island",
    status: "Battle Royale",
    description: "Drop onto a larger island, loot up, use cover, and outlast 15 AI skins.",
    objective: "Finish first by surviving every AI skin on the island.",
    loot: ["Guns", "Ammo crates", "Health packs", "Cover-heavy terrain"],
    threats: ["15 AI skins", "Free-for-all bot fights", "Longer sight lines on the big island"],
    enemies: 15,
    guns: ["Pistol", "Shotgun", "SMG", "Assault Rifle", "Sniper"],
    territories: [
      { name: "Coral Cove", x: 120, y: 88, width: 260, height: 166, color: "rgba(104, 208, 255, 0.16)" },
      { name: "Palm Ridge", x: 418, y: 86, width: 282, height: 160, color: "rgba(255, 211, 107, 0.14)" },
      { name: "Crash Site", x: 752, y: 88, width: 268, height: 174, color: "rgba(255, 120, 104, 0.14)" },
      { name: "Mango Marsh", x: 136, y: 302, width: 292, height: 180, color: "rgba(115, 227, 141, 0.14)" },
      { name: "Center Ruins", x: 462, y: 286, width: 236, height: 196, color: "rgba(200, 165, 255, 0.14)" },
      { name: "Storm Dock", x: 766, y: 318, width: 228, height: 184, color: "rgba(102, 135, 255, 0.14)" },
      { name: "Reef Fields", x: 334, y: 530, width: 248, height: 118, color: "rgba(131, 255, 186, 0.12)" },
      { name: "Wind Cliff", x: 642, y: 528, width: 272, height: 120, color: "rgba(255, 204, 151, 0.12)" }
    ],
    obstacles: [
      { name: "Cove Crate", x: 204, y: 154, width: 74, height: 52, color: "#7f6042" },
      { name: "Cove Stone", x: 306, y: 196, width: 82, height: 48, color: "#738292" },
      { name: "Ridge Rock", x: 526, y: 152, width: 94, height: 56, color: "#738292" },
      { name: "Palm Barrier", x: 616, y: 204, width: 84, height: 42, color: "#8a6a52" },
      { name: "Crash Barrier", x: 854, y: 164, width: 92, height: 48, color: "#8a6a52" },
      { name: "Crash Wreck", x: 916, y: 222, width: 96, height: 58, color: "#6d7f84" },
      { name: "Marsh Stone", x: 252, y: 386, width: 92, height: 58, color: "#6d7f84" },
      { name: "Marsh Crate", x: 368, y: 346, width: 76, height: 52, color: "#7f6042" },
      { name: "Ruins Pillar", x: 534, y: 364, width: 78, height: 86, color: "#887d95" },
      { name: "Ruins Wall", x: 618, y: 322, width: 96, height: 56, color: "#7f7a8b" },
      { name: "Dock Container", x: 812, y: 400, width: 108, height: 62, color: "#58708f" },
      { name: "Dock Crate", x: 930, y: 354, width: 78, height: 48, color: "#7f6042" },
      { name: "Field Boulder", x: 424, y: 564, width: 88, height: 52, color: "#718294" },
      { name: "Cliff Crate", x: 770, y: 568, width: 94, height: 50, color: "#8a6a52" }
    ]
  }
];

const weaponCatalog = {
  Pistol: { damage: 18, fireDelay: 0.3, bulletSpeed: 660, spread: 0.03, range: 720, ammoPickup: 18, pellets: 1, color: "#ffd166" },
  Shotgun: { damage: 10, fireDelay: 0.76, bulletSpeed: 560, spread: 0.22, range: 320, ammoPickup: 12, pellets: 5, color: "#ff9f43" },
  SMG: { damage: 9, fireDelay: 0.11, bulletSpeed: 710, spread: 0.08, range: 560, ammoPickup: 36, pellets: 1, color: "#5de0ff" },
  "Assault Rifle": { damage: 13, fireDelay: 0.17, bulletSpeed: 780, spread: 0.045, range: 760, ammoPickup: 28, pellets: 1, color: "#8eff8b" },
  Sniper: { damage: 42, fireDelay: 1.08, bulletSpeed: 1040, spread: 0.015, range: 980, ammoPickup: 8, pellets: 1, color: "#dcb6ff" }
};

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 760;
const ISLAND_BOUNDS = { x: 88, y: 66, width: 1108, height: 628 };
const PLAYER_RADIUS = 18;
const ENEMY_RADIUS = 16;
const PICKUP_RADIUS = 14;

const lobbyView = document.getElementById("lobbyView");
const matchScreen = document.getElementById("matchScreen");
const coinsCount = document.getElementById("coinsCount");
const matchCoinsCount = document.getElementById("matchCoinsCount");
const tabButtons = [...document.querySelectorAll(".tab-button")];
const tabPanels = {
  play: document.getElementById("playTab"),
  locker: document.getElementById("lockerTab"),
  shop: document.getElementById("shopTab")
};
const modeGrid = document.getElementById("modeGrid");
const playEmoteButtons = document.getElementById("playEmoteButtons");
const lockerSkinGrid = document.getElementById("lockerSkinGrid");
const lockerEmoteGrid = document.getElementById("lockerEmoteGrid");
const equippedEmoteSlots = document.getElementById("equippedEmoteSlots");
const shopGrid = document.getElementById("shopGrid");

const skinPreview = document.getElementById("skinPreview");
const emotePreviewLabel = document.getElementById("emotePreviewLabel");
const playSkinName = document.getElementById("playSkinName");
const playSkinTagline = document.getElementById("playSkinTagline");
const playSkinSet = document.getElementById("playSkinSet");
const playSkinTheme = document.getElementById("playSkinTheme");
const playSkinRarity = document.getElementById("playSkinRarity");

const matchTitle = document.getElementById("matchTitle");
const matchStatus = document.getElementById("matchStatus");
const matchHealth = document.getElementById("matchHealth");
const matchGun = document.getElementById("matchGun");
const matchAmmo = document.getElementById("matchAmmo");
const matchEnemies = document.getElementById("matchEnemies");
const matchElims = document.getElementById("matchElims");
const matchLog = document.getElementById("matchLog");
const restartMatchButton = document.getElementById("restartMatchButton");
const leaveMatchButton = document.getElementById("leaveMatchButton");
const gameCanvas = document.getElementById("gameCanvas");
const gameContext = gameCanvas.getContext("2d");
const gameOverlay = document.getElementById("gameOverlay");
const overlayKicker = document.getElementById("overlayKicker");
const overlayTitle = document.getElementById("overlayTitle");
const overlayBody = document.getElementById("overlayBody");

const readJSON = (key, fallback) => {
  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const requestFullscreenSafe = async (element) => {
  if (!element?.requestFullscreen || document.fullscreenElement === element) {
    return;
  }

  try {
    await element.requestFullscreen();
  } catch {
    // Ignore rejected fullscreen requests and continue launching the match.
  }
};

const exitFullscreenSafe = async () => {
  if (!document.fullscreenElement || !document.exitFullscreen) {
    return;
  }

  try {
    await document.exitFullscreen();
  } catch {
    // Ignore rejected fullscreen exits and continue returning to lobby.
  }
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

const hasLineOfSight = (from, to, obstacles) => !obstacles.some((obstacle) => segmentIntersectsRect(from, to, obstacle));

const inputState = {
  up: false,
  down: false,
  left: false,
  right: false,
  firing: false,
  pointerX: GAME_WIDTH * 0.5,
  pointerY: GAME_HEIGHT * 0.5
};

const unlockedSkinIds = new Set(
  [...readJSON(STORAGE_KEYS.unlockedSkins, []), ...skinDefs.filter((skin) => skin.defaultUnlocked).map((skin) => skin.id)]
);

const normalizeEquippedEmotes = (ids) => {
  const chosen = [];

  ids.forEach((id) => {
    if (emotes.some((emote) => emote.id === id) && !chosen.includes(id) && chosen.length < 4) {
      chosen.push(id);
    }
  });

  emotes.forEach((emote) => {
    if (!chosen.includes(emote.id) && chosen.length < 4) {
      chosen.push(emote.id);
    }
  });

  return chosen;
};

const state = {
  activeTab: "play",
  selectedEmoteSlot: 0,
  coins: Number(window.localStorage.getItem(STORAGE_KEYS.coins) || 0),
  equippedSkinId: window.localStorage.getItem(STORAGE_KEYS.equippedSkin) || "default-ranger",
  equippedEmoteIds: normalizeEquippedEmotes(readJSON(STORAGE_KEYS.equippedEmotes, emotes.slice(0, 4).map((emote) => emote.id))),
  previewTimeout: null,
  match: null,
  loopId: null,
  lastFrameTime: 0
};

const getSkinById = (id) => skinDefs.find((skin) => skin.id === id) ?? skinDefs[0];
const getEmoteById = (id) => emotes.find((emote) => emote.id === id) ?? emotes[0];
const getUnlockedSkins = () => skinDefs.filter((skin) => unlockedSkinIds.has(skin.id) || skin.defaultUnlocked);
const getShopSkins = () => skinDefs.filter((skin) => !(unlockedSkinIds.has(skin.id) || skin.defaultUnlocked));

const persistProfile = () => {
  writeJSON(STORAGE_KEYS.unlockedSkins, [...unlockedSkinIds]);
  writeJSON(STORAGE_KEYS.equippedEmotes, state.equippedEmoteIds);
  window.localStorage.setItem(STORAGE_KEYS.equippedSkin, state.equippedSkinId);
  window.localStorage.setItem(STORAGE_KEYS.coins, String(state.coins));
};

const setOverlay = (kicker, title, body, visible) => {
  overlayKicker.textContent = kicker;
  overlayTitle.textContent = title;
  overlayBody.textContent = body;
  gameOverlay.hidden = !visible;
};

const applyPreviewSkin = () => {
  const skin = getSkinById(state.equippedSkinId);
  skinPreview.style.setProperty("--skin-body", skin.palette.body);
  skinPreview.style.setProperty("--skin-accent", skin.palette.accent);
  skinPreview.style.setProperty("--skin-head", skin.palette.head);
  skinPreview.style.setProperty("--skin-hair", skin.palette.hair);
  skinPreview.style.setProperty("--skin-boots", skin.palette.boots);
  skinPreview.style.setProperty("--skin-shadow", skin.palette.shadow);
  playSkinName.textContent = skin.name;
  playSkinTagline.textContent = skin.tagline;
  playSkinSet.textContent = skin.set;
  playSkinTheme.textContent = skin.theme;
  playSkinRarity.textContent = skin.rarity;

  if (state.match?.player) {
    state.match.player.palette = skin.palette;
  }
};

const playPreviewEmote = (emoteId) => {
  const emote = getEmoteById(emoteId);
  skinPreview.dataset.emoteMove = emote.move;
  skinPreview.classList.remove("is-emoting");
  window.clearTimeout(state.previewTimeout);
  void skinPreview.offsetWidth;
  skinPreview.classList.add("is-emoting");
  emotePreviewLabel.textContent = `${emote.name} in progress`;

  state.previewTimeout = window.setTimeout(() => {
    skinPreview.classList.remove("is-emoting");
    emotePreviewLabel.textContent = `${emote.name} ready`;
  }, 1800);
};

const setActiveTab = (tab) => {
  state.activeTab = tab;
  tabButtons.forEach((button) => button.classList.toggle("active", button.dataset.tab === tab));

  Object.entries(tabPanels).forEach(([key, panel]) => {
    const active = key === tab;
    panel.hidden = !active;
    panel.classList.toggle("active", active);
  });
};

const renderHeader = () => {
  coinsCount.textContent = String(state.coins);
  matchCoinsCount.textContent = String(state.coins);
};

const renderPlayEmoteButtons = () => {
  playEmoteButtons.innerHTML = "";

  state.equippedEmoteIds.forEach((emoteId, index) => {
    const emote = getEmoteById(emoteId);
    const button = document.createElement("button");
    button.className = "quick-emote-button";
    button.type = "button";
    button.textContent = `Slot ${index + 1}: ${emote.name}`;
    button.addEventListener("click", () => playPreviewEmote(emote.id));
    playEmoteButtons.append(button);
  });
};

const renderModeCards = () => {
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
      <p>${mode.description}</p>
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
          <p class="mode-label">Threats</p>
          <ul>${threatMarkup}</ul>
        </section>
      </div>
      <button class="mode-play-button" type="button">Play ${mode.name}</button>
    `;

    card.querySelector(".mode-play-button").addEventListener("click", () => launchMode(mode.id));
    modeGrid.append(card);
  });
};

const renderLockerSkins = () => {
  lockerSkinGrid.innerHTML = "";

  getUnlockedSkins().forEach((skin) => {
    const card = document.createElement("article");
    card.className = "skin-card";

    const swatch = document.createElement("div");
    swatch.className = "skin-swatch";
    swatch.style.setProperty("--swatch-primary", skin.palette.body);
    swatch.style.setProperty("--swatch-secondary", skin.palette.accent);

    const copy = document.createElement("div");
    copy.className = "skin-copy";
    copy.innerHTML = `
      <h3>${skin.name}</h3>
      <p>${skin.tagline}</p>
      <div class="skin-meta">
        <span class="rarity-pill">${skin.rarity}</span>
        <span class="skin-chip">${skin.set}</span>
      </div>
    `;

    const button = document.createElement("button");
    button.className = "equip-button";
    button.type = "button";
    const equipped = skin.id === state.equippedSkinId;
    button.textContent = equipped ? "Equipped" : "Equip Skin";
    button.disabled = equipped;
    button.addEventListener("click", () => {
      state.equippedSkinId = skin.id;
      persistProfile();
      applyPreviewSkin();
      renderLockerSkins();
      renderShop();
    });

    card.append(swatch, copy, button);
    lockerSkinGrid.append(card);
  });
};

const renderEmoteSlots = () => {
  equippedEmoteSlots.innerHTML = "";

  state.equippedEmoteIds.forEach((emoteId, index) => {
    const emote = getEmoteById(emoteId);
    const slot = document.createElement("article");
    slot.className = `emote-slot${state.selectedEmoteSlot === index ? " active" : ""}`;
    slot.innerHTML = `
      <p class="mode-label">Slot ${index + 1}</p>
      <h3>${emote.name}</h3>
      <p>${emote.set}</p>
    `;

    const button = document.createElement("button");
    button.className = `slot-button${state.selectedEmoteSlot === index ? " active" : ""}`;
    button.type = "button";
    button.textContent = state.selectedEmoteSlot === index ? "Selected Slot" : "Select Slot";
    button.addEventListener("click", () => {
      state.selectedEmoteSlot = index;
      renderEmoteSlots();
      renderLockerEmotes();
    });

    slot.append(button);
    equippedEmoteSlots.append(slot);
  });
};

const equipEmoteToSlot = (slotIndex, emoteId) => {
  const currentIds = [...state.equippedEmoteIds];
  const existingIndex = currentIds.indexOf(emoteId);

  if (existingIndex !== -1) {
    currentIds[existingIndex] = currentIds[slotIndex];
  }

  currentIds[slotIndex] = emoteId;
  state.equippedEmoteIds = normalizeEquippedEmotes(currentIds);
  persistProfile();
  renderEmoteSlots();
  renderLockerEmotes();
  renderPlayEmoteButtons();
};

const renderLockerEmotes = () => {
  lockerEmoteGrid.innerHTML = "";

  emotes.forEach((emote) => {
    const card = document.createElement("article");
    card.className = "emote-card";

    const icon = document.createElement("div");
    icon.className = "emote-icon";
    icon.textContent = emote.icon;

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
    const slotIndex = state.equippedEmoteIds.indexOf(emote.id);
    button.textContent = slotIndex === -1 ? `Equip To Slot ${state.selectedEmoteSlot + 1}` : `In Slot ${slotIndex + 1}`;
    button.disabled = slotIndex === state.selectedEmoteSlot;
    button.addEventListener("click", () => equipEmoteToSlot(state.selectedEmoteSlot, emote.id));

    card.append(icon, copy, button);
    lockerEmoteGrid.append(card);
  });
};

const buySkin = (skinId) => {
  const skin = getSkinById(skinId);

  if (state.coins < skin.cost || unlockedSkinIds.has(skin.id)) {
    return;
  }

  state.coins -= skin.cost;
  unlockedSkinIds.add(skin.id);
  persistProfile();
  renderAll();
};

const renderShop = () => {
  shopGrid.innerHTML = "";

  const lockedSkins = getShopSkins();

  if (lockedSkins.length === 0) {
    const card = document.createElement("article");
    card.className = "shop-card";
    card.innerHTML = `
      <div class="skin-copy">
        <h3>Shop Cleared</h3>
        <p>You already own every skin in the Royale shop.</p>
      </div>
    `;
    shopGrid.append(card);
    return;
  }

  lockedSkins.forEach((skin) => {
    const card = document.createElement("article");
    card.className = "shop-card";

    const swatch = document.createElement("div");
    swatch.className = "skin-swatch";
    swatch.style.setProperty("--swatch-primary", skin.palette.body);
    swatch.style.setProperty("--swatch-secondary", skin.palette.accent);

    const copy = document.createElement("div");
    copy.className = "skin-copy";
    copy.innerHTML = `
      <h3>${skin.name}</h3>
      <p>${skin.tagline}</p>
      <div class="skin-meta">
        <span class="rarity-pill">${skin.rarity}</span>
        <span class="skin-chip">${skin.set}</span>
        <span class="skin-chip">${skin.cost} Coins</span>
      </div>
    `;

    const actions = document.createElement("div");
    actions.className = "shop-actions";

    const button = document.createElement("button");
    button.className = "buy-button";
    button.type = "button";
    button.textContent = state.coins >= skin.cost ? `Buy ${skin.name}` : `${skin.cost} Coins`;
    button.disabled = state.coins < skin.cost;
    button.addEventListener("click", () => buySkin(skin.id));

    actions.append(button);
    copy.append(actions);
    card.append(swatch, copy);
    shopGrid.append(card);
  });
};

const renderAll = () => {
  renderHeader();
  applyPreviewSkin();
  renderPlayEmoteButtons();
  renderModeCards();
  renderLockerSkins();
  renderEmoteSlots();
  renderLockerEmotes();
  renderShop();
  setActiveTab(state.activeTab);
};

const getTerritoryAtPoint = (mode, point) =>
  mode.territories.find((territory) =>
    point.x >= territory.x &&
    point.x <= territory.x + territory.width &&
    point.y >= territory.y &&
    point.y <= territory.y + territory.height
  ) ?? null;

const pointBlocked = (point, mode, padding = 18) =>
  mode.obstacles.some((obstacle) => pointInsideRect(point, obstacle, padding));

const samplePoint = (mode, options = {}) => {
  const territory = options.territoryName
    ? mode.territories.find((entry) => entry.name === options.territoryName) ?? null
    : options.territory ?? null;
  const padding = options.padding ?? 28;
  const minDistance = options.minDistance ?? 0;
  const avoidPoint = options.avoidPoint ?? null;

  for (let attempt = 0; attempt < 80; attempt += 1) {
    const point = territory
      ? {
          x: randomBetween(territory.x + padding, territory.x + territory.width - padding),
          y: randomBetween(territory.y + padding, territory.y + territory.height - padding)
        }
      : {
          x: randomBetween(ISLAND_BOUNDS.x + padding, ISLAND_BOUNDS.x + ISLAND_BOUNDS.width - padding),
          y: randomBetween(ISLAND_BOUNDS.y + padding, ISLAND_BOUNDS.y + ISLAND_BOUNDS.height - padding)
        };

    if (pointBlocked(point, mode, 24)) {
      continue;
    }

    if (avoidPoint && distance(point, avoidPoint) < minDistance) {
      continue;
    }

    return point;
  }

  return {
    x: ISLAND_BOUNDS.x + ISLAND_BOUNDS.width * 0.5,
    y: ISLAND_BOUNDS.y + ISLAND_BOUNDS.height * 0.5
  };
};

const createDecorations = (mode) => {
  const decorations = [];
  mode.territories.forEach((territory, index) => {
    decorations.push({
      kind: index % 2 === 0 ? "tree" : "rock",
      x: territory.x + territory.width * 0.2,
      y: territory.y + territory.height * 0.25,
      size: 18 + (index % 3) * 4
    });
    decorations.push({
      kind: index % 2 === 0 ? "rock" : "tree",
      x: territory.x + territory.width * 0.76,
      y: territory.y + territory.height * 0.72,
      size: 16 + (index % 4) * 3
    });
  });
  return decorations;
};

const createPickups = (mode, playerSpawn) => {
  const pickups = [];

  mode.guns.forEach((weaponName, index) => {
    const territory = mode.territories[index % mode.territories.length];
    pickups.push({
      type: "gun",
      name: weaponName,
      amount: weaponCatalog[weaponName].ammoPickup,
      territory: territory.name,
      ...samplePoint(mode, { territory, avoidPoint: playerSpawn, minDistance: 100 })
    });
  });

  for (let index = 0; index < 12; index += 1) {
    const territory = mode.territories[index % mode.territories.length];
    pickups.push({
      type: "ammo",
      amount: Math.round(randomBetween(12, 30)),
      territory: territory.name,
      ...samplePoint(mode, { territory, avoidPoint: playerSpawn, minDistance: 80 })
    });
  }

  for (let index = 0; index < 10; index += 1) {
    const territory = mode.territories[index % mode.territories.length];
    pickups.push({
      type: "health",
      amount: Math.round(randomBetween(18, 30)),
      territory: territory.name,
      ...samplePoint(mode, { territory, avoidPoint: playerSpawn, minDistance: 80 })
    });
  }

  return pickups;
};

const createEnemy = (mode, playerSpawn, index) => {
  const territory = mode.territories[index % mode.territories.length];
  const spawn = samplePoint(mode, { territory, avoidPoint: playerSpawn, minDistance: 180 });
  const aiWeapons = ["Pistol", "SMG", "Assault Rifle", "Shotgun"];
  const skin = randomItem(skinDefs);

  return {
    id: `enemy-${index + 1}`,
    name: skin.name,
    palette: skin.palette,
    x: spawn.x,
    y: spawn.y,
    angle: 0,
    speed: randomBetween(90, 118),
    health: 78,
    maxHealth: 78,
    weapon: randomItem(aiWeapons),
    fireCooldown: randomBetween(1.2, 2.2),
    sightRange: randomBetween(220, 350),
    wakeDelay: randomBetween(1.2, 2.8),
    strafeSeed: Math.random() > 0.5 ? 1 : -1,
    territory: territory.name,
    alive: true
  };
};

const placementReward = (placement) => {
  if (placement === 1) {
    return 280;
  }
  if (placement <= 3) {
    return 180;
  }
  if (placement <= 6) {
    return 120;
  }
  if (placement <= 10) {
    return 80;
  }
  return 45;
};

const computeMatchReward = (placement, eliminations) => placementReward(placement) + eliminations * 22;

const writeMatchLog = (message, replace = false) => {
  if (replace) {
    matchLog.innerHTML = "";
  }

  const entry = document.createElement("p");
  entry.textContent = message;
  matchLog.prepend(entry);

  while (matchLog.childElementCount > 10) {
    matchLog.removeChild(matchLog.lastElementChild);
  }
};

const syncMatchUi = () => {
  if (!state.match) {
    return;
  }

  const match = state.match;
  matchTitle.textContent = match.mode.name;
  matchStatus.textContent = match.status;
  matchHealth.textContent = String(Math.max(0, Math.round(match.player.health)));
  matchGun.textContent = match.player.weapon ?? "None";
  matchAmmo.textContent = match.player.weapon ? String(match.player.ammo) : "--";
  matchEnemies.textContent = String(match.enemies.filter((enemy) => enemy.alive).length);
  matchElims.textContent = String(match.playerElims);
  renderHeader();
};

const fireWeapon = (owner, angle, isPlayerShot) => {
  const match = state.match;
  const weapon = weaponCatalog[owner.weapon];

  if (!match || !weapon) {
    return;
  }

  if (isPlayerShot) {
    if (owner.ammo <= 0) {
      match.status = "Out of ammo. Find an ammo crate or a new weapon.";
      return;
    }
    owner.ammo = Math.max(0, owner.ammo - 1);
  }

  owner.fireCooldown = weapon.fireDelay * (isPlayerShot ? 1 : 2.15);
  const spreadMultiplier = isPlayerShot ? 1 : 1.35;

  for (let pellet = 0; pellet < (weapon.pellets ?? 1); pellet += 1) {
    const spreadAngle = angle + randomBetween(-weapon.spread * spreadMultiplier, weapon.spread * spreadMultiplier);
    match.bullets.push({
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

const endMatch = (won) => {
  const match = state.match;

  if (!match || match.phase === "ended") {
    return;
  }

  const enemiesAlive = match.enemies.filter((enemy) => enemy.alive).length;
  const placement = won ? 1 : enemiesAlive + 1;
  const reward = computeMatchReward(placement, match.playerElims);

  state.coins += reward;
  persistProfile();

  match.phase = "ended";
  match.roundActive = false;
  match.placement = placement;
  match.reward = reward;
  match.status = won ? `Victory. You placed #1.` : `Eliminated. You placed #${placement}.`;

  setOverlay(
    won ? "Victory" : "Match Over",
    won ? "Island Cleared" : `Placement #${placement}`,
    `${won ? "You won the round." : "You were eliminated."} Eliminations: ${match.playerElims}. Coins earned: ${reward}.`,
    true
  );

  writeMatchLog(won ? `You won the round and earned ${reward} coins.` : `You placed #${placement} and earned ${reward} coins.`);
  syncMatchUi();
  renderShop();
};

const launchMode = (modeId) => {
  const mode = modes.find((entry) => entry.id === modeId) ?? modes[0];
  const spawnTerritory = mode.territories.find((territory) => territory.name === "Center Ruins") ?? mode.territories[0];
  const playerSpawn = samplePoint(mode, { territory: spawnTerritory, padding: 34 });

  state.match = {
    mode,
    phase: "countdown",
    countdown: 3,
    elapsed: 0,
    roundActive: false,
    status: `Countdown started in ${spawnTerritory.name}.`,
    currentTerritory: spawnTerritory.name,
    playerElims: 0,
    player: {
      id: "player",
      x: playerSpawn.x,
      y: playerSpawn.y,
      radius: PLAYER_RADIUS,
      angle: 0,
      speed: 228,
      health: 100,
      maxHealth: 100,
      weapon: "Pistol",
      ammo: 26,
      fireCooldown: 0,
      palette: getSkinById(state.equippedSkinId).palette
    },
    enemies: Array.from({ length: mode.enemies }, (_, index) => createEnemy(mode, playerSpawn, index)),
    pickups: createPickups(mode, playerSpawn),
    bullets: [],
    decorations: createDecorations(mode),
    obstacles: mode.obstacles,
    placement: null,
    reward: 0
  };

  lobbyView.hidden = true;
  matchScreen.hidden = false;
  document.body.classList.add("match-active");
  inputState.firing = false;
  gameCanvas.focus();
  requestFullscreenSafe(matchScreen);
  setOverlay("Countdown", "3", "Get ready to drop.", true);
  writeMatchLog(`Launching ${mode.name}. 15 AI skins are dropping in.`, true);
  syncMatchUi();
  ensureGameLoop();
};

const leaveMatch = () => {
  state.match = null;
  lobbyView.hidden = false;
  matchScreen.hidden = true;
  document.body.classList.remove("match-active");
  inputState.firing = false;
  exitFullscreenSafe();
  renderAll();
};

const movePlayer = (deltaTime) => {
  const match = state.match;
  const player = match.player;
  const horizontal = Number(inputState.right) - Number(inputState.left);
  const vertical = Number(inputState.down) - Number(inputState.up);
  const magnitude = Math.hypot(horizontal, vertical) || 1;

  player.x += (horizontal / magnitude) * player.speed * deltaTime;
  player.y += (vertical / magnitude) * player.speed * deltaTime;
  player.x = clamp(player.x, ISLAND_BOUNDS.x + player.radius, ISLAND_BOUNDS.x + ISLAND_BOUNDS.width - player.radius);
  player.y = clamp(player.y, ISLAND_BOUNDS.y + player.radius, ISLAND_BOUNDS.y + ISLAND_BOUNDS.height - player.radius);
  resolveEntityObstacleCollision(player, player.radius, match.obstacles);
  player.angle = Math.atan2(inputState.pointerY - player.y, inputState.pointerX - player.x);
  player.fireCooldown = Math.max(0, player.fireCooldown - deltaTime);

  if (inputState.firing && player.weapon && player.fireCooldown <= 0) {
    fireWeapon(player, player.angle, true);
  }
};

const collectPickups = () => {
  const match = state.match;
  const player = match.player;

  match.pickups = match.pickups.filter((pickup) => {
    if (distance(player, pickup) > player.radius + PICKUP_RADIUS) {
      return true;
    }

    if (pickup.type === "gun") {
      const swapped = player.weapon !== pickup.name;
      player.weapon = pickup.name;
      player.ammo += pickup.amount;
      match.status = swapped ? `${pickup.name} equipped in ${pickup.territory}.` : `${pickup.name} ammo restocked in ${pickup.territory}.`;
      writeMatchLog(swapped ? `You grabbed a ${pickup.name} in ${pickup.territory}.` : `You found more ${pickup.name} ammo in ${pickup.territory}.`);
    } else if (pickup.type === "ammo") {
      player.ammo += pickup.amount;
      match.status = `Ammo picked up in ${pickup.territory}.`;
      writeMatchLog(`You picked up ${pickup.amount} ammo in ${pickup.territory}.`);
    } else {
      const healed = Math.min(player.maxHealth - player.health, pickup.amount);
      player.health = clamp(player.health + pickup.amount, 0, player.maxHealth);
      match.status = `Health restored by ${healed} in ${pickup.territory}.`;
      writeMatchLog(`You restored ${healed} health in ${pickup.territory}.`);
    }

    return false;
  });
};

const updateEnemies = (deltaTime) => {
  const match = state.match;
  const player = match.player;

  match.enemies.forEach((enemy) => {
    if (!enemy.alive) {
      return;
    }

    const weapon = weaponCatalog[enemy.weapon];
    const desiredRange = clamp(weapon.range * 0.44, 110, 250);
    const possibleTargets = [];

    if (match.elapsed >= enemy.wakeDelay && player.health > 0) {
      possibleTargets.push({
        type: "player",
        id: player.id,
        x: player.x,
        y: player.y,
        dist: distance(enemy, player)
      });
    }

    match.enemies.forEach((otherEnemy) => {
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
      .filter((candidate) => candidate.dist <= enemy.sightRange && hasLineOfSight(enemy, candidate, match.obstacles))
      .sort((left, right) => left.dist - right.dist);

    const target = visibleTargets[0] ?? null;
    enemy.fireCooldown = Math.max(0, enemy.fireCooldown - deltaTime);

    if (!target) {
      enemy.x += Math.cos(enemy.angle + Math.PI * 0.5 * enemy.strafeSeed) * enemy.speed * 0.18 * deltaTime;
      enemy.y += Math.sin(enemy.angle + Math.PI * 0.5 * enemy.strafeSeed) * enemy.speed * 0.18 * deltaTime;
      enemy.x = clamp(enemy.x, ISLAND_BOUNDS.x + ENEMY_RADIUS, ISLAND_BOUNDS.x + ISLAND_BOUNDS.width - ENEMY_RADIUS);
      enemy.y = clamp(enemy.y, ISLAND_BOUNDS.y + ENEMY_RADIUS, ISLAND_BOUNDS.y + ISLAND_BOUNDS.height - ENEMY_RADIUS);
      resolveEntityObstacleCollision(enemy, ENEMY_RADIUS, match.obstacles);
      return;
    }

    const angleToTarget = Math.atan2(target.y - enemy.y, target.x - enemy.x);
    enemy.angle = angleToTarget;

    let moveX = 0;
    let moveY = 0;
    if (target.dist > desiredRange + 18) {
      moveX = Math.cos(angleToTarget);
      moveY = Math.sin(angleToTarget);
    } else if (target.dist < desiredRange - 42) {
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
    resolveEntityObstacleCollision(enemy, ENEMY_RADIUS, match.obstacles);

    if (target.dist < weapon.range * 0.82 && enemy.fireCooldown <= 0 && hasLineOfSight(enemy, target, match.obstacles)) {
      fireWeapon(enemy, angleToTarget, false);
    }
  });
};

const handleEnemyDeathDrop = (enemy) => {
  const match = state.match;
  const territoryName = getTerritoryAtPoint(match.mode, enemy)?.name ?? match.mode.map;

  if (Math.random() > 0.56) {
    const dropType = Math.random() > 0.5 ? "ammo" : "health";
    match.pickups.push({
      type: dropType,
      amount: dropType === "ammo" ? Math.round(randomBetween(10, 22)) : Math.round(randomBetween(18, 28)),
      territory: territoryName,
      x: enemy.x,
      y: enemy.y
    });
  }
};

const updateBullets = (deltaTime) => {
  const match = state.match;
  const player = match.player;

  match.bullets = match.bullets.filter((bullet) => {
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

    if (match.obstacles.some((obstacle) => segmentIntersectsRect(previousPoint, bullet, obstacle) || pointInsideRect(bullet, obstacle))) {
      return false;
    }

    if (bullet.fromPlayer) {
      for (const enemy of match.enemies) {
        if (!enemy.alive || distance(bullet, enemy) > ENEMY_RADIUS + bullet.radius) {
          continue;
        }

        enemy.health -= bullet.damage;

        if (enemy.health <= 0) {
          enemy.alive = false;
          match.playerElims += 1;
          match.status = `${enemy.name} down. ${match.playerElims} eliminations.`;
          writeMatchLog(`You eliminated ${enemy.name}.`);
          handleEnemyDeathDrop(enemy);
        }

        return false;
      }
    } else {
      if (distance(bullet, player) <= PLAYER_RADIUS + bullet.radius) {
        player.health = clamp(player.health - bullet.damage, 0, player.maxHealth);
        match.status = `Under fire. ${Math.max(0, Math.round(player.health))} health left.`;
        return false;
      }

      for (const enemy of match.enemies) {
        if (!enemy.alive || enemy.id === bullet.ownerId || distance(bullet, enemy) > ENEMY_RADIUS + bullet.radius) {
          continue;
        }

        enemy.health -= bullet.damage;

        if (enemy.health <= 0) {
          enemy.alive = false;
          writeMatchLog(`${enemy.name} was taken out by another AI skin.`);
          handleEnemyDeathDrop(enemy);
        }

        return false;
      }
    }

    return true;
  });
};

const updateLiveMatch = (deltaTime) => {
  const match = state.match;

  match.elapsed += deltaTime;

  movePlayer(deltaTime);
  collectPickups();
  updateEnemies(deltaTime);
  updateBullets(deltaTime);

  const territory = getTerritoryAtPoint(match.mode, match.player)?.name ?? match.mode.map;
  if (territory !== match.currentTerritory) {
    match.currentTerritory = territory;
    writeMatchLog(`You entered ${territory}.`);
  }

  if (match.player.health <= 0) {
    endMatch(false);
    return;
  }

  if (match.enemies.every((enemy) => !enemy.alive)) {
    endMatch(true);
    return;
  }

  const aliveEnemies = match.enemies.filter((enemy) => enemy.alive).length;
  const currentPlacement = aliveEnemies + 1;
  match.status = `In ${territory}. Current placement: #${currentPlacement} of 16.`;
  syncMatchUi();
};

const updateMatch = (deltaTime) => {
  if (!state.match) {
    return;
  }

  if (state.match.phase === "countdown") {
    state.match.countdown -= deltaTime;
    const count = Math.max(1, Math.ceil(state.match.countdown));
    state.match.status = `Match starts in ${count}...`;
    setOverlay("Countdown", String(count), "Get ready to drop.", true);
    syncMatchUi();

    if (state.match.countdown <= 0) {
      state.match.phase = "live";
      state.match.roundActive = true;
      state.match.status = `Match live in ${state.match.currentTerritory}.`;
      setOverlay("Live", "GO", "Clear the island and survive the AI skins.", true);
      window.setTimeout(() => {
        if (state.match?.phase === "live") {
          setOverlay("", "", "", false);
        }
      }, 700);
      writeMatchLog("The round is live.");
    }

    return;
  }

  if (state.match.phase === "live") {
    updateLiveMatch(deltaTime);
  }
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

  if (!state.match) {
    return;
  }

  state.match.mode.territories.forEach((territory) => {
    gameContext.fillStyle = territory.color;
    drawRoundedRect(gameContext, territory.x, territory.y, territory.width, territory.height, 24);
    gameContext.fill();
    gameContext.strokeStyle = "rgba(255, 255, 255, 0.1)";
    gameContext.lineWidth = 1;
    drawRoundedRect(gameContext, territory.x, territory.y, territory.width, territory.height, 24);
    gameContext.stroke();
    gameContext.fillStyle = "rgba(239, 245, 255, 0.86)";
    gameContext.font = "700 16px Space Grotesk, sans-serif";
    gameContext.textAlign = "left";
    gameContext.fillText(territory.name, territory.x + 14, territory.y + 26);
  });

  state.match.decorations.forEach((decoration) => {
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

  state.match.obstacles.forEach((obstacle) => {
    gameContext.fillStyle = obstacle.color;
    drawRoundedRect(gameContext, obstacle.x, obstacle.y, obstacle.width, obstacle.height, 14);
    gameContext.fill();
    gameContext.strokeStyle = "rgba(12, 18, 28, 0.42)";
    gameContext.lineWidth = 2;
    drawRoundedRect(gameContext, obstacle.x, obstacle.y, obstacle.width, obstacle.height, 14);
    gameContext.stroke();
  });

  state.match.pickups.forEach((pickup) => {
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
    } else if (pickup.type === "ammo") {
      gameContext.fillStyle = "#f6c945";
      drawRoundedRect(gameContext, -12, -12, 24, 24, 8);
      gameContext.fill();
      gameContext.fillStyle = "#17202e";
      gameContext.font = "700 12px Space Grotesk, sans-serif";
      gameContext.textAlign = "center";
      gameContext.fillText("A", 0, 4);
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

  state.match.bullets.forEach((bullet) => {
    gameContext.fillStyle = bullet.color;
    gameContext.beginPath();
    gameContext.arc(bullet.x, bullet.y, bullet.radius, 0, Math.PI * 2);
    gameContext.fill();
  });

  state.match.enemies.forEach((enemy) => {
    if (!enemy.alive) {
      return;
    }
    drawCharacter(gameContext, enemy, ENEMY_RADIUS, enemy.angle, enemy.palette, enemy.name, enemy.health / enemy.maxHealth);
  });

  drawCharacter(gameContext, state.match.player, PLAYER_RADIUS, state.match.player.angle, state.match.player.palette, "You", state.match.player.health / state.match.player.maxHealth);

  if (state.match.phase === "live") {
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
  if (!state.match) {
    state.loopId = null;
    state.lastFrameTime = 0;
    return;
  }

  const deltaTime = state.lastFrameTime ? Math.min((timestamp - state.lastFrameTime) / 1000, 0.033) : 0.016;
  state.lastFrameTime = timestamp;
  updateMatch(deltaTime);
  renderMatch();
  state.loopId = window.requestAnimationFrame(gameLoop);
};

const ensureGameLoop = () => {
  if (state.loopId !== null) {
    return;
  }
  state.lastFrameTime = 0;
  state.loopId = window.requestAnimationFrame(gameLoop);
};

const updatePointer = (event) => {
  const rect = gameCanvas.getBoundingClientRect();
  inputState.pointerX = clamp(((event.clientX - rect.left) / rect.width) * GAME_WIDTH, 0, GAME_WIDTH);
  inputState.pointerY = clamp(((event.clientY - rect.top) / rect.height) * GAME_HEIGHT, 0, GAME_HEIGHT);
};

tabButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveTab(button.dataset.tab));
});

restartMatchButton.addEventListener("click", () => {
  if (state.match) {
    launchMode(state.match.mode.id);
  }
});

leaveMatchButton.addEventListener("click", leaveMatch);

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
  if (state.match?.phase === "live") {
    inputState.firing = true;
  }
  gameCanvas.focus();
});

window.addEventListener("mouseup", () => {
  inputState.firing = false;
});

gameCanvas.addEventListener("mouseleave", () => {
  inputState.firing = false;
});

applyPreviewSkin();
renderAll();
renderMatch();
