import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { UserProvider } from "./Context/userContext.jsx";
import { LoaderProvider } from "./Context/loaderContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UserProvider>
      <LoaderProvider>
        <App />
      </LoaderProvider>
    </UserProvider>
  </Provider>
);
