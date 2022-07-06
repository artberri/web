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
