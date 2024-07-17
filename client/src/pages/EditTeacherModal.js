// components/EditTeacherModal.js
import React, { useState, useEffect } from 'react';

const EditTeacherModal = ({ isOpen, onClose, docente, onSave }) => {
  const [email, setEmail] = useState(docente.email);
  const [phoneNum, setPhoneNum] = useState(docente.phone_num);
  const [emitionDate, setEmitionDate] = useState(docente.Emition_Date.split('T')[0]);
  const [error, setError] = useState('');

  useEffect(() => {
    setEmail(docente.email);
    setPhoneNum(docente.phone_num);
    setEmitionDate(docente.Emition_Date.split('T')[0]);
  }, [docente]);

  const handleSave = () => {
    if (!email || !phoneNum || !emitionDate) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!email.includes('@')) {
      setError('El email debe contener un "@".');
      return;
    }

    setError('');
    onSave(docente.id_teacher, docente.id_people, email, phoneNum, emitionDate);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-2xl font-bold mb-4">Editar Docente</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Número de Teléfono</label>
          <input
            type="text"
            value={phoneNum}
            onChange={(e) => setPhoneNum(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Fecha de Emisión</label>
          <input
            type="date"
            value={emitionDate}
            onChange={(e) => setEmitionDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeacherModal;
