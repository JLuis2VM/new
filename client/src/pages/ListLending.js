import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import AlertModal from './AlterModal'; // Ensure the path is correct

const ListLendings = () => {
  const [lendings, setLendings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchLendings = async () => {
      try {
        const response = await axios.get('http://localhost:5000/tablependientlending');
        setLendings(response.data);
      } catch (error) {
        console.error('Error fetching lendings:', error);
      }
    };

    fetchLendings();
  }, []);

  const handleDelivery = async (id_people, id_property) => {
    try {
      const response = await axios.post('http://localhost:5000/uplending', { id_people, id_property });
      setModalMessage('Active Delivered');
      setShowModal(true);
    } catch (error) {
      console.error('Error updating lending:', error);
      setModalMessage('Error delivering active');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    window.location.reload(); // Reload the page
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">Lista de prestamos</h1>
        <div className="overflow-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 border">Active</th>
                <th className="px-4 py-2 border">Series</th>
                <th className="px-4 py-2 border">Internal Code</th>
                <th className="px-4 py-2 border">Teacher</th>
                <th className="px-4 py-2 border">Specialty</th>
                <th className="px-4 py-2 border">Delivery</th>
              </tr>
            </thead>
            <tbody>
              {lendings.map(lending => (
                <tr key={`${lending.id_people}-${lending.id_property}`} className="hover:bg-gray-100">
                  <td className="px-4 py-2 border text-center">{lending.property_name}</td>
                  <td className="px-4 py-2 border text-center">{lending.property_serie}</td>
                  <td className="px-4 py-2 border text-center">{lending.property_intern_code}</td>
                  <td className="px-4 py-2 border text-center">{lending.teacher_name}</td>
                  <td className="px-4 py-2 border text-center">{lending.nom_specialty}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleDelivery(lending.id_people, lending.id_property)}
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
      {showModal && <AlertModal message={modalMessage} onClose={handleCloseModal} />}
    </div>
  );
};

export default ListLendings;
