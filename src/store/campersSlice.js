import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (page, thunkAPI) => {
    try {
      const response = await axios.get(`${API}?page=${page}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchFilteredCampers = createAsyncThunk(
  "campers/fetchFilteredCampers",
  async (filters, thunkAPI) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const response = await axios.get(`${API}?${query}`);
      return response.data;
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
  selectedCamper: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState: initialStateCampers,
  reducers: {
    loadMore: (state) => {
      state.page += 1;
    },
    resetCampers: (state) => {
      state.campers = [];
      state.page = 1;
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
        state.status = "succeeded";
        const items = Array.isArray(action.payload)
          ? action.payload
          : (action.payload?.items ?? []);
        state.campers = [...state.campers, ...items];
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
        state.status = "succeeded";
        const items = Array.isArray(action.payload)
          ? action.payload
          : (action.payload?.items ?? []);
        state.campers = items;
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
