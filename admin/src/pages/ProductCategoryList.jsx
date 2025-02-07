import React, { useEffect, useState, useMemo } from "react";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, resetState, deleteAProductCategory } from "../features/pcategory/categorySlice";
import { toast } from "react-toastify";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";


const ProductCategoryList = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [pCatId, setPCatId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, [dispatch]);

  const pCatStat = useSelector((state) => state.pCategory.pCategories);

  const filteredCategories = useMemo(() => {
    return pCatStat.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()) ||
      category.desc.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, pCatStat]);

  const showModal = (id) => {
    setPCatId(id);
    setOpen(true);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteCategory = (id) => {
    dispatch(deleteAProductCategory(id));
    setOpen(false);
    toast.success("Category deleted successfully!");
    setTimeout(() => {
      dispatch(getCategories());
    }, 500);
  };

  const columns = [
    { field: "key", headerName: "SNo", width: 90 },
    { field: "name", headerName: "Category Name", width: 200, sortable: true },
    { field: "desc", headerName: "Description", width: 250 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="flex mt-4">
          <Link to={`/update-product-category/${params.row.id}`} className="text-green-600">
            <BiEdit size={20} />
          </Link>
          <button
            onClick={() => showModal(params.row.id)}
            className="ml-3 text-red-500"
          >
            <AiFillDelete size={20} />
          </button>
        </div>
      ),
    },
  ];

  const rows = filteredCategories.map((category, index) => ({
    id: category._id,
    key: index + 1,
    name: category.name,
    desc: category.desc,
  }));

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl">
      <h3 className="text-2xl font-semibold mb-4">Product Categories</h3>
      <TextField
        label="Search Categories"
        variant="outlined"
        fullWidth
        className="mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/create-product-category")}
        className="mb-4"
      >
        Create Category
      </Button>

      <div className="mt-4" style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          components={{ Toolbar: GridToolbar }}
        />
      </div>

      {/* Material UI Dialog for Delete Confirmation */}
      <Dialog open={open} onClose={hideModal}>
        <DialogTitle>Are you sure you want to delete this category?</DialogTitle>
        <DialogContent>
          Deleting this category cannot be undone.
        </DialogContent>
        <DialogActions>
          <Button onClick={hideModal} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => deleteCategory(pCatId)}
            color="secondary"
            variant="contained"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductCategoryList;