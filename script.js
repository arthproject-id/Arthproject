/* ==========================================================================
   ARTH PROJECT — script.js
   Plain vanilla JavaScript. No external libraries.
   Sections:
     1. Config (edit WhatsApp number / message here)
     2. Navbar solid-on-scroll + mobile menu
     3. Scroll reveal animations
     4. Portfolio filter
     5. Project detail modal
     6. Footer year
   ========================================================================== */

(function () {
  "use strict";

  /* ------------------------------------------------------------------ */
  /* 1. CONFIG — edit these two values to change the WhatsApp button     */
  /* ------------------------------------------------------------------ */
  var WHATSAPP_NUMBER = "628112275804"; // international format, no + or spaces
  var WHATSAPP_MESSAGE =
    "Halo Arth Project, saya ingin berkonsultasi mengenai kebutuhan kaca dan aluminium untuk proyek saya.";

  var waLink =
    "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(WHATSAPP_MESSAGE);

  document.querySelectorAll("#ctaWhatsApp, #contactWhatsApp, #contactWhatsAppBtn").forEach(function (el) {
    el.setAttribute("href", waLink);
  });

  /* ------------------------------------------------------------------ */
  /* 2. NAVBAR — solid background on scroll, mobile menu toggle          */
  /* ------------------------------------------------------------------ */
  var navbar = document.getElementById("navbar");
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function onScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("is-solid");
    } else {
      navbar.classList.remove("is-solid");
    }
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  function closeMenu() {
    navMenu.classList.remove("is-open");
    navToggle.classList.remove("is-active");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function () {
    var isOpen = navMenu.classList.toggle("is-open");
    navToggle.classList.toggle("is-active", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMenu);
  });

  /* Offset anchor scrolling so the fixed navbar doesn't cover the target */
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var id = link.getAttribute("href");
      if (id.length < 2) return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var navH = navbar.offsetHeight;
      var top = target.getBoundingClientRect().top + window.pageYOffset - navH + 1;
      window.scrollTo({ top: top, behavior: "smooth" });
    });
  });

  /* ------------------------------------------------------------------ */
  /* 3. SCROLL REVEAL — fade + slide up when a .reveal element enters    */
  /*    the viewport. Falls back to instantly visible if unsupported.   */
  /* ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ------------------------------------------------------------------ */
  /* 4. PORTFOLIO FILTER                                                  */
  /* ------------------------------------------------------------------ */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectCards = document.querySelectorAll(".project-card");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");

      var filter = btn.getAttribute("data-filter");
      projectCards.forEach(function (card) {
        var match = filter === "all" || card.getAttribute("data-category") === filter;
        card.classList.toggle("is-hidden", !match);
      });
    });
  });

  /* ------------------------------------------------------------------ */
  /* 5. PROJECT DETAIL MODAL                                              */
  /* ------------------------------------------------------------------ */
  var modal = document.getElementById("projectModal");
  var modalImage = document.getElementById("modalImage");
  var modalTitle = document.getElementById("modalTitle");
  var modalMeta = document.getElementById("modalMeta");
  var modalLocation = document.getElementById("modalLocation");
  var modalYear = document.getElementById("modalYear");
  var modalType = document.getElementById("modalType");
  var modalScope = document.getElementById("modalScope");
  var modalDesc = document.getElementById("modalDesc");
  var lastFocused = null;

  function openModal(card) {
    modalImage.src = card.getAttribute("data-image");
    modalImage.alt = card.getAttribute("data-name");
    modalTitle.textContent = card.getAttribute("data-name");
    modalMeta.textContent = card.getAttribute("data-type") + " Project";
    modalLocation.textContent = card.getAttribute("data-location");
    modalYear.textContent = card.getAttribute("data-year");
    modalType.textContent = card.getAttribute("data-type");
    modalScope.textContent = card.getAttribute("data-scope");
    modalDesc.textContent = card.getAttribute("data-desc");

    lastFocused = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    modal.querySelector(".modal-close").focus();
  }

  function closeModal() {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  projectCards.forEach(function (card) {
    card.addEventListener("click", function () { openModal(card); });
  });

  modal.querySelectorAll("[data-close]").forEach(function (el) {
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modal.classList.contains("is-open")) closeModal();
  });

  /* ------------------------------------------------------------------ */
  /* 6. FOOTER YEAR                                                       */
  /* ------------------------------------------------------------------ */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
