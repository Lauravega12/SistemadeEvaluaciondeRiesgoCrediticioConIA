import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

function Admin() {
  const [users, setUsers] = useState([]);
  const [filtroUserId, setFiltroUserId] = useState("");
  const [filtroUsername, setFiltroUsername] = useState("");
  const [filtroRiskLevel, setFiltroRiskLevel] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  const fetchUsers = () => {
    const params = {};
    if (filtroUserId) params.userId = filtroUserId;
    if (filtroUsername) params.username = filtroUsername;
    if (filtroRiskLevel) params.riskLevel = filtroRiskLevel;

    axios
      .get("http://localhost:8080/api/admin/assessments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        params,
      })
      .then((response) => {
        console.log("Datos recibidos:", response.data);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
        setUsers([]);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [filtroUserId, filtroUsername, filtroRiskLevel]);

  return (
    <div className="admin-page">
      <Navbar />
      <br /><br /><br />

      <h2>Usuarios</h2>
      <br /><br />

      {/* Filtros */}
      <div className="filtros">
        <input
          type="text"
          placeholder="Filtrar por ID"
          value={filtroUserId}
          onChange={(e) => setFiltroUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por nombre de usuario"
          value={filtroUsername}
          onChange={(e) => setFiltroUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por nivel de riesgo"
          value={filtroRiskLevel}
          onChange={(e) => setFiltroRiskLevel(e.target.value)}
        />
      </div>

      {/* Tabla dinámica */}
      <div className="contenedor-tabla">
        <table className="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre de usuario</th>
              <th>Riesgo</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                onClick={() => setUsuarioSeleccionado(user)}
                style={{ cursor: "pointer" }}
              >
                <td>{user.id}</td>
                <td>{user.userName}</td>
                <td>{user.riskLevel || "No definido"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalle del usuario al hacer click */}
      {usuarioSeleccionado && (
        <div className="detalle-usuario">
          <h3>Detalles del Usuario</h3>
          <p><strong>ID:</strong> {usuarioSeleccionado.id}</p>
          <p><strong>Nombre de usuario:</strong> {usuarioSeleccionado.userName}</p>
          <p><strong>Riesgo:</strong> {usuarioSeleccionado.riskLevel || "No definido"}</p>
        </div>
      )}

      <br /><br />
      <Footer />
    </div>
  );
}

export default Admin;
