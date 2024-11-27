const BASE_URL = "https://statsapi.mlb.com/api/v1/teams";
const ROSTER_URL = "https://statsapi.mlb.com/api/v1/teams/{teamId}/roster";

const DOMselectors = {
  container: document.querySelector(".container"),
};

async function getTeamRoster(teamId) {
    const URL = ROSTER_URL.replace("{teamId}", teamId);
    try {
      const response = await fetch(URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const players = data.roster;
  
      console.log(`Players for team ID ${teamId}:`);
      players.forEach((player) => {
        console.log(player.person.fullName); 
  
        const cardHTML = createCard(player);
        const container = document.querySelector(".container");
        container.innerHTML += cardHTML; 
      });
  
      console.log("Full roster data:", players);
    } catch (error) {
      console.log("Error fetching team roster:", error);
    }
  }
  

function createCard(player) {
  return `
      <div class="card card-compact bg-base-100 w-96 shadow-xl flex items-center justify-center text-center h-full">
        <h2 class="text-2xl">${player.person.fullName || "Unknown Player"}</h2>
        <img class="images" src="https://img.mlbstatic.com/mlb-photos/image/upload/w_250,q_auto:best/v1/people/${
          player.person.id
        }/headshot/67" 
          alt="${player.person.fullName || "Unknown"}" />
        <h3 class="text-lg">Jersey Number: ${player.jerseyNumber || "N/A"}</h3>
        <p class="text-sm">Position: ${player.position.name || "N/A"}</p>
        <button class="btn text-base">Learn More</button>
      </div>
    `;
}

getTeamRoster(111);
