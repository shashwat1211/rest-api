const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();
//set up express app
const app = express();
mongoose.connect(process.env.MONG_URI);
//mongodb://127.0.0.1/helper
mongoose.Promise = global.Promise;

app.use(express.static("public"));

app.use(bodyParser.json());

//initializing routes
app.use("/api", require("./routes/api"));


//error handling middleware
app.use((err ,req,res,next)=>{
    //console.log(err);
    res.status(422).send({error:err.message});
})


// app.get("/" , (req , res)=>{
//     res.send({name:"Shashwat"})
//     console.log("get request")

// });






 







//listen for request
app.listen(process.env.port || 3000 , ()=>{
    console.log("Server running");
}); 