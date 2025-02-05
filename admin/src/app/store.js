import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customerReducer from "../features/customers/customerSlice";
import pCategoryReducer from "../features/pcategory/categorySlice";
import brandReducer from "../features/brand/brandSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    customer: customerReducer,
    pCategory: pCategoryReducer,
    brand: brandReducer,
  },
});
