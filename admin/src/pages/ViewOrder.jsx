import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getaOrder } from "../features/auth/authSlice";
import { Button } from "@mui/material";
import { AiFillPrinter } from "react-icons/ai";
import { DataGrid } from "@mui/x-data-grid";

const ViewOrder = () => {
  const { id: orderId } = useParams();
  const dispatch = useDispatch();
  const printContentRef = useRef(); // Reference for print content

  useEffect(() => {
    dispatch(getaOrder(orderId));
  }, [dispatch, orderId]);

  const orderState = useSelector((state) => state?.auth?.singleorder?.orders);

  const columns = [
    { field: "id", headerName: "SNo", width: 90 },
    { field: "name", headerName: "Product Name", width: 200 },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "quantity", headerName: "Count", width: 120 },
    { field: "size", headerName: "Size", width: 100 },
    { field: "price", headerName: "Amount (₹)", width: 130 },
  ];

  const rows =
    orderState?.orderItems?.map((item, index) => ({
      id: index + 1,
      name: item?.product?.title || "N/A",
      brand: item?.product?.brand || "N/A",
      quantity: item?.quantity,
      price: item?.selling_price,
      size: item?.size || "N/A",
    })) || [];

  const handlePrint = () => {
    const printContent = printContentRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Refresh to restore original page
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-2xl font-semibold mb-4">View Order</h3>

        {/* Main Order Details */}
        <div className="mb-6">
          <h4 className="text-lg font-semibold">Shipping Address:</h4>
          <p>{orderState?.shippingInfo?.firstname} {orderState?.shippingInfo?.lastname}</p>
          <p>{orderState?.shippingInfo?.address}, {orderState?.shippingInfo?.city}</p>
          <p>{orderState?.shippingInfo?.state} - {orderState?.shippingInfo?.pincode}</p>
        </div>

        {/* Order Items Table */}
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h4 className="text-lg font-semibold mb-2">Order Items:</h4>
          <div className="w-full h-96">
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={5}
              checkboxSelection
              className="bg-white"
            />
          </div>
        </div>

        {/* Print Button */}
        <div className="flex justify-end mt-6">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AiFillPrinter />}
            onClick={handlePrint}
          >
            Print Order
          </Button>
        </div>
      </div>

      {/* Hidden Print Content */}
      <div ref={printContentRef} className="hidden">
        <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
          <h2 style={{ textAlign: "center", fontSize: "20px", fontWeight: "bold" }}>Order Invoice</h2>

          {/* User Info */}
          <div style={{ marginBottom: "20px" }}>
            <h3>Shipping Address:</h3>
            <p><strong>Name:</strong> {orderState?.shippingInfo?.firstname} {orderState?.shippingInfo?.lastname}</p>
            <p><strong>Address:</strong>{orderState?.shippingInfo?.other}, {orderState?.shippingInfo?.address}, {orderState?.shippingInfo?.city}</p>
            <p><strong>State:</strong> {orderState?.shippingInfo?.state} - {orderState?.shippingInfo?.pincode}</p>
          </div>

          {/* Order Items */}
          <table className="w-full border border-black border-collapse">
            <thead>
              <tr>
                <th className="border border-black bg-gray-200 px-2 py-1">SNo</th>
                <th className="border border-black bg-gray-200 px-2 py-1">Product Name</th>
                <th className="border border-black bg-gray-200 px-2 py-1">Brand</th>
                <th className="border border-black bg-gray-200 px-2 py-1">Quantity</th>
                <th className="border border-black bg-gray-200 px-2 py-1">Size</th>
                <th className="border border-black bg-gray-200 px-2 py-1">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderState?.orderItems?.map((item, index) => (
                <tr key={index}>
                  <td className="border border-black px-2 py-1">{index + 1}</td>
                  <td className="border border-black px-2 py-1">{item?.product?.title || "N/A"}</td>
                  <td className="border border-black px-2 py-1">{item?.product?.brand || "N/A"}</td>
                  <td className="border border-black px-2 py-1">{item?.quantity}</td>
                  <td className="border border-black px-2 py-1">{item?.size}</td>
                  <td className="border border-black px-2 py-1">₹{item?.selling_price}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
};

export default ViewOrder;
