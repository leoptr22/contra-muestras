import { useState } from "react";

export default function FormularioMuestras() {
  const [formulario, setFormulario] = useState({
    producto: "",
    formato: "",
    fechaEnvasado: "",
    lote: "",
    caja: "",
    numeroPallet: "",
    observaciones: ""
  });

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = "https://script.google.com/macros/s/AKfycbyMKuWD6U1RWMR3T56iGNkyyrnuJYP9JOa3ErN8uD88IbE3-fXf-EVGlViQLZM2xi2a/exec"; // URL del script desplegado

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // Asegura formato correcto
        },
        body: new URLSearchParams(formulario), // Envía los datos en formato URL
      });

      const data = await response.json();
      console.log("Respuesta del servidor:", data);
      alert(data.message);
    } catch (error) {
      console.error("Error al enviar los datos:", error);
      alert("Ocurrió un error al enviar los datos.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px", width: "300px" }}>
      <input type="text" name="producto" placeholder="Producto" onChange={handleChange} required />
      <input type="text" name="formato" placeholder="Formato" onChange={handleChange} required />
      <input type="date" name="fechaEnvasado" onChange={handleChange} required />
      <input type="text" name="lote" placeholder="Lote" onChange={handleChange} required />
      <input type="text" name="caja" placeholder="Caja" onChange={handleChange} required />
      <input type="text" name="numeroPallet" placeholder="Número de Pallet" onChange={handleChange} required />
      <textarea name="observaciones" placeholder="Observaciones" onChange={handleChange} />
      <button type="submit">Enviar</button>
    </form>
  );
}
