const mongoose = require('mongoose');

const Message = mongoose.model('Message', new mongoose.Schema({
    sendername: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    content: String,
    date: String,
    readby: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
}))

module.exports = Message;