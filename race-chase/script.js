const STORAGE_KEY = "race-chase-save-v1";
const MAP_WIDTH = 4200;
const MAP_HEIGHT = 2800;
const CAMERA_PADDING_X = 220;
const CAMERA_PADDING_Y = 160;

const TIER_META = {
  Common: { price: 600, topSpeed: 325, acceleration: 215, handling: 2.45, color: "#95a8ba" },
  Rare: { price: 1450, topSpeed: 355, acceleration: 235, handling: 2.62, color: "#7fd3ff" },
  Elite: { price: 3400, topSpeed: 392, acceleration: 255, handling: 2.86, color: "#b8bcff" },
  "Super Elite": { price: 6900, topSpeed: 426, acceleration: 274, handling: 3.05, color: "#ffc25f" },
  Specialist: { price: 10200, topSpeed: 458, acceleration: 292, handling: 3.2, color: "#9dfd75" },
  OG: { price: 16000, topSpeed: 495, acceleration: 314, handling: 3.32, color: "#ff7f7f" }
};

const CAR_DATA = [
  {
    id: "common-white-offroad-pickup",
    name: "White Ridge",
    tier: "Common",
    description: "A balanced starter truck with easy handling.",
    color: "#f7f8fa",
    accent: "#212a36",
    stats: { topSpeed: 0, acceleration: 0, handling: 0.02 }
  },
  {
    id: "common-blue-offroad-suv",
    name: "Blue Rambler",
    tier: "Common",
    description: "Slightly quicker off the line, a little looser in corners.",
    color: "#2d6fe3",
    accent: "#b9c7e8",
    stats: { topSpeed: 4, acceleration: 14, handling: -0.03 }
  },
  {
    id: "common-red-offroad-pickup",
    name: "Red Trail",
    tier: "Common",
    description: "A calmer pickup with steady grip for learning the roads.",
    color: "#ff4e57",
    accent: "#1d0e11",
    stats: { topSpeed: -6, acceleration: 8, handling: 0.05 }
  },
  {
    id: "rare-light-blue-vintage-truck",
    name: "Sky Hauler",
    tier: "Rare",
    description: "A stylish cruiser with solid speed once it gets moving.",
    color: "#86b5ff",
    accent: "#d8ebff",
    stats: { topSpeed: 8, acceleration: -4, handling: 0.01 }
  },
  {
    id: "rare-black-suv",
    name: "Night Runner",
    tier: "Rare",
    description: "A dark, fast SUV built for long delivery runs.",
    color: "#232830",
    accent: "#9aa4af",
    stats: { topSpeed: 10, acceleration: 4, handling: 0.02 }
  },
  {
    id: "rare-red-muscle-car",
    name: "Heatline",
    tier: "Rare",
    description: "A classic muscle feel with strong acceleration.",
    color: "#ed424f",
    accent: "#15090c",
    stats: { topSpeed: 4, acceleration: 18, handling: -0.04 }
  },
  {
    id: "rare-silver-porsche-sedan",
    name: "Silver Crest",
    tier: "Rare",
    description: "A smooth sedan that holds a line through corners.",
    color: "#c2d3df",
    accent: "#f2f8fc",
    stats: { topSpeed: 2, acceleration: 4, handling: 0.08 }
  },
  {
    id: "rare-red-hatchback",
    name: "Metro Flash",
    tier: "Rare",
    description: "Quick to react and ideal for weaving through city lanes.",
    color: "#ff6377",
    accent: "#24212f",
    stats: { topSpeed: -2, acceleration: 10, handling: 0.1 }
  },
  {
    id: "elite-dark-gray-sedan",
    name: "Iron Glide",
    tier: "Elite",
    description: "Fast enough for race money and composed on sweeping roads.",
    color: "#5f6672",
    accent: "#cad2df",
    stats: { topSpeed: 0, acceleration: 0, handling: 0.06 }
  },
  {
    id: "elite-silver-lambo",
    name: "Sterling V12",
    tier: "Elite",
    description: "A sharp supercar with a high top-end.",
    color: "#b9bec8",
    accent: "#5f6871",
    stats: { topSpeed: 18, acceleration: -2, handling: 0.03 }
  },
  {
    id: "elite-blue-future-coupe",
    name: "Nova Arc",
    tier: "Elite",
    description: "A futuristic coupe with excellent exit speed.",
    color: "#2f8df7",
    accent: "#111821",
    stats: { topSpeed: 8, acceleration: 10, handling: 0.04 }
  },
  {
    id: "elite-gray-striped-muscle",
    name: "Twin Stripe",
    tier: "Elite",
    description: "Heavy throttle muscle with plenty of straight-line punch.",
    color: "#8e939d",
    accent: "#1f2024",
    stats: { topSpeed: 12, acceleration: 14, handling: -0.03 }
  },
  {
    id: "super-elite-white-roadster",
    name: "Chrome Burst",
    tier: "Super Elite",
    description: "Wild and fast, built for rapid checkpoint splits.",
    color: "#fbf7ef",
    accent: "#d7a92d",
    stats: { topSpeed: 8, acceleration: 22, handling: 0.02 }
  },
  {
    id: "super-elite-white-lambo",
    name: "Blizzard GT",
    tier: "Super Elite",
    description: "Precise steering with plenty of pace everywhere.",
    color: "#f5f7fb",
    accent: "#7dd653",
    stats: { topSpeed: 4, acceleration: 12, handling: 0.12 }
  },
  {
    id: "super-elite-red-classic-muscle",
    name: "Scarlet Storm",
    tier: "Super Elite",
    description: "A hard-launching classic that dominates straights.",
    color: "#d43d35",
    accent: "#f8f0e2",
    stats: { topSpeed: 10, acceleration: 18, handling: -0.04 }
  },
  {
    id: "super-elite-gold-turbo-racer",
    name: "Turbo Gold",
    tier: "Super Elite",
    description: "A vintage rocket with standout top speed.",
    color: "#d9a638",
    accent: "#ffe8a6",
    stats: { topSpeed: 18, acceleration: 6, handling: -0.02 }
  },
  {
    id: "specialist-green-lambo",
    name: "Lime Apex",
    tier: "Specialist",
    description: "A specialist track monster built for elite payouts.",
    color: "#87e835",
    accent: "#0f1b0b",
    stats: { topSpeed: 12, acceleration: 14, handling: 0.16 }
  },
  {
    id: "specialist-white-hypercar",
    name: "Ivory Phantom",
    tier: "Specialist",
    description: "Explosive speed with the grip to survive it.",
    color: "#f6f3f0",
    accent: "#321414",
    stats: { topSpeed: 18, acceleration: 10, handling: 0.14 }
  },
  {
    id: "og-black-hypercar",
    name: "Shadow OG",
    tier: "OG",
    description: "The final garage flex. Massive speed, huge race upside.",
    color: "#0f1318",
    accent: "#4f5c66",
    stats: { topSpeed: 20, acceleration: 20, handling: 0.18 }
  }
];

