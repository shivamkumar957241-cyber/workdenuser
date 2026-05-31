// content-sync.js
// This script fetches dynamic content from the backend and updates the static HTML without breaking the design.

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/content/get");
    const json = await res.json();
    
    if (json.success && json.data) {
      const data = json.data;
      
      // Update elements based on data-content-id attribute
      const elements = document.querySelectorAll("[data-content-id]");
      elements.forEach(el => {
        const key = el.getAttribute("data-content-id");
        if (data[key]) {
          if (el.tagName === "IMG") {
            el.src = data[key];
          } else {
            el.innerHTML = data[key];
          }
        }
      });
    }
  } catch (error) {
    console.error("Failed to sync dynamic content:", error);
  }
});
