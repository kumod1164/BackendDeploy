const jwt = require("jsonwebtoken");
require("dotenv").config();

const authentication = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: "Please login first" });
  }

  const token = req.headers.authorization?.split("Bearer ")[1];
  console.log(token);

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(400).json({ message: "Please login first" });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { authentication };
