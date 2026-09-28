const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const ticketRoutes = require("./routes/ticketRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/", ticketRoutes);

mongoose.connect("mongodb://127.0.0.1:27017/supportTickets")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.log(error);
    });

app.get("/", (req, res) => {
    res.send("Support Ticket Server is running");
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});