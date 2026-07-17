const routines = [
  {
    id: "neon-shuffle",
    name: "Neon Shuffle",
    description: "Fast club footwork with zig-zag lane switches and quick doubles.",
    bpm: 124,
    difficulty: "Medium",
    pattern: [0, 1, 3, 2, 0, 3, 1, 2],
    steps: 34
  },
  {
    id: "rocket-pop",
    name: "Rocket Pop",
    description: "Big upbeat jumps, straight hits, and a clean chorus burst.",
    bpm: 136,
    difficulty: "Hard",
    pattern: [1, 1, 3, 0, 2, 3, 0, 2],
    steps: 38
  },
  {
    id: "disco-drift",
    name: "Disco Drift",
    description: "Smoother timing with mirrored pairs and relaxed groove sections.",
    bpm: 116,
    difficulty: "Easy",
    pattern: [0, 2, 1, 3, 2, 0, 3, 1],
    steps: 32
  },
  {
    id: "moonwalk-mayhem",
    name: "Moonwalk Mayhem",
    description: "Late fake-outs, lane reversals, and a tougher final streak.",
    bpm: 142,
    difficulty: "Very Hard",
    pattern: [3, 2, 1, 0, 3, 1, 2, 0],
    steps: 42
  }
];

const aiRivals = [
  {
    id: "nova-beat",
    name: "Nova Beat",
    avatar: "🤖",
    skin: "Prism Pulse Suit",
    style: "Laser timing",
    skill: 0.95,
    consistency: 0.91
  },
  {
    id: "comet-kick",
    name: "Comet Kick",
    avatar: "🚀",
    skin: "Meteor Flash Jacket",
    style: "Big combo chaser",
    skill: 0.92,
    consistency: 0.88
  },
  {
    id: "pixel-pop",
    name: "Pixel Pop",
    avatar: "🕹️",
    skin: "8-Bit Groove Armor",
    style: "Clean all-rounder",
    skill: 0.88,
    consistency: 0.84
  },
  {
    id: "glitch-groove",
    name: "Glitch Groove",
    avatar: "👾",
    skin: "Static Shadow Skin",
    style: "Chaos specialist",
    skill: 0.84,
    consistency: 0.77
  }
];

const STORAGE_KEYS = {
  playerBests: "dance-master-player-bests"
};

const scoreValue = document.getElementById("scoreValue");
const aiScoreValue = document.getElementById("aiScoreValue");
const aiScoreLabel = document.getElementById("aiScoreLabel");
const comboValue = document.getElementById("comboValue");
const accuracyValue = document.getElementById("accuracyValue");
const bestValue = document.getElementById("bestValue");
const routineName = document.getElementById("routineName");
const routineTag = document.getElementById("routineTag");
const routineDescription = document.getElementById("routineDescription");
const routineList = document.getElementById("routineList");
const laneGrid = document.getElementById("laneGrid");
const lanes = [...laneGrid.querySelectorAll(".lane")];
const progressBar = document.getElementById("progressBar");
const overlay = document.getElementById("overlay");
const overlayKicker = document.getElementById("overlayKicker");
const overlayTitle = document.getElementById("overlayTitle");
const overlayBody = document.getElementById("overlayBody");
const startButton = document.getElementById("startButton");
const judgement = document.getElementById("judgement");
const dancer = document.getElementById("dancer");
const touchButtons = [...document.querySelectorAll(".control-button")];
const targetScoreValue = document.getElementById("targetScoreValue");
const playerRecordValue = document.getElementById("playerRecordValue");
const leaderboardStatus = document.getElementById("leaderboardStatus");
const leaderboardList = document.getElementById("leaderboardList");
const featuredAiAvatar = document.getElementById("featuredAiAvatar");
const featuredAiName = document.getElementById("featuredAiName");
const featuredAiSkin = document.getElementById("featuredAiSkin");
const featuredAiScore = document.getElementById("featuredAiScore");

const hitWindows = {
  perfect: 110,
  good: 210,
  miss: 280
};

let currentRoutine = null;
let notes = [];
let animationFrame = 0;
let roundActive = false;
let roundStartTime = 0;
let routineDuration = 0;
let countdownTimer = 0;
let noteTravelMs = 2200;
let score = 0;
let combo = 0;
let bestCombo = 0;
let hitCount = 0;
let totalJudgement = 0;
let consumedNotes = 0;
let judgementTimer = 0;
let poseTimer = 0;
let currentAiStandings = [];
let playerBests = loadPlayerBests();

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatScore(value) {
  return new Intl.NumberFormat("en-US").format(Math.max(0, Math.round(value)));
}

