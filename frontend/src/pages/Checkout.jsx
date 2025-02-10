import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { config } from "../utils/config";
import {
  createAnOrder,
  deleteUserCart,
  getUserCart,
  resetState,
} from "../features/user/userSlice";

let shippingSchema = yup.object({
  firstname: yup.string().required("First Name is Required"),
  lastname: yup.string().required("Last Name is Required"),
  address: yup.string().required("Address Details are Required"),
  state: yup.string().required("State is Required"),
  city: yup.string().required("City is Required"),
  country: yup.string().required("Country is Required"),
  pincode: yup.number("Pincode No is Required").required().positive().integer(),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const [totalAmount, setTotalAmount] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    razorpayPaymentId: "",
    razorpayOrderId: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index].quantity) * cartState[index].selling_price;
      setTotalAmount(sum);
    }
  }, [cartState]);

  const getTokenFromLocalStorage = localStorage.getItem("customer")
    ? JSON.parse(localStorage.getItem("customer"))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
      }`,
      Accept: "application/json",
    },
  };

  useEffect(() => {
    dispatch(getUserCart(config2));
  }, []);

  useEffect(() => {
    if (
      authState?.orderedProduct?.order !== null &&
      authState?.orderedProduct?.success === true
    ) {
      navigate("/my-orders");
    }
  }, [authState]);

  const [cartProductState, setCartProductState] = useState([]);

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      address: "",
      state: "",
      city: "",
      country: "",
      pincode: "",
      other: "",
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      setShippingInfo(values);
      localStorage.setItem("address", JSON.stringify(values));
      setTimeout(() => {
        checkOutHandler();
      }, 300);
    },
  });

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index].productId._id,
        quantity: cartState[index].quantity,
        color: cartState[index].color._id,
        size: cartState[index].size,
        selling_price: cartState[index].selling_price,
      });
    }
    setCartProductState(items);
  }, []);

  const checkOutHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to Load");
      return;
    }
    const result = await axios.post(
      "http://localhost:8000/api/auth/order/checkout",
      { amount: totalAmount + 100 },
      config
    );

    if (!result) {
      alert("Something Went Wrong");
      return;
    }

    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: "rzp_test_HSSeDI22muUrLR", // Enter the Key ID generated from the Dashboard
      amount: amount,
      currency: currency,
      name: "Cart's corner",
      description: "Test Transaction",
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post(
          "http://localhost:8000/api/auth/order/paymentVerification",
          data,
          config
        );

        dispatch(
          createAnOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo: result.data,
            shippingInfo: JSON.parse(localStorage.getItem("address")),
          })
        );
        dispatch(deleteUserCart(config2));
        localStorage.removeItem("address");
        dispatch(resetState());
      },
      prefill: {
        name: "Abdul Rahman",
        email: "abdulrahman01@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Allahabad UP India",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Section - Shipping Information */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">Cart Corner</h3>
            <nav className="flex space-x-2 mb-6">
              <Link to="/cart" className="text-gray-600 hover:text-gray-900">
                Cart
              </Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Information</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Shipping</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900">Payment</span>
            </nav>
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <p className="text-gray-600 mb-6">
              Abdul Rahman (abdul01@gmail.com)
            </p>
            <h4 className="text-lg font-semibold mb-4">Shipping Address</h4>
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div>
                <select
                  className="w-full p-2 border border-gray-300 rounded-md"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange("country")}
                  onBlur={formik.handleBlur("country")}
                >
                  <option value="" disabled>
                    Select Country
                  </option>
                  <option value="India">India</option>
                </select>
                {formik.touched.country && formik.errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.country}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    name="firstname"
                    value={formik.values.firstname}
                    onChange={formik.handleChange("firstname")}
                    onBlur={formik.handleBlur("firstname")}
                  />
                  {formik.touched.firstname && formik.errors.firstname && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.firstname}
                    </p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    name="lastname"
                    value={formik.values.lastname}
                    onChange={formik.handleChange("lastname")}
                    onBlur={formik.handleBlur("lastname")}
                  />
                  {formik.touched.lastname && formik.errors.lastname && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.lastname}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange("address")}
                  onBlur={formik.handleBlur("address")}
                />
                {formik.touched.address && formik.errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.address}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Apartment, Suite, etc"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  name="other"
                  value={formik.values.other}
                  onChange={formik.handleChange("other")}
                  onBlur={formik.handleBlur("other")}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="City"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    name="city"
                    value={formik.values.city}
                    onChange={formik.handleChange("city")}
                    onBlur={formik.handleBlur("city")}
                  />
                  {formik.touched.city && formik.errors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.city}
                    </p>
                  )}
                </div>
                <div>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md"
                    name="state"
                    value={formik.values.state}
                    onChange={formik.handleChange("state")}
                    onBlur={formik.handleBlur("state")}
                  >
                    <option value="" disabled>
                      Select State
                    </option>
                    <option value="Gujarat">Gujarat</option>
                  </select>
                  {formik.touched.state && formik.errors.state && (
                    <p className="text-red-500 text-sm mt-1">
                      {formik.errors.state}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Pincode"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  name="pincode"
                  value={formik.values.pincode}
                  onChange={formik.handleChange("pincode")}
                  onBlur={formik.handleBlur("pincode")}
                />
                {formik.touched.pincode && formik.errors.pincode && (
                  <p className="text-red-500 text-sm mt-1">
                    {formik.errors.pincode}
                  </p>
                )}
              </div>
              <div className="flex justify-between items-center mt-6">
                <Link
                  to="/cart"
                  className="flex items-center text-gray-600 hover:text-gray-900"
                >
                  <BiArrowBack className="mr-2" />
                  Return to Cart
                </Link>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>

          {/* Right Section - Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h4 className="text-lg font-semibold mb-4">Order Summary</h4>
            <div className="space-y-4">
              {cartState &&
                cartState.map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="relative">
                      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full px-2 py-1">
                        {item.quantity}
                      </span>
                      <span className="absolute -top-2 -right-2 bg-gray-600 text-white text-xs rounded-full px-2 py-1">
                        {item.size}
                      </span>
                      <img
                        src={item.productId.images[0].url}
                        alt={item.productId.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <h5 className="font-medium">{item.productId.title}</h5>
                      <p className="text-sm text-gray-600">{item.color.title}</p>
                    </div>
                    <div className="ml-auto">
                      <p className="font-medium">
                        Rs. {item.selling_price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Subtotal</p>
                <p className="font-medium">Rs. {totalAmount || "0"}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p className="text-gray-600">Shipping</p>
                <p className="font-medium">Rs. 100</p>
              </div>
              <div className="flex justify-between mt-4">
                <h4 className="text-lg font-semibold">Total</h4>
                <h4 className="text-lg font-semibold">
                  Rs. {totalAmount ? totalAmount + 100 : "0"}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;