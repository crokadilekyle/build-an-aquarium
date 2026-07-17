const games = [
  {
    title: "Creek Games 3D",
    href: "../creek-games-3d/",
    description: "A real 3D brick mission world with Steal the Piko, Build a House, Build an Aquarium, and bonus ring runs.",
    icon: "🧱",
    creator: "KyleBuilder",
    tags: ["3d", "builder", "world"],
    visits: 48210,
    likes: 9420,
    players: 38
  },
  {
    title: "Build an Aquarium",
    href: "../build-an-aquarium/",
    description: "Grow a clicker tank with shells, fish unlocks, and steady underwater progress.",
    icon: "🐠",
    creator: "Creek Labs",
    tags: ["builder", "arcade"],
    visits: 32700,
    likes: 6100,
    players: 24
  },
  {
    title: "Dance Master",
    href: "../dance-master/",
    description: "Rhythm battles with random routines, AI rivals, and score-chasing runs.",
    icon: "🕺",
    creator: "KyleBuilder",
    tags: ["arcade"],
    visits: 24100,
    likes: 5200,
    players: 16
  },
  {
    title: "Race Chase",
    href: "../race-chase/",
    description: "Drive around a big city, run missions, and build out your garage.",
    icon: "🏎️",
    creator: "TurboCreek",
    tags: ["world", "3d"],
    visits: 18800,
    likes: 4400,
    players: 12
  },
  {
    title: "Royale",
    href: "../royale/",
    description: "A battle royale prototype with skins, emotes, and quick match loops.",
    icon: "🛡️",
    creator: "Creek Labs",
    tags: ["arcade", "world"],
    visits: 14600,
    likes: 3700,
    players: 11
  },
  {
    title: "Stickman Bladers",
    href: "../stickman-bladers/",
    description: "Skate down mountain runs and chase cleaner, bigger trick landings.",
    icon: "🛹",
    creator: "HillBrick",
    tags: ["arcade"],
    visits: 13100,
    likes: 2900,
    players: 9
  },
  {
    title: "Alongus",
    href: "../alongus/",
    description: "Explore a big ship in a toy-brick crewmate survival setup.",
    icon: "🚀",
    creator: "Bricky Space",
    tags: ["world", "3d"],
    visits: 11440,
    likes: 2400,
    players: 7
  },
  {
    title: "Catch a Brainrot",
    href: "../catch-a-brainrot/",
    description: "Fast, silly, high-energy arcade chaos with goofy reactions.",
    icon: "🧠",
    creator: "Chaos Creek",
    tags: ["arcade"],
    visits: 9200,
    likes: 1800,
    players: 5
  }
];

const creators = [
  { name: "KyleBuilder", role: "3D world builder", followers: 8214, focus: "Creek Games 3D, Dance Master", badge: "KB" },
  { name: "Creek Labs", role: "platform team", followers: 6010, focus: "Aquarium systems and royale updates", badge: "CL" },
  { name: "TurboCreek", role: "driving designer", followers: 3480, focus: "race missions and free-roam worlds", badge: "TC" },
  { name: "HillBrick", role: "arcade level creator", followers: 2290, focus: "skate stages and fast challenge loops", badge: "HB" }
];

const formatNumber = (value) => new Intl.NumberFormat("en-US").format(value);
const totalVisits = games.reduce((sum, game) => sum + game.visits, 0);

function gameCardMarkup(game, compact = false) {
  const tagText = game.tags.map((tag) => tag.toUpperCase()).join(" · ");
  return `
    <article class="${compact ? "game-card" : "catalog-card"}" data-tags="${game.tags.join(" ")}">
      <div class="${compact ? "game-card-head" : "catalog-head"}">
        <div class="card-icon" aria-hidden="true">${game.icon}</div>
        <span class="${compact ? "game-meta" : "catalog-meta"}">${tagText}</span>
      </div>
      <h3>${game.title}</h3>
      <p>${game.description}</p>
      <div class="${compact ? "game-card-footer" : "catalog-footer"}">
        <div class="metric-strip">
          <span>${formatNumber(game.visits)} visits</span>
          <span>${formatNumber(game.likes)} likes</span>
          <span>${game.players} playing</span>
        </div>
        <div class="catalog-actions">
          <a class="game-launch" href="${game.href}">Play</a>
        </div>
      </div>
    </article>
  `;
}

