const mongoose = require("mongoose");

const userSchema  = mongoose.Schema({
    name: String,
    password: String
})

const userModel = mongoose.model("user", userSchema);

const connection = mongoose.connect("mongodb+srv://kumodsharma1164:mongodb007@cluster0.i8j9kia.mongodb.net/users")

module.export= {connection, userModel};