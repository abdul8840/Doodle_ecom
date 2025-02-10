import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../features/user/userSlice";
import { Timeline, TimelineItem, TimelineSeparator, TimelineConnector, TimelineContent, TimelineDot } from "@mui/lab";
import { Card, CardContent, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";

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

  // Define order statuses in order
  const orderSteps = [
    { status: "Ordered", icon: <ShoppingCartIcon /> },
    { status: "Processed", icon: <SettingsIcon /> },
    { status: "Shipped", icon: <LocalShippingIcon /> },
    { status: "Out_for_Delivery", icon: <DirectionsBikeIcon /> },
    { status: "Delivered", icon: <CheckCircleIcon /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Orders</h1>
      <div className="space-y-6">
        {orderState?.map((order) => {
          // Get current order status index
          const currentStatusIndex = orderSteps.findIndex(step => step.status === order.orderStatus);

          return (
            <Card key={order._id} className="shadow-lg rounded-lg overflow-hidden">
              <CardContent>
                <Typography variant="h6" className="font-semibold">Order ID: {order._id}</Typography>
                <Typography variant="body2" className="text-gray-500">Total Amount: ₹{order.totalPrice}</Typography>
                <Typography variant="body2" className="text-gray-500">Discounted Price: ₹{order.totalPriceAfterDiscount}</Typography>
                <Typography variant="body2" className="text-gray-500">User Name: {order.user?.firstname} {order.user?.lastname}</Typography>
                <Typography variant="body2" className="text-gray-500">
                  Shipping Address: {order.shippingInfo?.other}, {order.shippingInfo?.address}, {order.shippingInfo?.city}, {order.shippingInfo?.state}, {order.shippingInfo?.pincode}
                </Typography>

                {/* Order Items */}
                <div className="mt-4 border-t pt-4">

                  <Typography variant="h6" className="font-semibold mb-2">Order Items</Typography>
                  {order.orderItems?.map((item, index) => (
                    <Link to={`/product/${item.product?._id}`}>
                      <div key={index} className="flex items-center space-x-4 mb-2 border-b pb-2">
                        {/* Product Image */}
                        <img
                          src={item.product.images[0]?.url} // Assuming image is an array, display the first one
                          alt={item.product.title}
                          className="w-20 h-24 object-cover rounded-md"
                        />
                        <div>
                          <Typography variant="body2" className="text-gray-700">
                            <span className="font-semibold">Product:</span> {item.product.title}
                          </Typography>
                          <Typography variant="body2" className="text-gray-700 flex gap-1 items-center">
                            <span className="font-semibold">Color:</span>
                            <span
                              className="inline-block h-4 w-4 rounded-full"
                              style={{ backgroundColor: item.color?.title }}
                            ></span>
                          </Typography>
                          <Typography variant="body2" className="text-gray-700">
                            <span className="font-semibold">Size:</span> {item.size}
                          </Typography>
                          <Typography variant="body2" className="text-gray-700">
                            <span className="font-semibold">Quantity:</span> {item.quantity}
                          </Typography>
                          <Typography variant="body2" className="text-gray-700">
                            <span className="font-semibold">Price:</span> ₹{item.selling_price}
                          </Typography>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>


                {/* Order Status */}
                <div className="mt-4">
                  <Typography variant="h6" className="font-semibold">Order Status</Typography>

                  {/* Vertical Timeline for Small Screens */}
                  <Timeline className="mt-5 flex md:!hidden flex-col items-start">
                    {orderSteps.map((step, index) => (
                      <TimelineItem key={index} className="">
                        <TimelineSeparator>
                          <TimelineDot color={index <= currentStatusIndex ? "primary" : "grey"} className="z-10">
                            {step.icon}
                          </TimelineDot>
                          {index !== orderSteps.length - 1 && (
                            <TimelineConnector
                              style={{
                                backgroundColor: index < currentStatusIndex ? "#3b82f6" : "#d1d5db",
                                height: "50px", // Adjust this value to make the line longer
                              }}
                            />
                          )}
                        </TimelineSeparator>
                        <TimelineContent className="text-left !mt-2.5">{step.status}</TimelineContent>
                      </TimelineItem>
                    ))}
                  </Timeline>


                  {/* Horizontal Timeline for Large Screens */}
                  <div className="hidden md:flex items-center justify-between relative w-full mt-6">
                    {orderSteps.map((step, index) => (
                      <div key={index} className="relative flex flex-col items-center w-full">
                        {/* Connector Line - Only show for all but the first step */}
                        {index !== 0 && (
                          <div
                            className={`absolute top-1/2 left-[-50%] h-1 w-full ${index <= currentStatusIndex ? "bg-blue-500" : "bg-gray-300"} z-0`}
                          ></div>
                        )}

                        {/* Icon - Positioned Above Line */}
                        <div
                          className={`relative z-10 flex items-center justify-center rounded-full p-3 ${index <= currentStatusIndex ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-500"}`}
                        >
                          {step.icon}
                        </div>

                        {/* Status Label */}
                        <Typography variant="body2" className="mt-2">{step.status}</Typography>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
