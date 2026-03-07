/**
 * Lazy Image Loader - Handles lazy loading of images using Intersection Observer
 */

class LazyImageLoader {
    constructor(options = {}) {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    this.observer.unobserve(img);
                }
            });
        }, {
            rootMargin: options.rootMargin || Config.LAZY_LOAD_ROOT_MARGIN,
            threshold: options.threshold || Config.LAZY_LOAD_THRESHOLD
        });
    }

    observe(element) {
        if (element && element.dataset.src) {
            this.observer.observe(element);
        }
    }

    disconnect() {
        this.observer.disconnect();
    }
}

// Export
window.LazyImageLoader = LazyImageLoader;
