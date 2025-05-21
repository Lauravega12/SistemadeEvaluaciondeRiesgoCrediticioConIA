from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/evaluar_riesgo', methods=['POST'])
def evaluar_riesgo():
    if request.method == 'POST':
        data = request.get_json()
        # Aquí iría la lógica para evaluar el riesgo usando tu modelo de IA
        # Por ahora, vamos a simular un resultado basado en los ingresos
        ingresos = data.get('ingresos', 0)
        if ingresos > 1000000:
            riesgo = 1  # Riesgo Bajo
        else:
            riesgo = 2  # Riesgo Medio

        return jsonify({'riesgo': riesgo})

if __name__ == '__main__':
    app.run(debug=True)