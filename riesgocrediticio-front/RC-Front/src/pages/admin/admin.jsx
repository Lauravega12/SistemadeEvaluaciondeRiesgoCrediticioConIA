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

  // Función para pedir datos al backend con filtros
  const fetchUsers = () => {
    // Armar los params solo si hay valores para enviar
    const params = {};
    if (filtroUserId) params.userId = filtroUserId;
    if (filtroUsername) params.username = filtroUsername;
    if (filtroRiskLevel) params.riskLevel = filtroRiskLevel;

    axios
      .get("http://localhost:8080/api/admin/usuarios", { params })
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener usuarios filtrados:", error);
      });
  };

  // Traer datos cada vez que cambia un filtro
  useEffect(() => {
    fetchUsers();
  }, [filtroUserId, filtroUsername, filtroRiskLevel]);

  return (
    <div className="admin-page">
      <Navbar />
      <br />
      <br />
      <br />

      <h2>Usuarios</h2>
      <br />
      <br />

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
                key={user.userId}
                onClick={() => setUsuarioSeleccionado(user)}
                style={{ cursor: "pointer" }}
              >
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.riskLevel}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalle del usuario al hacer click */}
      {usuarioSeleccionado && (
        <div className="detalle-usuario">
          <h3>Detalles del Usuario</h3>
          <p>
            <strong>ID:</strong> {usuarioSeleccionado.userId}
          </p>
          <p>
            <strong>Nombre de usuario:</strong> {usuarioSeleccionado.username}
          </p>
          <p>
            <strong>Riesgo:</strong> {usuarioSeleccionado.riskLevel}
          </p>
          {/* Aquí puedes agregar más detalles si los tienes */}
        </div>
      )}

      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Admin;
