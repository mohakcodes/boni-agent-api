const express = require('express');
const agentController = require('../controllers/agentController');

const router = express.Router();

router.get('/', agentController.getAllAgents);
router.get('/:id', agentController.getAgentById);
router.post('/', agentController.createAgent);
router.put('/:id', agentController.updateAgent);
router.delete('/:id', agentController.deleteAgent);

module.exports = router;