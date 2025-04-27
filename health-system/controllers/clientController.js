const Client = require('../models/client');

exports.createClient = async (req, res) => {
    try {
        const client = await Client.create(req.body);
        res.status(201).json(client);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getClients = async (req, res) => {
    try {
        const clients = await Client.find().populate('programs');
        res.status(200).json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getClientById = async (req, res) => {
  try{
    const client = await Client.findById(req.params.id).populate('programs');
    if(!client) {
      return res.status(404).json({error: 'Client not found'});
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Error fetching client', error);
    res.status(500).json({ error: error.message });
  }
};

exports.enrollClientToProgram = async (req, res) => {
    const { clientId, programId } = req.body;
  
    try {
      const client = await Client.findById(clientId);
      if (!client) return res.status(404).json({ error: 'Client not found' });
  
      // Prevent duplicate enrollment
      if (!client.programs.includes(programId)) {
        client.programs.push(programId);
        await client.save();
      }
  
      // Optionally populate the program details before sending
      const updatedClient = await Client.findById(clientId).populate('programs');
  
      res.status(200).json(updatedClient);
    } catch (error) {
      console.error('Enrollment failed:', error.message);
      res.status(500).json({ error: error.message });
    }
  };
  
  
