import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { getAProductCategory, updateAProductCategory, resetState } from "../features/pcategory/categorySlice";
import { TextField, Button, CircularProgress } from "@mui/material";

let schema = yup.object().shape({
  name: yup.string().required("Category Name is Required"),
  desc: yup.string().required("Category Description is Required"),
});

const UpdateProductCategory = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Extract category ID from URL
  const navigate = useNavigate(); // Initialize navigate

  const { categoryName, categoryDesc, isSuccess, isError, updatedCategory, isLoading } = useSelector((state) => state.pCategory);

  // Fetch category data on initial load
  useEffect(() => {
    if (id) {
      dispatch(getAProductCategory(id)); // Fetch category data for editing
    }
  }, [id, dispatch]);

  // Handle success or error after category data is fetched or updated
  useEffect(() => {
    if (isSuccess && updatedCategory) {
      toast.success("Category Updated Successfully!");
      dispatch(resetState());
      navigate("/product-category"); // Redirect after successful category update
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, updatedCategory, navigate, dispatch]);

  // Handle form submission for updating the category
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: categoryName || "", // Initialize with category name if available
      desc: categoryDesc || "", // Initialize with category description if available
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const data = { id, pCatData: values };
      dispatch(updateAProductCategory(data)); // Dispatch update action
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h3 className="text-2xl font-semibold mb-5">Update Category</h3>

      {isLoading ? (
        <div className="flex justify-center">
          <CircularProgress /> {/* Show loading spinner while fetching category data */}
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <TextField
              fullWidth
              label="Category Name"
              variant="outlined"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              className="mb-4"
            />
          </div>

          <div>
            <TextField
              fullWidth
              label="Category Description"
              variant="outlined"
              id="desc"
              name="desc"
              value={formik.values.desc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.desc && Boolean(formik.errors.desc)}
              helperText={formik.touched.desc && formik.errors.desc}
              className="mb-4"
              multiline
              rows={4}
            />
          </div>

          <div className="flex justify-between">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="w-full py-2"
            >
              Update Category
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateProductCategory;
