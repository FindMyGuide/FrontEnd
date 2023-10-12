import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const upComingTourSlice = createSlice({
  name: "upComingTour",
  initialState,
  reducers: {
    setUpComingTour: (state, action) => {
      return action.payload;
    },
  },
});

export const { setUpComingTour } = upComingTourSlice.actions;

export default upComingTourSlice.reducer;
