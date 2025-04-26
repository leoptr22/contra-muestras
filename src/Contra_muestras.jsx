import React, { useState } from 'react';
import './Contaramuestras.css';

function App() {
  const [formData, setFormData] = useState({
    fecha: '',
    producto: '',
    lote: '',
    formato: '',
    numeroCaja: '',
    numeroPallet: '',
    observaciones: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzCs7foDN7k_E1ceHClNLXrw9UKqOybv_5jpj4Qcfc1Oz4dAHWsPnESUju3u3URHpsC/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.success) {
        alert('¡Datos enviados con éxito!');
        setFormData({
          fecha: '',
          producto: '',
          lote: '',
          formato: '',
          numeroCaja: '',
          numeroPallet: '',
          observaciones: ''
        });
      } else {
        alert('Hubo un error al enviar los datos.');
      }
    } catch (error) {
      console.error('Error en el envío de datos:', error);
      alert('Hubo un error al enviar los datos.');
    }
  };

  return (
    <div className="form-container">
      <h1>Formulario de Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fecha">Seleccionar Fecha</label>
          <input
            type="date"
            id="fecha"
            name="fecha"
            value={formData.fecha}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="producto">Seleccionar Producto</label>
          <select
            id="producto"
            name="producto"
            value={formData.producto}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un producto</option>
            <option value="producto1">Producto 1</option>
            <option value="producto2">Producto 2</option>
            <option value="producto3">Producto 3</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="lote">Lote</label>
          <input
            type="text"
            id="lote"
            name="lote"
            value={formData.lote}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="formato">Seleccionar Formato</label>
          <select
            id="formato"
            name="formato"
            value={formData.formato}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un formato</option>
            <option value="formato1">Formato 1</option>
            <option value="formato2">Formato 2</option>
            <option value="formato3">Formato 3</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="numeroCaja">Número de Caja</label>
          <input
            type="text"
            id="numeroCaja"
            name="numeroCaja"
            value={formData.numeroCaja}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="numeroPallet">Número de Pallet</label>
          <input
            type="text"
            id="numeroPallet"
            name="numeroPallet"
            value={formData.numeroPallet}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="observaciones">Observaciones</label>
          <textarea
            id="observaciones"
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Enviar</button>
      </form>
    </div>
  );
}

export default App;
