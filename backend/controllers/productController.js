import Product from "../models/productModel.js";
import slugify from 'slugify';
import validateMongoDbId from "../utils/validateMongoDbId.js";
import User from "../models/userModel.js";

const createUniqueSlug = async (title) => {
  let slug = slugify(title, { lower: true, strict: true });
  let existingProduct = await Product.findOne({ slug });

  let count = 1;
  while (existingProduct) {
    slug = `${slug}-${count}`;
    existingProduct = await Product.findOne({ slug });
    count++;
  }

  return slug;
};

export const createProduct = async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = await createUniqueSlug(req.body.title);
    }

    const newProduct = await Product.create(req.body);
    res.status(201).json({ message: "Product created successfully", newProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create product", error });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Product updated successfully", updateProduct });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Failed to update product", error });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully", deletedProduct });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error });
  }
};

export const getaProduct = async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id).populate("color");
    res.json(findProduct);
  } catch (error) {
    res.status(200).status(500).json({ message: "Failed to find product", error });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }
    
    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
};

export const addToWishlist = async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
};