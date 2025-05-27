import "./navbar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../../pages/inicio/inicio";

function Navbar() {
  return (
    <div>
      <nav className="navbar-nav">
        <a>
          <h1>Riesgo Crediticio</h1>
        </a>
        <ul className="navbar-ul">
          <button>
            <span className="box">Salir</span>
          </button>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
