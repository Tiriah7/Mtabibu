const HealthProgram = require('../models/HealthProgram');

exports.getPrograms = async (req, res) => {
    try {
      const programs = await HealthProgram.find();
      res.status(200).json(programs);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

exports.createProgram = async (req, res) => {
    try {
        const program = await HealthProgram.create(req.body);
        res.status(201).json(program);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};