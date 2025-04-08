// Form Builder Class
class FormBuilder {
    constructor() {
        this.questions = [];
        this.currentQuestionId = 0;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Question Type Buttons
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', () => this.addQuestion(btn.dataset.type));
        });

        // Add Question Button
        document.getElementById('addQuestionBtn').addEventListener('click', () => {
            this.addQuestion('short-answer');
        });

        // Preview Button
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.showPreview();
        });

        // Send Button
        document.getElementById('sendBtn').addEventListener('click', () => {
            this.sendForm();
        });

        // Close Modal
        document.querySelector('.close-modal').addEventListener('click', () => {
            this.closePreview();
        });

        // Form Title and Description
        document.querySelector('.form-title').addEventListener('input', (e) => {
            this.updateFormTitle(e.target.value);
        });

        document.querySelector('.form-description').addEventListener('input', (e) => {
            this.updateFormDescription(e.target.value);
        });
    }

    addQuestion(type) {
        const questionId = this.currentQuestionId++;
        const question = {
            id: questionId,
            type: type,
            title: 'Untitled Question',
            required: false,
            options: type === 'multiple-choice' || type === 'checkbox' ? ['Option 1'] : []
        };

        this.questions.push(question);
        this.renderQuestion(question);
    }

    renderQuestion(question) {
        const container = document.getElementById('questionsContainer');
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.dataset.id = question.id;

        let questionContent = '';
        switch (question.type) {
            case 'short-answer':
                questionContent = this.renderShortAnswer(question);
                break;
            case 'paragraph':
                questionContent = this.renderParagraph(question);
                break;
            case 'multiple-choice':
                questionContent = this.renderMultipleChoice(question);
                break;
            case 'checkbox':
                questionContent = this.renderCheckbox(question);
                break;
            case 'dropdown':
                questionContent = this.renderDropdown(question);
                break;
            case 'file-upload':
                questionContent = this.renderFileUpload(question);
                break;
            case 'date':
                questionContent = this.renderDate(question);
                break;
            case 'time':
                questionContent = this.renderTime(question);
                break;
        }

        questionCard.innerHTML = `
            <div class="question-header">
                <input type="text" class="question-title" value="${question.title}" placeholder="Question">
                <div class="question-actions">
                    <button class="required-btn" title="Required">
                        <i class="fas fa-asterisk"></i>
                    </button>
                    <button class="duplicate-btn" title="Duplicate">
                        <i class="fas fa-copy"></i>
                    </button>
                    <button class="delete-btn" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            ${questionContent}
        `;

        container.appendChild(questionCard);

        // Add event listeners for the new question
        this.addQuestionEventListeners(questionCard, question);
    }

    renderShortAnswer(question) {
        return `
            <div class="short-answer">
                <input type="text" placeholder="Short answer text" disabled>
            </div>
        `;
    }

    renderParagraph(question) {
        return `
            <div class="paragraph">
                <textarea placeholder="Long answer text" disabled></textarea>
            </div>
        `;
    }

    renderMultipleChoice(question) {
        const options = question.options.map((option, index) => `
            <div class="option">
                <input type="radio" disabled>
                <input type="text" value="${option}" placeholder="Option ${index + 1}">
                <button class="remove-option-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        return `
            <div class="multiple-choice">
                <div class="options">
                    ${options}
                </div>
                <button class="add-option-btn">
                    <i class="fas fa-plus"></i> Add Option
                </button>
            </div>
        `;
    }

    renderCheckbox(question) {
        const options = question.options.map((option, index) => `
            <div class="option">
                <input type="checkbox" disabled>
                <input type="text" value="${option}" placeholder="Option ${index + 1}">
                <button class="remove-option-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `).join('');

        return `
            <div class="checkbox">
                <div class="options">
                    ${options}
                </div>
                <button class="add-option-btn">
                    <i class="fas fa-plus"></i> Add Option
                </button>
            </div>
        `;
    }

    renderDropdown(question) {
        const options = question.options.map((option, index) => `
            <option value="${index}">${option}</option>
        `).join('');

        return `
            <div class="dropdown">
                <select disabled>
                    <option value="">Select an option</option>
                    ${options}
                </select>
            </div>
        `;
    }

    renderFileUpload(question) {
        return `
            <div class="file-upload">
                <input type="file" disabled>
            </div>
        `;
    }

    renderDate(question) {
        return `
            <div class="date">
                <input type="date" disabled>
            </div>
        `;
    }

    renderTime(question) {
        return `
            <div class="time">
                <input type="time" disabled>
            </div>
        `;
    }

    addQuestionEventListeners(questionCard, question) {
        // Question Title
        const titleInput = questionCard.querySelector('.question-title');
        titleInput.addEventListener('input', (e) => {
            question.title = e.target.value;
        });

        // Required Button
        const requiredBtn = questionCard.querySelector('.required-btn');
        requiredBtn.addEventListener('click', () => {
            question.required = !question.required;
            requiredBtn.classList.toggle('active', question.required);
        });

        // Duplicate Button
        const duplicateBtn = questionCard.querySelector('.duplicate-btn');
        duplicateBtn.addEventListener('click', () => {
            const newQuestion = { ...question, id: this.currentQuestionId++ };
            this.questions.push(newQuestion);
            this.renderQuestion(newQuestion);
        });

        // Delete Button
        const deleteBtn = questionCard.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            questionCard.remove();
            this.questions = this.questions.filter(q => q.id !== question.id);
        });

        // Add Option Button
        const addOptionBtn = questionCard.querySelector('.add-option-btn');
        if (addOptionBtn) {
            addOptionBtn.addEventListener('click', () => {
                question.options.push(`Option ${question.options.length + 1}`);
                this.updateQuestion(question);
            });
        }

        // Remove Option Buttons
        questionCard.querySelectorAll('.remove-option-btn').forEach((btn, index) => {
            btn.addEventListener('click', () => {
                question.options.splice(index, 1);
                this.updateQuestion(question);
            });
        });
    }

    updateQuestion(question) {
        const questionCard = document.querySelector(`.question-card[data-id="${question.id}"]`);
        if (questionCard) {
            questionCard.remove();
            this.renderQuestion(question);
        }
    }

    updateFormTitle(title) {
        document.title = `${title} - Form Builder`;
    }

    updateFormDescription(description) {
        // Update form description in the preview
    }

    showPreview() {
        const modal = document.getElementById('previewModal');
        const modalBody = modal.querySelector('.modal-body');
        
        // Create preview content
        const previewContent = this.createPreviewContent();
        modalBody.innerHTML = previewContent;
        
        modal.style.display = 'block';
    }

    createPreviewContent() {
        return `
            <div class="preview-form">
                <h1>${document.querySelector('.form-title').value}</h1>
                <p>${document.querySelector('.form-description').value}</p>
                ${this.questions.map(question => this.createPreviewQuestion(question)).join('')}
            </div>
        `;
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

    sendForm() {
        const formData = {
            id: Date.now(),
            title: document.querySelector('.form-title').value,
            description: document.querySelector('.form-description').value,
            questions: this.questions,
            createdAt: new Date().toISOString()
        };

        // Save form to localStorage
        const forms = JSON.parse(localStorage.getItem('forms')) || [];
        forms.push(formData);
        localStorage.setItem('forms', JSON.stringify(forms));

        // Redirect to forms page
        window.location.href = 'forms.html';
    }
}

// Initialize Form Builder
document.addEventListener('DOMContentLoaded', () => {
    const formBuilder = new FormBuilder();
}); 