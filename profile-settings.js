// Initialize settings menu
document.addEventListener('DOMContentLoaded', () => {
    const settingsMenu = document.querySelector('.settings-menu');
    const settingsSections = document.querySelectorAll('.settings-section');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Set active menu item and section
    function setActiveSection(sectionId) {
        // Update menu items
        settingsMenu.querySelectorAll('li').forEach(item => {
            item.classList.remove('active');
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            }
        });

        // Update sections
        settingsSections.forEach(section => {
            section.classList.remove('active');
            if (section.id === sectionId) {
                section.classList.add('active');
            }
        });
    }

    // Handle menu item clicks
    settingsMenu.addEventListener('click', (e) => {
        const menuItem = e.target.closest('li');
        if (menuItem) {
            const sectionId = menuItem.dataset.section;
            setActiveSection(sectionId);
        }
    });

    // Initialize profile form with current user data
    const profileForm = document.getElementById('profileForm');
    if (profileForm && currentUser) {
        document.getElementById('avatarColor').value = currentUser.avatarColor || '#4a90e2';
        document.getElementById('displayName').value = currentUser.displayName || '';
        document.getElementById('bio').value = currentUser.bio || '';
        document.getElementById('location').value = currentUser.location || '';
        document.getElementById('website').value = currentUser.website || '';

        // Update avatar preview
        const avatarPreview = document.querySelector('.profile-avatar-large');
        if (avatarPreview) {
            avatarPreview.style.backgroundColor = currentUser.avatarColor || '#4a90e2';
            avatarPreview.textContent = currentUser.displayName?.charAt(0) || 'U';
        }
    }

    // Handle profile form submission
    if (profileForm) {
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form values
            const updatedUser = {
                ...currentUser,
                avatarColor: document.getElementById('avatarColor').value,
                displayName: document.getElementById('displayName').value,
                bio: document.getElementById('bio').value,
                location: document.getElementById('location').value,
                website: document.getElementById('website').value
            };

            // Update user in users array
            const userIndex = users.findIndex(u => u.username === currentUser.username);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }

            // Show success message
            showNotification('Profile updated successfully!');
        });
    }

    // Handle account form submission
    const accountForm = document.getElementById('accountForm');
    if (accountForm) {
        accountForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            // Verify current password
            if (currentPassword !== currentUser.password) {
                showNotification('Current password is incorrect', 'error');
                return;
            }

            // Verify new password match
            if (newPassword !== confirmPassword) {
                showNotification('New passwords do not match', 'error');
                return;
            }

            // Update password
            const updatedUser = {
                ...currentUser,
                password: newPassword
            };

            // Update user in users array
            const userIndex = users.findIndex(u => u.username === currentUser.username);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }

            // Show success message
            showNotification('Password updated successfully!');
            accountForm.reset();
        });
    }

    // Handle privacy form submission
    const privacyForm = document.getElementById('privacyForm');
    if (privacyForm) {
        privacyForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const updatedUser = {
                ...currentUser,
                privacySettings: {
                    showEmail: document.getElementById('showEmail').checked,
                    showLocation: document.getElementById('showLocation').checked,
                    showWebsite: document.getElementById('showWebsite').checked
                }
            };

            // Update user in users array
            const userIndex = users.findIndex(u => u.username === currentUser.username);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }

            // Show success message
            showNotification('Privacy settings updated successfully!');
        });
    }

    // Handle notifications form submission
    const notificationsForm = document.getElementById('notificationsForm');
    if (notificationsForm) {
        notificationsForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const updatedUser = {
                ...currentUser,
                notificationSettings: {
                    emailNotifications: document.getElementById('emailNotifications').checked,
                    pushNotifications: document.getElementById('pushNotifications').checked,
                    mentions: document.getElementById('mentions').checked,
                    comments: document.getElementById('comments').checked
                }
            };

            // Update user in users array
            const userIndex = users.findIndex(u => u.username === currentUser.username);
            if (userIndex !== -1) {
                users[userIndex] = updatedUser;
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUser', JSON.stringify(updatedUser));
            }

            // Show success message
            showNotification('Notification settings updated successfully!');
        });
    }

    // Update avatar preview when color changes
    const avatarColorInput = document.getElementById('avatarColor');
    if (avatarColorInput) {
        avatarColorInput.addEventListener('input', (e) => {
            const avatarPreview = document.querySelector('.profile-avatar-large');
            if (avatarPreview) {
                avatarPreview.style.backgroundColor = e.target.value;
            }
        });
    }

    // Helper function to show notifications
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}); 