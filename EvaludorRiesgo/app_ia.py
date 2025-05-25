from flask import Flask, request, jsonify
from flask_cors import CORS
import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), 'modelo_ia'))

from modelo_ia.riesgo_ia import evaluar_riesgo as evaluar_riesgo_ml

app = Flask(__name__)
CORS(app)

@app.route('/evaluar_riesgo', methods=['POST'])
def evaluar_riesgo():
    if request.method == 'POST':
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No se recibieron datos JSON'}), 400

        try:
            historial_pago = data.get('historialPago')
            ingresos = data.get('ingresos')
            deuda = data.get('deuda')
            creditos_activos = data.get('creditosActivos')
            edad = data.get('edad')
            tiempo_empleo = data.get('tiempoEmpleo')
            monto_solicitado = data.get('montoSolicitado')

            if None in [historial_pago, ingresos, deuda, creditos_activos, edad, tiempo_empleo, monto_solicitado]:
                missing_data = [k for k, v in data.items() if v is None]
                return jsonify({'error': 'Faltan datos en la solicitud JSON', 'missing_keys': missing_data}), 400

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

            riesgo_labels = {0: "Riesgo Alto", 1: "Riesgo Bajo", 2: "Riesgo Medio"}
            riesgo_final = riesgo_labels.get(riesgo_predicho_ml, "Desconocido")

            return jsonify({'riesgo_numerico': riesgo_predicho_ml, 'riesgo_texto': riesgo_final})

        except Exception as e:
            print(f"Error al procesar la evaluación de riesgo con ML: {e}", file=sys.stderr)
            return jsonify({'error': 'Error interno al procesar la solicitud para la IA', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