const ROADS = [
  { x: 0, y: 980, w: MAP_WIDTH, h: 180, orientation: "horizontal" },
  { x: 0, y: 1760, w: MAP_WIDTH, h: 180, orientation: "horizontal" },
  { x: 540, y: 0, w: 180, h: MAP_HEIGHT, orientation: "vertical" },
  { x: 1460, y: 0, w: 180, h: MAP_HEIGHT, orientation: "vertical" },
  { x: 2480, y: 0, w: 180, h: MAP_HEIGHT, orientation: "vertical" },
  { x: 3460, y: 0, w: 180, h: MAP_HEIGHT, orientation: "vertical" },
  { x: 860, y: 430, w: 2200, h: 130, orientation: "horizontal" },
  { x: 1010, y: 2320, w: 1650, h: 130, orientation: "horizontal" }
];

const BLOCKS = [
  { x: 120, y: 130, w: 300, h: 240, color: "#5d7e42" },
  { x: 120, y: 520, w: 300, h: 260, color: "#3a7742" },
  { x: 210, y: 1210, w: 220, h: 360, color: "#768947" },
  { x: 830, y: 1320, w: 440, h: 240, color: "#7d5f36" },
  { x: 860, y: 610, w: 430, h: 220, color: "#3d6f89" },
  { x: 1760, y: 180, w: 520, h: 180, color: "#73603c" },
  { x: 1780, y: 610, w: 460, h: 230, color: "#3a7742" },
  { x: 1780, y: 1220, w: 470, h: 350, color: "#5d7e42" },
  { x: 1760, y: 2070, w: 470, h: 170, color: "#8d704b" },
  { x: 2780, y: 180, w: 470, h: 310, color: "#7b8c41" },
  { x: 2780, y: 1240, w: 470, h: 360, color: "#4e7b43" },
  { x: 2770, y: 2040, w: 520, h: 240, color: "#3f6886" },
  { x: 3740, y: 280, w: 240, h: 340, color: "#5f7d47" },
  { x: 3730, y: 1240, w: 260, h: 310, color: "#916c45" },
  { x: 3710, y: 2060, w: 280, h: 340, color: "#4c7d42" }
];

const DELIVERY_TARGETS = [
  { x: 640, y: 470, name: "North Garage" },
  { x: 1540, y: 420, name: "Skyline Shops" },
  { x: 2520, y: 530, name: "West Arcade" },
  { x: 3510, y: 980, name: "River Turn" },
  { x: 3510, y: 1810, name: "Palm Yard" },
  { x: 2520, y: 2400, name: "Turbo Lot" },
  { x: 1440, y: 2390, name: "Metro Hub" },
  { x: 620, y: 1760, name: "Old Depot" }
];

const RACES = [
  {
    id: "grid-sprint",
    name: "Grid Sprint",
    start: { x: 1480, y: 1070 },
    checkpoints: [
      { x: 2580, y: 1070 },
      { x: 2580, y: 1790 },
      { x: 1480, y: 1790 },
      { x: 1480, y: 1070 }
    ],
    aiRange: [26, 39],
    payoutBase: 850
  },
  {
    id: "crosstown-loop",
    name: "Crosstown Loop",
    start: { x: 550, y: 1780 },
    checkpoints: [
      { x: 550, y: 470 },
      { x: 1490, y: 470 },
      { x: 1490, y: 2390 },
      { x: 550, y: 1780 }
    ],
    aiRange: [38, 55],
    payoutBase: 1350
  },
  {
    id: "express-circuit",
    name: "Express Circuit",
    start: { x: 2480, y: 1780 },
    checkpoints: [
      { x: 3480, y: 1780 },
      { x: 3480, y: 1070 },
      { x: 2480, y: 470 },
      { x: 1460, y: 470 },
      { x: 2480, y: 1780 }
    ],
    aiRange: [44, 62],
    payoutBase: 1850
  }
];

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const moneyValue = document.getElementById("moneyValue");
const carValue = document.getElementById("carValue");
const objectiveValue = document.getElementById("objectiveValue");
const speedValue = document.getElementById("speedValue");
const raceValue = document.getElementById("raceValue");
const promptText = document.getElementById("promptText");
const menuButton = document.getElementById("menuButton");
const menuOverlay = document.getElementById("menuOverlay");
const closeMenuButton = document.getElementById("closeMenuButton");
const currentCarCard = document.getElementById("currentCarCard");
const garageList = document.getElementById("garageList");
const shopList = document.getElementById("shopList");
const shopMoneyValue = document.getElementById("shopMoneyValue");
const starterOverlay = document.getElementById("starterOverlay");
const starterGrid = document.getElementById("starterGrid");
const tabButtons = Array.from(document.querySelectorAll(".tab"));
const tabPanels = Array.from(document.querySelectorAll(".tab-panel"));

