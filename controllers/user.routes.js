const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = express.Router();

userController.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists. Please login!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create({ email, password: hashedPassword });
    return res.json({ message: "Signed up successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const userExist = await UserModel.findOne({ email });
    if (!userExist) {
      return res.status(400).json({ message: "User does not exist. Please signup!" });
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET);
    return res.json({
      message: "Logged in successfully!",
      token,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Something went wrong!" });
  }
});

module.exports = { userController };
