const coinsEl = document.getElementById('coins');
const cpsEl = document.getElementById('cps');
const tapFish = document.getElementById('tapFish');
const shopRow = document.getElementById('shopRow');
const tank = document.getElementById('tank');
const shopPanel = document.getElementById('shopPanel');
const shopToggle = document.getElementById('shopToggle');
const shopClose = document.getElementById('shopClose');
const shopBackdrop = document.getElementById('shopBackdrop');
const resetGame = document.getElementById('resetGame');
const tacoTimerEl = document.getElementById('tacoTimer');
const mainSection = document.querySelector('.main');

const STORAGE_KEY = 'aquarium-save-v1';
const SAVE_DELAY_MS = 300;
const TACO_EVENT_SHARK_STEP = 5;
const TACO_EVENT_DURATION_MS = 30_000;
const TACO_TRUCK_DRIVE_IN_MS = 1400;
const TACO_TRUCK_DRIVE_OUT_MS = 900;
let saveTimer = null;
let luckyEggHatching = false;
let tacoEventActive = false;
let tacoCountdownStarted = false;
let tacoShowTimer = null;
let tacoHideTimer = null;
let tacoEventTimer = null;
let tacoTarget = null;
let tacoEventEndsAt = 0;
let tacoIntroTimers = [];
let tacoTruckEl = null;
let tacoLaunchEl = null;

const gumFinSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 180 90'><defs><linearGradient id='g' x1='0%' y1='0%' x2='100%' y2='0%'><stop offset='0%' stop-color='%23ff9ddf'/><stop offset='100%' stop-color='%23ff62c7'/></linearGradient></defs><rect x='30' y='22' width='100' height='46' rx='20' fill='url(%23g)' stroke='%23ff7acb' stroke-width='4'/><polygon points='130,45 170,22 170,68' fill='%23ff7acb'/><circle cx='70' cy='45' r='8' fill='white'/><circle cx='72' cy='43' r='4' fill='%230b1c3f'/><circle cx='76' cy='41' r='2' fill='white' opacity='0.8'/><path d='M45 40 q-8 5 0 10' stroke='%23ffb8e6' stroke-width='4' fill='none' stroke-linecap='round'/></svg>`;
const luckyEggSvg = 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f95a.svg';
const tacoSvg = 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f32e.svg';
const tacoTurtleSvg = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 120'><ellipse cx='102' cy='72' rx='58' ry='34' fill='%238a5a30'/><ellipse cx='164' cy='72' rx='22' ry='18' fill='%23966a3f'/><circle cx='172' cy='67' r='3.2' fill='%231b1b1b'/><ellipse cx='70' cy='98' rx='13' ry='8' fill='%23754a25'/><ellipse cx='102' cy='104' rx='13' ry='8' fill='%23754a25'/><ellipse cx='133' cy='99' rx='13' ry='8' fill='%23754a25'/><path d='M58 62 q44 -52 88 0 l-44 34z' fill='%23e2b354' stroke='%23ba8a38' stroke-width='4'/><path d='M73 57 q30 -28 58 0' fill='none' stroke='%23b4642c' stroke-width='5' stroke-linecap='round'/><circle cx='84' cy='58' r='4' fill='%23d33f49'/><circle cx='96' cy='62' r='4' fill='%23d33f49'/><circle cx='110' cy='58' r='4' fill='%23d33f49'/><path d='M72 55 q18 -12 36 0 q18 -12 36 0' fill='none' stroke='%2353a84f' stroke-width='4' stroke-linecap='round'/></svg>`;

