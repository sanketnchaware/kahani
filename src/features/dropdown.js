import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchCategoryDropdown = createAsyncThunk(
  "dropdown/fetchCategoryDropdown",
  async () => {
    const response = await axiosInstance.get("/categories/dropdown");
    return response.data;
  }
);

const dropdownSlice = createSlice({
  name: "dropdown",
  initialState: {
    categories: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryDropdown.pending, (state) => {})
      .addCase(fetchCategoryDropdown.fulfilled, (state, action) => {
        console.log("action:", action.payload);
        state.categories = action.payload.data;
      })
      .addCase(fetchCategoryDropdown.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default dropdownSlice.reducer;
