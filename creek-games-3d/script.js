import * as THREE from "./three.module.js";

const sceneMount = document.getElementById("sceneMount");
const engineStatus = document.getElementById("engineStatus");
const zoneName = document.getElementById("zoneName");
const zoneObjective = document.getElementById("zoneObjective");
const actionHint = document.getElementById("actionHint");
const actionButton = document.getElementById("actionButton");
const mobileActionButton = document.getElementById("mobileActionButton");
const scoreValue = document.getElementById("scoreValue");
const pikoValue = document.getElementById("pikoValue");
const houseValue = document.getElementById("houseValue");
const aquariumValue = document.getElementById("aquariumValue");
const shellValue = document.getElementById("shellValue");
const carryValue = document.getElementById("carryValue");
const ringValue = document.getElementById("ringValue");
const pikoProgress = document.getElementById("pikoProgress");
const houseProgress = document.getElementById("houseProgress");
const aquariumProgress = document.getElementById("aquariumProgress");
const ringProgress = document.getElementById("ringProgress");
const missionPiko = document.getElementById("missionPiko");
const missionHouse = document.getElementById("missionHouse");
const missionAquarium = document.getElementById("missionAquarium");
const missionRings = document.getElementById("missionRings");
const moveButtons = [...document.querySelectorAll(".pad-button")];
const jumpButtons = [...document.querySelectorAll(".mission-jump")];

const keys = Object.create(null);

const zoneDefs = {
  center: {
    name: "Creek Center",
    objective: "Pick a mission zone. Every activity adds to one shared 3D Creek Games score.",
    center: { x: 0, z: 0 },
    radius: 10
  },
  piko: {
    name: "Steal the Piko",
    objective: "Catch the moving Piko. Get close and press E before it slips away.",
    center: { x: -22, z: -8 },
    radius: 14
  },
  house: {
    name: "Build a House",
    objective: "Grab bricks from the pile and place them on the build pad one by one.",
    center: { x: 20, z: -10 },
    radius: 16
  },
  aquarium: {
    name: "Build an Aquarium",
    objective: "Collect shells from the cove and spend them to fill the tank with life.",
    center: { x: 18, z: 20 },
    radius: 16
  },
  rings: {
    name: "Bonus Ring Run",
    objective: "Run through every glowing ring for extra score and another actual 3D challenge.",
    center: { x: -22, z: 20 },
    radius: 18
  }
};

const jumpTargets = {
  piko: { x: -20.5, z: -8 },
  house: { x: 13, z: -15.2 },
  aquarium: { x: 10.2, z: 23.2 },
  rings: { x: -31, z: 18.4 }
};

const state = {
  score: 0,
  pikoCaught: 0,
  hasBrick: false,
  houseBuilt: 0,
  houseTarget: 8,
  shells: 0,
  fishPlaced: 0,
  fishTarget: 6,
  ringsCollected: 0,
  ringTarget: 5
};

const world = {
  scene: null,
  camera: null,
  renderer: null,
  clock: null,
  player: null,
  carryBrick: null,
  actionTarget: null,
  currentZoneKey: "center",
  houseBlocks: [],
  aquariumLife: [],
  rings: [],
  piko: null,
  pikoPhase: 0,
  pikoCenter: { x: zoneDefs.piko.center.x, z: zoneDefs.piko.center.z },
  brickPile: { x: 13, z: -16 },
  buildSite: { x: 22, z: -9 },
  shellPile: { x: 10, z: 24 },
  aquariumTank: { x: 22, z: 18 }
};

const houseBuildPositions = [
  { x: 19.4, y: 0.8, z: -10.2 },
  { x: 21.0, y: 0.8, z: -10.2 },
  { x: 22.6, y: 0.8, z: -10.2 },
  { x: 19.4, y: 0.8, z: -8.6 },
  { x: 22.6, y: 0.8, z: -8.6 },
  { x: 19.4, y: 2.0, z: -10.2 },
  { x: 21.0, y: 2.0, z: -10.2 },
  { x: 22.6, y: 2.0, z: -10.2 }
];

init();

function init() {
  setupScene();
  setupWorld();
  setupEvents();
  refreshHud();
  engineStatus.textContent = "3D world ready. Start a mission zone.";
  animate();
}

