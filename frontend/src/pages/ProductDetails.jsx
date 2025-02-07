import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAProduct, getAllProducts } from "../features/products/productSlice";
import { Container, Grid, Typography, Box } from "@mui/material";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });

  const location = useLocation();
  const dispatch = useDispatch();
  const getProductId = location.pathname.split("/")[2];

  const productState = useSelector((state) => state?.product?.singleproduct);

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getAllProducts());
  }, [dispatch, getProductId]);

  useEffect(() => {
    if (productState?.images?.length > 0) {
      setSelectedImage(productState.images[0].url);
    }
  }, [productState]);

  // Handle mouse movement for zoom effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;

    setZoomStyle({
      display: "block",
      left: `${e.clientX - left - 100}px`,
      top: `${e.clientY - top - 100}px`,
      backgroundImage: `url(${selectedImage})`,
      backgroundSize: "200% 200%", // Adjust zoom level
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  return (
    <Container className="py-5">
      <Grid container spacing={1} className="!mt-10 !p-10 bg-gray-50 shadow-xl rounded-2xl">
        {/* Left side (Images) */}
        <Grid item xs={12} md={6} className="">
          <Box className="image-container">
            <img
              src={selectedImage}
              className="main-image"
              alt="Product"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            />
            <div className="zoom-box" style={zoomStyle}></div>
          </Box>

          <Box className="other-product-images flex gap-2 mt-4">
            {productState?.images?.map((item, index) => (
              <img
                key={index}
                src={item?.url}
                className="img-fluid"
                alt={`Product ${index}`}
                style={{
                  width: "100px",
                  height: "100px",
                  cursor: "pointer",
                  border: selectedImage === item.url ? "2px solid #000" : "none",
                  padding: "2px",
                }}
                onClick={() => setSelectedImage(item.url)}
              />
            ))}
          </Box>
        </Grid>

        {/* Right side (Details) */}
        <Grid item xs={12} md={6} className="">
          <Box className="main-product-details !px-3">
            <Typography className="!text-2xl !font-bold">{productState?.title}</Typography>
            <Typography className="!my-2">
              <div className="flex gap-4 items-baseline">
              <h2 className="text-2xl text-blue-600 font-[600]">₹ {productState?.selling_price}</h2>
              <h2 className="text-xl text-gray-600 font-[600] line-through">₹ {productState?.mrp_price}</h2>
              <h2 className="text-xl text-green-600 font-[600]">{Math.round(((productState?.mrp_price - productState?.selling_price) / productState?.mrp_price) * 100)}% Off</h2>
              </div>
            </Typography>
            <Typography variant="body1">
              <strong>Category:</strong> {productState?.category}
            </Typography>
            <Typography variant="body1">
              <strong>Brand:</strong> {productState?.brand}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;
