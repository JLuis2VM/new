import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faTrademark, faBarcode, faCogs, faKey, faCalendarAlt, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import AlertModal from './AlterModal'; // Adjust the path as necessary
import facadeImage from "../img/fachada.jpg";
const RegActivo = () => {
  const [assetName, setAssetName] = useState('');
  const [assetBrand, setAssetBrand] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [model, setModel] = useState('');
  const [internalCode, setInternalCode] = useState('');
  const [dateOfReception, setDateOfReception] = useState('');
  const [description, setDescription] = useState('');

  const [alertMessage, setAlertMessage] = useState('');
  const [isAlertVisible, setIsAlertVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !assetName ||
      !assetBrand ||
      !serialNumber ||
      !model ||
      !internalCode ||
      !dateOfReception ||
      !description
    ) {
      setAlertMessage('All fields are required. Please fill out all fields.');
      setIsAlertVisible(true);
      return;
    }

    const formData = {
      act_name: assetName,
      act_mark: assetBrand,
      act_serie: serialNumber,
      act_model: model,
      act_intern_code: internalCode,
      act_entry_date: dateOfReception,
      act_description: description,
    };

    console.log(JSON.stringify(formData, null, 2));

    try {
      const response = await axios.post('http://localhost:5000/regactivo', formData);
      console.log('Response:', response.data);
      // Reset form fields on successful submission
      setAssetName('');
      setAssetBrand('');
      setSerialNumber('');
      setModel('');
      setInternalCode('');
      setDateOfReception('');
      setDescription('');

      // Set alert message and show the modal
      setAlertMessage('Property registered successfully');
      setIsAlertVisible(true);
    } catch (error) {
      console.error('Error registering property:', error);
      setAlertMessage('Error registering property. Please try again.');
      setIsAlertVisible(true);
    }
  };

  const handleCloseAlert = () => {
    setIsAlertVisible(false);
    setAlertMessage('');
  };

  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800">
        <Sidebar />
      </div>
      <div className="flex-grow p-6"
      style={{
        backgroundImage: `url(${facadeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",     
      }}
      >
        <h1 className="text-2xl font-bold mb-4">Registro de activos</h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBox} className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Nombre del Activo"
                className="w-full px-3 py-2 border rounded"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faTrademark} className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Marca del Activo"
                className="w-full px-3 py-2 border rounded"
                value={assetBrand}
                onChange={(e) => setAssetBrand(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faBarcode} className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Número de Serie"
                className="w-full px-3 py-2 border rounded"
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCogs} className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Modelo"
                className="w-full px-3 py-2 border rounded"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faKey} className="mr-2 text-gray-500" />
              <input
                type="text"
                placeholder="Código Interno"
                className="w-full px-3 py-2 border rounded"
                value={internalCode}
                onChange={(e) => setInternalCode(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="mr-2 text-gray-500" />
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={dateOfReception}
                onChange={(e) => setDateOfReception(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex items-start">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500 mt-2" />
            <textarea
              placeholder="Descripción u Observaciones"
              className="w-full px-3 py-2 border rounded"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Registrar
            </button>
          </div>
        </form>
      </div>
      {isAlertVisible && <AlertModal message={alertMessage} onClose={handleCloseAlert} />}
    </div>
  );
};

export default RegActivo;
