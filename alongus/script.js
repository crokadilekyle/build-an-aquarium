const MAP_WIDTH = 3400;
const MAP_HEIGHT = 2500;
const STORAGE_KEY = "alongus-custom-v1";
const PLAYER_RADIUS = 20;
const PLAYER_SPEED = 280;
const AI_SPEED_MIN = 120;
const AI_SPEED_MAX = 170;
const KILL_DISTANCE = 36;
const KILL_SENSE_RANGE = 180;
const KILL_COOLDOWN_MIN = 3200;
const KILL_COOLDOWN_MAX = 6200;
const REPORT_DISTANCE = 74;
const CAMERA_PADDING_X = 240;
const CAMERA_PADDING_Y = 180;
const INTERACT_DISTANCE = 86;
const VISION_RADIUS = 240;
const VISION_SOFT_RADIUS = 430;
const VISION_CONE_ANGLE = Math.PI * 0.72;
const ACTIVE_TASK_TARGET = 2;
const TASK_EXERCISE_COUNT = 2;
const TASK_EXERCISE_LENGTH_MIN = 4;
const TASK_EXERCISE_LENGTH_MAX = 4;
const HOME_ROW_KEYS = ["a", "s", "d", "f", "j", "k", "l", ";"];
const TASK_REWARD_WINGS = 5;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const roomValue = document.getElementById("roomValue");
const taskValue = document.getElementById("taskValue");
const statusValue = document.getElementById("statusValue");
const currencyValue = document.getElementById("currencyValue");
const promptText = document.getElementById("promptText");
const closetButton = document.getElementById("closetButton");
const closetPanel = document.getElementById("closetPanel");
const shopButton = document.getElementById("shopButton");
const shopPanel = document.getElementById("shopPanel");
const outfitSummary = document.getElementById("outfitSummary");
const colorOptions = document.getElementById("colorOptions");
const hatOptions = document.getElementById("hatOptions");
const shopItems = document.getElementById("shopItems");
const meetingOverlay = document.getElementById("meetingOverlay");
const meetingSummary = document.getElementById("meetingSummary");
const meetingRoomValue = document.getElementById("meetingRoomValue");
const meetingReporterValue = document.getElementById("meetingReporterValue");
const meetingNote = document.getElementById("meetingNote");
const meetingCandidates = document.getElementById("meetingCandidates");
const meetingSkipButton = document.getElementById("meetingSkipButton");
const meetingContinueButton = document.getElementById("meetingContinueButton");
const taskOverlay = document.getElementById("taskOverlay");
const taskPanelTitle = document.getElementById("taskPanelTitle");
const taskPanelRoomValue = document.getElementById("taskPanelRoomValue");
const taskPanelProgressValue = document.getElementById("taskPanelProgressValue");
const taskSequenceValue = document.getElementById("taskSequenceValue");
const taskTypedValue = document.getElementById("taskTypedValue");
const taskFeedback = document.getElementById("taskFeedback");
const taskCloseButton = document.getElementById("taskCloseButton");

const COLOR_OPTIONS = [
  { id: "red", label: "Red", base: "#eb5757", accent: "#ff8980", strap: "#b9252d" },
  { id: "blue", label: "Blue", base: "#4d82f3", accent: "#88b0ff", strap: "#2145af" },
  { id: "lime", label: "Lime", base: "#89d43f", accent: "#bbf175", strap: "#4e8f1f" },
  { id: "yellow", label: "Yellow", base: "#efbf44", accent: "#ffe07d", strap: "#bb8b19" },
  { id: "pink", label: "Pink", base: "#e66bb7", accent: "#f59bd1", strap: "#af2c79" },
  { id: "black", label: "Black", base: "#303846", accent: "#576274", strap: "#131a24" },
  { id: "white", label: "White", base: "#e9eef4", accent: "#ffffff", strap: "#9ea8b5" },
  { id: "orange", label: "Orange", base: "#f08d43", accent: "#ffba77", strap: "#bb5f18" }
];

const HAT_OPTIONS = [
  { id: "none", label: "No Hat", price: 0 },
  { id: "cap", label: "Captain", price: 10 },
  { id: "beanie", label: "Beanie", price: 15 },
  { id: "plant", label: "Sprout", price: 20 },
  { id: "crown", label: "Crown", price: 30 },
  { id: "antenna", label: "Antenna", price: 25 }
];

const AI_CREWMATE_LOADOUTS = [
  { name: "Bricko", colorId: "blue", hatId: "cap", startNodeId: "nav" },
  { name: "Minty", colorId: "lime", hatId: "plant", startNodeId: "storage" },
  { name: "Dot", colorId: "pink", hatId: "beanie", startNodeId: "medbay" },
  { name: "Buzz", colorId: "yellow", hatId: "antenna", startNodeId: "shields" }
];

const NAV_NODES = [
  { id: "cafeteria", x: 560, y: 380, links: ["medbay", "weapons"] },
  { id: "medbay", x: 390, y: 900, links: ["cafeteria", "upper-hall"] },
  { id: "upper-engine", x: 410, y: 1260, links: ["upper-hall", "reactor"] },
  { id: "reactor", x: 430, y: 1670, links: ["upper-engine", "lower-engine"] },
  { id: "lower-engine", x: 420, y: 2120, links: ["reactor", "electrical"] },
  { id: "upper-hall", x: 680, y: 1370, links: ["medbay", "upper-engine", "security", "storage"] },
  { id: "security", x: 860, y: 1350, links: ["upper-hall"] },
  { id: "storage", x: 1560, y: 1760, links: ["upper-hall", "admin", "electrical", "communications"] },
  { id: "admin", x: 1600, y: 1110, links: ["storage", "weapons", "shields"] },
  { id: "weapons", x: 1470, y: 340, links: ["cafeteria", "admin", "o2"] },
  { id: "o2", x: 1970, y: 480, links: ["weapons", "nav"] },
  { id: "nav", x: 2730, y: 390, links: ["o2", "shields"] },
  { id: "shields", x: 2520, y: 1030, links: ["nav", "admin", "communications"] },
  { id: "communications", x: 2140, y: 1490, links: ["shields", "storage"] },
  { id: "electrical", x: 1100, y: 2020, links: ["lower-engine", "storage"] }
];

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

const rooms = [
  { id: "cafeteria", label: "Mess Hall", x: 180, y: 120, w: 780, h: 520, color: "#2b4863" },
  { id: "medbay", label: "Med Bay", x: 210, y: 770, w: 360, h: 260, color: "#32596e" },
  { id: "upper-engine", label: "Upper Engine", x: 200, y: 1130, w: 420, h: 280, color: "#563b59" },
  { id: "reactor", label: "Reactor", x: 180, y: 1510, w: 470, h: 330, color: "#5c3c4c" },
  { id: "lower-engine", label: "Lower Engine", x: 200, y: 1960, w: 420, h: 300, color: "#56434f" },
  { id: "security", label: "Security", x: 720, y: 1230, w: 280, h: 240, color: "#39506d" },
  { id: "electrical", label: "Electrical", x: 930, y: 1860, w: 340, h: 320, color: "#4b3f28" },
  { id: "storage", label: "Storage", x: 1180, y: 1360, w: 760, h: 800, color: "#5f523f" },
  { id: "admin", label: "Admin", x: 1410, y: 980, w: 390, h: 260, color: "#3a5165" },
  { id: "weapons", label: "Weapons", x: 1230, y: 180, w: 480, h: 320, color: "#35556f" },
  { id: "o2", label: "O2", x: 1850, y: 380, w: 260, h: 220, color: "#305b5e" },
  { id: "navigation", label: "Navigation", x: 2220, y: 180, w: 930, h: 430, color: "#3d466b" },
  { id: "shields", label: "Shields", x: 2200, y: 860, w: 700, h: 340, color: "#53416b" },
  { id: "communications", label: "Comms", x: 1960, y: 1360, w: 340, h: 260, color: "#4f4758" }
];

