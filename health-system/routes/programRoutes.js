const express = require('express');
const { createProgram } = require('../controllers/programController');
const { getPrograms } = require('../controllers/programController');

const router = express.Router();

router.get('/', getPrograms);
router.post('/', createProgram);

module.exports = router;