function hashSeed(text) {
  let hash = 1779033703 ^ text.length;
  for (let index = 0; index < text.length; index += 1) {
    hash = Math.imul(hash ^ text.charCodeAt(index), 3432918353);
    hash = (hash << 13) | (hash >>> 19);
  }
  return hash >>> 0;
}

function createSeededRng(seedText) {
  let seed = hashSeed(seedText) || 1;
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let temp = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    temp = (temp + Math.imul(temp ^ (temp >>> 7), 61 | temp)) ^ temp;
    return ((temp ^ (temp >>> 14)) >>> 0) / 4294967296;
  };
}

function randomBetween(rng, min, max) {
  return min + (max - min) * rng();
}

function loadPlayerBests() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEYS.playerBests);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function savePlayerBests() {
  try {
    window.localStorage.setItem(STORAGE_KEYS.playerBests, JSON.stringify(playerBests));
  } catch {
    // Ignore storage failures so the game still works in locked-down browsers.
  }
}

function getDifficultyPenalty(routine) {
  return {
    Easy: 0.03,
    Medium: 0.06,
    Hard: 0.1,
    "Very Hard": 0.14
  }[routine.difficulty] ?? 0.08;
}

function simulateAiScore(routine, rival) {
  const rng = createSeededRng(`${routine.id}:${rival.id}`);
  const penalty = getDifficultyPenalty(routine);
  const hitRate = clamp(rival.skill - penalty + randomBetween(rng, -0.03, 0.04), 0.68, 0.985);
  const activeHits = Math.round(routine.steps * hitRate);
  const perfectRate = clamp(0.5 + rival.skill * 0.34 - penalty * 0.45 + randomBetween(rng, -0.05, 0.04), 0.38, 0.95);
  const perfects = Math.min(activeHits, Math.round(activeHits * perfectRate));
  const goods = Math.max(0, activeHits - perfects);
  const maxCombo = clamp(
    Math.round(activeHits * (rival.consistency - penalty * 0.22 + randomBetween(rng, -0.05, 0.06))),
    Math.max(4, Math.round(routine.steps * 0.28)),
    activeHits
  );
  const comboBonus = Math.round((maxCombo - 1) * maxCombo * 3 * clamp(0.62 + rival.consistency * 0.42, 0.7, 1.02));
  const score = perfects * 150 + goods * 90 + comboBonus;
  const accuracy = Math.round(((perfects * 100) + (goods * 76)) / routine.steps);

  return {
    id: rival.id,
    name: rival.name,
    avatar: rival.avatar,
    skin: rival.skin,
    style: rival.style,
    score,
    accuracy,
    combo: maxCombo
  };
}

function setAiStandingsForRoutine(routine) {
  currentAiStandings = aiRivals
    .map((rival) => simulateAiScore(routine, rival))
    .sort((a, b) => b.score - a.score);
}

function getRoutineBestRecord() {
  if (!currentRoutine) {
    return null;
  }
  return playerBests[currentRoutine.id] ?? null;
}

function getCurrentAccuracy() {
  return hitCount === 0 ? 100 : Math.round(totalJudgement / hitCount);
}

function updateLeaderboardSummary() {
  const topAiScore = currentAiStandings[0]?.score ?? null;
  const playerBest = getRoutineBestRecord();

  targetScoreValue.textContent = topAiScore === null ? "--" : formatScore(topAiScore);
  playerRecordValue.textContent = playerBest ? formatScore(playerBest.score) : "--";
}

function updateFeaturedAiProfile() {
  const leader = currentAiStandings[0];

  if (!currentRoutine || !leader) {
    featuredAiAvatar.textContent = "AI";
    featuredAiName.textContent = "Waiting For A Pick";
    featuredAiSkin.textContent = "Spin a routine to reveal the current top AI profile.";
    featuredAiScore.textContent = "--";
    return;
  }

  featuredAiAvatar.textContent = leader.avatar;
  featuredAiName.textContent = leader.name;
  featuredAiSkin.textContent = `${leader.skin} · ${leader.style}`;
  featuredAiScore.textContent = formatScore(leader.score);
}

function updateAiScoreHud() {
  const leader = currentAiStandings[0];

  if (!currentRoutine || !leader) {
    aiScoreValue.textContent = "--";
    aiScoreLabel.textContent = "No rival selected";
    return;
  }

  aiScoreValue.textContent = formatScore(leader.score);

  if (roundActive) {
    const gap = leader.score - score;
    aiScoreLabel.textContent = gap > 0
      ? `${leader.name} leads by ${formatScore(gap)}`
      : `${leader.name} is behind you`;
    return;
  }

  aiScoreLabel.textContent = `${leader.name} to beat`;
}

