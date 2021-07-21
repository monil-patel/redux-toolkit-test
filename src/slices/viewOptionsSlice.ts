import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { RootState } from "../app/store";

// Define a type for the slice state
interface ViewOptionsState {
  selectedCollection: string;
  searchValue: string;
  scopeValue: string;
}

// Define the initial state using that type
const initialState: ViewOptionsState = {
  selectedCollection: "",
  searchValue: "",
  scopeValue: "",
};

export const viewOptionsSlice = createSlice({
  name: "viewOption",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    collectionChanged: (state, action: PayloadAction<string>) => {
      state.selectedCollection = action.payload;
    },
    searchValueUpdated: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    scopeValueUpdated: (state, action: PayloadAction<string>) => {
      state.scopeValue = action.payload;
    },
  },
});

export const { collectionChanged, searchValueUpdated, scopeValueUpdated } =
  viewOptionsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectedCollection = (state: RootState) =>
  state.viewOptions.selectedCollection;
export const searchValue = (state: RootState) => state.viewOptions.searchValue;
export const scopeValue = (state: RootState) => state.viewOptions.scopeValue;

export default viewOptionsSlice.reducer;
