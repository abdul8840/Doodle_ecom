import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist } from "../features/products/productSlice";
import { getuserProductWishlist } from "../features/user/userSlice";
import { Container, Grid, Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";


const Wishlist = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getuserProductWishlist());
  }, [dispatch]);

  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);

  const removeFromWishlist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getuserProductWishlist());
    }, 300);
  };

  return (
    <Container maxWidth="lg" className="py-8 px-4">
      <Typography variant="h4" className="text-center font-bold mb-6 text-gray-800">
        Wishlist
      </Typography>
      {wishlistState && wishlistState.length === 0 ? (
        <Typography variant="h6" className="text-center text-gray-600">No items in Wishlist</Typography>
      ) : (
        <Grid container spacing={3}>
          {wishlistState?.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item?._id}>
              <Card className="relative shadow-lg rounded-lg overflow-hidden">
                <IconButton
                  className="absolute top-2 right-2 bg-white shadow-md hover:bg-gray-200"
                  onClick={() => removeFromWishlist(item?._id)}
                >
                  <Close className="text-red-500" />
                </IconButton>
                <CardMedia
                  component="img"
                  height="200"
                  image={item?.images?.[0]?.url || "images/watch.jpg"}
                  alt={item?.title}
                  className="object-cover w-full"
                />
                <CardContent className="p-4">
                  <Typography variant="h6" className="font-semibold">
                    {item?.title}
                  </Typography>
                  <Typography variant="body1" className="text-gray-700">
                    Rs. {item?.selling_price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Wishlist;
