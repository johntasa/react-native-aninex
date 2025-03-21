import { configureStore } from "@reduxjs/toolkit";
import animeReducer from "./animeSlice";

const store = configureStore({
  reducer: {
    anime: animeReducer,
  },
});

export const RootState = store.getState;
export const AppDispatch = store.dispatch;

export default store;