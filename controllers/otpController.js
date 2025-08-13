const nodemailer = require("nodemailer");

// Store OTP temporarily (in-memory)
let storedOtp = null;

const sendOtp = async (req, res) => {
  try {
    // Generate random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);

    // Save OTP for later verification
    storedOtp = otp.toString();

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "darjimittal31@gmail.com",
      subject: "Member Request OTP",
      text: `Your OTP is: ${otp}`,
    });

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

const verifyOtp = (req, res) => {
  const { otp } = req.body;

  if (otp === storedOtp) {
    storedOtp = null; // clear after verification
    res.json({ success: true });
  } else {
    res.json({ success: false, message: "OTP Incorrect" });
  }
};

module.exports = { sendOtp, verifyOtp };
