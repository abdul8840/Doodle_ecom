import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { addressService } from "./addressService";
import { toast } from "react-toastify";

export const createAddress = createAsyncThunk(
  "user/address/add",
  async (addressData, thunkAPI) => {
    try {
      return await addressService.createAddress(addressData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const getCustomerfromLocalStorage = localStorage.getItem("customer")
  ? JSON.parse(localStorage.getItem("customer"))
  : null;

const addressState = {
  address: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const addressSlice = createSlice({
  name: "address",
  initialState: addressState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdAddress = action.payload; // Assign to createdAddress
      })
      .addCase(createAddress.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => addressState);
  },
});

export default addressSlice.reducer;
