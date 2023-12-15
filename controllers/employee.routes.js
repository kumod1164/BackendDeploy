const express = require("express");
const { EmployeeModel } = require("../models/employee.model");
const employeeController = express.Router();

employeeController.get("/", async (req, res) => {
  //pagination logic
  const page = parseInt(req.query.page) || 1;
  const page_size = parseInt(req.query.page_size) || 10;

  let query = {};

  // Filtering option
  if (req.query.department) {
    query.department = req.query.department;
  }

  // Sorting logic
  const sortOptions = {};
  if (req.query.sort) {
    sortOptions[req.query.sort] = req.query.order === "desc" ? -1 : 1;
  }

  // Searching logic
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
    res.json({ message: "Data has been added" });
  } else {
    res.status(400).json({ message: "something went wrong" });
  }
});

employeeController.patch("/update/:id", async (req, res) => {
  const id = req.params.id;

  const dataAdded = await EmployeeModel.findOneAndUpdate({ _id: id }, req.body);

  res.json({ message: "Data has been updated successfully" });
});
employeeController.delete("/remove/:id", async (req, res) => {
  const id = req.params.id;

  const dataAdded = await EmployeeModel.findOneAndDelete({ _id: id });

  res.json({ message: "Data has been deleted successfully" });
});

module.exports = { employeeController };
