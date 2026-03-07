// strudel-loader.js - Load Strudel using local files and make it available globally
// This approach works with regular script loading

// Load Strudel from local file
function loadStrudelFromLocal() {
    return new Promise((resolve, reject) => {
        // Check if we already have the strudel object
        if (typeof strudel !== 'undefined') {
            console.log("Strudel already available");
            resolve();
            return;
        }

        // Try to load from local file
        const script = document.createElement('script');
        script.src = 'js/strudel-main.js';
        script.async = true;
        script.onload = () => {
            setTimeout(() => {
                if (typeof strudel !== 'undefined') {
                    console.log("Strudel loaded successfully from local file");
                    resolve();
                } else {
                    console.warn('Strudel not available from local file, trying CDN fallback');
                    loadStrudelFromCDN().then(resolve).catch(reject);
                }
            }, 500);
        };
        script.onerror = () => {
            console.warn('Strudel local file failed, trying CDN fallback');
            loadStrudelFromCDN().then(resolve).catch(reject);
        };
        document.head.appendChild(script);
    });
}

// Load Strudel from CDN as fallback
function loadStrudelFromCDN() {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/@strudel/webaudio@1.2.6';
        script.async = true;
        script.onload = () => {
            setTimeout(() => {
                if (typeof strudel !== 'undefined') {
                    console.log("Strudel loaded successfully from CDN");
                    resolve();
                } else {
                    reject(new Error('Strudel global not available after CDN load'));
                }
            }, 500);
        };
        script.onerror = () => {
            console.warn('Strudel CDN failed, trying older version fallback');
            // Try fallback to older version
            const fallbackScript = document.createElement('script');
            fallbackScript.src = 'https://unpkg.com/strudel@0.12.2/dist/strudel.web.js';
            fallbackScript.async = true;
            fallbackScript.onload = () => {
                setTimeout(() => {
                    if (typeof strudel !== 'undefined') {
                        console.log("Strudel loaded successfully from fallback CDN");
                        resolve();
                    } else {
                        reject(new Error('Strudel global not available after fallback'));
                    }
                }, 500);
            };
            fallbackScript.onerror = () => {
                console.error('All Strudel loading attempts failed');
                reject(new Error('Failed to load Strudel from all sources'));
            };
            document.head.appendChild(fallbackScript);
        };
        document.head.appendChild(script);
    });
}

// Initialize Strudel when the page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        loadStrudelFromLocal().catch(error => {
            console.error('Strudel loading failed:', error);
        });
    });
} else {
    loadStrudelFromLocal().catch(error => {
        console.error('Strudel loading failed:', error);
    });
}

// Make sure strudel is available globally
window.strudel = window.strudel || {};