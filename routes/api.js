const express = require("express");
const Employee = require("../models/employees");
const router = express.Router();

// get alist from our db
router.get("/employee" , (req,res ,next)=>{
    // Ninja.find({}).then((ninja)=>{
    //     res.send(ninja);
    // })
    Employee.aggregate([{
        $geoNear:{
            near:{
                type:'Point' , 
                coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
            },
            //distanceField: "dist.calculated",
             distanceField:"distance",
            maxDistance: 100000, 
            spherical: true
        }
    }]).then((employee) => {
        res.send(employee);
    })
    // Employee.find({}).then((employee)=>{
    //     res.send(employee)
    // })

});

// add a new ninja to db
router.post("/employee", (req, res,next) => {
    Employee.create(req.body).then((employee)=>{
        res.send(employee);
    }).catch(next);    
});

//update a ninja in dp
router.put("/employee/:id", (req, res ,next) => {
    Employee.findByIdAndUpdate({_id:req.params.id} , req.body).then(()=>{
        Employee.findOne({ _id: req.params.id }).then((employee)=>{
            res.send(employee);
        })
    });
});

//delete a ninja from db
router.delete("/employee/:id", (req, res ,next) => {
    Employee.findByIdAndRemove({ _id: req.params.id }).then((employee)=>{
        res.send(employee);
    })
});


module.exports = router;