import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { store } from "@redux/store/store";

// ⬇️ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <>
        <App />
        {/* Chỉ cần 1 container toàn cục */}
        <ToastContainer autoClose={2000} />
      </>
    </Provider>
  </React.StrictMode>
);
