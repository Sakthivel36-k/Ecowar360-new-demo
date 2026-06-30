/**
 * EcoWar360 — Main interactivity
 * Vanilla JS, no dependencies, defers non-critical work for performance.
 */

(function () {
  "use strict";

  /* ---------- Render Product Cards ---------- */
  function renderProducts() {
    const grid = document.getElementById("productGrid");
    if (!grid) return;

    const cardsHtml = PRODUCTS.map((p) => {
      const waLink = buildWhatsAppLink(p.name, p.unit);
      const tagHtml = p.tag
        ? `<span class="absolute top-3 left-3 bg-honey text-forest text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">${p.tag}</span>`
        : "";
      const compareHtml = p.compareAt
        ? `<span class="text-xs text-earth-light/60 line-through ml-1.5">${p.compareAt}</span>`
        : "";

      return `
        <article class="product-card group bg-white rounded-2xl border border-forest/8 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300" data-category="${p.category}">
          <div class="relative bg-cream-dark/60 p-4">
            ${tagHtml}
            <span class="absolute top-3 right-3 bg-white/90 text-[10px] font-bold text-leaf-dark px-2 py-1 rounded-full">${CATEGORY_LABELS[p.category]}</span>
            ${p.svg}
          </div>
          <div class="p-5">
            <h3 class="font-display font-semibold text-lg text-forest mb-1.5">${p.name}</h3>
            <p class="text-xs text-earth-light leading-relaxed mb-3 line-clamp-2">${p.desc}</p>
            <div class="flex items-center justify-between mb-4">
              <div>
                <span class="font-bold text-forest text-lg">${p.price}</span>
                ${compareHtml}
              </div>
              <span class="text-[11px] text-earth-light font-medium bg-cream px-2.5 py-1 rounded-full">${p.unit}</span>
            </div>
            <a href="${waLink}" target="_blank" rel="noopener" class="order-btn w-full inline-flex items-center justify-center gap-2 bg-leaf hover:bg-leaf-dark text-white font-semibold text-sm py-3 rounded-full transition-colors duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.6 6.32A8.86 8.86 0 0 0 12.05 4a8.94 8.94 0 0 0-7.74 13.4L3 21l3.7-1.27a8.9 8.9 0 0 0 5.35 1.7h.01A8.94 8.94 0 0 0 21 12.5a8.9 8.9 0 0 0-3.4-6.18z"/></svg>
              Order on WhatsApp
            </a>
          </div>
        </article>`;
    }).join("");

    grid.innerHTML = cardsHtml;
  }

  /* ---------- Category Filtering ---------- */
  function setupFilters() {
    const buttons = document.querySelectorAll(".filter-btn");
    const cards = () => document.querySelectorAll(".product-card");

    function applyFilter(filter) {
      cards().forEach((card) => {
        const match = filter === "all" || card.dataset.category === filter;
        card.style.display = match ? "" : "none";
      });
    }

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        buttons.forEach((b) => {
          b.classList.remove("active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("active");
        btn.setAttribute("aria-selected", "true");
        applyFilter(btn.dataset.filter);
      });
    });

    // Footer category quick-links jump to products + apply filter
    document.querySelectorAll(".footer-cat-link").forEach((link) => {
      link.addEventListener("click", (e) => {
        const cat = link.dataset.cat;
        const targetBtn = document.querySelector(`.filter-btn[data-filter="${cat}"]`);
        if (targetBtn) {
          setTimeout(() => targetBtn.click(), 300);
        }
      });
    });
  }

  /* ---------- Mobile Menu ---------- */
  function setupMobileMenu() {
    const btn = document.getElementById("mobileMenuBtn");
    const menu = document.getElementById("mobileMenu");
    if (!btn || !menu) return;

    btn.addEventListener("click", () => {
      const isHidden = menu.classList.contains("hidden");
      menu.classList.toggle("hidden");
      btn.setAttribute("aria-expanded", String(isHidden));
    });

    // Close menu when a link is clicked
    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.add("hidden");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- FAQ Accordion ---------- */
  function setupFaq() {
    document.querySelectorAll(".faq-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const panel = btn.nextElementSibling;
        const icon = btn.querySelector(".faq-icon");
        const isOpen = btn.getAttribute("aria-expanded") === "true";

        document.querySelectorAll(".faq-btn").forEach((b) => {
          b.setAttribute("aria-expanded", "false");
          b.nextElementSibling.style.maxHeight = null;
          b.querySelector(".faq-icon").style.transform = "rotate(0deg)";
        });

        if (!isOpen) {
          btn.setAttribute("aria-expanded", "true");
          panel.style.maxHeight = panel.scrollHeight + "px";
          icon.style.transform = "rotate(180deg)";
        }
      });
    });
  }

  /* ---------- Back to Top ---------- */
  function setupBackToTop() {
    const btn = document.getElementById("backToTop");
    if (!btn) return;

    window.addEventListener(
      "scroll",
      () => {
        if (window.scrollY > 400) {
          btn.classList.remove("opacity-0", "pointer-events-none");
        } else {
          btn.classList.add("opacity-0", "pointer-events-none");
        }
      },
      { passive: true }
    );

    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Smooth scroll for in-page anchors ---------- */
  function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((link) => {
      link.addEventListener("click", (e) => {
        const id = link.getAttribute("href");
        if (id.length > 1) {
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }
      });
    });
  }

  /* ---------- Footer Year ---------- */
  function setupYear() {
    const el = document.getElementById("year");
    if (el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Init ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    renderProducts();
    setupFilters();
    setupMobileMenu();
    setupFaq();
    setupBackToTop();
    setupSmoothScroll();
    setupYear();
  });
})();
