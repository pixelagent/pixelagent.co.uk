/**
 * Enhanced Drag and Drop functionality for Kanban Board
 */
class DragDropManager {
    constructor(kanbanBoard) {
        this.kanbanBoard = kanbanBoard;
        this.draggedElement = null;
        this.placeholder = null;
        this.init();
    }

    init() {
        this.setupDragAndDrop();
    }

    setupDragAndDrop() {
        // Set up drag events for all task cards
        this.updateDragListeners();

        // Set up drop zones for all columns
        this.updateDropZones();
    }

    updateDragListeners() {
        const taskCards = document.querySelectorAll('.task-card');
        taskCards.forEach(card => {
            card.addEventListener('dragstart', this.handleDragStart.bind(this));
            card.addEventListener('dragend', this.handleDragEnd.bind(this));
            card.addEventListener('dragover', this.handleDragOver.bind(this));
        });
    }

    updateDropZones() {
        const columns = document.querySelectorAll('.column-content');
        columns.forEach(column => {
            column.addEventListener('dragover', this.handleDragOver.bind(this));
            column.addEventListener('dragleave', this.handleDragLeave.bind(this));
            column.addEventListener('drop', this.handleDrop.bind(this));
        });
    }

    handleDragStart(e) {
        this.draggedElement = e.target;
        this.draggedElement.classList.add('dragging');

        // Create placeholder
        this.placeholder = document.createElement('div');
        this.placeholder.className = 'task-placeholder';
        this.placeholder.style.height = `${this.draggedElement.offsetHeight}px`;

        // Set drag data
        e.dataTransfer.setData('text/plain', e.target.dataset.taskId);
        e.dataTransfer.effectAllowed = 'move';

        // Add visual feedback
        setTimeout(() => {
            if (this.draggedElement.parentNode) {
                this.draggedElement.parentNode.insertBefore(this.placeholder, this.draggedElement.nextSibling);
            }
        }, 0);
    }

    handleDragEnd(e) {
        this.draggedElement.classList.remove('dragging');

        // Remove placeholder
        if (this.placeholder && this.placeholder.parentNode) {
            this.placeholder.parentNode.removeChild(this.placeholder);
        }

        this.draggedElement = null;
        this.placeholder = null;

        // Remove all drag-over classes
        document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
    }

    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';

        const target = e.currentTarget;

        // Add visual feedback to drop zones
        if (target.classList.contains('column-content')) {
            target.classList.add('drag-over');
        }

        // Handle reordering within the same column
        if (target.classList.contains('task-card') && target !== this.draggedElement) {
            const rect = target.getBoundingClientRect();
            const midpoint = rect.top + rect.height / 2;

            if (e.clientY < midpoint) {
                // Insert before target
                if (this.placeholder && this.placeholder.parentNode) {
                    this.placeholder.parentNode.removeChild(this.placeholder);
                }
                target.parentNode.insertBefore(this.placeholder, target);
            } else {
                // Insert after target
                if (this.placeholder && this.placeholder.parentNode) {
                    this.placeholder.parentNode.removeChild(this.placeholder);
                }
                target.parentNode.insertBefore(this.placeholder, target.nextSibling);
            }
        }
    }

    handleDragLeave(e) {
        const target = e.currentTarget;

        // Remove visual feedback when leaving drop zones
        if (target.classList.contains('column-content')) {
            // Only remove if we're actually leaving the column (not moving to a child)
            if (!target.contains(e.relatedTarget)) {
                target.classList.remove('drag-over');
            }
        }
    }

    handleDrop(e) {
        e.preventDefault();

        const target = e.currentTarget;
        const taskId = parseInt(e.dataTransfer.getData('text/plain'));

        if (!taskId || !this.draggedElement) return;

        // Determine new status
        let newStatus;
        if (target.classList.contains('column-content')) {
            newStatus = target.id.replace('-tasks', '');
        } else {
            // Dropped on another task card - use its column
            newStatus = target.closest('.column-content').id.replace('-tasks', '');
        }

        // Move task to new status
        if (newStatus && this.kanbanBoard) {
            this.kanbanBoard.moveTask(taskId, newStatus);
        }

        // Clean up
        this.handleDragEnd(e);
    }

    // Reinitialize drag and drop after DOM changes
    refresh() {
        this.setupDragAndDrop();
    }
}

// Initialize drag and drop manager when board is ready
document.addEventListener('DOMContentLoaded', () => {
    // Wait for kanban board to be initialized
    const checkForBoard = setInterval(() => {
        if (window.kanbanBoard) {
            window.dragDropManager = new DragDropManager(window.kanbanBoard);
            clearInterval(checkForBoard);
        }
    }, 100);
});