const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

//  listing
router.get("/", async (req, res) => {
  try {
    const usersList = await User.find().lean().exec();

    return res.status(200).send({
      data: usersList,
      message: "Users Listing fetched",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { email, phone } = req.body;

    // Check for existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).send({ message: "Email already exists." });
    }

    // Check for existing phone (if provided)
    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        return res
          .status(400)
          .send({ message: "Phone number already exists." });
      }
    }

    const savedUser = await User.create(req.body);

    return res.status(201).send({
      data: savedUser,
      message: "User created successfully!",
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

// Get By Id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).lean().exec();
    if (user) {
      return res.status(200).send({
        data: user,
      });
    } else {
      return res.status(404).send({ message: "User Not Found !" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

// Uppdate
router.put("/:id", async (req, res) => {
  try {
    const existingUser = await User.findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!existingUser) {
      return res.status(404).send({ message: "User not found" });
    }
    // Prevent email update if it is the same as before
    if (req.body.email && req.body.email !== existingUser.email) {
      const emailExists = await User.findOne({ email: req.body.email })
        .lean()
        .exec();
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use" });
      }
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true }
    )
      .lean()
      .exec();

    if (updatedUser) {
      return res
        .status(200)
        .send({ data: updatedUser, message: "User Updated Successfully" });
    } else {
      return res.status(404).json({ message: "User Not Found ! " });
    }
  } catch (error) {
    return res.status(500).send({ messeage: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const existingUser = await User.findOneAndDelete({ _id: req.params.id })
      .lean()
      .exec();

    if (existingUser) {
      return res.status(200).send({ mesasge: "User deleted successfully !" });
    } else {
      return res.status(404).send({ messeage: "User not found !" });
    }
  } catch (error) {
    return res.status(500).send({ messeage: error.message });
  }
});

module.exports = router;
