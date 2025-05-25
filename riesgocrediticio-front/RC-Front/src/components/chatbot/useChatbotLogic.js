import { useState, useEffect, useRef } from "react";
import { evaluarRiesgo } from "./chatbotService";

const questions = [
  { text: "Ingresa tu historial de pago.", options: ["Bueno", "Regular", "Malo"] },
  { text: "Ingresa tus ingresos mensuales.", inputType: "number" },
  { text: "¿Cuál es el valor de tus deudas actuales?.", inputType: "number" },
  { text: "¿Cuántos créditos activos tienes actualmente?.", inputType: "number" },
  { text: "¿Cuántos años tienes?.", inputType: "number" },
  { text: "¿Cuántos meses llevas en tu empleo actual?.", inputType: "number" },
  { text: "¿Cuál es el monto solicitado para tu credito?", inputType: "number" },
];

const riesgoMap = {
  0: "alto",
  1: "bajo",
  2: "medio",
};

export function useChatbotLogic() {
  const [messages, setMessages] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(null);
  const [showAuthorization, setShowAuthorization] = useState(true);
  const [showTextInput, setShowTextInput] = useState(false);
  const [userAnswers, setUserAnswers] = useState({});
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startChatbot = () => {
    setMessages([
      { text: "¡Hola! Soy Stromper, tu evaluador de riesgo crediticio virtual.", type: "bot" },
      { text: "¿Autorizas el uso de tus datos personales para evaluar tu riesgo crediticio?", type: "bot" },
    ]);
    setShowAuthorization(true);
    setCurrentQuestionIndex(null);
    setShowTextInput(false);
    setUserAnswers({});
  };

  const handleAuthorization = (choice) => {
    setMessages((prev) => [...prev, { text: choice, type: "client" }]);

    setTimeout(() => {
      if (choice === "No") {
        setMessages((prev) => [...prev, { text: "Gracias por tu tiempo.", type: "bot" }]);
        setShowAuthorization(false);
      } else {
        setMessages((prev) => [
          ...prev,
          { text: "Perfecto, comencemos con la evaluación.", type: "bot" },
          { text: questions[0].text, type: "bot" },
        ]);
        setShowAuthorization(false);
        setCurrentQuestionIndex(0);
        setShowTextInput(!!questions[0].inputType);
      }
    }, 1000);
  };

  const sendMessage = (message) => {
    if (!message.trim()) return;
    if (currentQuestionIndex === null) return;

    setUserAnswers((prev) => ({ ...prev, [currentQuestionIndex]: message }));
    setMessages((prev) => [...prev, { text: message, type: "client" }]);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        const nextIndex = currentQuestionIndex + 1;
        setCurrentQuestionIndex(nextIndex);
        setShowTextInput(!!questions[nextIndex].inputType);
        setMessages((prev) => [...prev, { text: questions[nextIndex].text, type: "bot" }]);
      } else {
        setMessages((prev) => [...prev, { text: "Procesando tu evaluación de riesgo...", type: "bot" }]);

        const userData = {
          historialPago: userAnswers[0],
          ingresos: Number(userAnswers[1]),
          deuda: Number(userAnswers[2]),
          creditosActivos: Number(userAnswers[3]),
          edad: Number(userAnswers[4]),
          tiempoEmpleo: Number(userAnswers[5]),
          montoSolicitado: Number(userAnswers[6]),
        };

        enviarDatos(userData);
      }
    }, 1000);
  };

  const enviarDatos = async (userData) => {
    try {
      const data = await evaluarRiesgo(userData);
      const riesgoTexto = riesgoMap[data.riesgo];
      setMessages((prev) => [
        ...prev,
        { text: `Tu nivel de riesgo crediticio es ${riesgoTexto}`, type: "bot" },
      ]);
    } catch (error) {
      console.error("Error al conectar con el backend.", error);
      setMessages((prev) => [
        ...prev,
        { text: "Ocurrió un error al evaluar tu riesgo.", type: "bot" },
      ]);
    }
  };

  return {
    messages,
    showAuthorization,
    currentQuestionIndex,
    showTextInput,
    questions,
    messagesEndRef,
    startChatbot,
    handleAuthorization,
    sendMessage,
  };
}
