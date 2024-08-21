import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

// Rendering the application with defined routes
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>
      {/* Admin Layout handles dashboard and other app features */}
      <Route path="/admin/*" element={<AdminLayout />} />
      {/* Auth Layout for login, registration, etc. */}
      <Route path="/auth/*" element={<AuthLayout />} />
      {/* Default route redirects to the dashboard */}
      <Route path="*" element={<Navigate to="/admin/index" replace />} />
    </Routes>
  </BrowserRouter>
);
