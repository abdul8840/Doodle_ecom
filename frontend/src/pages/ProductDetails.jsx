import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAProduct, getAllProducts, addRating, addToWishlist } from "../features/products/productSlice";
import { getuserProductWishlist } from "../features/user/userSlice";
import { Container, Grid, Typography, Box, Button, IconButton, Alert, TextField, Avatar } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addProdToCart, getUserCart } from "../features/user/userSlice";
import ReactStars from "react-rating-stars-component";

const ProductDetails = () => {
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({ display: "none" });
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showDescription, setShowDescription] = useState(false);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [orderedProduct, setorderedProduct] = useState(true);
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getProductId = location.pathname.split("/")[2];

  const productState = useSelector((state) => state?.product?.singleproduct);
  const wishlistFromRedux = useSelector((state) => state?.auth?.wishlist?.wishlist) || [];
  const [wishlist, setWishlist] = useState([]);
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

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, [cartState, getProductId]);

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

  useEffect(() => {
    setWishlist(wishlistFromRedux);
  }, [wishlistFromRedux]);

  const isInWishlist = wishlist.some((wishItem) => wishItem._id === productState?._id);

  const toggleWishlist = () => {
    if (!productState?._id) return;

    dispatch(addToWishlist(productState._id));
    
    // **Optimistic UI Update**
    setWishlist((prevWishlist) => {
      const alreadyInWishlist = prevWishlist.some((wishItem) => wishItem._id === productState._id);
      if (alreadyInWishlist) {
        toast.info("Product removed from wishlist");
        return prevWishlist.filter((wishItem) => wishItem._id !== productState._id);
      } else {
        toast.success("Product added to wishlist");
        return [...prevWishlist, productState]; // Add product locally
      }
    });
  };

  const calculateTotalRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((sum, rating) => sum + rating.star, 0);
    return (total / ratings.length).toFixed(1);
  };

  const totalRating = calculateTotalRating(productState?.ratings);

  const addRatingToProduct = () => {
    if (star === 0) {
      toast.error("Please add star rating");
      return false;
    } else if (comment === "") {
      toast.error("Please Write Review About the Product");
      return false;
    } else {
      dispatch(addRating({ star: star, comment: comment, prodId: getProductId }))
        .then(() => {
          dispatch(getAProduct(getProductId)); // Fetch the product again to update the state
          setStar(0); // Reset star rating
          setComment(""); // Reset comment
        });
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
              <div className="border-b-2 py-3">
                <div className="flex items-center gap-10">
                  <div className="flex gap-2 items-center justify-center">
                    <p className="">({totalRating}/5)</p>
                    <ReactStars
                      count={5}
                      size={24}
                      value={productState?.totalrating.toString()} // Convert to number
                      edit={false}
                      activeColor="#ffd700"
                    />
                  </div>
                  <p className="mb-0 text-[12px]">
                    ( {productState?.ratings?.length} Reviews )
                  </p>
                </div>
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
                <strong>Tags:</strong> {productState?.tags}
              </Typography>
              <Typography variant="body1">
                <strong>In Stock:</strong> {productState?.quantity}
              </Typography>
            </div>

            <Box className="flex items-center mt-4">
              <strong>Add To Wishlist:</strong>
              <IconButton onClick={toggleWishlist} color="primary">
                {isInWishlist ? (
                  <AiFillHeart className="text-red-500 text-2xl" />
                ) : (
                  <AiOutlineHeart className="text-gray-500 text-2xl" />
                )}
              </IconButton>
            </Box>

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

      {/* Reviews Section */}
      <Container className="reviews-wrapper home-wrapper-2 mt-10">
        <Box className="row">
          <div id="review" className="col-12">
            <h3 id="review">Reviews</h3>
            <div className="review-inner-wrapper bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between align-items-end border-b-2 pb-4">
                <div>
                  <h4 className="font-semibold text-xl mb-2">Customer Reviews</h4>
                  <div className="flex items-center gap-10">
                    <ReactStars
                      count={5}
                      size={24}
                      value={parseFloat(totalRating)} // Convert to number
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0">
                      Based on {productState?.ratings?.length} Reviews
                    </p>
                  </div>
                </div>
                {orderedProduct && (
                  <div>
                    <a className="text-dark text-decoration-underline" href="">
                      Write a Review
                    </a>
                  </div>
                )}
              </div>
              <div className="review-form py-4">
                <h4 className="font-semibold text-xl">Write a Review</h4>

                <div>
                  <ReactStars
                    count={5}
                    size={24}
                    value={star}
                    edit={true}
                    activeColor="#ffd700"
                    onChange={(newRating) => setStar(newRating)}
                    classNames="mb-3"
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    placeholder="Comments"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </div>
                <div className="d-flex justify-content-end mt-3">
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={addRatingToProduct}
                  >
                    Submit Review
                  </Button>
                </div>
              </div>
              <div className="reviews mt-4">
                {productState &&
                  productState.ratings?.map((item, index) => {
                    return (
                      <div className="review mb-4 p-3 bg-gray-100 rounded-lg" key={index}>
                        <div className="d-flex gap-10 align-items-center">
                          <div className="flex items-center gap-2">
                            <h6 className="mb-0">
                              {item?.postedby?.firstname || "Anonymous"} {item?.postedby?.lastname || ""}
                            </h6>
                          </div>
                          <ReactStars
                            count={5}
                            size={24}
                            value={item?.star}
                            edit={false}
                            activeColor="#ffd700"
                          />
                        </div>
                        <p className="mt-3">{item?.comment}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </Container>
  );
};

export default ProductDetails;