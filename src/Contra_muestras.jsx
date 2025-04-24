import React, { useState } from 'react';

const Contra_muestras = () => {
  const [formData, setFormData] = useState({
    producto: '',
    formato: '',
    fechaEnvasado: '',
    lote: '',
    caja: '',
    numeroPallet: '',
    observaciones: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const enviarDatos = async () => {
    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbwq76Uee0a8zeYeGZvtpFOhxNgtZw91jZNYOBFkEUZ_hRI7dALq6GwMOawToOSIW-nr/exec", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json"
        }
      });

      const resultado = await response.json();
      console.log("Respuesta del servidor:", resultado);

      if (resultado.status === "success") {
        alert("✅ Datos guardados correctamente.");
        setFormData({
          producto: '',
          formato: '',
          fechaEnvasado: '',
          lote: '',
          caja: '',
          numeroPallet: '',
          observaciones: ''
        });
      } else {
        alert("❌ Error al guardar: " + resultado.message);
      }
    } catch (error) {
      console.error("Hubo un error:", error);
      alert("❌ Error de red o CORS. Ver consola.");
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h2>Formulario de Contramuestras</h2>
      <form onSubmit={(e) => { e.preventDefault(); enviarDatos(); }}>
        <input type="text" name="producto" placeholder="Producto" value={formData.producto} onChange={handleChange} required />
        <input type="text" name="formato" placeholder="Formato" value={formData.formato} onChange={handleChange} required />
        <input type="date" name="fechaEnvasado" placeholder="Fecha de Envasado" value={formData.fechaEnvasado} onChange={handleChange} required />
        <input type="text" name="lote" placeholder="Lote" value={formData.lote} onChange={handleChange} required />
        <input type="text" name="caja" placeholder="Caja" value={formData.caja} onChange={handleChange} required />
        <input type="text" name="numeroPallet" placeholder="Número de Pallet" value={formData.numeroPallet} onChange={handleChange} required />
        <textarea name="observaciones" placeholder="Observaciones" value={formData.observaciones} onChange={handleChange}></textarea>
        <button type="submit" style={{ marginTop: '10px' }}>Enviar</button>
      </form>
    </div>
  );
};

export default Contra_muestras;
