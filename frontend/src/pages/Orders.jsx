import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state?.auth?.getorderedProduct?.orders);

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""}`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getOrders(config2));
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="grid grid-cols-4 gap-4 bg-gray-200 p-3 rounded-md font-semibold">
          <p>Order ID</p>
          <p>Total Amount</p>
          <p>Discounted Price</p>
          <p>Status</p>
        </div>
        {orderState?.map((order) => (
          <div key={order._id} className="bg-yellow-200 mt-4 p-4 rounded-md">
            <div className="grid grid-cols-4 gap-4 py-2 text-gray-900 font-medium">
              <p>{order._id}</p>
              <p>₹{order.totalPrice}</p>
              <p>₹{order.totalPriceAfterDiscount}</p>
              <p className="text-blue-600">{order.orderStatus}</p>
            </div>
            <div className="bg-gray-800 text-white p-3 rounded-md mt-2">
              <div className="grid grid-cols-4 gap-4 font-semibold border-b border-gray-500 pb-2">
                <p>Product Name</p>
                <p>Quantity</p>
                <p>Price</p>
                <p>Color</p>
              </div>
              {order.orderItems?.map((item) => (
                <div key={item.product._id} className="grid grid-cols-4 gap-4 mt-2 text-sm">
                  <p>{item.product.title}</p>
                  <p>{item.quantity}</p>
                  <p>₹{item.selling_price}</p>
                  <div className="w-6 h-6 rounded-full" style={{ backgroundColor: item.color.title }}></div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;