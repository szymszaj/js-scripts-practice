const root = document.documentElement;
const stage = document.querySelector(".phone-stage");
const FRAME_COUNT = 6;

function updateScrollProgress() {
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  root.style.setProperty("--p", progress.toFixed(4));

  const openProgress = Math.min(progress, 0.3) / 0.3;
  stage.dataset.frame = Math.round(openProgress * (FRAME_COUNT - 1));
}

updateScrollProgress();
window.addEventListener("scroll", updateScrollProgress, { passive: true });
window.addEventListener("resize", updateScrollProgress);
