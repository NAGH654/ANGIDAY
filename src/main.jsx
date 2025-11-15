import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import { store } from "@redux/store/store";
import { loadFromStorage } from "@redux/features/authSlice";

// ⬇️ Toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";

store.dispatch(loadFromStorage());

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <>
        <App />
        {/* Toastify (đang dùng ở vài nơi cũ) */}
        <ToastContainer autoClose={2000} />
        {/* react-hot-toast (dành cho các trang mới) */}
        <Toaster position="top-right" toastOptions={{ duration: 2500 }} />
      </>
    </Provider>
  </React.StrictMode>
);