function getPlacementForScore(targetScore) {
  const higherScores = currentAiStandings.filter((entry) => entry.score > targetScore).length;
  return higherScores + 1;
}

function updateLeaderboardStatus() {
  if (!currentRoutine || currentAiStandings.length === 0) {
    leaderboardStatus.textContent = "Pick a routine to see which AI dancer owns the floor.";
    return;
  }

  const leader = currentAiStandings[0];
  const place = getPlacementForScore(score);
  const totalSlots = currentAiStandings.length + 1;
  const gap = Math.max(0, leader.score - score);

  if (roundActive) {
    leaderboardStatus.textContent = place === 1
      ? `You are leading the room. Hold first place through the end of ${currentRoutine.name}.`
      : `You are currently #${place} of ${totalSlots}. ${leader.name} leads by ${formatScore(gap)} points.`;
    return;
  }

  if (score > 0 || consumedNotes > 0) {
    leaderboardStatus.textContent = place === 1
      ? `You cleared the AI field on ${currentRoutine.name}.`
      : `You finished #${place} of ${totalSlots}. ${leader.name} still owns the top line.`;
    return;
  }

  leaderboardStatus.textContent = `${leader.name} holds the ${currentRoutine.name} AI record at ${formatScore(leader.score)} points.`;
}

function renderLeaderboard() {
  updateLeaderboardSummary();
  updateAiScoreHud();
  updateFeaturedAiProfile();
  updateLeaderboardStatus();
  leaderboardList.innerHTML = "";

  currentAiStandings.forEach((entry, index) => {
    const row = document.createElement("article");
    row.className = "leaderboard-row";
    if (score > entry.score) {
      row.classList.add("player-leading");
    }

    row.innerHTML = `
      <div class="leaderboard-rank">${index + 1}</div>
      <div class="leaderboard-avatar" aria-hidden="true">${entry.avatar}</div>
      <div>
        <strong class="leaderboard-name">${entry.name}</strong>
        <span class="leaderboard-meta">${entry.style} · ${entry.accuracy}% accuracy · ${entry.combo} combo</span>
        <span class="leaderboard-skin">Skin: ${entry.skin}</span>
      </div>
      <div class="leaderboard-score">
        <strong>${formatScore(entry.score)}</strong>
        <span>${score > entry.score ? "You are ahead" : "Score to beat"}</span>
      </div>
    `;

    leaderboardList.appendChild(row);
  });
}

function updatePlayerRecord() {
  if (!currentRoutine) {
    return { isNewBest: false, playerBest: null };
  }

  const existing = playerBests[currentRoutine.id];
  if (!existing || score > existing.score) {
    const nextRecord = {
      score,
      accuracy: getCurrentAccuracy(),
      combo: bestCombo
    };
    playerBests[currentRoutine.id] = nextRecord;
    savePlayerBests();
    return { isNewBest: true, playerBest: nextRecord };
  }

  return { isNewBest: false, playerBest: existing };
}

function buildRoutineList() {
  routineList.innerHTML = "";
  routines.forEach((routine) => {
    const chip = document.createElement("article");
    chip.className = "routine-chip";
    chip.dataset.routineId = routine.id;
    chip.innerHTML = `
      <strong>${routine.name}</strong>
      <span>${routine.difficulty} · ${routine.steps} beats · ${routine.bpm} BPM</span>
    `;
    routineList.appendChild(chip);
  });
}

function updateRoutineDetails() {
  if (!currentRoutine) {
    routineName.textContent = "Press Start";
    routineTag.textContent = "Waiting For A Pick";
    routineDescription.textContent = "The selected routine details will show here after the randomizer lands.";
    document.body.dataset.theme = "";
  } else {
    routineName.textContent = currentRoutine.name;
    routineTag.textContent = `${currentRoutine.difficulty} Routine · ${currentRoutine.bpm} BPM`;
    routineDescription.textContent = currentRoutine.description;
    document.body.dataset.theme = currentRoutine.id;
  }

  [...routineList.children].forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.routineId === currentRoutine?.id);
  });
}

function resetStats() {
  score = 0;
  combo = 0;
  bestCombo = 0;
  hitCount = 0;
  totalJudgement = 0;
  consumedNotes = 0;
  updateStats();
}

