const slider = document.getElementById("projectSlider");
const originalSlides = [...slider.children];
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentIndex = originalSlides.length;
let isTransitioning = false;
let autoplayInterval;
let userInteracting = false;
let interactionTimeout;

// Clone slides for infinite effect
function setupClones() {
  const startClones = originalSlides.map(slide => {
    const clone = slide.cloneNode(true);
    clone.classList.add("clone");
    return clone;
  });
  const endClones = originalSlides.map(slide => {
    const clone = slide.cloneNode(true);
    clone.classList.add("clone");
    return clone;
  });

  startClones.reverse().forEach(clone => slider.insertBefore(clone, slider.firstChild));
  endClones.forEach(clone => slider.appendChild(clone));
}

function getCardWidth() {
  return originalSlides[0].offsetWidth + 24;
}

function updateSliderPosition(smooth = true) {
  const cardWidth = getCardWidth();
  slider.style.transition = smooth ? "transform 0.4s ease" : "none";
  slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}

function resetIndexIfNeeded() {
  const total = originalSlides.length;
  if (currentIndex >= total * 2) {
    currentIndex = total;
    updateSliderPosition(false);
  } else if (currentIndex < total) {
    currentIndex = total + (currentIndex % total);
    updateSliderPosition(false);
  }
}

function goToNext() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentIndex++;
  updateSliderPosition(true);

  setTimeout(() => {
    resetIndexIfNeeded();
    isTransitioning = false;
  }, 300);
}

function goToPrev() {
  if (isTransitioning) return;
  isTransitioning = true;

  currentIndex--;
  updateSliderPosition(true);

  setTimeout(() => {
    resetIndexIfNeeded();
    isTransitioning = false;
  }, 300);
}

function startAutoplay() {
  autoplayInterval = setInterval(() => {
    if (!userInteracting) goToNext();
  }, 1500);
}

function pauseAutoplayTemporarily() {
  userInteracting = true;
  clearInterval(autoplayInterval);
  clearTimeout(interactionTimeout);
  interactionTimeout = setTimeout(() => {
    userInteracting = false;
    startAutoplay();
  }, 2000);
}

function handleSlideHover(card) {
  card.addEventListener("mouseenter", () => {
    card.classList.add("show-caption");
    pauseAutoplayTemporarily();
  });
  card.addEventListener("mouseleave", () => {
    card.classList.remove("show-caption");
  });
  card.addEventListener("touchstart", () => {
    card.classList.add("show-caption");
    pauseAutoplayTemporarily();
  });
}

// Re-init everything on load
window.addEventListener("load", () => {
  setupClones();

  const total = originalSlides.length;
  currentIndex = total;
  updateSliderPosition(false);

  const allSlides = slider.querySelectorAll(".slide-card");
  allSlides.forEach(card => handleSlideHover(card));

  startAutoplay();
});

prevBtn.addEventListener("click", () => {
  goToPrev();
  pauseAutoplayTemporarily();
});

nextBtn.addEventListener("click", () => {
  goToNext();
  pauseAutoplayTemporarily();
});

window.addEventListener("resize", () => {
  updateSliderPosition(false);
});