const corridors = [
  { x: 570, y: 610, w: 120, h: 530 },
  { x: 570, y: 1410, w: 120, h: 550 },
  { x: 620, y: 1310, w: 120, h: 120 },
  { x: 620, y: 2010, w: 580, h: 120 },
  { x: 620, y: 1330, w: 560, h: 120 },
  { x: 1180, y: 1110, w: 120, h: 310 },
  { x: 960, y: 290, w: 300, h: 120 },
  { x: 1710, y: 290, w: 520, h: 120 },
  { x: 1980, y: 410, w: 120, h: 490 },
  { x: 1800, y: 1030, w: 410, h: 120 },
  { x: 2430, y: 610, w: 120, h: 260 },
  { x: 2430, y: 1200, w: 120, h: 180 },
  { x: 2280, y: 1440, w: 120, h: 470 },
  { x: 1940, y: 1910, w: 340, h: 120 },
  { x: 1290, y: 860, w: 120, h: 250 },
  { x: 1800, y: 1500, w: 180, h: 120 }
];

const walkableZones = [
  ...rooms.map((room) => ({ x: room.x, y: room.y, w: room.w, h: room.h })),
  ...corridors
];

const TASK_STATION_BLUEPRINTS = [
  { stationId: "cafeteria-main", label: "Boot ship systems", roomId: "cafeteria", x: 760, y: 350 },
  { stationId: "medbay-scan", label: "Run med scanner", roomId: "medbay", x: 390, y: 900 },
  { stationId: "upper-engine-coils", label: "Tune engine coils", roomId: "upper-engine", x: 520, y: 1270 },
  { stationId: "reactor-core", label: "Stabilize reactor core", roomId: "reactor", x: 530, y: 1670 },
  { stationId: "lower-engine-coolant", label: "Prime coolant feed", roomId: "lower-engine", x: 500, y: 2120 },
  { stationId: "security-feeds", label: "Sync security feeds", roomId: "security", x: 860, y: 1350 },
  { stationId: "electrical-breakers", label: "Reset breaker bank", roomId: "electrical", x: 1110, y: 2020 },
  { stationId: "storage-logs", label: "Sort cargo logs", roomId: "storage", x: 1710, y: 1520 },
  { stationId: "admin-ledger", label: "Update admin ledger", roomId: "admin", x: 1660, y: 1100 },
  { stationId: "weapons-targeting", label: "Tune targeting grid", roomId: "weapons", x: 1450, y: 340 },
  { stationId: "o2-filters", label: "Flush O2 filters", roomId: "o2", x: 1980, y: 500 },
  { stationId: "nav-charts", label: "Align star charts", roomId: "navigation", x: 2860, y: 350 },
  { stationId: "shields-tiles", label: "Calibrate shield tiles", roomId: "shields", x: 2520, y: 1030 },
  { stationId: "comms-relay", label: "Patch comms relay", roomId: "communications", x: 2130, y: 1480 }
];

const state = {
  player: {
    x: 520,
    y: 330,
    facing: 0,
    colorId: "red",
    hatId: "none"
  },
  camera: {
    x: 0,
    y: 0
  },
  activeTasks: [],
  completedTaskCount: 0,
  wings: 0,
  nextTaskId: 1,
  taskModal: {
    open: false,
    completed: false,
    taskId: null,
    label: "",
    roomLabel: "",
    exercises: [],
    exerciseIndex: 0,
    charIndex: 0,
    typed: "",
    message: "Type the highlighted sequence to begin.",
    tone: "info"
  },
  status: "Exploring",
  prompt: "Move with WASD or arrows. Press E near glowing stations.",
  closetOpen: false,
  shopOpen: false,
  playerRole: "crew",
  playerKillCooldownUntil: 0,
  playerAlive: true,
  bodies: [],
  nearbyBodyId: null,
  meeting: null,
  ownedHatIds: ["none"],
  crewmates: [],
  lastTimestamp: 0
};

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
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function colorById(colorId) {
  return COLOR_OPTIONS.find((option) => option.id === colorId) || COLOR_OPTIONS[0];
}

function hatById(hatId) {
  return HAT_OPTIONS.find((option) => option.id === hatId) || HAT_OPTIONS[0];
}

function hasColorId(colorId) {
  return COLOR_OPTIONS.some((option) => option.id === colorId);
}

function hasHatId(hatId) {
  return HAT_OPTIONS.some((option) => option.id === hatId);
}

function hasOwnedHat(hatId) {
  return state.ownedHatIds.includes(hatId);
}

function angleDifference(a, b) {
  return Math.abs(Math.atan2(Math.sin(a - b), Math.cos(a - b)));
}

function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function navNodeById(nodeId) {
  return NAV_NODES.find((node) => node.id === nodeId) || null;
}

function crewmateById(crewmateId) {
  return state.crewmates.find((crewmate) => crewmate.id === crewmateId) || null;
}

function buildNodePath(startNodeId, endNodeId) {
  if (startNodeId === endNodeId) {
    return [startNodeId];
  }

  const queue = [[startNodeId]];
  const visited = new Set([startNodeId]);

  while (queue.length) {
    const path = queue.shift();
    const currentId = path[path.length - 1];
    const currentNode = navNodeById(currentId);

    if (!currentNode) {
      continue;
    }

    for (const neighborId of currentNode.links) {
      if (visited.has(neighborId)) {
        continue;
      }

      const nextPath = [...path, neighborId];
      if (neighborId === endNodeId) {
        return nextPath;
      }

      visited.add(neighborId);
      queue.push(nextPath);
    }
  }

  return [startNodeId];
}

function createCrewmates() {
  return AI_CREWMATE_LOADOUTS.map((loadout, index) => {
    const startNode = navNodeById(loadout.startNodeId);
    return {
      id: `ai-${index + 1}`,
      name: loadout.name,
      colorId: loadout.colorId,
      hatId: loadout.hatId,
      role: "crew",
      alive: true,
      x: startNode.x,
      y: startNode.y,
      facing: 0,
      speed: randomRange(AI_SPEED_MIN, AI_SPEED_MAX),
      currentNodeId: startNode.id,
      pathNodeIds: [startNode.id],
      pathIndex: 0,
      pauseUntil: 0,
      killCooldownUntil: performance.now() + randomRange(KILL_COOLDOWN_MIN * 0.5, KILL_COOLDOWN_MAX * 0.7)
    };
  });
}

function livingCrewCount() {
  let total = state.playerAlive && state.playerRole === "crew" ? 1 : 0;
  state.crewmates.forEach((crewmate) => {
    if (crewmate.alive && crewmate.role === "crew") {
      total += 1;
    }
  });
  return total;
}

function assignRoundRoles() {
  state.playerRole = "crew";
  state.playerKillCooldownUntil = 0;

  state.crewmates.forEach((crewmate) => {
    crewmate.role = "crew";
    crewmate.killCooldownUntil = Number.POSITIVE_INFINITY;
  });
}

function getRoomAtPoint(x, y) {
  return rooms.find((room) =>
    x >= room.x &&
    x <= room.x + room.w &&
    y >= room.y &&
    y <= room.y + room.h
  );
}

function isMeetingOpen() {
  return Boolean(state.meeting);
}

function isTaskModalOpen() {
  return state.taskModal.open;
}

function isWalkablePoint(x, y) {
  return walkableZones.some((zone) =>
    x >= zone.x &&
    x <= zone.x + zone.w &&
    y >= zone.y &&
    y <= zone.y + zone.h
  );
}

function updatePrompt(text) {
  state.prompt = text;
  promptText.textContent = text;
}

function clearMovementKeys() {
  keyState.up = false;
  keyState.down = false;
  keyState.left = false;
  keyState.right = false;
}

function roomNameForTask(task) {
  const room = rooms.find((entry) => entry.id === task.roomId);
  return room ? room.label : "the next room";
}

function randomHomeRowExercise() {
  const length = Math.floor(randomRange(TASK_EXERCISE_LENGTH_MIN, TASK_EXERCISE_LENGTH_MAX + 1));
  let exercise = "";

  for (let index = 0; index < length; index += 1) {
    exercise += sample(HOME_ROW_KEYS);
  }

  return exercise;
}

function buildTaskExercises() {
  return Array.from({ length: TASK_EXERCISE_COUNT }, () => randomHomeRowExercise());
}

