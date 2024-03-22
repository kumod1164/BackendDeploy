const {Router} = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const {UserModel} = require("../models/user.model")

const userController = Router();

userController.post("/api/register", (req, res)=>{
    const {name, email, password} = req.body;
   
    bcrypt.hash(password, 5, async function(err, hash){
       if(err){
        res.send("Oops! Something went wrong")
       }

       const user  = new UserModel({
       name,
       email,
       password:hash
       })
       await user.save();
       res.status(201).send('User registered successfully');
    })    
})

userController.post("/api/login", async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).send("Invalid Credentials: User not found");
        }

        const hash = user.password;

        bcrypt.compare(password, hash, function (err , result) {
            if (err) {
                console.error(err);
                return res.status(500).send("Oops! Something went wrong");
            }
            
            if (result) {
                const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
                return res.status(200).json({ message: 'Login successful'},token);
            } else {
                return res.status(400).send("Invalid Credentials: Incorrect password");
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Oops! Something went wrong");
    }
});

module.exports={
    userController
}