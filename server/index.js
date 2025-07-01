const express = require("express");
const passport = require("./configs/google-oauth");
const Storycontroller = require("./controllers/story.controller");
const UserController = require("./controllers/user.controller");
const AuthController = require("./controllers/auth.controller");
const CategoryController = require("./controllers/category.controller");
const SubscribeController = require("./controllers/subscriber.controller");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const connect = require("./configs/db");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;
const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";
const fronted_url = process.env.FRONTEND_URL;
// Middleware setup
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

// Basic route for testing
app.get("/", (req, res) => {
  return res.json({ message: "Hello, world!" });
});

app.use("/stories", Storycontroller);
app.use("/users", UserController);
app.use("/auth", AuthController);
app.use("/categories", CategoryController);
app.use("/subcribe", SubscribeController);

app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${fronted_url}/login`,
    session: false,
  }),
  function (req, res) {
    const user = req.user;

    const token = jwt.sign(
      {
        userId: user?._id,
        email: user?.email,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.redirect(
      `${fronted_url}/auth-success?token=${token}&user=${encodeURIComponent(
        JSON.stringify(user)
      )}`
    );
  }
);

// Catch-all for undefined routes (should be at the end of your route definitions)
app.all("*", (req, res) => {
  return res.status(404).send({ message: "Route not found" });
});

// Connect to the database and start the server
app.listen(port, async () => {
  console.log("Listening on port " + port);
  try {
    await connect(); // Ensure this connects to your database
    console.log("DB connection established!");
  } catch (err) {
    console.log("DB connection failed", err.message);
  }
});
