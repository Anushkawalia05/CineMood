import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { searchMovies } from "../../services/movieApi";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (query, { rejectWithValue, signal }) => {
    try {
      return await searchMovies(query, { signal });
    } catch (error) {
      if (signal.aborted) throw error;
      return rejectWithValue(error.message || "Could not load movies.");
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    activeQuery: "",
    currentRequestId: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
        state.activeQuery = action.meta.arg;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        if (action.meta.requestId !== state.currentRequestId) return;
        state.status = "succeeded";
        state.items = action.payload;
        state.currentRequestId = null;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        if (action.meta.aborted || action.meta.requestId !== state.currentRequestId) return;
        state.status = "failed";
        state.error = action.payload || action.error.message || "Could not load movies.";
        state.currentRequestId = null;
      });
  }
});

export default moviesSlice.reducer;
