function toggleDarkMode() {
  const html = document.documentElement;
  html.classList.toggle("dark");
  localStorage.theme = html.classList.contains("dark") ? "dark" : "light";
}

if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
}
