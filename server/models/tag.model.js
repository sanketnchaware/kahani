const mongoose = require("mongoose");

const TagSchema = new Schema(
  { name: { type: String, required: true } },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Tag = mongoose.model("Tag", TagSchema);

module.exports = Tag;
