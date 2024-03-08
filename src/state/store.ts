import { configureStore } from "@reduxjs/toolkit";
import currencySlice from "./currency/currencySlice";
export const store = configureStore({
  reducer: {
    currencySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
