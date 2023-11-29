const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const promptSchema = new Schema({
  title: { type: String, required: true },
  prompt: { type: String, required: true },
  tags: [{ type: String, required: true }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
});

module.exports = mongoose.model("Prompt", promptSchema);
