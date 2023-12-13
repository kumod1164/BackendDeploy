const jwt = require("jsonwebtoken");

const auth = (req, res, next)=>{
    const token = req.headers.authorization.split("")[1];

    if(!token){
        return res.json({message: "User already exists, Please Login"})
    }
    jwt.verify(token, "Confidential Data",function (err, decoded){
        if(err){
            return res.json({message: "Invalid Token"})
        }

        const userId = decoded.userId;
        req.userId = userId;
        next();
    })
}

module.exports = {auth};