const BASE_URL = "https://statsapi.mlb.com/api/v1/teams";

const DOMselectors = {
  container: document.querySelector(".container"),
};

async function getTeamRoster(teamId) {
  const ROSTER_URL = `https://statsapi.mlb.com/api/v1/teams/${teamId}/roster`;
  try {
    const response = await fetch(ROSTER_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const players = data.roster;

    DOMselectors.container.innerHTML = "";

    players.forEach((player) => {
      console.log(player.person.fullName);
      const cardHTML = createCard(player);
      DOMselectors.container.innerHTML += cardHTML;
    });

    console.log("Full roster data:", players);
  } catch (error) {
    console.log("Error fetching team roster:", error);
  }
}

async function getPlayer(name) {
  const BASE_URL = "https://statsapi.mlb.com/api/v1/people/search";
  const namePart = encodeURIComponent(name);
  const url = `${BASE_URL}?query=${namePart}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const players = data.people.filter(
      (p) => p.fullName.toLowerCase() === name.toLowerCase()
    );
    DOMselectors.container.innerHTML = "";
    if (players.length > 0) {
      players.forEach((player) => {
        console.log(player);
        const cardHTML = createCard2(player);
        DOMselectors.container.innerHTML += cardHTML;
      });
    } else {
      console.log("Player not found");
      DOMselectors.container.innerHTML = `<p>Player not found.</p>`;
    }
    console.log("Player search results:", players);
  } catch (error) {
    console.error("Error fetching player data:", error);
  }
}

function createCard(player) {
  return `
      <div class="card card-compact bg-base-100 w-96 shadow-xl flex items-center justify-center text-center h-full">
        <h2 class="text-2xl">${player.person.fullName || "Unknown Player"}</h2>
        <img class="images" src=${player.person.picture} 
          alt="${player.person.fullName || "Unknown"}" />
        <h3 class="text-lg">Jersey Number: ${player.jerseyNumber || "N/A"}</h3>
        <p class="text-sm">Position: ${player.position.name || "N/A"}</p>
        <button class="btn text-base">Learn More</button>
      </div>
    `;
}

function createCard2(player) {
  return `
      <div class="card card-compact bg-base-100 w-96 shadow-xl flex items-center justify-center text-center h-full">
        <h2 class="text-2xl">${player.firstLastName || "Unknown Player"}</h2>
        <h3 class="text-lg">Debut Date: ${player.mlbDebutDate || "N/A"}</h3>
        <p class="text-sm">Gender: ${player.gender || "N/A"}</p>
        <button class="btn text-base">Learn More</button>
      </div>
    `;
}

document.getElementById("team-select").addEventListener("change", function () {
  const selectedTeamId = this.value;
  getTeamRoster(selectedTeamId);
  console.clear();
  console.log(`Team selected: ${selectedTeamId}`);
});

document
  .getElementById("player-search-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.getElementById("name-search").value.trim();
    if (name) {
      await getPlayer(name);
    } else {
      console.log("Please enter a name");
    }
  });
