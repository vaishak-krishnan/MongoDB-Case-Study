// Task1: initiate app and run server at 3000
const express = require('express')
const app =  express()
const mongoose = require('mongoose')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const path=require('path');
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));

const employeeData = require('./models/employee') //importing model from model directory




// Task2: create mongoDB connection 
mongoose.connect('mongodb+srv://vaishakkrishnan:11Knights@fsdmain.4y3vqzk.mongodb.net/CaseStudy02?retryWrites=true&w=majority')
.then(()=>{
    console.log("My MongoDB is connected succesfully!!!")
})
.catch(error=>{
    console.log('Connection Error '+ error)
})
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below







//TODO: get data from db  using api '/api/employeelist'
app.get("/api/employeelist",(req,res)=>{
    employeeData.find().then(function(data){
        res.send(data) // Sending data to MongoDB database
    })
})




//TODO: get single data from db  using api '/api/employeelist/:id'
app.get("/api/employeelist/:id",(req,res)=>{
    employeeData.findOne({"_id":req.params.id}).then(function(data){
        res.send(data)
    })
})


//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
app.post('/api/employeelist', async(req,res)=>{
    try {
 
         let item = req.body
         const user = new employeeData(item) //comparing the incoming data with our model
         const savedUser = await user.save() //save data to db
         res.send()
         console.log(savedUser)
 
    } catch (error) {
 
        console.log(`delete error occured ${e}`);
     
    }
 })





//TODO: delete a employee data from db by using api '/api/employeelist/:id'
app.delete("/api/employeelist/:id", async (req, res) => {
    try {
        const data = await employeeData.deleteOne({ "_id": req.params.id })
        res.send(data);
    }
    catch (e) {
        console.log(`delete error occured ${e}`);
    }
})





//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.put('/api/employeelist', async (req, res) => {

    try {
        const data = await employeeData.findByIdAndUpdate(
            {
                "_id": req.body._id,
            },
            {
                $set: {
                    "name": req.body.name,
                    "location": req.body.location,
                    "position": req.body.position,
                    "salary": req.body.salary
                }
            }
        );

        res.send(data);


    }
    catch (e) {
        console.log(`update error occured ${e}`);
    }

})

//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});



// Server

const PORT = process.env.PORT || 3000


app.listen(3000,()=>{
    console.log(`server is connected in port ${PORT}!`)
})