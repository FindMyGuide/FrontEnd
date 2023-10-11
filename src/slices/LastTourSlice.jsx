import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const lastTourSlice = createSlice({
  name: "lastTour",
  initialState,
  reducers: {
    setLastTour: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLastTour } = lastTourSlice.actions;

export default lastTourSlice.reducer;