const state = {
  money: 0,
  ownedCarIds: [],
  currentCarId: null,
  starterChosen: false,
  activeDeliveryIndex: 0,
  player: {
    x: 620,
    y: 1070,
    angle: 0,
    speed: 0
  },
  camera: {
    x: 0,
    y: 0
  },
  nearbyRaceId: null,
  activeRace: null,
  lastTimestamp: 0,
  message: "Choose your first common car to start driving.",
  messageUntil: 0
};

const viewport = {
  width: window.innerWidth,
  height: window.innerHeight
};

const keyState = {
  up: false,
  down: false,
  left: false,
  right: false
};

const AI_RACER_NAMES = ["Rex", "Nova", "Blaze", "Vex", "Drift", "Echo"];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function roundedRectPath(x, y, width, height, radius) {
  const safeRadius = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + safeRadius, y);
  ctx.lineTo(x + width - safeRadius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + safeRadius);
  ctx.lineTo(x + width, y + height - safeRadius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - safeRadius, y + height);
  ctx.lineTo(x + safeRadius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - safeRadius);
  ctx.lineTo(x, y + safeRadius);
  ctx.quadraticCurveTo(x, y, x + safeRadius, y);
  ctx.closePath();
}

function distance(a, b) {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.hypot(dx, dy);
}

function angleToPoint(from, to) {
  return Math.atan2(to.y - from.y, to.x - from.x);
}

function currency(amount) {
  return `$${Math.round(amount).toLocaleString()}`;
}

function carById(carId) {
  return CAR_DATA.find((car) => car.id === carId);
}

function currentCar() {
  return carById(state.currentCarId);
}

function statBlock(car) {
  const tierStats = TIER_META[car.tier];
  return {
    topSpeed: tierStats.topSpeed + car.stats.topSpeed,
    acceleration: tierStats.acceleration + car.stats.acceleration,
    handling: tierStats.handling + car.stats.handling
  };
}

function priceForCar(car) {
  return TIER_META[car.tier].price;
}

function isOwned(carId) {
  return state.ownedCarIds.includes(carId);
}

function saveGame() {
  const payload = {
    money: state.money,
    ownedCarIds: state.ownedCarIds,
    currentCarId: state.currentCarId,
    starterChosen: state.starterChosen,
    activeDeliveryIndex: state.activeDeliveryIndex,
    player: {
      x: state.player.x,
      y: state.player.y,
      angle: state.player.angle
    }
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
}

function loadGame() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return;
  }

  try {
    const payload = JSON.parse(raw);
    state.money = Number(payload.money) || 0;
    state.ownedCarIds = Array.isArray(payload.ownedCarIds) ? payload.ownedCarIds.filter((carId) => carById(carId)) : [];
    state.currentCarId = carById(payload.currentCarId) ? payload.currentCarId : null;
    state.starterChosen = Boolean(payload.starterChosen && state.currentCarId);
    state.activeDeliveryIndex = clamp(Number(payload.activeDeliveryIndex) || 0, 0, DELIVERY_TARGETS.length - 1);

    if (payload.player) {
      state.player.x = clamp(Number(payload.player.x) || state.player.x, 0, MAP_WIDTH);
      state.player.y = clamp(Number(payload.player.y) || state.player.y, 0, MAP_HEIGHT);
      state.player.angle = Number(payload.player.angle) || 0;
    }
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }
}

function setMessage(text, duration = 2600) {
  state.message = text;
  state.messageUntil = performance.now() + duration;
}

function resetPrompt() {
  const now = performance.now();
  if (state.messageUntil > now) {
    promptText.textContent = state.message;
    return;
  }

  if (!state.starterChosen) {
    promptText.textContent = "Choose your first common car to start driving.";
    return;
  }

  if (state.activeRace) {
    const nextCheckpoint = Math.min(
      state.activeRace.playerCheckpointIndex + 1,
      state.activeRace.definition.checkpoints.length
    );
    promptText.textContent = `Race live: checkpoint ${nextCheckpoint}/${state.activeRace.definition.checkpoints.length}. Stay ahead of the AI.`;
    return;
  }

  if (state.nearbyRaceId) {
    const race = RACES.find((entry) => entry.id === state.nearbyRaceId);
    promptText.textContent = `Press E near ${race.name} to enter the race.`;
    return;
  }

  const delivery = DELIVERY_TARGETS[state.activeDeliveryIndex];
  promptText.textContent = `Cruise to ${delivery.name} for a delivery payout.`;
}

function updateHUD() {
  const car = currentCar();
  moneyValue.textContent = currency(state.money);
  shopMoneyValue.textContent = currency(state.money);
  carValue.textContent = car ? `${car.name} (${car.tier})` : "None";
  speedValue.textContent = `${Math.round(Math.abs(state.player.speed) * 0.16)} mph`;

  if (!state.starterChosen) {
    objectiveValue.textContent = "Choose a starter car";
  } else if (state.activeRace) {
    const place = state.activeRace.standings.findIndex((entry) => entry.id === "player") + 1;
    objectiveValue.textContent = `${state.activeRace.definition.name} - place #${place}`;
  } else {
    const delivery = DELIVERY_TARGETS[state.activeDeliveryIndex];
    const dist = Math.round(distance(state.player, delivery));
    objectiveValue.textContent = `${delivery.name} - ${dist}px`;
  }

  if (state.activeRace) {
    const elapsed = (performance.now() - state.activeRace.startedAt) / 1000;
    const place = state.activeRace.standings.findIndex((entry) => entry.id === "player") + 1;
    raceValue.textContent = `#${place} - ${elapsed.toFixed(1)}s`;
  } else {
    raceValue.textContent = "Not racing";
  }

  resetPrompt();
}

