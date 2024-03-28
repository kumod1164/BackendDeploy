const mongoose = require("mongoose");
require("dotenv").config();

const employeeSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  department: {
    type: String,
    required: true,
    enum: ["Tech", "Marketing", "Operations"],
  },
  salary: { type: Number, required: true },
});

const EmployeeModel = mongoose.model("employee", employeeSchema);

module.exports = { EmployeeModel };
