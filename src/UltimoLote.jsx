import React, { useState } from 'react';
import ModalUltimoRegistro from './ModalUltimoRegistro';

export default function UltimoLoteProducto() {
  const [modalVisible, setModalVisible] = useState(false);
  const [producto, setProducto] = useState('');
  const [formato, setFormato] = useState('');
  const [lote, setLote] = useState('');

  const obtenerUltimoRegistro = async () => {
    try {
      const response = await fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vS5a4boHpF-FkSVH6HqawmLRBF7g7YP_SVD92i_zwq2xAH6Lkk1EV5u1TDQx3jp5X9nmmg5m0KyhDBN/pub?output=csv');
      const data = await response.text();
      const filas = data.split('\n').map((fila) => fila.split(','));

      if (filas.length > 1) {
        const ultimaFila = filas[filas.length - 1];

        const productoValor = ultimaFila[0]?.trim() || 'No disponible';
        const formatoValor = ultimaFila[1]?.trim() || 'No disponible';
        const loteValor = ultimaFila[3]?.trim() || 'No disponible';

        setProducto(productoValor);
        setFormato(formatoValor);
        setLote(loteValor);
        setModalVisible(true);
      } else {
        alert('No hay datos disponibles.');
      }
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      alert('Error al obtener los datos.');
    }
  };

  const cerrarModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="p-4">
      <button
        onClick={obtenerUltimoRegistro}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Ver último registro
      </button>

      <ModalUltimoRegistro
        visible={modalVisible}
        producto={producto}
        formato={formato}
        lote={lote}
        onClose={cerrarModal}
      />
    </div>
  );
}
