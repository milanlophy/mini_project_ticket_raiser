const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        priority: String,
        status: String,
        user: String
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Ticket", ticketSchema);