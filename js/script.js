console.log("script.js loaded");

const apiKey = "fiQUcXaLjs7reP13he9SCxN1HfHDwaad";
const endpoint = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=graduation&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

const gifContainer = document.querySelector("#gif-container");
const fetchButton = document.querySelector("#fetch-gif-btn");

fetchButton.addEventListener("click", async () => {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    const images = data.data.map(gif => gif.images.original.url);

    gifContainer.innerHTML = ""; // Clear previous GIFs

    for (let img of images) {
      gifContainer.innerHTML += `<img src="${img}" class="col-3 mb-3">`;
    }
  } catch (error) {
    console.error("Error fetching GIFs:", error);
  }
});

