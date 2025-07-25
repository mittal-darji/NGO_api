const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./Config/db.js");
const cors = require("cors");
require("dotenv").config();

const contactUsRoutes = require("./Routes/contactUsRoutes.js");

const app = express();
const PORT = process.env.PORT || 5003;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

app.use("/api/contactus", contactUsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
