const express = require('express');
const date = require("date-and-time");
const router = express.Router();
const now = new Date;
const EmployDB = require('../models/employ');
const AdminDB = require('../models/admin');
const WorkDB = require('../models/work');
const ScheduleDB = require('../models/schedule');

// home page on admin side
router.get('/', (req, res)=>{
    res.send("We are on admin side");
});


//get all employs list 
router.get('/allEmploy', async (req, res)=>{
    try {
        const employList = await EmployDB.find({});
        res.json(employList);
    } catch (err) {
        res.json({message: err});
    }
});

//get employ with particular ID
router.get('/Employ/:ID', async (req, res)=>{
    try {
        const employList = await EmployDB.findById({"_id": req.params.ID});
        res.json(employList);
    } catch (err) {
        res.json({message: err});
    }
})

// POST request for new employ
router.post('/newEmploy', async (req, res)=>{
    const employ = new EmployDB({
        Name: req.body.Name,
        Phone: req.body.Phone,
        Email: req.body.Email,
        Address: req.body.Address,
        ChargePH: req.body.ChargePH,
        Designation: req.body.Designation,
        Active:req.body.Active
    });

    await employ.save()
    .then(data =>{
        res.json(data);
    })
    .catch(err =>{
        console.log(err);
    });
});

//PUT request for editing employ details
//with this we can handle active 
router.put('/editEmploy/:ID', async (req, res)=>{
    try{
        const { Name, Phone, Email, Address, ChargePH, Designation, Active} = req.body;

        const newEmploy = {};

        if(Name){
            newEmploy.Name = Name
        }
        if(Phone){
            newEmploy.Phone = Phone
        }
        if(Email){
            newEmploy.Email = Email
        }
        if(Address){
            newEmploy.Address = Address
        }
        if(ChargePH){
            newEmploy.ChargePH = ChargePH
        }
        if(Designation){
            newEmploy.Designation = Designation
        }
        if(Active){
            newEmploy.Active = Active
        }

        const Employ = await EmployDB.findById(req.params.ID);
        if(!Employ){
            return res.status(401).json("Not Found")
        }

        const updatedEmploy = await EmployDB.findByIdAndUpdate(req.params.ID,
            {$set: newEmploy},
            {new: true}
        );
        res.json(updatedEmploy);
    }
    catch(err){
        res.json({message: err});
    }
});

//delete an user
router.delete('/delete/:ID', async (req, res)=>{
    const Employ = await EmployDB.findById(req.params.ID);
    if(!Employ){
        return res.status(401).json("Not Found")
    }
    try{
        EmployDB.findByIdAndDelete({'_id': req.params.ID});
        res.send(Employ);
    } catch(err) {
        res.send({message: err});
    }
});

// scheduling any task for any person
// date.format(now, 'YYYY/MM/DD HH:mm:ss')
router.post('/schedule', async (req, res)=>{
    const schedule = new ScheduleDB({
        EmpID: req.body.EmpID,
        CurrDate: req.body.CurrDate,
        Entry: req.body.Entry,
        Exit: req.body.Exit,
        Description: req.body.Discription
    });

    await schedule.save()
    .then(data =>{
        res.json(data);
    })
    .catch(err =>{
        console.log(err);
    });
});

//editing any schedule with given schedule ID
router.put('/editSchedule/:ID', async (req, res)=>{
    try{
        const {EmpID, CurrDate, Entry, Exit, Description} = req.body;

        const newSchedule = {};

        if(EmpID){
            newSchedule.EmpID = EmpID
        }
        if(CurrDate){
            newSchedule.CurrDate = CurrDate
        }
        if(Entry){
            newSchedule.Entry = Entry
        }
        if(Exit){
            newSchedule.Exit = Exit
        }
        if(Description){
            newSchedule.Description = Description
        }

        const Employ = await ScheduleDB.findById(req.params.ID);
        if(!Employ){
            return res.status(401).json("Not Found")
        }

        const updatedSchedule = await ScheduleDB.findByIdAndUpdate(req.params.ID,
            {$set: newSchedule},
            {new: true}
        );
        res.json(updatedSchedule);
    }
    catch(err){
        res.json({message: err});
    }
});


// get all schedules for a particular date
// date.format(now, 'YYYY/MM/DD HH:mm:ss')
router.get('/dateschedule/:date', async (req, res)=>{
    const date = req.params.date;
    
    try {
        const ScheduleList = await ScheduleDB.find({"CurrDate": date});
        res.json(ScheduleList);
    } catch (err) {
        res.send({message: err});
    }
});

// get future and current schedule for particular ID
// ID of backend user in string format`
router.get('/idPresentSchedule/:ID', async (req, res)=>{
    const id = req.params.ID;
    const threshold = date.format(now, 'YYYY/MM/DD');
    console.log(threshold);
    
    try {
        const ScheduleList = await ScheduleDB.find({EmpID: id, CurrDate: {$gte: threshold}});
        res.json(ScheduleList);
        // console.log(ScheduleList);
    } catch (err) {
        console.log(err);
        res.send({message: err});
    }
});

// to get all the schedules for a paticular ID
router.get('/idAllSchedule/:ID', async (req, res)=>{
    const id = req.params.ID;
    
    try {
        const ScheduleList = await ScheduleDB.find({EmpID: id});
        res.json(ScheduleList);
        // console.log(ScheduleList);
    } catch (err) {
        console.log(err);
        res.send({message: err});
    }
});

// delete a schedule with given ID
router.delete('/deleteSchedule/:ID', async (req, res)=>{
    const id = req.params.ID;

    try {
        const schedule = await ScheduleDB.findById(id);

        if(schedule){
            await ScheduleDB.findByIdAndDelete(id);
            res.send(schedule);
        }
        else return res.status(401).json("Not Found")
    } catch (err) {
        res.json({message: err});
    }
})

module.exports = router;