const fishList = [
  { id: 'guppy', name: 'Guppy', cost: 10, cps: 0.1, stockCap: 10, restockAt: 200, img: 'https://img.icons8.com/color/256/fish.png' },
  { id: 'seahorse', name: 'Seahorse', cost: 50, cps: 1, stockCap: 8, restockAt: 400, img: 'https://img.icons8.com/color/256/seahorse.png' },
  { id: 'puffer', name: 'Puffer', cost: 200, cps: 4, stockCap: 6, restockAt: 900, img: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f421.svg' },
  { id: 'turtle', name: 'Turtle', cost: 600, cps: 10, stockCap: 5, restockAt: 1500, img: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.2/svg/1f422.svg' },
  { id: 'tacoturtle', name: 'Taco Turtle', cost: 0, cps: 14, stockCap: 0, restockAt: 0, img: tacoTurtleSvg, locked: true, defaultLocked: true },
  { id: 'jelly', name: 'Jelly', cost: 1500, cps: 24, stockCap: 4, restockAt: 2600, img: 'https://img.icons8.com/color/256/jellyfish.png' },
  { id: 'shark', name: 'Shark', cost: 4000, cps: 65, stockCap: 3, restockAt: 6500, img: 'https://img.icons8.com/color/256/shark.png' },
  { id: 'gumfin', name: 'Gum Fin', cost: 5000, cps: 20, stockCap: 2, restockAt: 8000, img: gumFinSvg, locked: true, defaultLocked: true },
  { id: 'luckyegg', name: 'Lucky Egg', cost: 1000, cps: 0, stockCap: 0, restockAt: 0, img: luckyEggSvg, locked: true, defaultLocked: true, isEgg: true }
];

function createDefaultState() {
  return {
    coins: 0,
    cps: 0,
    owned: Object.fromEntries(fishList.map(f => [f.id, 0])),
    stock: Object.fromEntries(fishList.map(f => [f.id, f.stockCap || 0])),
    mutationStarted: false,
    mutationDone: false,
    luckyEggEventDone: false,
    tacoMilestone: 0
  };
}

function resetFishLocks() {
  fishList.forEach(fish => {
    fish.locked = Boolean(fish.defaultLocked);
  });
}

function loadState() {
  const defaults = createDefaultState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaults;
    const saved = JSON.parse(raw);

    if (typeof saved.coins === 'number' && Number.isFinite(saved.coins) && saved.coins >= 0) {
      defaults.coins = saved.coins;
    }

    fishList.forEach(fish => {
      const owned = Number(saved?.owned?.[fish.id]);
      if (Number.isFinite(owned) && owned >= 0) {
        defaults.owned[fish.id] = Math.floor(owned);
      }

      const stock = Number(saved?.stock?.[fish.id]);
      if (Number.isFinite(stock) && stock >= 0) {
        defaults.stock[fish.id] = Math.min(Math.floor(stock), fish.stockCap || 0);
      }
    });

    defaults.mutationDone = Boolean(saved.mutationDone);
    defaults.luckyEggEventDone = Boolean(saved.luckyEggEventDone);
    const savedTacoMilestone = Number(saved.tacoMilestone);
    if (Number.isFinite(savedTacoMilestone) && savedTacoMilestone >= 0) {
      defaults.tacoMilestone = Math.floor(savedTacoMilestone / TACO_EVENT_SHARK_STEP) * TACO_EVENT_SHARK_STEP;
    } else {
      defaults.tacoMilestone = Math.floor((defaults.owned.shark ?? 0) / TACO_EVENT_SHARK_STEP) * TACO_EVENT_SHARK_STEP;
    }
    return defaults;
  } catch (error) {
    return defaults;
  }
}

function persistNow() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      coins: state.coins,
      owned: state.owned,
      stock: state.stock,
      mutationDone: state.mutationDone,
      luckyEggEventDone: state.luckyEggEventDone,
      tacoMilestone: state.tacoMilestone
    }));
  } catch (error) {
    // Ignore storage quota/privacy mode errors.
  }
}

function queuePersist() {
  if (saveTimer) return;
  saveTimer = setTimeout(() => {
    saveTimer = null;
    persistNow();
  }, SAVE_DELAY_MS);
}

function clearSave() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    // Ignore storage quota/privacy mode errors.
  }
}

resetFishLocks();
const state = loadState();
if (state.mutationDone) {
  const gumfin = fishList.find(fish => fish.id === 'gumfin');
  if (gumfin) gumfin.locked = false;
}
if (state.luckyEggEventDone) {
  const luckyEgg = fishList.find(fish => fish.id === 'luckyegg');
  if (luckyEgg) luckyEgg.locked = false;
}

