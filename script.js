// Enhanced Mobile Navigation Toggle with Animations
document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");
  const body = document.body;

  // Create backdrop overlay
  const backdrop = document.createElement("div");
  backdrop.className = "mobile-nav-backdrop";
  backdrop.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease-out;
    z-index: 998;
    backdrop-filter: blur(2px);
  `;
  body.appendChild(backdrop);

  // Toggle mobile menu with enhanced animations
  navToggle.addEventListener("click", function (e) {
    e.stopPropagation();
    const isActive = navToggle.classList.contains("active");

    if (isActive) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  function openMenu() {
    navToggle.classList.add("active");
    navMenu.classList.add("active");
    backdrop.style.opacity = "1";
    backdrop.style.visibility = "visible";
    body.style.overflow = "hidden"; // Prevent scrolling when menu is open

    // Add stagger animation to menu items
    const menuItems = navMenu.querySelectorAll(".nav-link, .nav-cta");
    menuItems.forEach((item, index) => {
      item.style.transitionDelay = `${(index + 1) * 0.05}s`;
    });
  }

  function closeMenu() {
    navToggle.classList.remove("active");
    navMenu.classList.remove("active");
    backdrop.style.opacity = "0";
    backdrop.style.visibility = "hidden";
    body.style.overflow = ""; // Restore scrolling

    // Reset transition delays
    const menuItems = navMenu.querySelectorAll(".nav-link, .nav-cta");
    menuItems.forEach((item) => {
      item.style.transitionDelay = "0s";
    });
  }

  // Close mobile menu when clicking on nav links
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setTimeout(closeMenu, 150); // Small delay for better UX
    });
  });

  // Close mobile menu when clicking backdrop
  backdrop.addEventListener("click", closeMenu);

  // Close mobile menu when clicking outside
  document.addEventListener("click", function (event) {
    const isClickInsideNav =
      navMenu.contains(event.target) || navToggle.contains(event.target);
    if (!isClickInsideNav && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Close menu on escape key
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });

  // Handle window resize
  window.addEventListener("resize", function () {
    if (window.innerWidth > 768 && navMenu.classList.contains("active")) {
      closeMenu();
    }
  });
});

// Gallery Carousel Functionality
document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.getElementById("gallery-carousel");
  const slides = carousel.querySelectorAll(".carousel-slide");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dotsContainer = document.getElementById("carousel-dots");

  let currentSlide = 0;
  const totalSlides = slides.length;

  // Create dots
  function createDots() {
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("div");
      dot.classList.add("carousel-dot");
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goToSlide(i));
      dotsContainer.appendChild(dot);
    }
  }

  // Update carousel position
  function updateCarousel() {
    const track = carousel.querySelector(".carousel-track");
    track.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  // Go to specific slide
  function goToSlide(index) {
    currentSlide = index;
    updateCarousel();
  }

  // Next slide
  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  // Previous slide
  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  // Event listeners
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  // Touch/swipe support for mobile
  let startX = 0;
  let endX = 0;

  carousel.addEventListener("touchstart", function (e) {
    startX = e.touches[0].clientX;
  });

  carousel.addEventListener("touchend", function (e) {
    endX = e.changedTouches[0].clientX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // Keyboard navigation
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  // Auto-play (optional)
  let autoPlayInterval;
  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Pause auto-play on hover
  carousel.addEventListener("mouseenter", stopAutoPlay);
  carousel.addEventListener("mouseleave", startAutoPlay);

  // Initialize
  createDots();
  startAutoPlay();
});

// Contact Form Handling
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const phone = formData.get("phone");
      const service = formData.get("service");
      const message = formData.get("message");

      // Basic validation
      if (!name || !email || !phone || !message) {
        alert("Please fill in all required fields.");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }

      // Phone validation
      const phoneRegex = /^[\d\s\-\(\)\+]{10,}$/;
      if (!phoneRegex.test(phone)) {
        alert("Please enter a valid phone number.");
        return;
      }

      // Success message
      alert("Thank you for your message! We will contact you within 24 hours.");
      contactForm.reset();
    });
  }
});

// Smooth Scrolling for Navigation Links
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll('a[href^="#"]');

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector(".header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// Fixed Intersection Observer for Animations (No Glitches)
document.addEventListener("DOMContentLoaded", function () {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -80px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.classList.contains("animate")) {
        // Add animation class
        entry.target.classList.add("animate");

        // Stop observing this element to prevent re-triggering
        observer.unobserve(entry.target);

        // Add stagger effect for service cards
        if (entry.target.classList.contains("service-card")) {
          const allServiceCards = document.querySelectorAll(".service-card");
          const cardIndex = Array.from(allServiceCards).indexOf(entry.target);
          entry.target.style.animationDelay = `${cardIndex * 0.1}s`;
        }

        // Add stagger effect for about section features
        if (
          entry.target.classList.contains("feature") &&
          entry.target.closest(".about-features")
        ) {
          const allFeatures = document.querySelectorAll(
            ".about-features .feature.animate-element"
          );
          const featureIndex = Array.from(allFeatures).indexOf(entry.target);
          entry.target.style.animationDelay = `${featureIndex * 0.15}s`;
        }

        // Add stagger effect for about stat boxes
        if (
          entry.target.classList.contains("stat-box") &&
          entry.target.closest(".about-stats")
        ) {
          const allStatBoxes = document.querySelectorAll(
            ".about-stats .stat-box.animate-element"
          );
          const statIndex = Array.from(allStatBoxes).indexOf(entry.target);
          entry.target.style.animationDelay = `${statIndex * 0.2}s`;
        }
      }
    });
  }, observerOptions);

  // Observe service cards with initial state reset
  const serviceCards = document.querySelectorAll(".service-card");
  serviceCards.forEach((card) => {
    card.classList.remove("animate");
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    observer.observe(card);
  });

  // Observe testimonial cards
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  testimonialCards.forEach((card) => {
    card.classList.remove("animate");
    observer.observe(card);
  });

  // Observe specific about section elements only
  const aboutText = document.querySelector(".about-text.animate-element");
  if (aboutText) {
    aboutText.classList.remove("animate");
    observer.observe(aboutText);
  }

  const aboutFeatures = document.querySelectorAll(
    ".about-features .feature.animate-element"
  );
  aboutFeatures.forEach((feature) => {
    feature.classList.remove("animate");
    observer.observe(feature);
  });

  const aboutStats = document.querySelectorAll(
    ".about-stats .stat-box.animate-element"
  );
  aboutStats.forEach((stat) => {
    stat.classList.remove("animate");
    observer.observe(stat);
  });

  const aboutImage = document.querySelector(".about-image.animate-element");
  if (aboutImage) {
    aboutImage.classList.remove("animate");
    observer.observe(aboutImage);
  }
});

// Header scroll effect
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      header.style.backgroundColor = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "none";
    }
  });
});

// Active navigation link highlighting
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateActiveNavLink);
});
