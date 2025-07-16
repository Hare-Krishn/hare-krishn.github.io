// Hamburger menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.getElementById("navLinks");

  if (hamburger && navLinks) {
    // Toggle menu when hamburger is clicked
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevent click from bubbling to document
      navLinks.classList.toggle("show");
    });

    // Close menu when clicking outside of hamburger or menu
    document.addEventListener("click", (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
        navLinks.classList.remove("show");
      }
    });

    // Prevent clicks inside the menu from bubbling up
    navLinks.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }

  // Scroll progress indicator
  const progressPath = document.querySelector('#scroll-indicator .progress');
  const indicatorContainer = document.getElementById('scroll-indicator-container');
  const footer = document.querySelector('footer');

  if (progressPath && indicatorContainer && footer) {
    const updateScrollProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressPath.setAttribute('stroke-dasharray', `${scrollPercent}, 100`);
    };

    const checkFooterVisibility = () => {
      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (footerRect.top < windowHeight) {
        // Footer is visible
        indicatorContainer.classList.add('fade-out');
      } else {
        // Footer not visible
        indicatorContainer.classList.remove('fade-out');
      }
    };

    // Initial state
    updateScrollProgress();
    checkFooterVisibility();

    // Update on scroll
    window.addEventListener('scroll', () => {
      updateScrollProgress();
      checkFooterVisibility();
    });
  }

  // Disable right-click on entire page
  document.addEventListener("contextmenu", event => event.preventDefault());

  // Disable key shortcuts to open DevTools
  document.addEventListener("keydown", function (e) {
    if (
      e.key === "F12" ||
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "J" || e.key === "C")) ||
      (e.ctrlKey && e.key === "U")
    ) {
      e.preventDefault();
    }
  });
});
