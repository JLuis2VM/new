import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import Sidebar from '../components/Sidebar'; // Adjusted import path
import EditModal from './EditModal'; // Adjusted import path
import ReportProperty from '../Reports/ReportProperty'; // Import the new component

const AssetList = () => {
  const [assetData, setAssetData] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [searchInternCode, setSearchInternCode] = useState('');
  const [editingAsset, setEditingAsset] = useState(null);

  const fetchAssetData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/propertylist');
      setAssetData(response.data);
    } catch (error) {
      console.error('Error fetching asset data:', error);
    }
  };

  useEffect(() => {
    fetchAssetData();
  }, []);

  const handleEdit = (asset) => {
    setEditingAsset(asset);
  };

  const handleCloseModal = () => {
    setEditingAsset(null);
  };

  const handleReload = () => {
    fetchAssetData();
  };

  const filteredAssets = assetData.filter(asset => {
    const matchesName = asset.property_name.toLowerCase().includes(searchName.toLowerCase());
    const matchesInternCode = asset.property_intern_code.toLowerCase().includes(searchInternCode.toLowerCase());
    return matchesName && matchesInternCode;
  });

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-grow p-6 ml-64">
        <h1 className="text-2xl font-bold mb-4">Lista de Activos de Centro de Cómputo - Multifuncionales</h1>
        <div className="mb-4 flex justify-between">
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Filtrar por nombre"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Filtrar por código interno"
              value={searchInternCode}
              onChange={(e) => setSearchInternCode(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="overflow-x-auto w-full max-w-6xl mx-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 border">Nombre</th>
                  <th className="px-4 py-2 border">Marca</th>
                  <th className="px-4 py-2 border">Serie</th>
                  <th className="px-4 py-2 border">Modelo</th>
                  <th className="px-4 py-2 border">Código Interno</th>
                  <th className="px-4 py-2 border">Estado</th>
                  <th className="px-4 py-2 border">Editar</th>
                  <th className="px-4 py-2 border">PDF</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map(asset => (
                  <tr key={asset.id_property} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border text-center">{asset.property_name}</td>
                    <td className="px-4 py-2 border text-center">{asset.property_mark}</td>
                    <td className="px-4 py-2 border text-center">{asset.property_serie}</td>
                    <td className="px-4 py-2 border text-center">{asset.property_model}</td>
                    <td className="px-4 py-2 border text-center">{asset.property_intern_code}</td>
                    <td className="px-4 py-2 border text-center">{asset.state_name}</td>
                    <td className="px-4 py-2 border text-center">
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => handleEdit(asset)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                    </td>
                    <td className="px-4 py-2 border text-center">
                      <ReportProperty idProperty={asset.id_property} internCode={asset.property_intern_code} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {editingAsset && (
          <EditModal
            asset={editingAsset}
            onClose={handleCloseModal}
            onReload={handleReload}
          />
        )}
      </div>
    </div>
  );
};

export default AssetList;
