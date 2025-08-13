// routes/donationRoutes.js
const express = require("express");
const axios = require("axios");
const Donation = require("../Models/Donation.js");
const router = express.Router();

// Create a new donation
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message, amount, status } = req.body;

    // Create new donation document
    const newDonation = new Donation({
      name,
      email,
      phone,
      message,
      amount,
      status,
    });

    // Save to DB
    const savedDonation = await newDonation.save();
    res.status(201).json({
      success: true,
      message: "Donation created successfully",
      data: savedDonation,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating donation",
      error: error.message,
    });
  }
});

// Get all donations admindashboard
router.get("/", async (req, res) => {
  try {
    const donations = await Donation.find(); // Fetch all donations from the database
    res.status(200).json(donations); // Return the donations as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch a single donation by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log("Received ID:", id);
  try {
    // Find the donation by ID
    const donation = await Donation.findById(id);

    if (!donation) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json(donation); // Return the donation as JSON
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a donation by ID
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the donation by ID and delete it
    const result = await Donation.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({ message: "Donation not found" });
    }

    res.status(200).json({ message: "Donation deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
