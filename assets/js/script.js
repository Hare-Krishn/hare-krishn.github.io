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

    // Optional: Prevent clicks inside the menu from bubbling up
    navLinks.addEventListener("click", (e) => {
      e.stopPropagation();
    });
  }
});
