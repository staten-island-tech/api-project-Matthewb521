const BASE_URL = "https://collectionapi.metmuseum.org/public/collection/v1/";

const DOMselectors = {
  container: document.querySelector(".container"),
};

async function getData() {
  const response = await fetch(`${BASE_URL}objects`);
  const data = await response.json();
  const objectIDs = data.objectIDs.slice(1000, 1010);

  const objectData = await Promise.all(
    objectIDs.map(async (id) => {
      const objectResponse = await fetch(`${BASE_URL}objects/${id}`);
      return await objectResponse.json();
    })
  );

  createCard(objectData);
}

function createCard(data) {
  return `
    <div class="card card-compact bg-base-100 w-96 shadow-xl flex items-center justify-center text-center h-full">
      <h2 class = "text-2xl">${data.title || "Untitled"}</h2>
      <img class="images" src="${
        data.primaryImage || "placeholder.jpg"
      }" alt="${data.objectName || "Unknown"}" />
      <h3 class = "text-lg">Type: ${data.objectName || "Unknown"}</h3>
      <p class = "text-sm">Artist: ${data.artistDisplayName || "Unknown"}</p>
      <button class= "btn text-base">Learn More</button>
    </div>
  `;
}

// function displayCards(artistFilter) {
//   displayedCards = dataArray.filter(
//     (data) => !artistFilter || data.artistDisplayName === artistFilter
//   );
//   Container.innerHTML = displayedCards.map(displayCards).join("");
// }

getData();
