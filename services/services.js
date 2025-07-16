// Services page functionality
document.addEventListener("DOMContentLoaded", () => {
  // ===== Scroll Reveal Animation (Fast 0.15s) =====
  const elements = document.querySelectorAll(".animate-on-scroll");
  const revealed = new Set();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !revealed.has(entry.target)) {
          entry.target.classList.add("visible");
          revealed.add(entry.target);
        }
      });
    },
    { threshold: 0.1 },
  );

  elements.forEach((el) => observer.observe(el));

  // ===== Service Category Hover Effect =====
  const serviceCategories = document.querySelectorAll(".service-category");
  serviceCategories.forEach((category) => {
    category.addEventListener("mouseenter", () => {
      category.style.transform = "translateY(-10px)";
      category.style.boxShadow = "0 25px 50px rgba(0, 0, 0, 0.15)";
    });

    category.addEventListener("mouseleave", () => {
      category.style.transform = "translateY(0)";
      category.style.boxShadow = "0 15px 40px rgba(0, 0, 0, 0.1)";
    });
  });

  // ===== Industry Cards Click Ripple Animation =====
  const industryCards = document.querySelectorAll(".industry-card");
  industryCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;

    card.addEventListener("click", (e) => {
      const ripple = document.createElement("div");
      ripple.style.position = "absolute";
      ripple.style.borderRadius = "50%";
      ripple.style.background = "rgba(140, 188, 70, 0.3)";
      ripple.style.transform = "scale(0)";
      ripple.style.animation = "ripple 0.5s linear";
      ripple.style.left = "50%";
      ripple.style.top = "50%";
      ripple.style.width = "100px";
      ripple.style.height = "100px";
      ripple.style.marginLeft = "-50px";
      ripple.style.marginTop = "-50px";
      ripple.style.pointerEvents = "none";

      card.style.position = "relative";
      card.appendChild(ripple);

      setTimeout(() => {
        card.removeChild(ripple);
      }, 500);
    });
  });

  // ===== Package Cards Hover and Button Loading =====
  const packageCards = document.querySelectorAll(".package-card");
  packageCards.forEach((card) => {
    const button = card.querySelector("button");

    card.addEventListener("mouseenter", () => {
      if (!card.classList.contains("featured")) {
        card.style.transform = "translateY(-10px) scale(1.02)";
      }
    });

    card.addEventListener("mouseleave", () => {
      if (!card.classList.contains("featured")) {
        card.style.transform = "translateY(0) scale(1)";
      }
    });

    // Button click loading effect
    if (button) {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const originalText = button.textContent;
        button.textContent = "Loading...";
        button.disabled = true;

        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          window.location.href = "contact.html";
        }, 800);
      });
    }
  });

  // ===== Service Process Progressive Animation =====
  const processSteps = document.querySelectorAll(".step");
  const processObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const steps = entry.target.parentElement.querySelectorAll(".step");
          steps.forEach((step, index) => {
            setTimeout(() => {
              step.style.opacity = "1";
              step.style.transform = "translateY(0)";
            }, index * 150); // faster sequence
          });
          processObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 },
  );

  const processContainer = document.querySelector(".process-steps");
  if (processContainer) {
    processSteps.forEach((step) => {
      step.style.opacity = "0";
      step.style.transform = "translateY(30px)";
      step.style.transition = "all 0.15s ease"; // faster transition
    });

    processObserver.observe(processContainer);
  }

  // ===== Add Ripple Animation CSS if not added =====
  if (!document.querySelector("#ripple-styles")) {
    const style = document.createElement("style");
    style.id = "ripple-styles";
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }

  // ===== Smooth Scroll for Anchor Links =====
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });
});
