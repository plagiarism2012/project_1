const express = require('express');
const date = require('date-and-time');
const router = express.Router();
const now = new Date;
const EmployDB = require('../models/employ');
const AdminDB = require('../models/admin');
const WorkDB = require('../models/work');
const ScheduleDB = require('../models/schedule');
const { update } = require('../models/employ');


//we are on employ side
router.get('/', (req, res)=>{
    res.send("We are on employ side");
});

// get all schedules for an particular ID (user)
router.get('/allSchedule/:ID', async (req, res)=>{
    const id = req.params.ID;
    try {
        const scheduleList = await ScheduleDB.find({EmpID: id});
        res.json(scheduleList);
    } catch (err) {
        res.json({message: err});
    }
    
});

//get all schedules of future and present for a particular ID(user)
router.get('/presentSchedule/:ID', async (req, res)=>{
    const id = req.params.ID;
    const threshold = date.format(now, 'YYYY/MM/DD'); 
    console.log(threshold);

    try {
        const scheduleList = await ScheduleDB.find({EmpID: id, CurrDate: {$gte: threshold}});
        res.json(scheduleList);
    } catch (err) {
        res.json({message: err});
    }
});

// to get all the work done by any ID(user)
// use WorkDB
router.get('/allWorks/:ID', async (req, res)=>{
    const id = req.params.ID;
    
    try {
        //something need to discuss about the storage of work hours each day for any ID(user)
    } catch (err) {
        res.json({message: err});
    }
});

// login route after scaning
router.post('/newWork/:ID', async (req, res)=>{
    const entry_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
    const work = new WorkDB({
        EmpID: req.params.ID,
        Date: date.format(now, 'YYYY-MM-DD'),
        Entry: entry_time,
        Exit: "2022-08-07T10:24:03.000+00:00"
    });

    await work.save().
    then(data=>{
        res.json(data);
    }).catch(err=>{
        console.log(err);
    });

    // made that employ Logged = true
    const person = await EmployDB.findById(req.params.ID);
    person.Logged = true;
    await EmployDB.findByIdAndUpdate(req.params.ID,
        {$set: person},
        {new: true}
    );
    // console.log(person.Logged);
});

//logout session after scaning
router.put('/editWork/:ID', async (req, res)=>{
    try{
        var chk = "2022-08-07T10:24:03.000+00:00";
        const newWork = await WorkDB.findOne({EmpID: req.params.ID, Exit: chk});
        if(!newWork){
            return res.status(401).json("Not Found")
        }

        var exit_time = date.format(now, 'YYYY-MM-DD HH:mm:ss');
        var newvalues = { $set: { Exit: exit_time } };

        const updatedWork = await WorkDB.updateOne(newWork, newvalues)
        res.json(updatedWork);
        const person = await EmployDB.findById(req.params.ID);
        person.Logged = false;
        await EmployDB.findByIdAndUpdate(req.params.ID,
            {$set: person},
            {new: true}
        );
    }
    catch(err){
        res.json({message: err});
    }
});



module.exports = router;