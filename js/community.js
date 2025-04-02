// User Management System
const users = JSON.parse(localStorage.getItem('users')) || [
    {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        displayName: 'Admin',
        bio: 'Administrator of the community',
        avatar: 'image/default-avatar.png'
    }
];

// Check if user is logged in
const currentUser = JSON.parse(localStorage.getItem('currentUser'));
if (!currentUser) {
    window.location.href = 'login.html';
}

// Initialize users array if not exists
if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
        {
            username: 'admin',
            password: 'admin123',
            role: 'admin',
            displayName: 'Admin',
            bio: 'Administrator of the community',
            avatar: 'image/default-avatar.png'
        }
    ]));
}

// Profile Menu Functionality
const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');
const userDisplayName = document.getElementById('userDisplayName');
const dropdownDisplayName = document.getElementById('dropdownDisplayName');
const dropdownUsername = document.getElementById('dropdownUsername');
const postCount = document.getElementById('postCount');
const commentCount = document.getElementById('commentCount');
const editProfileBtn = document.getElementById('editProfileBtn');
const logoutBtn = document.getElementById('logoutBtn');

// Update profile information
function updateProfileInfo() {
    const users = JSON.parse(localStorage.getItem('users'));
    const user = users.find(u => u.username === currentUser.username);
    
    if (user) {
        userDisplayName.textContent = user.displayName;
        dropdownDisplayName.textContent = user.displayName;
        dropdownUsername.textContent = `@${user.username}`;
        
        // Update user stats
        const posts = JSON.parse(localStorage.getItem('posts')) || [];
        const userPosts = posts.filter(p => p.author.username === user.username);
        const userComments = posts.reduce((count, post) => {
            return count + post.comments.filter(c => c.author.username === user.username).length;
        }, 0);
        
        postCount.textContent = userPosts.length;
        commentCount.textContent = userComments;
    }
}

// Toggle profile dropdown
profileBtn.addEventListener('click', () => {
    profileDropdown.classList.toggle('active');
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
    if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove('active');
    }
});

// Handle logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
});

// Handle edit profile
editProfileBtn.addEventListener('click', () => {
    // TODO: Implement profile editing functionality
    alert('Profile editing coming soon!');
});

// Handle post form submission
const postForm = document.getElementById('postForm');
const postsGrid = document.getElementById('postsGrid');

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const title = document.getElementById('postTitle').value;
    const content = document.getElementById('postContent').value;
    const timestamp = new Date().toLocaleString();
    
    const post = {
        title,
        content,
        author: {
            username: currentUser.username,
            displayName: currentUser.displayName
        },
        timestamp,
        likes: 0,
        comments: []
    };
    
    // Get existing posts or initialize empty array
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    // Add new post to the beginning of the array
    posts.unshift(post);
    
    // Save posts to localStorage
    localStorage.setItem('posts', JSON.stringify(posts));
    
    // Clear form
    postForm.reset();
    
    // Refresh posts display and profile info
    displayPosts();
    updateProfileInfo();
});

// Display posts
function displayPosts() {
    const posts = JSON.parse(localStorage.getItem('posts')) || [];
    
    // Clear existing posts
    postsGrid.innerHTML = '';
    
    // Add each post to the grid
    posts.forEach(post => {
        const users = JSON.parse(localStorage.getItem('users'));
        const author = users.find(u => u.username === post.author.username);
        
        const postCard = document.createElement('div');
        postCard.className = 'post-card';
        postCard.innerHTML = `
            <div class="post-author-bio">
                <img src="${author?.avatar || 'image/default-avatar.png'}" alt="Author Avatar" class="post-author-avatar">
                <div class="post-author-info">
                    <div class="post-author-name">${post.author.displayName}</div>
                    <div class="post-author-username">@${post.author.username}</div>
                    ${author?.bio ? `<div class="post-author-bio-text">${author.bio}</div>` : ''}
                </div>
            </div>
            <div class="post-header">
                <h3>${post.title}</h3>
                <div class="post-meta">
                    <span>${post.timestamp}</span>
                </div>
            </div>
            <div class="post-content">
                ${post.content}
            </div>
            <div class="post-actions">
                <button class="like-btn" onclick="likePost('${post.timestamp}')">
                    <i class="fas fa-heart"></i> <span>${post.likes}</span>
                </button>
                <button class="comment-btn" onclick="toggleComments('${post.timestamp}')">
                    <i class="fas fa-comment"></i> <span>${post.comments.length}</span>
                </button>
                ${currentUser.username === post.author.username ? `
                    <button class="delete-btn" onclick="deletePost('${post.timestamp}')">
                        <i class="fas fa-trash"></i>
                    </button>
                ` : ''}
            </div>
            <div class="comments-section" id="comments-${post.timestamp}" style="display: none;">
                <div class="comments-list">
                    ${post.comments.map(comment => `
                        <div class="comment">
                            <div class="comment-meta">
                                <span>${comment.author.displayName}</span>
                                <span> • ${comment.timestamp}</span>
                            </div>
                            <div class="comment-content">${comment.content}</div>
                        </div>
                    `).join('')}
                </div>
                <div class="add-comment">
                    <textarea placeholder="Add a comment..." id="comment-${post.timestamp}"></textarea>
                    <button onclick="addComment('${post.timestamp}')">Comment</button>
                </div>
            </div>
        `;
        postsGrid.appendChild(postCard);
    });
}

// Like a post
function likePost(timestamp) {
    let posts = JSON.parse(localStorage.getItem('posts')) || [];
    const postIndex = posts.findIndex(p => p.timestamp === timestamp);
    if (postIndex !== -1) {
        posts[postIndex].likes++;
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
    }
}

// Toggle comments section
function toggleComments(timestamp) {
    const commentsSection = document.getElementById(`comments-${timestamp}`);
    commentsSection.style.display = commentsSection.style.display === 'none' ? 'block' : 'none';
}

// Add a comment
function addComment(timestamp) {
    const commentInput = document.getElementById(`comment-${timestamp}`);
    const content = commentInput.value.trim();
    
    if (content) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        const postIndex = posts.findIndex(p => p.timestamp === timestamp);
        
        if (postIndex !== -1) {
            const comment = {
                content,
                author: {
                    username: currentUser.username,
                    displayName: currentUser.displayName
                },
                timestamp: new Date().toLocaleString()
            };
            
            posts[postIndex].comments.push(comment);
            localStorage.setItem('posts', JSON.stringify(posts));
            displayPosts();
            updateProfileInfo();
        }
    }
}

// Delete a post
function deletePost(timestamp) {
    if (confirm('Are you sure you want to delete this post?')) {
        let posts = JSON.parse(localStorage.getItem('posts')) || [];
        posts = posts.filter(p => p.timestamp !== timestamp);
        localStorage.setItem('posts', JSON.stringify(posts));
        displayPosts();
        updateProfileInfo();
    }
}

// Initial display of posts and profile info
displayPosts();
updateProfileInfo(); 