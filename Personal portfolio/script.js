// JavaScript to enhance functionality

document.addEventListener("DOMContentLoaded", () => {
  // Mobile Navigation Toggle
  const navItems = document.querySelector(".nav-items");
  const toggleNavButton = document.createElement("button");
  toggleNavButton.innerHTML = '<i class="fa-solid fa-bars"></i>';
  toggleNavButton.classList.add("mobile-nav-toggle");
  document.querySelector(".nav-bar").appendChild(toggleNavButton);

  toggleNavButton.addEventListener("click", () => {
    navItems.classList.toggle("active");
    toggleNavButton.innerHTML = navItems.classList.contains("active")
      ? '<i class="fa-solid fa-times"></i>'
      : '<i class="fa-solid fa-bars"></i>';
  });

  // Smooth Scrolling for Internal Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 50,
          behavior: "smooth",
        });
      }
    });
  });

  // Toggle Hidden Content in Sections
  document.querySelectorAll(".toggle-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const hiddenContent = link.nextElementSibling;
      if (hiddenContent) {
        hiddenContent.classList.toggle("active");
        link.textContent = hiddenContent.classList.contains("active")
          ? "Read Less"
          : "Read More";
      }
    });
  });

  // Add Active Class to Current Page Link
  const currentPage = window.location.pathname.split("/").pop();
  document.querySelectorAll(".nav-items a").forEach((link) => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    }
  });

  // Lazy Load Images
  const images = document.querySelectorAll("img[data-src]");
  const lazyLoad = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.onload = () => img.classList.add("loaded");
        observer.unobserve(img);
      }
    });
  };

  const imageObserver = new IntersectionObserver(lazyLoad, {
    rootMargin: "50px 0px",
    threshold: 0.01,
  });

  images.forEach((img) => imageObserver.observe(img));
});