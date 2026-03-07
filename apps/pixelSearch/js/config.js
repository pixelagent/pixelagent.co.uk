/**
 * Configuration for Pixel Search
 */

const Config = {
    // CSV Data URL

    CSV_URL: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR-xgq7t3JbTbAhvrv2TiA1eNijw-yGldCzYjA-zKRoIjy55e5u0mUHWNrDzJYgxAtJ7-sqgJR3hw6p/pub?gid=1191973105&single=true&output=csv',

    // Pagination
    ITEMS_PER_PAGE: 24,

    // Image Lazy Loading
    LAZY_LOAD_ROOT_MARGIN: '100px',
    LAZY_LOAD_THRESHOLD: 0.1,

    // Infinite Scroll
    INFINITE_SCROLL_ROOT_MARGIN: '200px',

    // Cache
    CACHE_MAX_AGE: 24 * 60 * 60 * 1000, // 24 hours

    // Storage Keys
    STORAGE_KEYS: {
        THEME: 'pixelSearch_theme',
        CSV_DATA: 'pixelSearch_csvData',
        CSV_TIMESTAMP: 'pixelSearch_csvTimestamp',
        LAYOUT: 'pixelSearch_layout',
        GOOGLE_AUTH: 'pixelSearch_googleAuth'
    },

    // Placeholder Image
    PLACEHOLDER_IMAGE: 'gfx/Image-not-found.png',

    // Hardcoded filter options
    MOVEMENTS: [
        'Renaissance',
        'Post-Impressionism',
        'Expressionism',
        'Baroque',
        'Cubism',
        'Surrealism',
        'Regionalism'
    ],

    LOCATIONS: [
        'Louvre, Paris',
        'Santa Maria delle Grazie, Milan',
        'Museum of Modern Art, New York',
        'National Museum, Oslo',
        'Mauritshuis, The Hague',
        'Museo Reina Sofía, Madrid',
        'Art Institute of Chicago',
        'Rijksmuseum, Amsterdam',
        'Uffizi Gallery, Florence'
    ]
};

// Export for use in other modules
window.Config = Config;
