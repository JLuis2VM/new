import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditModal = ({ asset, onClose, onReload }) => {
  const [name, setName] = useState(asset.property_name);
  const [brand, setBrand] = useState(asset.property_mark);
  const [model, setModel] = useState(asset.property_model);
  const [internCode, setInternCode] = useState(asset.property_intern_code);
  const [serialNumber, setSerialNumber] = useState(asset.property_serie);
  const [state, setState] = useState(asset.id_state);
  const [description, setDescription] = useState('');
  const [states, setStates] = useState([]);

  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/state');
        setStates(response.data);
      } catch (error) {
        console.error('Error fetching states:', error);
      }
    };

    const fetchDescription = async () => {
      try {
        const response = await axios.post('http://localhost:5000/obtenerdescrip', { id_property: asset.id_property });
        setDescription(response.data.results[0].property_description);
      } catch (error) {
        console.error('Error fetching description:', error);
      }
    };

    fetchStates();
    fetchDescription();
  }, [asset.id_property]);

  const handleSave = async () => {
    if (name && brand && model && internCode && serialNumber && state) {
      const updatedAsset = {
        id_property: asset.id_property,
        property_name: name,
        property_mark: brand,
        property_model: model,
        property_intern_code: internCode,
        property_serial: serialNumber,
        id_state: state,
        property_description: description,
      };

      try {
        const response = await axios.post('http://localhost:5000/editprop', updatedAsset);
        console.log('Save response:', response.data);

        // Close the modal after saving
        onClose();

        // Reload the main page
        window.location.reload();
      } catch (error) {
        console.error('Error updating asset:', error);
      }
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl mb-4">Editar Activo</h2>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`mt-1 block w-full p-2 border ${!isValid && !name ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Marca</label>
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className={`mt-1 block w-full p-2 border ${!isValid && !brand ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              required
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Modelo</label>
            <input
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className={`mt-1 block w-full p-2 border ${!isValid && !model ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Codigo Interno</label>
            <input
              type="text"
              value={internCode}
              onChange={(e) => setInternCode(e.target.value)}
              className={`mt-1 block w-full p-2 border ${!isValid && !internCode ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              required
            />
          </div>
        </div>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Numero de Serie</label>
            <input
              type="text"
              value={serialNumber}
              onChange={(e) => setSerialNumber(e.target.value)}
              className={`mt-1 block w-full p-2 border ${!isValid && !serialNumber ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Estado</label>
            <select
              value={state}
              onChange={(e) => setState(e.target.value)}
              className={`mt-1 block w-full p-2 border ${!isValid && !state ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
              required
            >
              <option value="">Select a state</option>
              {states.map((s) => (
                <option key={s.id_state} value={s.id_state}>
                  {s.state_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripcion</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={`mt-1 block w-full p-2 border ${!isValid && !description ? 'border-red-500' : 'border-gray-300'} rounded-lg`}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
