import Brand from "../models/brandModel.js";
import validateMongoDbId from "../utils/validateMongoDbId.js";

export const createBrand = async (req, res) => {
  try {
    const { title, description } = req.body;
    const brand = new Brand({ title, description });
    await brand.save();
    res.status(201).json({ message: "Brand created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating brand" });
  }
};

export const updateBrand = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedBrand) {
      return res.status(404).json({ message: "Brand not found" });
    }
    res.status(200).json({ message: "Brand updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating brand" });
}
};

export const getBrand = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaBrand = await Brand.findById(id);
    if (!getaBrand) {
      return res.status(404).json({ message: "Brand not found" });
      }
      res.status(200).json(getaBrand);
  } catch (error) {
    res.status(500).json({ message: "Error getting brand" });
  }
};

export const getallBrand = async (req, res) => {
  try {
    const getallBrand = await Brand.find();
    res.status(200).json(getallBrand);
  } catch (error) {
    res.status(500).json({ message: "Error getting all brands" });
  }
};

export const deleteBrand = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedBrand = await Brand.findByIdAndDelete(id);
      res.status(200).json(deletedBrand);
  } catch (error) {
    res.status(500).json({ message: "Error deleting brand" });
  }
};