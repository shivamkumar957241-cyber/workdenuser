// content-sync.js
// This script fetches dynamic content from the backend and updates the static HTML without breaking the design.

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/content/get");
    const json = await res.json();
    
    if (json.success && json.data) {
      const { website, testimonials } = json.data;
      
      // Determine current page key
      let path = window.location.pathname.split("/").pop();
      if (!path || path === "" || path === "index.html") path = "home";
      else path = path.replace(".html", "");

      // 1. Update text elements based on data-content-id attribute
      if (website && website[path]) {
        const pageData = website[path];
        const elements = document.querySelectorAll("[data-content-id]");
        elements.forEach(el => {
          const key = el.getAttribute("data-content-id");
          if (pageData[key] !== undefined && pageData[key] !== null) {
            if (el.tagName === "IMG") {
              el.src = pageData[key];
            } else {
              el.innerHTML = pageData[key];
            }
          }
        });
      }

      // 2. Dynamically inject Testimonials without breaking CSS Marquee
      // This is global for any page that has .testi-group
      const groups = document.querySelectorAll(".testi-group");
      if (groups.length > 0 && testimonials && Array.isArray(testimonials) && testimonials.length > 0) {
        // Generate the exact HTML structure for the cards
        const cardsHTML = testimonials.map(t => `
          <div class="testi-card">
            <div class="testi-stars">
              <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            </div>
            <p class="testi-text">${t.text}</p>
            <div class="testi-author">
              <div class="testi-avatar" style="background:${t.gradient};">${t.initials}</div>
              <div>
                <div class="testi-name">${t.name}</div>
                <div class="testi-city">${t.city}</div>
              </div>
            </div>
          </div>
        `).join("");

        groups.forEach(group => {
          group.innerHTML = cardsHTML;
        });
      }
    }
  } catch (error) {
    console.error("Failed to sync dynamic content:", error);
  }
});
