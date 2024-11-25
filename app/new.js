const URL = "https://collectionapi.metmuseum.org/public/collection/v1/";
let idCounter = 0;

const DOMselectors = {
  container: document.querySelector(".container"),
};

async function getData(URL) {
  try {
    const response = await fetch(URL);
    const data = await response.json();
    ViteRuntime(data);
  } catch (error) {
    console.error("Error getting data:", error);
  }
}

getData(URL);

function displayCards(array) {
  DOMselectors.container.innerHTML = "";
  array.foreach((card) => {
    idCounter += 1;
    DOMselectors.container.insertAdjacentHTML(
      "beforeend",
      `<div class="card card-compact bg-base-100 w-96 shadow-xl flex items-center justify-center text-center h-full">
        <h2 class = "text-2xl">${data.title || "Untitled"}</h2>
        <img class="images" src="${
          data.primaryImage || "placeholder.jpg"
        }" alt="${data.objectName || "Unknown"}" />
        <h3 class = "text-lg">Type: ${data.objectName || "Unknown"}</h3>
        <p class = "text-sm">Artist: ${data.artistDisplayName || "Unknown"}</p>
        <button class= "btn text-base">Learn More</button>
      </div>
    `
  });
}
