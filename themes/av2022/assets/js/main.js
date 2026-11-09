const btn = document.querySelector(".theme-switch input");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

btn.addEventListener("click", () => {
  const userSystemPreference = prefersDarkScheme.matches ? "dark" : "light";
  const toggleClass = userSystemPreference === "dark" ? "light" : "dark";
  document.documentElement.classList.toggle(toggleClass);
  const userCurrentPreference = document.documentElement.classList.contains(
    toggleClass
  )
    ? toggleClass
    : userSystemPreference;
  localStorage.setItem("theme", userCurrentPreference);
});

// Home: a soft spotlight follows the mouse. Touch screens and reduced motion
// keep the static glow set in home.css.
const home = document.querySelector(".home");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

if (home && !reducedMotion.matches) {
  let frame = 0;
  home.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      const rect = home.getBoundingClientRect();
      home.style.setProperty("--x", `${event.clientX - rect.left}px`);
      home.style.setProperty("--y", `${event.clientY - rect.top}px`);
    });
  });
}
