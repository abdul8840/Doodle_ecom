import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { createCategory, resetState } from "../features/pcategory/categorySlice";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate

let schema = yup.object().shape({
  name: yup.string().required("Category Name is Required"),
  desc: yup.string().required("Category Description is Required"),
});

const ProductCategoryCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate
  const newCategory = useSelector((state) => state.pCategory);
  const { isSuccess, isError, createdCategory } = newCategory;

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success("Category Added Successfully!");
      dispatch(resetState());
      navigate("/product-category"); // Redirect after successful category creation
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, createdCategory, dispatch, navigate]); // Add navigate as a dependency

  const formik = useFormik({
    initialValues: {
      name: "", // Initialize with empty values for new category
      desc: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createCategory(values));
    },
  });

  return (
    <div className="max-w-4xl mx-auto p-5">
      <h3 className="text-2xl font-semibold mb-5">Add New Category</h3>

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
            Create Category
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductCategoryCreate;
