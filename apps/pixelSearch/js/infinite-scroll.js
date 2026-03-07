/**
 * Infinite Scroll Manager - Handles pagination as user scrolls
 */

class InfiniteScrollManager {
    constructor(callback, options = {}) {
        this.callback = callback;
        this.options = {
            rootMargin: options.rootMargin || Config.INFINITE_SCROLL_ROOT_MARGIN,
            threshold: options.threshold || 0
        };
        this.observer = null;
    }

    observe(element) {
        if (!element) return;

        this.observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                this.callback();
            }
        }, this.options);
        this.observer.observe(element);
    }

    disconnect() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }
}

// Export
window.InfiniteScrollManager = InfiniteScrollManager;
