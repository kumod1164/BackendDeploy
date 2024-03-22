const jwt = require("jsonwebtoken");
require("dotenv").config();

const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send("Please Login again!");
    }

    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send("Please Login");
        } else {
            req.body.userId = decoded.userId;
            next();
        }
    });
};

module.exports = { auth };
