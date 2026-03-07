/**
 * UI Manager - Handles all UI state and element operations
 */

class UIManager {
    constructor() {
        this.elements = {};
        this.initElements();
    }

    initElements() {
        this.elements = {
            themeToggle: document.getElementById('themeToggle'),
            settingsBtn: document.getElementById('settingsBtn'),
            settingsModal: document.getElementById('settingsModal'),
            closeSettings: document.getElementById('closeSettings'),
            cancelSettings: document.getElementById('cancelSettings'),
            saveSettings: document.getElementById('saveSettings'),
            searchForm: document.getElementById('searchForm'),
            searchInput: document.getElementById('searchInput'),
            themeSelect: document.getElementById('themeSelect'),
            movementSelect: document.getElementById('movementSelect'),
            orientationSelect: document.getElementById('orientationSelect'),
            difficultySelect: document.getElementById('difficultySelect'),
            locationSelect: document.getElementById('locationSelect'),
            sortSelect: document.getElementById('sortSelect'),
            resultsSection: document.getElementById('resultsSection'),
            resultsContent: document.querySelector('.results-content'),
            results: document.getElementById('results'),
            loading: document.getElementById('loading'),
            noResults: document.getElementById('noResults'),
            resultsCount: document.getElementById('resultsCount'),
            loadMore: document.getElementById('loadMore'),
            toast: document.getElementById('toast'),
            toastMessage: document.querySelector('.toast-message'),
            toastIcon: document.querySelector('.toast-icon'),
            offlineStatus: document.getElementById('offlineStatus')
        };
    }

    // Results Section
    showResultsSection() {
        this.elements.resultsSection?.classList.remove('hidden');
    }

    hideResultsSection() {
        this.elements.resultsSection?.classList.add('hidden');
    }

    // Loading
    showLoading() {
        this.elements.loading?.classList.remove('hidden');
        this.elements.resultsContent?.classList.add('hidden');
        this.elements.noResults?.classList.add('hidden');
    }

    hideLoading() {
        this.elements.loading?.classList.add('hidden');
    }

    // No Results
    showNoResults() {
        this.elements.noResults?.classList.remove('hidden');
        this.elements.resultsContent?.classList.add('hidden');
    }

    hideNoResults() {
        this.elements.noResults?.classList.add('hidden');
    }

    // Results Content
    showResultsContent() {
        this.elements.resultsContent?.classList.remove('hidden');
    }

    updateResultsCount(count) {
        if (this.elements.resultsCount) {
            this.elements.resultsCount.textContent = `${count} item${count !== 1 ? 's' : ''}`;
        }
    }

    clearResults() {
        if (this.elements.results) {
            this.elements.results.innerHTML = '';
        }
    }

    // Load More
    showLoadMore() {
        this.elements.loadMore?.classList.remove('hidden');
    }

    hideLoadMore() {
        this.elements.loadMore?.classList.add('hidden');
    }

    // Modal
    openSettings() {
        this.elements.settingsModal?.classList.remove('hidden');
    }

    closeSettings() {
        this.elements.settingsModal?.classList.add('hidden');
    }

    updateOfflineStatus(message) {
        if (this.elements.offlineStatus) {
            this.elements.offlineStatus.textContent = message;
        }
    }

    // Toast Notification
    showToast(message, type = 'success') {
        if (!this.elements.toast || !this.elements.toastMessage || !this.elements.toastIcon) return;

        this.elements.toastMessage.textContent = message;
        this.elements.toastIcon.textContent = type === 'success' ? '✅' : '❌';
        this.elements.toast.className = `toast ${type} show`;

        setTimeout(() => {
            this.elements.toast.classList.remove('show');
        }, 4000);
    }
}

// Export
window.UIManager = UIManager;
