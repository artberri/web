const btn = document.querySelector(".theme-switch input");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

console.log({ matches: !!prefersDarkScheme.matches });

btn.addEventListener("click", () => {
  if (prefersDarkScheme.matches) {
    document.body.classList.toggle("light-mode");
    var theme = document.body.classList.contains("light-mode")
      ? "light"
      : "dark";
  } else {
    document.body.classList.toggle("dark-mode");
    var theme = document.body.classList.contains("dark-mode")
      ? "dark"
      : "light";
  }
  localStorage.setItem("theme", theme);
});
