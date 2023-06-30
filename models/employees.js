const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GeoSchema =new Schema({
    type:{
        type:String,
        default:"Point"
    },
    coordinates : {
        type:[Number],
        index:'2dsphere'
    }
});

// Create a schema for the user model, which will be used to create and store users in our database:
const EmployeeSchema = new Schema({
    name:{
        type:String,
        required:[true,"Name field is required"]
    },
    rank:{
        type:String,
    },
    available:{
        type: Boolean,
        default:false
    },
    // add in geo location
    geometry:GeoSchema
});

const Employee = mongoose.model('employee' , EmployeeSchema);
module.exports = Employee;