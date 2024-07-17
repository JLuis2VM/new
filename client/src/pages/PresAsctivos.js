import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AlertModal from './AlterModal'; // Ensure the path is correct

const RegisterAsset = () => {
  const [teachers, setTeachers] = useState([]);
  const [properties, setProperties] = useState([]);
  const [searchTeacherName, setSearchTeacherName] = useState('');
  const [searchPropName, setSearchPropName] = useState('');
  const [searchInternCode, setSearchInternCode] = useState('');

  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [selectedProperty, setSelectedProperty] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tableteacher');
        setTeachers(response.data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    const fetchProperties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tableproperty');
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };

    fetchTeachers();
    fetchProperties();
  }, []);

  const filteredTeachers = teachers.filter(teacher =>
    teacher.name_teacher.toLowerCase().includes(searchTeacherName.toLowerCase())
  );

  const filteredProperties = properties.filter(property =>
    property.prop_name.toLowerCase().includes(searchPropName.toLowerCase()) &&
    property.intern_code.toLowerCase().includes(searchInternCode.toLowerCase())
  );

  const handleAddTeacher = (teacher) => {
    setSelectedTeacher(teacher);
  };

  const handleAddProperty = (property) => {
    setSelectedProperty(property);
  };

  const handleRegisterLoan = async () => {
    if (!selectedTeacher || !selectedProperty) {
      setModalMessage('Select the fields');
      setModalOpen(true);
      return;
    }

    const loanDetails = {
      teacher_id: selectedTeacher.id_teacher,
      property_id: selectedProperty.id_property
    };

    try {
      const response = await axios.post('http://localhost:5000/addlending', loanDetails);
      console.log(response.data); // Log the response if needed
      setModalMessage('Loan successful');
    } catch (error) {
      console.error('Error registering loan:', error);
      setModalMessage('Loan error');
    } finally {
      setModalOpen(true);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMessage('');
    window.location.reload(); // Reload the page after closing the modal
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-64 bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-grow p-6 overflow-auto">
        <h1 className="text-2xl font-bold mb-4">Prestamo de activos</h1>
        
        <div className="mb-6 p-4 border border-gray-300 rounded-lg bg-white">
          <h2 className="text-xl font-semibold mb-4">Prestamo</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre de Docente</label>
            <input
              type="text"
              value={selectedTeacher ? selectedTeacher.name_teacher : ''}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre de Activo</label>
            <input
              type="text"
              value={selectedProperty ? selectedProperty.intern_code : ''}
              readOnly
              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100"
            />
          </div>
          <button
            onClick={handleRegisterLoan}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Registrar Prestamo
          </button>
        </div>

        <div className="flex space-x-8 overflow-auto">
          <div className="w-1/2">
            <h2 className="text-xl font-semibold mb-4">Profesores</h2>
            <input
              type="text"
              placeholder="Filter by teacher name"
              value={searchTeacherName}
              onChange={(e) => setSearchTeacherName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">Docente</th>
                    <th className="px-4 py-2 border">Agregar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map(teacher => (
                    <tr key={teacher.id_teacher} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border text-center">{teacher.name_teacher}</td>
                      <td className="px-4 py-2 border text-center">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleAddTeacher(teacher)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="w-1/2">
            <h2 className="text-xl font-semibold mb-4">Activos</h2>
            <input
              type="text"
              placeholder="Filter by property name"
              value={searchPropName}
              onChange={(e) => setSearchPropName(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <input
              type="text"
              placeholder="Filter by internal code"
              value={searchInternCode}
              onChange={(e) => setSearchInternCode(e.target.value)}
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
            />
            <div className="overflow-y-auto max-h-96">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2 border">Nombre</th>
                    <th className="px-4 py-2 border">Marca</th>
                    <th className="px-4 py-2 border">Codigo Interno</th>
                    <th className="px-4 py-2 border">Agregar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProperties.map(property => (
                    <tr key={property.id_property} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border text-center">{property.prop_name}</td>
                      <td className="px-4 py-2 border text-center">{property.prop_mark}</td>
                      <td className="px-4 py-2 border text-center">{property.intern_code}</td>
                      <td className="px-4 py-2 border text-center">
                        <button
                          className="text-blue-500 hover:text-blue-700"
                          onClick={() => handleAddProperty(property)}
                        >
                          <FontAwesomeIcon icon={faPlus} />
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

      {modalOpen && (
        <AlertModal
          message={modalMessage}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

export default RegisterAsset;