function nextTaskBlueprint() {
  const activeStationIds = new Set(state.activeTasks.map((task) => task.stationId));
  const availableStations = TASK_STATION_BLUEPRINTS.filter((blueprint) => !activeStationIds.has(blueprint.stationId));
  return availableStations.length ? sample(availableStations) : null;
}

function spawnTaskStation() {
  const blueprint = nextTaskBlueprint();
  if (!blueprint) {
    return;
  }

  state.activeTasks.push({
    ...blueprint,
    id: `task-${state.nextTaskId}`,
    exercises: buildTaskExercises()
  });
  state.nextTaskId += 1;
}

function fillActiveTasks() {
  while (state.activeTasks.length < ACTIVE_TASK_TARGET) {
    const beforeCount = state.activeTasks.length;
    spawnTaskStation();
    if (state.activeTasks.length === beforeCount) {
      break;
    }
  }
}

function nearestTask(maxDistance = Number.POSITIVE_INFINITY) {
  let closestTask = null;
  let closestDistance = maxDistance;

  state.activeTasks.forEach((task) => {
    const taskDistance = distance(state.player, task);
    if (taskDistance < closestDistance) {
      closestTask = task;
      closestDistance = taskDistance;
    }
  });

  return closestTask;
}

function currentExercise() {
  return state.taskModal.exercises[state.taskModal.exerciseIndex] || "";
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function renderTaskOverlay() {
  taskOverlay.classList.toggle("hidden", !state.taskModal.open);
  taskOverlay.setAttribute("aria-hidden", String(!state.taskModal.open));

  if (!state.taskModal.open) {
    return;
  }

  taskPanelTitle.textContent = state.taskModal.label;
  taskPanelRoomValue.textContent = state.taskModal.roomLabel;
  taskPanelProgressValue.textContent = `${state.taskModal.exerciseIndex + 1} / ${state.taskModal.exercises.length}`;
  taskCloseButton.classList.toggle("hidden", !state.taskModal.completed);

  const exercise = currentExercise();
  taskSequenceValue.innerHTML = exercise
    .split("")
    .map((char, index) => {
      let className = "task-sequence-char";
      if (index < state.taskModal.charIndex || state.taskModal.completed) {
        className += " done";
      } else if (index === state.taskModal.charIndex) {
        className += " current";
      }
      return `<span class="${className}">${escapeHtml(char)}</span>`;
    })
    .join("");

  taskTypedValue.textContent = state.taskModal.typed || "Start typing...";
  taskTypedValue.classList.toggle("placeholder", !state.taskModal.typed);
  taskFeedback.textContent = state.taskModal.message;
  taskFeedback.classList.remove("error", "success");
  if (state.taskModal.tone === "error") {
    taskFeedback.classList.add("error");
  } else if (state.taskModal.tone === "success") {
    taskFeedback.classList.add("success");
  }
}

function openTaskModal(task) {
  clearMovementKeys();
  state.taskModal = {
    open: true,
    completed: false,
    taskId: task.id,
    label: task.label,
    roomLabel: roomNameForTask(task),
    exercises: task.exercises,
    exerciseIndex: 0,
    charIndex: 0,
    typed: "",
    message: "Type the highlighted sequence to begin.",
    tone: "info"
  };
  state.status = "Typing";
  updatePrompt(`Typing task open: ${task.label}. One wrong key restarts only the current line.`);
  renderTaskOverlay();
}

function finishTaskModal() {
  state.activeTasks = state.activeTasks.filter((task) => task.id !== state.taskModal.taskId);
  state.completedTaskCount += 1;
  state.wings += TASK_REWARD_WINGS;
  saveCustomization();
  renderShopOptions();
  fillActiveTasks();

  state.taskModal.completed = true;
  state.taskModal.message = `Task complete. +${TASK_REWARD_WINGS} chickin wings. Click X to close it out.`;
  state.taskModal.tone = "success";
  state.status = "Task complete";
  updatePrompt(`Task complete. +${TASK_REWARD_WINGS} chickin wings for the shop. Close the panel, then head to another glowing station.`);
  renderTaskOverlay();
}

function resetTaskDrill() {
  state.taskModal.charIndex = 0;
  state.taskModal.typed = "";
  state.taskModal.message = "Wrong key. Restarting this line.";
  state.taskModal.tone = "error";
  state.status = "Retry";
  updatePrompt("Wrong key. Retry the current typing line.");
  renderTaskOverlay();
}

function advanceTaskDrill() {
  const exercise = currentExercise();
  state.taskModal.typed = exercise;

  if (state.taskModal.exerciseIndex >= state.taskModal.exercises.length - 1) {
    finishTaskModal();
    return;
  }

  state.taskModal.exerciseIndex += 1;
  state.taskModal.charIndex = 0;
  state.taskModal.typed = "";
  state.taskModal.message = "Line cleared. Keep going.";
  state.taskModal.tone = "info";
  renderTaskOverlay();
}

function closeTaskModal() {
  if (!state.taskModal.open || !state.taskModal.completed) {
    return;
  }

  state.taskModal = {
    open: false,
    completed: false,
    taskId: null,
    label: "",
    roomLabel: "",
    exercises: [],
    exerciseIndex: 0,
    charIndex: 0,
    typed: "",
    message: "Type the highlighted sequence to begin.",
    tone: "info"
  };
  state.status = "Exploring";
  renderTaskOverlay();
}

function handleTaskKeydown(event) {
  if (!state.taskModal.open) {
    return false;
  }

  if (state.taskModal.completed) {
    if (event.code === "Escape" || event.code === "Enter" || event.code === "Space") {
      event.preventDefault();
      closeTaskModal();
    }
    return true;
  }

  if (event.key.length !== 1) {
    event.preventDefault();
    return true;
  }

  const typedKey = event.key.toLowerCase();
  event.preventDefault();

  if (!HOME_ROW_KEYS.includes(typedKey)) {
    resetTaskDrill();
    return true;
  }

  const exercise = currentExercise();
  const expectedKey = exercise[state.taskModal.charIndex];

  if (typedKey !== expectedKey) {
    resetTaskDrill();
    return true;
  }

  state.taskModal.typed += typedKey;
  state.taskModal.charIndex += 1;
  state.taskModal.message = "Keep the rhythm.";
  state.taskModal.tone = "info";

  if (state.taskModal.charIndex >= exercise.length) {
    advanceTaskDrill();
    return true;
  }

  renderTaskOverlay();
  return true;
}

function saveCustomization() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      colorId: state.player.colorId,
      hatId: state.player.hatId,
      wings: state.wings,
      ownedHatIds: state.ownedHatIds
    })
  );
}

function loadCustomization() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    return;
  }

  try {
    const payload = JSON.parse(raw);
    if (hasColorId(payload.colorId)) {
      state.player.colorId = payload.colorId;
    }
    if (hasHatId(payload.hatId)) {
      state.player.hatId = payload.hatId;
    }
    if (typeof payload.wings === "number" && Number.isFinite(payload.wings)) {
      state.wings = Math.max(0, Math.floor(payload.wings));
    }
    if (Array.isArray(payload.ownedHatIds)) {
      const ownedHatIds = payload.ownedHatIds.filter((hatId) => hasHatId(hatId));
      state.ownedHatIds = Array.from(new Set(["none", ...ownedHatIds]));
    }
  } catch (error) {
    localStorage.removeItem(STORAGE_KEY);
  }

  if (!hasOwnedHat(state.player.hatId)) {
    state.player.hatId = "none";
  }
}

function updateOutfitSummary() {
  const color = colorById(state.player.colorId);
  const hat = hatById(state.player.hatId);
  outfitSummary.textContent = `${color.label} • ${hat.label}`;
}

function renderCustomizationOptions() {
  colorOptions.innerHTML = COLOR_OPTIONS.map((option) => `
    <button
      class="swatch-option ${option.id === state.player.colorId ? "active" : ""}"
      type="button"
      data-color-id="${option.id}"
      aria-label="${option.label}"
      title="${option.label}"
      style="--swatch-base:${option.base};--swatch-accent:${option.accent};"
    ></button>
  `).join("");

  hatOptions.innerHTML = HAT_OPTIONS.filter((option) => hasOwnedHat(option.id)).map((option) => `
    <button
      class="hat-option ${option.id === state.player.hatId ? "active" : ""}"
      type="button"
      data-hat-id="${option.id}"
    >${option.label}</button>
  `).join("");

  updateOutfitSummary();
}

