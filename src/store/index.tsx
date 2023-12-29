import { configureStore } from "@reduxjs/toolkit";
import globalSlice from "./globalStatus/globalSlice";

const store = configureStore({
  reducer: {
    global: globalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;