function format(n) {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(2) + 'M';
  if (n >= 1_000) return (n / 1_000).toFixed(1) + 'k';
  return n.toFixed(1).replace(/\.0$/, '');
}

function setShopOpen(isOpen) {
  if (!shopPanel || !shopToggle || !shopBackdrop) return;
  shopPanel.classList.toggle('open', isOpen);
  shopBackdrop.classList.toggle('visible', isOpen);
  shopToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('shop-open', isOpen);
}

function renderStats() {
  coinsEl.textContent = `🐚 Shells: ${format(state.coins)}`;
  cpsEl.textContent = `⏱️ /sec: ${format(state.cps)}`;
}

function makeCard(fish) {
  const card = document.createElement('article');
  card.className = `card${fish.isEgg ? ' lucky-egg-card' : ''}`;
  if (fish.isEgg) {
    card.innerHTML = `
      <img src="${fish.img}" alt="${fish.name}">
      <div>
        <h3>${fish.name}</h3>
        <div class="meta">Cost: ${fish.cost} | Crack for a surprise</div>
        <div class="owned">Prize pool: Puffer, Turtle, or Shark</div>
        <button class="buy-btn" data-id="${fish.id}">Open Egg</button>
      </div>
    `;
    return card;
  }
  card.innerHTML = `
    <img src="${fish.img}" alt="${fish.name}">
    <div>
      <h3>${fish.name}</h3>
      <div class="meta">Cost: ${fish.cost} | +${fish.cps}/s</div>
      <div class="meta" id="stock-${fish.id}">Stock: ${state.stock[fish.id] ?? fish.stockCap}</div>
      <div class="owned" id="owned-${fish.id}">Owned: 0</div>
      <button class="buy-btn" data-id="${fish.id}">Buy</button>
    </div>
  `;
  return card;
}

function rebuildShop() {
  shopRow.innerHTML = '';
  fishList.filter(f => !f.locked).forEach(fish => {
    const card = makeCard(fish);
    shopRow.appendChild(card);
  });
}

function updateAffordability() {
  document.querySelectorAll('.buy-btn').forEach(btn => {
    const fish = fishList.find(f => f.id === btn.dataset.id);
    if (!fish) return;
    if (fish.isEgg) {
      btn.disabled = luckyEggHatching || state.coins < fish.cost;
      btn.textContent = luckyEggHatching ? 'Hatching...' : 'Open Egg';
      return;
    }
    const inStock = (state.stock[fish.id] ?? 0) > 0;
    btn.disabled = !inStock || state.coins < fish.cost;
    btn.textContent = inStock ? 'Buy' : `Restock at ${fish.restockAt}`;
  });
  fishList.forEach(fish => {
    if (fish.isEgg) return;
    const stockEl = document.getElementById(`stock-${fish.id}`);
    if (stockEl) stockEl.textContent = `Stock: ${state.stock[fish.id] ?? 0}`;
    const ownedEl = document.getElementById(`owned-${fish.id}`);
    if (ownedEl) ownedEl.textContent = `Owned: ${state.owned[fish.id] ?? 0}`;
  });
}

function recalcCps() {
  state.cps = fishList.reduce((sum, fish) => sum + state.owned[fish.id] * fish.cps, 0);
}

function randomInRange(min, max) {
  return min + Math.random() * (max - min);
}

function randomCoordWithMinDelta(min, max, previous, minDelta) {
  if (max - min <= minDelta) return randomInRange(min, max);
  let next = previous;
  for (let i = 0; i < 8; i += 1) {
    next = randomInRange(min, max);
    if (Math.abs(next - previous) >= minDelta) break;
  }
  return next;
}

function clearTacoTimers() {
  if (tacoShowTimer) {
    clearTimeout(tacoShowTimer);
    tacoShowTimer = null;
  }
  if (tacoHideTimer) {
    clearTimeout(tacoHideTimer);
    tacoHideTimer = null;
  }
  if (tacoEventTimer) {
    clearTimeout(tacoEventTimer);
    tacoEventTimer = null;
  }
}

