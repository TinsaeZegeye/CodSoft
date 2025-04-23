document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Functionality
  const menuToggle = document.getElementById("menu-toggle");
  const navItems = document.querySelector(".nav-items");
  const hamburger = document.querySelector(".hamburger");
  const contactBtn = document.querySelector(".contact");

  // Modal Elements
  const modalOverlay = document.querySelector(".contact-modal-overlay");
  const closeBtn = document.querySelector(".close-modal");

  // Toggle Mobile Menu
  if (hamburger) {
    hamburger.addEventListener("click", () => {
      navItems.classList.toggle("active");
    });
  }

  // Close Mobile Menu on Item Click
  document.querySelectorAll(".nav-items a").forEach(item => {
    item.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        menuToggle.checked = false;
        navItems.classList.remove("active");
      }
    });
  });

  // Contact Modal Functionality
  if (contactBtn) {
    contactBtn.addEventListener("click", (e) => {
      e.preventDefault();
      // Show Modal
      modalOverlay.style.display = "flex";
      
      // Close Mobile Menu if Open
      if (window.innerWidth <= 768) {
        menuToggle.checked = false;
        navItems.classList.remove("active");
      }
    });
  }

  // Close Modal Functionality
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      modalOverlay.style.display = "none";
    });
  }

  // Close Modal on Outside Click
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.style.display = "none";
    }
  });

  // Fix Select Dropdown Styling
  const industrySelect = document.getElementById("industry");
  if (industrySelect) {
    industrySelect.style.color = "#ffffff";
    
    industrySelect.addEventListener("focus", () => {
      industrySelect.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    });
    
    industrySelect.addEventListener("blur", () => {
      industrySelect.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
    });
  }

  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", (e) => {
      const targetId = anchor.getAttribute("href").substring(1);
      const targetEl = document.getElementById(targetId);
      
      if (targetEl && targetId !== "contact") {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Form Validation
  const contactForm = document.querySelector(".contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = {
        name: document.getElementById("name").value.trim(),
        email: document.getElementById("email").value.trim(),
        industry: document.getElementById("industry").value.trim(),
        message: document.getElementById("message").value.trim()
      };

      // Clear Previous Errors
      document.querySelectorAll(".error").forEach(error => error.remove());

      // Validate Fields
      let isValid = true;
      if (!formData.name) {
        showError("name", "Please enter your name");
        isValid = false;
      }
      if (!formData.email) {
        showError("email", "Please enter your email");
        isValid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        showError("email", "Please enter a valid email address");
        isValid = false;
      }
      if (!formData.industry) {
        showError("industry", "Please select an industry");
        isValid = false;
      }
      if (!formData.message) {
        showError("message", "Please enter a message");
        isValid = false;
      }

      if (isValid) {
        alert("Thank you! Your message has been sent.");
        contactForm.reset();
        modalOverlay.style.display = "none";
      }
    });
  }

  // Error Display Function
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const error = document.createElement("div");
    error.className = "error";
    error.style.color = "#ff4444";
    error.style.fontSize = "0.9rem";
    error.style.marginTop = "5px";
    error.textContent = message;
    field.parentNode.insertBefore(error, field.nextSibling);
  }

  // Skill Bars Animation
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          if (entry.target.id === "skills") {
            document.querySelectorAll(".skill-fill").forEach(bar => {
              bar.style.width = bar.getAttribute("data-level");
            });
          }
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  // Observe Sections
  document.querySelectorAll("main section").forEach(sec => {
    sec.classList.add("hidden");
    revealObserver.observe(sec);
  });
});