const mongoose = require('mongoose');


const dbConnection = () => {
    mongoose.connect(process.env.DB_URI)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
        });
}

module.exports = dbConnection;