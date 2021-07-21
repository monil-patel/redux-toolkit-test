import "./App.css";

import * as React from "react";

import { DefaultButton, TextField } from "@fluentui/react";
import {
  collectionChanged,
  searchValue,
  searchValueUpdated,
  selectedCollection,
} from "./slices/viewOptionsSlice";
import { useAppDispatch, useAppSelector } from "./app/hooks";

import { Counter } from "./features/counter/Counter";
import logo from "./logo.svg";

function App() {
  const collectionText = useAppSelector(selectedCollection);
  const searchText = useAppSelector(searchValue);
  const dispatch = useAppDispatch();

  return (
    <div className="App">
      <TextField
        value={collectionText}
        onChange={(event, newValue) =>
          dispatch(collectionChanged(newValue ?? ""))
        }
      />
      <TextField
        value={searchText}
        onChange={(event, newValue) =>
          dispatch(searchValueUpdated(newValue ?? ""))
        }
      />
    </div>
  );
}

export default App;
