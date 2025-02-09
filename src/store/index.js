import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import postSlice from "./postSlice";
import notificationSlice from "./notificationSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    posts: postSlice.reducer,
    notifications: notificationSlice.reducer,
  },
});

export default store;
