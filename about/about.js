
// About page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Scroll animation for about page
  const elements = document.querySelectorAll(".animate-on-scroll");
  const revealed = new Set();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !revealed.has(entry.target)) {
        entry.target.classList.add("visible");
        revealed.add(entry.target);
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));

  // Counter animation for stats
  const counters = document.querySelectorAll('.stat h3');
  const speed = 200;

  const startCounter = (counter) => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const count = +counter.innerText.replace(/\D/g, '');
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment) + (counter.textContent.includes('+') ? '+' : '');
      setTimeout(() => startCounter(counter), 1);
    } else {
      counter.innerText = target + (counter.textContent.includes('+') ? '+' : '');
    }
  };

  // Trigger counter animation when stats section is visible
  const statsSection = document.querySelector('.story-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => {
            counter.innerText = '0';
            startCounter(counter);
          });
          statsObserver.disconnect();
        }
      });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
  }

  // Team member hover effects
  const teamMembers = document.querySelectorAll('.team-member');
  teamMembers.forEach(member => {
    member.addEventListener('mouseenter', () => {
      member.style.transform = 'translateY(-10px) scale(1.02)';
    });

    member.addEventListener('mouseleave', () => {
      member.style.transform = 'translateY(0) scale(1)';
    });
  });

  // Process steps progressive reveal
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach((step, index) => {
    step.style.animationDelay = `${index * 0.2}s`;
  });
});
