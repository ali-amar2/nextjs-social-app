import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./features/user.slice";
import { postReducer } from "./features/post.slice";
export const store = configureStore({
  reducer: {
    userReducer,
    postReducer,
  },
});

type appStore = typeof store;
export type RootState = ReturnType<appStore["getState"]>;
export type appDispatch = appStore["dispatch"];
