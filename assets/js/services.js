
// Services page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Scroll animation for services page
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

  // Service category hover effects
  const serviceCategories = document.querySelectorAll('.service-category');
  serviceCategories.forEach(category => {
    category.addEventListener('mouseenter', () => {
      category.style.transform = 'translateY(-15px)';
      category.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.15)';
    });

    category.addEventListener('mouseleave', () => {
      category.style.transform = 'translateY(0)';
      category.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.1)';
    });
  });

  // Industry cards animation
  const industryCards = document.querySelectorAll('.industry-card');
  industryCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.1}s`;
    
    card.addEventListener('click', () => {
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.position = 'absolute';
      ripple.style.borderRadius = '50%';
      ripple.style.background = 'rgba(140, 188, 70, 0.3)';
      ripple.style.transform = 'scale(0)';
      ripple.style.animation = 'ripple 0.6s linear';
      ripple.style.left = '50%';
      ripple.style.top = '50%';
      ripple.style.width = '100px';
      ripple.style.height = '100px';
      ripple.style.marginLeft = '-50px';
      ripple.style.marginTop = '-50px';
      
      card.style.position = 'relative';
      card.appendChild(ripple);
      
      setTimeout(() => {
        card.removeChild(ripple);
      }, 600);
    });
  });

  // Package cards enhancement
  const packageCards = document.querySelectorAll('.package-card');
  packageCards.forEach(card => {
    const button = card.querySelector('button');
    
    card.addEventListener('mouseenter', () => {
      if (!card.classList.contains('featured')) {
        card.style.transform = 'translateY(-15px) scale(1.02)';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (!card.classList.contains('featured')) {
        card.style.transform = 'translateY(0) scale(1)';
      }
    });

    // Button click animation
    if (button) {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Add loading state
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;
        
        setTimeout(() => {
          button.textContent = originalText;
          button.disabled = false;
          window.location.href = 'contact.html';
        }, 800);
      });
    }
  });

  // Process steps progressive animation
  const processSteps = document.querySelectorAll('.step');
  const processObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const steps = entry.target.parentElement.querySelectorAll('.step');
        steps.forEach((step, index) => {
          setTimeout(() => {
            step.style.opacity = '1';
            step.style.transform = 'translateY(0)';
          }, index * 200);
        });
        processObserver.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const processContainer = document.querySelector('.process-steps');
  if (processContainer) {
    // Initially hide steps
    processSteps.forEach(step => {
      step.style.opacity = '0';
      step.style.transform = 'translateY(30px)';
      step.style.transition = 'all 0.6s ease';
    });
    
    processObserver.observe(processContainer);
  }

  // Add CSS for ripple animation if not exists
  if (!document.querySelector('#ripple-styles')) {
    const style = document.createElement('style');
    style.id = 'ripple-styles';
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

  // Smooth scroll for internal links
  const internalLinks = document.querySelectorAll('a[href^="#"]');
  internalLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
