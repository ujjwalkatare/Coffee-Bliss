document.addEventListener("DOMContentLoaded", function () {
  // Loader Animation
  const loader = document.querySelector(".loader");

  // Hide loader after 1.5 seconds
  setTimeout(() => {
    loader.classList.add("fade-out");

    // Remove loader from DOM after animation completes
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }, 1500);

  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  mobileNavToggle.addEventListener("click", function () {
    const isExpanded = this.getAttribute("aria-expanded") === "true";
    this.setAttribute("aria-expanded", !isExpanded);
    mainNav.classList.toggle("active");

    // Toggle body scroll when mobile nav is open
    document.body.style.overflow = isExpanded ? "auto" : "hidden";
  });

  // Close mobile nav when clicking on a link
  const navLinks = document.querySelectorAll(".main-nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mainNav.classList.contains("active")) {
        mobileNavToggle.setAttribute("aria-expanded", "false");
        mainNav.classList.remove("active");
        document.body.style.overflow = "auto";
      }
    });
  });

  // Header Scroll Effect
  const header = document.querySelector(".header");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 100) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Scroll Reveal Animations
  const animateElements = document.querySelectorAll(
    ".animate-text, .animate-img, .animate-form, .animate-item"
  );

  const animateOnScroll = function () {
    animateElements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (elementPosition < windowHeight - 100) {
        element.classList.add("show");
      }
    });
  };

  // Initial check in case elements are already in view
  animateOnScroll();

  // Check on scroll
  window.addEventListener("scroll", animateOnScroll);

  // Counter Animation
  const statNumbers = document.querySelectorAll(".stat-number");

  const startCounter = function () {
    statNumbers.forEach((number) => {
      const target = parseInt(number.getAttribute("data-count"));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += increment;
        if (current < target) {
          number.textContent = Math.floor(current);
          requestAnimationFrame(updateCounter);
        } else {
          number.textContent = target;
        }
      };

      updateCounter();
    });
  };

  // Start counter when stats section is in view
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter();
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector(".stats");
  if (statsSection) {
    statsObserver.observe(statsSection);
  }

  // Menu Tabs
  const tabButtons = document.querySelectorAll(".tab-btn");
  const menuCategories = document.querySelectorAll(".category");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons and categories
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      menuCategories.forEach((cat) => cat.classList.remove("active"));

      // Add active class to clicked button
      this.classList.add("active");

      // Show corresponding category
      const category = this.getAttribute("data-category");
      document.querySelector(`.category.${category}`).classList.add("active");
    });
  });

  // Testimonials Slider
  const testimonials = document.querySelectorAll(".testimonial");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".testimonial-prev");
  const nextBtn = document.querySelector(".testimonial-next");
  let currentTestimonial = 0;

  function showTestimonial(index) {
    testimonials.forEach((testimonial) =>
      testimonial.classList.remove("active")
    );
    dots.forEach((dot) => dot.classList.remove("active"));

    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
    currentTestimonial = index;
  }

  nextBtn.addEventListener("click", function () {
    let nextIndex = currentTestimonial + 1;
    if (nextIndex >= testimonials.length) nextIndex = 0;
    showTestimonial(nextIndex);
  });

  prevBtn.addEventListener("click", function () {
    let prevIndex = currentTestimonial - 1;
    if (prevIndex < 0) prevIndex = testimonials.length - 1;
    showTestimonial(prevIndex);
  });

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => showTestimonial(index));
  });

  // Auto-rotate testimonials
  let testimonialInterval = setInterval(() => {
    let nextIndex = currentTestimonial + 1;
    if (nextIndex >= testimonials.length) nextIndex = 0;
    showTestimonial(nextIndex);
  }, 5000);

  // Pause auto-rotation on hover
  const testimonialsContainer = document.querySelector(
    ".testimonials-container"
  );
  testimonialsContainer.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

  testimonialsContainer.addEventListener("mouseleave", () => {
    testimonialInterval = setInterval(() => {
      let nextIndex = currentTestimonial + 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      showTestimonial(nextIndex);
    }, 5000);
  });

  // Back to Top Button
  const backToTopBtn = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Form Submission
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Here you would typically send the form data to a server
      // For demo purposes, we'll just show an alert
      alert(
        `Thank you, ${name}! Your message has been received. We'll get back to you soon at ${email}.`
      );

      // Reset form
      contactForm.reset();
    });
  }

  // Newsletter Form
  const newsletterForm = document.querySelector(".newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = this.querySelector('input[type="email"]');
      const email = emailInput.value;

      // Here you would typically send the email to a server
      // For demo purposes, we'll just show an alert
      alert(
        `Thank you for subscribing with ${email}! You'll receive our newsletter soon.`
      );

      // Reset form
      emailInput.value = "";
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
});
