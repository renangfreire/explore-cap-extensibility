const cors = require('cors');

module.exports = (app) => {
    app.use(cors({
        origin: '*', // Allow all origins for development; restrict in production
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true
    }));
}