/**
 * Kanban Board Management
 */
class KanbanBoard {
    constructor() {
        this.tasks = [];
        this.nextTaskId = 1;
        this.columns = ['backlog', 'todo', 'in-progress', 'done'];
        this.init();
    }

    init() {
        this.loadTasks();
        this.renderBoard();
        this.setupEventListeners();
        this.setupDragAndDrop();
    }

    // Task Management
    createTask(data) {
        const task = {
            id: this.nextTaskId++,
            title: data.title,
            description: data.description || '',
            assignee: data.assignee || '',
            priority: data.priority || 'medium',
            status: data.status || 'backlog',
            dueDate: data.dueDate || '',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        this.tasks.push(task);
        this.saveTasks();
        return task;
    }

    updateTask(id, updates) {
        const task = this.tasks.find(t => t.id === id);
        if (task) {
            Object.assign(task, updates, { updatedAt: new Date().toISOString() });
            this.saveTasks();
            this.renderBoard();
        }
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.saveTasks();
        this.renderBoard();
    }

    moveTask(taskId, newStatus) {
        this.updateTask(taskId, { status: newStatus });
    }

    // Rendering
    renderBoard() {
        this.columns.forEach(status => {
            const column = document.getElementById(`${status}-tasks`);
            if (column) {
                column.innerHTML = '';
                const columnTasks = this.tasks.filter(task => task.status === status);
                columnTasks.forEach(task => this.renderTask(task, column));
            }
        });
    }

    renderTask(task, container) {
        const taskElement = document.createElement('div');
        taskElement.className = 'task-card';
        taskElement.draggable = true;
        taskElement.dataset.taskId = task.id;

        const assigneeName = task.assignee ? this.getUserName(task.assignee) : 'Unassigned';
        const dueDate = task.dueDate ? new Date(task.dueDate).toLocaleDateString() : '';

        taskElement.innerHTML = `
            <div class="task-title">${task.title}</div>
            <div class="task-description">${task.description}</div>
            <div class="task-meta">
                <div class="task-assignee">${assigneeName}</div>
                <div class="task-priority ${task.priority}">${task.priority}</div>
            </div>
            ${dueDate ? `<div class="task-due-date">Due: ${dueDate}</div>` : ''}
        `;

        // Add double-click to edit
        taskElement.addEventListener('dblclick', () => this.openTaskModal(task));

        container.appendChild(taskElement);
    }

    // Modal Management
    openTaskModal(task = null) {
        const modal = document.getElementById('task-modal');
        const form = document.getElementById('task-form');
        const title = document.getElementById('task-modal-title');

        if (task) {
            title.textContent = 'Edit Task';
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-description').value = task.description;
            document.getElementById('task-assignee').value = task.assignee;
            document.getElementById('task-priority').value = task.priority;
            document.getElementById('task-due-date').value = task.dueDate;
            form.dataset.taskId = task.id;
        } else {
            title.textContent = 'Add Task';
            form.reset();
            delete form.dataset.taskId;
        }

        this.populateAssigneeDropdown();
        modal.classList.add('active');
    }

    closeTaskModal() {
        document.getElementById('task-modal').classList.remove('active');
    }

    saveTask() {
        const form = document.getElementById('task-form');
        const formData = new FormData(form);
        const taskData = {
            title: formData.get('task-title'),
            description: formData.get('task-description'),
            assignee: formData.get('task-assignee'),
            priority: formData.get('task-priority'),
            dueDate: formData.get('task-due-date')
        };

        const taskId = form.dataset.taskId;
        if (taskId) {
            this.updateTask(parseInt(taskId), taskData);
        } else {
            // Get status from the button that opened the modal
            const addButton = document.querySelector('.add-task-btn:focus') ||
                document.querySelector('.add-task-btn[data-status]');
            if (addButton) {
                taskData.status = addButton.dataset.status;
            }
            this.createTask(taskData);
        }

        this.closeTaskModal();
        this.renderBoard();
    }

    // User Management Integration
    populateAssigneeDropdown() {
        const select = document.getElementById('task-assignee');
        const currentValue = select.value;

        // Clear existing options except the first one
        select.innerHTML = '<option value="">Unassigned</option>';

        // Add users from userManager
        if (window.userManager) {
            window.userManager.users.forEach(user => {
                const option = document.createElement('option');
                option.value = user.id;
                option.textContent = user.name;
                select.appendChild(option);
            });
        }

        select.value = currentValue;
    }

    getUserName(userId) {
        if (window.userManager) {
            const user = window.userManager.users.find(u => u.id === userId);
            return user ? user.name : 'Unknown';
        }
        return 'Unknown';
    }

    // Drag and Drop
    setupDragAndDrop() {
        const taskCards = document.querySelectorAll('.task-card');
        const columns = document.querySelectorAll('.column-content');

        taskCards.forEach(card => {
            card.addEventListener('dragstart', this.handleDragStart.bind(this));
            card.addEventListener('dragend', this.handleDragEnd.bind(this));
        });

        columns.forEach(column => {
            column.addEventListener('dragover', this.handleDragOver.bind(this));
            column.addEventListener('drop', this.handleDrop.bind(this));
        });
    }

    handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
        e.target.classList.add('dragging');
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    handleDragOver(e) {
        e.preventDefault();
        e.currentTarget.classList.add('drag-over');
    }

    handleDrop(e) {
        e.preventDefault();
        e.currentTarget.classList.remove('drag-over');

        const taskId = parseInt(e.dataTransfer.getData('text/plain'));
        const newStatus = e.currentTarget.id.replace('-tasks', '');

        if (taskId && newStatus) {
            this.moveTask(taskId, newStatus);
        }
    }

    // Event Listeners
    setupEventListeners() {
        // Add task buttons - now use inline creation
        document.querySelectorAll('.add-task-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const status = e.target.dataset.status;
                this.openInlineTaskCreator(status);
            });
        });

        // Task modal
        document.getElementById('task-modal-close').addEventListener('click', () => this.closeTaskModal());
        document.getElementById('task-cancel-btn').addEventListener('click', () => this.closeTaskModal());
        document.getElementById('task-save-btn').addEventListener('click', () => this.saveTask());

        // Close modal on overlay click
        document.getElementById('task-modal').addEventListener('click', (e) => {
            if (e.target.id === 'task-modal') {
                this.closeTaskModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeTaskModal();
            }
        });
    }

    // Data Persistence
    saveTasks() {
        localStorage.setItem('kanban-tasks', JSON.stringify(this.tasks));
        localStorage.setItem('kanban-next-id', this.nextTaskId.toString());
    }

    loadTasks() {
        const savedTasks = localStorage.getItem('kanban-tasks');
        const savedNextId = localStorage.getItem('kanban-next-id');

        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }

        if (savedNextId) {
            this.nextTaskId = parseInt(savedNextId);
        }
    }

    // Import from Google Sheets
    importFromSheets(tasks) {
        tasks.forEach(taskData => {
            this.createTask(taskData);
        });
        this.renderBoard();
        this.showNotification(`Imported ${tasks.length} tasks from Google Sheets`, 'success');
    }

    // Inline Task Creation
    openInlineTaskCreator(status) {
        // Close any existing inline creator
        this.closeInlineCreator();

        const column = document.getElementById(`${status}-tasks`);
        if (!column) return;

        // Create inline creator element
        const creator = document.createElement('div');
        creator.className = 'inline-task-creator';
        creator.innerHTML = `
            <div class="inline-creator-content">
                <input type="text" class="inline-title-input" placeholder="Enter task title..." maxlength="100">
                <textarea class="inline-description-input" placeholder="Add description (optional)..." rows="2"></textarea>
                <div class="inline-creator-actions">
                    <button class="btn btn-sm secondary inline-cancel-btn">Cancel</button>
                    <button class="btn btn-sm primary inline-add-btn" disabled>Add Task</button>
                </div>
            </div>
        `;

        // Insert at the top of the column
        column.insertBefore(creator, column.firstChild);

        // Focus on title input
        const titleInput = creator.querySelector('.inline-title-input');
        titleInput.focus();

        // Setup event listeners
        this.setupInlineCreatorEvents(creator, status);
    }

    setupInlineCreatorEvents(creator, status) {
        const titleInput = creator.querySelector('.inline-title-input');
        const descriptionInput = creator.querySelector('.inline-description-input');
        const addBtn = creator.querySelector('.inline-add-btn');
        const cancelBtn = creator.querySelector('.inline-cancel-btn');

        // Enable/disable add button based on title input
        titleInput.addEventListener('input', () => {
            addBtn.disabled = !titleInput.value.trim();
        });

        // Handle add button click
        addBtn.addEventListener('click', () => {
            const title = titleInput.value.trim();
            const description = descriptionInput.value.trim();

            if (title) {
                this.createTask({
                    title: title,
                    description: description,
                    status: status
                });
                this.closeInlineCreator();
                this.renderBoard();
            }
        });

        // Handle cancel button
        cancelBtn.addEventListener('click', () => {
            this.closeInlineCreator();
        });

        // Handle Enter key in title input
        titleInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (titleInput.value.trim()) {
                    addBtn.click();
                }
            } else if (e.key === 'Escape') {
                this.closeInlineCreator();
            }
        });

        // Handle Enter key in description (Shift+Enter for new line)
        descriptionInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (titleInput.value.trim()) {
                    addBtn.click();
                }
            } else if (e.key === 'Escape') {
                this.closeInlineCreator();
            }
        });

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!creator.contains(e.target) && !e.target.classList.contains('add-task-btn')) {
                this.closeInlineCreator();
            }
        }, { once: true });
    }

    closeInlineCreator() {
        const creator = document.querySelector('.inline-task-creator');
        if (creator) {
            creator.remove();
        }
    }

    // Notifications
    showNotification(message, type = 'info') {
        if (window.notifications) {
            window.notifications.show(message, type);
        }
    }
}

// Initialize the board when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.kanbanBoard = new KanbanBoard();
});