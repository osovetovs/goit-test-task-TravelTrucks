import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: { ids: [] },
  reducers: {
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const idx = state.ids.indexOf(id);
      if (idx >= 0) state.ids.splice(idx, 1);
      else state.ids.push(id);
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export const favoritesReducer = favoritesSlice.reducer;
