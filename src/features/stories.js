import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axiosInstance";
import { startLoading, stopLoading } from "./loading";

export const fetchStories = createAsyncThunk(
  "stories/fetchStories",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(startLoading("stories"));
      const response = await axiosInstance.get("/stories");
      return response.data;
    } catch (error) {
      return rejectWithValue(err.response?.data || "Error fetching stories");
    } finally {
      dispatch(stopLoading("stories"));
    }
  }
);

const storySlice = createSlice({
  name: "stories",
  initialState: {
    stories: [],
    storyListLoading: false,
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
