
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

  const handleChange = (e) => {
    setFormulario({
      ...formulario,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Acá enviarías los datos
    setMensaje('¡Formulario enviado con éxito!');
    setFormulario({
      Producto: '',
      Formato: '',
      FechaEnvasado: '',
      Lote: '',
      Caja: '',
      NumeroPallet: '',
      Observaciones: '',
    });
  };

  return (
    <div className="formulario">
      <h2 className="titulo">Formulario de Productos</h2>
      <form onSubmit={handleSubmit} className="form-grid">
        
        {/* Producto - ahora desplegable */}
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

        {/* Formato - ahora desplegable */}
        <select 
          className="input"
          name="Formato"
          value={formulario.Formato}
          onChange={handleChange}
          required
        >
          <option value="" >Seleccione un formato</option>
          {formatos.map((formato, index) => (
            <option key={index} value={formato}>
              {formato}
            </option>
          ))}
        </select>

        {/* Fecha Envasado */}
        <input 
          className="input" 
          type="date"
          placeholder="Fecha de envasado" 
          name="FechaEnvasado" 
          value={formulario.FechaEnvasado} 
          onChange={handleChange} 
          required 
        />

        {/* Lote */}
        <input 
          className="input" 
          type="text" 
          name="Lote"
       
          placeholder="Lote" 
          value={formulario.Lote} 
          onChange={handleChange} 
          required 
        />

        {/* Caja */}
        <input 
          className="input" 
          type="text" 
          name="Caja" 
          placeholder="Caja" 
          value={formulario.Caja} 
          onChange={handleChange} 
          required 
        />

        {/* Número de Pallet */}
        <input 
          className="input" 
          type="text" 
          name="NumeroPallet" 
          placeholder="Número de Pallet" 
          value={formulario.NumeroPallet} 
          onChange={handleChange} 
          required 
        />

        {/* Observaciones */}
        <textarea 
          className="textarea" 
          name="Observaciones" 
          placeholder="Observaciones" 
          value={formulario.Observaciones} 
          onChange={handleChange} 
        />

        {/* Botón Enviar */}
        <button type="submit" className="submit-btn">Enviar</button>

      </form>

      {mensaje && <div className="success-message">{mensaje}</div>}
    </div>
  );
}
