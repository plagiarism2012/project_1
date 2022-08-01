const mongoose = require('mongoose');

const employSchema = mongoose.Schema({
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
    Address: {
        type: String,
        required: false
    },
    ChargePH: {
        type: Number,
        required: true
    },
    Designation: {
        type: String,
        required: false
    },
    Active: {
        type: Boolean,
        required: false
    }
});

module.exports = mongoose.model('EmployDB', employSchema);