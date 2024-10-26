document.getElementById("send-button").addEventListener("click", () => {
    const message = document.getElementById("message-input").value;
    chrome.runtime.sendMessage({ type: "send-message", message });
    document.getElementById("message-input").value = '';
});

chrome.runtime.onMessage.addListener((request) => {
    if (request.type === "chat-message") {
        const chatWindow = document.getElementById("chat-window");
        const messageElement = document.createElement("p");
        messageElement.textContent = request.message;
        chatWindow.appendChild(messageElement);
    }
});
