import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio/inicio.jsx"; // ojo, tenías escrito "incio"
import Login from "./pages/login/login.jsx";
import Admin from "./pages/admin/admin.jsx"; // 👈 esto estaba faltando

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/admin" element={<Admin />} /> {/* 👈 agregamos la ruta */}
      </Routes>
    </Router>
  );
}

export default App;
