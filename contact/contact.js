// Contact page functionality
document.addEventListener("DOMContentLoaded", () => {
  // === Animate-on-scroll functionality ===
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

  // === Contact form functionality ===
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const formData = new FormData(contactForm);
      const formObject = {};

      for (let [key, value] of formData.entries()) {
        formObject[key] = value;
      }

      // Validate required fields
      const requiredFields = ['name', 'email', 'subject', 'message'];
      let isValid = true;

      requiredFields.forEach(field => {
        const input = document.getElementById(field);
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = '#ff4444';
          setTimeout(() => {
            input.style.borderColor = '#e0e0e0';
          }, 3000);
        }
      });

      if (!isValid) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const emailInput = document.getElementById('email');

      if (!emailRegex.test(emailInput.value)) {
        emailInput.style.borderColor = '#ff4444';
        showMessage('Please enter a valid email address.', 'error');
        setTimeout(() => {
          emailInput.style.borderColor = '#e0e0e0';
        }, 3000);
        return;
      }

      // Submit to Google Apps Script Web App
      const submitButton = contactForm.querySelector('button');
      const originalText = submitButton.textContent;

      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;

      fetch('https://script.google.com/macros/s/AKfycbwbFQqHBKhPrVB8eol3IGd01IfMnbITyZV9htQY_HeBF-u-kznNkxpV3lIVk79ga4QS/exec', { // 🔁 Replace with your Google Apps Script Web App URL
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formObject)
      })
        .then(() => {
          submitButton.textContent = originalText;
          submitButton.disabled = false;

          showMessage('Thanks! Your message was sent.', 'success');
          contactForm.reset();
        })
        .catch((err) => {
          console.error('Submission error:', err);
          submitButton.textContent = originalText;
          submitButton.disabled = false;
          showMessage('Sorry! Please try again.', 'error');
        });
    });
  }

  // === Form success/error message ===
  function showMessage(message, type) {
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }

    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;

    messageDiv.style.cssText = `
      padding: 1rem;
      margin: 1rem 0;
      border-radius: 8px;
      text-align: center;
      font-weight: 600;
      animation: slideIn 0.3s ease;
      ${type === 'success'
        ? 'background-color: #d4edda; color: #155724; border: 1px solid #c3e6cb;'
        : 'background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb;'
      }
    `;

    contactForm.insertAdjacentElement('afterend', messageDiv);

    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          messageDiv.remove();
        }, 300);
      }
    }, 5000);
  }

  // === Add CSS animations ===
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-20px); }
    }
  `;
  document.head.appendChild(style);

  // === Smooth scrolling ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
});
