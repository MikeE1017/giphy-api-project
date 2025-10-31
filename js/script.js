console.log("script.js loaded");

const apiKey = "fiQUcXaLjs7reP13he9SCxN1HfHDwaad";
const endpointBase = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips`;

document.addEventListener("DOMContentLoaded", () => {
  const gifContainer = document.getElementById("gif-container");
  const fetchButton = document.getElementById("fetch-gif-btn");
  const searchInput = document.getElementById("search-input");

  if (!gifContainer || !fetchButton) {
    console.error("Element(s) not found:",
      "gifContainer:", !!gifContainer,
      "fetchButton:", !!fetchButton
    );
    document.body.insertAdjacentHTML("afterbegin",
      "<div style='background:#ffecec;color:#900;padding:8px;'>Check your HTML: missing #gif-container or #fetch-gif-btn</div>"
    );
    return;
  }

  async function fetchGifs() {
    fetchButton.disabled = true;
    const originalText = fetchButton.textContent;
    fetchButton.textContent = "Loading...";

    // ✅ Use user's search term or fallback to "graduation"
    const searchTerm = searchInput?.value.trim() || "graduation";
    const endpoint = `${endpointBase}&q=${encodeURIComponent(searchTerm)}`;

    try {
      console.log("Fetching:", endpoint);
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const images = Array.isArray(data.data)
        ? data.data.map(gif => gif?.images?.original?.url).filter(Boolean)
        : [];

      console.log("Returned GIF count:", images.length);

      gifContainer.innerHTML = ""; // clear previous

      if (images.length === 0) {
        gifContainer.innerHTML = "<p>No GIFs found for that query.</p>";
      } else {
        let html = "";
        for (const img of images) {
          html += `<img src="${img}" class="col-3 mb-3" alt="gif">`;
        }
        gifContainer.innerHTML = html;
      }
    } catch (err) {
      console.error("Error fetching GIFs:", err);
      gifContainer.innerHTML = `<p style="color:#900;">Error fetching GIFs: ${err.message}</p>`;
    } finally {
      fetchButton.disabled = false;
      fetchButton.textContent = originalText;
    }
  }

  // ✅ Button click fetch
  fetchButton.addEventListener("click", fetchGifs);

  // ✅ Bonus: also allow pressing Enter in search box to fetch
  searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      fetchGifs();
    }
  });
});
