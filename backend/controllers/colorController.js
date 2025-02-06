import Color from '../models/colorModel.js'
import validateMongoDbId from "../utils/validateMongoDbId.js";

export const createColor = async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.status(201).json({ message: "Color created successfully", newColor });
  } catch (error) {
    res.status(500).json({ message: "Error creating color", error });
  }
};

export const deleteColor = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedColor = await Color.findByIdAndDelete(id);
      res.status(200).json(deletedColor);
  } catch (error) {
    throw new Error(error);
  }
};

export const getallColor = async (req, res) => {
  try {
    const getallColor = await Color.find();
    res.status(200).json(getallColor);
  } catch (error) {
    res.status(500).json({ message: "Error fetching colors", error });
  }
};

export const getColor = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaColor = await Color.findById(id);
    res.status(200).json(getaColor);
  } catch (error) {
    res.status(404).json({ message: "Color not found", error });
  }
};

export const updateColor = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updatedColor);
  } catch (error) {
    res.status(404).json({ message: "Color not found", error });
  }
};