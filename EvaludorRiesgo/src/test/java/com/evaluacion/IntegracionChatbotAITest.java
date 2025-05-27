/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.evaluacion;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;
import org.junit.jupiter.api.Test;

/**
 *
 * @author santiago
 */
public class IntegracionChatbotAITest {

    @Test
    public void testConexionConIA() {
        String jsonInput = """
        {
          "historialPago": "Bueno",
          "ingresos": 3000,
          "deuda": 500,
          "creditosActivos": 2,
          "edad": 30,
          "tiempoEmpleo": 5,
          "montoSolicitado": 1000
        }
        """;

        String resultado = ChatbotTestWrapper.enviarDatosAI(jsonInput);

        assertNotNull(resultado, "La respuesta no debe ser nula");
        System.out.println("Respuesta recibida: " + resultado);
        assertTrue(resultado.contains("Riesgo"), "La respuesta debe contener el nivel de riesgo");
    }

    // Clase auxiliar para acceder a método privado
    static class ChatbotTestWrapper extends Chatbot {
        public static String enviarDatosAI(String jsonInput) {
            return Chatbot.enviarDatosAI(jsonInput);
        }
    }
}