function setupScene() {
  world.scene = new THREE.Scene();
  world.scene.background = new THREE.Color("#b9ebff");
  world.scene.fog = new THREE.Fog("#b9ebff", 44, 112);

  world.camera = new THREE.PerspectiveCamera(56, sceneMount.clientWidth / sceneMount.clientHeight, 0.1, 220);
  world.camera.position.set(18, 18, 18);

  world.renderer = new THREE.WebGLRenderer({ antialias: true });
  world.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  world.renderer.setSize(sceneMount.clientWidth, sceneMount.clientHeight);
  world.renderer.shadowMap.enabled = true;
  world.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  sceneMount.appendChild(world.renderer.domElement);

  world.clock = new THREE.Clock();

  const hemi = new THREE.HemisphereLight("#ffffff", "#7ab7d8", 1.25);
  world.scene.add(hemi);

  const sun = new THREE.DirectionalLight("#fff4d3", 1.22);
  sun.position.set(24, 34, 14);
  sun.castShadow = true;
  sun.shadow.mapSize.set(2048, 2048);
  sun.shadow.camera.left = -60;
  sun.shadow.camera.right = 60;
  sun.shadow.camera.top = 60;
  sun.shadow.camera.bottom = -60;
  world.scene.add(sun);
}

function setupWorld() {
  createGround();
  createCenterIsland();
  createPikoZone();
  createHouseZone();
  createAquariumZone();
  createRingZone();
  createPerimeterBuildings();
  world.player = createPlayer();
  world.scene.add(world.player);
}

function createGround() {
  const base = new THREE.Mesh(
    new THREE.BoxGeometry(90, 1.4, 90),
    new THREE.MeshStandardMaterial({ color: "#f7f0ca", roughness: 0.94 })
  );
  base.position.y = -0.7;
  base.receiveShadow = true;
  world.scene.add(base);

  for (let x = -40; x <= 40; x += 4) {
    for (let z = -40; z <= 40; z += 4) {
      const tile = new THREE.Mesh(
        new THREE.BoxGeometry(3.3, 0.3, 3.3),
        new THREE.MeshStandardMaterial({
          color: (Math.abs(x + z) / 4) % 2 === 0 ? "#f8eab0" : "#d4f6ff",
          roughness: 0.96
        })
      );
      tile.position.set(x, -0.02, z);
      tile.receiveShadow = true;
      world.scene.add(tile);

      for (const dx of [-0.82, 0.82]) {
        for (const dz of [-0.82, 0.82]) {
          const stud = new THREE.Mesh(
            new THREE.CylinderGeometry(0.36, 0.36, 0.18, 18),
            new THREE.MeshStandardMaterial({ color: "#fff8d7", roughness: 0.84 })
          );
          stud.position.set(x + dx, 0.16, z + dz);
          stud.castShadow = true;
          stud.receiveShadow = true;
          world.scene.add(stud);
        }
      }
    }
  }
}

function createCenterIsland() {
  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(8.2, 10.2, 1.8, 10),
    new THREE.MeshStandardMaterial({ color: "#ff8eb1", roughness: 0.8 })
  );
  hub.position.y = 0.9;
  hub.castShadow = true;
  hub.receiveShadow = true;
  world.scene.add(hub);

  const tower = new THREE.Mesh(
    new THREE.BoxGeometry(5.8, 4.8, 5.8),
    new THREE.MeshStandardMaterial({ color: "#fff6db", roughness: 0.76 })
  );
  tower.position.y = 4;
  tower.castShadow = true;
  world.scene.add(tower);

  const sign = createTextPlane("CREEK GAMES 3D", "#173553", "#fff1b9", 560, 132, 42);
  sign.position.set(0, 6, 0);
  sign.rotation.x = -0.12;
  world.scene.add(sign);
}

function createPikoZone() {
  createZonePad(zoneDefs.piko.center.x, zoneDefs.piko.center.z, "#88ec97", 13, 1.2);
  createLabel("STEAL THE PIKO", zoneDefs.piko.center.x, 8, zoneDefs.piko.center.z - 10.4, 420, 106, "#173653", "#f7ffcf");

  for (let i = 0; i < 14; i += 1) {
    const fence = new THREE.Mesh(
      new THREE.BoxGeometry(i < 7 ? 2.4 : 0.5, 1.4, i < 7 ? 0.5 : 2.4),
      new THREE.MeshStandardMaterial({ color: "#f0d58f", roughness: 0.9 })
    );
    if (i < 7) {
      fence.position.set(-28 + i * 2.3, 0.72, -14.4);
    } else {
      fence.position.set(-28, 0.72, -14.4 + (i - 7) * 2.3);
    }
    fence.castShadow = true;
    fence.receiveShadow = true;
    world.scene.add(fence);
  }

  world.piko = createPiko();
  world.scene.add(world.piko);
  respawnPiko();
}

