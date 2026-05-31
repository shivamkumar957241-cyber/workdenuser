/**
 * content-sync.js
 * Fetches content from Firebase via the API and injects it into the static HTML.
 * This script runs on every page load and ONLY changes text content — never CSS or design.
 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("/api/content/get");
    if (!res.ok) return;
    const json = await res.json();
    if (!json.success || !json.data) return;

    const { website, testimonials } = json.data;

    // ── Detect current page ────────────────────────────────────────────────────
    let pageName = window.location.pathname.split("/").pop() || "index.html";
    // strip .html → home, plans, about, etc.
    if (pageName === "" || pageName === "index.html") pageName = "home";
    else pageName = pageName.replace(".html", "");

    // ── Inject text/html by data-content-id ───────────────────────────────────
    const pageData = website?.[pageName] || {};
    document.querySelectorAll("[data-content-id]").forEach(el => {
      const key = el.getAttribute("data-content-id");
      if (key && pageData[key] !== undefined && pageData[key] !== "") {
        if (el.tagName === "IMG") {
          el.src = pageData[key];
        } else {
          el.innerHTML = pageData[key];
        }
      }
    });

    // ── Inject Testimonials into marquee ──────────────────────────────────────
    const marquee = document.querySelector(".testi-marquee, .testi-grid.testi-marquee");
    if (marquee && Array.isArray(testimonials) && testimonials.length > 0) {
      // Build all cards (duplicated for seamless infinite scroll)
      const buildCards = (items) => items.map(t => `
        <div class="testi-card">
          <div class="testi-stars">
            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
            <i class="fas fa-star"></i><i class="fas fa-star"></i>
          </div>
          <p class="testi-text">${escHtml(t.text)}</p>
          <div class="testi-author">
            <div class="testi-avatar" style="background:${escHtml(t.gradient)};">${escHtml(t.initials)}</div>
            <div>
              <div class="testi-name">${escHtml(t.name)}</div>
              <div class="testi-city">${escHtml(t.city)}</div>
            </div>
          </div>
        </div>
      `).join("");

      // Duplicate for seamless loop
      marquee.innerHTML = buildCards(testimonials) + buildCards(testimonials);
    }

  } catch (err) {
    // Silent fail — website shows original static content
    console.info("WorkDen CMS: Could not load dynamic content.", err);
  }
});

function escHtml(str) {
  if (!str) return "";
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
