
// Contact page functionality
document.addEventListener("DOMContentLoaded", () => {
  // Scroll animation for contact page
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

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
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
      
      // Validate email format
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
      
      // Send email using EmailJS
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Sending...';
      submitButton.disabled = true;
      
      // Initialize EmailJS (replace with your actual keys)
      emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
      
      // Send email
      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
        from_name: formObject.name,
        from_email: formObject.email,
        phone: formObject.phone || 'Not provided',
        subject: formObject.subject,
        message: formObject.message,
        to_name: "B500 Concepts",
      })
      .then(() => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Show success message
        showMessage('Thank you for your message! We\'ll get back to you within 24 hours.', 'success');
        
        // Reset form
        contactForm.reset();
      })
      .catch((error) => {
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        console.error('EmailJS error:', error);
        showMessage('Sorry, there was an error sending your message. Please try again or contact us directly.', 'error');
      });
    });
  }
  
  // Show message function
  function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    // Create new message element
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message ${type}`;
    messageDiv.textContent = message;
    
    // Style the message
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
    
    // Insert message after form
    contactForm.insertAdjacentElement('afterend', messageDiv);
    
    // Remove message after 5 seconds
    setTimeout(() => {
      if (messageDiv.parentNode) {
        messageDiv.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
          messageDiv.remove();
        }, 300);
      }
    }, 5000);
  }
  
  // Add CSS animations
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
  
  // Smooth scrolling for internal links
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
