document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('screenshots');
  
    // Clear any initial text
    container.textContent = '';
  
    // Retrieve all saved screenshots from chrome.storage.local
    chrome.storage.local.get(null, (items) => {
      if (chrome.runtime.lastError) {
        console.error('Error retrieving data:', chrome.runtime.lastError);
        container.textContent = 'Failed to load screenshots.';
        return;
      }
  
      const keys = Object.keys(items);
  
      // If no screenshots are found, display a message
      if (keys.length === 0) {
        container.textContent = 'No screenshots saved.';
        return;
      }
  
      // Iterate through the saved screenshots
      keys.forEach((key) => {
        const img = document.createElement('img');
        img.src = items[key]; // Base64-encoded image string
  
        // Create a download button for each screenshot
        const downloadButton = document.createElement('button');
        downloadButton.textContent = `Download Screenshot (${key})`;
  
        downloadButton.addEventListener('click', () => {
          const a = document.createElement('a');
          a.href = img.src;
          a.download = `screenshot_${key}.png`;
          a.click();
        });
  
        // Append the image and download button to the container
        container.appendChild(img);
        container.appendChild(downloadButton);
      });
    });
  });
  