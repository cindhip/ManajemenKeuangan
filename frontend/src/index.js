import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { GlobalProvider } from "./context/globalContext";
import { GlobalStyle } from "./styles/GlobalStyle";
import Login from "./components/Login/Login";
import Auth from "./components/Auth/Auth";
import PrivateRoute from "./components/Private/PrivateRoute";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalStyle />
      <GlobalProvider>
        <Auth>
          <Routes>
            <Route element={<PrivateRoute />}>
              <Route path="*" element={<App />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </Auth>
      </GlobalProvider>
    </BrowserRouter>
  </React.StrictMode>
);
