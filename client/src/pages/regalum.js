import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js'; // Ensure the path is correct
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPhone, faEnvelope, faIdCard, faUserTie, faFileAlt, faCalendarAlt, faGraduationCap, faChalkboardTeacher, faWheelchair } from '@fortawesome/free-solid-svg-icons';
import facadeImage from "../img/fachada.jpg";
const RegisterAsset = () => {
  const [fatherName, setFatherName] = useState('');
  const [telephone, setTelephone] = useState('');
  const [email, setEmail] = useState('');
  const [parentDocumentType, setParentDocumentType] = useState('');
  const [relationship, setRelationship] = useState('');
  const [parentDocumentNumber, setParentDocumentNumber] = useState('');
  const [studentName, setStudentName] = useState('');
  const [paternalLastName, setPaternalLastName] = useState('');
  const [maternalLastName, setMaternalLastName] = useState('');
  const [studentDocumentType, setStudentDocumentType] = useState('');
  const [studentDocumentNumber, setStudentDocumentNumber] = useState('');
  const [documentIssueDate, setDocumentIssueDate] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gradeId, setGradeId] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [disability, setDisability] = useState('');

  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);

  useEffect(() => {
    // Fetch the grades data from the API
    const fetchGrades = async () => {
      try {
        const response = await axios.get('http://localhost:5000/grado');
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    // Fetch the sections data from the API
    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/seccion');
        setSections(response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    // Fetch the document types data from the API
    const fetchDocumentTypes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/docutype');
        setDocumentTypes(response.data);
      } catch (error) {
        console.error('Error fetching document types:', error);
      }
    };

    fetchGrades();
    fetchSections();
    fetchDocumentTypes();
  }, []);

  const handleDateChange = (e, setDate) => {
    const date = e.target.value;
    const formattedDate = date ? new Date(date).toISOString().split('T')[0] : '';
    setDate(formattedDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty or unselected
    if (
      !fatherName || !telephone || !email || !parentDocumentType || !relationship || 
      !parentDocumentNumber || !studentName || !paternalLastName || !maternalLastName || 
      !studentDocumentType || !studentDocumentNumber || !documentIssueDate || 
      !birthDate || !gradeId || !sectionId || !disability
    ) {
      alert('Todos los campos son obligatorios. Por favor, complete todos los campos.');
      return;
    }

    // Construct JSON object with form data
    const formData = {
      par_name: fatherName,
      par_relat: relationship,
      par_email: email,
      par_phone: telephone,
      par_iddocu: parentDocumentType,
      par_docunum: parentDocumentNumber,
      stu_fn: studentName,
      stu_fln: paternalLastName,
      stu_sln: maternalLastName,
      stu_dt: studentDocumentType,
      stu_dn: studentDocumentNumber,
      stu_demi: documentIssueDate,
      stu_birth: birthDate,
      id_sec: sectionId,
      id_deg: gradeId,
      stu_dic: disability
    };

    try {
      // Send POST request to API endpoint
      const response = await axios.post('http://localhost:5000/regestuaidnte', formData);
      console.log('Registration successful:', response.data);
      // Optionally, you can reset the form fields after successful registration
      resetForm();
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const resetForm = () => {
    // Reset all form fields after successful registration
    setFatherName('');
    setTelephone('');
    setEmail('');
    setParentDocumentType('');
    setRelationship('');
    setParentDocumentNumber('');
    setStudentName('');
    setPaternalLastName('');
    setMaternalLastName('');
    setStudentDocumentType('');
    setStudentDocumentNumber('');
    setDocumentIssueDate('');
    setBirthDate('');
    setGradeId('');
    setSectionId('');
    setDisability('');
  };

  return (
    <div className="flex ">
      <Sidebar />
      <div className="flex-grow p-6 ml-64"
      style={{
        backgroundImage: `url(${facadeImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "scroll",     
      }}
      >
        <h1 className="text-2xl font-bold mb-4">Registro Alumno</h1>
        <form className="space-y-8" onSubmit={handleSubmit}>
          {/* Parent or Guardian Data Section */}
          <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Datos del Padre o Apoderado</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  <FontAwesomeIcon icon={faUser} className="mr-2" /> Nombre del Padre
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={fatherName}
                  onChange={(e) => setFatherName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  <FontAwesomeIcon icon={faPhone} className="mr-2" /> Teléfono
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  required
                />
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
                  <FontAwesomeIcon icon={faIdCard} className="mr-2" /> Tipo de Documento
                </label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={parentDocumentType}
                  onChange={(e) => setParentDocumentType(e.target.value)}
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
                  <FontAwesomeIcon icon={faUserTie} className="mr-2" /> Relación
                </label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  required
                >
                  <option value="">Seleccione...</option>
                  <option value="Padre">Padre</option>
                  <option value="Madre">Madre</option>
                  <option value="Apoderado">Apoderado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  <FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Número de Documento
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={parentDocumentNumber}
                  onChange={(e) => setParentDocumentNumber(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          {/* Student Data Section */}
          <div className="bg-white p-4 rounded-lg border border-gray-300 shadow-md">
            <h2 className="text-xl font-semibold mb-4">Datos del Estudiante</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  <FontAwesomeIcon icon={faUser} className="mr-2" /> Nombre
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
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
                  value={paternalLastName}
                  onChange={(e) => setPaternalLastName(e.target.value)}
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
                  value={maternalLastName}
                  onChange={(e) => setMaternalLastName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  <FontAwesomeIcon icon={faIdCard} className="mr-2" /> Tipo de Documento
                </label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={studentDocumentType}
                  onChange={(e) => setStudentDocumentType(e.target.value)}
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
                  <FontAwesomeIcon icon={faFileAlt} className="mr-2" /> Número de Documento
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded"
                  value={studentDocumentNumber}
                  onChange={(e) => setStudentDocumentNumber(e.target.value)}
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
                  value={birthDate}
                  onChange={(e) => handleDateChange(e, setBirthDate)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  <FontAwesomeIcon icon={faGraduationCap} className="mr-2" /> Grado
                </label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={gradeId}
                  onChange={(e) => setGradeId(e.target.value)}
                  required
                >
                  <option value="">Seleccione...</option>
                  {grades.map((grade) => (
                    <option key={grade.id_degree} value={grade.id_degree}>
                      {grade.name_degree}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" /> Sección
                </label>
                <select
                  className="w-full px-3 py-2 border rounded"
                  value={sectionId}
                  onChange={(e) => setSectionId(e.target.value)}
                  required
                >
                  <option value="">Seleccione...</option>
                  {sections.map((section) => (
                    <option key={section.id_section} value={section.id_section}>
                      {section.name_section}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium mb-1">
                  <FontAwesomeIcon icon={faWheelchair} className="mr-2" /> Tipo de Discapacidad
                </label>
                <textarea
                  className="w-full px-3 py-2 border rounded"
                  rows="3"
                  value={disability}
                  onChange={(e) => setDisability(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>

          <div>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
              Registrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterAsset;
