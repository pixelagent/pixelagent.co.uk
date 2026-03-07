/**
 * CSV Data Manager - Handles loading, filtering, and sorting of artwork data
 */

class CSVDataManager {
    constructor() {
        this.data = [];
        this.loaded = false;
        this.filterOptions = {
            theme: [],
            movement: [],
            orientation: [],
            difficulty: [],
            location: []
        };
    }

    async load(url) {
        return new Promise((resolve, reject) => {
            Papa.parse(url, {
                download: true,
                header: true,
                complete: (results) => {
                    console.log('Raw CSV headers:', results.meta.fields);
                    console.log('Sample row:', results.data[0]);
                    console.log('Total rows:', results.data.length);

                    this.data = results.data.filter(item => item && Object.keys(item).length > 0);
                    this.loaded = true;
                    this.extractFilterOptions();
                    console.log('CSV loaded:', this.data.length, 'items');
                    console.log('Filter options:', this.filterOptions);
                    resolve(this.data);
                },
                error: (error) => {
                    console.error('CSV parse error:', error);
                    reject(error);
                }
            });
        });
    }

    // Extract unique values for each filter from the data
    extractFilterOptions() {
        const options = {
            theme: new Set(),
            movement: new Set(),
            orientation: new Set(),
            difficulty: new Set(),
            location: new Set()
        };

        this.data.forEach((item, index) => {
            // Debug first few rows
            if (index < 3) {
                console.log(`Row ${index + 1} keys:`, Object.keys(item));
                console.log(`Row ${index + 1} Movement value:`, item['Movement'], item['movement']);
            }

            // Theme
            const theme = this.normalizeField(item, 'Theme', 'theme');
            if (theme) options.theme.add(theme.trim());

            // Movement
            const movement = this.normalizeField(item, 'Movement', 'movement');
            if (movement) options.movement.add(movement.trim());

            // Orientation
            const orientation = this.normalizeField(item, 'Orientation', 'orientation');
            if (orientation) options.orientation.add(orientation.trim());

            // Difficulty
            const difficulty = this.normalizeField(item, 'Difficulty', 'difficulty');
            if (difficulty) options.difficulty.add(difficulty.trim());

            // Location
            const location = this.normalizeField(item, 'Location', 'location');
            if (location) options.location.add(location.trim());
        });

        this.filterOptions = {
            theme: Array.from(options.theme).sort(),
            movement: Array.from(options.movement).sort(),
            orientation: Array.from(options.orientation).sort(),
            difficulty: Array.from(options.difficulty).sort((a, b) => parseInt(a) - parseInt(b) || a.localeCompare(b)),
            location: Array.from(options.location).sort()
        };

        console.log('Final movement options:', this.filterOptions.movement);
    }

    getFilterOptions() {
        return this.filterOptions;
    }

    filter(keyword, filters = {}) {
        return this.data.filter(item => {
            if (!item) return false;

            // Normalize field names
            const title = this.normalizeField(item, 'Title', 'title', 'Name', 'name');
            const artist = this.normalizeField(item, 'Artist', 'artist');
            const theme = this.normalizeField(item, 'Theme', 'theme');
            const movement = this.normalizeField(item, 'Movement', 'movement');
            const orientation = this.normalizeField(item, 'Orientation', 'orientation');
            const difficulty = this.normalizeField(item, 'Difficulty', 'difficulty');
            const location = this.normalizeField(item, 'Location', 'location');
            const approved = this.normalizeField(item, 'Approved', 'approved');

            // Only show approved items
            const isApproved = approved === 'TRUE' || approved === 'true';
            if (!isApproved) return false;

            // Check keyword match
            const matchesKeyword = !keyword ||
                (title && title.toLowerCase().includes(keyword)) ||
                (artist && artist.toLowerCase().includes(keyword)) ||
                (theme && theme.toLowerCase().includes(keyword)) ||
                (movement && movement.toLowerCase().includes(keyword));

            // Check each filter
            const matchesTheme = !filters.theme ||
                (theme && theme.trim().toLowerCase() === filters.theme.toLowerCase());

            const matchesMovement = !filters.movement ||
                (movement && movement.trim().toLowerCase() === filters.movement.toLowerCase());

            const matchesOrientation = !filters.orientation ||
                (orientation && orientation.trim().toLowerCase() === filters.orientation.toLowerCase());

            const matchesDifficulty = !filters.difficulty ||
                (difficulty && difficulty.trim() === filters.difficulty);

            const matchesLocation = !filters.location ||
                (location && location.trim().toLowerCase() === filters.location.toLowerCase());

            return matchesKeyword && matchesTheme && matchesMovement &&
                matchesOrientation && matchesDifficulty && matchesLocation;
        });
    }

    // Helper to normalize field names (handles whitespace, tabs, etc.)
    normalizeField(item, ...possibleNames) {
        for (const fieldName of possibleNames) {
            if (item[fieldName]) {
                return item[fieldName];
            }
            // Try with trimmed key
            for (const key of Object.keys(item)) {
                if (key.trim() === fieldName) {
                    return item[key];
                }
            }
        }
        return '';
    }

    sort(data, option, searchKeyword) {
        switch (option) {
            case 'name':
                return data.sort((a, b) => {
                    const nameA = (a.Name || a.Title || 'Untitled').toLowerCase();
                    const nameB = (b.Name || b.Title || 'Untitled').toLowerCase();
                    return nameA.localeCompare(nameB);
                });
            case 'date':
                return data.sort((a, b) => {
                    const dateA = a.Date || a.Created || a.added || '';
                    const dateB = b.Date || b.Created || b.added || '';
                    if (dateA && dateB) {
                        return new Date(dateB) - new Date(dateA);
                    }
                    return this.data.indexOf(a) - this.data.indexOf(b);
                });
            case 'best-match':
            default:
                if (searchKeyword) {
                    const keyword = searchKeyword.toLowerCase();
                    return data.sort((a, b) => {
                        const nameA = (a.Name || a.Title || '').toLowerCase();
                        const nameB = (b.Name || b.Title || '').toLowerCase();
                        const themeA = (a.Theme || '').toLowerCase();
                        const themeB = (b.Theme || '').toLowerCase();
                        const artistA = (a.Artist || '').toLowerCase();
                        const artistB = (b.Artist || '').toLowerCase();

                        const exactA = nameA === keyword || themeA === keyword || artistA === keyword;
                        const exactB = nameB === keyword || themeB === keyword || artistB === keyword;

                        if (exactA && !exactB) return -1;
                        if (!exactA && exactB) return 1;

                        const wordA = ` ${nameA} `.includes(` ${keyword} `) || ` ${themeA} `.includes(` ${keyword} `);
                        const wordB = ` ${nameB} `.includes(` ${keyword} `) || ` ${themeB} `.includes(` ${keyword} `);

                        if (wordA && !wordB) return -1;
                        if (!wordA && wordB) return 1;

                        return 0;
                    });
                }
                return data;
        }
    }
}

// Export
window.CSVDataManager = CSVDataManager;
