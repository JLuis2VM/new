// pages/EnterLoan.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar.js';
import EditTeacherModal from './EditTeacherModal.js';
import AlertModal from './AlterModal.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const EnterLoan = () => {
  const [docentes, setDocentes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [currentDocente, setCurrentDocente] = useState(null);

  useEffect(() => {
    const fetchDocentes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/listdocentes');
        setDocentes(response.data);
      } catch (error) {
        console.error('Error fetching docentes:', error);
      }
    };

    fetchDocentes();
  }, []);

  const handleEdit = (docente) => {
    setCurrentDocente(docente);
    setIsModalOpen(true);
  };

  const handleSave = async (id_teacher, id_people, email, phoneNum, emitionDate) => {
    try {
      const response = await axios.post('http://localhost:5000/editteacher', {
        id_teacher,
        id_people,
        email,
        phoneNum,
        emitionDate,
      });
      console.log(response.data);
      setAlertMessage('Teacher Updated Successfully');
      setIsAlertOpen(true);

      // Actualiza la lista de docentes después de la edición
      setDocentes((prevDocentes) =>
        prevDocentes.map((docente) => {
          if (docente.id_teacher === id_teacher) {
            const updatedEmitionDate = new Date(emitionDate);
            updatedEmitionDate.setDate(updatedEmitionDate.getDate() );
            return { ...docente, email, phone_num: phoneNum, Emition_Date: updatedEmitionDate.toISOString() };
          }
          return docente;
        })
      );
    } catch (error) {
      console.error('Error updating teacher:', error);
      setAlertMessage('Failed to update teacher');
      setIsAlertOpen(true);
    }
    setIsModalOpen(false);
  };

  const handleDelete = (id_teacher, id_people) => {
    console.log('Delete', id_teacher, id_people);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredDocentes = docentes.filter(docente =>
    docente.full_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex h-screen">
        <Sidebar />
      <div className="flex-grow p-6 ml-64">
        <h1 className="text-2xl font-bold mb-4">Registro y Lista de Docentes</h1>

        <div>
          <h2 className="text-xl font-bold mb-4">Lista de Docentes</h2>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Buscar por nombre"
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="flex justify-center">
            <div className="overflow-x-auto w-full max-w-6xl mx-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border">Nombre</th>
                    <th className="px-4 py-2 border">Especialidad</th>
                    <th className="px-4 py-2 border">Número de Documento</th>
                    <th className="px-4 py-2 border">Email</th>
                    <th className="px-4 py-2 border">Número de Teléfono</th>
                    <th className="px-4 py-2 border">Fecha de Emisión</th>
                    <th className="px-4 py-2 border">Fecha de Nacimiento</th>
                    <th className="px-4 py-2 border">Ediciones</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDocentes.map((docente) => (
                    <tr key={docente.id_teacher}>
                      <td className="px-4 py-2 border">{docente.full_name}</td>
                      <td className="px-4 py-2 border">{docente.specialty}</td>
                      <td className="px-4 py-2 border">{docente.Document_number}</td>
                      <td className="px-4 py-2 border">{docente.email}</td>
                      <td className="px-4 py-2 border">{docente.phone_num}</td>
                      <td className="px-4 py-2 border">{new Date(new Date(docente.Emition_Date).setDate(new Date(docente.Emition_Date).getDate() + 1)).toLocaleDateString()}</td>
                      <td className="px-4 py-2 border">{new Date(docente.BirthDay).toLocaleDateString()}</td>
                      <td className="px-4 py-2 border">
                        <button onClick={() => handleEdit(docente)} className="text-blue-500 mr-2">
                          <FontAwesomeIcon icon={faEdit} />
                        </button>
                        <button onClick={() => handleDelete(docente.id_teacher, docente.id_people)} className="text-red-500">
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {currentDocente && (
        <EditTeacherModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          docente={currentDocente}
          onSave={handleSave}
        />
      )}
      {isAlertOpen && (
        <AlertModal
          message={alertMessage}
          onClose={() => setIsAlertOpen(false)}
        />
      )}
    </div>
  );
};

export default EnterLoan;
