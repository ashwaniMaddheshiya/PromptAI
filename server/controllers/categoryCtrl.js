const Category = require("../models/Category");

const addCategory = async (req, res) => {
  const { category } = req.body;
  try {
    const newCategory = await Category.create({
      category,
    });

    return res.status(201).json({ newCategory });
  } catch (err) {
    return res.status(500).json({ error: "Something went wrong" });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find();
    return res.status(200).json({ category });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Something went wrong, Please try again" });
  }
};

const getCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const response = await Category.findById({ _id: categoryId });
    return res.status(200).json({ response });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Unable to fetch category, Please try again" });
  }
};

module.exports = { addCategory, getAllCategory, getCategory };
