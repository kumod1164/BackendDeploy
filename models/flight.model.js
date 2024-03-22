const mongoose = require("mongoose");

const flightSchema  = new mongoose.Schema({        
        airline: {type:String},
        flightNo:{type:String},
        departure:{type:String},
        arrival: {type:String},
        departureTime: {type:String},
        arrivalTime: {type:String},
        seats: {type:String},
        price:{type:String}
      
})

const FlightModel = mongoose.model("flight", flightSchema)

module.exports={
    FlightModel
}