import Cart from '../models/cartModel.js';
import validateMongoDbId from '../utils/validateMongoDbId.js'

export const userCart = async (req, res) => {
  const { productId, color, quantity, selling_price, size } = req.body;

  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      color,
      size,
      selling_price,
      quantity,
    }).save();
    res.status(201).json({ message: 'Product added to cart', newCart });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error adding product to cart' });
  }
};

export const getUserCart = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const cart = await Cart.find({ userId: _id })
      .populate("productId")
      .populate("color");
    res.json(cart);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching user cart' });
  }
};

export const removeProductFromCart = async (req, res) => {
  const { _id } = req.user;
  const { cartItemId } = req.params;
  validateMongoDbId(_id);
  try {
    const deleteProductFromcart = await Cart.deleteOne({
      userId: _id,
      _id: cartItemId,
    });
    res.json(deleteProductFromcart);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error removing product from cart' });
  }
};

export const emptyCart = async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const deleteCart = await Cart.deleteMany({
      userId: _id,
    });
    res.json(deleteCart);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error emptying cart' });
  }
};

export const updateProductQuantityFromCart = async (req, res) => {
  const { _id } = req.user;
  const { cartItemId, newQuantity } = req.params;
  validateMongoDbId(_id);
  try {
    const cartItem = await Cart.findOne({
      userId: _id,
      _id: cartItemId,
    });
    cartItem.quantity = newQuantity;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error updating product quantity' });
  }
};