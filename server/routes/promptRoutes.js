const express = require("express");
const router = express.Router();
const {
  getAllPromptsByCategory,
  addPrompts,
  getPromptDetail,
} = require("../controllers/promptCtrl");

router.get("/all/:categoryId", getAllPromptsByCategory);
router.post("/new", addPrompts);
router.get("/:promptId", getPromptDetail);

module.exports = router;