function tierPillHtml(tier) {
  const color = TIER_META[tier].color;
  return `<span class="tier-pill" style="background:${color}">${tier}</span>`;
}

function statMarkup(stats) {
  return `
    <div class="stat-grid">
      <div class="stat-block">
        <span>Top Speed</span>
        <strong>${Math.round(stats.topSpeed)}</strong>
      </div>
      <div class="stat-block">
        <span>Acceleration</span>
        <strong>${Math.round(stats.acceleration)}</strong>
      </div>
      <div class="stat-block">
        <span>Handling</span>
        <strong>${stats.handling.toFixed(2)}</strong>
      </div>
    </div>
  `;
}

function cardSwatch(car) {
  return `<div class="car-swatch" style="--car-color:${car.color};--car-accent:${car.accent}"></div>`;
}

function renderCurrentCarCard() {
  const car = currentCar();
  if (!car) {
    currentCarCard.innerHTML = "<p>No car selected yet.</p>";
    return;
  }

  const stats = statBlock(car);
  currentCarCard.innerHTML = `
    <div class="current-car-header">
      <div>
        <p class="eyebrow">Current Ride</p>
        <h3>${car.name}</h3>
      </div>
      ${tierPillHtml(car.tier)}
    </div>
    ${cardSwatch(car)}
    <p class="card-copy">${car.description}</p>
    ${statMarkup(stats)}
  `;
}

function renderGarage() {
  const ownedCars = CAR_DATA.filter((car) => isOwned(car.id));
  garageList.innerHTML = ownedCars
    .map((car) => {
      const equipped = car.id === state.currentCarId;
      return `
        <article class="garage-card">
          <div class="collection-card-header">
            <div>
              <h3>${car.name}</h3>
              <p class="card-copy">${car.id}</p>
            </div>
            ${tierPillHtml(car.tier)}
          </div>
          ${cardSwatch(car)}
          <p class="card-copy">${car.description}</p>
          <div class="price-row">
            <span class="price">${equipped ? "Equipped" : "Owned"}</span>
            <button class="action-button ${equipped ? "alt" : ""}" type="button" data-action="equip" data-car-id="${car.id}" ${equipped ? "disabled" : ""}>
              ${equipped ? "Current" : "Equip"}
            </button>
          </div>
        </article>
      `;
    })
    .join("");
}

function renderShop() {
  shopList.innerHTML = CAR_DATA.map((car) => {
    const owned = isOwned(car.id);
    const price = priceForCar(car);
    const affordable = state.money >= price;
    const current = car.id === state.currentCarId;

    return `
      <article class="shop-card">
        <div class="collection-card-header">
          <div>
            <h3>${car.name}</h3>
            <p class="card-copy">${car.description}</p>
          </div>
          ${tierPillHtml(car.tier)}
        </div>
        ${cardSwatch(car)}
        ${statMarkup(statBlock(car))}
        <div class="price-row">
          <span class="price">${owned ? "Owned" : currency(price)}</span>
          <button
            class="action-button ${owned ? "alt" : ""}"
            type="button"
            data-action="${owned ? "equip" : "buy"}"
            data-car-id="${car.id}"
            ${owned ? (current ? "disabled" : "") : affordable ? "" : "disabled"}
          >
            ${owned ? (current ? "Current" : "Equip") : affordable ? "Buy" : "Need Cash"}
          </button>
        </div>
      </article>
    `;
  }).join("");
}

function renderStarterChoices() {
  const starters = CAR_DATA.filter((car) => car.tier === "Common");
  starterGrid.innerHTML = starters
    .map((car) => {
      const stats = statBlock(car);
      return `
        <article class="starter-card">
          <div class="starter-card-header">
            <div>
              <h3>${car.name}</h3>
              <p class="card-copy">${car.description}</p>
            </div>
            ${tierPillHtml(car.tier)}
          </div>
          ${cardSwatch(car)}
          ${statMarkup(stats)}
          <div class="price-row">
            <span class="price">Free</span>
            <button class="action-button" type="button" data-action="starter" data-car-id="${car.id}">Start Here</button>
          </div>
        </article>
      `;
    })
    .join("");
}

function openMenu() {
  menuOverlay.classList.remove("hidden");
  menuOverlay.setAttribute("aria-hidden", "false");
  renderCurrentCarCard();
  renderGarage();
  renderShop();
}

function closeMenu() {
  menuOverlay.classList.add("hidden");
  menuOverlay.setAttribute("aria-hidden", "true");
}

function setTab(tabName) {
  tabButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.tab === tabName);
  });
  tabPanels.forEach((panel) => {
    panel.classList.toggle("active", panel.id === `tab-${tabName}`);
  });
}

function selectStarter(carId) {
  state.ownedCarIds = [carId];
  state.currentCarId = carId;
  state.starterChosen = true;
  state.money = 0;
  state.player.speed = 0;
  starterOverlay.classList.add("hidden");
  starterOverlay.setAttribute("aria-hidden", "true");
  setMessage(`${carById(carId).name} is now your starter car. Hit the road.`, 3400);
  saveGame();
  renderCurrentCarCard();
  renderGarage();
  renderShop();
}

function equipCar(carId) {
  if (!isOwned(carId)) {
    return;
  }
  state.currentCarId = carId;
  saveGame();
  renderCurrentCarCard();
  renderGarage();
  renderShop();
  setMessage(`${carById(carId).name} equipped.`, 1800);
}

