import { useState } from "react";
import './Contramuestras.css'; 

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
  
  const [mensaje, setMensaje] = useState("");

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

      setMensaje("Producto cargado con éxito");

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
      <form className="form-grid" onSubmit={handleSubmit}>
        <h2>Registro de Muestras</h2>

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
        
        {mensaje && <div className="success-message">{mensaje}</div>}
      </form>
    </div>
  );
}
