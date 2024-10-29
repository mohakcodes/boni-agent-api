const Calls = require('../models/calls');

exports.getAllCalls = async (req, res) => {
    try {
        const calls = await Calls.find();
        res.status(200).json(calls);
    }
    catch (error) {
        res.status(500).json({ message: error.message });    
    }
}

exports.getCallById = async (req, res) => {
    try {
        const callId = req.params.id;
        const call = await Calls.findById(callId);
        if(!call) {
            return res.status(404).json({ message: 'Call not found' });
        }
        res.status(200).json(call);
    }
    catch (error) {
        res.status(500).json({ message: error.message });    
    }
}

exports.createCall = async (req, res) => {
    const {agentId,customerId,timestamp,status} = req.body;

    if(status !== 'connected' && status !== 'not connected') {
        return res.status(400).json({ message: 'Either status needs to be "connected" or "not connected".' });
    }

    const formatTime = new Date(timestamp*1000);

    try {
        const call = await Calls.create({agent:agentId,customerId,timestamp:formatTime,status});
        res.status(201).json(call);
    }
    catch (error) {
        res.status(500).json({ message: error.message });    
    }
}

exports.getAllCallsByAgent = async (req, res) => {
    try {
        const agentId = req.params.agentId;
        const agentCallRecords = await Calls.find({agent: agentId}).populate('agent');
        if(agentCallRecords.length === 0) {
            return res.status(404).json({ message: 'No calls found for this agent' });
        }
        const result = {
            agent:{
                _id: agentCallRecords[0].agent._id,
                name: agentCallRecords[0].agent.name,
                email: agentCallRecords[0].agent.email
            },
            calls: agentCallRecords.map(call => {
                return {
                    _id: call._id,
                    customerId: call.customerId,
                    timestamp: call.timestamp,
                    status: call.status
                }
            })
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getCallStats = async (req, res) => {
    try {
        const {startTime, endTime, agentId} = req.query;
        const startDate = new Date(parseInt(startTime*1000));
        const endDate = new Date(parseInt(endTime*1000));

        const allCallsInTheRange = await Calls.find({
            timestamp:{
                $gte: startDate,
                $lte: endDate
            }
        }).populate('agent');

        const agentStats = {};

        allCallsInTheRange.map(call => {
            const agentId = call.agent._id.toString();
            if(!agentStats[agentId]){
                agentStats[agentId] = {
                    agent: call.agent,
                    totalCalls: 1,
                    connectedCalls: call.status === 'connected' ? 1 : 0,
                    notConnectedCalls: call.status === 'not connected' ? 1 : 0,
                }
            }
            else{
                agentStats[agentId].totalCalls++;
                if(call.status === 'connected'){
                    agentStats[agentId].connectedCalls++;
                }
                else if(call.status === 'not connected'){
                    agentStats[agentId].notConnectedCalls++;
                }
            }
        })

        const result = Object.values(agentStats);
        if(agentId){
            const agent = result.find(agent => agent.agent._id.toString() === agentId);
            if(!agent){
                return res.status(404).json({ message: 'Agent not found' });
            }
            return res.status(200).json(agent);
        }
        res.status(200).json(result);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
