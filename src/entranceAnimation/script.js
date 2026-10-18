const PRELOAD_DURATION = 900;

document.body.classList.add("is-loading");

window.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const doors = document.getElementById("doors");

  setTimeout(() => {
    preloader.classList.add("preloader--hidden");
    doors.classList.add("doors--open");
    document.body.classList.remove("is-loading");
  }, PRELOAD_DURATION);
});
