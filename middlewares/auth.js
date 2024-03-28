const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(400).json({ message: "Please Login!" });
  }

  const token = req.headers.authorization?.split("Bearer ")[1];
  console.log(token);

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) {
      return res.status(400).json({ message: "Please Login!" });
    } else {
      req.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { auth };
