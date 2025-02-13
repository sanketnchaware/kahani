const express = require("express");
const Story = require("../modals/story.model.js");
const router = express.Router();

// GET: List all stories
router.get("/", async (req, res) => {
  try {
    const stories = await Story.find()
      .populate("user")
      .populate("category")
      .lean()
      .exec();
    return res.status(200).send({ stories: stories, message: "Stories List" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .send({ message: "An error occurred while fetching stories" });
  }
});

// POST: Create a new story
router.post("/", async (req, res) => {
  try {
    const { title, tags, description, user, category } = req.body;

    // Create a new story document
    const newStory = new Story({
      title,
      user,
      category,
      description,
      tags,
    });

    // Save the story to the database
    const savedStory = await newStory.save();

    const populatedStory = await Story.findById(savedStory._id)
      .populate("user")
      .populate("category");

    return res.status(201).send({
      data: populatedStory,
      message: "Story created successfully",
    });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .send({ message: "An error occurred while creating the story" });
  }
});

// GET: Get a story by ID

router.get("/:id", async (req, res) => {
  try {
    const item = await Story.findOne({ _id: req.params.id })
      .populate("user")
      .populate("category")
      .lean()
      .exec();
    if (!item) {
      return res.status(404).send({ message: "Story not found" });
    }
    return res
      .status(200)
      .send({ story: item, message: "Story found successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .send({ message: "An error occurred while fetching the story" });
  }
});

router.get("/user/:user_id", async (req, res) => {
  try {
    const stories = await Story.find({ user: req.params.user_id })
      .populate("user")
      .populate("category")
      .lean()
      .exec();

    if (stories.length < 1) {
      return res.status(404).send({ message: "No stories found for the user" });
    }
    return res.status(200).send({ stories: stories, message: "Stories List" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const item = await Story.findOneAndDelete({ _id: req.params.id })
      .lean()
      .exec();
    if (!item) {
      return res.status(404).send({ message: "Story not found" });
    }
    return res
      .status(200)
      .send({ story: item, message: "Story deleted successfully" });
  } catch (err) {
    console.error(err); // Log error for debugging
    return res.status(500).send({ message: err.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { title, description, tags, user, category } = req.body;

    const updatedStory = await Story.findOneAndUpdate(
      { _id: req.params.id },
      { title, description, user, category, tags },
      { new: true }
    )
      .populate("user")
      .populate("category")
      .lean()
      .exec();

    if (!updatedStory) {
      return res.status(404).send({ message: "Story not found" });
    }

    return res
      .status(200)
      .send({ story: updatedStory, message: "Story updated successfully" });
  } catch (err) {
    console.error(err); // Log the error for debugging
    return res
      .status(500)
      .send({ message: "An error occurred while updating the story" });
  }
});

module.exports = router;
