const express = require("express");
const Ninja = require("../models/ninja");
const router = express.Router();

// get alist from our db
router.get("/ninjas" , (req,res ,next)=>{
    // Ninja.find({}).then((ninja)=>{
    //     res.send(ninja);
    // })
    Ninja.aggregate([{
        $geoNear:{
            near:{
                type:'Point' , 
                coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
            },
            distanceField:"distance",
            maxDistance: 100000, 
            spherical: true
        }
    }]).then((ninja) => {
        res.send(ninja);
    });

    //DECAPRICIATED 
    // Ninja.geoNear(
    //     {type:"Point" , coordinates:[parseFloat(req.query.lng) , parseFloat(req.query.lat)]},
    //     {maxDistance:100000 , spherical:true}
    // ).then((ninja)=>{
    //     res.send(ninja);
    // });
});

// add a new ninja to db
router.post("/ninjas", (req, res,next) => {
    Ninja.create(req.body).then((ninja)=>{
        res.send(ninja);
    }).catch(next);    
});

//update a ninja in dp
router.put("/ninjas/:id", (req, res ,next) => {
    Ninja.findByIdAndUpdate({_id:req.params.id} , req.body).then(()=>{
        Ninja.findOne({_id:req.params.id}).then((ninja)=>{
            res.send(ninja);
        })
    });
});

//delete a ninja from db
router.delete("/ninjas/:id", (req, res ,next) => {
    Ninja.findByIdAndRemove({_id:req.params.id}).then((ninja)=>{
        res.send(ninja);
    })
});


module.exports = router;