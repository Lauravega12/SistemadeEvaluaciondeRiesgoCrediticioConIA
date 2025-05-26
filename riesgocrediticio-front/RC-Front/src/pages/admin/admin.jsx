import React, { useEffect, useState } from "react";
import axios from "axios";
import "./admin.css";
import Navbar from "../../components/navbar/navbar";
import Footer from "../../components/footer/footer";

function Admin() {
  const [assessments, setAssessments] = useState([]);
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroApellido, setFiltroApellido] = useState("");
  const [filtroRiesgo, setFiltroRiesgo] = useState("");
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/assessments")
      .then((response) => {
        setAssessments(response.data);
      })
      .catch((error) => {
        console.error("Error al obtener los assessments:", error);
      });
  }, []);

  // Filtro sencillo para nombre, apellido y riesgo
  const filtrados = assessments.filter(
    (a) =>
      a.nombre.toLowerCase().includes(filtroNombre.toLowerCase()) &&
      a.apellido.toLowerCase().includes(filtroApellido.toLowerCase()) &&
      a.tipoRiesgo.toLowerCase().includes(filtroRiesgo.toLowerCase())
  );

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
          placeholder="Filtrar por nombre"
          value={filtroNombre}
          onChange={(e) => setFiltroNombre(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por apellido"
          value={filtroApellido}
          onChange={(e) => setFiltroApellido(e.target.value)}
        />
        <input
          type="text"
          placeholder="Filtrar por riesgo"
          value={filtroRiesgo}
          onChange={(e) => setFiltroRiesgo(e.target.value)}
        />
      </div>

      {/* Tabla dinámica */}
      <div class="contenedor-tabla">
        {" "}
        {/* Aquí corregí className */}
        <table class="tabla-usuarios">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Riesgo</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((user) => (
              <tr
                key={user.id}
                onClick={() => setUsuarioSeleccionado(user)}
                style={{ cursor: "pointer" }} // Para que se note que es clickeable
              >
                <td>{user.id}</td>
                <td>{user.nombre}</td>
                <td>{user.apellido}</td>
                <td>{user.tipoRiesgo}</td>
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
            <strong>ID:</strong> {usuarioSeleccionado.id}
          </p>
          <p>
            <strong>Nombre:</strong> {usuarioSeleccionado.nombre}
          </p>
          <p>
            <strong>Apellido:</strong> {usuarioSeleccionado.apellido}
          </p>
          <p>
            <strong>Edad:</strong> {usuarioSeleccionado.edad}
          </p>
          <p>
            <strong>Ingresos:</strong> {usuarioSeleccionado.ingresos}
          </p>
          <p>
            <strong>Deudas:</strong> {usuarioSeleccionado.deudas}
          </p>
          <p>
            <strong>Riesgo:</strong> {usuarioSeleccionado.tipoRiesgo}
          </p>
          <p>
            <strong>Comentario:</strong> {usuarioSeleccionado.comentario}
          </p>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
}

export default Admin;