function createHouseZone() {
  createZonePad(zoneDefs.house.center.x, zoneDefs.house.center.z, "#ffcf6e", 14, 1.2);
  createLabel("BUILD A HOUSE", zoneDefs.house.center.x, 8, zoneDefs.house.center.z - 12, 400, 106, "#173653", "#fff6c8");

  const foundation = new THREE.Mesh(
    new THREE.BoxGeometry(7.4, 0.7, 6.8),
    new THREE.MeshStandardMaterial({ color: "#e5e9ef", roughness: 0.9 })
  );
  foundation.position.set(21, 0.35, -9.4);
  foundation.receiveShadow = true;
  world.scene.add(foundation);

  const plotMark = new THREE.Mesh(
    new THREE.BoxGeometry(7.8, 0.14, 7.2),
    new THREE.MeshStandardMaterial({ color: "#9dd8ff", roughness: 0.95 })
  );
  plotMark.position.set(21, 0.08, -9.4);
  plotMark.receiveShadow = true;
  world.scene.add(plotMark);

  for (let stack = 0; stack < 5; stack += 1) {
    const brick = createBrick("#ff8d72");
    brick.position.set(12.2 + (stack % 2) * 1.7, 0.55 + Math.floor(stack / 2) * 0.7, -16.2 + (stack % 2) * 0.1);
    world.scene.add(brick);
  }

  createLabel("BRICK PILE", 13.2, 4.6, -16.2, 230, 84, "#173653", "#ffffff");
}

function createAquariumZone() {
  createZonePad(zoneDefs.aquarium.center.x, zoneDefs.aquarium.center.z, "#79dcff", 14, 1.2);
  createLabel("BUILD AN AQUARIUM", zoneDefs.aquarium.center.x, 8, zoneDefs.aquarium.center.z - 12, 460, 106, "#173653", "#dfffff");

  const sand = new THREE.Mesh(
    new THREE.CylinderGeometry(7.6, 9.2, 1.2, 10),
    new THREE.MeshStandardMaterial({ color: "#f4df9b", roughness: 0.96 })
  );
  sand.position.set(18, 0.6, 20);
  sand.receiveShadow = true;
  sand.castShadow = true;
  world.scene.add(sand);

  const tankFrameMaterial = new THREE.MeshStandardMaterial({ color: "#7cc7ff", roughness: 0.4, metalness: 0.08 });
  const tankGlass = new THREE.Mesh(
    new THREE.BoxGeometry(5.8, 4.1, 3.4),
    new THREE.MeshPhysicalMaterial({
      color: "#9ee8ff",
      transparent: true,
      opacity: 0.24,
      roughness: 0.04,
      transmission: 0.3
    })
  );
  tankGlass.position.set(22, 3.2, 18);
  tankGlass.castShadow = true;
  world.scene.add(tankGlass);

  const tankBase = new THREE.Mesh(new THREE.BoxGeometry(6.2, 0.8, 3.8), tankFrameMaterial);
  tankBase.position.set(22, 0.4, 18);
  tankBase.castShadow = true;
  world.scene.add(tankBase);

  const water = new THREE.Mesh(
    new THREE.BoxGeometry(5.2, 2.7, 2.8),
    new THREE.MeshPhysicalMaterial({
      color: "#4fd7ff",
      transparent: true,
      opacity: 0.28,
      roughness: 0.06,
      transmission: 0.18
    })
  );
  water.position.set(22, 2.3, 18);
  world.scene.add(water);

  for (let shellIndex = 0; shellIndex < 6; shellIndex += 1) {
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(0.34, 12, 12),
      new THREE.MeshStandardMaterial({ color: "#fff6d5", roughness: 0.8 })
    );
    shell.scale.set(1.2, 0.55, 0.9);
    shell.position.set(8.5 + (shellIndex % 3) * 0.9, 0.26, 23 + Math.floor(shellIndex / 3) * 0.75);
    shell.castShadow = true;
    world.scene.add(shell);
  }

  createLabel("SHELL COVE", 10.1, 4.8, 23.5, 240, 84, "#173653", "#ffffff");
}

