import "./navbar.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [salir, setSalir] = useState(false);

  useEffect(() => {
    if (salir) {
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [salir, navigate]);

  return (
    <div>
      <nav className="navbar-nav">
        <a>
          <h1>Riesgo Crediticio</h1>
        </a>
        <ul className="navbar-ul">
          <button onClick={() => setSalir(true)}>
            <span className="box">Salir</span>
          </button>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
