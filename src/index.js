import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

import { Provider } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "components/Chat/context/AuthContext";
import { ChatContextProvider } from "components/Chat/context/ChatContext";
// 리덕스 상태 유지를 위한 persist store
// import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <AuthContextProvider>
    <ChatContextProvider>
      <BrowserRouter>
        <Provider store={store}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <App />
        </Provider>
        {/* </PersistGate> */}
      </BrowserRouter>
    </ChatContextProvider>
  </AuthContextProvider>
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
