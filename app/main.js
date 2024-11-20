const URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects/437233";

async function getData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  displayCard(data);
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

function displayCard(data) {
  const container = document.getElementById("container");
  container.innerHTML = createCard(data);
}

getData(URL);
