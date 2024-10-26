//  http://127.0.0.1:7681

let socket;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "start-chat") {
        socket = new WebSocket("ws://localhost:8080"); // Connect to the C server's WebSocket

        socket.onopen = () => {
            console.log("Connected to C WebSocket server.");
        };

        socket.onmessage = (event) => {
            console.log("Message from server:", event.data);
            // Relay the message to the content script or popup
            chrome.runtime.sendMessage({ type: "chat-message", message: event.data });
        };

        socket.onerror = (error) => {
            console.error("WebSocket Error:", error);
        };
    }

    if (request.type === "send-message" && socket && socket.readyState === WebSocket.OPEN) {
        socket.send(request.message);
    }
});
