import React from 'react';

export default function ModalUltimoRegistro({ visible, producto, formato, lote, onClose }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Último registro</h2>
        <p><strong>Producto:</strong> {producto}</p>
        <p><strong>Formato:</strong> {formato}</p>
        <p><strong>Lote:</strong> {lote}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}
