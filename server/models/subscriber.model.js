const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const subscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Subscriber = mongoose.model("Subscriber", subscriberSchema);

module.exports = Subscriber;
