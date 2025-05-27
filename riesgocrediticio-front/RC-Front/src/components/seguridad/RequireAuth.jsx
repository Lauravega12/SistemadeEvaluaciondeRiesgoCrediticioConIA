// components/RequireAuth.jsx
import React from "react";
import { Navigate } from "react-router-dom";

function RequireAuth({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />; // 🔁 Redirige al login si no hay token
  }

  return children; // ✅ Si hay token, muestra el componente protegido
}

export default RequireAuth;
