const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./Config/db.js");
const cors = require("cors");
require("dotenv").config();

const contactUsRoutes = require("./Routes/contactUsRoutes.js");
const otpRoutes = require("./Routes/otpRoutes.js");
const paymentRoutes = require("./Routes/paymentRoutes.js");
const membershipRoutes = require("./Routes/membershipRoutes.js");
const adminRoutes = require("./Routes/adminRoutes.js");

const app = express();
const PORT = process.env.PORT || 5003;

app.use(bodyParser.json());

// ✅ Combine allowed origins
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/contactus", contactUsRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/otp", otpRoutes);
app.use("/api/membership", membershipRoutes);
app.use("/api/admin", adminRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
