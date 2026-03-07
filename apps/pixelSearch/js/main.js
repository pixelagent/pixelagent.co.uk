/**
 * Pixel Search - Main Application
 * Orchestrates all managers and handles application logic
 */

class App {
    constructor() {
        this.csvManager = new CSVDataManager();
        this.offlineManager = new OfflineManager();
        this.themeManager = new ThemeManager();
        this.ui = new UIManager();
        this.lazyImageLoader = new LazyImageLoader();
        this.cardFactory = new ResultCardFactory(this.lazyImageLoader);
        this.infiniteScroll = null;

        this.filteredData = [];
        this.visibleCount = 0;
        this.itemsPerPage = Config.ITEMS_PER_PAGE;
        this.currentLayout = localStorage.getItem(Config.STORAGE_KEYS.LAYOUT) || 'grid';

        this.init();
    }

    init() {
        // Hide initial states
        this.ui.hideResultsSection();
        this.ui.hideLoading();
        this.ui.hideNoResults();

        // Setup event listeners
        this.setupEventListeners();

        // Preload placeholder image
        const placeholder = new Image();
        placeholder.src = Config.PLACEHOLDER_IMAGE;

        // Update offline status
        this.updateOfflineStatus();

        // Apply saved layout
        this.applyLayout(this.currentLayout);
        this.updateLayoutOptions();

        // Load data (try localStorage first, then remote)
        this.loadData();
    }

    async loadData() {
        // Try to load from localStorage first
        const cached = this.offlineManager.loadFromLocalStorage();

        if (cached.available && this.offlineManager.isCacheValid()) {
            console.log('Loading from localStorage...');
            this.csvManager.data = cached.data;
            this.csvManager.loaded = true;
            this.csvManager.extractFilterOptions();
            this.populateFilterDropdowns();
            this.ui.showToast(`Loaded ${this.csvManager.data.length} artworks from cache!`, 'success');
            return;
        }

        try {
            await this.csvManager.load(Config.CSV_URL);
            // Save to localStorage for offline use
            this.offlineManager.saveToLocalStorage(this.csvManager.data);
            this.updateOfflineStatus();
            this.populateFilterDropdowns();
            this.ui.showToast(`Loaded ${this.csvManager.data.length} artworks! Ready to search.`, 'success');
        } catch (error) {
            console.error('Failed to load CSV:', error);
            // Try to use cached data even if expired
            if (cached.available) {
                this.csvManager.data = cached.data;
                this.csvManager.loaded = true;
                this.csvManager.extractFilterOptions();
                this.populateFilterDropdowns();
                this.ui.showToast('Using cached data (may be outdated)', 'error');
            } else {
                this.ui.showToast('Failed to load artwork data', 'error');
            }
        }
    }

    populateFilterDropdowns() {
        const options = this.csvManager.getFilterOptions();

        // Theme - dynamically from spreadsheet
        this.populateDropdown('themeSelect', options.theme, 'All Themes');

        // Movement - hardcoded list from config
        this.populateDropdown('movementSelect', Config.MOVEMENTS, 'All Movements');

        // Orientation - dynamically from spreadsheet
        this.populateDropdown('orientationSelect', options.orientation, 'All Orientations');

        // Difficulty - dynamically from spreadsheet
        this.populateDropdown('difficultySelect', options.difficulty, 'All Levels');

        // Location - hardcoded list from config
        this.populateDropdown('locationSelect', Config.LOCATIONS, 'All Locations');
    }

    populateDropdown(selectId, values, defaultText) {
        const select = document.getElementById(selectId);
        if (!select) return;

        // Keep the first option (default)
        select.innerHTML = `<option value="">${defaultText}</option>`;

        // Add unique values
        if (values && Array.isArray(values)) {
            values.forEach(value => {
                if (value && value.trim()) {
                    const option = document.createElement('option');
                    option.value = value.trim();
                    option.textContent = value.trim();
                    select.appendChild(option);
                }
            });
        }
    }

