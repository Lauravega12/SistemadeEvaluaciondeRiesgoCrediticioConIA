from flask import Flask, request, jsonify
import sys
import os


sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'modelo_ia'))


from riesgo_ia import evaluar_riesgo as evaluar_riesgo_ml

app = Flask(__name__)

@app.route('/evaluar_riesgo', methods=['POST'])
def evaluar_riesgo():
    if request.method == 'POST':
        data = request.get_json()

        # Validación básica de datos
        if not data:
            return jsonify({'error': 'No se recibieron datos JSON'}), 400

        # Mapeo de datos para el modelo de IA real
        try:
            historial_pago = data.get('historialPago')
            ingresos = data.get('ingresos')
            deuda = data.get('deuda')
            creditos_activos = data.get('creditosActivos')
            edad = data.get('edad')
            tiempo_empleo = data.get('tiempoEmpleo')
            monto_solicitado = data.get('montoSolicitado')

            # Verificar que todos los datos necesarios estén presentes y no sean None
            if None in [historial_pago, ingresos, deuda, creditos_activos, edad, tiempo_empleo, montoSolicitado]:
                missing_data = [k for k, v in data.items() if v is None]
                return jsonify({'error': 'Faltan datos en la solicitud JSON', 'missing_keys': missing_data}), 400


            # Según riesgo_ia.py, el orden es: historialPago, ingresos, deuda, creditosActivos, edad, tiempoEmpleo, montoSolicitado
            datos_para_ia = [
                historial_pago,
                ingresos,
                deuda,
                creditos_activos,
                edad,
                tiempo_empleo,
                monto_solicitado
            ]

            riesgo_predicho_ml = evaluar_riesgo_ml(datos_para_ia)


            # Si 'Riesgo Alto', 'Riesgo Bajo', 'Riesgo Medio' se codifican a 0, 1, 2:
            riesgo_labels = {0: "Riesgo Alto", 1: "Riesgo Bajo", 2: "Riesgo Medio"}
            riesgo_final = riesgo_labels.get(riesgo_predicho_ml, "Desconocido")


            # Devuelve el resultado de la evaluación de riesgo por el modelo de ML
            return jsonify({'riesgo_numerico': riesgo_predicho_ml, 'riesgo_texto': riesgo_final})

        except Exception as e:
            # Captura cualquier error durante el procesamiento o la llamada al modelo
            print(f"Error al procesar la evaluación de riesgo con ML: {e}", file=sys.stderr)
            return jsonify({'error': 'Error interno al procesar la solicitud para la IA', 'details': str(e)}), 500

if __name__ == '__main__':
    # puerto 5000 esté libre o cámbialo si es necesario
    app.run(debug=True, port=5000)