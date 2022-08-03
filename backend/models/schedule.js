const mongoose = require('mongoose');
const date = require('date-and-time');
const now = new Date;
// console.log(date.format(now, 'YYYY/MM/DD HH:mm:ss'));

const scheduleSchema = mongoose.Schema({
    EmpID: {
        type: String,
        required: true
    },
    CurrDate: {
        type: String,
        required: true
    },
    Entry: {
        type: String,
        required: false
    },
    Exit: {
        type: String,
        required: false
    },
    Description: {
        type: String,
        default: 0
    }
});

module.exports = mongoose.model('ScheduleDB', scheduleSchema);