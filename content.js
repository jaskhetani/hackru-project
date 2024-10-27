let currentUrl = location.href;

function detectUrlChange() {
  if (location.href !== currentUrl) {
    currentUrl = location.href;
    console.log("URL changed to:", currentUrl);
    chrome.runtime.sendMessage({ type: "urlChanged", url: currentUrl });
  }
}

// Detect SPA navigation (history changes)
window.addEventListener("popstate", detectUrlChange);
window.addEventListener("pushstate", detectUrlChange);

// Fallback: Check for URL changes every second
setInterval(detectUrlChange, 1000);
