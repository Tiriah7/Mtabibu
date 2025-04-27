const mongoose = require('mongoose');
require('dotenv').config();

// Connect to database
const connectDB = async() => {

    const uri = process.env.MONGO_URI || 'mongodb+srv://reece:test1234@mutalldata.9qn3j.mongodb.net/health-system?retryWrites=true&w=majority&appName=mutalldata';
    mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
} 


module.exports = connectDB;