function updateStats() {
  const accuracy = getCurrentAccuracy();
  scoreValue.textContent = formatScore(score);
  comboValue.textContent = String(combo);
  accuracyValue.textContent = `${accuracy}%`;
  bestValue.textContent = String(bestCombo);
  renderLeaderboard();
}

function createChart(routine) {
  const beatMs = 60000 / routine.bpm;
  const chart = [];
  let timestamp = 1300;

  for (let index = 0; index < routine.steps; index += 1) {
    const lane = routine.pattern[index % routine.pattern.length];
    chart.push({
      id: `${routine.id}-${index}`,
      lane,
      time: timestamp,
      hit: false,
      missed: false,
      element: createNoteElement(lane)
    });

    const section = index % 8;
    if (section === 3 || section === 7) {
      timestamp += beatMs * 0.75;
    } else {
      timestamp += beatMs;
    }

    if (index > 0 && index % 12 === 0) {
      timestamp += beatMs * 0.45;
    }
  }

  return {
    chart,
    duration: timestamp + 1800
  };
}

function createNoteElement(laneIndex) {
  const note = document.createElement("div");
  note.className = "note";
  lanes[laneIndex].appendChild(note);
  return note;
}

function clearNotes() {
  notes.forEach((note) => note.element.remove());
  notes = [];
}

function pickRoutine() {
  const pool = routines.filter((routine) => routine.id !== currentRoutine?.id);
  const randomPool = pool.length > 0 ? pool : routines;
  return randomPool[Math.floor(Math.random() * randomPool.length)];
}

function showOverlay(kicker, title, body) {
  overlayKicker.textContent = kicker;
  overlayTitle.textContent = title;
  overlayBody.textContent = body;
  overlay.classList.add("show");
}

function hideOverlay() {
  overlay.classList.remove("show");
}

function setJudgement(state, text) {
  judgement.textContent = text;
  judgement.className = "judgement";
  if (state) {
    judgement.classList.add(state);
  }
  window.clearTimeout(judgementTimer);
  judgementTimer = window.setTimeout(() => {
    judgement.textContent = roundActive ? "Keep Moving" : "Ready";
    judgement.className = "judgement";
  }, 550);
}

function setPose(laneIndex) {
  const poseNames = ["pose-left", "pose-up", "pose-down", "pose-right"];
  dancer.className = "dancer";
  dancer.classList.add(poseNames[laneIndex]);
  window.clearTimeout(poseTimer);
  poseTimer = window.setTimeout(() => {
    dancer.className = "dancer";
  }, 180);
}

function applyHit(laneIndex, state) {
  const lane = lanes[laneIndex];
  lane.classList.add("hit");
  setPose(laneIndex);
  window.setTimeout(() => lane.classList.remove("hit"), 120);
  setJudgement(state.type, state.label);
}

function scoreNote(offset) {
  if (offset <= hitWindows.perfect) {
    return { type: "perfect", label: "Perfect", points: 150, accuracy: 100 };
  }

  return { type: "good", label: "Good", points: 90, accuracy: 76 };
}

function missNote(note) {
  if (note.hit || note.missed) {
    return;
  }

  note.missed = true;
  note.element.remove();
  combo = 0;
  hitCount += 1;
  totalJudgement += 0;
  consumedNotes += 1;
  updateStats();
  setJudgement("miss", "Miss");
}

function handleLanePress(laneIndex) {
  if (!roundActive) {
    return;
  }

  const elapsed = performance.now() - roundStartTime;
  const laneNotes = notes.filter((note) => note.lane === laneIndex && !note.hit && !note.missed);
  const target = laneNotes.find((note) => Math.abs(note.time - elapsed) <= hitWindows.miss);

  if (!target) {
    combo = 0;
    updateStats();
    setJudgement("miss", "Miss");
    applyHit(laneIndex, { type: "miss", label: "Miss" });
    return;
  }

  const offset = Math.abs(target.time - elapsed);
  const result = scoreNote(offset);
  target.hit = true;
  target.element.remove();
  score += result.points + combo * 6;
  combo += 1;
  bestCombo = Math.max(bestCombo, combo);
  hitCount += 1;
  totalJudgement += result.accuracy;
  consumedNotes += 1;
  updateStats();
  applyHit(laneIndex, result);
}

function renderNotes(elapsed) {
  const targetOffset = 96;
  const laneHeight = lanes[0].clientHeight;

  notes.forEach((note) => {
    if (note.hit || note.missed) {
      return;
    }

    const distanceFromHit = note.time - elapsed;
    if (distanceFromHit < -hitWindows.miss) {
      missNote(note);
      return;
    }

    const progress = 1 - distanceFromHit / noteTravelMs;
    const y = Math.max(-120, progress * (laneHeight - targetOffset) - 20);
    note.element.style.top = `${y}px`;
  });
}

