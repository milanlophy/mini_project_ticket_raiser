const express = require("express");
const Ticket = require("../models/Ticket");
const User = require("../models/User");

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
    try {

        const existingUser = await User.findOne({
            username: req.body.username
        });

        if (existingUser) {
            return res.status(400).json({
                message: "Username already exists"
            });
        }

        const user = new User({
            username: req.body.username,
            password: req.body.password,
            role: "user"
        });

        await user.save();

        res.json({
            message: "Signup successful"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// Login
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.body.username,
            password: req.body.password
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid username or password"
            });
        }

        res.json({
            username: user.username,
            role: user.role
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});
// Create a ticket
router.post("/tickets", async (req, res) => {
    try {
        const ticket = new Ticket(req.body);

        await ticket.save();

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all tickets
router.get("/tickets", async (req, res) => {
    try {
        const tickets = await Ticket.find();

        res.json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a ticket
router.delete("/tickets/:id", async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);

        res.json({ message: "Ticket deleted" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a ticket
router.put("/tickets/:id", async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;