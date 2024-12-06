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
    const data = await response.json();

    // Find exact match (case-insensitive)
    const player = data.people.find(
      (p) => p.fullName.toLowerCase() === name.toLowerCase()
    );

    if (player) {
      console.log(player); // Exact match for the player
    } else {
      console.log("Player not found or too many matches");
    }
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

document.getElementById("team-select").addEventListener("change", function () {
  const selectedTeamId = this.value;
  getTeamRoster(selectedTeamId);
  console.clear();
  console.log(`Team selected: ${selectedTeamId}`);
});

getPlayer("Trea Turner");
