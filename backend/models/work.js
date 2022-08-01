const mongoose = require('mongoose');
const date = require('date-and-time');
const now = new Date;
// console.log(date.format(now, 'YYYY/MM/DD HH:mm:ss'));

const workSchema = mongoose.Schema({
    ID: {
        type: String,
        required: true
    },
    Entry: {
        type: Date,
        required: false
    },
    Exit: {
        type: Date,
        required: false
    },
    Total: {
        type: Number,
        default: 0
    }
});

module.exports = mongoose.model('WorkDB', workSchema);