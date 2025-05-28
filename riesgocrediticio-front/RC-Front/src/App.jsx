import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio/inicio.jsx";
import Login from "./pages/login/login.jsx";
import Admin from "./pages/admin/admin.jsx";
import Registro from "./pages/registro/registro.jsx";
import RequireAuth from "./components/seguridad/RequireAuth.jsx";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas - no requieren autenticación */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        
        {/* Rutas protegidas - requieren autenticación */}
        <Route
          path="/inicio"
          element={
            <RequireAuth>
              <Inicio />
            </RequireAuth>
          }
        />
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Admin />
            </RequireAuth>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;