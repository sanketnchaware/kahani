import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
});

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
        console.log("action.payload.data:", action.payload.data);
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
