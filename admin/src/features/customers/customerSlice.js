import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerServices";

export const getUsers = createAsyncThunk(
  "customer/get-customers",
  async (thunkAPI) => {
    try {
      return await customerService.getUsers();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteUsers = createAsyncThunk(
  "customer/delete-customer",
  async (userId, thunkAPI) => { // Accept userId as a parameter
    try {
      return await customerService.deleteUsers(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const makeAdmin = createAsyncThunk(
  "customer/make-admin",
  async (userId, thunkAPI) => {
    try {
      return await customerService.makeAdmin(userId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  customers: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const customerSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(deleteUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(makeAdmin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(makeAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.customers = state.customers.map(user =>
          user._id === action.payload._id ? action.payload : user
        );
      })
      .addCase(makeAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});
export default customerSlice.reducer;
