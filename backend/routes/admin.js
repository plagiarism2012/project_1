const express = require('express');
const router = express.Router();
const EmployDB = require('../models/employ');
const AdminDB = require('../models/admin');
const WorkDB = require('../models/work');

router.get('/', (req, res)=>{
    res.send("We are on admin side");
})

router.get('/allEmploy', async (req, res)=>{
    try {
        const employList = await EmployDB.find({});
        res.json(employList);
    } catch (err) {
        res.json({message: err});
    }
});

router.get('/Employ/:ID', async (req, res)=>{
    try {
        const employList = await EmployDB.findById({"_id": req.params.ID});
        res.json(employList);
    } catch (err) {
        res.json({message: err});
    }
})

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
            newEmploy.Phone = Email
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
})

module.exports = router;