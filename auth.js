// Check if user is logged in
function checkAuthState() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userMenu = document.querySelector('.user-menu');
    const loginBtn = document.querySelector('.login-btn');
    const registerBtn = document.querySelector('.register-btn');
    const logoutBtn = document.querySelector('.logout-btn');
    const userMenuText = document.querySelector('.user-menu-text');

    if (user) {
        // User is logged in
        userMenu.classList.add('logged-in');
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'flex';
        if (userMenuText) userMenuText.textContent = user.displayName || 'Account';
    } else {
        // User is not logged in
        userMenu.classList.remove('logged-in');
        if (loginBtn) loginBtn.style.display = 'flex';
        if (registerBtn) registerBtn.style.display = 'flex';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userMenuText) userMenuText.textContent = 'Login';
    }
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('user');
    checkAuthState();
    window.location.href = 'index.html';
}

// Initialize auth state when page loads
document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();

    // Add logout event listener
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}); 