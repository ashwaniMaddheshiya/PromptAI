const express = require("express");
const router = express.Router();
const { addCategory, getAllCategory,getCategory } = require("../controllers/categoryCtrl");

router.post("/new", addCategory);
router.get("/all", getAllCategory);
router.get('/:categoryId', getCategory)

module.exports = router;
