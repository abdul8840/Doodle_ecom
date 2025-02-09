import React, { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCartProduct, getUserCart, updateCartProduct } from "../features/user/userSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const userCartState = useSelector((state) => state.auth.cartProducts);

  useEffect(() => {
    dispatch(getUserCart());
  }, [dispatch]);

  useEffect(() => {
    if (productUpdateDetail) {
      dispatch(updateCartProduct(productUpdateDetail));
      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
  }, [productUpdateDetail, dispatch]);

  useEffect(() => {
    let sum = 0;
    userCartState?.forEach((item) => {
      sum += Number(item.quantity) * item.selling_price;
    });
    setTotalAmount(sum);
  }, [userCartState]);

  const deleteCartItem = (id) => {
    if (!id) {
      console.error("Cart Item ID is undefined");
      return;
    }
    dispatch(deleteCartProduct({ id }));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };
  

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Shopping Cart</h2>

      {userCartState?.length > 0 ? (
        <div className="grid gap-6">
          {userCartState?.map((item, index) => (
            <div key={index} className="bg-white p-4 shadow-lg rounded-xl flex flex-col md:flex-row items-center gap-6 relative">
              <img src={item?.productId.images[0].url} className="w-24 h-24 object-cover rounded-lg" alt="product" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{item?.productId.title}</h3>
                <div className="flex items-center gap-3 mt-2">
                  <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm">Size: {item?.size || "N/A"}</span>
                  <span className="w-5 h-5 rounded-full border" style={{ backgroundColor: item?.color.title || "transparent" }}></span>
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <input
                    type="number"
                    className="w-16 p-2 border rounded text-center"
                    min={1}
                    max={10}
                    value={item?.quantity}
                    onChange={(e) =>
                      setProductUpdateDetail({
                        cartItemId: item?._id,
                        quantity: e.target.value,
                      })
                    }
                  />
                  <span className="text-gray-700 font-semibold">Rs. {item?.quantity * item?.selling_price}</span>
                </div>
              </div>
              <AiFillDelete onClick={() => deleteCartItem(item?._id)} className="text-red-500 cursor-pointer text-xl absolute top-3 right-3" />
            </div>
          ))}

          <div className="bg-gray-100 p-4 rounded-lg text-center md:text-right mb-20">
            <h4 className="text-lg font-semibold text-gray-800">Subtotal: Rs. {totalAmount}</h4>
            <p className="text-sm text-gray-500">Taxes and shipping calculated at checkout</p>
          </div>
        </div>
      ) : (
        <div className="text-center mt-8">
          <h3 className="text-xl font-semibold text-gray-700">Your cart is empty 😞</h3>
          <p className="text-gray-500 mt-2">Start shopping and add items to your cart.</p>
          <Link to="/product" className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg inline-block transition">Browse Products</Link>
        </div>
      )}

      {userCartState?.length > 0 && (
        <div className="fixed bottom-0 left-0 w-full bg-white p-4 shadow-lg flex justify-between items-center">
          <h4 className="text-lg font-semibold text-gray-800">Total: Rs. {totalAmount}</h4>
          <Link to="/checkout" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition">Checkout</Link>
        </div>
      )}
    </div>
  );
};

export default Cart;