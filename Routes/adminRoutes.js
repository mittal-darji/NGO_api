const express = require("express");
const Admin = require("../Models/Admin.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middleware/auth.js");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();

// Signup Endpoint
router.post("/signup", async (req, res) => {
  const { userName, email, phoneNo, gender, password, confirmPassword } =
    req.body;
  try {
    const newAdmin = new Admin({
      userName,
      email,
      phoneNo,
      gender,
      password,
      confirmPassword,
    });
    await newAdmin.save();

    // Create a token
    const token = jwt.sign(
      {
        admin: { id: newAdmin._id, email, phoneNo },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({ message: "Admin registered successfully", token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email }).select("+password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      {
        admin: {
          id: admin._id,
          email: admin.email,
          phoneNo: admin.phoneNo,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
