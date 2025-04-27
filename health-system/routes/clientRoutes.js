const express = require('express');
const { createClient, getClients, getClientById , enrollClientToProgram } = require('../controllers/clientController');

const router = express.Router();

router.post('/', createClient);
router.get('/', getClients);
router.get('/:id', getClientById);
router.post('/enroll', enrollClientToProgram);

module.exports = router;