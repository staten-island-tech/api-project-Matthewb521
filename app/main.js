const URL =
  "https://collectionapi.metmuseum.org/public/collection/v1/objects/437233";

async function getData(URL) {
  const response = await fetch(URL);
  const data = await response.json();
  displayCard(data);
}

function createCard(data) {
  return `
    <div class="card card-ani">
      <h2>${data.title || "Untitled"}</h2>
      <img class="images" src="${
        data.primaryImage || "placeholder.jpg"
      }" alt="${data.objectName || "Unknown"}" />
      <h3>Type: ${data.objectName || "Unknown"}</h3>
      <p>Period: ${data.period || "Unknown"}</p>
      <p>Artist: ${data.artistDisplayName || "Unknown"}</p>
    </div>
  `;
}

function displayCard(data) {
  const container = document.getElementById("container");
  container.innerHTML = createCard(data);
}

getData(URL);
