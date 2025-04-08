class FormsManager {
    constructor() {
        this.forms = JSON.parse(localStorage.getItem('forms')) || [];
        this.initializeEventListeners();
        this.renderForms();
    }

    initializeEventListeners() {
        // Search functionality
        const searchInput = document.querySelector('.search-bar input');
        searchInput.addEventListener('input', (e) => {
            this.filterForms(e.target.value);
        });

        // Filter buttons
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelector('.filter-btn.active').classList.remove('active');
                btn.classList.add('active');
                this.filterForms(searchInput.value, btn.textContent.toLowerCase());
            });
        });

        // Close modal
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closePreview();
        });
    }

    renderForms() {
        const formsGrid = document.getElementById('formsGrid');
        formsGrid.innerHTML = '';

        this.forms.forEach(form => {
            const formCard = this.createFormCard(form);
            formsGrid.appendChild(formCard);
        });
    }

    createFormCard(form) {
        const card = document.createElement('div');
        card.className = 'form-card';
        card.innerHTML = `
            <div class="form-card-header">
                <h3>${form.title}</h3>
                <div class="form-actions">
                    <button class="preview-btn" data-id="${form.id}">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="edit-btn" data-id="${form.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" data-id="${form.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <p class="form-description">${form.description || 'No description'}</p>
            <div class="form-meta">
                <span class="question-count">
                    <i class="fas fa-list"></i> ${form.questions.length} questions
                </span>
                <span class="created-date">
                    <i class="fas fa-calendar"></i> ${new Date(form.createdAt).toLocaleDateString()}
                </span>
            </div>
        `;

        // Add event listeners
        card.querySelector('.preview-btn').addEventListener('click', () => {
            this.showPreview(form);
        });

        card.querySelector('.edit-btn').addEventListener('click', () => {
            window.location.href = `index.html?id=${form.id}`;
        });

        card.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm('Are you sure you want to delete this form?')) {
                this.deleteForm(form.id);
            }
        });

        return card;
    }

    filterForms(searchTerm = '', filter = 'all') {
        let filteredForms = this.forms;

        // Apply search filter
        if (searchTerm) {
            filteredForms = filteredForms.filter(form => 
                form.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                form.description?.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Apply category filter
        switch (filter) {
            case 'recent':
                filteredForms.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                break;
            case 'popular':
                // Add popularity sorting logic here
                break;
        }

        // Re-render filtered forms
        const formsGrid = document.getElementById('formsGrid');
        formsGrid.innerHTML = '';
        filteredForms.forEach(form => {
            formsGrid.appendChild(this.createFormCard(form));
        });
    }

    showPreview(form) {
        const modal = document.getElementById('previewModal');
        const modalBody = modal.querySelector('.modal-body');
        
        modalBody.innerHTML = `
            <div class="preview-form">
                <h1>${form.title}</h1>
                <p>${form.description || ''}</p>
                ${form.questions.map(question => this.createPreviewQuestion(question)).join('')}
            </div>
        `;
        
        modal.style.display = 'block';
    }

    createPreviewQuestion(question) {
        let questionContent = '';
        switch (question.type) {
            case 'short-answer':
                questionContent = `<input type="text" placeholder="Your answer">`;
                break;
            case 'paragraph':
                questionContent = `<textarea placeholder="Your answer"></textarea>`;
                break;
            case 'multiple-choice':
                questionContent = question.options.map(option => `
                    <div class="option">
                        <input type="radio" name="q${question.id}">
                        <label>${option}</label>
                    </div>
                `).join('');
                break;
            case 'checkbox':
                questionContent = question.options.map(option => `
                    <div class="option">
                        <input type="checkbox" name="q${question.id}">
                        <label>${option}</label>
                    </div>
                `).join('');
                break;
            case 'dropdown':
                questionContent = `
                    <select>
                        <option value="">Select an option</option>
                        ${question.options.map(option => `
                            <option value="${option}">${option}</option>
                        `).join('')}
                    </select>
                `;
                break;
            case 'file-upload':
                questionContent = `<input type="file">`;
                break;
            case 'date':
                questionContent = `<input type="date">`;
                break;
            case 'time':
                questionContent = `<input type="time">`;
                break;
        }

        return `
            <div class="preview-question">
                <h3>${question.title} ${question.required ? '<span class="required">*</span>' : ''}</h3>
                <div class="preview-content">
                    ${questionContent}
                </div>
            </div>
        `;
    }

    closePreview() {
        const modal = document.getElementById('previewModal');
        modal.style.display = 'none';
    }

    deleteForm(formId) {
        this.forms = this.forms.filter(form => form.id !== formId);
        localStorage.setItem('forms', JSON.stringify(this.forms));
        this.renderForms();
    }
}

// Initialize Forms Manager
document.addEventListener('DOMContentLoaded', () => {
    const formsManager = new FormsManager();
}); 