function createRingZone() {
  createZonePad(zoneDefs.rings.center.x, zoneDefs.rings.center.z, "#b28dff", 16, 1.2);
  createLabel("BONUS RING RUN", zoneDefs.rings.center.x, 8, zoneDefs.rings.center.z - 13, 420, 106, "#173653", "#efe5ff");

  const ringPoints = [
    { x: -31, z: 18 },
    { x: -26, z: 23 },
    { x: -21, z: 19 },
    { x: -16, z: 24 },
    { x: -11, z: 19 }
  ];

  ringPoints.forEach((point) => {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(1.75, 0.28, 18, 40),
      new THREE.MeshStandardMaterial({
        color: "#ffd36c",
        emissive: "#ffd36c",
        emissiveIntensity: 0.28,
        roughness: 0.32
      })
    );
    ring.position.set(point.x, 2.5, point.z);
    ring.rotation.y = Math.PI / 2;
    ring.castShadow = true;
    world.scene.add(ring);
    world.rings.push({ mesh: ring, collected: false });
  });
}

function createPerimeterBuildings() {
  const colors = ["#ffb972", "#89d6ff", "#fb79b0", "#8ae2b0", "#b8a3ff"];
  for (let index = 0; index < 28; index += 1) {
    const angle = (index / 28) * Math.PI * 2;
    const radius = 43 + (index % 3) * 2;
    const width = 4 + (index % 4);
    const depth = 4 + ((index + 1) % 3);
    const height = 5 + ((index * 2) % 8);
    const block = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color: colors[index % colors.length], roughness: 0.92 })
    );
    block.position.set(Math.cos(angle) * radius, height / 2, Math.sin(angle) * radius);
    block.rotation.y = angle;
    block.castShadow = true;
    block.receiveShadow = true;
    world.scene.add(block);
  }
}

function createZonePad(x, z, color, radius, height) {
  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(radius, radius + 1.8, height, 12),
    new THREE.MeshStandardMaterial({ color, roughness: 0.85 })
  );
  pad.position.set(x, height / 2, z);
  pad.receiveShadow = true;
  pad.castShadow = true;
  world.scene.add(pad);
}

function createBrick(color) {
  const brick = new THREE.Mesh(
    new THREE.BoxGeometry(1.4, 0.6, 0.8),
    new THREE.MeshStandardMaterial({ color, roughness: 0.78 })
  );
  brick.castShadow = true;
  brick.receiveShadow = true;
  return brick;
}

function createPiko() {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(1.6, 1.4, 1.5),
    new THREE.MeshStandardMaterial({ color: "#ffd05c", roughness: 0.8 })
  );
  body.position.y = 1.3;
  body.castShadow = true;
  group.add(body);

  const head = new THREE.Mesh(
    new THREE.BoxGeometry(1.2, 1.1, 1.1),
    new THREE.MeshStandardMaterial({ color: "#ffe18d", roughness: 0.82 })
  );
  head.position.set(0, 2.1, 0.1);
  head.castShadow = true;
  group.add(head);

  const earMaterial = new THREE.MeshStandardMaterial({ color: "#ff8cb0", roughness: 0.84 });
  const leftEar = new THREE.Mesh(new THREE.BoxGeometry(0.22, 1.1, 0.22), earMaterial);
  leftEar.position.set(-0.26, 3.05, 0);
  leftEar.castShadow = true;
  group.add(leftEar);

  const rightEar = leftEar.clone();
  rightEar.position.x = 0.26;
  group.add(rightEar);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.1, 18),
    new THREE.MeshBasicMaterial({ color: "#33566f", transparent: true, opacity: 0.18 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.04;
  group.add(shadow);

  return group;
}

function createPlayer() {
  const group = new THREE.Group();
  group.position.set(0, 0, 8);

  const shirtMaterial = new THREE.MeshStandardMaterial({ color: "#2c7ff8", roughness: 0.78 });
  const pantsMaterial = new THREE.MeshStandardMaterial({ color: "#324a65", roughness: 0.86 });
  const skinMaterial = new THREE.MeshStandardMaterial({ color: "#ffd4a6", roughness: 0.9 });
  const hairMaterial = new THREE.MeshStandardMaterial({ color: "#402a21", roughness: 0.95 });

  const torso = new THREE.Mesh(new THREE.BoxGeometry(1.9, 2.2, 1.2), shirtMaterial);
  torso.position.y = 3.1;
  torso.castShadow = true;
  group.add(torso);

  const hips = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 1.1), pantsMaterial);
  hips.position.y = 1.95;
  hips.castShadow = true;
  group.add(hips);

  const head = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.45, 1.35), skinMaterial);
  head.position.y = 5.15;
  head.castShadow = true;
  group.add(head);

  const hairCap = new THREE.Mesh(new THREE.BoxGeometry(1.48, 0.42, 1.43), hairMaterial);
  hairCap.position.y = 5.95;
  hairCap.castShadow = true;
  group.add(hairCap);

  const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.55, 2, 0.55), shirtMaterial);
  leftArm.position.set(-1.25, 3, 0);
  leftArm.castShadow = true;
  group.add(leftArm);

  const rightArm = leftArm.clone();
  rightArm.position.x = 1.25;
  group.add(rightArm);

  const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.65, 2, 0.65), pantsMaterial);
  leftLeg.position.set(-0.46, 0.9, 0);
  leftLeg.castShadow = true;
  group.add(leftLeg);

  const rightLeg = leftLeg.clone();
  rightLeg.position.x = 0.46;
  group.add(rightLeg);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(1.55, 24),
    new THREE.MeshBasicMaterial({ color: "#2d4a62", transparent: true, opacity: 0.18 })
  );
  shadow.rotation.x = -Math.PI / 2;
  shadow.position.y = 0.04;
  group.add(shadow);

  world.carryBrick = createBrick("#ff7458");
  world.carryBrick.position.set(1.25, 3.65, 0.68);
  world.carryBrick.visible = false;
  group.add(world.carryBrick);

  group.userData = { leftArm, rightArm, leftLeg, rightLeg };
  return group;
}