function buyCar(carId) {
  const car = carById(carId);
  if (!car || isOwned(car.id)) {
    return;
  }
  const price = priceForCar(car);
  if (state.money < price) {
    return;
  }
  state.money -= price;
  state.ownedCarIds.push(car.id);
  saveGame();
  renderGarage();
  renderShop();
  updateHUD();
  setMessage(`${car.name} bought for ${currency(price)}.`, 2400);
}

function isOnRoad(point) {
  return ROADS.some((road) =>
    point.x >= road.x &&
    point.x <= road.x + road.w &&
    point.y >= road.y &&
    point.y <= road.y + road.h
  );
}

function getRaceById(raceId) {
  return RACES.find((race) => race.id === raceId);
}

function createRaceGridPositions(start, heading, count) {
  const positions = [];
  const forwardX = Math.cos(heading);
  const forwardY = Math.sin(heading);
  const sideX = -forwardY;
  const sideY = forwardX;

  for (let index = 0; index < count; index += 1) {
    const row = Math.floor(index / 2);
    const col = index % 2 === 0 ? -1 : 1;
    positions.push({
      x: start.x - forwardX * (row * 92) + sideX * (col * 44),
      y: start.y - forwardY * (row * 92) + sideY * (col * 44)
    });
  }

  return positions;
}

function createAiRacers(race, heading) {
  const availableCars = CAR_DATA.filter((car) => car.id !== state.currentCarId && car.tier !== "Common");
  const selectedCars = [...availableCars].sort(() => Math.random() - 0.5).slice(0, 3);
  const spawnPositions = createRaceGridPositions(race.start, heading, selectedCars.length + 1);

  return selectedCars.map((car, index) => {
    const stats = statBlock(car);
    return {
      id: `ai-${index + 1}`,
      driverName: AI_RACER_NAMES[(Math.floor(Math.random() * AI_RACER_NAMES.length) + index) % AI_RACER_NAMES.length],
      car,
      x: spawnPositions[index + 1].x,
      y: spawnPositions[index + 1].y,
      angle: heading,
      speed: 0,
      checkpointIndex: 0,
      finished: false,
      finishTime: null,
      laneOffset: (index - 1) * 18,
      speedBias: 0.9 + Math.random() * 0.15,
      stats: {
        topSpeed: stats.topSpeed * (0.94 + Math.random() * 0.08),
        acceleration: stats.acceleration * (0.92 + Math.random() * 0.08),
        handling: stats.handling * (0.94 + Math.random() * 0.08)
      }
    };
  });
}

function raceProgressFor(entity, race) {
  const totalCheckpoints = race.definition.checkpoints.length;
  const checkpointsCleared = Math.min(entity.checkpointIndex, totalCheckpoints);
  let progress = checkpointsCleared * 1000;

  if (entity.finished) {
    return totalCheckpoints * 1000 + 1000;
  }

  const nextCheckpoint = race.definition.checkpoints[Math.min(entity.checkpointIndex, totalCheckpoints - 1)];
  const previousPoint = entity.checkpointIndex === 0
    ? race.definition.start
    : race.definition.checkpoints[entity.checkpointIndex - 1];
  const segmentLength = Math.max(1, distance(previousPoint, nextCheckpoint));
  const remaining = distance(entity, nextCheckpoint);
  const segmentProgress = clamp(1 - remaining / segmentLength, 0, 0.999);
  return progress + segmentProgress * 1000;
}

function computeRaceStandings(race) {
  const entries = [
    {
      id: "player",
      label: currentCar() ? currentCar().name : "Player",
      checkpointIndex: race.playerCheckpointIndex,
      finished: race.playerFinished,
      finishTime: race.playerFinishTime,
      x: state.player.x,
      y: state.player.y
    },
    ...race.racers.map((racer) => ({
      id: racer.id,
      label: `${racer.driverName} - ${racer.car.name}`,
      checkpointIndex: racer.checkpointIndex,
      finished: racer.finished,
      finishTime: racer.finishTime,
      x: racer.x,
      y: racer.y
    }))
  ];

  return entries.sort((a, b) => {
    const progressDelta = raceProgressFor(b, race) - raceProgressFor(a, race);
    if (Math.abs(progressDelta) > 0.01) {
      return progressDelta;
    }
    if (a.finished && b.finished) {
      return a.finishTime - b.finishTime;
    }
    return a.id.localeCompare(b.id);
  });
}

function beginRace(race) {
  const firstCheckpoint = race.checkpoints[0];
  const heading = angleToPoint(race.start, firstCheckpoint);
  const gridPositions = createRaceGridPositions(race.start, heading, 4);

  state.player.x = gridPositions[0].x;
  state.player.y = gridPositions[0].y;
  state.player.angle = heading;
  state.activeRace = {
    definition: race,
    playerCheckpointIndex: 0,
    playerFinished: false,
    playerFinishTime: null,
    startedAt: performance.now(),
    racers: createAiRacers(race, heading),
    standings: []
  };
  state.player.speed = 0;
  state.activeRace.standings = computeRaceStandings(state.activeRace);
  setMessage(`${race.name} started. Beat the AI to the last checkpoint.`, 2600);
}

function finishRace() {
  const active = state.activeRace;
  if (!active) {
    return;
  }

  const elapsed = (performance.now() - active.startedAt) / 1000;
  const standings = computeRaceStandings(active);
  const placement = standings.findIndex((entry) => entry.id === "player") + 1;
  const payoutScale = { 1: 1.5, 2: 1.1, 3: 0.75, 4: 0.45 };
  const payout = Math.round(active.definition.payoutBase * payoutScale[placement]);

  state.money += payout;
  state.activeRace = null;
  saveGame();
  renderShop();
  updateHUD();
  setMessage(`Race finished in ${elapsed.toFixed(1)}s. You placed #${placement} and earned ${currency(payout)}.`, 4200);
}

