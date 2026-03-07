/**
 * Theme Manager - Handles light/dark theme switching
 */

class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem(Config.STORAGE_KEYS.THEME) || 'light';
        this.init();
    }

    init() {
        document.documentElement.setAttribute('data-theme', this.theme);
        this.updateIcon();
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.set(this.theme);
    }

    updateIcon() {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.textContent = this.theme === 'light' ? '🌙' : '☀️';
        }
    }

    set(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(Config.STORAGE_KEYS.THEME, theme);
        this.updateIcon();
    }

    updateOptions() {
        const options = document.querySelectorAll('.theme-option');
        options.forEach(option => {
            if (option.dataset.theme === this.theme) {
                option.classList.add('active');
                option.classList.remove('btn-secondary');
            } else {
                option.classList.remove('active');
                option.classList.add('btn-secondary');
            }
        });
    }
}

// Export
window.ThemeManager = ThemeManager;
