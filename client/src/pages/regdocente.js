import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar'; // Ensure the path is correct
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faIdCard, faCalendarAlt, faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import Modal from './ModalError'; // Import your Modal component
import facadeImage from "../img/fachada.jpg";
const RegDocente = () => {
  const [teacherName, setTeacherName] = useState('');
  const [teacherLastName, setTeacherLastName] = useState('');
  const [teacherMothersLastName, setTeacherMothersLastName] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [documentNumber, setDocumentNumber] = useState('');
  const [documentIssueDate, setDocumentIssueDate] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [documentTypes, setDocumentTypes] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/docutype');
        setDocumentTypes(response.data);
      } catch (error) {
        console.error('Error fetching document types:', error);
      }
    };

    const fetchSpecialties = async () => {
      try {
        const response = await axios.get('http://localhost:5000/specialty');
        setSpecialties(response.data);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchDocumentTypes();
    fetchSpecialties();
  }, []);

  const handleDateChange = (e, setDate) => {
    const date = e.target.value;
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';
    setDate(formattedDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !teacherName ||
      !teacherLastName ||
      !teacherMothersLastName ||
      !documentType ||
      !documentNumber ||
      !documentIssueDate ||
      !dateOfBirth ||
      !specialty ||
      !email ||
      !phoneNumber
    ) {
      return;
    }

    const formData = {
      tea_name: teacherName,
      tea_fln: teacherLastName,
      tea_sln: teacherMothersLastName,
      id_dt: documentType,
      tea_dn: documentNumber,
      tea_ded: documentIssueDate,
      tea_bd: dateOfBirth,
      tea_spec: specialty,
      tea_pn: phoneNumber,
      tea_email: email,
    };

    try {
      const response = await axios.post('http://localhost:5000/regteacher', formData);
      console.log('Registration successful:', response.data);
      resetForm();
    } catch (error) {
      setModalMessage('Failed to register teacher');
      setModalOpen(true);
    }
  };

  const resetForm = () => {
    setTeacherName('');
    setTeacherLastName('');
    setTeacherMothersLastName('');
    setDocumentType('');
    setDocumentNumber('');
    setDocumentIssueDate('');
    setDateOfBirth('');
    setSpecialty('');
    setEmail('');
    setPhoneNumber('');
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalMessage('');
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
        <h1 className="text-2xl font-bold mb-4">Registro Docente</h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Nombre del Docente
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Apellido Paterno
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={teacherLastName}
                onChange={(e) => setTeacherLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <FontAwesomeIcon icon={faUser} className="mr-2" /> Apellido Materno
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={teacherMothersLastName}
                onChange={(e) => setTeacherMothersLastName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <FontAwesomeIcon icon={faIdCard} className="mr-2" /> Tipo de Documento
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={documentType}
                onChange={(e) => setDocumentType(e.target.value)}
                required
              >
                <option value="">Seleccione...</option>
                {documentTypes.map((docType) => (
                  <option key={docType.id_document_type} value={docType.id_document_type}>
                    {docType.document_type_name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <FontAwesomeIcon icon={faIdCard} className="mr-2" /> Número de Documento
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded"
                value={documentNumber}
                onChange={(e) => setDocumentNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Fecha de Emisión del Documento
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={documentIssueDate}
                onChange={(e) => handleDateChange(e, setDocumentIssueDate)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" /> Fecha de Nacimiento
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border rounded"
                value={dateOfBirth}
                onChange={(e) => handleDateChange(e, setDateOfBirth)}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                <FontAwesomeIcon icon={faGraduationCap} className="mr-2" /> Especialidad
              </label>
              <select
                className="w-full px-3 py-2 border rounded"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                required
              >
                <option value="">Seleccione...</option>
                {specialties.map((specialty) => (
                                  <option key={specialty.id_specialty} value={specialty.id_specialty}>
                                  {specialty.nom_specialty}
                                </option>
                              ))}
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                <FontAwesomeIcon icon={faEnvelope} className="mr-2" /> Correo Electrónico
                              </label>
                              <input
                                type="email"
                                className="w-full px-3 py-2 border rounded"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-1">
                                <FontAwesomeIcon icon={faPhone} className="mr-2" /> Número de teléfono
                              </label>
                              <input
                                type="text"
                                className="w-full px-3 py-2 border rounded"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                              Registrar
                            </button>
                          </div>
                        </form>
                        <Modal isOpen={modalOpen} onClose={closeModal} message={modalMessage} />
                      </div>
                    </div>
                  );
                };
                
                export default RegDocente;
                