function renderHome() {
  const gameCountNode = document.getElementById("heroGameCount");
  const visitCountNode = document.getElementById("heroVisitCount");
  const featuredGamesNode = document.getElementById("featuredGames");
  const creatorListNode = document.getElementById("creatorList");

  if (!gameCountNode || !featuredGamesNode || !creatorListNode || !visitCountNode) {
    return;
  }

  gameCountNode.textContent = String(games.length);
  visitCountNode.textContent = formatNumber(totalVisits);
  featuredGamesNode.innerHTML = games.slice(0, 4).map((game) => gameCardMarkup(game, true)).join("");
  creatorListNode.innerHTML = creators.map((creator) => `
    <article class="creator-item">
      <div class="creator-avatar">${creator.badge}</div>
      <div>
        <strong>${creator.name}</strong>
        <div class="creator-role">${creator.role}</div>
        <p>${creator.focus}</p>
        <div class="metric-strip">
          <span>${formatNumber(creator.followers)} followers</span>
        </div>
      </div>
    </article>
  `).join("");
}

function renderGames() {
  const catalogGrid = document.getElementById("catalogGrid");
  if (!catalogGrid) {
    return;
  }

  catalogGrid.innerHTML = games.map((game) => gameCardMarkup(game, false)).join("");

  const filterButtons = [...document.querySelectorAll(".filter-chip")];
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((chip) => chip.classList.toggle("active", chip === button));

      [...catalogGrid.children].forEach((card) => {
        const matches = filter === "all" || card.dataset.tags.includes(filter);
        card.hidden = !matches;
      });
    });
  });
}

function renderProfile() {
  const profileStats = document.getElementById("profileStats");
  const favoriteList = document.getElementById("favoriteList");
  if (!profileStats || !favoriteList) {
    return;
  }

  profileStats.innerHTML = `
    <article class="profile-stat">
      <span>Favorites</span>
      <strong>12</strong>
    </article>
    <article class="profile-stat">
      <span>Total Visits</span>
      <strong>${formatNumber(91400)}</strong>
    </article>
    <article class="profile-stat">
      <span>Followers</span>
      <strong>${formatNumber(8214)}</strong>
    </article>
    <article class="profile-stat">
      <span>Published Worlds</span>
      <strong>4</strong>
    </article>
  `;

  favoriteList.innerHTML = games.slice(0, 4).map((game) => `
    <article class="favorite-card">
      <div class="card-icon" aria-hidden="true">${game.icon}</div>
      <div>
        <strong>${game.title}</strong>
        <p>${game.description}</p>
        <div class="metric-strip">
          <span>${formatNumber(game.likes)} likes</span>
          <span>by ${game.creator}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function renderCreate() {
  const dashboardGameList = document.getElementById("dashboardGameList");
  if (!dashboardGameList) {
    return;
  }

  dashboardGameList.innerHTML = games.slice(0, 5).map((game, index) => `
    <article class="dashboard-game">
      <div class="card-icon" aria-hidden="true">${game.icon}</div>
      <div>
        <strong>${game.title}</strong>
        <p>${game.description}</p>
        <div class="metric-strip">
          <span>${formatNumber(game.visits)} visits</span>
          <span>${Math.max(84, 97 - index * 3)}% health</span>
          <span>${game.players} live</span>
        </div>
      </div>
    </article>
  `).join("");
}

const page = document.body.dataset.page;
if (page === "home") {
  renderHome();
}
if (page === "games") {
  renderGames();
}
if (page === "profile") {
  renderProfile();
}
if (page === "create") {
  renderCreate();
}
