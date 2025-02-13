const mongoose = require("mongoose");
const { Schema } = require("mongoose");

mongoose.set("strictQuery", false);

const storySchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

const Story = mongoose.model("Story", storySchema);

module.exports = Story;
