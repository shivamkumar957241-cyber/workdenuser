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

    // ── Global & Page Data ─────────────────────────────────────────────────────
    const pageData = website?.[pageName] || {};
    const headerData = website?.header || {};
    const footerData = website?.footer || {};

    // ── Inject text/html by data-content-id and data-content-href ──────────────
    document.querySelectorAll("[data-content-id], [data-content-href]").forEach(el => {
      const key = el.getAttribute("data-content-id");
      const hrefKey = el.getAttribute("data-content-href");

      // 1. Resolve content value (check header, footer, then pageData)
      if (key) {
        let val = undefined;
        if (headerData[key] !== undefined && headerData[key] !== "") val = headerData[key];
        else if (footerData[key] !== undefined && footerData[key] !== "") val = footerData[key];
        else val = pageData[key];

        if (val !== undefined && val !== "") {
          if (el.tagName === "IMG") {
            el.src = val;
          } else {
            el.innerHTML = val;
          }
        }
      }

      // 2. Resolve href value (check header, footer, then pageData)
      if (hrefKey) {
        let val = undefined;
        if (headerData[hrefKey] !== undefined && headerData[hrefKey] !== "") val = headerData[hrefKey];
        else if (footerData[hrefKey] !== undefined && footerData[hrefKey] !== "") val = footerData[hrefKey];
        else val = pageData[hrefKey];

        if (val !== undefined && val !== "" && el.tagName === "A") {
          el.href = val;
        }
      }
    });

    // ── Helper to convert Google Drive link to direct display image ───────────
    function convertDriveLink(url) {
      if (!url) return "";
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w600`;
      return url;
    }

    // ── Inject Testimonials ──────────────────────────────────────────────────
    if (pageName === "testimonials") {
      // 1. Image Testimonials Screen Shots Grid
      const imgGrid = document.querySelector(".img-testi-grid");
      if (imgGrid && Array.isArray(testimonials)) {
        const imgItems = testimonials.filter(t => t.imageUrl);
        if (imgItems.length > 0) {
          imgGrid.innerHTML = imgItems.map(t => {
            const driveUrl = convertDriveLink(t.imageUrl);
            return `
              <div class="img-testi-card revealed" onclick="openLightbox('${driveUrl}', '${escJs(t.name)}', '${escJs(t.city)}')">
                <div class="img-wrap">
                  <img src="${driveUrl}" alt="${escHtml(t.name)}" loading="lazy">
                </div>
                <div class="img-testi-info">
                  <div class="img-testi-name">${escHtml(t.name)}</div>
                  <div class="img-testi-city">${escHtml(t.city)}</div>
                </div>
              </div>
            `;
          }).join("");
        }
      }

      // 2. Written Reviews Grid
      const writtenGrid = document.querySelector(".written-grid");
      if (writtenGrid && Array.isArray(testimonials)) {
        const writtenItems = testimonials.filter(t => !t.imageUrl);
        if (writtenItems.length > 0) {
          writtenGrid.innerHTML = writtenItems.map(t => `
            <div class="w-card revealed">
              <div class="w-stars">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
              </div>
              <p class="w-text">${escHtml(t.text)}</p>
              <div class="w-author">
                <div class="w-avatar" style="background:${escHtml(t.gradient)};">${escHtml(t.initials)}</div>
                <div>
                  <div class="w-name">${escHtml(t.name)}</div>
                  <div class="w-city">${escHtml(t.city)}</div>
                </div>
              </div>
            </div>
          `).join("");
        }
      }
    } else {
      // Index/Home page marquee testimonials
      const marquee = document.querySelector(".testi-marquee, .testi-grid.testi-marquee");
      if (marquee && Array.isArray(testimonials) && testimonials.length > 0) {
        // Build all cards (duplicated for seamless infinite scroll)
        const buildCards = (items) => items.map(t => {
          const hasImg = t.imageUrl && t.imageUrl.trim() !== "";
          const imgUrl = hasImg ? convertDriveLink(t.imageUrl) : "";
          return `
            <div class="testi-card">
              <div class="testi-stars">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
              </div>
              <p class="testi-text">${escHtml(t.text)}</p>
              <div class="testi-author">
                ${hasImg ? `
                  <img src="${imgUrl}" alt="${escHtml(t.name)}" class="testi-avatar object-cover" style="width:40px;height:40px;border-radius:50%;" />
                ` : `
                  <div class="testi-avatar" style="background:${escHtml(t.gradient)};">${escHtml(t.initials)}</div>
                `}
                <div>
                  <div class="testi-name">${escHtml(t.name)}</div>
                  <div class="testi-city">${escHtml(t.city)}</div>
                </div>
              </div>
            </div>
          `;
        }).join("");

        // Duplicate for seamless loop
        marquee.innerHTML = buildCards(testimonials) + buildCards(testimonials);
      }
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

function escJs(str) {
  if (!str) return "";
  return str.replace(/'/g, "\\'");
}
