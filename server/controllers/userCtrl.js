const bcryptjs = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const sendConfirmationEmail = async (userEmail, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "5m",
  });

  const confirmationLink = `http://localhost:3000/confirm/${token}`;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Confirm Your Email",
    text: `Click on the following link to confirm your email: ${confirmationLink}`,
  };

  await transporter.sendMail(mailOptions);
  return token;
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({ error: "Error in checking user existence" });
  }

  if (!existingUser) {
    return res.status(400).json({ error: "No user exist with this email" });
  }

  let checkPassword;
  try {
    checkPassword = await bcryptjs.compare(password, existingUser.password);
  } catch (err) {
    return res.status(500).json({ error: "Unable to check password" });
  }

  if (!checkPassword) {
    return res.status(400).json({ error: "Invalid Password" });
  }

  let token;

  try {
    token = jwt.sign(
      { userId: existingUser._id, email: existingUser.email },
      process.env.JWT_SECRET
    );
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Login failed, Please try again later" });
  }

  return res.status(200).json({
    token: token,
    user: {
      userId: existingUser._id,
      name: existingUser.name,
    },
  });
};

const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return res.status(500).json({ error: "Error in checking user existence" });
  }

  if (existingUser) {
    return res.status(400).json({ error: "User exists already, please login" });
  }

  let hashedPassword = await bcryptjs.hash(password, 12);
  let newUser;
  try {
    newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
    });
  } catch (err) {
    return res.status(500).json({ error: "Unable to create user" });
  }

  let data;
  try {
    data = await sendConfirmationEmail(newUser.email, newUser._id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error sending confirmation email" });
  }

  return res.status(200).json({
    token: data,
    user: {
      userId: newUser._id,
      name: newUser.name,
    },
  });
};

const profile = async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Authorization failed" });
  }

  let user;
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);

    user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ error: "No User Found" });
    }
  } catch (err) {
    return res.status(401).json("Invalid Token!");
  }
  return res.json({ user });
};

const getUserDetail = async (req, res) => {
  const { userId } = req.params;
  let user;
  try {
    user = await User.findById({ _id: userId }).select("-password");
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong, Please try again" });
  }
  return res.status(200).json({ user });
};

const confirmation = async (req, res) => {
  const { token } = req.params;
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedToken.userId;

    const response = await User.findByIdAndUpdate(userId, { isVerified: true });

    return res.status(200).json({ success: true, redirectUrl: "/login" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Invalid or Expire token" });
  }
};

module.exports = { login, register, profile, confirmation, getUserDetail };