function updateAiRace(dt) {
  const active = state.activeRace;
  if (!active) {
    return;
  }

  active.racers.forEach((racer) => {
    if (racer.finished) {
      return;
    }

    const checkpoint = active.definition.checkpoints[racer.checkpointIndex];
    const previousPoint = racer.checkpointIndex === 0
      ? active.definition.start
      : active.definition.checkpoints[racer.checkpointIndex - 1];
    const laneAngle = angleToPoint(previousPoint, checkpoint);
    const targetPoint = {
      x: checkpoint.x + -Math.sin(laneAngle) * racer.laneOffset,
      y: checkpoint.y + Math.cos(laneAngle) * racer.laneOffset
    };
    const desiredAngle = angleToPoint(racer, targetPoint);
    let delta = desiredAngle - racer.angle;

    while (delta > Math.PI) {
      delta -= Math.PI * 2;
    }
    while (delta < -Math.PI) {
      delta += Math.PI * 2;
    }

    const turnRate = racer.stats.handling * 1.1;
    racer.angle += clamp(delta, -turnRate * dt, turnRate * dt);

    const onRoad = isOnRoad(racer);
    const targetSpeed = racer.stats.topSpeed * racer.speedBias * (onRoad ? 0.98 : 0.68);
    const anglePenalty = clamp(Math.abs(delta) / 1.2, 0, 0.55);
    const adjustedTarget = targetSpeed * (1 - anglePenalty);
    if (racer.speed < adjustedTarget) {
      racer.speed = Math.min(adjustedTarget, racer.speed + racer.stats.acceleration * dt * 0.92);
    } else {
      racer.speed = Math.max(adjustedTarget, racer.speed - racer.stats.acceleration * dt * 0.75);
    }

    racer.x += Math.cos(racer.angle) * racer.speed * dt;
    racer.y += Math.sin(racer.angle) * racer.speed * dt;

    if (distance(racer, checkpoint) < 95) {
      racer.checkpointIndex += 1;
      if (racer.checkpointIndex >= active.definition.checkpoints.length) {
        racer.finished = true;
        racer.finishTime = (performance.now() - active.startedAt) / 1000;
        racer.speed = 0;
      }
    }
  });
}

function updateRaceProgress(dt) {
  const active = state.activeRace;
  if (!active) {
    return;
  }

  updateAiRace(dt);

  const checkpoint = active.definition.checkpoints[active.playerCheckpointIndex];
  if (!checkpoint) {
    return;
  }

  if (distance(state.player, checkpoint) < 110) {
    active.playerCheckpointIndex += 1;
    if (active.playerCheckpointIndex >= active.definition.checkpoints.length) {
      active.playerFinished = true;
      active.playerFinishTime = (performance.now() - active.startedAt) / 1000;
      active.standings = computeRaceStandings(active);
      finishRace();
      return;
    }
    setMessage(`Checkpoint ${active.playerCheckpointIndex} cleared.`, 1400);
  }

  active.standings = computeRaceStandings(active);
}

function updateDelivery() {
  if (!state.starterChosen || state.activeRace) {
    return;
  }

  const target = DELIVERY_TARGETS[state.activeDeliveryIndex];
  if (distance(state.player, target) < 105) {
    const nextIndex = (state.activeDeliveryIndex + 1) % DELIVERY_TARGETS.length;
    const nextTarget = DELIVERY_TARGETS[nextIndex];
    const payout = 120 + nextIndex * 15;
    state.money += payout;
    state.activeDeliveryIndex = nextIndex;
    saveGame();
    renderShop();
    updateHUD();
    setMessage(`Delivery complete at ${target.name}. Earned ${currency(payout)}. Next stop: ${nextTarget.name}.`, 3600);
  }
}

function updateNearbyRace() {
  if (state.activeRace || !state.starterChosen) {
    state.nearbyRaceId = null;
    return;
  }

  const nearby = RACES.find((race) => distance(state.player, race.start) < 120);
  state.nearbyRaceId = nearby ? nearby.id : null;
}

function handleActionKey() {
  if (!state.starterChosen || state.activeRace || !state.nearbyRaceId || !menuOverlay.classList.contains("hidden")) {
    return;
  }
  const race = getRaceById(state.nearbyRaceId);
  beginRace(race);
}

function updatePlayer(dt) {
  if (!state.starterChosen || !currentCar() || !menuOverlay.classList.contains("hidden")) {
    return;
  }

  const car = currentCar();
  const stats = statBlock(car);
  const onRoad = isOnRoad(state.player);
  const speedCap = stats.topSpeed * (onRoad ? 1 : 0.58);
  const reverseCap = 120;

  if (keyState.up) {
    state.player.speed += stats.acceleration * dt;
  } else if (keyState.down) {
    state.player.speed -= (stats.acceleration + 40) * dt;
  } else {
    const drag = onRoad ? 0.988 : 0.974;
    state.player.speed *= Math.pow(drag, dt * 60);
  }

  state.player.speed = clamp(state.player.speed, -reverseCap, speedCap);

  if (Math.abs(state.player.speed) < 2.5 && !keyState.up && !keyState.down) {
    state.player.speed = 0;
  }

  const speedRatio = Math.min(1, Math.abs(state.player.speed) / stats.topSpeed);
  const turnStrength = stats.handling * (0.25 + speedRatio * 0.95);
  if (keyState.left) {
    state.player.angle -= turnStrength * dt * (state.player.speed >= 0 ? 1 : -1);
  }
  if (keyState.right) {
    state.player.angle += turnStrength * dt * (state.player.speed >= 0 ? 1 : -1);
  }

  state.player.x += Math.cos(state.player.angle) * state.player.speed * dt;
  state.player.y += Math.sin(state.player.angle) * state.player.speed * dt;
  state.player.x = clamp(state.player.x, 40, MAP_WIDTH - 40);
  state.player.y = clamp(state.player.y, 40, MAP_HEIGHT - 40);
}

