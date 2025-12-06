// components/script.js
(function () {
  // Prevent duplicate initialization
  if (window.__B500_SCRIPT_INITIALIZED) return;
  window.__B500_SCRIPT_INITIALIZED = true;

  // ===========================
  // HAMBURGER MENU LOGIC
  // ===========================
  function toggleNav() {
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');
    if (!navLinks || !hamburger) return;

    navLinks.classList.toggle('show');
    hamburger.classList.toggle('open');
  }

  // Delegated click events
  document.addEventListener('click', function (e) {
    // Hamburger clicked
    const hamburgerEl = e.target.closest && e.target.closest('.hamburger');
    if (hamburgerEl) {
      e.stopPropagation();
      toggleNav();
      return;
    }

    // Nav link clicked
    const navLink = e.target.closest && e.target.closest('.nav-links a');
    if (navLink) {
      const navLinks = document.getElementById('navLinks');
      const hamburger = document.querySelector('.hamburger');

      if (navLinks) navLinks.classList.remove('show');
      if (hamburger) hamburger.classList.remove('open');

      return;
    }

    // Click outside nav
    const navLinks = document.getElementById('navLinks');
    const hamburger = document.querySelector('.hamburger');

    if (navLinks && navLinks.classList.contains('show')) {
      const clickedInsideNav = navLinks.contains(e.target);
      const clickedHamburger = hamburger && hamburger.contains(e.target);

      if (!clickedInsideNav && !clickedHamburger) {
        navLinks.classList.remove('show');
        if (hamburger) hamburger.classList.remove('open');
      }
    }
  });

  // Keyboard toggle
  document.addEventListener('keydown', function (e) {
    const active = document.activeElement;

    if (active && active.classList && active.classList.contains('hamburger')) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggleNav();
      }
    }

    // Disable devtools shortcuts
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
    }
  });

  // Disable right-click
  document.addEventListener("contextmenu", event => event.preventDefault());

  // ===========================
  // SERVICE WORKER REGISTRATION
  // ===========================
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js")
      .then(() => console.log("✅ Service Worker registered"))
      .catch(error => console.error("❌ Service Worker registration failed:", error));
  }

  // ===========================
  // CURSOR EFFECT (Dynamic Import)
  // ===========================
// after you create the cursor
import("https://unpkg.com/cursor-effects@latest/dist/esm.js")
  .then(module => {
    const { followingDotCursor } = module;
    const cursorInstance = new followingDotCursor({ color: "#8cbc46" });

    // Move to bottom-right. Adjust offset to keep dot inside viewport.
    const offset = 24; // pixels from edges (tweak as needed)
    const targetX = Math.max(window.innerWidth - offset, 0);
    const targetY = Math.max(window.innerHeight - offset, 0);

    // Helper to dispatch a mousemove on the document/body (the library listens on element)
    function dispatchMouseMove(x, y) {
      const ev = new MouseEvent("mousemove", {
        bubbles: true,
        cancelable: true,
        clientX: x,
        clientY: y
      });
      // dispatch on document.body so element listeners on body pick it up
      (document.body || document).dispatchEvent(ev);
    }

    // Fire several events quickly so the dot moves faster (closer to instant)
    dispatchMouseMove(targetX, targetY);
    setTimeout(() => dispatchMouseMove(targetX, targetY), 16);
    setTimeout(() => dispatchMouseMove(targetX, targetY), 50);
    setTimeout(() => dispatchMouseMove(targetX, targetY), 120);

    // Optional: on resize, reposition again to bottom-right
    window.addEventListener("resize", () => {
      const nx = Math.max(window.innerWidth - offset, 0);
      const ny = Math.max(window.innerHeight - offset, 0);
      dispatchMouseMove(nx, ny);
    });
  })
  .catch(err => console.error("Cursor effect failed:", err));


})();
