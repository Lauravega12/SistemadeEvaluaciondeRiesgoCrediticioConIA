import "./inicio.css";
import Navbar from "../../components/navbar/navbar";
import Riesgo from "../../components/tipoRiesgo/riesgo";
import Chatbot from "../../components/chatbot/chatbot";
import Footer from "../../components/footer/footer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Inicio() {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchAssessment = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/user/assessment",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setAssessment(response.data); // Puede ser null o vacío si no hay registros
      } catch (error) {
        console.error("Error al obtener los datos del assessment:", error);
        if (error.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssessment();
  }, [navigate]);

  const formatFecha = (fechaString) => {
    if (!fechaString) return "Fecha no disponible";
    const fecha = new Date(fechaString);
    if (isNaN(fecha)) return fechaString;
    return fecha.toLocaleDateString();
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <p style={{ textAlign: "center", marginTop: "2rem" }}>
          Cargando información...
        </p>
      </>
    );
  }

  // Aquí quitamos el return por si no hay datos, para mostrar la tarjeta con datos por defecto

  return (
    <div>
      <Navbar />
      <div className="inicio-ContIA">
        <article className="inicio-IATxt">
          <p className="inicio-ParIA">
            ¿Estás listo para descubrir tu nivel crediticio? Te presentamos a
            <b> Stromper</b>, una <b>Inteligencia Artificial</b> diseñada para
            ayudarte a evaluar tu nivel de riesgo financiero. Gracias a su
            capacidad de análisis, <b>Stromper</b> te hará unas preguntas
            sencillas y, con base en tus respuestas, te ofrecerá una evaluación
            precisa. Así podrás tomar decisiones importantes en tu vida
            financiera con mayor seguridad.
            <br /> <b>¡Ella se encarga del análisis por ti!</b>
          </p>
        </article>

        {/* Tarjeta de Perfil siempre visible */}
        <div className="inicio-Perfil">
          <header className="inicio-Perfil-header">
            <p>
              {assessment?.createdAt
                ? `Actualización: ${formatFecha(assessment.createdAt)}`
                : "Fecha no disponible"}
            </p>
            <span className="title">
              Riesgo {assessment?.riskLevel ?? "Desconocido"}
            </span>
            <br />
            <br />
            {/* Mostrar descripción según riesgo o mensaje por defecto */}
            {assessment?.riskLevel === "LOW" && (
              <p>
                Usuario con riesgo bajo, historial crediticio sólido y buen
                manejo financiero.
              </p>
            )}
            {assessment?.riskLevel === "MEDIUM" && (
              <p>
                Usuario con riesgo medio, mantener cuidado en el manejo
                financiero y evitar endeudamientos altos.
              </p>
            )}
            {assessment?.riskLevel === "HIGH" && (
              <p>
                Usuario con riesgo alto, se recomienda asesoría financiera
                urgente y evitar nuevas deudas.
              </p>
            )}

            {!assessment?.riskLevel && (
              <p>
                Aún no se ha podido obtener la descripción del nivel de riesgo.
              </p>
            )}
          </header>

          <div className="inicio-Perfil-author">
            <a className="author-avatar" href="#">
              <span>
                {assessment?.user?.username
                  ? assessment.user.username[0].toUpperCase()
                  : "?"}
              </span>
            </a>
            <svg className="half-circle" viewBox="0 0 106 57">
              <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
            </svg>
            <div className="author-name">
              <div className="author-name-prefix">
                {assessment?.user?.username ?? "Usuario no disponible"}
              </div>
              <div>
                {`Roles: ${
                  assessment?.user?.roles
                    ? assessment.user.roles.map((r) => r.role).join(", ")
                    : "No roles"
                }`}
              </div>
            </div>
          </div>

          <div className="tags">
            <a href="#">
              {assessment?.age
                ? `${assessment.age} años`
                : "Edad no disponible"}
            </a>
            <a href="#">
              {assessment?.income
                ? `Ingreso: $${assessment.income}`
                : "Ingreso no disponible"}
            </a>
            <a href="#">
              {assessment?.debt
                ? `Deuda: $${assessment.debt}`
                : "Deuda no disponible"}
            </a>
          </div>
        </div>

        <h3 className="inicio-TpsRiesgo">Tipos De Riesgo</h3>
      </div>

      <div className="inicio-CrRsgos">
        <Riesgo>
          <h3 className="inicio-h3V">Riesgo BAJO</h3>
          <br />
          <p>
            El usuario tiene historial crediticio <b>sólido</b>. Paga
            puntualmente y tiene pocas deudas. Su comportamiento muestra
            <b> responsabilidad financiera</b>. <br />
            <br />
            Es probable que cumpla con futuras obligaciones. Puede tener límites
            de crédito iniciales <b>bajos</b>. Quizá no aprovecha todas las
            oportunidades crediticias. Debe mantener buenos hábitos de pago.
            Puede usar crédito estratégicamente y revisar su informe
            periódicamente.
          </p>
        </Riesgo>
        <Riesgo>
          <h3 className="inicio-h3N">Riesgo REGULAR</h3>
          <br />
          <p>
            Tiene algunos <b>pagos tardíos ocasionales</b>. Su
            <b>
              endeudamiento es moderado respecto a ingresos. Probabilidad
              razonable de cumplir obligaciones.
              <br />
              <br /> Representa mayor riesgo que perfil bajo. Enfrentará tasas
              menos favorables y límites bajos. Puede tener solicitudes
              rechazadas. Debe priorizar pagos puntuales y hacer presupuesto.
              Evitar deudas innecesarias y monitorear informe crediticio.
            </b>
          </p>
        </Riesgo>
        <Riesgo>
          <h3 className="inicio-h3R">Riesgo ALTO</h3>
          <br />
          <p>
            Presenta pagos frecuentes atrasados o <b>incumplimientos</b>. Su
            endeudamiento es muy elevado. Alta probabilidad de dificultades
            futuras. <b>Problemas para cumplir nuevas obligaciones</b>. <br />
            <br />
            Tendrá gran dificultad para obtener créditos. Enfrentará tasas muy
            altas y límites bajos. Necesita asesoramiento financiero profesional
            urgente. Debe priorizar deudas y evitar nuevas. Trabajar en
            reconstruir historial crediticio. Revisar informe regularmente,
            <b> la mejora llevará tiempo</b>.
          </p>
        </Riesgo>
      </div>
      <Chatbot />
      <Footer />
    </div>
  );
}

export default Inicio;
