const express = require('express');
const router = express.Router();
const EmployDB = require('../models/employ');
const AdminDB = require('../models/admin');
const WorkDB = require('../models/work');
const ScheduleDB = require('../models/schedule');

router.get('/', (req, res)=>{
    res.send("We are on employ side");
})

module.exports = router;