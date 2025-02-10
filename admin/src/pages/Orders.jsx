import React, { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getOrders, updateAOrder } from "../features/auth/authSlice";

const Orders = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderState = useSelector((state) => state?.auth?.orders?.orders);

  const updateOrderStatus = (id, status) => {
    dispatch(updateAOrder({ id, status }));
  };

  const columns = [
    { field: "id", headerName: "SNo", width: 90 },
    { field: "name", headerName: "Name", width: 200 },
    { field: "amount", headerName: "Amount (₹)", width: 150 },
    { field: "date", headerName: "Date", width: 200 },
    {
      field: "product",
      headerName: "Product",
      width: 180,
      renderCell: (params) => (
        <Link to={`/order/${params.row._id}`} className="text-blue-500 underline">
          View Orders
        </Link>
      ),
    },
    {
      field: "status",
      headerName: "Order Status",
      width: 200,
      renderCell: (params) => (
        <select
          defaultValue={params.row.orderStatus}
          onChange={(e) => updateOrderStatus(params.row._id, e.target.value)}
          className="p-2 border rounded-md focus:outline-none"
        >
          <option value="Ordered">Ordered</option>
          <option value="Processed">Processed</option>
          <option value="Shipped">Shipped</option>
          <option value="Out_for_Delivery">Out_for_Delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      ),
    },
  ];

  const rows = orderState?.map((order, index) => ({
    id: index + 1,
    _id: order?._id,
    name: order?.user?.firstname,
    amount: order?.totalPrice,
    date: new Date(order?.createdAt).toLocaleString(),
    orderStatus: order?.orderStatus,
  }));

  return (
    <div className="p-4">
      <h3 className="mb-4 text-xl font-semibold">Orders</h3>
      <div className="w-full bg-white p-4 rounded-lg shadow-md">
        <DataGrid
          rows={rows || []}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          autoHeight
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Orders;