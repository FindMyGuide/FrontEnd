import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slices/UserInformationSlice";
import lastTourReducer from "../slices/LastTourSlice";

export const store = configureStore({
  reducer: {
    // language: languageReducer,
    // auth: authReducer,
    user: userReducer,
    lastTour: lastTourReducer,
  },
});
