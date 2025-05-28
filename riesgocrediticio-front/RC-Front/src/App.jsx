import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "./pages/inicio/inicio.jsx";
import Login from "./pages/login/login.jsx";
import Admin from "./pages/admin/admin.jsx";
import RequireAuth from "./components/seguridad/RequireAuth.jsx"; // 👈 importamos

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
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
