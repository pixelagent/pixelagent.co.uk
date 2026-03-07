/**
 * Result Card Factory - Creates artwork result cards
 */

class ResultCardFactory {
    constructor(lazyImageLoader) {
        this.lazyImageLoader = lazyImageLoader;
        this.placeholderSrc = Config.PLACEHOLDER_IMAGE;
    }

    create(item) {
        const card = document.createElement('div');
        card.className = 'result-card';

        // Helper to normalize field names - handles tabs, extra spaces, etc.
        const normalizeField = (possibleNames) => {
            // First try direct match
            for (const fieldName of possibleNames) {
                if (item[fieldName]) {
                    return item[fieldName];
                }
            }
            // Try with normalized keys (trim all whitespace including tabs)
            const normalizedKeys = Object.keys(item).map(k => k.replace(/\s+/g, ' ').trim());
            for (const fieldName of possibleNames) {
                const normalizedField = fieldName.replace(/\s+/g, ' ').trim();
                const idx = normalizedKeys.findIndex(k => k === normalizedField);
                if (idx !== -1) {
                    return item[Object.keys(item)[idx]];
                }
            }
            return '';
        };

        // Debug: log available keys
        if (typeof console !== 'undefined' && console.log && !this._loggedKeys) {
            console.log('Available columns:', Object.keys(item));
            this._loggedKeys = true;
        }

        // Get image fields
        const id = normalizeField(['Id', 'id']) || '';
        const thumbnail = normalizeField(['Thumbnail', 'thumbnail', 'Image URL Thumbnail']) || '';
        const imageUrl = normalizeField(['Image URL', 'image url']) || '';
        const imageUpload = normalizeField(['Image Upload', 'image upload']) || '';

        // Debug: log image fields
        if (typeof console !== 'undefined' && console.log) {
            console.log('Image fields:', { id, thumbnail, imageUrl, imageUpload });
        }

        // Determine display image (thumbnail for display)
        let displayImage = '';
        if (thumbnail) {
            displayImage = thumbnail;
        } else if (id) {
            displayImage = id;
        } else if (imageUpload) {
            displayImage = imageUpload;
        }

        // Determine download image (full resolution for download)
        let downloadImage = '';
        if (imageUrl) {
            downloadImage = imageUrl;
        } else if (imageUpload) {
            downloadImage = imageUpload;
        }

        // Determine types for URL generation
        const displayType = thumbnail ? 'direct' : (id || imageUpload ? 'google-drive' : 'none');
        const downloadType = imageUrl ? 'direct' : 'google-drive';

        // Generate URLs
        const thumbnailUrl = this.getThumbnailUrl(displayImage, displayType);
        const downloadUrl = this.getDownloadUrl(downloadImage, downloadType);
        const showDownload = downloadImage;

        // Title field (prioritize Title over Name)
        const title = normalizeField(['Title', 'title', 'Name', 'name']) || 'Untitled';
        const theme = normalizeField(['Theme', 'theme']) || '';
        const artist = normalizeField(['Artist', 'artist']) || '';
        const orientation = normalizeField(['Orientation', 'orientation']) || '';
        const difficulty = normalizeField(['Difficulty', 'difficulty']) || '';
        const year = normalizeField(['Year', 'year']) || '';
        const location = normalizeField(['Location', 'location']) || '';
        const movement = normalizeField(['Movement', 'movement']) || '';

        card.innerHTML = `
            <img
                src="${thumbnailUrl}"
                alt="${title}"
                class="result-image"
                onerror="this.src='${this.placeholderSrc}';"
            >
            <div class="result-content">
                <h3 class="result-title">${title}</h3>
                ${theme ? `<p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.5rem;">${theme}</p>` : ''}
                ${artist ? `<p style="font-size: 0.9rem; margin-bottom: 0.75rem;">${artist}</p>` : ''}
                <div class="result-meta">
                    ${orientation ? `<span class="meta-tag orientation">${orientation}</span>` : ''}
                    ${difficulty ? `<span class="meta-tag difficulty">Level ${difficulty}</span>` : ''}
                    ${year ? `<span class="meta-tag">${year}</span>` : ''}
                </div>
                ${location || movement ? `
                <div class="result-meta">
                    ${location ? `<span class="meta-tag">${location}</span>` : ''}
                    ${movement ? `<span class="meta-tag">${movement}</span>` : ''}
                </div>
                ` : ''}
                ${showDownload ? `
                <div class="result-actions">
                    <a href="${downloadUrl}" target="_blank" class="btn btn-small btn-outline">⬇️ Download</a>
                </div>
                ` : ''}
            </div>
        `;

        return card;
    }

    getImageType(url) {
        if (!url) return 'none';
        if (url.includes('drive.google.com')) return 'google-drive';
        if (url.includes('wikipedia.org') || url.includes('wikimedia.org')) return 'wikipedia';
        if (url.includes('http')) return 'direct';
        return 'id';
    }

    getThumbnailUrl(id, type = 'none') {
        if (!id) return this.placeholderSrc;

        switch (type) {
            case 'google-drive':
                const fileId = this.extractGoogleDriveFileID(id);
                return `https://drive.google.com/thumbnail?authuser=0&sz=w320&id=${fileId}`;
            case 'wikipedia':
            case 'direct':
            default:
                return id;
        }
    }

    getDownloadUrl(id, type = 'none') {
        if (!id) return '#';

        switch (type) {
            case 'google-drive':
                const fileId = this.extractGoogleDriveFileID(id);
                return `https://drive.google.com/uc?id=${fileId}&export=download`;
            case 'wikipedia':
            case 'direct':
            default:
                return id;
        }
    }

    extractGoogleDriveFileID(url) {
        if (!url) return '';
        const match = url.match(/\/(?:open|uc)\?id=([^&]+)/);
        return match ? match[1] : url;
    }
}

// Export
window.ResultCardFactory = ResultCardFactory;
