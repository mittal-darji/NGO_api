const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the Admin schema
const adminSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    minlength: 2,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/,
  },
  phoneNo: {
    type: String,
    required: true,
    unique: true,
    match: /^\d{10}$/,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: function (v) {
        return /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(v);
      },
      message: (props) =>
        `${props.value} must contain uppercase, lowercase, and a number!`,
    },
  },
  confirmPassword: {
    type: String,
    required: true,
  },
});

// Use adminSchema instead of userSchema
adminSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Format birthdate to YYYY-MM-DD if it's a valid date
  // Note: You may want to remove this if you don't have a birthdate field
  if (this.birthdate instanceof Date && !isNaN(this.birthdate)) {
    this.birthdate = this.birthdate.toISOString().slice(0, 10); // Convert to YYYY-MM-DD
  }
  next();
});

// Create a method to compare passwords
adminSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Create a User model
const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
