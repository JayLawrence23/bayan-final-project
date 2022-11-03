const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    token:  { type: String },
    createdAt: {
        type: Date,
        default: new Date()
    },
}, { timestamp: true });


const auth = mongoose.model('Auth', authSchema);

module.exports = auth;