function queueTacoIntroTimer(callback, delayMs) {
  const timerId = setTimeout(() => {
    tacoIntroTimers = tacoIntroTimers.filter(id => id !== timerId);
    callback();
  }, delayMs);
  tacoIntroTimers.push(timerId);
}

function clearTacoIntro() {
  tacoIntroTimers.forEach(timerId => clearTimeout(timerId));
  tacoIntroTimers = [];
  if (tacoLaunchEl) {
    tacoLaunchEl.remove();
    tacoLaunchEl = null;
  }
  if (tacoTruckEl) {
    tacoTruckEl.remove();
    tacoTruckEl = null;
  }
}

function setTacoTheme(active) {
  if (!mainSection) return;
  mainSection.classList.toggle('taco-time', active);
}

function renderTacoTimer() {
  if (!tacoTimerEl) return;
  if (!tacoEventActive || !tacoCountdownStarted || tacoEventEndsAt <= 0) {
    tacoTimerEl.hidden = true;
    return;
  }
  const remainingMs = Math.max(0, tacoEventEndsAt - Date.now());
  const remainingSec = Math.ceil(remainingMs / 1000);
  tacoTimerEl.textContent = `Taco Time: ${remainingSec}s`;
  tacoTimerEl.hidden = false;
}

function placeTacoTarget() {
  if (!mainSection || !tacoTarget) return;
  const w = mainSection.clientWidth || 600;
  const h = mainSection.clientHeight || 320;
  const size = tacoTarget.offsetWidth || 78;
  const padding = 14;
  const xMin = padding;
  const xMax = Math.max(xMin + 1, w - size - padding);
  const yMin = padding;
  const yMax = Math.max(yMin + 1, h - size - padding);
  tacoTarget.style.left = `${randomInRange(xMin, xMax)}px`;
  tacoTarget.style.top = `${randomInRange(yMin, yMax)}px`;
}

function hideTacoTarget() {
  if (!tacoEventActive || !tacoCountdownStarted) return;
  if (tacoTarget) tacoTarget.classList.remove('visible');
  tacoHideTimer = null;
  const nextShowMs = randomInRange(380, 1100);
  tacoShowTimer = setTimeout(showTacoTarget, nextShowMs);
}

function showTacoTarget() {
  if (!tacoEventActive || !tacoCountdownStarted) return;
  if (!tacoTarget || !mainSection) return;
  placeTacoTarget();
  tacoTarget.disabled = false;
  tacoTarget.classList.add('visible');
  tacoShowTimer = null;
  const visibleMs = randomInRange(780, 1700);
  tacoHideTimer = setTimeout(hideTacoTarget, visibleMs);
}

function awardTacoTurtle() {
  const tacoTurtle = fishList.find(fish => fish.id === 'tacoturtle');
  if (!tacoTurtle) return;
  state.owned.tacoturtle += 1;
  recalcCps();
  renderStats();
  addFishToTank(tacoTurtle);
  queuePersist();
}

function createTacoTarget() {
  if (tacoTarget || !mainSection) return;
  tacoTarget = document.createElement('button');
  tacoTarget.type = 'button';
  tacoTarget.className = 'taco-target';
  tacoTarget.setAttribute('aria-label', 'Catch taco');
  tacoTarget.disabled = true;
  tacoTarget.innerHTML = `<img src="${tacoSvg}" alt="" aria-hidden="true" draggable="false">`;
  tacoTarget.addEventListener('click', () => {
    if (!tacoEventActive || !tacoCountdownStarted) return;
    awardTacoTurtle();
    if (tacoHideTimer) {
      clearTimeout(tacoHideTimer);
      tacoHideTimer = null;
    }
    if (tacoShowTimer) {
      clearTimeout(tacoShowTimer);
      tacoShowTimer = null;
    }
    if (tacoTarget) tacoTarget.classList.remove('visible');
    tacoShowTimer = setTimeout(showTacoTarget, 190);
  });
  mainSection.appendChild(tacoTarget);
}

