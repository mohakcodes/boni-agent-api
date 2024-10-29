const mongoose = require('mongoose');

const callSchema = new mongoose.Schema({
    agent:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Agent',
        required: true
    },
    customerId:{
        type: String,
        required: true
    },
    timestamp:{
        type: Date,
        required: true
    },
    status:{
        type: String,
        enum: ['connected', 'not connected'],
        required: true
    }
},{timestamps: true});

const Call = mongoose.model('Call', callSchema);
module.exports = Call;