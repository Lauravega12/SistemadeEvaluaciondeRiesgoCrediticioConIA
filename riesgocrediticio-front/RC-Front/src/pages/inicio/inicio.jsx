import "./inicio.css";
import Navbar from "../../components/navbar/navbar";
import Riesgo from "../../components/tipoRiesgo/riesgo";
import Chatbot from "../../components/chatbot/chatbot";
import Footer from "../../components/footer/footer";

function Inicio() {
  return (
    <div>
      <Navbar />
      <div class="inicio-ContIA">
        <article class="inicio-IATxt">
          <p class="inicio-ParIA">
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
        <div class=" inicio-Perfil">
          <header class=" inicio-Perfil-header">
            <p>Actualizacion 02/02/2025 </p>
            <span class="title">Riesgo Regular</span>
            <br /> <br /> Tiene algunos pagos tardíos ocasionales.Su
            endeudamiento es moderado respecto a ingresos. Probabilidad
            razonable de cumplir obligaciones.
          </header>
          <div class=" inicio-Perfil-author">
            <a class="author-avatar" href="#">
              <span></span>
            </a>
            <svg class="half-circle" viewBox="0 0 106 57">
              <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
            </svg>
            <div class="author-name">
              <div class="author-name-prefix">Harold</div> estibenson
            </div>
          </div>
          <div class="tags">
            <a href="#">21 años</a>
          </div>
        </div>
      </div>
      <h3 class="inicio-TpsRiesgo">Tipos De Riesgo</h3>
      <div className="inicio-CrRsgos">
        <Riesgo>
          <h3 class="inicio-h3V"> Riesgo BAJO</h3>
          <br />
          <p>
            El usuario tiene historial crediticio <b> sólido</b>. Paga
            puntualmente y tiene pocas deudas. Su comportamiento muestra
            <b> Responsabilidad Financiera</b>.<br />
            <br /> Es probable que cumpla con futuras obligaciones. Puede tener
            límites de crédito iniciales <b> bajos</b>. Quizá no aprovecha todas
            las oportunidades crediticias. Debe mantener buenos hábitos de pago.
            Puede usar crédito estratégicamente y revisar su informe
            periódicamente.
          </p>
        </Riesgo>
        <Riesgo>
          <h3 class="inicio-h3N"> Riesgo REGULAR</h3>
          <br />
          <p>
            Tiene algunos <b> pagos tardíos ocasionales.</b> Su
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
          <h3 class="inicio-h3R"> Riesgo ALTO </h3>
          <br />
          <p>
            Presenta pagos frecuentes atrasados o <b> incumplimientos</b>. Su
            endeudamiento es muy elevado. Alta probabilidad de dificultades
            futuras. <b> Problemas para cumplir nuevas obligaciones</b>. <br />
            <br />
            Tendrá gran dificultad para obtener créditos. Enfrentará tasas muy
            altas y límites bajos. Necesita asesoramiento financiero profesional
            urgente. Debe priorizar deudas y evitar nuevas. Trabajar en
            reconstruir historial crediticio. Revisar informe regularmente,
            <b> Mejora llevará tiempo</b>.
          </p>
        </Riesgo>
      </div>
      {}
      <Chatbot />

      <Footer />
    </div>
  );
}

export default Inicio;
