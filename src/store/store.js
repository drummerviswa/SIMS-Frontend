import { configureStore } from "@reduxjs/toolkit";

//Reducers
import exampleReducer from "../slices/example.slice";

export default configureStore({
  reducer: {
    counter: exampleReducer,
  },
});
