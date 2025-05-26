import "./navbar.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Inicio from "../../pages/inicio/inicio";

function navbar() {
  return (
    <div>
      <nav class="navbar-nav">
        <a>
          <h1>Riesgo Crediticio</h1>
        </a>
        <ul class="navbar-ul">
          <button>
            <span class="box">Salir</span>
          </button>
        </ul>
      </nav>
    </div>
  );
}

export default navbar;
