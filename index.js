const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");

const {connection} = require("./configs/db")
const {auth} = require("./middlewares/auth")
const {UserModel} = require("./models/User.model")
const {employeeRouter} = require("./routes/employee.routes")

const app = express();
app.use(express.json());
app.use(cors({origin: "*"}));

app.get("/", (req, res)=>{
    res.json("Server data")
})

app.post("/signup", async(req, res)=>{
        const {email,password} = req.body;
        const user_exists = await UserModel.findOne({email});
        if(user_exists){
            return res.json({message:"User already exists, please login!"})
        }

        bcrypt.hash(password, async function(err,hash){
            await UserModel.create({email, password:hash});
            return res.json("User registered Successfully!")
        })
})

app.post("/login", async(req,res)=>{
    const {email, password} = req.body;
    const User = await UserModel.findOne({email});

    if(!User){
        return res.json({message : "Please Register first then login"})
    }
    
    const hashed_password = User?.password;
    bcrypt.compare(password, hashed_password, function(err, result){
        if(result){
            const token = jwt.sign({UserId:user_id}, "Confidential Data");
            return res.json({message : "Login Successful!"})
        }else{
            return res.json({message: "Invalid Credentials"})
        }
    })
})

app.use(auth);
app.use("/employee", employeeRouter);

app.listen(8080, async()=>{
    try {
        await connection;
        console.log("Server running successfully at port 8080 !")
    } catch (error) {
        console.log(error)
    }
})