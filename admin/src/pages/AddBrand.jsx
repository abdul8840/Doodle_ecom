import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom"; // Use useParams instead of useLocation
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { TextField, Button } from "@mui/material";
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from "../features/brand/brandSlice";

// Validation schema
let schema = yup.object().shape({
  title: yup.string().required("Brand Name is Required"),
  description: yup.string().required("Description is Required"),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Extract the id from the URL using useParams

  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isError,
    isLoading,
    createdBrand,
    brandName,
    brandDescription,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    if (id) {
      dispatch(getABrand(id)); // Fetch the brand details if id exists
    } else {
      dispatch(resetState()); // Reset the state if no id (create mode)
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success("Brand Added Successfully!");
    }
    if (isSuccess && updatedBrand) {
      toast.success("Brand Updated Successfully!");
      navigate("/get-brand"); // Navigate to the brand list after update
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, createdBrand, updatedBrand, navigate]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || "", // Initialize the form with the fetched brand name
      description: brandDescription || "", // Initialize the form with the fetched brand description
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (id) {
        // If id exists, update the brand
        const data = { id, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        // If no id, create a new brand
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div className="p-6">
      <h3 className="text-2xl font-bold mb-4">
        {id ? "Edit" : "Add"} Brand {/* Display "Edit" or "Add" based on id */}
      </h3>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <TextField
          fullWidth
          id="title"
          name="title"
          label="Brand Title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          variant="outlined"
        />
        <TextField
          fullWidth
          id="description"
          name="description"
          label="Brand Description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          variant="outlined"
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="mt-4"
        >
          {id ? "Edit" : "Add"} Brand {/* Display "Edit" or "Add" based on id */}
        </Button>
      </form>
    </div>
  );
};

export default Addbrand;