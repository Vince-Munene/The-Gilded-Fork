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
const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");
const sendbtn = document.getElementById("sendbtn");
const thinkingIndicator = document.getElementById("thinkingIndicator");

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

// Send message when pressing Enter or clicking send button
chatInput.addEventListener("keydown", async (e) => {
  if (e.key === "Enter" && chatInput.value.trim()) {
    await handleUserMessage(chatInput.value.trim());
  }
});

sendbtn.addEventListener("click", async (e) => {
  if (chatInput.value.trim()) {
    await handleUserMessage(chatInput.value.trim());
  }
});

// Sending message to the API and get responses
async function handleUserMessage(userText) {
  appendMessage(userText, "user");
  showThinking(true);
  chatInput.value = "";

  try {
    const response = await fetch("https://the-gilded-fork.onrender.com/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question: userText }),
    });

    const data = await response.json();
    showThinking(false);

    if (data.answer) {
      appendMessage(data.answer, "bot");
    } else {
      appendMessage("Oops! Something went wrong.", "bot");
    }
  } catch (err) {
    showThinking(false);
    appendMessage("Error connecting to the server.", "bot");
  }
}

// Appending message to coresponding corner
function appendMessage(text, sender) {
  const wrapper = document.createElement("div");
  wrapper.className = `flex ${
    sender === "user" ? "justify-end" : "justify-start"
  }`;

  const bubble = document.createElement("div");
  bubble.className = `p-3 rounded-lg max-w-[80%] shadow-md border ${
    sender === "user"
      ? "bg-[#E8E8E8] text-[#333] border-[#8EB7D8]"
      : "bg-[#FBF5D5] text-[#333] border-[#8EB7D8]"
  }`;

  bubble.innerHTML = `<p>${text}</p>`;
  wrapper.appendChild(bubble);
  thinkingIndicator.insertAdjacentElement("beforebegin", wrapper);

  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showThinking(show) {
  thinkingIndicator.style.display = show ? "flex" : "none";
}

// Initially hide "thinking"
showThinking(false);

document.addEventListener("click", (event) => {
  const isInsideChatbot = chatbotContainer.contains(event.target);
  const isInsideButton = chatbotToggleBtn.contains(event.target);
  const isVisible = !chatbotContainer.classList.contains("hidden");

  if (!isInsideChatbot && !isInsideButton && isVisible) {
    toggleChatbot(true);
  }
});
