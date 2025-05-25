from flask import Flask, request, jsonify
from flask_cors import CORS
import riesgo_ia

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])

@app.route('/evaluar_riesgo', methods=['POST'])
def evaluar():
    datos = request.json
    datos_usuario = [
        datos["historialPago"], datos["ingresos"], datos["deuda"],
        datos["creditosActivos"], datos["edad"], datos["tiempoEmpleo"],
        datos["montoSolicitado"]
    ]
    
    resultado = riesgo_ia.evaluar_riesgo(datos_usuario)
    return jsonify({"riesgo": resultado})

if __name__ == '__main__':
    app.run(debug=True)
