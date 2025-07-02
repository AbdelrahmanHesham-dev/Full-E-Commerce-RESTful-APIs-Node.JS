const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');
const subCategoryRoute = require('./routes/subCategoryRoute');
const brandRoute = require('./routes/brandRoute');
const ApiError = require('./utils/apiError'); // Import ApiError class
const globalError = require('./middlewares/errorMiddleware'); // Import global error handler

// Connect to the database
dbConnection();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev')); // Logging middleware for development
    console.log(`Running in ${process.env.NODE_ENV} mode`);
}

// Mount Routes
app.use('/api/v1/categories', categoryRoute);
app.use('/api/v1/subcategories', subCategoryRoute);
app.use('/api/v1/brands', brandRoute);


app.use((req, res, next) => {
    next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

// Global error handling middleware for express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
    console.log(`App running running on port ${PORT}`);
});

// Handle rejection outside express
process.on('unhandledRejection', (err) => {
    console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
    server.close(() => {
        console.error(`Shutting down....`);
        process.exit(1);
    });
});