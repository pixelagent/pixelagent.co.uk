/**
 * Offline Manager - Handles localStorage caching and file downloads
 */

class OfflineManager {
    constructor() {
        this.storageKey = Config.STORAGE_KEYS.CSV_DATA;
        this.timestampKey = Config.STORAGE_KEYS.CSV_TIMESTAMP;
    }

    saveToLocalStorage(data) {
        try {
            const json = JSON.stringify(data);
            localStorage.setItem(this.storageKey, json);
            localStorage.setItem(this.timestampKey, new Date().toISOString());
            return true;
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
            return false;
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            const timestamp = localStorage.getItem(this.timestampKey);
            if (data) {
                return {
                    data: JSON.parse(data),
                    timestamp: timestamp,
                    available: true
                };
            }
        } catch (error) {
            console.error('Failed to load from localStorage:', error);
        }
        return { data: null, timestamp: null, available: false };
    }

    clearLocalStorage() {
        try {
            localStorage.removeItem(this.storageKey);
            localStorage.removeItem(this.timestampKey);
            return true;
        } catch (error) {
            console.error('Failed to clear localStorage:', error);
            return false;
        }
    }

    downloadAsFile(data, filename = 'artwork-data.json') {
        try {
            const json = JSON.stringify(data, null, 2);
            const blob = new Blob([json], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
            return true;
        } catch (error) {
            console.error('Failed to download file:', error);
            return false;
        }
    }

    getCacheInfo() {
        const { timestamp } = this.loadFromLocalStorage();
        if (timestamp) {
            const date = new Date(timestamp);
            return `Cached: ${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        }
        return 'No cached data';
    }

    isCacheValid(maxAge = Config.CACHE_MAX_AGE) {
        const { timestamp } = this.loadFromLocalStorage();
        if (!timestamp) return false;
        const cached = new Date(timestamp).getTime();
        const now = new Date().getTime();
        return (now - cached) < maxAge;
    }
}

// Export
window.OfflineManager = OfflineManager;
