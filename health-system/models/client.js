const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    name: String,
    age: Number,
    gender: String,
    programs: [{type: mongoose.Schema.Types.ObjectId, ref: 'HealthProgram' }]
});

module.exports = mongoose.model('Client', clientSchema);