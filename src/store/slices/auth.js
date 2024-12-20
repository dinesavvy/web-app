// features/dataSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/functions/axiosInstance";

// Define an initial state
const initialState = {
  data: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching data
export const handleLogin = createAsyncThunk(
  "data/postData",
  async ({ endPoint, payload }, { rejectWithValue }) => {
    try {
      const response = await api.post(endPoint, payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || "Something went wrong");
    }
  }
);

// Create a slice
const dataSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(handleLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(handleLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export the reducer
export default dataSlice.reducer;
