function toggleDarkMode() {
  const html = document.documentElement;
  html.classList.toggle("dark");
  localStorage.theme = html.classList.contains("dark") ? "dark" : "light";
}

if (localStorage.theme === "dark") {
  document.documentElement.classList.add("dark");
}

const chatbotContainer = document.getElementById("chatbotContainer");
const chatbotToggleBtn = document.getElementById("toggleChatbotBtn");
const closeChatbotBtn = document.getElementById("closeChatbotBtn");

function toggleChatbot(forceClose = false) {
  if (forceClose) {
    chatbotContainer.classList.add("hidden");
  } else {
    chatbotContainer.classList.toggle("hidden");
  }

  if (!chatbotContainer.classList.contains("hidden")) {
    document.getElementById("chatInput")?.focus();
  }
}

chatbotToggleBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleChatbot();
});

closeChatbotBtn?.addEventListener("click", (e) => {
  e.stopPropagation();
  toggleChatbot(true);
});

document.addEventListener("click", (event) => {
  const isInsideChatbot = chatbotContainer.contains(event.target);
  const isInsideButton = chatbotToggleBtn.contains(event.target);
  const isVisible = !chatbotContainer.classList.contains("hidden");

  if (!isInsideChatbot && !isInsideButton && isVisible) {
    toggleChatbot(true);
  }
});
