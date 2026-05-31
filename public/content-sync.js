/**
 * content-sync.js
 * Fetches content from Firebase via the API and injects it into the static HTML.
 * This script runs on every page load and ONLY changes text content — never CSS or design.
 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    let data = null;

    // 1. Try local Next.js API first
    try {
      const res = await fetch("/api/content/get");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          data = json.data;
        }
      }
    } catch (apiErr) {
      console.info("Local API fetch failed, falling back to direct Firestore...", apiErr);
    }

    // 2. Fallback: Query Firestore REST API directly from the client
    if (!data) {
      try {
        const firestoreUrl = "https://firestore.googleapis.com/v1/projects/workdenuser/databases/(default)/documents/website/content";
        const res = await fetch(firestoreUrl);
        if (res.ok) {
          const json = await res.json();
          data = parseFirestoreDoc(json);
        }
      } catch (fsErr) {
        console.error("Direct Firestore REST fetch failed:", fsErr);
      }
    }

    if (!data || !data.website) return;
    const { website, testimonials } = data;

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

    // ── Google Drive Link Converters ──────────────────────────────────────────
    function convertDriveLink(url) {
      if (!url) return "";
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w600`;
      return url;
    }

    function convertDriveImageUrl(url) {
      if (!url) return "";
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
      return url;
    }

    function convertDriveVideoUrl(url) {
      if (!url) return "";
      const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
      return url;
    }

    // ── Generic Dynamic List Cloner & Synchronization Helper ──────────────────
    const templates = {};
    function getTemplate(container, childSelector) {
      const key = container.className + "_" + childSelector;
      if (!templates[key]) {
        const originalChild = container.querySelector(childSelector);
        if (originalChild) {
          templates[key] = originalChild.cloneNode(true);
        }
      }
      return templates[key];
    }

    function syncList(containerSelector, childSelector, list, populateFn) {
      const container = document.querySelector(containerSelector);
      if (!container) return;
      
      const template = getTemplate(container, childSelector);
      if (!template) return;
      
      // Delete only dynamic child nodes, leaving headers or wrappers intact
      container.querySelectorAll(childSelector).forEach(el => el.remove());
      
      if (!Array.isArray(list) || list.length === 0) return;
      
      list.forEach((item, index) => {
        const clone = template.cloneNode(true);
        clone.classList.remove("revealed");
        
        populateFn(clone, item, index);
        
        container.appendChild(clone);
        
        // Recalculate staggering delays for smooth premium reveal animations
        clone.style.animationDelay = (index * 120) + "ms";
        clone.style.transitionDelay = (index * 60) + "ms";
        clone.classList.add("revealed");
      });
    }

    // ── Page Specific Dynamic List Syncs ───────────────────────────────────────
    if (pageName === "home") {
      // 1. Why WorkDen features
      if (pageData.features) {
        syncList(".features-grid", ".feat-card", pageData.features, (clone, item) => {
          const title = clone.querySelector(".feat-title");
          const desc = clone.querySelector(".feat-desc");
          const iconWrap = clone.querySelector(".feat-icon");
          const icon = clone.querySelector("i");
          if (title) title.innerHTML = item.title || "";
          if (desc) desc.innerHTML = item.desc || "";
          if (iconWrap) {
            if (item.bg) iconWrap.style.background = item.bg;
            if (item.color) iconWrap.style.color = item.color;
          }
          if (icon && item.icon) icon.className = item.icon;
        });
      }

      // 2. Work Categories
      if (pageData.categories) {
        syncList(".projects-grid", ".proj-card", pageData.categories, (clone, item) => {
          const title = clone.querySelector(".proj-title");
          const desc = clone.querySelector(".proj-desc");
          const iconWrap = clone.querySelector(".proj-icon");
          const icon = clone.querySelector("i");
          if (title) title.innerHTML = item.title || "";
          if (desc) desc.innerHTML = item.desc || "";
          if (iconWrap) {
            if (item.bg) iconWrap.style.background = item.bg;
            if (item.color) iconWrap.style.color = item.color;
          }
          if (icon && item.icon) icon.className = item.icon;
        });
      }

      // 3. Steps
      if (pageData.steps) {
        syncList(".step-list", ".step-item", pageData.steps, (clone, item, index) => {
          const num = clone.querySelector(".step-num");
          const title = clone.querySelector(".step-title");
          const desc = clone.querySelector(".step-desc");
          if (num) num.innerHTML = String(index + 1);
          if (title) title.innerHTML = item.title || "";
          if (desc) desc.innerHTML = item.desc || "";
        });
      }
    }

    else if (pageName === "plans") {
      // 1. Plans Cards List
      if (pageData.plansList) {
        syncList("#planGrid", ".plan-card", pageData.plansList, (clone, item) => {
          const name = clone.querySelector(".card-plan-name");
          const desc = clone.querySelector(".card-desc");
          const cardPriceRow = clone.querySelector(".card-price-row");
          const list = clone.querySelector(".card-feat-list");
          const refund = clone.querySelector(".card-refund-note");
          
          if (name) name.innerHTML = item.name || "";
          if (desc) desc.innerHTML = item.desc || "";
          
          if (cardPriceRow) {
            if (item.price === "Free" || item.price === "free" || !item.price) {
              cardPriceRow.innerHTML = `<span class="card-free">Free</span>`;
            } else {
              cardPriceRow.innerHTML = `
                <span class="card-currency">₹</span>
                <span class="card-amount">${item.price}</span>
                <span class="card-period">/one-time</span>
              `;
            }
          }
          
          clone.dataset.isPaid = item.isPaid ? "true" : "false";
          clone.dataset.popular = item.isPopular ? "true" : "false";
          clone.id = item.isPaid ? "card-paid-1" : ("card-free-" + Math.random().toString(36).substr(2, 4));
          
          if (item.isPopular) {
            clone.classList.add("popular");
          } else {
            clone.classList.remove("popular");
          }
          
          if (list && Array.isArray(item.features)) {
            list.innerHTML = item.features.map(f => `<li><span class="feat-dot"></span> ${f}</li>`).join("");
          }
          
          if (refund) {
            if (item.refundNote) {
              refund.innerHTML = item.refundNote;
              refund.style.display = "";
            } else {
              refund.style.display = "none";
            }
          }
          
          clone.querySelectorAll('.feat-dot').forEach((dot, idx) => {
            dot.style.animation = 'featDotPulse 2.4s ease-in-out infinite';
            dot.style.animationDelay = (idx * 120 % 800) + 'ms';
          });
        });

        // Dynamic plan toggle switch override
        window.switchPlan = function(type) {
          const pill = document.getElementById('togglePill');
          const btnPaid = document.getElementById('btnPaid');
          const btnFree = document.getElementById('btnFree');
          if (!pill || !btnPaid || !btnFree) return;
          
          const cards = document.querySelectorAll('.plan-card');
          if (type === 'paid') {
            btnPaid.classList.add('active');
            btnFree.classList.remove('active');
            pill.style.left = '4px';
            pill.style.width = btnPaid.offsetWidth + 'px';
            cards.forEach(card => {
              card.style.display = '';
              if (card.dataset.popular === 'true') {
                card.classList.add('popular');
              } else {
                card.classList.remove('popular');
              }
            });
          } else {
            btnFree.classList.add('active');
            btnPaid.classList.remove('active');
            pill.style.left = (btnPaid.offsetLeft + btnPaid.offsetWidth) + 'px';
            pill.style.width = btnFree.offsetWidth + 'px';
            cards.forEach(card => {
              if (card.dataset.isPaid === 'true') {
                card.style.display = 'none';
              } else {
                card.style.display = '';
              }
              card.classList.remove('popular');
            });
            const firstFree = Array.from(cards).find(c => c.dataset.isPaid !== 'true');
            if (firstFree) {
              firstFree.classList.add('popular');
            }
          }
        };
      }

      // 2. Value cards
      if (pageData.valueCards) {
        syncList(".value-grid", ".value-mini", pageData.valueCards, (clone, item) => {
          const title = clone.querySelector("strong");
          const desc = clone.querySelector("span");
          const icon = clone.querySelector("i");
          if (title) title.innerHTML = item.title || "";
          if (desc) desc.innerHTML = item.desc || "";
          if (icon && item.icon) icon.className = item.icon;
        });
      }
    }

    else if (pageName === "about") {
      // Team Leadership members
      if (pageData.teamList) {
        syncList(".team-grid", ".team-card", pageData.teamList, (clone, item) => {
          const img = clone.querySelector(".team-avatar");
          const name = clone.querySelector(".team-name");
          const role = clone.querySelector(".team-role");
          if (name) name.innerHTML = item.name || "";
          if (role) role.innerHTML = item.role || "";
          
          if (img) {
            if (item.imageUrl) {
              img.src = convertDriveLink(item.imageUrl);
              img.style.display = "";
              const existingFallback = clone.querySelector(".team-avatar-fallback");
              if (existingFallback) existingFallback.remove();
            } else {
              img.style.display = "none";
              let fallback = clone.querySelector(".team-avatar-fallback");
              if (!fallback) {
                fallback = document.createElement("div");
                fallback.className = "team-avatar-fallback";
                fallback.style.width = "80px";
                fallback.style.height = "80px";
                fallback.style.borderRadius = "50%";
                fallback.style.margin = "0 auto 14px";
                fallback.style.display = "flex";
                fallback.style.alignItems = "center";
                fallback.style.justifyContent = "center";
                fallback.style.fontWeight = "800";
                fallback.style.fontSize = "1.5rem";
                fallback.style.color = "white";
                fallback.style.background = "linear-gradient(135deg, #1d4ed8, #2563eb)";
                img.parentNode.insertBefore(fallback, img);
              }
              fallback.innerHTML = (item.name || "AB").split(" ").map(x => x[0]).join("").toUpperCase().slice(0, 2);
              fallback.style.display = "flex";
            }
          }
        });
      }
    }

    else if (pageName === "projects") {
      // Projects Grid List
      if (pageData.projectsList) {
        syncList(".proj-grid", ".proj-main-card", pageData.projectsList, (clone, item) => {
          const title = clone.querySelector(".proj-title");
          const desc = clone.querySelector(".proj-desc");
          const iconWrap = clone.querySelector(".proj-icon-wrap");
          const icon = clone.querySelector("i");
          const level = clone.querySelector(".proj-level");
          const badgeRow = clone.querySelector(".proj-badge-row");
          
          if (title) title.innerHTML = item.title || "";
          if (desc) desc.innerHTML = item.desc || "";
          if (level) level.innerHTML = `<i class="fas fa-signal"></i> ${item.level || "Easy · No Experience Needed"}`;
          
          if (iconWrap) {
            if (item.bg) iconWrap.style.background = item.bg;
            if (item.color) iconWrap.style.color = item.color;
          }
          if (icon && item.icon) icon.className = item.icon;
          
          if (badgeRow) {
            if (Array.isArray(item.badges) && item.badges.length > 0) {
              badgeRow.innerHTML = item.badges.map((b, idx) => {
                const colors = ["blue", "green", "amber", "red"];
                const color = colors[idx % colors.length];
                return `<span class="badge badge-${color}">${b}</span>`;
              }).join("");
              badgeRow.style.display = "";
            } else {
              badgeRow.style.display = "none";
            }
          }
        });
      }
    }

    else if (pageName === "blogs") {
      // Blogs Grid List
      if (pageData.blogsList) {
        syncList(".blog-grid", ".blog-card", pageData.blogsList, (clone, item) => {
          const title = clone.querySelector(".blog-title");
          const desc = clone.querySelector(".blog-excerpt");
          const tag = clone.querySelector(".blog-tag span");
          const date = clone.querySelector(".blog-date");
          
          if (title) title.innerHTML = item.title || "";
          if (desc) desc.innerHTML = item.desc || "";
          if (tag) tag.innerHTML = item.tag || "";
          if (date && item.date) date.innerHTML = item.date;
          
          if (item.url) {
            clone.href = item.url;
          }
        });
      }
    }

    else if (pageName === "demo-task") {
      // Overwrite static TDEFS and HOWTO arrays dynamically
      if (pageData.tasksList) {
        TDEFS = pageData.tasksList;
      }
      if (pageData.howto) {
        HOWTO = pageData.howto;
      }
      
      // Re-trigger layout render
      if (typeof renderMenu === "function") {
        renderMenu();
      }
    }

    // ── Inject Testimonials ──────────────────────────────────────────────────
    if (pageName === "testimonials") {
      // 1. Google Drive Video Reviews Marquee
      const videoGrid = document.querySelector(".video-marquee-track");
      if (videoGrid && Array.isArray(testimonials)) {
        const videoItems = testimonials.filter(t => t.type === "video");
        if (videoItems.length > 0) {
          const renderVids = (items) => items.map(t => {
            const driveUrl = convertDriveVideoUrl(t.videoUrl);
            const initials = t.initials || (t.name || "AB").split(" ").map(x => x[0]).join("").toUpperCase().slice(0, 2);
            return `
              <div class="vid-card revealed">
                <iframe src="${driveUrl}" allowfullscreen></iframe>
                <div class="vid-card-info">
                  <div class="vid-avatar" style="background:${escHtml(t.gradient || 'linear-gradient(135deg,#1d4ed8,#2563eb)')};">${escHtml(initials)}</div>
                  <div>
                    <div class="vid-name">${escHtml(t.name)}</div>
                    <div class="vid-role">${escHtml(t.role || 'User')}</div>
                  </div>
                </div>
              </div>
            `;
          }).join("");
          videoGrid.innerHTML = renderVids(videoItems) + renderVids(videoItems);
        }
      }

      // 2. Google Drive Screenshot Reviews Grid
      const imgGrid = document.querySelector(".img-testi-grid");
      if (imgGrid && Array.isArray(testimonials)) {
        const imgItems = testimonials.filter(t => t.type === "screenshot");
        if (imgItems.length > 0) {
          imgGrid.innerHTML = imgItems.map(t => {
            const driveUrl = convertDriveImageUrl(t.imageUrl);
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

      // 3. Written Reviews Grid
      const writtenGrid = document.querySelector(".written-grid");
      if (writtenGrid && Array.isArray(testimonials)) {
        const writtenItems = testimonials.filter(t => t.type === "written");
        if (writtenItems.length > 0) {
          writtenGrid.innerHTML = writtenItems.map(t => `
            <div class="w-card revealed">
              <div class="w-stars">
                <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                <i class="fas fa-star"></i><i class="fas fa-star"></i>
              </div>
              <p class="w-text">${escHtml(t.text)}</p>
              <div class="w-author">
                <div class="w-avatar" style="background:${escHtml(t.gradient || 'linear-gradient(135deg,#3b82f6,#14b8a6)')};">${escHtml(t.initials || 'AB')}</div>
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
      // Home page marquee reviews fallback
      const marquee = document.querySelector(".testi-marquee, .testi-grid.testi-marquee");
      if (marquee && Array.isArray(testimonials) && testimonials.length > 0) {
        const writtenItems = testimonials.filter(t => t.type === "written");
        const itemsToUse = writtenItems.length > 0 ? writtenItems : testimonials;

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
                  <div class="testi-avatar" style="background:${escHtml(t.gradient || 'linear-gradient(135deg,#3b82f6,#14b8a6)')};">${escHtml(t.initials || 'AB')}</div>
                `}
                <div>
                  <div class="testi-name">${escHtml(t.name)}</div>
                  <div class="testi-city">${escHtml(t.city)}</div>
                </div>
              </div>
            </div>
          `;
        }).join("");
        marquee.innerHTML = buildCards(itemsToUse) + buildCards(itemsToUse);
      }
    }

  } catch (err) {
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

// ── Helper to parse Firestore REST Protobuf-JSON into simple JS objects ──────
function parseFirestoreValue(val) {
  if (!val || typeof val !== "object") return val;
  if ("stringValue" in val) return val.stringValue;
  if ("booleanValue" in val) return val.booleanValue;
  if ("integerValue" in val) return parseInt(val.integerValue, 10);
  if ("doubleValue" in val) return parseFloat(val.doubleValue);
  if ("mapValue" in val) {
    const fields = val.mapValue.fields || {};
    const res = {};
    for (const k in fields) {
      res[k] = parseFirestoreValue(fields[k]);
    }
    return res;
  }
  if ("arrayValue" in val) {
    const values = val.arrayValue.values || [];
    return values.map(v => parseFirestoreValue(v));
  }
  return val;
}

function parseFirestoreDoc(doc) {
  const fields = doc.fields || {};
  const res = {};
  for (const k in fields) {
    res[k] = parseFirestoreValue(fields[k]);
  }
  return res;
}
