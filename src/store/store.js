import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../pages/MyPage/UserInformationSlice";
import lastTourReducer from "../pages/MyPage/LastTourSlice";

export const store = configureStore({
  reducer: {
    // language: languageReducer,
    // auth: authReducer,
    user: userReducer,
    lastTour: lastTourReducer,
  },
});
