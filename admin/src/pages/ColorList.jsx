import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAColor, getColors } from "../features/color/colorSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Container,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const ColorList = () => {
  const [open, setOpen] = useState(false);
  const [colorId, setColorId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getColors());
  }, [dispatch]);

  const colorState = useSelector((state) => state.color.colors);

  const showModal = (id) => {
    setOpen(true);
    setColorId(id);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const deleteColor = (id) => {
    dispatch(deleteAColor(id));
    setOpen(false);
    setTimeout(() => {
      dispatch(getColors());
    }, 100);
  };

  const columns = [
    { field: "id", headerName: "SNo", width: 100, headerAlign: "center", align: "center" },
    {
      field: "color",
      headerName: "Color",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <div
          style={{
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            backgroundColor: params.value,
            border: "1px solid #ccc",
          }}
        />
      ),
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <Link to={`/create-color/${params.row.colorId}`} className="text-primary">
            <BiEdit size={20} />
          </Link>
          <button
            className="bg-transparent border-0 text-danger"
            onClick={() => showModal(params.row.colorId)}
          >
            <AiFillDelete size={20} />
          </button>
        </Box>
      ),
    },
  ];

  const rows = colorState.map((color, index) => ({
    id: index + 1,
    color: color.title,
    colorId: color._id,
  }));

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <Container maxWidth="lg">
      <Box sx={{  mt: 3 }}>
        <Typography variant="h4" gutterBottom>
          Colors List
        </Typography>
        <Link to='/create-color'>
        <Button
          variant="contained"
          color="primary"
          sx={{ mb: 3 }}
        >
          Create Color
        </Button>
        </Link>
      </Box>

      {/* DataGrid */}
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          sx={{
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#f5f5f5",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row": {
              "&:nth-of-type(odd)": { backgroundColor: "#fafafa" },
            },
          }}
        />
      </Box>

      {/* Confirmation Modal */}
      <Dialog open={open} onClose={hideModal}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this color?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={hideModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={() => deleteColor(colorId)} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    </div>
  );
};

export default ColorList;
