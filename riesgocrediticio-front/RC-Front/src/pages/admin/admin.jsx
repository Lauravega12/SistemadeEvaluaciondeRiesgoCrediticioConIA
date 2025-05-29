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

  const getColorClass = (riskLevel) => {
    const nivel = (riskLevel || "").toLowerCase().trim().replace(".", "");

    if (nivel.includes("alto")) return "rojo";
    if (nivel.includes("medio") || nivel.includes("medium")) return "naranja";
    if (nivel.includes("bajo") || nivel.includes("baja")) return "verde";
    return "gris";
  };

  const getWidth = (riskLevel) => {
    const nivel = (riskLevel || "").toLowerCase().trim().replace(".", "");

    if (nivel.includes("alto")) return "90%";
    if (nivel.includes("medio") || nivel.includes("medium")) return "60%";
    if (nivel.includes("bajo") || nivel.includes("baja")) return "30%";
    return "20%";
  };

  const getRiskIcon = (riskLevel) => {
    const nivel = (riskLevel || "").toLowerCase().trim().replace(".", "");

    if (nivel.includes("alto")) return "⚠️";
    if (nivel.includes("medio") || nivel.includes("medium")) return "⚡";
    if (nivel.includes("bajo") || nivel.includes("baja")) return "✅";
    return "❓";
  };

  return (
    <div className="admin-page">
      <Navbar />
      <div className="admin-container">
        <div className="admin-header">
          <h1 className="admin-title">Panel de Administración</h1>
          <p className="admin-subtitle">
            Gestión de usuarios y evaluación de riesgos
          </p>
        </div>

        {/* Filtros mejorados */}
        <div className="filtros-container">
          <div className="filtros">
            <div className="filtro-item">
              <label>🔍 ID Usuario</label>
              <input
                type="text"
                placeholder="Buscar por ID..."
                value={filtroUserId}
                onChange={(e) => setFiltroUserId(e.target.value)}
              />
            </div>
            <div className="filtro-item">
              <label>👤 Nombre de Usuario</label>
              <input
                type="text"
                placeholder="Buscar por nombre..."
                value={filtroUsername}
                onChange={(e) => setFiltroUsername(e.target.value)}
              />
            </div>
            <div className="filtro-item">
              <label>⚠️ Nivel de Riesgo</label>
              <input
                type="text"
                placeholder="Filtrar por riesgo..."
                value={filtroRiskLevel}
                onChange={(e) => setFiltroRiskLevel(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">{usuariosFiltrados.length}</div>
            <div className="stat-label">Usuarios Mostrados</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{todosLosUsuarios.length}</div>
            <div className="stat-label">Total Usuarios</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">
              {
                usuariosFiltrados.filter((u) => {
                  const nivel = (u.riskLevel || "").toLowerCase().trim();
                  return nivel === "riesgo alto" || nivel === "alta";
                }).length
              }
            </div>
            <div className="stat-label">Riesgo Alto</div>
          </div>
        </div>

        {/* Tabla mejorada */}
        <div className="contenedor-tabla">
          <div className="tabla-header">
            <h2>📋 Lista de Usuarios</h2>
            <span className="tabla-count">
              {usuariosFiltrados.length} resultados
            </span>
          </div>

          <div className="tabla-wrapper">
            <table className="tabla-usuarios">
              <thead>
                <tr>
                  <th>🆔 ID</th>
                  <th>👤 Usuario</th>
                  <th>⚠️ Nivel de Riesgo</th>
                  <th>💰 Monto</th>
                  <th>📅 Fecha</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.map((user) => (
                  <tr
                    key={user.id}
                    onClick={() => setUsuarioSeleccionado(user)}
                    className="tabla-row"
                  >
                    <td>
                      <span className="user-id">#{user.user.id}</span>
                    </td>
                    <td>
                      <div className="user-info">
                        <span className="username">{user.user.username}</span>
                        <span className="user-age">Edad: {user.age}</span>
                      </div>
                    </td>
                    <td>
                      <div className="barra-riesgo-container">
                        <div className="risk-header">
                          <span className="risk-icon">
                            {getRiskIcon(user.riskLevel)}
                          </span>
                          <span className="texto-riesgo">
                            {user.riskLevel || "No definido"}
                          </span>
                        </div>
                        <div className="barra-riesgo-wrapper">
                          <div
                            className={`barra-riesgo ${getColorClass(
                              user.riskLevel
                            )}`}
                            style={{ width: getWidth(user.riskLevel) }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="amount">
                        ${user.requestedAmount?.toLocaleString()}
                      </span>
                    </td>
                    <td>
                      <span className="date">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detalle del usuario mejorado */}
        {usuarioSeleccionado && (
          <div className="detalle-usuario">
            <div className="detalle-header">
              <h3>📊 Detalles del Usuario</h3>
              <button
                className="close-btn"
                onClick={() => setUsuarioSeleccionado(null)}
              >
                ✕
              </button>
            </div>

            <div className="detalle-content">
              <div className="detalle-section">
                <h4>👤 Información Personal</h4>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <span className="label">ID:</span>
                    <span className="value">
                      #{usuarioSeleccionado.user.id}
                    </span>
                  </div>
                  <div className="detalle-item">
                    <span className="label">Username:</span>
                    <span className="value">
                      {usuarioSeleccionado.user.username}
                    </span>
                  </div>
                  <div className="detalle-item">
                    <span className="label">Edad:</span>
                    <span className="value">
                      {usuarioSeleccionado.age} años
                    </span>
                  </div>
                  <div className="detalle-item">
                    <span className="label">Rol:</span>
                    <span className="value">
                      {usuarioSeleccionado.user.roles
                        .map((r) => r.role)
                        .join(", ")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detalle-section">
                <h4>💰 Información Financiera</h4>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <span className="label">Ingreso:</span>
                    <span className="value">
                      ${usuarioSeleccionado.income?.toLocaleString()}
                    </span>
                  </div>
                  <div className="detalle-item">
                    <span className="label">Deuda:</span>
                    <span className="value">
                      ${usuarioSeleccionado.debt?.toLocaleString()}
                    </span>
                  </div>
                  <div className="detalle-item">
                    <span className="label">Créditos activos:</span>
                    <span className="value">
                      {usuarioSeleccionado.activeCredits}
                    </span>
                  </div>
                  <div className="detalle-item">
                    <span className="label">Monto solicitado:</span>
                    <span className="value">
                      ${usuarioSeleccionado.requestedAmount?.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detalle-section">
                <h4>⚠️ Evaluación de Riesgo</h4>
                <div className="risk-assessment">
                  <div className="risk-level">
                    <span className="risk-icon-large">
                      {getRiskIcon(usuarioSeleccionado.riskLevel)}
                    </span>
                    <span className="risk-text">
                      {usuarioSeleccionado.riskLevel}
                    </span>
                  </div>
                  <div className="risk-bar-large">
                    <div
                      className={`barra-riesgo ${getColorClass(
                        usuarioSeleccionado.riskLevel
                      )}`}
                      style={{ width: getWidth(usuarioSeleccionado.riskLevel) }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="detalle-section">
                <h4>💼 Información Laboral</h4>
                <div className="detalle-grid">
                  <div className="detalle-item">
                    <span className="label">Tiempo de empleo:</span>
                    <span className="value">
                      {usuarioSeleccionado.employmentDuration} meses
                    </span>
                  </div>
                  <div className="detalle-item">
                    <span className="label">Fecha de registro:</span>
                    <span className="value">
                      {new Date(usuarioSeleccionado.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Admin;
