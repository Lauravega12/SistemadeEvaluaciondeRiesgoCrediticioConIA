package com.evaluacion;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

// Clase responsable de las operaciones CRUD (en este caso, solo C de Create) para las evaluaciones en la DB
public class EvaluacionRepository {

    // Método para guardar una evaluación en la base de datos
    public void guardar(String historialPago, double ingresos, double deuda,
                        int creditosActivos, int edad, int tiempoEmpleo,
                        double montoSolicitado, String nivelRiesgo) throws SQLException {

        // SQL para insertar en la tabla 'assessments'
        // NOTA IMPORTANTE: Basado en tu imagen de MySQL Workbench (image_4c04a9.png),
        // la tabla 'assessments' NO tiene columnas para 'historial_pago' ni 'ingresos_mensuales'.
        // Si quieres guardar estos datos, DEBES AÑADIR ESAS COLUMNAS A TU TABLA EN MYSQL.
        // Por ahora, esta sentencia SQL solo inserta los campos que YA EXISTEN en tu tabla 'assessments'.
        String sql = "INSERT INTO assessments (user_name, debt, active_credits, age, employment_duration, requested_amount, risk_level) VALUES (?, ?, ?, ?, ?, ?, ?)";

        try (Connection conn = DatabaseConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {

            // Asignar los valores a los placeholders (?).
            // 'user_name' se pone como un placeholder ya que no lo pides al usuario en App.java.
            pstmt.setString(1, "UsuarioPorDefecto"); // Puedes cambiar esto si recolectas un nombre de usuario
            pstmt.setDouble(2, deuda);
            pstmt.setInt(3, creditosActivos);
            pstmt.setInt(4, edad);
            pstmt.setInt(5, tiempoEmpleo);
            pstmt.setDouble(6, montoSolicitado);
            pstmt.setString(7, nivelRiesgo);

            int filasAfectadas = pstmt.executeUpdate();

            if (filasAfectadas > 0) {
                System.out.println("✅ Evaluación guardada exitosamente en la base de datos.");
            } else {
                System.out.println("❌ No se pudo guardar la evaluación en la base de datos.");
            }

        } catch (SQLException e) {
            // Relanzar la excepción para que App.java la maneje o registre
            System.err.println("❌ Error al guardar la evaluación en la base de datos: " + e.getMessage());
            throw e; // Propagar la excepción para un manejo superior
        }
    }
}