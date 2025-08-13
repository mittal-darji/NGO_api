const mongoose = require("mongoose");

// Define the schema
const userSchema = new mongoose.Schema({
  userImage: {
    type: String,
    required: true,
  },
  cardType: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  userName: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
    unique: true,
  },
});

// Create a model from the schema
const User = mongoose.model("User ", userSchema);

// Export the model
module.exports = User;
