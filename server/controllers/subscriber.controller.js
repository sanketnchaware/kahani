const express = require("express");
const router = express.Router();

const Subscriber = require("../models/subscriber.model");

router.get("/", async (req, res) => {
  const subcribers = await Subscriber.find().lean().exec();
  try {
    if (subcribers?.length > 0) {
      return res
        .status(200)
        .send({ message: "Subcribers Listing", data: subcribers });
    } else {
      return res.status(404).send({ message: "No data found !", data: [] });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  const isPresent = await Subscriber.findOne({ email: email }).lean().exec();
  console.log("isPresent:", isPresent);

  try {
    if (!isPresent) {
      const data = await Subscriber.create({ email: email });
      res.status(200).send({ message: "Email Subscribed !", data: data });
    } else {
      return res.status(404).send({ message: "Email already Subscribed !" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

module.exports = router;
