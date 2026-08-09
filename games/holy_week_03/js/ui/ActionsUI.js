import { actions } from '../config.js';

/**
 * Manages the UI for thematic player actions like Pray and Heal.
 */
export class ActionsUI {
    constructor(floatingIconManager, audioManager) {
        this.floatingIconManager = floatingIconManager;
        this.audio = audioManager;
        this.actions = actions; // From config.js
    }

    /**
     * Renders the HTML for the actions panel.
     * @returns {string} HTML content.
     */
    render() {
        return `
            <div class="actions-panel" role="region" aria-label="Player Actions">
                <h3 class="section-title">Actions</h3>
                <div class="prophecy-lab-intro">
                    <span>Perform spiritual actions to deepen your connection to the events.</span>
                </div>
                <div class="actions-grid">
                    ${this.actions.map(action => `
                        <button class="action-btn-large" data-action-id="${action.id}" aria-label="${action.name}: ${action.description}">
                            <span class="action-icon-large">${action.icon}</span>
                            <span class="action-label-large">${action.name}</span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    /**
     * Binds click events to the action buttons.
     * @param {HTMLElement} container - The parent element containing the rendered actions panel.
     */
    bindEvents(container) {
        container.querySelectorAll('[data-action-id]').forEach(btn => {
            btn.addEventListener('click', () => {
                const action = this.actions.find(a => a.id === btn.dataset.actionId);
                if (action) this.floatingIconManager.show(action.icon);
            });
        });
    }
}
