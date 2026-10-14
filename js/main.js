/* Small progressive enhancements. The portfolio still works if JavaScript is disabled. */
"use strict";

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    navigation.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      menuButton.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      menuButton.focus();
    }
  });
}

/* Fade sections in as they enter the viewport. */
const revealItems = document.querySelectorAll(".reveal");
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if ("IntersectionObserver" in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

/* Keep the footer year current without any external service. */
const year = document.querySelector("#year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

/* Draw a lightweight network of moving nodes behind the portfolio content. */
const motionCanvas = document.createElement("canvas");
motionCanvas.className = "network-canvas";
motionCanvas.setAttribute("aria-hidden", "true");
document.body.prepend(motionCanvas);

const motionContext = motionCanvas.getContext("2d");
const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let networkNodes = [];
let animationFrame = 0;
let canvasWidth = 0;
let canvasHeight = 0;

function sizeNetworkCanvas() {
  const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
  canvasWidth = window.innerWidth;
  canvasHeight = window.innerHeight;
  motionCanvas.width = Math.round(canvasWidth * pixelRatio);
  motionCanvas.height = Math.round(canvasHeight * pixelRatio);
  motionCanvas.style.width = `${canvasWidth}px`;
  motionCanvas.style.height = `${canvasHeight}px`;
  motionContext.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

  const count = Math.min(64, Math.max(24, Math.round(canvasWidth / 22)));
  networkNodes = Array.from({ length: count }, () => ({
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
    vx: (Math.random() - 0.5) * 0.34,
    vy: (Math.random() - 0.5) * 0.34,
    radius: Math.random() * 1.4 + 0.6
  }));
}

function drawNetwork() {
  if (!motionContext) return;
  motionContext.clearRect(0, 0, canvasWidth, canvasHeight);
  const linkDistance = canvasWidth < 680 ? 105 : 145;

  networkNodes.forEach((node, index) => {
    node.x += node.vx;
    node.y += node.vy;
    if (node.x < 0 || node.x > canvasWidth) node.vx *= -1;
    if (node.y < 0 || node.y > canvasHeight) node.vy *= -1;

    for (let otherIndex = index + 1; otherIndex < networkNodes.length; otherIndex += 1) {
      const other = networkNodes[otherIndex];
      const distance = Math.hypot(node.x - other.x, node.y - other.y);
      if (distance < linkDistance) {
        motionContext.beginPath();
        motionContext.moveTo(node.x, node.y);
        motionContext.lineTo(other.x, other.y);
        motionContext.strokeStyle = `rgba(48, 230, 180, ${(1 - distance / linkDistance) * 0.16})`;
        motionContext.lineWidth = 0.7;
        motionContext.stroke();
      }
    }

    motionContext.beginPath();
    motionContext.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
    motionContext.fillStyle = "rgba(95, 255, 204, 0.48)";
    motionContext.fill();
  });

  animationFrame = window.requestAnimationFrame(drawNetwork);
}

function startNetwork() {
  window.cancelAnimationFrame(animationFrame);
  sizeNetworkCanvas();
  if (motionPreference.matches) {
    drawNetwork();
    window.cancelAnimationFrame(animationFrame);
    return;
  }
  drawNetwork();
}

window.addEventListener("resize", startNetwork, { passive: true });
motionPreference.addEventListener?.("change", startNetwork);
startNetwork();