    updateOfflineStatus() {
        const info = this.offlineManager.getCacheInfo();
        const cached = this.offlineManager.loadFromLocalStorage();
        const itemCount = cached.data ? cached.data.length : 0;
        this.ui.updateOfflineStatus(`${info} • ${itemCount} items`);
    }

    saveForOffline() {
        if (!this.csvManager.loaded) {
            this.ui.showToast('No data to save', 'error');
            return;
        }

        const success = this.offlineManager.saveToLocalStorage(this.csvManager.data);
        if (success) {
            this.updateOfflineStatus();
            this.ui.showToast('Data saved for offline use!', 'success');
        } else {
            this.ui.showToast('Failed to save data', 'error');
        }
    }

    refreshData() {
        // Force reload from remote CSV (ignore cache)
        this.csvManager.loaded = false;
        this.csvManager.data = [];
        this.loadData();
        this.ui.showToast('Refreshing data...', 'success');
    }

    clearCache() {
        const success = this.offlineManager.clearLocalStorage();
        if (success) {
            this.updateOfflineStatus();
            this.ui.showToast('Cache cleared', 'success');
        }
    }

    setLayout(layout) {
        this.currentLayout = layout;
        localStorage.setItem(Config.STORAGE_KEYS.LAYOUT, layout);
        this.applyLayout(layout);
        this.updateLayoutOptions();
    }

    applyLayout(layout) {
        const resultsGrid = this.ui.elements.results;
        if (resultsGrid) {
            resultsGrid.className = 'results-grid' + (layout === 'masonry' ? ' masonry' : '');
        }
    }

    updateLayoutOptions() {
        document.querySelectorAll('.layout-option').forEach(option => {
            if (option.dataset.layout === this.currentLayout) {
                option.classList.add('active');
                option.classList.remove('btn-secondary');
            } else {
                option.classList.remove('active');
                option.classList.add('btn-secondary');
            }
        });
    }

    handleGoogleSignIn(response) {
        // Store the auth token
        localStorage.setItem(Config.STORAGE_KEYS.GOOGLE_AUTH, response.credential);

        // Update the card factory to use authenticated URLs
        // The next batch of images will load faster
        this.ui.showToast('Signed in! Images will load faster now.', 'success');
    }

    isGoogleSignedIn() {
        return !!localStorage.getItem(Config.STORAGE_KEYS.GOOGLE_AUTH);
    }

