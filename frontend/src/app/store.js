import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/user/userSlice";
import productReducer from "../features/products/productSlice";
import addressReducer from "../features/address/addressSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    address: addressReducer
  },
});
