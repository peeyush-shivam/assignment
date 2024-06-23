import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ReactFlowProvider } from "reactflow";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ReactFlowProvider>
    <Provider store={store}>
      <Toaster />
      <App />
    </Provider>
  </ReactFlowProvider>
);
