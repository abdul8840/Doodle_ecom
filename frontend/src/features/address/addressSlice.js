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

export const getUserAddress = createAsyncThunk(
  "user/address/get",
  async (_, thunkAPI) => {
    try {
      return await addressService.getUserAddress();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateAAddress = createAsyncThunk(
  "user/address/update",
  async (data, thunkAPI) => {
    try {
      return await addressService.updateAddress(data);
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
      .addCase(getUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addresses = action.payload;
      })
      .addCase(getUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateAAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateAddress = action.payload;
        
      })
      .addCase(updateAAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          toast.error("Something Went Wrong!");
        }
      })
      .addCase(resetState, () => addressState);
  },
});

export default addressSlice.reducer;
