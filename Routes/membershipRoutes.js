// routes/membership.routes.js
const express = require("express");
const router = express.Router();
const Membership = require("../Models/MembershipForm");

// 📌 POST: Create new member
router.post("/", async (req, res) => {
  try {
    const member = await Membership.create(req.body);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 📌 GET: Get all members
// router.get("/", async (req, res) => {
//   try {
//     const members = await Membership.find().sort({ createdAt: -1 });
//     res.json({ success: true, data: members });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// });
router.get("/green", async (req, res) => {
  try {
    // Query the database for members with cardType 'green'
    const members = await Membership.find({
      cardType: "green",
    }).sort({ createdAt: -1 });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/yellow", async (req, res) => {
  try {
    // Query the database for members with cardType 'yellow'
    const members = await Membership.find({
      cardType: "yellow",
    }).sort({ createdAt: -1 });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get("/orange", async (req, res) => {
  try {
    // Query the database for members with cardType 'orange'
    const members = await Membership.find({
      cardType: "orange",
    }).sort({ createdAt: -1 });
    res.json({ success: true, data: members });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 📌 GET: Get single member by ID
router.get("/:id", async (req, res) => {
  try {
    const member = await Membership.findById(req.params.id);
    if (!member)
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    res.json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 📌 DELETE: Delete member by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedMember = await Membership.findByIdAndDelete(req.params.id);
    if (!deletedMember)
      return res
        .status(404)
        .json({ success: false, message: "Member not found" });
    res.json({ success: true, message: "Member deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
