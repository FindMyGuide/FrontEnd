import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/UserInformationSlice";
import lastTourReducer from "../slices/LastTourSlice";
import upComingTourReducer from "../slices/UpcomingTourSlice";

export const store = configureStore({
  reducer: {
    // language: languageReducer,
    // auth: authReducer,
    user: userReducer,
    lastTour: lastTourReducer,
    upComingTour: upComingTourReducer,
  },
});