function launchIntroTacoFromTruck() {
  if (!tacoEventActive || !mainSection || !tacoTruckEl) return;
  createTacoTarget();
  if (!tacoTarget) return;

  placeTacoTarget();
  const targetX = parseFloat(tacoTarget.style.left || '0');
  const targetY = parseFloat(tacoTarget.style.top || '0');
  const startX = tacoTruckEl.offsetLeft + 28;
  const startY = tacoTruckEl.offsetTop + tacoTruckEl.offsetHeight * 0.43;

  tacoLaunchEl = document.createElement('div');
  tacoLaunchEl.className = 'taco-launch';
  tacoLaunchEl.innerHTML = `<img src="${tacoSvg}" alt="" aria-hidden="true" draggable="false">`;
  tacoLaunchEl.style.left = `${startX}px`;
  tacoLaunchEl.style.top = `${startY}px`;
  tacoLaunchEl.style.setProperty('--fly-x', `${targetX - startX}px`);
  tacoLaunchEl.style.setProperty('--fly-y', `${targetY - startY}px`);
  mainSection.appendChild(tacoLaunchEl);

  requestAnimationFrame(() => {
    if (tacoLaunchEl) tacoLaunchEl.classList.add('fly');
  });

  tacoLaunchEl.addEventListener('animationend', () => {
    if (tacoLaunchEl) {
      tacoLaunchEl.remove();
      tacoLaunchEl = null;
    }
    if (tacoTarget) {
      tacoTarget.disabled = true;
      tacoTarget.classList.add('visible');
    }
  }, { once: true });
}

function beginTacoCountdown() {
  if (!tacoEventActive || tacoCountdownStarted) return;
  tacoCountdownStarted = true;
  tacoEventEndsAt = Date.now() + TACO_EVENT_DURATION_MS;
  renderTacoTimer();

  if (tacoTarget) {
    tacoTarget.disabled = false;
    tacoTarget.classList.add('visible');
  }

  const firstVisibleMs = randomInRange(820, 1600);
  tacoHideTimer = setTimeout(hideTacoTarget, firstVisibleMs);
  tacoEventTimer = setTimeout(endTacoTimeEvent, TACO_EVENT_DURATION_MS);
}

function driveTruckAwayAndStartCountdown() {
  if (!tacoTruckEl) {
    beginTacoCountdown();
    return;
  }

  const truck = tacoTruckEl;
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    if (truck === tacoTruckEl) {
      tacoTruckEl.remove();
      tacoTruckEl = null;
    }
    beginTacoCountdown();
  };

  truck.addEventListener('transitionend', evt => {
    if (evt.propertyName === 'left') finish();
  }, { once: true });

  truck.classList.add('out');
  queueTacoIntroTimer(finish, TACO_TRUCK_DRIVE_OUT_MS + 40);
}

function playTacoIntroSequence() {
  if (!mainSection) {
    beginTacoCountdown();
    return;
  }

  clearTacoIntro();
  createTacoTarget();
  if (tacoTarget) {
    tacoTarget.classList.remove('visible');
    tacoTarget.disabled = true;
  }

  tacoTruckEl = document.createElement('div');
  tacoTruckEl.className = 'taco-truck';
  tacoTruckEl.innerHTML = `
    <div class="truck-box"><span class="truck-label">Taco Time</span></div>
    <div class="truck-cab"></div>
    <div class="truck-window"></div>
    <div class="truck-bumper"></div>
    <div class="truck-wheel truck-wheel-back"></div>
    <div class="truck-wheel truck-wheel-front"></div>
  `;
  mainSection.appendChild(tacoTruckEl);
  requestAnimationFrame(() => {
    if (tacoTruckEl) tacoTruckEl.classList.add('in');
  });

  queueTacoIntroTimer(() => {
    if (!tacoEventActive) return;
    launchIntroTacoFromTruck();
    driveTruckAwayAndStartCountdown();
  }, TACO_TRUCK_DRIVE_IN_MS + 250);
}

