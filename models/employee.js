const mongoose = require('mongoose'); 
const { StringDecoder } = require('string_decoder');

// schema Defnition
const Schema = mongoose.Schema;


const employeelist = new Schema({
    name:String,
    location:String,
    position:String,
    salary:Number
   
})


const employeeData = mongoose.model('employee',employeelist)

// export

module.exports = employeeData