// Login Form Submission
document.getElementById('loginForm')?.addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const staySignedIn = document.getElementById('staySignedIn').checked;

    chrome.storage.local.get(['userDetails'], (storedData) => {
        if (storedData.userDetails && storedData.userDetails.username === username && storedData.userDetails.password === password) {
            // Save login state based on "Stay Signed In" checkbox
            chrome.storage.local.set({ isLoggedIn: true, staySignedIn: staySignedIn }, () => {
                window.location.href = 'dashboard.html';
            });
        } else {
            alert('Invalid username or password');
        }
    });
});

// Check Login Status (Used on page load for persistent login)
function checkLoginStatus() {
    chrome.storage.local.get(['isLoggedIn', 'staySignedIn'], (data) => {
        if (data.isLoggedIn && (data.staySignedIn || data.isLoggedIn)) {
            // If "Stay Signed In" was checked, remain logged in
            window.location.href = 'dashboard.html';
        }
    });
}

// Call checkLoginStatus when the page loads
document.addEventListener('DOMContentLoaded', checkLoginStatus);

function redirectToLogin() {
    window.location.href = 'index.html';
}

// Register Form Submission
document.getElementById('registerForm').onsubmit = function(event) {
    event.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    // Store registration details
    const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password
    };
    
    chrome.storage.local.set({ userDetails: userDetails }, function() {
        alert('Registration successful');
        window.location.href = 'index.html';
    });
};

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