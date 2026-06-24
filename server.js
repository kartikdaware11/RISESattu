const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable gzip compression
app.use(compression());

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Cache static assets
app.use(express.static(__dirname, {
    maxAge: '1d',
    etag: true,
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css') || filePath.endsWith('.js')) {
            res.setHeader('Cache-Control', 'public, max-age=604800');
        }
        if (filePath.match(/\.(jpg|jpeg|png|gif|ico|svg|webp)$/)) {
            res.setHeader('Cache-Control', 'public, max-age=2592000');
        }
    }
}));

// Serve index.html for root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle 404 - redirect to home
app.use((req, res) => {
    res.redirect('/');
});

// Start server
app.listen(PORT, () => {
    console.log(`
    ╔═══════════════════════════════════════════════════════╗
    ║                                                       ║
    ║   🌾 Arogya Sattu Landing Page Server                 ║
    ║                                                       ║
    ║   Server running at: http://localhost:${PORT}            ║
    ║   Desi mein hai DUM!                                  ║
    ║                                                       ║
    ║   Press Ctrl+C to stop                                ║
    ║                                                       ║
    ╚═══════════════════════════════════════════════════════╝
    `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\nServer stopped.');
    process.exit(0);
});
