import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { deleteAProduct, getProducts } from "../features/product/productSlice";
import { Link } from "react-router-dom";
import { delImg } from "../features/upload/uploadSlice";
import { 
  Button, Dialog, DialogActions, DialogContent, DialogTitle, 
  TextField, CircularProgress 
} from "@mui/material";

const ProductList = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { products, loading } = useSelector((state) => state?.product);

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
    }, 500);
  };

  const columns = [
    { field: "id", headerName: "SNo", width: 70 },
    {
      field: "image",
      headerName: "Image",
      width: 120,
      renderCell: (params) => (
        <img src={params.value} alt="Product" className="w-16 h-16 object-cover rounded" />
      ),
    },
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
        <div className="flex items-center gap-3 mt-4">
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

  const filteredRows = products
    ?.filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .map((product, index) => ({
      id: index + 1,
      _id: product._id,
      title: product.title,
      image: product.images?.[0]?.url,
      brand: product.brand,
      category: product.category,
      quantity: product.quantity,
      price: product.selling_price,
    }));

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Products</h3>
      
      {/* Search Filter */}
      <TextField
        label="Search Product"
        variant="outlined"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />

      {/* Create Product Button */}
      <div className="mb-4">
        <Link to="/create-product">
          <Button variant="contained" color="primary">Add Product</Button>
        </Link>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <CircularProgress />
        </div>
      ) : (
        <div className="bg-white p-4 rounded-lg shadow">
          <DataGrid rows={filteredRows} columns={columns} pageSize={5} autoHeight />
        </div>
      )}

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