function toggleCloset(forceOpen) {
  state.closetOpen = typeof forceOpen === "boolean" ? forceOpen : !state.closetOpen;
  if (state.closetOpen) {
    state.shopOpen = false;
  }
  closetPanel.classList.toggle("hidden", !state.closetOpen);
  shopPanel.classList.add("hidden");
  closetButton.textContent = state.closetOpen ? "Hide Closet" : "Customize";
  shopButton.textContent = "Shop";
}

function renderShopOptions() {
  shopItems.innerHTML = HAT_OPTIONS.map((option) => {
    const owned = hasOwnedHat(option.id);
    const equipped = state.player.hatId === option.id;
    const affordable = state.wings >= option.price;
    const metaText = owned
      ? equipped
        ? "Owned • Equipped"
        : "Owned"
      : `${option.price} chickin wings`;

    let buttonLabel = "Buy";
    let buttonClass = "";
    let disabled = false;

    if (equipped) {
      buttonLabel = "Equipped";
      buttonClass = "equipped";
      disabled = true;
    } else if (owned) {
      buttonLabel = "Equip";
      buttonClass = "owned";
    } else if (!affordable) {
      buttonLabel = `Need ${option.price}`;
      disabled = true;
    } else {
      buttonLabel = `Buy ${option.price}`;
    }

    return `
      <article class="shop-item">
        <div class="shop-item-main">
          <strong class="shop-item-name">${option.label}</strong>
          <span class="shop-item-meta">${metaText}</span>
        </div>
        <button
          class="shop-buy-button ${buttonClass}"
          type="button"
          data-shop-hat-id="${option.id}"
          ${disabled ? "disabled" : ""}
        >${buttonLabel}</button>
      </article>
    `;
  }).join("");
}

function toggleShop(forceOpen) {
  state.shopOpen = typeof forceOpen === "boolean" ? forceOpen : !state.shopOpen;
  if (state.shopOpen) {
    state.closetOpen = false;
    renderShopOptions();
  }
  shopPanel.classList.toggle("hidden", !state.shopOpen);
  closetPanel.classList.add("hidden");
  shopButton.textContent = state.shopOpen ? "Hide Shop" : "Shop";
  closetButton.textContent = "Customize";
}

function applyColor(colorId) {
  state.player.colorId = colorId;
  saveCustomization();
  renderCustomizationOptions();
}

function applyHat(hatId) {
  if (!hasOwnedHat(hatId)) {
    return;
  }
  state.player.hatId = hatId;
  saveCustomization();
  renderCustomizationOptions();
  renderShopOptions();
}

function buyHat(hatId) {
  const hat = hatById(hatId);
  if (!hat || hasOwnedHat(hat.id) || state.wings < hat.price) {
    return;
  }

  state.wings -= hat.price;
  state.ownedHatIds.push(hat.id);
  state.player.hatId = hat.id;
  saveCustomization();
  renderCustomizationOptions();
  renderShopOptions();
  updatePrompt(`Bought ${hat.label} for ${hat.price} chickin wings and equipped it.`);
}

function isPointVisible(point) {
  const dx = point.x - state.player.x;
  const dy = point.y - state.player.y;
  const pointDistance = Math.hypot(dx, dy);

  if (pointDistance <= VISION_RADIUS * 0.8) {
    return true;
  }

  if (pointDistance > VISION_SOFT_RADIUS) {
    return false;
  }

  const pointAngle = Math.atan2(dy, dx);
  return angleDifference(pointAngle, state.player.facing) <= VISION_CONE_ANGLE / 2;
}

function assignCrewmateRoute(crewmate) {
  const currentNodeId = crewmate.currentNodeId || sample(NAV_NODES).id;
  const possibleTargets = NAV_NODES.filter((node) => node.id !== currentNodeId);
  const destination = sample(possibleTargets);
  const pathNodeIds = buildNodePath(currentNodeId, destination.id);

  crewmate.pathNodeIds = pathNodeIds;
  crewmate.pathIndex = 1;
}

function getNearbyReportableBody() {
  return state.bodies.find((body) => !body.reported && distance(state.player, body) <= REPORT_DISTANCE) || null;
}

function getNearbyPlayerKillTarget() {
  if (!state.playerAlive || state.playerRole !== "killer") {
    return null;
  }

  const candidates = state.crewmates.filter((crewmate) => crewmate.alive && crewmate.role === "crew");
  let bestTarget = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  candidates.forEach((candidate) => {
    const candidateDistance = distance(state.player, candidate);
    if (candidateDistance > KILL_DISTANCE * 1.3 || candidateDistance >= bestDistance) {
      return;
    }
    if (!canDirectChase(state.player, candidate)) {
      return;
    }
    bestTarget = candidate;
    bestDistance = candidateDistance;
  });

  return bestTarget;
}

function meetingParticipantName(participantId) {
  if (participantId === "player") {
    return "You";
  }

  if (participantId === "skip") {
    return "Skip";
  }

  const crewmate = crewmateById(participantId);
  return crewmate ? crewmate.name : "Unknown";
}

function getMeetingParticipants() {
  const participants = [];

  if (state.playerAlive) {
    participants.push({
      id: "player",
      name: "You",
      colorId: state.player.colorId,
      hatId: state.player.hatId,
      isPlayer: true
    });
  }

  state.crewmates.forEach((crewmate) => {
    if (!crewmate.alive) {
      return;
    }

    participants.push({
      id: crewmate.id,
      name: crewmate.name,
      colorId: crewmate.colorId,
      hatId: crewmate.hatId,
      isPlayer: false
    });
  });

  return participants;
}

function renderMeeting() {
  if (!state.meeting) {
    return;
  }

  meetingSummary.textContent = `${state.meeting.victimName} was found down on the ship.`;
  meetingRoomValue.textContent = state.meeting.roomLabel;
  meetingReporterValue.textContent = state.meeting.reporterName;

  if (state.meeting.phase === "voting") {
    meetingNote.textContent = "Vote for who you think did it. The crew will vote once you lock in your choice.";
    meetingSkipButton.classList.remove("hidden");
    meetingContinueButton.classList.add("hidden");
  } else {
    meetingNote.textContent = state.meeting.resultText;
    meetingSkipButton.classList.add("hidden");
    meetingContinueButton.classList.remove("hidden");
  }

  meetingCandidates.innerHTML = state.meeting.participants.map((participant) => {
    const color = colorById(participant.colorId);
    const voteCount = state.meeting.phase === "resolved" ? state.meeting.tally[participant.id] || 0 : 0;
    const metaText = state.meeting.phase === "resolved"
      ? `${voteCount} vote${voteCount === 1 ? "" : "s"}`
      : participant.isPlayer
        ? "You"
        : "Crewmate";

    return `
      <article class="meeting-candidate">
        <span class="meeting-avatar" style="--avatar-color:${color.base}"></span>
        <div class="meeting-person">
          <strong class="meeting-name">${participant.name}</strong>
          <span class="meeting-meta">${metaText}</span>
        </div>
        <button
          class="vote-chip"
          type="button"
          data-vote-id="${participant.id}"
          ${state.meeting.phase === "resolved" ? "disabled" : ""}
        >
          ${state.meeting.phase === "resolved"
            ? state.meeting.ejectedId === participant.id
              ? "Ejected"
              : "Voted"
            : "Vote"}
        </button>
      </article>
    `;
  }).join("");
}

function openMeeting(body) {
  const room = getRoomAtPoint(body.x, body.y);
  const participants = getMeetingParticipants();

  state.meeting = {
    bodyId: body.id,
    roomLabel: room ? room.label : "Hallway",
    victimName: body.name,
    reporterName: "You",
    participants,
    phase: "voting",
    playerVote: null,
    tally: {},
    ejectedId: null,
    resultText: "",
    resultStatus: "Exploring",
    followupPrompt: "Meeting over. Keep moving and watch the crew."
  };

  clearMovementKeys();
  state.status = "Meeting";
  updatePrompt("Body reported. Vote for who you think is the killer.");
  renderMeeting();
  meetingOverlay.classList.remove("hidden");
  meetingOverlay.setAttribute("aria-hidden", "false");
}

