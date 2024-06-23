import { configureStore } from "@reduxjs/toolkit";
import flowDataSlice from "./flowDataSlice";

const store = configureStore({
  reducer: {
    flowData: flowDataSlice, // store for handling state of our application
  },
});

export default store;
