import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Chip,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "../features/brand/brandSlice";
import { getCategories } from "../features/pcategory/categorySlice";
import { getColors } from "../features/color/colorSlice";
import Dropzone from "react-dropzone";
import { delImg, uploadImg } from "../features/upload/uploadSlice";
import {
  createProducts,
  getAProduct,
  resetState,
  updateAProduct,
} from "../features/product/productSlice";

const schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  slug: yup.string().required("Slug is Required"),
  shortDescription: yup.string().required("Short Description is Required"),
  description: yup.string().required("Description is Required"),
  mrp_price: yup.number().required("MRP Price is Required"),
  selling_price: yup.number().required("Selling Price is Required"),
  brand: yup.string().required("Brand is Required"),
  category: yup.string().required("Category is Required"),
  quantity: yup.number().required("Quantity is Required"),
  sizes: yup.array().min(1, "At least one size is required"),
  tags: yup.array().min(1, "At least one tag is required"),
  color: yup.array().min(1, "Pick at least one color").required("Color is Required"),
});

const AddProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const getProductId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [tags, setTags] = useState([]);
  const [inputSize, setInputSize] = useState("");
  const [inputTag, setInputTag] = useState("");

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getColors());
  }, [dispatch]);

  const brandState = useSelector((state) => state.brand.brands);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const formik = useFormik({
    initialValues: {
      title: "",
      slug: "",
      shortDescription: "",
      description: "",
      mrp_price: "",
      selling_price: "",
      brand: "",
      category: "",
      quantity: "",
      sizes: [],
      tags: [],
      color: [],
      images: [],
      newarrivedproduct: "Inactive",
      trendingproduct: "Inactive",
      featuredproduct: "Inactive",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getProductId !== undefined) {
        const data = { id: getProductId, productData: values };
        dispatch(updateAProduct(data));
      } else {
        dispatch(createProducts(values));
        formik.resetForm();
        setColor([]);
        setSizes([]);
        setTags([]);
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  const handleSizeKeyDown = (event) => {
    if (event.key === "Enter" && inputSize) {
      setSizes([...sizes, inputSize]);
      setInputSize("");
      formik.setFieldValue("sizes", [...sizes, inputSize]);
    }
  };

  const handleTagKeyDown = (event) => {
    if (event.key === "Enter" && inputTag) {
      setTags([...tags, inputTag]);
      setInputTag("");
      formik.setFieldValue("tags", [...tags, inputTag]);
    }
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
    formik.setFieldValue("color", event.target.value);
  };

  const handleImageUpload = (acceptedFiles) => {
    dispatch(uploadImg(acceptedFiles));
  };

  const handleImageDelete = (public_id) => {
    dispatch(delImg(public_id));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {getProductId !== undefined ? "Edit" : "Add"} Product
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        {/* Product Title */}
        <TextField
          fullWidth
          label="Product Title"
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          margin="normal"
        />

        {/* Slug */}
        <TextField
          fullWidth
          label="Slug"
          name="slug"
          value={formik.values.slug}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.slug && Boolean(formik.errors.slug)}
          helperText={formik.touched.slug && formik.errors.slug}
          margin="normal"
        />

        {/* Short Description */}
        <TextField
          fullWidth
          label="Short Description"
          name="shortDescription"
          value={formik.values.shortDescription}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.shortDescription && Boolean(formik.errors.shortDescription)}
          helperText={formik.touched.shortDescription && formik.errors.shortDescription}
          margin="normal"
        />

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          margin="normal"
          multiline
          rows={4}
        />

        {/* MRP Price */}
        <TextField
          fullWidth
          label="MRP Price"
          name="mrp_price"
          type="number"
          value={formik.values.mrp_price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.mrp_price && Boolean(formik.errors.mrp_price)}
          helperText={formik.touched.mrp_price && formik.errors.mrp_price}
          margin="normal"
        />

        {/* Selling Price */}
        <TextField
          fullWidth
          label="Selling Price"
          name="selling_price"
          type="number"
          value={formik.values.selling_price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.selling_price && Boolean(formik.errors.selling_price)}
          helperText={formik.touched.selling_price && formik.errors.selling_price}
          margin="normal"
        />

        {/* Brand */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Brand</InputLabel>
          <Select
            name="brand"
            value={formik.values.brand}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.brand && Boolean(formik.errors.brand)}
          >
            {brandState.map((brand) => (
              <MenuItem key={brand._id} value={brand._id}>
                {brand.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Category */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.category && Boolean(formik.errors.category)}
          >
            {catState.map((category) => (
              <MenuItem key={category._id} value={category._id}>
                {category.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Quantity */}
        <TextField
          fullWidth
          label="Quantity"
          name="quantity"
          type="number"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.quantity && Boolean(formik.errors.quantity)}
          helperText={formik.touched.quantity && formik.errors.quantity}
          margin="normal"
        />

        {/* Sizes */}
        <TextField
          fullWidth
          label="Sizes"
          value={inputSize}
          onChange={(e) => setInputSize(e.target.value)}
          onKeyDown={handleSizeKeyDown}
          margin="normal"
          helperText="Press Enter to add a size"
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
          {sizes.map((size, index) => (
            <Chip key={index} label={size} onDelete={() => {
              const newSizes = sizes.filter((s, i) => i !== index);
              setSizes(newSizes);
              formik.setFieldValue("sizes", newSizes);
            }} />
          ))}
        </Box>

        {/* Tags */}
        <TextField
          fullWidth
          label="Tags"
          value={inputTag}
          onChange={(e) => setInputTag(e.target.value)}
          onKeyDown={handleTagKeyDown}
          margin="normal"
          helperText="Press Enter to add a tag"
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 2 }}>
          {tags.map((tag, index) => (
            <Chip key={index} label={tag} onDelete={() => {
              const newTags = tags.filter((t, i) => i !== index);
              setTags(newTags);
              formik.setFieldValue("tags", newTags);
            }} />
          ))}
        </Box>

        {/* Color */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Color</InputLabel>
          <Select
            multiple
            name="color"
            value={formik.values.color}
            onChange={handleColorChange}
            onBlur={formik.handleBlur}
            error={formik.touched.color && Boolean(formik.errors.color)}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => {
                  const colorObj = colorState.find((color) => color._id === value);
                  return (
                    <Box
                      key={value}
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: colorObj ? colorObj.title : 'transparent',
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                      }}
                    />
                  );
                })}
              </Box>
            )}
          >
            {colorState.map((color) => (
              <MenuItem key={color._id} value={color._id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box
                    sx={{
                      width: 20,
                      height: 20,
                      backgroundColor: color.title,
                      border: '1px solid #ccc',
                      borderRadius: '50%',
                    }}
                  />
                  <Typography>{color.title}</Typography>
                </Box>
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* New Arrived Product */}
        <FormControlLabel
          control={
            <Checkbox
              name="newarrivedproduct"
              checked={formik.values.newarrivedproduct === "Active"}
              onChange={(e) =>
                formik.setFieldValue("newarrivedproduct", e.target.checked ? "Active" : "Inactive")
              }
            />
          }
          label="New Arrived Product"
        />

        {/* Trending Product */}
        <FormControlLabel
          control={
            <Checkbox
              name="trendingproduct"
              checked={formik.values.trendingproduct === "Active"}
              onChange={(e) =>
                formik.setFieldValue("trendingproduct", e.target.checked ? "Active" : "Inactive")
              }
            />
          }
          label="Trending Product"
        />

        {/* Featured Product */}
        <FormControlLabel
          control={
            <Checkbox
              name="featuredproduct"
              checked={formik.values.featuredproduct === "Active"}
              onChange={(e) =>
                formik.setFieldValue("featuredproduct", e.target.checked ? "Active" : "Inactive")
              }
            />
          }
          label="Featured Product"
        />

        {/* Image Upload */}
        <Dropzone onDrop={handleImageUpload}>
          {({ getRootProps, getInputProps }) => (
            <Box {...getRootProps()} sx={{ border: "1px dashed grey", p: 2, mt: 2, textAlign: "center" }}>
              <input {...getInputProps()} />
              <Typography>Drag 'n' drop some images here, or click to select images</Typography>
            </Box>
          )}
        </Dropzone>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, mt: 2 }}>
          {imgState.map((image, index) => (
            <Box key={index} sx={{ position: "relative" }}>
              <Button
                sx={{ position: "absolute", top: 0, right: 0, color: "red" }}
                onClick={() => handleImageDelete(image.public_id)}
              >
                X
              </Button>
              <img src={image.url} alt={`uploaded-${index}`} width={100} height={100} />
            </Box>
          ))}
        </Box>

        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 3 }}>
          {getProductId !== undefined ? "Update" : "Add"} Product
        </Button>
      </form>
    </Box>
  );
};

export default AddProduct;