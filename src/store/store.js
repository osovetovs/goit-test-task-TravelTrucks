import { configureStore } from "@reduxjs/toolkit";
import { campersReducer } from "./campersSlice";
import { filtersReducer } from "./filterSlice";
import { favoritesReducer } from "./favoritesSlice";

const FAVORITES_KEY = "traveltrucks_favorites_v1";

function loadFavoritesState() {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY);
    if (!raw) return undefined;

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return undefined;

    return { favorites: { ids: parsed } };
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    campers: campersReducer,
    filters: filtersReducer,
    favorites: favoritesReducer,
  },
  preloadedState: loadFavoritesState(),
});

store.subscribe(() => {
  try {
    const ids = store.getState().favorites?.ids ?? [];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  } catch {
    // ignore write failures
  }
});

export default store;
