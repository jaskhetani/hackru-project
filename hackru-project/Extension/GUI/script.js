document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Perform login validation (this is just a simple example)
    if (username === 'user' && password === 'password') {
        // Redirect to the dashboard page upon successful login
        window.location.href = 'dashboard.html';
    } else {
        alert('Invalid username or password');
    }
});
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
    // Send the ID token to your server
    var id_token = googleUser.getAuthResponse().id_token;
    console.log('ID Token: ' + id_token);
}