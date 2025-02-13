const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