function closeMeeting() {
  if (!state.meeting || state.meeting.phase !== "resolved") {
    return;
  }

  state.bodies = state.bodies.filter((body) => body.id !== state.meeting.bodyId);
  const nextStatus = state.meeting.resultStatus;
  const nextPrompt = state.meeting.followupPrompt;
  state.meeting = null;
  state.nearbyBodyId = null;
  meetingOverlay.classList.add("hidden");
  meetingOverlay.setAttribute("aria-hidden", "true");
  state.status = nextStatus;
  updatePrompt(nextPrompt);
}

function finishRound(status, prompt) {
  state.status = status;
  updatePrompt(prompt);
  clearMovementKeys();
}

function resolveMeeting() {
  const tally = { skip: 0 };
  const participants = state.meeting.participants;
  const validVoteTargets = participants.map((participant) => participant.id);

  tally[state.meeting.playerVote] = (tally[state.meeting.playerVote] || 0) + 1;

  state.crewmates.forEach((crewmate) => {
    if (!crewmate.alive) {
      return;
    }

    const votePool = validVoteTargets.filter((participantId) => participantId !== crewmate.id);
    let voteId = "skip";

    if (crewmate.role === "killer") {
      const targetPool = votePool.filter((participantId) => participantId !== "skip");
      voteId = sample(targetPool.length ? targetPool : ["skip"]);
    } else if (Math.random() > 0.22) {
      voteId = sample(votePool.length ? votePool : ["skip"]);
    }

    tally[voteId] = (tally[voteId] || 0) + 1;
  });

  let highestVote = -1;
  let winners = [];

  Object.entries(tally).forEach(([voteId, voteCount]) => {
    if (voteCount > highestVote) {
      highestVote = voteCount;
      winners = [voteId];
      return;
    }

    if (voteCount === highestVote) {
      winners.push(voteId);
    }
  });

  let ejectedId = null;
  let resultText = "The vote tied. Nobody was ejected.";
  let resultStatus = state.playerAlive ? "Exploring" : "Dead";
  let followupPrompt = state.playerAlive ? "Meeting over. Keep moving and watch the crew." : "You are dead.";

  if (winners.length === 1 && winners[0] === "skip") {
    resultText = "The crew skipped. Nobody was ejected.";
  } else if (winners.length === 1) {
    ejectedId = winners[0];
    const ejectedName = meetingParticipantName(ejectedId);
    const ejectedCrewmate = crewmateById(ejectedId);
    const ejectedRole = ejectedId === "player" ? state.playerRole : ejectedCrewmate?.role;

    if (ejectedId === "player") {
      state.playerAlive = false;
      clearMovementKeys();
    } else if (ejectedCrewmate) {
      ejectedCrewmate.alive = false;
    }

    if (ejectedRole === "killer") {
      resultText = `${ejectedName} was ejected. The killer is gone.`;
      resultStatus = "Victory";
      followupPrompt = ejectedId === "player"
        ? "You were ejected as the impostor. The crew wins the round."
        : "The crew ejected the killer. You win the round.";
    } else {
      resultText = `${ejectedName} was ejected. They were not the killer.`;
      if (ejectedId === "player") {
        resultStatus = state.playerRole === "killer" ? "Defeat" : "Dead";
        followupPrompt = state.playerRole === "killer"
          ? "You were ejected as the impostor. The round is over."
          : "You were voted out. The round continues without you.";
      } else if (state.playerRole === "killer" && !state.playerAlive) {
        resultStatus = "Defeat";
        followupPrompt = "The crew removed you from the round.";
      }
    }
  }

  state.meeting.phase = "resolved";
  state.meeting.tally = tally;
  state.meeting.ejectedId = ejectedId;
  state.meeting.resultText = resultText;
  state.meeting.resultStatus = resultStatus;
  state.meeting.followupPrompt = !state.playerAlive && !ejectedId && state.playerRole !== "killer"
    ? "Meeting over. You remain dead."
    : followupPrompt;

  renderMeeting();
}

function castPlayerVote(voteId) {
  if (!state.meeting || state.meeting.phase !== "voting") {
    return;
  }

  state.meeting.playerVote = voteId;
  resolveMeeting();
}

function handleReport() {
  if (!state.playerAlive || isMeetingOpen()) {
    return;
  }

  const body = getNearbyReportableBody();
  if (!body) {
    return;
  }

  body.reported = true;
  openMeeting(body);
}

function handleKill() {
  if (!state.playerAlive || isMeetingOpen() || state.playerRole !== "killer") {
    return;
  }

  const now = performance.now();
  if (now < state.playerKillCooldownUntil) {
    return;
  }

  const target = getNearbyPlayerKillTarget();
  if (!target) {
    return;
  }

  killVictim(state.player, target, now);
  state.playerKillCooldownUntil = now + randomRange(KILL_COOLDOWN_MIN, KILL_COOLDOWN_MAX);

  if (livingCrewCount() === 0) {
    finishRound("Victory", "All crewmates are gone. You win as the impostor.");
  }
}

function handleInteract() {
  if (!state.playerAlive || isMeetingOpen() || isTaskModalOpen()) {
    return;
  }

  const activeTask = nearestTask(INTERACT_DISTANCE);
  if (!activeTask) {
    const targetTask = nearestTask();
    if (targetTask) {
      state.status = "Too far";
      updatePrompt(`Get closer to ${targetTask.label.toLowerCase()} in ${roomNameForTask(targetTask)}.`);
    }
    return;
  }

  openTaskModal(activeTask);
}

function updatePlayer(dt) {
  if (!state.playerAlive || isMeetingOpen() || isTaskModalOpen()) {
    return;
  }

  const moveX = (keyState.right ? 1 : 0) - (keyState.left ? 1 : 0);
  const moveY = (keyState.down ? 1 : 0) - (keyState.up ? 1 : 0);

  if (!moveX && !moveY) {
    return;
  }

  const magnitude = Math.hypot(moveX, moveY) || 1;
  const velocityX = (moveX / magnitude) * PLAYER_SPEED * dt;
  const velocityY = (moveY / magnitude) * PLAYER_SPEED * dt;
  const nextX = state.player.x + velocityX;
  const nextY = state.player.y + velocityY;

  state.player.facing = Math.atan2(moveY, moveX);

  if (isWalkablePoint(nextX, state.player.y)) {
    state.player.x = nextX;
  }

  if (isWalkablePoint(state.player.x, nextY)) {
    state.player.y = nextY;
  }

  state.player.x = clamp(state.player.x, PLAYER_RADIUS, MAP_WIDTH - PLAYER_RADIUS);
  state.player.y = clamp(state.player.y, PLAYER_RADIUS, MAP_HEIGHT - PLAYER_RADIUS);
}

function canDirectChase(hunter, victim) {
  const hunterRoom = getRoomAtPoint(hunter.x, hunter.y);
  const victimRoom = getRoomAtPoint(victim.x, victim.y);

  if (hunterRoom && victimRoom) {
    return hunterRoom.id === victimRoom.id;
  }

  return !hunterRoom && !victimRoom;
}

function createBody(victim) {
  state.bodies.push({
    id: `body-${state.bodies.length + 1}-${Date.now()}`,
    x: victim.x,
    y: victim.y,
    colorId: victim.colorId,
    hatId: victim.hatId,
    name: victim.name || "Crewmate",
    reported: false
  });
}

