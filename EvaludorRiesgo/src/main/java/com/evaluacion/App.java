package com.evaluacion;

import java.sql.SQLException;
import java.util.Scanner; // Importa SQLException para manejar excepciones de la base de datos

public class App {
    public static void main(String[] args) {
        try (Scanner scanner = new Scanner(System.in)) {
            // Solicitar datos al usuario
            System.out.print("Ingrese historial de pago (Bueno/Regular/Malo): ");
            String historialPago = scanner.nextLine();

            System.out.print("Ingrese ingresos mensuales: ");
            double ingresos = scanner.nextDouble();

            System.out.print("Ingrese deuda actual: ");
            double deuda = scanner.nextDouble();

            System.out.print("Ingrese número de créditos activos: ");
            int creditosActivos = scanner.nextInt();

            System.out.print("Ingrese edad: ");
            int edad = scanner.nextInt();

            System.out.print("Ingrese tiempo en el empleo actual (años): ");
            int tiempoEmpleo = scanner.nextInt();

            System.out.print("Ingrese monto solicitado: ");
            double montoSolicitado = scanner.nextDouble();

            // Evaluación de riesgo
            String resultado = EvaluadorRiesgo.calcularRiesgo(historialPago, ingresos, deuda, creditosActivos, edad, tiempoEmpleo, montoSolicitado);
            System.out.println("Nivel de Riesgo: " + resultado);

            // Crear una instancia del repositorio para guardar la evaluación
            EvaluacionRepository repo = new EvaluacionRepository();
            try {
                repo.guardar(historialPago, ingresos, deuda, creditosActivos,
                             edad, tiempoEmpleo, montoSolicitado, resultado);
            } catch (SQLException e) {
                System.err.println("Error al procesar y guardar la evaluación: " + e.getMessage());
                
            }

        } // Cierre del scanner
    } // Cierre del main
} // Cierre de la clase App