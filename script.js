// Shahriar Namvar portfolio
// Header state, mobile menu, active nav link, experience tabs, and the hero network animation.

const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const year = document.querySelector("[data-year]");
const canvas = document.querySelector("[data-network]");

if (year) {
  year.textContent = new Date().getFullYear();
}

/* Header gets a glass background once the page scrolls ------------------ */
const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

setHeaderState();
window.addEventListener("scroll", setHeaderState, { passive: true });

/* Mobile menu ----------------------------------------------------------- */
navToggle?.addEventListener("click", () => {
  const isOpen = nav?.classList.toggle("is-open") ?? false;
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    nav.classList.remove("is-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

/* Highlight the nav link for the section in view ------------------------- */
const sections = Array.from(document.querySelectorAll("main section[id]"));
const navLinks = Array.from(document.querySelectorAll(".main-nav a"));

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
      });
    },
    { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.2, 0.45] }
  );

  sections.forEach((section) => observer.observe(section));
}

/* Experience tabs -------------------------------------------------------- */
const tabs = Array.from(document.querySelectorAll('[role="tab"]'));

const selectTab = (tab, moveFocus = false) => {
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", String(selected));
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute("aria-controls"));
    if (panel) panel.hidden = !selected;
  });
  if (moveFocus) tab.focus();
};

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => selectTab(tab));
  tab.addEventListener("keydown", (event) => {
    let next = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = tabs[(index + 1) % tabs.length];
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = tabs[(index - 1 + tabs.length) % tabs.length];
    if (event.key === "Home") next = tabs[0];
    if (event.key === "End") next = tabs[tabs.length - 1];
    if (next) {
      event.preventDefault();
      selectTab(next, true);
    }
  });
});

// Links elsewhere on the page (e.g. a project card) can open a specific tab.
document.querySelectorAll("[data-open-tab]").forEach((link) => {
  link.addEventListener("click", () => {
    const tab = document.getElementById(link.dataset.openTab);
    if (tab) selectTab(tab);
  });
});

/* Hero network animation ------------------------------------------------- */
if (canvas && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const context = canvas.getContext("2d");
  const points = [];
  let width = 0;
  let height = 0;
  let animationFrame = 0;

  const createPoints = () => {
    points.length = 0;
    const count = Math.max(54, Math.floor((width * height) / 24000));

    for (let index = 0; index < count; index += 1) {
      points.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.18,
        radius: 1 + Math.random() * 1.8,
      });
    }
  };

  const resizeCanvas = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    width = rect.width;
    height = rect.height;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    createPoints();
  };

  const drawNetwork = () => {
    context.clearRect(0, 0, width, height);

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, "rgba(79, 140, 255, 0.9)");
    gradient.addColorStop(0.55, "rgba(52, 211, 153, 0.9)");
    gradient.addColorStop(1, "rgba(255, 164, 91, 0.75)");

    points.forEach((point, index) => {
      point.x += point.vx;
      point.y += point.vy;

      if (point.x < -20) point.x = width + 20;
      if (point.x > width + 20) point.x = -20;
      if (point.y < -20) point.y = height + 20;
      if (point.y > height + 20) point.y = -20;

      for (let nextIndex = index + 1; nextIndex < points.length; nextIndex += 1) {
        const next = points[nextIndex];
        const dx = point.x - next.x;
        const dy = point.y - next.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 145) {
          context.strokeStyle = `rgba(170, 200, 255, ${0.17 * (1 - distance / 145)})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(next.x, next.y);
          context.stroke();
        }
      }

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(point.x, point.y, point.radius, 0, Math.PI * 2);
      context.fill();
    });

    animationFrame = window.requestAnimationFrame(drawNetwork);
  };

  resizeCanvas();
  drawNetwork();
  window.addEventListener("resize", resizeCanvas);
  window.addEventListener("beforeunload", () => window.cancelAnimationFrame(animationFrame));
}