function killVictim(killer, victim, timestamp) {
  if ("pauseUntil" in killer) {
    killer.pauseUntil = timestamp + randomRange(400, 900);
  }
  if ("killCooldownUntil" in killer) {
    killer.killCooldownUntil = timestamp + randomRange(KILL_COOLDOWN_MIN, KILL_COOLDOWN_MAX);
  }

  createBody(victim);

  if (victim.id === "player") {
    state.playerAlive = false;
    state.status = "Dead";
    updatePrompt("You were eliminated. One of the crewmates is the killer.");
    return;
  }

  victim.alive = false;

  if (killer.id !== "player" && livingCrewCount() === 0) {
    finishRound(state.playerRole === "killer" ? "Victory" : "Defeat", state.playerRole === "killer"
      ? "The ship is cleared. You win as the impostor."
      : "The impostor eliminated the whole crew.");
  }
}

function findKillerTarget(killer) {
  const candidates = [];

  if (state.playerAlive) {
    candidates.push({
      id: "player",
      x: state.player.x,
      y: state.player.y,
      colorId: state.player.colorId,
      hatId: state.player.hatId,
      name: "You"
    });
  }

  state.crewmates.forEach((crewmate) => {
    if (!crewmate.alive || crewmate.id === killer.id) {
      return;
    }
    candidates.push(crewmate);
  });

  let bestTarget = null;
  let bestDistance = Number.POSITIVE_INFINITY;

  candidates.forEach((candidate) => {
    const candidateDistance = distance(killer, candidate);
    if (candidateDistance > KILL_SENSE_RANGE || candidateDistance >= bestDistance) {
      return;
    }
    if (!canDirectChase(killer, candidate)) {
      return;
    }
    bestTarget = candidate;
    bestDistance = candidateDistance;
  });

  return bestTarget;
}

function updateCrewmates(dt, timestamp) {
  if (isMeetingOpen()) {
    return;
  }

  state.crewmates.forEach((crewmate) => {
    if (!crewmate.alive) {
      return;
    }

    if (crewmate.role === "killer" && timestamp >= crewmate.killCooldownUntil) {
      const target = findKillerTarget(crewmate);
      if (target) {
        const dx = target.x - crewmate.x;
        const dy = target.y - crewmate.y;
        const targetDistance = Math.hypot(dx, dy);

        if (targetDistance <= KILL_DISTANCE) {
          killVictim(crewmate, target, timestamp);
          return;
        }

        if (targetDistance > 0) {
          crewmate.facing = Math.atan2(dy, dx);
          const chaseSpeed = crewmate.speed + 30;
          const step = Math.min(chaseSpeed * dt, targetDistance);
          crewmate.x += (dx / targetDistance) * step;
          crewmate.y += (dy / targetDistance) * step;
          return;
        }
      }
    }

    if (timestamp < crewmate.pauseUntil) {
      return;
    }

    if (!crewmate.pathNodeIds.length || crewmate.pathIndex >= crewmate.pathNodeIds.length) {
      assignCrewmateRoute(crewmate);
    }

    const targetNode = navNodeById(crewmate.pathNodeIds[crewmate.pathIndex]);
    if (!targetNode) {
      assignCrewmateRoute(crewmate);
      return;
    }

    const dx = targetNode.x - crewmate.x;
    const dy = targetNode.y - crewmate.y;
    const targetDistance = Math.hypot(dx, dy);

    if (targetDistance < 4) {
      crewmate.x = targetNode.x;
      crewmate.y = targetNode.y;
      crewmate.currentNodeId = targetNode.id;
      crewmate.pathIndex += 1;

      if (crewmate.pathIndex >= crewmate.pathNodeIds.length) {
        crewmate.pauseUntil = timestamp + randomRange(300, 1400);
      }
      return;
    }

    crewmate.facing = Math.atan2(dy, dx);
    const step = Math.min(crewmate.speed * dt, targetDistance);
    crewmate.x += (dx / targetDistance) * step;
    crewmate.y += (dy / targetDistance) * step;
  });
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

function updateHud() {
  const room = getRoomAtPoint(state.player.x, state.player.y);
  roomValue.textContent = room ? room.label : "Hallway";
  currencyValue.textContent = String(state.wings);
  const nearbyTask = nearestTask(INTERACT_DISTANCE);
  const targetTask = nearbyTask || nearestTask();
  taskValue.textContent = targetTask
    ? `${targetTask.label} • ${state.completedTaskCount} done`
    : `${state.completedTaskCount} done`;

  if (isMeetingOpen()) {
    statusValue.textContent = "Meeting";
    return;
  }

  if (isTaskModalOpen()) {
    statusValue.textContent = state.taskModal.completed ? "Task complete" : "Typing";
    return;
  }

  if (!state.playerAlive && state.playerRole !== "killer") {
    statusValue.textContent = "Dead";
    return;
  }

  if (state.status === "Victory" || state.status === "Defeat") {
    statusValue.textContent = state.status;
    return;
  }

  const nearbyBody = getNearbyReportableBody();
  state.nearbyBodyId = nearbyBody ? nearbyBody.id : null;

  if (nearbyBody) {
    state.status = "Report";
    updatePrompt(`Press R to report ${nearbyBody.name}'s body.`);
    statusValue.textContent = state.status;
    return;
  }

  if (state.playerRole === "killer") {
    const killTarget = getNearbyPlayerKillTarget();
    if (killTarget) {
      state.status = "Kill";
      updatePrompt(`Press Q to eliminate ${killTarget.name}.`);
    } else {
      const seconds = Math.max(0, Math.ceil((state.playerKillCooldownUntil - performance.now()) / 1000));
      state.status = "Impostor";
      updatePrompt(seconds > 0
        ? `You are the impostor. Kill cooldown: ${seconds}s.`
        : "You are the impostor. Find a crewmate and press Q to kill.");
    }
    statusValue.textContent = state.status;
    return;
  }

  if (nearbyTask) {
    state.status = "Ready";
    updatePrompt(`Press E to start ${nearbyTask.label.toLowerCase()}.`);
  } else if (targetTask) {
    state.status = "Exploring";
    updatePrompt(`Head to ${roomNameForTask(targetTask)} and find the glowing typing station.`);
  } else {
    state.status = "Clear";
    updatePrompt("No typing stations are active right now.");
  }

  statusValue.textContent = state.status;
}

function drawBackdrop() {
  const gradient = ctx.createLinearGradient(0, 0, MAP_WIDTH, MAP_HEIGHT);
  gradient.addColorStop(0, "#4d78b1");
  gradient.addColorStop(0.45, "#375f96");
  gradient.addColorStop(1, "#1f3558");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

  ctx.fillStyle = "rgba(255,255,255,0.12)";
  for (let index = 0; index < 260; index += 1) {
    const x = (index * 157) % MAP_WIDTH;
    const y = (index * 271) % MAP_HEIGHT;
    ctx.fillRect(x, y, 2 + (index % 2), 2 + (index % 2));
  }

  ctx.fillStyle = "#a3bddc";
  roundedRectPath(80, 80, MAP_WIDTH - 160, MAP_HEIGHT - 160, 110);
  ctx.fill();
  ctx.strokeStyle = "rgba(210, 240, 255, 0.42)";
  ctx.lineWidth = 6;
  ctx.stroke();
}

function drawRoom(room) {
  const roomGradient = ctx.createLinearGradient(room.x, room.y, room.x + room.w, room.y + room.h);
  roomGradient.addColorStop(0, room.color);
  roomGradient.addColorStop(1, "#a9bed8");
  ctx.fillStyle = roomGradient;
  roundedRectPath(room.x, room.y, room.w, room.h, 34);
  ctx.fill();
  ctx.strokeStyle = "rgba(255, 255, 255, 0.34)";
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.18)";
  roundedRectPath(room.x + 16, room.y + 16, room.w - 32, room.h - 32, 24);
  ctx.fill();

  ctx.fillStyle = "#173355";
  ctx.font = '700 28px "Chakra Petch"';
  ctx.textAlign = "left";
  ctx.fillText(room.label, room.x + 28, room.y + 42);
}

function drawCorridor(corridor) {
  ctx.fillStyle = "#93abc8";
  roundedRectPath(corridor.x, corridor.y, corridor.w, corridor.h, 20);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.26)";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "rgba(255,255,255,0.15)";
  if (corridor.w > corridor.h) {
    for (let x = corridor.x + 24; x < corridor.x + corridor.w - 24; x += 88) {
      roundedRectPath(x, corridor.y + corridor.h / 2 - 8, 44, 16, 8);
      ctx.fill();
    }
  } else {
    for (let y = corridor.y + 24; y < corridor.y + corridor.h - 24; y += 88) {
      roundedRectPath(corridor.x + corridor.w / 2 - 8, y, 16, 44, 8);
      ctx.fill();
    }
  }
}

