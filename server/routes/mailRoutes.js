const express = require("express");
const { verifyEmail, resetPassword } = require("../controllers/mailCtrl");
const router = express.Router();

router.post("/email", verifyEmail);
router.post("/password", resetPassword)

module.exports = router;
