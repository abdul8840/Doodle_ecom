import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Use useParams instead of useLocation
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { TextField, Button, Box, Typography } from "@mui/material";
import {
  createColor,
  getAColor,
  resetState,
  updateAColor,
} from "../features/color/colorSlice";

const schema = yup.object().shape({
  title: yup.string().required("Color is Required"),
});

const AddColor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the id from the URL using useParams

  const newColor = useSelector((state) => state.color);
  const {
    isSuccess,
    isError,
    isLoading,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;

  useEffect(() => {
    if (id) {
      dispatch(getAColor(id)); // Fetch the color details if id exists
    } else {
      dispatch(resetState()); // Reset the state if no id (create mode)
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success("Color Added Successfully!");
    }
    if (isSuccess && updatedColor) {
      toast.success("Color Updated Successfully!");
      navigate("/color");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdColor, updatedColor, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || "", // Initialize the form with the fetched color name
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id) {
        // If id exists, update the color
        const data = { id, colorData: values };
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        // If no id, create a new color
        dispatch(createColor(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <Box sx={{ maxWidth: 500, margin: "auto", padding: 2 }}>
      <Typography variant="h4" gutterBottom>
        {id ? "Edit" : "Add"} Color {/* Display "Edit" or "Add" based on id */}
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          label="Enter Product Color"
          type="color"
          value={formik.values.title}
          onChange={formik.handleChange("title")}
          onBlur={formik.handleBlur("title")}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          variant="outlined"
          margin="normal"
        />

        <Button
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          {id ? "Edit" : "Add"} Color {/* Display "Edit" or "Add" based on id */}
        </Button>
      </form>
    </Box>
  );
};

export default AddColor;