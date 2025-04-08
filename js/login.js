// Initialize users array if not exists
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
        {
            username: 'admin',
            password: 'admin123',
            role: 'admin',
            displayName: 'Admin'
        }
    ]));
}

document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const loginTab = document.querySelector('.tab-btn[data-tab="login"]');
    const registerTab = document.querySelector('.tab-btn[data-tab="register"]');
    const loginContent = document.getElementById('login-content');
    const registerContent = document.getElementById('register-content');

    // Tab switching functionality
    loginTab.addEventListener('click', function() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginContent.classList.add('active');
        registerContent.classList.remove('active');
    });

    registerTab.addEventListener('click', function() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerContent.classList.add('active');
        loginContent.classList.remove('active');
    });

    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('login-username').value;
        const password = document.getElementById('login-password').value;
        
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            // Store current user in localStorage
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'index.html';
        } else {
            alert('Invalid username or password');
        }
    });

    // Register form submission
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;
        const displayName = document.getElementById('register-display-name').value;
        
        // Validate password match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        
        // Check if username already exists
        const users = JSON.parse(localStorage.getItem('users')) || [];
        if (users.some(u => u.username === username)) {
            alert('Username already exists');
            return;
        }
        
        // Create new user
        const newUser = {
            username,
            password,
            displayName
        };
        
        // Add user to localStorage
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        
        // Store current user and redirect
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        window.location.href = 'index.html';
    });
}); 