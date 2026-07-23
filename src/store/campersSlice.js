import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";
const PAGE_LIMIT = 4;

const getItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  return [];
};

const getUniqueItems = (items) => {
  const uniqueItems = new Map();

  items.forEach((item) => {
    if (item?.id !== undefined && item?.id !== null) {
      uniqueItems.set(String(item.id), item);
    }
  });

  return Array.from(uniqueItems.values());
};

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get(API, {
        params: {
          page,
          limit: PAGE_LIMIT,
        },
      });

      return {
        data: response.data,
        page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredCampers = createAsyncThunk(
  "campers/fetchFilteredCampers",
  async ({ filters, page }, thunkAPI) => {
    try {
      const response = await axios.get(API, {
        params: {
          ...filters,
          page,
          limit: PAGE_LIMIT,
        },
      });

      return {
        data: response.data,
        page,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCamperDetailsById = createAsyncThunk(
  "campers/fetchCamperDetailsById",
  async (camperId, thunkAPI) => {
    try {
      const response = await axios.get(`${API}/${camperId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialStateCampers = {
  campers: [],
  status: "idle",
  error: null,
  page: 1,
  hasMore: true,
  selectedCamper: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState: initialStateCampers,

  reducers: {
    loadMore: (state) => {
      if (state.status !== "loading" && state.hasMore) {
        state.page += 1;
      }
    },

    resetCampers: (state) => {
      state.campers = [];
      state.page = 1;
      state.hasMore = true;
      state.status = "idle";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        const { data, page } = action.payload;

        const incomingItems = getUniqueItems(getItems(data));
        const currentItems = getUniqueItems(state.campers);

        if (page === 1) {
          state.campers = incomingItems;
          state.hasMore = incomingItems.length === PAGE_LIMIT;
        } else {
          const currentIds = new Set(
            currentItems.map((camper) => String(camper.id))
          );

          const newItems = incomingItems.filter(
            (camper) => !currentIds.has(String(camper.id))
          );

          state.campers = [...currentItems, ...newItems];

          state.hasMore =
            incomingItems.length === PAGE_LIMIT && newItems.length > 0;
        }

        state.page = page;
        state.status = "succeeded";
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(fetchFilteredCampers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchFilteredCampers.fulfilled, (state, action) => {
        const { data, page } = action.payload;

        const incomingItems = getUniqueItems(getItems(data));
        const currentItems = getUniqueItems(state.campers);

        if (page === 1) {
          state.campers = incomingItems;
          state.hasMore = incomingItems.length === PAGE_LIMIT;
        } else {
          const currentIds = new Set(
            currentItems.map((camper) => String(camper.id))
          );

          const newItems = incomingItems.filter(
            (camper) => !currentIds.has(String(camper.id))
          );

          state.campers = [...currentItems, ...newItems];

          state.hasMore =
            incomingItems.length === PAGE_LIMIT && newItems.length > 0;
        }

        state.page = page;
        state.status = "succeeded";
      })
      .addCase(fetchFilteredCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      .addCase(fetchCamperDetailsById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchCamperDetailsById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCamper = action.payload;
      })
      .addCase(fetchCamperDetailsById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { loadMore, resetCampers } = campersSlice.actions;
export const campersReducer = campersSlice.reducer;