function drawPanel(x, y, width, height, color = "#5d7294", inset = "#d5e3f5") {
  ctx.fillStyle = color;
  roundedRectPath(x, y, width, height, 18);
  ctx.fill();
  ctx.fillStyle = inset;
  roundedRectPath(x + 10, y + 10, width - 20, height - 20, 12);
  ctx.fill();
}

function drawConsole(x, y, width, height, screenColor = "#74f3ff") {
  drawPanel(x, y, width, height, "#4d6487", "#d2deed");
  ctx.fillStyle = screenColor;
  roundedRectPath(x + 16, y + 16, width - 32, height - 32, 10);
  ctx.fill();
}

function drawCrate(x, y, width, height, color = "#d7ae62") {
  ctx.fillStyle = color;
  roundedRectPath(x, y, width, height, 12);
  ctx.fill();
  ctx.strokeStyle = "rgba(88, 53, 21, 0.45)";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x + 14, y + 14);
  ctx.lineTo(x + width - 14, y + height - 14);
  ctx.moveTo(x + width - 14, y + 14);
  ctx.lineTo(x + 14, y + height - 14);
  ctx.stroke();
}

function drawRoundTable(x, y, radius) {
  ctx.fillStyle = "#7ad2e0";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#244662";
  ctx.beginPath();
  ctx.arc(x, y, radius * 0.62, 0, Math.PI * 2);
  ctx.fill();
}

function drawEngineCore(x, y, width, height, glow = "#ff9d6d") {
  drawPanel(x, y, width, height, "#625777", "#c4bdd6");
  ctx.fillStyle = glow;
  roundedRectPath(x + 18, y + 18, width - 36, height - 36, 14);
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  roundedRectPath(x + width * 0.25, y + 18, width * 0.12, height - 36, 8);
  ctx.fill();
  roundedRectPath(x + width * 0.63, y + 18, width * 0.12, height - 36, 8);
  ctx.fill();
}

function drawFloorGrid(room) {
  ctx.strokeStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 1.5;
  for (let x = room.x + 36; x < room.x + room.w - 24; x += 84) {
    ctx.beginPath();
    ctx.moveTo(x, room.y + 60);
    ctx.lineTo(x, room.y + room.h - 30);
    ctx.stroke();
  }
  for (let y = room.y + 70; y < room.y + room.h - 24; y += 84) {
    ctx.beginPath();
    ctx.moveTo(room.x + 28, y);
    ctx.lineTo(room.x + room.w - 28, y);
    ctx.stroke();
  }
}

function drawRoomDetails(room) {
  drawFloorGrid(room);

  switch (room.id) {
    case "cafeteria":
      drawRoundTable(room.x + 180, room.y + 180, 58);
      drawRoundTable(room.x + 400, room.y + 320, 58);
      drawRoundTable(room.x + 620, room.y + 180, 58);
      drawConsole(room.x + room.w - 170, room.y + 90, 110, 78, "#9bf6a2");
      break;
    case "medbay":
      drawPanel(room.x + 40, room.y + 90, 150, 92, "#89acc1", "#e9f7ff");
      drawConsole(room.x + 220, room.y + 70, 92, 128, "#9af7ff");
      break;
    case "upper-engine":
    case "lower-engine":
      drawEngineCore(room.x + 70, room.y + 70, room.w - 140, room.h - 130, "#f39c74");
      break;
    case "reactor":
      drawEngineCore(room.x + 110, room.y + 84, room.w - 220, room.h - 150, "#e87da1");
      drawConsole(room.x + room.w - 150, room.y + 92, 90, 140, "#ffe17f");
      break;
    case "security":
      drawConsole(room.x + 36, room.y + 60, 92, 120, "#8ee5ff");
      drawConsole(room.x + 150, room.y + 60, 92, 120, "#b4f3ff");
      break;
    case "electrical":
      drawConsole(room.x + 34, room.y + 54, 120, 220, "#ffe17f");
      drawConsole(room.x + 192, room.y + 54, 108, 220, "#ffb347");
      break;
    case "storage":
      for (let row = 0; row < 3; row += 1) {
        for (let col = 0; col < 4; col += 1) {
          drawCrate(room.x + 70 + col * 150, room.y + 120 + row * 150, 92, 74, row === 1 ? "#8bc7ab" : "#d9b26b");
        }
      }
      break;
    case "admin":
      drawRoundTable(room.x + 130, room.y + 150, 54);
      drawConsole(room.x + 240, room.y + 72, 104, 120, "#86ffce");
      break;
    case "weapons":
      drawConsole(room.x + 60, room.y + 76, 116, 156, "#95f8ff");
      drawPanel(room.x + 232, room.y + 90, 170, 120, "#b2c1d8", "#e8eef8");
      break;
    case "o2":
      drawConsole(room.x + 40, room.y + 56, 84, 124, "#8cf79b");
      drawConsole(room.x + 146, room.y + 56, 84, 124, "#8cf79b");
      break;
    case "navigation":
      drawConsole(room.x + 80, room.y + 110, room.w - 160, 90, "#7bdcff");
      drawConsole(room.x + 230, room.y + 248, room.w - 460, 80, "#bdd7ff");
      break;
    case "shields":
      for (let index = 0; index < 5; index += 1) {
        drawPanel(room.x + 70 + index * 118, room.y + 120, 76, 76, "#9578d4", "#ece2ff");
      }
      drawConsole(room.x + room.w - 156, room.y + 86, 110, 140, "#9df7ff");
      break;
    case "communications":
      drawConsole(room.x + 54, room.y + 56, room.w - 108, 120, "#8cf3ff");
      break;
    default:
      break;
  }
}

