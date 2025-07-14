// generate-sitemap.js
const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs');
const path = require('path');

// Set your base URL
const BASE_URL = 'https://mealbloom.app';

// Define your static routes here
const staticRoutes = [
    '/', // Homepage
];

// Create sitemap stream
const sitemap = new SitemapStream({ hostname: BASE_URL });

// Write each route to the sitemap
staticRoutes.forEach(route => {
    sitemap.write({ url: route, changefreq: 'weekly', priority: 1.0 });
});

sitemap.end();

// Write the sitemap file to the public/ directory
streamToPromise(sitemap).then(sm => {
    // Ensure public directory exists
    const publicDir = path.join(__dirname, 'public');
    if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir);
    }

    fs.writeFileSync(path.join(publicDir, 'sitemap-index.xml'), sm.toString());
    console.log('Sitemap generated at public/sitemap-index.xml');
});