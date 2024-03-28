const express = require("express");
const { EmployeeModel } = require("../models/employee.model");
const employeeController = express.Router();

employeeController.get("/", async (req, res) => {
  //pagination
  const page = parseInt(req.query.page) || 1;
  const page_size = parseInt(req.query.page_size) || 10;

  let query = {};

  // Filtering 
  if (req.query.department) {
    query.department = req.query.department;
  }

  // Sorting 
  const sortOptions = {};
  if (req.query.sort) {
    sortOptions[req.query.sort] = req.query.order === "desc" ? -1 : 1;
  }

  // Searching 
  if (req.query.firstName) {
    query.firstName = { $regex: new RegExp(req.query.firstName, "i") };
  }

  const totalItems = await EmployeeModel.countDocuments(query);
  const totalPages = Math.ceil(totalItems / page_size);

  const data = await EmployeeModel.find(query)
    .sort(sortOptions)
    .skip((page - 1) * page_size)
    .limit(page_size);

  res.json({
    data,
    page,
    totalPages,
    totalItems,
  });
});

employeeController.post("/add", async (req, res) => {
  const dataAdded = await EmployeeModel.create(req.body);

  if (dataAdded) {
    res.json({ message: "Employee Added" });
  } else {
    res.status(400).json({ message: "Something went wrong" });
  }
});

employeeController.patch("/update/:id", async (req, res) => {
  const id = req.params.id;

  const dataAdded = await EmployeeModel.findOneAndUpdate({ _id: id }, req.body);

  res.json({ message: "Employee Data Updated" });
});
employeeController.delete("/remove/:id", async (req, res) => {
  const id = req.params.id;

  const dataAdded = await EmployeeModel.findOneAndDelete({ _id: id });

  res.json({ message: "Employee Data Deleted" });
});

module.exports = { employeeController };
