const Prompts = require("../models/Prompts");
const User = require("../models/User");

const getAllPromptsByCategory = async (req, res, next) => {
  const { categoryId } = req.params;

  let prompts;
  try {
    prompts = await Prompts.find({ categoryId })
      .populate("userId", "_id name isVerified")
      .populate("categoryId", "category");
  } catch (err) {
    console.log(err);
    return res.status(400).json("Unable to fetch the prompts");
  }

  

  const completePrompts = prompts.map((data) => {
    return {
      promptId: data._id,
      title: data.title,
      prompt: data.prompt,
      tags: data.tags,
      user: data.userId._id,
      name: data.userId.name,
      isVerified: data.userId.isVerified,
      category: data.categoryId.category,
    };
  });

  return res.status(200).json({ completePrompts });
};


const addPrompts = async (req, res, next) => {
  const { title, prompt, tags, userId, category } = req.body;
  const tagsArray = Array.isArray(tags) ? tags : [tags];

  let newPrompt;
  try {
    newPrompt = await Prompts.create({
      title,
      userId,
      categoryId: category,
      prompt,
      tags: tagsArray,
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Unable to create Prompt, Please try again" });
  }

  return res.status(201).json({ newPrompt });
};

const getPromptDetail = async (req, res, next) => {
  const { promptId } = req.params;
  let promptData;
  try {
    promptData = await Prompts.findById({ _id: promptId }).populate(
      "userId",
      "_id name isVerified"
    );
  } catch (err) {
    return res
      .status(401)
      .json({ error: "Something went wrong,Please try again" });
  }

  return res.status(200).json({ promptData });
};

module.exports = {
  getAllPromptsByCategory,
  addPrompts,
  getPromptDetail,
};
