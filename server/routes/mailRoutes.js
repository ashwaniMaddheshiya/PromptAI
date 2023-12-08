const express = require("express");
const { verifyEmail } = require("../controllers/mailCtrl");
const router = express.Router();

router.post("/email", verifyEmail);

module.exports = router;
