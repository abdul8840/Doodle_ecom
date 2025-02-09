import mongoose from "mongoose"; 

// Declare the Schema of the Mongo model
const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    quantity: {
      type: Number,
      required: true,
    },
    selling_price: {
      type: Number,
      required: true,
    },
    Size: {
      type: String,
      required: true,
    },
    color: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Color",
    },
  },
  {
    timestamps: true,
  }
);

//Export the model
const Cart = mongoose.model("Cart", cartSchema);
export default Cart
