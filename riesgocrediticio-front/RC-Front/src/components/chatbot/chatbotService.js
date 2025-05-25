export async function evaluarRiesgo(userData) {
  const response = await fetch("http://localhost:5000/evaluar_riesgo", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}