function endTacoTimeEvent() {
  tacoEventActive = false;
  tacoCountdownStarted = false;
  tacoEventEndsAt = 0;
  clearTacoTimers();
  clearTacoIntro();
  setTacoTheme(false);
  if (tacoTarget) {
    tacoTarget.remove();
    tacoTarget = null;
  }
  if (tacoTimerEl) {
    tacoTimerEl.hidden = true;
    tacoTimerEl.textContent = `Taco Time: ${Math.round(TACO_EVENT_DURATION_MS / 1000)}s`;
  }
  renderTacoTimer();
}

function startTacoTimeEvent() {
  if (tacoEventActive || !mainSection) return;
  tacoEventActive = true;
  tacoCountdownStarted = false;
  tacoEventEndsAt = 0;
  clearTacoTimers();
  setTacoTheme(true);
  renderTacoTimer();
  playTacoIntroSequence();
}

function maybeStartTacoTimeEvent() {
  if (tacoEventActive) return;
  const sharksOwned = state.owned.shark ?? 0;
  const milestone = Math.floor(sharksOwned / TACO_EVENT_SHARK_STEP) * TACO_EVENT_SHARK_STEP;
  if (milestone < TACO_EVENT_SHARK_STEP) return;
  if (milestone <= (state.tacoMilestone ?? 0)) return;
  state.tacoMilestone = milestone;
  queuePersist();
  startTacoTimeEvent();
}

function swim(swimmer) {
  const w = tank.clientWidth || 600;
  const h = tank.clientHeight || 320;
  const size = swimmer.offsetWidth || parseFloat(swimmer.style.width) || 80;
  const marginX = Math.max(28, size * 0.5 + 10);
  const marginY = Math.max(32, size * 0.35 + 10);
  const prev = swimmer._pos || { x: w / 2, y: h / 2 };
  const xMin = marginX;
  const xMax = Math.max(xMin + 1, w - marginX);
  const yMin = marginY;
  const yMax = Math.max(yMin + 1, h - marginY);
  const nextX = randomCoordWithMinDelta(xMin, xMax, prev.x, 56);
  const nextY = randomCoordWithMinDelta(yMin, yMax, prev.y, 28);
  const dx = nextX - prev.x;
  const dy = nextY - prev.y;
  const distance = Math.hypot(dx, dy);
  const pixelsPerSecond = 30;
  const duration = Math.min(18, Math.max(8, distance / pixelsPerSecond));
  const dir = Math.abs(dx) < 1 ? (swimmer._dir ?? 1) : (dx > 0 ? 1 : -1);
  swimmer._pos = { x: nextX, y: nextY };
  swimmer._dir = dir;
  swimmer.style.transitionDuration = `${duration}s, 120ms`;
  swimmer.style.transform = `translate(${nextX}px, ${nextY}px) scaleX(${dir})`;
}

function addFishToTank(fish) {
  if (!tank) return;
  const img = document.createElement('img');
  img.src = fish.img;
  img.alt = fish.name;
  img.draggable = false;
  img.className = `swimmer${fish.cps >= 20 ? ' fast' : ''}`;
  const base = Math.max(60, Math.min(140, 70 + fish.cps * 1.5));
  img.style.width = `${base}px`;
  const w = tank.clientWidth || 600;
  const h = tank.clientHeight || 320;
  const marginX = Math.max(28, base * 0.5 + 10);
  const marginY = Math.max(32, base * 0.35 + 10);
  const xMin = marginX;
  const xMax = Math.max(xMin + 1, w - marginX);
  const yMin = marginY;
  const yMax = Math.max(yMin + 1, h - marginY);
  const spawnX = randomInRange(xMin, xMax);
  const spawnY = randomInRange(yMin, yMax);
  img._pos = { x: spawnX, y: spawnY };
  img._dir = Math.random() < 0.5 ? 1 : -1;
  img.style.transform = `translate(${img._pos.x}px, ${img._pos.y}px) scaleX(${img._dir})`;
  img.style.transitionDuration = '0s, 120ms';
  tank.appendChild(img);
  img.addEventListener('transitionend', evt => {
    if (evt.propertyName === 'transform') swim(img);
  });
  requestAnimationFrame(() => swim(img));
}