function finishRound() {
  roundActive = false;
  animationFrame = 0;
  progressBar.style.width = "100%";
  const accuracy = hitCount === 0 ? 0 : getCurrentAccuracy();
  const place = getPlacementForScore(score);
  const totalSlots = currentAiStandings.length + 1;
  const { isNewBest } = updatePlayerRecord();
  const title = accuracy >= 90 ? "Crowd Favorite" : accuracy >= 75 ? "Solid Set" : "Keep Practicing";
  showOverlay(
    "Routine Complete",
    title,
    `${currentRoutine.name} finished with ${formatScore(score)} points, ${accuracy}% accuracy, and a best combo of ${bestCombo}. You placed #${place} of ${totalSlots}${isNewBest ? " and set a new personal best." : "."} Hit Start to spin another random routine.`
  );
  startButton.disabled = false;
  startButton.textContent = "Spin Another Routine";
  renderLeaderboard();
}

function gameLoop(now) {
  if (!roundActive) {
    return;
  }

  const elapsed = now - roundStartTime;
  renderNotes(elapsed);

  const progress = Math.min(100, (elapsed / routineDuration) * 100);
  progressBar.style.width = `${progress}%`;

  if (consumedNotes >= notes.length && elapsed >= routineDuration) {
    finishRound();
    return;
  }

  animationFrame = window.requestAnimationFrame(gameLoop);
}

function startRound() {
  if (roundActive) {
    return;
  }

  window.clearInterval(countdownTimer);
  window.cancelAnimationFrame(animationFrame);
  clearNotes();
  currentRoutine = pickRoutine();
  setAiStandingsForRoutine(currentRoutine);
  resetStats();
  updateRoutineDetails();
  renderLeaderboard();

  const { chart, duration } = createChart(currentRoutine);
  notes = chart;
  routineDuration = duration;
  progressBar.style.width = "0%";
  showOverlay("Random Pick", currentRoutine.name, currentRoutine.description);
  startButton.textContent = "Routine Loading...";
  startButton.disabled = true;

  let countdown = 3;
  countdownTimer = window.setInterval(() => {
    if (countdown === 3) {
      overlayTitle.textContent = currentRoutine.name;
      overlayBody.textContent = "Routine selected. Get in position.";
    } else if (countdown > 0) {
      overlayKicker.textContent = "Countdown";
      overlayTitle.textContent = String(countdown);
      overlayBody.textContent = "Hit the matching lanes when the notes reach the line.";
    } else {
      window.clearInterval(countdownTimer);
      hideOverlay();
      roundActive = true;
      roundStartTime = performance.now();
      animationFrame = window.requestAnimationFrame(gameLoop);
      startButton.textContent = "Routine In Progress";
      startButton.disabled = true;
      return;
    }

    countdown -= 1;
  }, 900);
}

function handleKeyDown(event) {
  const map = {
    ArrowLeft: 0,
    a: 0,
    A: 0,
    ArrowUp: 1,
    w: 1,
    W: 1,
    ArrowDown: 2,
    s: 2,
    S: 2,
    ArrowRight: 3,
    d: 3,
    D: 3
  };

  const laneIndex = map[event.key];
  if (laneIndex === undefined) {
    return;
  }

  event.preventDefault();
  handleLanePress(laneIndex);
}

buildRoutineList();
updateRoutineDetails();
updateStats();
renderLeaderboard();

startButton.addEventListener("click", () => {
  if (roundActive || startButton.disabled) {
    return;
  }
  startRound();
});

touchButtons.forEach((button) => {
  button.style.background = `var(--${button.classList[1]})`;
  button.addEventListener("click", () => {
    handleLanePress(Number(button.dataset.lane));
  });
});

document.addEventListener("keydown", handleKeyDown);

window.addEventListener("visibilitychange", () => {
  if (document.hidden && roundActive) {
    roundActive = false;
    window.cancelAnimationFrame(animationFrame);
    window.clearInterval(countdownTimer);
    showOverlay("Paused", "Routine Paused", "The round was paused because the tab lost focus. Press Start to roll a fresh random routine.");
    startButton.disabled = false;
    startButton.textContent = "Start Random Routine";
  }
});

showOverlay("Stage Select", "Dance Master", "Hit Start and the game will randomly choose one of four routines.");
