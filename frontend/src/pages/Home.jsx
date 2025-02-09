import React, { useEffect, useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, addToWishlist } from "../features/products/productSlice";
import { getuserProductWishlist } from "../features/user/userSlice"; // Import wishlist action
import { Card, CardContent, CardMedia, Typography, Button, IconButton } from "@mui/material";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const productState = useSelector((state) => state?.product?.product);
  const wishlistFromRedux = useSelector((state) => state?.auth?.wishlist?.wishlist) || [];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Local state to store wishlist for real-time UI updates
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getuserProductWishlist());
  }, [dispatch]);

  useEffect(() => {
    setWishlist(wishlistFromRedux); // Sync Redux state with local state
  }, [wishlistFromRedux]);

  const toggleWishlist = async (id) => {
    const isInWishlist = wishlist.some((wishItem) => wishItem._id === id);

    await dispatch(addToWishlist(id)); 

    // Update local state immediately for real-time UI update
    setWishlist((prevWishlist) => {
      if (isInWishlist) {
        return prevWishlist.filter((wishItem) => wishItem._id !== id);
      } else {
        return [...prevWishlist, { _id: id }];
      }
    });

    toast[isInWishlist ? "info" : "success"](
      `Product successfully ${isInWishlist ? "removed from" : "added to"} wishlist`
    );
  };

  return (
    <section className="popular-wrapper py-10 bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <h3 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Our Popular Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {productState &&
            productState.map((item, index) => {
              const isInWishlist = wishlist.some((wishItem) => wishItem._id === item?._id);
              return (
                <Card
                  key={index}
                  className="shadow-lg rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300"
                >
                  <div className="relative">
                    <CardMedia
                      component="img"
                      height="250"
                      image={item?.images[0]?.url}
                      alt="product image"
                      className="cursor-pointer"
                      onClick={() => navigate("/product/" + item?._id)}
                    />
                    <div className="absolute top-3 right-3">
                      <IconButton onClick={() => toggleWishlist(item?._id)} color="primary">
                        {isInWishlist ? <AiFillHeart className="text-red-500 text-xl" /> : <AiOutlineHeart className="text-gray-500 text-xl" />}
                      </IconButton>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <Typography variant="subtitle2" color="textSecondary" className="text-gray-600">
                      {item?.brand}
                    </Typography>
                    <Typography
                      variant="h6"
                      className="font-semibold text-gray-800 cursor-pointer hover:text-blue-500"
                      onClick={() => navigate("/product/" + item?._id)}
                    >
                      {item?.title?.length > 50 ? item?.title.substr(0, 50) + "..." : item?.title}
                    </Typography>
                    <div className="flex gap-5 my-2">
                      <Typography variant="h6" color="primary" className="mt-2">
                        Rs. {item?.selling_price}
                      </Typography>
                      <Typography variant="h6" color="primary" className="mt-2 line-through !text-red-600">
                        Rs. {item?.mrp_price}
                      </Typography>
                      <Typography variant="h6" color="primary" className="mt-2 !text-green-600">
                        {Math.round(((item?.mrp_price - item?.selling_price) / item?.mrp_price) * 100)}% OFF
                      </Typography>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      className="mt-3"
                      onClick={() => navigate("/product/" + item?._id)}
                    >
                      View Product
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </section>
  );
};

export default Home;
