import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faSave } from '@fortawesome/free-solid-svg-icons';

const EditStudentModal = ({
  isOpen,
  onClose,
  id_student,
  id_people,
  id_section,
  id_degree,
  id_parents,
  people_document_number,
  people_document_issue_date,
  birthdate,
  parents_fullname,
  parent_document_number,
  relationship,
  parents_phone_number,
  parents_email
}) => {
  const [studentName, setStudentName] = useState('');
  const [paternalLastName, setPaternalLastName] = useState('');
  const [maternalLastName, setMaternalLastName] = useState('');
  const [disability, setDisability] = useState('');
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('');
  const [selectedSection, setSelectedSection] = useState('');

  // State variables for form fields
  const [documentNumber, setDocumentNumber] = useState(people_document_number);
  const [documentIssueDate, setDocumentIssueDate] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [fullName, setFullName] = useState(parents_fullname);
  const [parentDocumentNumber, setParentDocumentNumber] = useState(parent_document_number);
  const [relationShip, setRelationShip] = useState(relationship);
  const [phoneNumber, setPhoneNumber] = useState(parents_phone_number);
  const [email, setEmail] = useState(parents_email);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.post('http://localhost:5000/namestudent', { id_people });
        const { people_first_name, people_firts_last_name, people_second_last_name } = response.data.results[0];
        setStudentName(people_first_name);
        setPaternalLastName(people_firts_last_name);
        setMaternalLastName(people_second_last_name);
      } catch (error) {
        console.error('Error fetching student data:', error);
      }
    };

    const fetchDisability = async () => {
      try {
        const response = await axios.post('http://localhost:5000/studentdiscapacity', { id_student });
        setDisability(response.data.results[0].student_discapacity);
      } catch (error) {
        console.error('Error fetching student disability:', error);
      }
    };

    const fetchGrades = async () => {
      try {
        const response = await axios.get('http://localhost:5000/grado');
        setGrades(response.data);
      } catch (error) {
        console.error('Error fetching grades:', error);
      }
    };

    const fetchSections = async () => {
      try {
        const response = await axios.get('http://localhost:5000/seccion');
        setSections(response.data);
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    };

    fetchStudentData();
    fetchDisability();
    fetchGrades();
    fetchSections();
  }, [id_people, id_student]);

  useEffect(() => {
    setSelectedGrade(id_degree);
    setSelectedSection(id_section);
  }, [id_degree, id_section]);

  useEffect(() => {
    // Format dates for initial values
    setDocumentIssueDate(formatDate(people_document_issue_date));
    setBirthDate(formatDate(birthdate));
  }, [people_document_issue_date, birthdate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Format to yyyy-MM-dd
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const formData = {
      id_parents,
      parents_fullname: fullName,
      parents_phone_number: phoneNumber,
      parents_email: email,
      relationship: relationShip,
      parent_document_number: parentDocumentNumber,
      id_people,
      studentName,
      paternalLastName,
      maternalLastName,
      people_document_number: documentNumber,
      people_document_issue_date: documentIssueDate,
      birthdate: birthDate,
      id_student,
      id_section: selectedSection,
      id_degree: selectedGrade,
      disability
    };

    try {
      const response = await axios.post('http://localhost:5000/editstudent', formData);
      console.log('Edit student API response:', response.data);
      onClose();
      window.location.reload(); // Reload the page after closing modal
    } catch (error) {
      console.error('Error editing student:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-md p-6 max-w-screen-lg w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Editar Datos Estudiante</h2>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <form onSubmit={handleSave}>
          <div className="flex">
            <div className="w-1/2 p-2">
              <div className="border p-4 mb-4 rounded-md">
                <h3 className="font-semibold mb-2 text-lg">Datos de Apoderado</h3>
                <div className="mb-4">
                  <label className="block mb-1 text-sm">Nombre Apoderado</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm">Numero Telefono</label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block mb-1 text-sm">Relacion</label>
                  <select
                    value={relationShip}
                    onChange={(e) => setRelationShip(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm"
                    required
                  >
                    <option value="Father">Padre</option>
                    <option value="Mother">Madre</option>
                    <option value="Proxy">Apoderado</option>
                  </select>
                </div>
                <div>
                  <label className="block mb-1 text-sm">NUmero de Documento</label>
                  <input
                    type="text"
                    value={parentDocumentNumber}
                    onChange={(e) => setParentDocumentNumber(e.target.value)}
                    className="w-full border px-2 py-1 rounded text-sm"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="w-1/2 p-2">
              <div className="border p-4 mb-4 rounded-md">
                <h3 className="font-semibold mb-2 text-lg">Datos de Estudiante</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 text-sm">Nombre</label>
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      className="w-full border px-2 py-1 rounded mb-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Apellido Paterno</label>
                    <input
                      type="text"
                      value={paternalLastName}
                      onChange={(e) => setPaternalLastName(e.target.value)}
                      className="w-full border px-2 py-1 rounded mb-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Apellido Materno</label>
                    <input
                      type="text"
                      value={maternalLastName}
                      onChange={(e) => setMaternalLastName(e.target.value)}
                      className="w-full border px-2 py-1 rounded mb-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Numero de Documento</label>
                    <input
                      type="text"
                      value={documentNumber}
                      onChange={(e) => setDocumentNumber(e.target.value)}
                      className="w-full border px-2 py-1 rounded mb-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Fecha de Emision</label>
                    <input
                      type="date"
                      value={documentIssueDate}
                      onChange={(e) => setDocumentIssueDate(e.target.value)}
                      className="w-full border px-2 py-1 rounded mb-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Fecha de Nacimiento</label>
                    <input
                      type="date"
                      value={birthDate}
                      onChange={(e) => setBirthDate(e.target.value)}
                      className="w-full border px-2 py-1 rounded mb-2 text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Grado</label>
                    <select
                      value={selectedGrade}
                      onChange={(e) => setSelectedGrade(e.target.value)}
                      className="w-full border px-2 py-1 rounded mb-2 text-sm"
                      required
                    >
                      <option value="">Select...</option>
                      {grades.map((grade) => (
                        <option key={grade.id_degree} value={grade.id_degree}>
                          {grade.name_degree}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-sm">Seccion</label>
                    <select
                      value={selectedSection}
                      onChange={(e) => setSelectedSection(e.target.value)}
                      className="w-full border px-2 py-1 rounded mb-2 text-sm"
                      required
                    >
                      <option value="">Select...</option>
                      {sections.map((section) => (
                        <option key={section.id_section} value={section.id_section}>
                          {section.name_section}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg">Discapacidad</h3>
                  <textarea
                    value={disability}
                    onChange={(e) => setDisability(e.target.value)}  
                    className="w-full border px-2 py-1 rounded text-sm h-14"
                    rows="18"
                    required
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              className="bg-gray-500 text-white px-4 py-2 rounded"
              onClick={onClose}
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Cancelar
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              type="submit"
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
