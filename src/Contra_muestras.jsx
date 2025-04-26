import { useState } from "react";
import './contramuestras.css'; // Asegúrate de importar el archivo CSS

export default function FormularioMuestras() {
  const [formulario, setFormulario] = useState({
    Producto: "",
    Formato: "",
    FechaEnvasado: "",
    Lote: "",
    Caja: "",
    NumeroPallet: "",
    Observaciones: ""
  });
  
  const [mensaje, setMensaje] = useState(""); // Estado para el mensaje de éxito

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbz_h9AAOp-_m2sJTT9gAVq9CME-5QIUboHqk-vWrZkGiWMRaSSjrI4t014Tbyv3wmqn/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams(formulario),
      });

      const data = await response.json();
      console.log('Respuesta del servidor:', data);

      // Mostrar el mensaje de éxito
      setMensaje("Producto cargado con éxito");

      // Vaciar el formulario
      setFormulario({
        Producto: "",
        Formato: "",
        FechaEnvasado: "",
        Lote: "",
        Caja: "",
        NumeroPallet: "",
        Observaciones: ""
      });

    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <div className="formulario">
      <form 
        onSubmit={handleSubmit}
      >
        <input 
          className="input" 
          type="text" 
          name="Producto" 
          placeholder="Producto" 
          value={formulario.Producto} 
          onChange={handleChange} 
          required 
        />
        <input 
          className="input" 
          type="text" 
          name="Formato" 
          placeholder="Formato" 
          value={formulario.Formato} 
          onChange={handleChange} 
          required 
        />
        <input 
          className="input" 
          type="date" 
          name="FechaEnvasado" 
          value={formulario.FechaEnvasado} 
          onChange={handleChange} 
          required 
        />
        <input 
          className="input" 
          type="text" 
          name="Lote" 
          placeholder="Lote" 
          value={formulario.Lote} 
          onChange={handleChange} 
          required 
        />
        <input 
          className="input" 
          type="text" 
          name="Caja" 
          placeholder="Caja" 
          value={formulario.Caja} 
          onChange={handleChange} 
          required 
        />
        <input 
          className="input" 
          type="text" 
          name="NumeroPallet" 
          placeholder="Número de Pallet" 
          value={formulario.NumeroPallet} 
          onChange={handleChange} 
          required 
        />
        <textarea 
          className="textarea" 
          name="Observaciones" 
          placeholder="Observaciones" 
          value={formulario.Observaciones} 
          onChange={handleChange} 
        />
        <button type="submit" className="submit-btn">Enviar</button>
      </form>

      {/* Mostrar el mensaje de éxito */}
      {mensaje && <div className="success-message">{mensaje}</div>}
    </div>
  );
}
