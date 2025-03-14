import { configureStore } from "@reduxjs/toolkit";

import StoryReducer from "../features/stories";
import dropDownReducer from "../features/dropdown";
import userReducer from "../features/users";
import loadingReducer from "../features/loading";

export const store = configureStore({
  reducer: {
    stories: StoryReducer,
    dropdown: dropDownReducer,
    users: userReducer,
    loading: loadingReducer,
  },
});
