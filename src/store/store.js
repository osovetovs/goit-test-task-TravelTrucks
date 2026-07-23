import { configureStore } from "@reduxjs/toolkit";

import { campersReducer } from "./campersSlice";
import { filtersReducer } from "./filterSlice";

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
  },
});