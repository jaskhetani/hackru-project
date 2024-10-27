// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    chrome.storage.local.get(['username', 'password'], (storedData) => {
        if (storedData.username === username && storedData.password === password) {
            chrome.storage.local.set({ isLoggedIn: true }, () => {
                window.location.href = 'dashboard.html';
            });
        } else {
            alert('Invalid username or password');
        }
    });
});
function redirectToLogin() {
    window.location.href = 'index.html';
}

// Register Form Submission
document.getElementById('registerForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    chrome.storage.local.set({ username, password }, () => {
        alert('Registration successful! You can now log in.');
        window.location.href = 'index.html';
    });
});

// Logout Button Functionality in Dashboard
document.getElementById('logoutButton')?.addEventListener('click', () => {
    chrome.storage.local.set({ isLoggedIn: false }, () => {
        window.location.href = 'index.html';
    });
});

// Check Login Status (Used in Dashboard/Screenshots)
function checkLoginStatus() {
    chrome.storage.local.get('isLoggedIn', (data) => {
        if (!data.isLoggedIn) {
            window.location.href = 'index.html';
        }
    });
}

// Popup.js Content: Load and Display Screenshots
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('screenshots');
    container.textContent = '';

    chrome.storage.local.get(null, (items) => {
        if (chrome.runtime.lastError) {
            container.textContent = 'Failed to load screenshots.';
            return;
        }

        const keys = Object.keys(items);
        if (keys.length === 0) {
            container.textContent = 'No screenshots saved.';
            return;
        }

        keys.forEach((key) => {
            const img = document.createElement('img');
            img.src = items[key];

            const downloadButton = document.createElement('button');
            downloadButton.textContent = `Download Screenshot (${key})`;
            downloadButton.addEventListener('click', () => {
                const a = document.createElement('a');
                a.href = img.src;
                a.download = `screenshot_${key}.png`;
                a.click();
            });

            container.appendChild(img);
            container.appendChild(downloadButton);
        });
    });
});
function navigateToSection(sectionId) {
    document.querySelectorAll('.dashboard-container section').forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById(sectionId).style.display = 'block';
}

// Event listeners for navigation links
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const sectionId = event.target.getAttribute('href').substring(1);
        navigateToSection(sectionId);
    });
});

// Initialize the dashboard by showing the home section
navigateToSection('home');

function goBackToDashboard() {
    window.location.href = "dashboard.html";
  }

// Logout Button Functionality in Dashboard
document.addEventListener('DOMContentLoaded', () => {
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            chrome.storage.local.set({ isLoggedIn: false }, () => {
                window.location.href = 'index.html';
            });
        });
    }
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    const user = {
        getFirstName: function() {
            return firstName;
        },
        getLastName: function() {
            return lastName;
        }
    };
});

/*document.getElementById('logoutButton').addEventListener('click', () => {
    chrome.storage.local.set({ isLoggedIn: false }, () => {
      window.location.href = 'index.html'; // Redirect to login page after logging out
    });
  });

/*
function checkLoginStatus() {
    chrome.storage.local.get('isLoggedIn', (data) => {
        if (!data.isLoggedIn) {
            window.location.href = 'index.html';
        }
    });
}*/