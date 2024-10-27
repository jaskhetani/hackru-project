// Store the last known URL of each tab to detect changes
const lastUrls = {};

// Listen for tab updates to detect URL changes
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  // Proceed only if the URL has changed and the page is fully loaded
  if (changeInfo.status === 'complete' && tab.url) {
    // Check if the URL is different from the last known URL
    if (lastUrls[tabId] !== tab.url) {
      console.log(`URL changed for tab ${tabId}: ${tab.url}`);
      lastUrls[tabId] = tab.url; // Update the stored URL
      takeScreenshot(tabId); // Capture a screenshot
    }
  }
});

// Capture the visible content of the active tab
function takeScreenshot(tabId) {
  chrome.storage.local.get('isLoggedIn', (data) => {
    if (data.isLoggedIn) { // Proceed only if logged in
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, (image) => {
        if (chrome.runtime.lastError) {
          console.error('Failed to capture screenshot:', chrome.runtime.lastError);
          return;
        }

        console.log(`Screenshot captured for tab ${tabId}`);
        saveScreenshot(image);
      });
    } else {
      console.log('User is not logged in, screenshot not captured');
    }
  });
}


// Save the screenshot in chrome.storage.local with a timestamp
function saveScreenshot(imageData) {
  const timestamp = new Date().toISOString();

  chrome.storage.local.set({ [timestamp]: imageData }, () => {
    console.log(`Screenshot saved at ${timestamp}`);

    // Clean up old screenshots if more than 50 are stored
    chrome.storage.local.get(null, (items) => {
      const keys = Object.keys(items);
      if (keys.length > 50) {
        const oldestKey = keys.sort()[0]; // Get the oldest entry
        chrome.storage.local.remove(oldestKey, () => {
          console.log(`Deleted oldest screenshot: ${oldestKey}`);
        });
      }
    });
  });
}
