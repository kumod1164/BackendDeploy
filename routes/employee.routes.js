const express = require("express");
const {EmployeeModel, employeeModel} = require("../models/Employee.model");
const {UserModel} = require("../models/User.model");

const employeeRouter = express.Router();


// CRUD Methods

employeeRouter.get("/",async(req, res)=>{
    const employee = await employeeModel.find({});
    res.send({employee:employee})
})


employeeRouter.post("/create", async(req, res)=>{
    const {first_name, Last_name,salary,date} = req.body;
    const user_id = req.user_id;

    const user = await UserModel.findOne({id:user_id})
    const email = user.email;

    const empData = await employeeModel.create({first_name, Last_name,salary,date,email})

    res.send({empData:empData})
})


employeeRouter.patch("/edit/:employeeID", async(req, res)=>{
    const employeeID = req.params.employeeID;
   const user = await UserModel.findOne({_id:employeeID})
   const userEmail = user.email;

   const payload = req.body;
   await employeeModel.findOneAndUpdate({_id:employeeID},payload)
   res.send({message: `employeeID ${employeeID} is updated`})
})

employeeRouter.delete("/delete/:employeeID" , async(req, res)=>{

    const employeeID = req.params.employeeID;

    const user = await UserModel.findOne({_id:employeeID})
    const userEmail = user.email;

    await EmployeeModel.findOneAndDelete({
        _id:blogID, email:userEmail
    })
    res.send({message: `employeeID ${employeeID} is deleted`})
})

module.exports = {employeeRouter};