import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  AC: false,
  Automatic: false,
  Kitchen: false,
  TV: false,
  Bathroom: false,
  vehicleType: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    toggleFilter(state, action) {
      const key = action.payload;
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        state[key] = !state[key];
      }
    },
    setVehicleType(state, action) {
      state.vehicleType = action.payload;
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const { setLocation, toggleFilter, setVehicleType, resetFilters } =
  filtersSlice.actions;

export const filtersReducer = filtersSlice.reducer;
