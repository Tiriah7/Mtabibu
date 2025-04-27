const mongoose = require('mongoose');

const HealthProgramSchema = new mongoose.Schema({
    name: String,
});

module.exports = mongoose.model('HealthProgram', HealthProgramSchema);