    setupEventListeners() {
        // Theme toggle
        this.ui.elements.themeToggle?.addEventListener('click', () => {
            this.themeManager.toggle();
            this.themeManager.updateOptions();
        });

        // Settings modal
        this.ui.elements.settingsBtn?.addEventListener('click', () => this.ui.openSettings());
        this.ui.elements.closeSettings?.addEventListener('click', () => this.ui.closeSettings());
        this.ui.elements.cancelSettings?.addEventListener('click', () => this.ui.closeSettings());
        this.ui.elements.saveSettings?.addEventListener('click', () => this.ui.closeSettings());

        // Close modal on backdrop click
        this.ui.elements.settingsModal?.addEventListener('click', (e) => {
            if (e.target === this.ui.elements.settingsModal) this.ui.closeSettings();
        });

        // Search and filters
        this.ui.elements.searchForm?.addEventListener('submit', (e) => this.handleSearch(e));
        this.ui.elements.searchInput?.addEventListener('input', this.debounce(() => this.handleSearch(), 300));

        // Filter dropdowns
        this.ui.elements.themeSelect?.addEventListener('change', () => this.handleSearch());
        this.ui.elements.movementSelect?.addEventListener('change', () => this.handleSearch());
        this.ui.elements.orientationSelect?.addEventListener('change', () => this.handleSearch());
        this.ui.elements.difficultySelect?.addEventListener('change', () => this.handleSearch());
        this.ui.elements.locationSelect?.addEventListener('change', () => this.handleSearch());

        this.ui.elements.sortSelect?.addEventListener('change', (e) => this.handleSortChange(e.target.value));

        // Theme options
        document.querySelectorAll('.theme-option').forEach(option => {
            option.addEventListener('click', () => {
                this.themeManager.set(option.dataset.theme);
                this.themeManager.updateOptions();
            });
        });

        // Layout options
        document.querySelectorAll('.layout-option').forEach(option => {
            option.addEventListener('click', () => {
                this.setLayout(option.dataset.layout);
            });
        });

        // Settings tabs
        document.querySelectorAll('.settings-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                this.switchTab(tab.dataset.tab);
            });
        });

        // Offline mode buttons
        const downloadOfflineBtn = document.getElementById('downloadOffline');
        if (downloadOfflineBtn) {
            downloadOfflineBtn.addEventListener('click', () => this.saveForOffline());
        }

        const refreshDataBtn = document.getElementById('refreshData');
        if (refreshDataBtn) {
            refreshDataBtn.addEventListener('click', () => this.refreshData());
        }

        const clearCacheBtn = document.getElementById('clearCache');
        if (clearCacheBtn) {
            clearCacheBtn.addEventListener('click', () => this.clearCache());
        }
    }

    switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll('.settings-tab').forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update tab content
        document.querySelectorAll('.settings-tab-content').forEach(content => {
            if (content.id === `tab-${tabName}`) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    debounce(func, wait = 300) {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    handleSearch(e) {
        if (e) e.preventDefault();
        if (!this.csvManager.loaded) return;

        this.ui.showResultsSection();
        this.ui.showLoading();

        const keyword = this.ui.elements.searchInput?.value.trim().toLowerCase() || '';

        // Collect all filter values
        const filters = {
            theme: this.ui.elements.themeSelect?.value || '',
            movement: this.ui.elements.movementSelect?.value || '',
            orientation: this.ui.elements.orientationSelect?.value || '',
            difficulty: this.ui.elements.difficultySelect?.value || '',
            location: this.ui.elements.locationSelect?.value || ''
        };

        // Filter and sort
        this.filteredData = this.csvManager.filter(keyword, filters);
        const sortOption = this.ui.elements.sortSelect?.value || 'best-match';
        this.filteredData = this.csvManager.sort(this.filteredData, sortOption, keyword);

        this.ui.hideLoading();

        if (this.filteredData.length === 0) {
            this.ui.showNoResults();
            return;
        }

        this.ui.hideNoResults();
        this.ui.showResultsContent();
        this.ui.updateResultsCount(this.filteredData.length);

        // Reset and load items
        this.visibleCount = 0;
        this.ui.clearResults();
        this.loadMoreItems();

        // Setup infinite scroll
        this.setupInfiniteScroll();
    }

    handleSortChange(sortOption) {
        if (this.filteredData.length === 0) return;

        const keyword = this.ui.elements.searchInput?.value.trim().toLowerCase() || '';
        this.filteredData = this.csvManager.sort(this.filteredData, sortOption, keyword);

        this.visibleCount = 0;
        this.ui.clearResults();
        this.loadMoreItems();
    }

    loadMoreItems() {
        const end = Math.min(this.visibleCount + this.itemsPerPage, this.filteredData.length);
        const itemsToLoad = this.filteredData.slice(this.visibleCount, end);

        itemsToLoad.forEach(item => {
            const card = this.cardFactory.create(item);
            this.ui.elements.results.appendChild(card);
        });

        this.visibleCount = end;

        // Update load more visibility
        if (this.visibleCount < this.filteredData.length) {
            this.ui.showLoadMore();
        } else {
            this.ui.hideLoadMore();
        }
    }

    setupInfiniteScroll() {
        if (this.infiniteScroll) {
            this.infiniteScroll.disconnect();
        }

        this.infiniteScroll = new InfiniteScrollManager(() => {
            if (this.visibleCount < this.filteredData.length) {
                this.loadMoreItems();
            }
        });

        this.infiniteScroll.observe(this.ui.elements.loadMore);
    }
}

// Export
window.App = App;
