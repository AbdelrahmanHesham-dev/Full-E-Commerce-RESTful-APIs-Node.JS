const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');

dotenv.config({ path: 'config.env' });
const dbConnection = require('./config/database');
const categoryRoute = require('./routes/categoryRoute');

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



const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
