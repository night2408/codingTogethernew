const urlParams = new URLSearchParams(location.search);

let roomId = urlParams.get("id");
if (!roomId) {
  roomId = Math.floor(Math.random() * 10000 + 10000);
  window.location.search = `id=${roomId}`;
}

// Setup WebSocket
const wsurl = `wss://s14842.blr1.piesocket.com/v3/${roomId}?api_key=6uOwcOJZ3ZMuoixiljKa01NXOhrSoT5QqWnwW8PB&notify_self=1`;
const socket = new WebSocket(wsurl);

// Elements
const textArea = document.getElementById("editor");
const typingStatus = document.getElementById("typingStatus");
const roomLinkInput = document.getElementById("roomLink");
const copyBtn = document.getElementById("copyBtn");

// Set room link
roomLinkInput.value = window.location.href;

// Copy button logic
copyBtn.addEventListener("click", () => {
  roomLinkInput.select();
  document.execCommand("copy");
  copyBtn.innerText = "Copied!";
  setTimeout(() => (copyBtn.innerText = "📋 Copy Link"), 2000);
});

// WebSocket events
socket.onopen = () => {};

socket.onmessage = (e) => {
  if (e.data === "__typing__") {
    typingStatus.innerText = "Your buddy is typing...";
    clearTimeout(typingStatus.timeout);
    typingStatus.timeout = setTimeout(() => {
      typingStatus.innerText = "";
    }, 1000);
  } else {
    textArea.value = e.data;
  }
};

// Typing event
let typingTimer;
textArea.addEventListener("input", () => {
  socket.send("__typing__");
  clearTimeout(typingTimer);
  typingTimer = setTimeout(() => {
    socket.send(textArea.value);
  }, 300);
});