function updateCamera() {
  const screenX = state.player.x - state.camera.x;
  const screenY = state.player.y - state.camera.y;

  if (screenX < CAMERA_PADDING_X) {
    state.camera.x = state.player.x - CAMERA_PADDING_X;
  }
  if (screenX > viewport.width - CAMERA_PADDING_X) {
    state.camera.x = state.player.x - (viewport.width - CAMERA_PADDING_X);
  }
  if (screenY < CAMERA_PADDING_Y) {
    state.camera.y = state.player.y - CAMERA_PADDING_Y;
  }
  if (screenY > viewport.height - CAMERA_PADDING_Y) {
    state.camera.y = state.player.y - (viewport.height - CAMERA_PADDING_Y);
  }

  state.camera.x = clamp(state.camera.x, 0, Math.max(0, MAP_WIDTH - viewport.width));
  state.camera.y = clamp(state.camera.y, 0, Math.max(0, MAP_HEIGHT - viewport.height));
}

function drawLaneMarks(road) {
  ctx.strokeStyle = "rgba(255, 236, 124, 0.65)";
  ctx.lineWidth = 5;
  ctx.setLineDash([24, 22]);

  if (road.orientation === "horizontal") {
    const centerY = road.y + road.h / 2;
    ctx.beginPath();
    ctx.moveTo(road.x + 18, centerY);
    ctx.lineTo(road.x + road.w - 18, centerY);
    ctx.stroke();
  } else {
    const centerX = road.x + road.w / 2;
    ctx.beginPath();
    ctx.moveTo(centerX, road.y + 18);
    ctx.lineTo(centerX, road.y + road.h - 18);
    ctx.stroke();
  }

  ctx.setLineDash([]);
}

function drawTarget(target, active, label) {
  const pulse = 10 + Math.sin(performance.now() / 260) * 7;
  ctx.save();
  ctx.translate(target.x, target.y);
  ctx.strokeStyle = active ? "#68f5ff" : "rgba(255,255,255,0.45)";
  ctx.lineWidth = active ? 6 : 3;
  ctx.beginPath();
  ctx.arc(0, 0, active ? 54 + pulse : 40, 0, Math.PI * 2);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, active ? 24 : 18, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(8, 18, 27, 0.75)";
  ctx.fillRect(-68, 62, 136, 32);
  ctx.fillStyle = "#f7fbff";
  ctx.font = '700 20px "Rajdhani"';
  ctx.textAlign = "center";
  ctx.fillText(label, 0, 84);
  ctx.restore();
}

function drawRaceStart(race, active) {
  ctx.save();
  ctx.translate(race.start.x, race.start.y);
  ctx.fillStyle = active ? "rgba(255, 127, 50, 0.8)" : "rgba(255, 255, 255, 0.15)";
  ctx.strokeStyle = active ? "#ffb453" : "rgba(255,255,255,0.4)";
  ctx.lineWidth = 4;
  ctx.fillRect(-56, -28, 112, 56);
  ctx.strokeRect(-56, -28, 112, 56);
  ctx.fillStyle = "#f7fbff";
  ctx.font = '700 18px "Rajdhani"';
  ctx.textAlign = "center";
  ctx.fillText(race.name, 0, -38);
  ctx.fillText("PRESS E", 0, 8);
  ctx.restore();
}

function drawCheckpoint(checkpoint, index, activeIndex) {
  ctx.save();
  ctx.translate(checkpoint.x, checkpoint.y);
  const active = index === activeIndex;
  ctx.strokeStyle = active ? "#68f5ff" : "rgba(255, 255, 255, 0.35)";
  ctx.lineWidth = active ? 6 : 3;
  ctx.beginPath();
  ctx.arc(0, 0, active ? 78 : 58, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = "rgba(8, 18, 27, 0.72)";
  ctx.fillRect(-28, -20, 56, 40);
  ctx.fillStyle = "#f7fbff";
  ctx.font = '700 26px "Rajdhani"';
  ctx.textAlign = "center";
  ctx.fillText(String(index + 1), 0, 10);
  ctx.restore();
}

function drawCar(car, x, y, angle, scale = 1) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);
  ctx.scale(scale, scale);
  ctx.fillStyle = car.color;
  ctx.strokeStyle = "rgba(0,0,0,0.28)";
  ctx.lineWidth = 2;
  roundedRectPath(-34, -18, 68, 36, 16);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(-18, -10, 36, 20);
  ctx.fillStyle = car.accent;
  ctx.fillRect(-10, -18, 20, 36);
  ctx.fillStyle = "#111";
  ctx.fillRect(-24, -24, 12, 8);
  ctx.fillRect(12, -24, 12, 8);
  ctx.fillRect(-24, 16, 12, 8);
  ctx.fillRect(12, 16, 12, 8);
  ctx.restore();
}

function drawRacerLabel(text, x, y, highlighted = false) {
  ctx.save();
  ctx.translate(x, y);
  ctx.fillStyle = highlighted ? "rgba(255, 127, 50, 0.9)" : "rgba(8, 18, 27, 0.78)";
  ctx.fillRect(-44, -48, 88, 24);
  ctx.fillStyle = "#f7fbff";
  ctx.font = '700 16px "Rajdhani"';
  ctx.textAlign = "center";
  ctx.fillText(text, 0, -31);
  ctx.restore();
}