function createLabel(text, x, y, z, width, height, color, background) {
  const label = createTextPlane(text, color, background, width, height, 38);
  label.position.set(x, y, z);
  world.scene.add(label);
  return label;
}

function createTextPlane(text, color, background, width, height, fontSize) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");

  context.fillStyle = background;
  roundRect(context, 0, 0, width, height, Math.min(34, height * 0.28));
  context.fill();

  context.fillStyle = color;
  context.font = `800 ${fontSize}px "DM Sans", sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText(text, width / 2, height / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;

  return new THREE.Mesh(
    new THREE.PlaneGeometry(width / 92, height / 92),
    new THREE.MeshBasicMaterial({ map: texture, transparent: true })
  );
}

function roundRect(context, x, y, width, height, radius) {
  context.beginPath();
  context.moveTo(x + radius, y);
  context.lineTo(x + width - radius, y);
  context.quadraticCurveTo(x + width, y, x + width, y + radius);
  context.lineTo(x + width, y + height - radius);
  context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  context.lineTo(x + radius, y + height);
  context.quadraticCurveTo(x, y + height, x, y + height - radius);
  context.lineTo(x, y + radius);
  context.quadraticCurveTo(x, y, x + radius, y);
  context.closePath();
}

function setupEvents() {
  window.addEventListener("resize", handleResize);

  document.addEventListener("keydown", (event) => {
    const key = normalizeKey(event.key);
    if (!key) {
      return;
    }
    keys[key] = true;
    if (key === "KeyE") {
      event.preventDefault();
      useAction();
    }
  });

  document.addEventListener("keyup", (event) => {
    const key = normalizeKey(event.key);
    if (key) {
      keys[key] = false;
    }
  });

  actionButton.addEventListener("click", useAction);
  mobileActionButton.addEventListener("click", useAction);

  moveButtons.forEach((button) => {
    const mappedKey = normalizeKey(button.dataset.key);
    const release = () => {
      keys[mappedKey] = false;
      button.classList.remove("is-held");
    };

    button.addEventListener("pointerdown", () => {
      keys[mappedKey] = true;
      button.classList.add("is-held");
    });
    button.addEventListener("pointerup", release);
    button.addEventListener("pointercancel", release);
    button.addEventListener("pointerleave", release);
  });

  jumpButtons.forEach((button) => {
    button.addEventListener("click", () => {
      jumpToZone(button.dataset.zone);
    });
  });
}

function normalizeKey(key) {
  const lower = key.toLowerCase();
  if (lower === "w" || key === "ArrowUp") {
    return "ArrowUp";
  }
  if (lower === "a" || key === "ArrowLeft") {
    return "ArrowLeft";
  }
  if (lower === "s" || key === "ArrowDown") {
    return "ArrowDown";
  }
  if (lower === "d" || key === "ArrowRight") {
    return "ArrowRight";
  }
  if (lower === "e") {
    return "KeyE";
  }
  return "";
}

function jumpToZone(zoneKey) {
  const target = jumpTargets[zoneKey];
  if (!target || !world.player) {
    return;
  }
  world.player.position.set(target.x, 0, target.z);
  setEngineStatus(`Jumped to ${zoneDefs[zoneKey].name}.`);
  updateActionTarget();
  refreshHud();
}

function useAction() {
  if (!world.actionTarget) {
    return;
  }
  world.actionTarget.perform();
  updateActionTarget();
  refreshHud();
}

function handleResize() {
  if (!world.renderer || !world.camera) {
    return;
  }
  world.camera.aspect = sceneMount.clientWidth / sceneMount.clientHeight;
  world.camera.updateProjectionMatrix();
  world.renderer.setSize(sceneMount.clientWidth, sceneMount.clientHeight);
}

function animate() {
  requestAnimationFrame(animate);

  const delta = Math.min(world.clock.getDelta(), 0.033);
  const elapsed = world.clock.elapsedTime;

  updatePlayer(delta, elapsed);
  updatePiko(elapsed);
  updateRings(elapsed);
  updateAquariumLife(elapsed);
  updateZone();
  updateActionTarget();
  updateCamera(delta);
  refreshHud();
  world.renderer.render(world.scene, world.camera);
}

function updatePlayer(delta, elapsed) {
  const move = new THREE.Vector3(
    (keys.ArrowRight ? 1 : 0) - (keys.ArrowLeft ? 1 : 0),
    0,
    (keys.ArrowDown ? 1 : 0) - (keys.ArrowUp ? 1 : 0)
  );

  const isMoving = move.lengthSq() > 0;
  if (isMoving) {
    move.normalize();
    world.player.position.addScaledVector(move, 10 * delta);
    world.player.position.x = THREE.MathUtils.clamp(world.player.position.x, -38, 38);
    world.player.position.z = THREE.MathUtils.clamp(world.player.position.z, -38, 38);
    const targetRotation = Math.atan2(move.x, move.z);
    world.player.rotation.y = THREE.MathUtils.lerp(world.player.rotation.y, targetRotation, 0.18);
  }

  const swing = isMoving ? Math.sin(elapsed * 11) * 0.7 : 0;
  world.player.userData.leftArm.rotation.x = swing;
  world.player.userData.rightArm.rotation.x = -swing;
  world.player.userData.leftLeg.rotation.x = -swing;
  world.player.userData.rightLeg.rotation.x = swing;

  world.carryBrick.visible = state.hasBrick;
}

function updateCamera(delta) {
  const target = new THREE.Vector3(world.player.position.x + 14, 16, world.player.position.z + 14);
  world.camera.position.lerp(target, 1 - Math.pow(0.001, delta));
  world.camera.lookAt(world.player.position.x, world.player.position.y + 3.2, world.player.position.z);
}

function updateZone() {
  let bestZoneKey = "center";
  let bestDistance = Infinity;
  const playerPos = world.player.position;

  Object.entries(zoneDefs).forEach(([key, zone]) => {
    const distance = Math.hypot(playerPos.x - zone.center.x, playerPos.z - zone.center.z);
    if (distance < zone.radius && distance < bestDistance) {
      bestDistance = distance;
      bestZoneKey = key;
    }
  });

  world.currentZoneKey = bestZoneKey;
}

function updateActionTarget() {
  const interactions = [];
  const playerPos = world.player.position;

  const pikoDistance = playerPos.distanceTo(world.piko.position);
  if (pikoDistance < 3.4) {
    interactions.push({
      distance: pikoDistance,
      label: "Steal Piko",
      hint: "Press E to catch the moving Piko.",
      perform: stealPiko
    });
  }

  const brickDistance = planarDistance(playerPos, world.brickPile);
  if (!state.hasBrick && brickDistance < 4.2 && state.houseBuilt < state.houseTarget) {
    interactions.push({
      distance: brickDistance,
      label: "Pick Brick",
      hint: "Press E to grab a house brick from the pile.",
      perform: pickBrick
    });
  }

  const buildDistance = planarDistance(playerPos, world.buildSite);
  if (state.hasBrick && buildDistance < 5.2 && state.houseBuilt < state.houseTarget) {
    interactions.push({
      distance: buildDistance,
      label: "Place Brick",
      hint: "Press E to place your carried brick on the house frame.",
      perform: placeBrick
    });
  }

  const shellDistance = planarDistance(playerPos, world.shellPile);
  if (shellDistance < 4.2) {
    interactions.push({
      distance: shellDistance,
      label: "Collect Shell",
      hint: "Press E to collect a shell for the aquarium.",
      perform: collectShell
    });
  }

  const tankDistance = planarDistance(playerPos, world.aquariumTank);
  if (state.shells > 0 && state.fishPlaced < state.fishTarget && tankDistance < 5.4) {
    interactions.push({
      distance: tankDistance,
      label: "Add To Aquarium",
      hint: "Press E to spend one shell and add new life to the tank.",
      perform: placeAquariumLife
    });
  }

  interactions.sort((a, b) => a.distance - b.distance);
  world.actionTarget = interactions[0] ?? null;
}

function planarDistance(a, b) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

function stealPiko() {
  state.pikoCaught += 1;
  state.score += 120;
  setEngineStatus(`Piko stolen. Total Pikos: ${state.pikoCaught}.`);
  respawnPiko();
}

function respawnPiko() {
  world.pikoPhase = Math.random() * Math.PI * 2;
  const angle = Math.random() * Math.PI * 2;
  const radius = 2 + Math.random() * 4.2;
  world.piko.position.set(
    world.pikoCenter.x + Math.cos(angle) * radius,
    1.15,
    world.pikoCenter.z + Math.sin(angle) * radius
  );
}

function updatePiko(elapsed) {
  const motionX = Math.cos(elapsed * 0.9 + world.pikoPhase) * 4.3 + Math.sin(elapsed * 1.7 + world.pikoPhase) * 1.8;
  const motionZ = Math.sin(elapsed * 1.1 + world.pikoPhase) * 3.8 + Math.cos(elapsed * 1.4 + world.pikoPhase) * 1.2;
  world.piko.position.x = world.pikoCenter.x + motionX;
  world.piko.position.z = world.pikoCenter.z + motionZ;
  world.piko.position.y = 1.2 + Math.abs(Math.sin(elapsed * 3.6 + world.pikoPhase)) * 0.28;
  world.piko.rotation.y += 0.03;
}

function pickBrick() {
  if (state.hasBrick || state.houseBuilt >= state.houseTarget) {
    return;
  }
  state.hasBrick = true;
  setEngineStatus("Picked up a brick. Bring it to the house pad.");
}

function placeBrick() {
  if (!state.hasBrick || state.houseBuilt >= state.houseTarget) {
    return;
  }

  const nextPosition = houseBuildPositions[state.houseBuilt];
  const block = createBrick(state.houseBuilt >= 5 ? "#ff6f6f" : "#ffd46f");
  block.position.set(nextPosition.x, nextPosition.y, nextPosition.z);
  world.scene.add(block);
  world.houseBlocks.push(block);

  state.hasBrick = false;
  state.houseBuilt += 1;
  state.score += 70;

  if (state.houseBuilt === state.houseTarget) {
    addHouseRoof();
    state.score += 180;
    setEngineStatus("House complete. You finished the build zone.");
  } else {
    setEngineStatus(`House piece placed. ${state.houseBuilt} of ${state.houseTarget} done.`);
  }
}

function addHouseRoof() {
  const roofLeft = new THREE.Mesh(
    new THREE.BoxGeometry(3.6, 0.55, 7.2),
    new THREE.MeshStandardMaterial({ color: "#ff8b5f", roughness: 0.84 })
  );
  roofLeft.position.set(20.1, 3.35, -9.4);
  roofLeft.rotation.z = Math.PI / 7;
  roofLeft.castShadow = true;
  world.scene.add(roofLeft);

  const roofRight = roofLeft.clone();
  roofRight.position.x = 21.9;
  roofRight.rotation.z = -Math.PI / 7;
  world.scene.add(roofRight);
}

function collectShell() {
  state.shells += 1;
  state.score += 12;
  setEngineStatus(`Shell collected. You now have ${state.shells}.`);
}

function placeAquariumLife() {
  if (state.shells <= 0 || state.fishPlaced >= state.fishTarget) {
    return;
  }

  state.shells -= 1;
  state.fishPlaced += 1;
  state.score += 82;

  const index = state.fishPlaced - 1;
  const life = createAquariumCreature(index);
  world.scene.add(life.group);
  world.aquariumLife.push(life);

  if (state.fishPlaced === state.fishTarget) {
    state.score += 200;
    setEngineStatus("Aquarium complete. The tank is full of life.");
  } else {
    setEngineStatus(`Aquarium upgraded. ${state.fishPlaced} of ${state.fishTarget} added.`);
  }
}

function createAquariumCreature(index) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(
    new THREE.SphereGeometry(0.42, 14, 14),
    new THREE.MeshStandardMaterial({
      color: ["#ff9b64", "#7df0ff", "#ff72a9", "#93ff94", "#ffd26a", "#9d8fff"][index % 6],
      roughness: 0.76
    })
  );
  body.scale.set(1.4, 0.9, 0.7);
  body.castShadow = true;
  group.add(body);

  const tail = new THREE.Mesh(
    new THREE.ConeGeometry(0.26, 0.55, 4),
    new THREE.MeshStandardMaterial({ color: "#ffffff", roughness: 0.72 })
  );
  tail.rotation.z = Math.PI / 2;
  tail.position.x = -0.54;
  tail.castShadow = true;
  group.add(tail);

  const baseX = 20.3 + (index % 3) * 0.95;
  const baseY = 1.8 + Math.floor(index / 3) * 0.72;
  const baseZ = 17.2 + (index % 2) * 0.75;
  group.position.set(baseX, baseY, baseZ);

  return {
    group,
    baseX,
    baseY,
    baseZ,
    phase: index * 1.3
  };
}

function updateAquariumLife(elapsed) {
  world.aquariumLife.forEach((life, index) => {
    life.group.position.x = life.baseX + Math.sin(elapsed * 1.6 + life.phase) * 0.18;
    life.group.position.y = life.baseY + Math.sin(elapsed * 2 + life.phase) * 0.12;
    life.group.position.z = life.baseZ + Math.cos(elapsed * 1.2 + index) * 0.12;
    life.group.rotation.y = Math.sin(elapsed * 3 + life.phase) * 0.35;
  });
}

function updateRings(elapsed) {
  world.rings.forEach((ring, index) => {
    if (!ring.collected) {
      ring.mesh.rotation.z += 0.04;
      ring.mesh.position.y = 2.4 + Math.sin(elapsed * 2.4 + index) * 0.18;

      if (planarDistance(world.player.position, ring.mesh.position) < 2.2) {
        ring.collected = true;
        ring.mesh.visible = false;
        state.ringsCollected += 1;
        state.score += 45;
        if (state.ringsCollected === state.ringTarget) {
          state.score += 160;
          setEngineStatus("Ring run cleared. Bonus zone complete.");
        } else {
          setEngineStatus(`Bonus ring collected. ${state.ringsCollected} of ${state.ringTarget}.`);
        }
      }
    }
  });
}

function setEngineStatus(message) {
  engineStatus.textContent = message;
}

function refreshHud() {
  const zone = zoneDefs[world.currentZoneKey];
  zoneName.textContent = zone.name;
  zoneObjective.textContent = zone.objective;

  if (world.actionTarget) {
    actionHint.textContent = world.actionTarget.hint;
    actionButton.textContent = world.actionTarget.label;
    mobileActionButton.textContent = world.actionTarget.label;
    actionButton.disabled = false;
    mobileActionButton.disabled = false;
  } else {
    actionHint.textContent = "No action nearby";
    actionButton.textContent = "Use Action";
    mobileActionButton.textContent = "Use Action";
    actionButton.disabled = true;
    mobileActionButton.disabled = true;
  }

  scoreValue.textContent = String(state.score);
  pikoValue.textContent = String(state.pikoCaught);
  houseValue.textContent = `${state.houseBuilt} / ${state.houseTarget}`;
  aquariumValue.textContent = `${state.fishPlaced} / ${state.fishTarget}`;
  shellValue.textContent = String(state.shells);
  carryValue.textContent = state.hasBrick ? "Brick" : "Nothing";
  ringValue.textContent = `${state.ringsCollected} / ${state.ringTarget}`;

  pikoProgress.textContent = `${state.pikoCaught} caught`;
  houseProgress.textContent = `${state.houseBuilt} / ${state.houseTarget} built`;
  aquariumProgress.textContent = `${state.fishPlaced} / ${state.fishTarget} filled`;
  ringProgress.textContent = `${state.ringsCollected} / ${state.ringTarget} rings`;

  missionPiko.classList.toggle("complete", state.pikoCaught >= 3);
  missionHouse.classList.toggle("complete", state.houseBuilt >= state.houseTarget);
  missionAquarium.classList.toggle("complete", state.fishPlaced >= state.fishTarget);
  missionRings.classList.toggle("complete", state.ringsCollected >= state.ringTarget);
}
