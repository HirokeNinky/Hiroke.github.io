// Konfigurasi Discord OAuth2
const clientId = '784612789049360415'; // Ganti dengan client ID Discord Anda
const redirectUri = window.location.origin + '/dashboard.html'; // Pastikan sesuai dengan domain Anda
defaultScope = 'identify email';

// Tombol login dan logout
const loginBtn = document.getElementById('login-discord');
const logoutBtn = document.getElementById('logout-btn');

if (loginBtn) {
    loginBtn.onclick = function() {
        const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${defaultScope}`;
        window.location.href = url;
    };
}

// Setelah redirect dari Discord
window.onload = function() {
    // Jika sudah login dan berada di halaman login.html, redirect ke dashboard
    if (localStorage.getItem('discord_user') && window.location.pathname.endsWith('login.html')) {
        window.location.href = 'dashboard.html';
        return;
    }
    if (window.location.hash) {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = params.get('access_token');
        if (accessToken) {
            fetch('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            .then(res => res.json())
            .then(user => {
                // Simpan ke Firebase
                firebase.firestore().collection('users').doc(user.id).set({
                    id: user.id,
                    username: user.username,
                    avatar: user.avatar,
                    email: user.email
                }, { merge: true });
                localStorage.setItem('discord_user', JSON.stringify(user));
                if (loginBtn) loginBtn.style.display = 'none';
                if (logoutBtn) logoutBtn.style.display = 'block';
                // Redirect ke dashboard atau tampilkan dashboard
                window.location.href = 'dashboard.html';
            });
        }
    }
    // Tampilkan tombol sesuai status login
    const user = localStorage.getItem('discord_user');
    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
};

if (logoutBtn) {
    logoutBtn.onclick = function() {
        localStorage.removeItem('discord_user');
        window.location.href = 'login.html'; // Atau halaman login Anda
    };
} // Konfigurasi Discord OAuth2
const clientId = '784612789049360415'; // Ganti dengan client ID Discord Anda
const redirectUri = window.location.origin + '/dashboard.html'; // Pastikan sesuai dengan domain Anda
defaultScope = 'identify email';

// Tombol login dan logout
const loginBtn = document.getElementById('login-discord');
const logoutBtn = document.getElementById('logout-btn');

if (loginBtn) {
    loginBtn.onclick = function() {
        const url = `https://discord.com/api/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${defaultScope}`;
        window.location.href = url;
    };
}

// Setelah redirect dari Discord
window.onload = function() {
    // Jika sudah login dan berada di halaman login.html, redirect ke dashboard
    if (localStorage.getItem('discord_user') && window.location.pathname.endsWith('login.html')) {
        window.location.href = 'dashboard.html';
        return;
    }
    if (window.location.hash) {
        const params = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = params.get('access_token');
        if (accessToken) {
            fetch('https://discord.com/api/users/@me', {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            .then(res => res.json())
            .then(user => {
                // Simpan ke Firebase
                firebase.firestore().collection('users').doc(user.id).set({
                    id: user.id,
                    username: user.username,
                    avatar: user.avatar,
                    email: user.email
                }, { merge: true });
                localStorage.setItem('discord_user', JSON.stringify(user));
                if (loginBtn) loginBtn.style.display = 'none';
                if (logoutBtn) logoutBtn.style.display = 'block';
                // Redirect ke dashboard atau tampilkan dashboard
                window.location.href = 'dashboard.html';
            });
        }
    }
    // Tampilkan tombol sesuai status login
    const user = localStorage.getItem('discord_user');
    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
    }
};

if (logoutBtn) {
    logoutBtn.onclick = function() {
        localStorage.removeItem('discord_user');
        window.location.href = 'login.html'; // Atau halaman login Anda
    };
} 
