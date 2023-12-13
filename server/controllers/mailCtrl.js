const User = require("../models/User");
const bcryptjs = require("bcryptjs");

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(500).json({ error: "Invalid Token!" });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return res.json({
      message: "Email verified successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(500).json({ error: "Invalid Token!" });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password updated successfully!",
      success: true,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ error: "Something went wrong, Please try again later!" });
  }
};

module.exports = { verifyEmail, resetPassword };