function drawWorld() {
  ctx.clearRect(0, 0, viewport.width, viewport.height);
  ctx.fillStyle = "#5aa648";
  ctx.fillRect(0, 0, viewport.width, viewport.height);

  ctx.save();
  ctx.translate(-state.camera.x, -state.camera.y);

  const fieldGradient = ctx.createLinearGradient(0, 0, MAP_WIDTH, MAP_HEIGHT);
  fieldGradient.addColorStop(0, "#81c95f");
  fieldGradient.addColorStop(1, "#579941");
  ctx.fillStyle = fieldGradient;
  ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

  ctx.fillStyle = "rgba(255,255,255,0.06)";
  for (let x = 0; x < MAP_WIDTH; x += 160) {
    ctx.fillRect(x, 0, 2, MAP_HEIGHT);
  }
  for (let y = 0; y < MAP_HEIGHT; y += 160) {
    ctx.fillRect(0, y, MAP_WIDTH, 2);
  }

  BLOCKS.forEach((block) => {
    ctx.fillStyle = block.color;
    ctx.fillRect(block.x, block.y, block.w, block.h);
    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(block.x + 16, block.y + 16, block.w - 32, block.h - 32);
  });

  ROADS.forEach((road) => {
    ctx.fillStyle = "#343c48";
    ctx.fillRect(road.x, road.y, road.w, road.h);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    ctx.fillRect(road.x + 8, road.y + 8, road.w - 16, road.h - 16);
    drawLaneMarks(road);
  });

  DELIVERY_TARGETS.forEach((target, index) => {
    drawTarget(target, index === state.activeDeliveryIndex && !state.activeRace, target.name);
  });

  RACES.forEach((race) => {
    const active = state.nearbyRaceId === race.id && !state.activeRace;
    drawRaceStart(race, active);
  });

  if (state.activeRace) {
    state.activeRace.definition.checkpoints.forEach((checkpoint, index) => {
      drawCheckpoint(checkpoint, index, state.activeRace.playerCheckpointIndex);
    });
  }

  if (state.activeRace) {
    state.activeRace.racers.forEach((racer, index) => {
      drawCar(racer.car, racer.x, racer.y, racer.angle, 0.94);
      drawRacerLabel(`${index + 1 < 10 ? "" : ""}${racer.driverName}`, racer.x, racer.y, false);
    });
  }

  const car = currentCar();
  if (car) {
    drawCar(car, state.player.x, state.player.y, state.player.angle);
    if (state.activeRace) {
      drawRacerLabel("YOU", state.player.x, state.player.y, true);
    }
  }

  ctx.restore();
}

function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;
  viewport.width = window.innerWidth;
  viewport.height = window.innerHeight;
  canvas.width = Math.round(viewport.width * dpr);
  canvas.height = Math.round(viewport.height * dpr);
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function gameLoop(timestamp) {
  if (!state.lastTimestamp) {
    state.lastTimestamp = timestamp;
  }
  const dt = Math.min((timestamp - state.lastTimestamp) / 1000, 0.05);
  state.lastTimestamp = timestamp;

  updatePlayer(dt);
  updateDelivery();
  updateNearbyRace();
  updateRaceProgress(dt);
  updateCamera();
  updateHUD();
  drawWorld();

  requestAnimationFrame(gameLoop);
}

function onKeyChange(code, pressed) {
  switch (code) {
    case "ArrowUp":
    case "KeyW":
      keyState.up = pressed;
      break;
    case "ArrowDown":
    case "KeyS":
      keyState.down = pressed;
      break;
    case "ArrowLeft":
    case "KeyA":
      keyState.left = pressed;
      break;
    case "ArrowRight":
    case "KeyD":
      keyState.right = pressed;
      break;
    default:
      break;
  }
}

document.addEventListener("keydown", (event) => {
  if (event.repeat) {
    return;
  }

  if (event.code === "Escape") {
    if (!menuOverlay.classList.contains("hidden")) {
      closeMenu();
    } else if (state.starterChosen) {
      openMenu();
    }
    return;
  }

  if (event.code === "KeyM" && state.starterChosen) {
    if (menuOverlay.classList.contains("hidden")) {
      openMenu();
    } else {
      closeMenu();
    }
    return;
  }

  if (event.code === "KeyE") {
    handleActionKey();
    return;
  }

  onKeyChange(event.code, true);
});

document.addEventListener("keyup", (event) => {
  onKeyChange(event.code, false);
});

menuButton.addEventListener("click", () => {
  if (!state.starterChosen) {
    return;
  }
  openMenu();
});

closeMenuButton.addEventListener("click", closeMenu);

menuOverlay.addEventListener("click", (event) => {
  if (event.target === menuOverlay) {
    closeMenu();
  }
});

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTab(button.dataset.tab);
  });
});

document.body.addEventListener("click", (event) => {
  const button = event.target.closest("[data-action]");
  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const carId = button.dataset.carId;

  if (action === "starter") {
    selectStarter(carId);
  }
  if (action === "equip") {
    equipCar(carId);
  }
  if (action === "buy") {
    buyCar(carId);
  }
});

window.addEventListener("resize", resizeCanvas);

function init() {
  loadGame();
  resizeCanvas();
  renderStarterChoices();
  renderCurrentCarCard();
  renderGarage();
  renderShop();
  updateCamera();
  updateHUD();

  if (state.starterChosen) {
    starterOverlay.classList.add("hidden");
    starterOverlay.setAttribute("aria-hidden", "true");
  } else {
    starterOverlay.classList.remove("hidden");
  }

  requestAnimationFrame(gameLoop);
}

init();
