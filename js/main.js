(function () {
  var header = document.querySelector("[data-header]");
  var nav = document.querySelector("[data-nav]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  var progress = document.querySelector(".scroll-progress");
  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".site-nav a[href^='#']"));
  var sections = navLinks
    .map(function (link) {
      return document.querySelector(link.getAttribute("href"));
    })
    .filter(Boolean);

  function setScrollState() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - window.innerHeight;
    var progressWidth = height > 0 ? (scrollTop / height) * 100 : 0;

    if (header) {
      header.classList.toggle("is-scrolled", scrollTop > 10);
    }

    if (progress) {
      progress.style.width = progressWidth + "%";
    }

    var activeSection = sections[0];
    sections.forEach(function (section) {
      if (section.getBoundingClientRect().top <= 130) {
        activeSection = section;
      }
    });

    navLinks.forEach(function (link) {
      var current = document.querySelector(link.getAttribute("href"));
      link.classList.toggle("is-active", current === activeSection);
    });
  }

  function closeNav() {
    document.body.classList.remove("nav-open");
    if (nav) {
      nav.classList.remove("is-open");
    }
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (navToggle && nav) {
    navToggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      document.body.classList.toggle("nav-open", isOpen);
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        closeNav();
      }
    });
  }

  document.querySelectorAll("[data-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");
      var cards = document.querySelectorAll("[data-project-grid] .project-card");

      document.querySelectorAll("[data-filter]").forEach(function (item) {
        item.classList.toggle("is-active", item === button);
      });

      cards.forEach(function (card) {
        var categories = card.getAttribute("data-category") || "";
        var shouldShow = filter === "all" || categories.indexOf(filter) !== -1;
        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      closeNav();
    }
  });

  window.addEventListener("scroll", setScrollState, { passive: true });
  window.addEventListener("resize", setScrollState);
  setScrollState();
})();
