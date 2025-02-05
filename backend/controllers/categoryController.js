import Category from "../models/categoryModel.js";
import validateMongoDbId from "../utils/validateMongoDbId.js";
import mongoose from 'mongoose';

export const createCategory = async (req, res) => {
  try {
    const { name, desc } = req.body;
    const category = new Category({ name, desc });
    await category.save();
    res.status(201).json({ message: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;

  try {
    // Validate the ID
    validateMongoDbId(id);

    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
  } catch (error) {
    console.error(error);
    if (error.message === "Invalid MongoDB ID") {
      return res.status(400).json({ message: error.message });
    }
    res.status(500).json({ message: "Error updating category" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
};

export const getCategory = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getacategory = await Category.findById(id);
    if (!getacategory) {
      res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(getacategory);
  } catch (error) {
    res.status(500).json({ message: "Error getting category" });
  }
};

export const getallCategory = async (req, res) => {
  try {
    const getallCategory = await Category.find();
    res.status(200).json(getallCategory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};
