const express = require("express");
const cors = require("cors");
const { connection } = require("./configs/db");
const { userController } = require("./controllers/user.routes");
const { auth } = require("./middlewares/auth");
const { employeeController } = require("./controllers/employee.routes");

const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "server is running" });
});

app.use("/user", userController);

app.use(auth);

app.use("/employee", employeeController);

  app.listen(PORT, async () => {
    try {
      await connection;
      console.log("Connected to mongo!");
    } catch (error) {
      console.log("Error while connection to mongo");
      console.log(error);
    }
    console.log("Server is running!");
  });