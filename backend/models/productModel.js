import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mrp_price: {
    type: Number,
    required: true,
    default: 0,
  },
  selling_price: {
    type: Number,
    required: true,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  sold: {
    type: Number,
    default: 0,
  },
  sizes: [
    {
      type: String,
      required: true,
    },
  ],
  tags: [
    {
      type: String,
    },
  ],
  newarrivedproduct: {
    type: String,
    default: "Inactive",
  },
  trendingproduct: {
    type: String,
    default: "Inactive",
  },
  featuredproduct: {
    type: String,
    default: "Inactive",
  },
  color: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
  ],
  images: [
    {
      public_id: String,
      url: String,
    },
  ],
  ratings: [
    {
      star: Number,
      comment: String,
      postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    },
  ],
  totalrating: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);
export default Product;
