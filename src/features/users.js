import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { startLoading, stopLoading } from "./loading";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("users"));
      const response = await axiosInstance.get("/users");
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response?.data || "Error fetching users");
    } finally {
      dispatch(stopLoading("users"));
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
  },
  reducers: {
    storiesList(state, action) {
      state.users = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {})
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.data;
        ("action.payload.data:", action.payload.data);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