function unlockFish(fishId) {
  const fish = fishList.find(f => f.id === fishId);
  if (!fish) return;
  fish.locked = false;
  if (!(fishId in state.owned)) state.owned[fishId] = 0;
  if (!(fishId in state.stock)) state.stock[fishId] = fish.stockCap || 0;
  rebuildShop();
  updateAffordability();
}

function startCandyMutation() {
  if (state.mutationStarted) return;
  state.mutationStarted = true;
  const bubble = document.createElement('div');
  bubble.className = 'gum-bubble';
  bubble.style.top = `${Math.random() * 40 + 20}%`;
  document.querySelector('.main').appendChild(bubble);
  bubble.addEventListener('animationend', () => {
    bubble.classList.add('pop');
    setTimeout(() => bubble.remove(), 500);
    if (!state.mutationDone) {
      state.mutationDone = true;
      unlockFish('gumfin');
      state.owned.gumfin += 1;
      state.stock.gumfin = Math.max(0, (state.stock.gumfin ?? 0) - 1);
      recalcCps();
      renderStats();
      const owned = document.getElementById('owned-gumfin');
      if (owned) owned.textContent = `Owned: ${state.owned.gumfin}`;
      addFishToTank(fishList.find(f => f.id === 'gumfin'));
      queuePersist();
    }
  }, { once: true });
}

function chooseLuckyEggPrize() {
  const weightedPrizes = [
    { id: 'puffer', weight: 60 },
    { id: 'turtle', weight: 30 },
    { id: 'shark', weight: 10 }
  ];
  const totalWeight = weightedPrizes.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const item of weightedPrizes) {
    if (roll < item.weight) return fishList.find(fish => fish.id === item.id);
    roll -= item.weight;
  }
  return fishList.find(fish => fish.id === 'puffer');
}

function hatchLuckyEgg() {
  if (luckyEggHatching) return;
  const main = document.querySelector('.main');
  if (!main) return;
  luckyEggHatching = true;
  updateAffordability();

  const prize = chooseLuckyEggPrize();
  const scene = document.createElement('div');
  scene.className = 'lucky-egg-scene';
  scene.innerHTML = `
    <div class="lucky-egg-shell">🥚</div>
    <div class="lucky-egg-prize"></div>
  `;
  main.appendChild(scene);

  setTimeout(() => {
    scene.classList.add('crack');
  }, 1400);

  setTimeout(() => {
    if (prize) {
      state.owned[prize.id] += 1;
      if (prize.id === 'shark') maybeStartTacoTimeEvent();
      recalcCps();
      const ownedEl = document.getElementById(`owned-${prize.id}`);
      if (ownedEl) ownedEl.textContent = `Owned: ${state.owned[prize.id]}`;
      addFishToTank(prize);
      const prizeEl = scene.querySelector('.lucky-egg-prize');
      if (prizeEl) prizeEl.textContent = `You hatched a ${prize.name}!`;
      queuePersist();
    }
    renderStats();
    updateAffordability();
  }, 1750);

  setTimeout(() => {
    scene.classList.add('fade');
  }, 3100);

  setTimeout(() => {
    scene.remove();
    luckyEggHatching = false;
    updateAffordability();
  }, 3650);
}

function startLuckyEggEvent() {
  if (state.luckyEggEventDone) return;
  state.luckyEggEventDone = true;
  unlockFish('luckyegg');
  const main = document.querySelector('.main');
  if (main) {
    const notice = document.createElement('div');
    notice.className = 'lucky-egg-unlock';
    notice.textContent = 'The Lucky Egg is now in the shop!';
    main.appendChild(notice);
    setTimeout(() => notice.remove(), 2400);
  }
  queuePersist();
}

