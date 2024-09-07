const mongoose = require('mongoose');

const InputSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    incom: {
        type: String,
        required: true,
    },
    expense: {
        type: String,
        required: false,
    },
    category: {
        type: String,
        required: false,
        trim: true
    },
    phone: {
        type: String,
        required: true,
        maxLength: 100,
        trim: true
    },
})
module.exports = mongoose.model('Input', InputSchema)