function drawTask(task, active) {
  ctx.save();
  ctx.translate(task.x, task.y);
  const pulse = Math.sin(performance.now() / 220) * 8;
  ctx.strokeStyle = active ? "#ffd86a" : "rgba(255,255,255,0.22)";
  ctx.lineWidth = active ? 5 : 2;
  ctx.beginPath();
  ctx.arc(0, 0, active ? 34 + pulse : 20, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = active ? "#ffd86a" : "#7e8ca8";
  roundedRectPath(-12, -18, 24, 36, 6);
  ctx.fill();
  ctx.fillStyle = "#133b56";
  roundedRectPath(-6, -12, 12, 20, 4);
  ctx.fill();
  ctx.restore();
}

function drawBody(body) {
  const color = colorById(body.colorId);

  ctx.save();
  ctx.translate(body.x, body.y + 8);
  ctx.rotate(-0.22);

  ctx.fillStyle = "rgba(0,0,0,0.16)";
  ctx.beginPath();
  ctx.ellipse(0, 24, 24, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = color.base;
  roundedRectPath(-28, -10, 46, 24, 10);
  ctx.fill();
  ctx.fillStyle = color.accent;
  roundedRectPath(-22, -8, 34, 11, 8);
  ctx.fill();
  ctx.fillStyle = "#9cecff";
  roundedRectPath(-12, -22, 22, 9, 4);
  ctx.fill();
  ctx.fillStyle = "#f4c945";
  roundedRectPath(10, -18, 18, 16, 8);
  ctx.fill();

  ctx.restore();
}

function drawHat(hatId) {
  const hat = hatById(hatId);

  switch (hat.id) {
    case "cap":
      ctx.fillStyle = "#ffffff";
      roundedRectPath(-17, -49, 34, 11, 5);
      ctx.fill();
      ctx.fillStyle = "#173355";
      roundedRectPath(-20, -54, 40, 9, 4);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(8, -43);
      ctx.quadraticCurveTo(22, -43, 26, -36);
      ctx.lineTo(12, -36);
      ctx.closePath();
      ctx.fill();
      break;
    case "beanie":
      ctx.fillStyle = "#4c74d7";
      roundedRectPath(-18, -56, 36, 16, 8);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, -58, 7, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "plant":
      ctx.strokeStyle = "#4f8b3a";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -40);
      ctx.lineTo(0, -58);
      ctx.stroke();
      ctx.fillStyle = "#7bd55c";
      ctx.beginPath();
      ctx.ellipse(-6, -61, 8, 4, -0.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(7, -61, 8, 4, 0.6, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "crown":
      ctx.fillStyle = "#ffd861";
      ctx.beginPath();
      ctx.moveTo(-18, -41);
      ctx.lineTo(-12, -56);
      ctx.lineTo(-3, -44);
      ctx.lineTo(0, -60);
      ctx.lineTo(7, -44);
      ctx.lineTo(14, -56);
      ctx.lineTo(18, -41);
      ctx.closePath();
      ctx.fill();
      ctx.fillRect(-18, -42, 36, 8);
      break;
    case "antenna":
      ctx.strokeStyle = "#7f8797";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(0, -40);
      ctx.lineTo(0, -62);
      ctx.stroke();
      ctx.fillStyle = "#ff6f62";
      ctx.beginPath();
      ctx.arc(0, -66, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
    default:
      break;
  }
}

function drawCrewmate(crewmate, scale = 1, label = "") {
  const { x, y } = crewmate;
  const color = colorById(crewmate.colorId);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(scale, scale);

  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.beginPath();
  ctx.ellipse(0, 34, 28, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  drawHat(crewmate.hatId);

  ctx.fillStyle = "#f4c945";
  roundedRectPath(-14, -40, 28, 24, 10);
  ctx.fill();

  ctx.fillStyle = color.base;
  roundedRectPath(-24, -16, 48, 44, 12);
  ctx.fill();
  ctx.fillStyle = color.accent;
  roundedRectPath(-20, -12, 40, 18, 10);
  ctx.fill();

  ctx.fillStyle = "#ffdd75";
  roundedRectPath(-34, -8, 10, 28, 6);
  ctx.fill();
  roundedRectPath(24, -8, 10, 28, 6);
  ctx.fill();

  ctx.fillStyle = "#0e1527";
  roundedRectPath(-18, 28, 14, 26, 6);
  ctx.fill();
  roundedRectPath(4, 28, 14, 26, 6);
  ctx.fill();

  ctx.fillStyle = "#1e3454";
  roundedRectPath(-18, -8, 36, 20, 8);
  ctx.fill();

  ctx.fillStyle = "#9cecff";
  roundedRectPath(-15, -34, 30, 10, 4);
  ctx.fill();

  ctx.fillStyle = color.strap;
  roundedRectPath(18, -10, 14, 28, 6);
  ctx.fill();

  ctx.strokeStyle = "rgba(255,255,255,0.46)";
  ctx.lineWidth = 2;
  roundedRectPath(-24, -16, 48, 44, 12);
  ctx.stroke();

  ctx.restore();

  if (label) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = "rgba(19, 35, 54, 0.82)";
    roundedRectPath(-30, -62, 60, 20, 8);
    ctx.fill();
    ctx.fillStyle = "#f4f8ff";
    ctx.font = '700 12px "Chakra Petch"';
    ctx.textAlign = "center";
    ctx.fillText(label, 0, -48);
    ctx.restore();
  }
}

function drawPlayer() {
  if (!state.playerAlive) {
    return;
  }
  drawCrewmate(state.player, 1, "");
}

function drawCrewmates() {
  state.crewmates.forEach((crewmate) => {
    if (!crewmate.alive || !isPointVisible(crewmate)) {
      return;
    }
    drawCrewmate(crewmate, 0.82, crewmate.name);
  });
}

function drawBodies() {
  state.bodies.forEach((body) => {
    if (body.reported || !isPointVisible(body)) {
      return;
    }
    drawBody(body);
  });
}

function drawVisionMask() {
  const radial = ctx.createRadialGradient(
    state.player.x,
    state.player.y,
    VISION_RADIUS * 0.5,
    state.player.x,
    state.player.y,
    VISION_SOFT_RADIUS
  );
  radial.addColorStop(0, "rgba(8,12,20,0)");
  radial.addColorStop(0.45, "rgba(8,12,20,0.02)");
  radial.addColorStop(0.72, "rgba(8,12,20,0.12)");
  radial.addColorStop(1, "rgba(8,12,20,0.24)");
  ctx.fillStyle = radial;
  ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);

  const lookX = state.player.x + Math.cos(state.player.facing) * 120;
  const lookY = state.player.y + Math.sin(state.player.facing) * 120;
  const forward = ctx.createRadialGradient(
    lookX,
    lookY,
    20,
    lookX,
    lookY,
    190
  );
  forward.addColorStop(0, "rgba(8,12,20,0)");
  forward.addColorStop(1, "rgba(8,12,20,0.14)");
  ctx.fillStyle = forward;
  ctx.fillRect(0, 0, MAP_WIDTH, MAP_HEIGHT);
}

function drawWorld() {
  ctx.clearRect(0, 0, viewport.width, viewport.height);

  ctx.save();
  ctx.translate(-state.camera.x, -state.camera.y);

  drawBackdrop();
  corridors.forEach(drawCorridor);
  rooms.forEach(drawRoom);
  rooms.forEach(drawRoomDetails);
  drawVisionMask();
  const nearbyTask = nearestTask(INTERACT_DISTANCE);
  state.activeTasks.forEach((task) => {
    if (isPointVisible(task)) {
      drawTask(task, task.id === nearbyTask?.id);
    }
  });
  drawBodies();
  drawCrewmates();
  drawPlayer();
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
  updateCrewmates(dt, timestamp);
  updateCamera();
  updateHud();
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

  if (isMeetingOpen()) {
    if (state.meeting?.phase === "resolved" && (event.code === "Enter" || event.code === "Space" || event.code === "Escape")) {
      closeMeeting();
    }
    return;
  }

  if (isTaskModalOpen()) {
    if (handleTaskKeydown(event)) {
      return;
    }
  }

  if (event.code === "Escape" && state.closetOpen) {
    toggleCloset(false);
    return;
  }

  if (event.code === "Escape" && state.shopOpen) {
    toggleShop(false);
    return;
  }

  onKeyChange(event.code, true);

  if (event.code === "KeyE") {
    handleInteract();
  }
});

document.addEventListener("keyup", (event) => {
  onKeyChange(event.code, false);
});

window.addEventListener("resize", resizeCanvas);

closetButton.addEventListener("click", () => {
  toggleCloset();
});

shopButton.addEventListener("click", () => {
  toggleShop();
});

colorOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-color-id]");
  if (!button) {
    return;
  }
  applyColor(button.dataset.colorId);
});

hatOptions.addEventListener("click", (event) => {
  const button = event.target.closest("[data-hat-id]");
  if (!button) {
    return;
  }
  applyHat(button.dataset.hatId);
});

shopItems.addEventListener("click", (event) => {
  const button = event.target.closest("[data-shop-hat-id]");
  if (!button) {
    return;
  }

  const hatId = button.dataset.shopHatId;
  if (hasOwnedHat(hatId)) {
    applyHat(hatId);
    return;
  }

  buyHat(hatId);
});

meetingContinueButton.addEventListener("click", () => {
  closeMeeting();
});

meetingSkipButton.addEventListener("click", () => {
  castPlayerVote("skip");
});

meetingCandidates.addEventListener("click", (event) => {
  const button = event.target.closest("[data-vote-id]");
  if (!button || state.meeting?.phase !== "voting") {
    return;
  }
  castPlayerVote(button.dataset.voteId);
});

taskCloseButton.addEventListener("click", () => {
  closeTaskModal();
});

loadCustomization();
state.crewmates = createCrewmates();
assignRoundRoles();
fillActiveTasks();
renderCustomizationOptions();
renderShopOptions();
resizeCanvas();
toggleCloset(false);
toggleShop(false);
meetingOverlay.classList.add("hidden");
meetingOverlay.setAttribute("aria-hidden", "true");
renderTaskOverlay();
updatePrompt("Move with WASD or arrows. Press E near glowing stations.");
requestAnimationFrame(gameLoop);
