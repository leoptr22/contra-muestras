import { useState } from "react";
import './Contramuestras.css';

export default function FormularioMuestras() {
  const [formulario, setFormulario] = useState({
    Producto: '',
    Formato: '',
    FechaEnvasado: '',
    Lote: '',
    Caja: '',
    NumeroPallet: '',
    Observaciones: '',
  });

  const [mensaje, setMensaje] = useState('');

  const productos = [
    "REDUCTOR DE PH",
    "ELEVADOR DE PH",
    "FC CLARIFICADOR",
    "CLARIFICADOR PLUS",
    "CLARIFICADOR CLASICO",
    "FRESHCLOR ALGUICIDA",
    "ALGUICIDA MANTENIMIENTO",
    "ALGUICIDA CHOQUE",
    "PILETIN",
    "DRAX HORNOS",
    "SUN LAVAVAJILLAS",
    "DRASTIK"
  ];

  const formatos = [
    "1 LITRO",
    "5 LITROS",
    "10 LITROS",
    "450 CC",
    "500 CC",
    "1 KG"
  ];
   // Función para abrir el enlace de solo lectura
   const abrirHojaDeCalculo = () => {
    const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vS5a4boHpF-FkSVH6HqawmLRBF7g7YP_SVD92i_zwq2xAH6Lkk1EV5u1TDQx3jp5X9nmmg5m0KyhDBN/pubhtml';
    window.open(url, '_blank');
  };

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
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

      setMensaje("¡Producto cargado con éxito!");
      setFormulario({
        Producto: '',
        Formato: '',
        FechaEnvasado: '',
        Lote: '',
        Caja: '',
        NumeroPallet: '',
        Observaciones: '',
      });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setMensaje("Hubo un error al enviar el formulario.");
    }
  };

  return (
    <div className="formulario">
      <h2 className="titulo">Formulario de Productos</h2>
      <form onSubmit={handleSubmit} className="form-grid">

        <select 
          className="input"
          name="Producto"
          value={formulario.Producto}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un producto</option>
          {productos.map((producto, index) => (
            <option key={index} value={producto}>
              {producto}
            </option>
          ))}
        </select>

        <select 
          className="input"
          name="Formato"
          value={formulario.Formato}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un formato</option>
          {formatos.map((formato, index) => (
            <option key={index} value={formato}>
              {formato}
            </option>
          ))}
        </select>

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

       {/* Botón para ver la hoja de cálculo en solo lectura */}
       <button onClick={abrirHojaDeCalculo} className="view-button">
        Listado de lotes (Solo Lectura)
      </button>

      {mensaje && <div className="success-message">{mensaje}</div>}
    </div>
  );
}
