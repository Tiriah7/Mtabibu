const mongoose = require('mongoose');
require('dotenv').config();

// Connect to database
const connectDB = async() => {

    const uri = process.env.MONGO_URI || 'mongodb+srv://reece:IR2poL5f34FxNW3O@Health-app.bpszb4x.mongodb.net/health-system?retryWrites=true&w=majority&appName=Health-app';
    mongoose.connect(uri)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
} 


module.exports = connectDB;