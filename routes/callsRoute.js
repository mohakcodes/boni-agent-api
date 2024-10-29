const express = require('express');
const callsController = require('../controllers/callsController');

const router = express.Router();

router.get('/', callsController.getAllCalls);
router.get('/:id', callsController.getCallById);
router.post('/', callsController.createCall);
router.get('/agent/:agentId', callsController.getAllCallsByAgent);
router.get('/stats/from', callsController.getCallStats);

module.exports = router;