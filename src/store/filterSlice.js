import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  form: "",
  engine: "",
  transmission: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,

  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },

    setForm(state, action) {
      state.form = action.payload;
    },

    setEngine(state, action) {
      state.engine = action.payload;
    },

    setTransmission(state, action) {
      state.transmission = action.payload;
    },

    resetFilters() {
      return { ...initialState };
    },
  },
});

export const {
  setLocation,
  setForm,
  setEngine,
  setTransmission,
  resetFilters,
} = filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;