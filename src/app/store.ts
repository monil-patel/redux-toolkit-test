import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";

import counterReducer from "../features/counter/counterSlice";
import viewOptionsSlice from "../slices/viewOptionsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    viewOptions: viewOptionsSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
