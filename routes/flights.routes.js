const { Router } = require("express");
const { FlightModel } = require("../models/flight.model");
const { BookingModel } = require("../models/booking.model");
const {userModel} = require("../models/user.model")
const {auth} = require("../middlewares/auth")

const flightController = Router();

// GET all flights
flightController.get("/api/flights", async (req, res) => {
    try {
        const flights = await FlightModel.find();
        res.status(200).json(flights);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// GET a specific flight by ID
flightController.get("/api/flights/:id", async (req, res) => {
    try {
        const flight = await FlightModel.findById(req.params.id);
        if (!flight) {
            return res.status(404).send("Flight not found");
        }
        res.status(200).json(flight);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// POST a new flight
flightController.post("/api/flights", auth, async (req, res) => {
    try {
         const { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body;

        const newFlight = new FlightModel({
            airline,
            flightNo,
            departure,
            arrival,
            departureTime,
            arrivalTime,
            seats,
            price
        });

        await newFlight.save();

        res.status(201).send("Flight added successfully");

    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// PUT/PATCH update a flight by ID
flightController.put("/api/flights/:id", auth, async (req, res) => {
    try {
        const { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body;

        const flight = await FlightModel.findById(req.params.id);

        // Check if the flight exists
        if (!flight) {
            return res.status(404).send("Flight not found");
        }

        flight.airline = airline;
        flight.flightNo = flightNo;
        flight.departure = departure;
        flight.arrival = arrival;
        flight.departureTime = departureTime;
        flight.arrivalTime = arrivalTime;
        flight.seats = seats;
        flight.price = price;

        await flight.save();
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// DELETE a flight by Id
flightController.delete("/api/flights/:id", auth, async (req, res) => {
    try {
        const deletedFlight = await FlightModel.findByIdAndDelete(req.params.id);

        if (!deletedFlight) {
            return res.status(404).send("Flight not found");
        }

        res.status(202).send("Flight deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// POST book a flight
flightController.post("/api/booking", auth, async (req, res) => {
    try {
        const { userId, flightId } = req.body;

        const newBooking = new BookingModel({
            user: userId,
            flight: flightId
        });

        await newBooking.save();

        res.status(201).send("Flight booked successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


// GET all bookings with user and flight details
flightController.get("/api/dashboard", auth, async (req, res) => {
    try {
        const bookings = await BookingModel.find().populate('user').populate('flight');

        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// PUT/PATCH update a booking by ID
flightController.put("/api/dashboard/:id", auth, async (req, res) => {
    try {
        const { userId, flightId } = req.body;

        const updatedBooking = await BookingModel.findByIdAndUpdate(req.params.id, {
            user: userId,
            flight: flightId
        }, { new: true });

        if (!updatedBooking) {
            return res.status(404).send("Booking not found");
        }
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});

// DELETE a booking by ID
flightController.delete("/api/dashboard/:id", auth, async (req, res) => {
    try {
        const deletedBooking = await BookingModel.findByIdAndDelete(req.params.id);

        if (!deletedBooking) {
            return res.status(404).send("Booking not found");
        }

        res.status(202).send("Booking deleted successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
});


module.exports = {
    flightController
};
