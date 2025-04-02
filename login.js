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

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const tabButtons = document.querySelectorAll('.tab-btn');

    // Tab switching functionality
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tab = button.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Show corresponding tab content
            loginTab.classList.remove('active');
            registerTab.classList.remove('active');
            document.getElementById(`${tab}-tab`).classList.add('active');
        });
    });

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('loginUsername').value;
            const password = document.getElementById('loginPassword').value;
            
            // Get existing users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Find user
            const user = users.find(u => u.username === username && u.password === password);
            
            if (user) {
                // Store current user in localStorage
                localStorage.setItem('user', JSON.stringify(user));
                
                // Redirect to home page
                window.location.href = 'index.html';
            } else {
                alert('Invalid username or password');
            }
        });
    }

    // Handle register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const username = document.getElementById('registerUsername').value;
            const displayName = document.getElementById('registerDisplayName').value;
            const password = document.getElementById('registerPassword').value;
            const confirmPassword = document.getElementById('registerConfirmPassword').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            
            // Get existing users from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];
            
            // Check if username already exists
            if (users.some(u => u.username === username)) {
                alert('Username already exists');
                return;
            }
            
            // Create new user
            const newUser = {
                username,
                displayName,
                password,
                joinDate: new Date().toISOString()
            };
            
            // Add new user to users array
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            
            // Store current user in localStorage
            localStorage.setItem('user', JSON.stringify(newUser));
            
            // Redirect to home page
            window.location.href = 'index.html';
        });
    }
}); 