function buyFish(id) {
  const fish = fishList.find(f => f.id === id);
  if (!fish || state.coins < fish.cost) return;
  if (fish.isEgg) {
    if (luckyEggHatching) return;
    state.coins -= fish.cost;
    renderStats();
    hatchLuckyEgg();
    queuePersist();
    return;
  }
  if ((state.stock[id] ?? 0) <= 0) return;
  state.coins -= fish.cost;
  state.owned[id] += 1;
  if (id === 'shark') maybeStartTacoTimeEvent();
  state.stock[id] = (state.stock[id] ?? 0) - 1;
  recalcCps();
  document.getElementById(`owned-${id}`).textContent = `Owned: ${state.owned[id]}`;
  addFishToTank(fish);
  renderStats();
  updateAffordability();
  queuePersist();
}

function spawnBubble(x, y) {
  const bubble = document.createElement('div');
  bubble.className = 'bubble';
  bubble.style.left = `${x - 7}px`;
  bubble.style.top = `${y - 7}px`;
  document.querySelector('.main').appendChild(bubble);
  setTimeout(() => bubble.remove(), 1400);
}

tapFish.addEventListener('click', e => {
  state.coins += 1;
  const rect = tapFish.getBoundingClientRect();
  spawnBubble(e.clientX - rect.left, e.clientY - rect.top + (tapFish.offsetTop - rect.top));
  renderStats();
  updateAffordability();
  queuePersist();
  if (state.coins >= 500 && !state.luckyEggEventDone) startLuckyEggEvent();
  if (state.coins >= 300 && !state.mutationDone) startCandyMutation();
});

shopRow.addEventListener('click', e => {
  if (e.target.matches('.buy-btn')) {
    buyFish(e.target.dataset.id);
  }
});

if (shopToggle) {
  shopToggle.addEventListener('click', () => {
    const isOpen = shopPanel?.classList.contains('open');
    setShopOpen(!isOpen);
  });
}

if (shopClose) {
  shopClose.addEventListener('click', () => setShopOpen(false));
}

if (shopBackdrop) {
  shopBackdrop.addEventListener('click', () => setShopOpen(false));
}

if (resetGame) {
  resetGame.addEventListener('click', () => {
    const confirmed = window.confirm('Start over and erase saved shells and fish progress?');
    if (!confirmed) return;

    const defaults = createDefaultState();
    state.coins = defaults.coins;
    state.cps = defaults.cps;
    state.owned = defaults.owned;
    state.stock = defaults.stock;
    state.mutationStarted = false;
    state.mutationDone = false;
    state.luckyEggEventDone = false;
    state.tacoMilestone = 0;
    luckyEggHatching = false;
    endTacoTimeEvent();
    resetFishLocks();
    if (tank) tank.innerHTML = '';
    document.querySelectorAll('.lucky-egg-scene, .lucky-egg-unlock').forEach(el => el.remove());
    clearSave();
    rebuildShop();
    renderStats();
    updateAffordability();
    setShopOpen(false);
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') setShopOpen(false);
});

setInterval(() => {
  renderTacoTimer();
  if (state.cps > 0) {
    state.coins += state.cps / 10;
    renderStats();
    updateAffordability();
    queuePersist();
  }
  if (state.coins >= 500 && !state.luckyEggEventDone) startLuckyEggEvent();
  if (state.coins >= 300 && !state.mutationDone) startCandyMutation();
  maybeStartTacoTimeEvent();
  let didRestock = false;
  fishList.forEach(fish => {
    if (fish.isEgg) return;
    if (fish.locked) return;
    if ((state.stock[fish.id] ?? 0) > 0) return;
    if (state.coins >= fish.restockAt) {
      state.stock[fish.id] = fish.stockCap || 0;
      didRestock = true;
    }
  });
  if (didRestock) {
    updateAffordability();
    queuePersist();
  }
}, 100);

function spawnOwnedFish() {
  fishList.forEach(fish => {
    if (fish.isEgg) return;
    const count = state.owned[fish.id] ?? 0;
    for (let i = 0; i < count; i += 1) {
      addFishToTank(fish);
    }
  });
}

recalcCps();
rebuildShop();
spawnOwnedFish();
renderStats();
updateAffordability();
renderTacoTimer();

window.addEventListener('beforeunload', () => {
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  persistNow();
});
