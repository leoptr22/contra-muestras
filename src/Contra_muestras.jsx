import React, { useState } from 'react';

const ContraMuestras = () => {
  // Estado para el formulario
  const [formData, setFormData] = useState({
    producto: '',
    formato: '',
    fechaEnvasado: '',
    lote: '',
    caja: '',
    numeroPallet: '',
    observaciones: ''
  });

  // Estados para la UI
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  // URL de tu Google Apps Script (REEMPLAZA CON TU ID REAL)
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyMKuWD6U1RWMR3T56iGNkyyrnuJYP9JOa3ErN8uD88IbE3-fXf-EVGlViQLZM2xi2a/exec";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      // Agregar timestamp para evitar caché
      const url = new URL(SCRIPT_URL);
      url.searchParams.append('timestamp', Date.now());

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      // Manejar redirección de Google Apps Script
      if (response.redirected) {
        const finalResponse = await fetch(response.url);
        const result = await finalResponse.json();
        handleResponse(result);
      } else {
        const result = await response.json();
        handleResponse(result);
      }
    } catch (err) {
      console.error('Error al enviar:', err);
      setError('Error de conexión. Por favor intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleResponse = (result) => {
    if (result.status === "success") {
      setSuccess(true);
      resetForm();
    } else {
      setError(result.message || "Error al guardar los datos");
    }
  };

  const resetForm = () => {
    setFormData({
      producto: '',
      formato: '',
      fechaEnvasado: '',
      lote: '',
      caja: '',
      numeroPallet: '',
      observaciones: ''
    });
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Registro de Contramuestras</h2>
      
      {success && (
        <div style={styles.alert.success}>
          ✓ Datos guardados correctamente en la hoja de cálculo
        </div>
      )}
      
      {error && (
        <div style={styles.alert.error}>
          ✗ {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Producto:</label>
          <input
            type="text"
            name="producto"
            value={formData.producto}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Formato:</label>
          <input
            type="text"
            name="formato"
            value={formData.formato}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Fecha de Envasado:</label>
          <input
            type="date"
            name="fechaEnvasado"
            value={formData.fechaEnvasado}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Lote:</label>
          <input
            type="text"
            name="lote"
            value={formData.lote}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Caja:</label>
          <input
            type="text"
            name="caja"
            value={formData.caja}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        

        <div style={styles.formGroup}>
          <label style={styles.label}>Número de Pallet:</label>
          <input
            type="text"
            name="numeroPallet"
            value={formData.numeroPallet}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Observaciones:</label>
          <textarea
            name="observaciones"
            value={formData.observaciones}
            onChange={handleChange}
            style={{...styles.input, minHeight: '80px'}}
          />
        </div>

        <button 
          type="submit" 
          style={styles.button}
          disabled={loading}
        >
          {loading ? 'Enviando...' : 'Guardar Datos'}
        </button>
      </form>
    </div>
  );
};

// Estilos mejorados
const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#b48383',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontWeight: 'bold',
    color: '#34495e'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    backgroundColor: '#a74f4f'
  },
  button: {
    padding: '12px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    marginTop: '10px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#2980b9'
    }
  },
  alert: {
    success: {
      padding: '10px',
      backgroundColor: '#d4edda',
      color: '#155724',
      borderRadius: '4px',
      marginBottom: '15px',
      textAlign: 'center'
    },
    error: {
      padding: '10px',
      backgroundColor: '#f8d7da',
      color: '#721c24',
      borderRadius: '4px',
      marginBottom: '15px',
      textAlign: 'center'
    }
  }
};

export default ContraMuestras;