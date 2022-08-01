const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
    Name: {
        type: String,
        required: true,
    },
    Phone: {
        type: String,
        required: true,
    },
    Email: {
        type: String,
        required: true
    },
    Active: {
        type: Boolean,
        required: false
    },
    Password: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('AdminDB', adminSchema);