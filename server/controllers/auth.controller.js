const User = require("../modals/user.model");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req?.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({ message: "Invalid Email or Password !" });
    }

    const isMatch = await bcrypt.compare(password, user?.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Invalid Email or Password !" });
    }

    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).send({
      user: {
        id: user?._id,
        firstname: user?.firstname,
        lastname: user?.lastname,
        phone: user?.phone,
        email: user?.email,
      },
      token,
      message: "Logged in successfully!",
    });
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
});

router.post("/logout", (req, res) => {
  return res.status(200).send({ message: "Logged out successfully" });
});

module.exports = router;
