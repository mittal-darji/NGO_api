// models/Membership.js
const mongoose = require("mongoose");

const MembershipSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: [true, "Gender is required"],
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
      required: [true, "Blood group is required"],
    },
    address: {
      type: String,
      trim: true,
    },
    contact: {
      type: String,
      required: [true, "Contact number is required"],
      match: [/^\d{10}$/, "Please enter a valid 10-digit contact number"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please enter a valid email address",
      ],
    },
    registrationNumber: {
      type: String,
      trim: true,
    },
    membershipType: {
      type: String,
      trim: true,
    },
    cardType: {
      type: String,
      required: [true, "Card type is required"],
      trim: true,
    },
    profileImage: {
      type: String, // store image URL or Base64 string
    },
    language: {
      type: String,
      enum: ["english", "hindi"],
      default: "english",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

module.exports = mongoose.model("Membership", MembershipSchema);
