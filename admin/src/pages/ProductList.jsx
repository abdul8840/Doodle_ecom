import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { delImg } from "../features/upload/uploadSlice";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state?.product?.products);

  const handleDelete = (id) => {
    setProductId(id);
    setOpen(true);
  };

  const confirmDelete = () => {
    dispatch(deleteAProduct(productId));
    dispatch(delImg(productId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  const columns = [
    { field: "id", headerName: "SNo", width: 70 },
    { field: "title", headerName: "Title", width: 200 },
    { field: "brand", headerName: "Brand", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "price", headerName: "Price", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex items-center gap-3">
          <Link to={`/create-product/${params.row._id}`} className="text-green-600 text-lg">
            <BiEdit />
          </Link>
          <button
            className="text-red-600 text-lg bg-transparent border-0"
            onClick={() => handleDelete(params.row._id)}
          >
            <AiFillDelete />
          </button>
        </div>
      ),
    },
  ];

  const rows = productState.map((product, index) => ({
    id: index + 1,
    _id: product._id,
    title: product.title,
    brand: product.brand,
    category: product.category,
    quantity: product.quantity,
    price: product.price,
  }));

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold">Products</h3>
        <Link to="/create-product">
          <Button variant="contained" color="primary">Add Product</Button>
        </Link>
      </div>
      <div className="bg-white p-4 rounded-lg shadow">
        <DataGrid rows={rows} columns={columns} pageSize={5} autoHeight />
      </div>
      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Product</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this product?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductList;
