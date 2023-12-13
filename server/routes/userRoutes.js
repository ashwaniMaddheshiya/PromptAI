const express = require("express");
const router = express.Router();
const {
  login,
  profile,
  register,
  confirmation,
  getUserDetail,
  checkEmail,
} = require("../controllers/userCtrl");

router.post("/login", login);
router.post("/register", register);
router.get("/profile/:userId", profile);
router.post("/checkEmail", checkEmail);
router.get("/confirm/:token", confirmation);
router.get("/:userId", getUserDetail);

module.exports = router;
