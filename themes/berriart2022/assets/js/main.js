const btn = document.querySelector(".theme-switch input");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

btn.addEventListener("click", () => {
  if (prefersDarkScheme.matches) {
    document.documentElement.classList.toggle("light-mode");
    var theme = document.documentElement.classList.contains("light-mode")
      ? "light"
      : "dark";
  } else {
    document.documentElement.classList.toggle("dark-mode");
    var theme = document.documentElement.classList.contains("dark-mode")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});
