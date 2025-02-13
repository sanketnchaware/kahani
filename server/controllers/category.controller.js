const express = require("express");
const Category = require("../modals/category.model");

const router = express.Router();

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categoryList = await Category.find().lean().exec();
    if (!categoryList || categoryList.length === 0) {
      return res.status(404).send({ message: "No categories found !" });
    }
    return res.status(200).send({
      data: categoryList,
      message: "Categories fetched successfully !",
    });
  } catch (error) {
    return res.status(500).send({
      message: "An error occurred while fetching categories !",
      error: error.message,
    });
  }
});

router.get("/dropdown", async (req, res) => {
  try {
    const categoryList = await Category.find().select("_id name").lean().exec();
    if (!categoryList || categoryList.length === 0) {
      return res.status(404).send({ message: "No categories found !" });
    }
    return res.status(200).send({
      data: categoryList,
      message: "Categories Dropdown fetched successfully !",
    });
  } catch (error) {
    return res.status(500).send({
      message: "An error occurred while fetching categories dropdown !",
      error: error.message,
    });
  }
});

// Create a new category
router.post("/", async (req, res) => {
  try {
    if (!req.body.name) {
      return res.status(400).send({ message: "Category name is required !" });
    }

    const newCategory = await Category.create({ ...req.body });

    return res
      .status(201)
      .send({ data: newCategory, message: "Category created successfully !" });
  } catch (error) {
    return res.status(500).send({
      message: "An error occurred while creating the category !",
      error: error.message,
    });
  }
});

// Get a category by ID
router.get("/:id", async (req, res) => {
  try {
    const categoryById = await Category.findOne({ _id: req.params.id })
      .lean()
      .exec();

    if (!categoryById) {
      return res.status(404).send({ message: "Category not found !" });
    }

    return res
      .status(200)
      .send({ data: categoryById, message: "Category fetched successfully !" });
  } catch (error) {
    return res.status(500).send({
      message: "An error occurred while fetching the category !",
      error: error.message,
    });
  }
});

// Update a category by ID
router.put("/:id", async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res
        .status(400)
        .send({ message: "Category name is required for update !" });
    }

    const updatedCategory = await Category.findOneAndUpdate(
      { _id: req.params.id },
      { name: name },
      { new: true }
    )
      .lean()
      .exec();

    if (!updatedCategory) {
      return res
        .status(404)
        .send({ message: "Category not found or update failed !" });
    }

    return res.status(200).send({
      data: updatedCategory,
      message: "Category updated successfully",
    });
  } catch (error) {
    return res.status(500).send({
      message: "An error occurred while updating the category !",
      error: error.message,
    });
  }
});

// Delete a category by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedCategory = await Category.findOneAndDelete({
      _id: req.params.id,
    })
      .lean()
      .exec();

    if (!deletedCategory) {
      return res.status(404).send({ message: "Category not found !" });
    }

    return res.status(200).send({ message: "Category deleted successfully !" });
  } catch (error) {
    return res.status(500).send({
      message: "An error occurred while deleting the category !",
      error: error.message,
    });
  }
});

module.exports = router;
