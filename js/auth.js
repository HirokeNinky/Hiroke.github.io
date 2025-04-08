// Check authentication state
function checkAuthState() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const userMenu = document.querySelector('.user-menu');
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const userMenuText = document.querySelector('.user-menu-text');

    if (currentUser) {
        // User is logged in
        userMenuText.textContent = currentUser.displayName || 'Account';
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
    } else {
        // User is not logged in
        userMenuText.textContent = 'Login';
        loginBtn.style.display = 'block';
        registerBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
    }
}

// Initialize auth state
document.addEventListener('DOMContentLoaded', function() {
    checkAuthState();
    
    // Add logout event listener
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('currentUser');
            checkAuthState();
            window.location.href = 'index.html';
        });
    }
}); 