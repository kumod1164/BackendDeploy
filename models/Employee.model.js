const mongoose = require("mongoose");

const employeeSchema = mongoose.schema({
    first_name: String,
    Last_name:String,
    email:{type:String, required: true},
    salary:String,
    date: String
})

const employeeModel= mongoose.model("employee", employeeSchema)

module.exports = {employeeModel};