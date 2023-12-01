const express = require("express");
const router = express.Router();
const { chatGPTResponse, chatDallResponse } = require("../controllers/chatController");

router.post("/chatgpt", chatGPTResponse);
router.post("/dall-e", chatDallResponse)

module.exports = router;
