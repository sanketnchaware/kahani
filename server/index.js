const express = require("express");
const Storycontroller = require("./controllers/story.controller");
const UserController = require("./controllers/user.controller");
const AuthController = require("./controllers/auth.controller");
const CategoryController = require("./controllers/category.controller");

const cors = require("cors");
const connect = require("./configs/db");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3333;

// Middleware setup
app.use(express.json());

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// Basic route for testing
app.get("/", (req, res) => {
  return res.json({ message: "Hello, world!" });
});

app.use("/stories", Storycontroller);
app.use("/users", UserController);
app.use("/auth", AuthController);
app.use("/categories", CategoryController);

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
