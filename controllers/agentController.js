const Agent = require('../models/agent');

exports.getAllAgents = async (req, res) => {
    try {
        const agents = await Agent.find().select('-password');
        res.status(200).json(agents);
    }
    catch (error) {
        res.status(500).json({ message: error.message });    
    }   
}

exports.getAgentById = async (req, res) => {
    try {
        const agentId = req.params.id;
        const agent = await Agent.findById(agentId).select('-password');
        if(!agent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.status(200).json(agent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });    
    }
}

exports.createAgent = async (req, res) => {
    const {name,email,password} = req.body;
    try {
        const agent = await Agent.create({name,email,password});
        res.status(201).json(agent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });    
    }
}

exports.updateAgent = async (req, res) => {
    try {
        const agentId = req.params.id;
        const updatedAgent = await Agent.findByIdAndUpdate(agentId, req.body, { new: true });
        if(!updatedAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.status(200).json(updatedAgent);
    }
    catch (error) {
        res.status(500).json({ message: error.message });    
    }
}

exports.deleteAgent = async(req,res) => {
    try {
        const agentId = req.params.id;
        const deletedAgent = await Agent.findByIdAndDelete(agentId);
        if(!deletedAgent) {
            return res.status(404).json({ message: 'Agent not found' });
        }
        res.status(200).json({ message: 'Agent deleted' });    
    } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}