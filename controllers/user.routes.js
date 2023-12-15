const express = require("express");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userController = express.Router();

userController.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "Fill all the details!" });
  }

  const userExist = await UserModel.findOne({ email });
  if (userExist) {
    return res
      .status(400)
      .json({ message: "User already exist please login!" });
  }

  bcrypt.hash(password, 5, async function (err, hash) {
    if (!err) {
      await UserModel.create({ email, password: hash });
      return res.json({ message: "User signed up successful!" });
    } else {
      return res.status(500).json({ message: "Something went wrong!" });
    }
  });
});

userController.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({ message: "Fill all the details!" });
  }

  const userExist = await UserModel.findOne({ email });
  if (!userExist) {
    return res
      .status(400)
      .json({ message: "User does not exist please signup first!" });
  }

  bcrypt.compare(password, userExist.password, function (err, result) {
    if (result) {
      const token = jwt.sign({ userId: userExist._id }, process.env.JWT_SECRET);
      return res.json({
        message: "User logged in successfully!",
        token: token,
      });
    } else {
      return res.status(400).json({ message: "User credentials are wrong!" });
    }
  });
});

module.exports = { userController };
