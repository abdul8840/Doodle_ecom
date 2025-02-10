import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAProduct, getAllProducts, addToWishlist } from "../features/products/productSlice";
import { getuserProductWishlist } from "../features/user/userSlice";
import { Container, Grid, Typography, Box, Button, IconButton, Alert } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addProdToCart, getUserCart } from "../features/user/userSlice";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showDescription, setShowDescription] = useState(false); // Toggle state for description
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getProductId = location.pathname.split("/")[2];

  const productState = useSelector((state) => state?.product?.singleproduct);
  const wishlistFromRedux = useSelector((state) => state?.auth?.wishlist?.wishlist) || [];
  const [wishlist, setWishlist] = useState([]);
  //cart
  const cartState = useSelector((state) => state?.auth?.cartProducts);

  useEffect(() => {
    dispatch(getAProduct(getProductId));
    dispatch(getAllProducts());
    dispatch(getUserCart());
    dispatch(getuserProductWishlist());
  }, [dispatch, getProductId]);

  useEffect(() => {
    if (productState?.images?.length > 0) {
      setSelectedImage(productState.images[0].url);
    }
  }, [productState]);

  //handle cart
  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  });

  const uploadCart = () => {
    if (selectedColor === null) {
      setShowAlert(true);
      toast.error("Please choose Color");
    } else if (selectedSize === null) {
      setShowAlert(true);
      toast.error("Please choose Size");
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          quantity: 1,
          color: selectedColor,
          selling_price: productState?.selling_price,
          size: selectedSize,
        })
      );
      navigate("/cart");
    }
  };

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
      backgroundSize: "200% 200%",
      backgroundPosition: `${x}% ${y}%`,
    });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: "none" });
  };

  const isInWishlist = wishlist.some((wishItem) => wishItem._id === productState._id);

  const toggleWishlist = () => {
    if (!productState?._id) return;

    const alreadyInWishlist = wishlist.some((wishItem) => wishItem._id === productState._id);

    dispatch(addToWishlist(productState._id));

    if (alreadyInWishlist) {
      toast.info("Product successfully removed from wishlist");
    } else {
      toast.success("Product successfully added to wishlist");
    }
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
        <Grid item xs={12} md={6}>
          <Box className="main-product-details">
            <Typography className="!text-2xl !font-bold">{productState?.title}</Typography>
            <Typography className="!text-md !text-gray-600 !font-bold !mt-2">{productState?.shortDescription}</Typography>
            <Typography className="!my-2">
              <div className="flex gap-4 items-baseline">
                <h2 className="text-2xl text-blue-600 font-[600]">₹ {productState?.selling_price}</h2>
                <h2 className="text-xl text-gray-600 font-[600] line-through">₹ {productState?.mrp_price}</h2>
                <h2 className="text-xl text-green-600 font-[600]">
                  {Math.round(((productState?.mrp_price - productState?.selling_price) / productState?.mrp_price) * 100)}% Off
                </h2>
              </div>
            </Typography>
            <div className="flex flex-col gap-2 mt-10">
              <Typography variant="body1">
                <strong>Category:</strong> {productState?.category}
              </Typography>
              <Typography variant="body1">
                <strong>Brand:</strong> {productState?.brand}
              </Typography>
              <Typography variant="body1">
                <strong>Category:</strong> {productState?.category}
              </Typography>
              <Typography variant="body1">
                <strong>Tags:</strong> {productState?.tags}
              </Typography>
              <Typography variant="body1">
                <strong>In Stock:</strong> {productState?.quantity}
              </Typography>
            </div>

            <Box className="flex items-center mt-4">
              {/* Wishlist Button */}
              <strong>Add To Wishlist:</strong>
              <IconButton onClick={toggleWishlist} color="primary">
                {isInWishlist ? (
                  <AiFillHeart className="text-red-500 text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-gray-500 text-2xl" />
                )}
              </IconButton>
            </Box>

            {/* Size Selection */}
            <Box className="mt-4">
              <Typography variant="body1"><strong>Select Size:</strong></Typography>
              <Box className="flex gap-2 mt-2">
                {productState?.sizes?.map((size, index) => (
                  <Button
                    key={index}
                    variant={selectedSize === size ? "contained" : "outlined"}
                    onClick={() => setSelectedSize(size)}
                    className="!p-2 !text-lg"
                  >
                    {size}
                  </Button>
                ))}
              </Box>
            </Box>

            {/* Color Selection */}
            <Box className="mt-4">
              <Typography variant="body1"><strong>Select Color:</strong></Typography>
              <Box className="flex gap-2 mt-2">
                {productState?.color?.map((color, index) => (
                  <Box
                    key={index}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    onClick={() => setSelectedColor(color._id)}
                    style={{
                      backgroundColor: color.title,
                      border: selectedColor === color._id ? "3px solid black" : "none",
                    }}
                  ></Box>
                ))}
              </Box>
            </Box>

            {/* Add to Cart Button */}
            <Button
              variant="contained"
              color="primary"
              className="!mt-6 !p-3 !text-lg"
              onClick={() => {
                alreadyAdded ? navigate("/cart") : uploadCart();
              }}
            >
              {alreadyAdded ? "Go to Cart" : "Add to Cart"}
            </Button>

            {showAlert && ( 
              <Alert severity="error" className="mt-2">
                Please select color and size
              </Alert>
            )}

            {/* Product Description Toggle */}
            <Box className="mt-6">
              <Typography
                className="cursor-pointer text-lg font-bold text-blue-600"
                onClick={() => setShowDescription(!showDescription)}
              >
                Product Description {showDescription ? "▲" : "▼"}
              </Typography>

              <AnimatePresence>
                {showDescription && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="mt-2 bg-gray-100 p-4 rounded-lg"
                  >
                    <div dangerouslySetInnerHTML={{ __html: productState?.description }} />
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetails;