const mongoose = require('mongoose');

const agentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})

const Agent = mongoose.model('Agent', agentSchema);
module.exports = Agent;