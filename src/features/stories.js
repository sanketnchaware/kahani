import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";

export const fetchStories = createAsyncThunk(
  "stories/fetchStories",
  async () => {
    const response = await axiosInstance.get("/stories");
    return response.data;
  }
);

const storySlice = createSlice({
  name: "stories",
  initialState: {
    stories: [],
  },
  reducers: {
    storiesList(state, action) {
      state.stories = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {})
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.stories = action.payload.stories;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default storySlice.reducer;
