const cards = document.getElementById("cards");
const dots = [...document.querySelectorAll(".dot")];
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const modal = document.getElementById("modal");
const openModal = document.getElementById("openModal");
const closeModal = document.getElementById("closeModal");
const storyForm = document.getElementById("storyForm");
const story = document.getElementById("story");
const counter = document.getElementById("counter");
const successMessage = document.getElementById("successMessage");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

let current = 0;

function visibleCards() {
  return window.innerWidth <= 780 ? 1 : 2;
}

function updateCarousel() {
  const total = document.querySelectorAll(".testimonial-card").length;
  const max = Math.max(0, total - visibleCards());
  current = Math.min(current, max);

  const card = document.querySelector(".testimonial-card");
  if (!card) return;

  const gap = 18;
  const cardWidth = card.getBoundingClientRect().width;
  cards.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;

  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === current);
  });

  prevBtn.disabled = current === 0;
  nextBtn.disabled = current >= max;
  prevBtn.style.opacity = current === 0 ? ".45" : "1";
  nextBtn.style.opacity = current >= max ? ".45" : "1";
}

prevBtn.addEventListener("click", () => {
  if (current > 0) {
    current--;
    updateCarousel();
  }
});

nextBtn.addEventListener("click", () => {
  const max = Math.max(0, document.querySelectorAll(".testimonial-card").length - visibleCards());
  if (current < max) {
    current++;
    updateCarousel();
  }
});

dots.forEach(dot => {
  dot.addEventListener("click", () => {
    current = Number(dot.dataset.index);
    updateCarousel();
  });
});

window.addEventListener("resize", updateCarousel);
updateCarousel();

function showModal() {
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  setTimeout(() => story.focus(), 100);
}

function hideModal() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

openModal.addEventListener("click", showModal);
closeModal.addEventListener("click", hideModal);

modal.addEventListener("click", (event) => {
  if (event.target === modal) hideModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal.classList.contains("open")) hideModal();
});

story.addEventListener("input", () => {
  counter.textContent = story.value.length;
});

storyForm.addEventListener("submit", (event) => {
  event.preventDefault();
  storyForm.style.display = "none";
  successMessage.classList.add("show");
});

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});
