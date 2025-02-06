import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteABrand, getBrands, resetState } from "../features/brand/brandSlice";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const BrandList = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [brandId, setBrandId] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBrands());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);

  const filteredBrands = brandState.filter((brand) =>
    brand.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = () => {
    dispatch(deleteABrand(brandId));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBrands());
    }, 100);
  };

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h3 className="text-xl font-semibold mb-4">Brands</h3>
      
      <TextField
        label="Search Brands"
        variant="outlined"
        fullWidth
        className="mb-4"
        onChange={(e) => setSearch(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>SNo</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBrands.map((brand, index) => (
              <TableRow key={brand._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{brand.title}</TableCell>
                <TableCell>{brand.description}</TableCell>
                <TableCell>
                  <IconButton component={Link} to={`/create-brand/${brand._id}`} color="primary">
                    <BiEdit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => {
                      setBrandId(brand._id);
                      setOpen(true);
                    }}
                  >
                    <AiFillDelete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Delete Brand</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this brand?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default BrandList;
