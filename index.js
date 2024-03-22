const express = require("express")
const {userController} = require("./routes/user.routes")
const {flightController} = require("./routes/flights.routes")

const {connection} = require("./configs/db");
const { auth } = require("./middlewares/auth");

const app = express();


const PORT = 8080;
app.use(express.json());

app.get("/", (req,res)=>{
    res. send("Dashboard")
})

app.use("/user", userController);
app.use(auth)


app.use("/flight",flightController)

app.listen(PORT,async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Listening on PORT ${PORT}`)
})