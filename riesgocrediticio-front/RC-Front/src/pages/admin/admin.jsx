import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

function Admin() {
  const [todosLosUsuarios, setTodosLosUsuarios] = useState([]);
  const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
  const [filtroUserId, setFiltroUserId] = useState("");
  const [filtroUsername, setFiltroUsername] = useState("");
  const [filtroRiskLevel, setFiltroRiskLevel] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/admin/assessments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setTodosLosUsuarios(response.data);
        setUsuariosFiltrados(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los usuarios:", error);
        setTodosLosUsuarios([]);
        setUsuariosFiltrados([]);
      });
  }, []);

  useEffect(() => {
    const filtrados = todosLosUsuarios.filter((user) => {
      const matchId =
        filtroUserId === "" ||
        String(user.user.id).includes(filtroUserId.trim());
      const matchUsername =
        filtroUsername === "" ||
        user.user.username
          .toLowerCase()
          .includes(filtroUsername.toLowerCase().trim());
      const matchRisk =
        filtroRiskLevel === "" ||
        user.riskLevel
          ?.toLowerCase()
          .includes(filtroRiskLevel.toLowerCase().trim());
      return matchId && matchUsername && matchRisk;
    });

    setUsuariosFiltrados(filtrados);
  }, [filtroUserId, filtroUsername, filtroRiskLevel, todosLosUsuarios]);

  return (
    <div className="admin-page">
      <Navbar />
      <br />
      <br />
      <br />
      <h2>Usuarios</h2>

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
            {usuariosFiltrados.map((user) => (
              <tr
                key={user.id}
                onClick={() => setUsuarioSeleccionado(user)}
                style={{ cursor: "pointer" }}
              >
                <td>{user.user.id}</td>
                <td>{user.user.username}</td>
                <td>{user.riskLevel || "No definido"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detalle del usuario */}
      {usuarioSeleccionado && (
        <div className="detalle-usuario">
          <h3>Detalles del Usuario</h3>
          <p>
            <strong>ID:</strong> {usuarioSeleccionado.user.id}
          </p>
          <p>
            <strong>Username:</strong> {usuarioSeleccionado.user.username}
          </p>
          <p>
            <strong>Ingreso:</strong> {usuarioSeleccionado.income}
          </p>
          <p>
            <strong>Deuda:</strong> {usuarioSeleccionado.debt}
          </p>
          <p>
            <strong>Créditos activos:</strong>{" "}
            {usuarioSeleccionado.activeCredits}
          </p>
          <p>
            <strong>Edad:</strong> {usuarioSeleccionado.age}
          </p>
          <p>
            <strong>Tiempo de empleo:</strong>{" "}
            {usuarioSeleccionado.employmentDuration} meses
          </p>
          <p>
            <strong>Monto solicitado:</strong>{" "}
            {usuarioSeleccionado.requestedAmount}
          </p>
          <p>
            <strong>Riesgo:</strong> {usuarioSeleccionado.riskLevel}
          </p>
          <p>
            <strong>Creado:</strong>{" "}
            {new Date(usuarioSeleccionado.createdAt).toLocaleString()}
          </p>
          <p>
            <strong>Rol:</strong>{" "}
            {usuarioSeleccionado.user.roles.map((r) => r.role).join(", ")}
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Admin;
