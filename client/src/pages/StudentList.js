import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar.js'; 
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditStudentModal from './EditStudentModal'; // Import the EditModal component

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [sections, setSections] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [studentName, setStudentName] = useState('');
  const [grade, setGrade] = useState('');
  const [section, setSection] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
    fetchGrades();
    fetchSections();
  }, []);

  useEffect(() => {
    filterStudents();
  }, [studentName, grade, section, students]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tablestudentlist');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
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

  const filterStudents = () => {
    let filtered = students;

    if (studentName) {
      filtered = filtered.filter(student =>
        student.student_name.toLowerCase().includes(studentName.toLowerCase())
      );
    }

    if (grade) {
      filtered = filtered.filter(student => student.name_degree === grade);
    }

    if (section) {
      filtered = filtered.filter(student => student.name_section === section);
    }

    setFilteredStudents(filtered);
  };

  const handleEdit = (
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
  ) => {
    setSelectedStudent({
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
    });
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    // Implement delete functionality
    console.log('Delete student with ID:', id);
  };

  return (
    <div className="flex h-screen bg-cyan-500 overflow-hidden">
      <Sidebar />
      <div className="flex-grow p-6 ml-64 overflow-auto">
        <div className="flex justify-center space-x-4 mb-4 bg-white rounded-md">
          <h1 className="text-xl font-bold mb-2 text-center">LISTA DE ALUMNOS</h1>
        </div>
        <div className="flex space-x-4 mb-4">
          <input
            type="text"
            className="px-3 py-2 border rounded w-1/3"
            placeholder="Nombre del Estudiante"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
          />
          <select
            className="px-3 py-2 border rounded w-1/3"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          >
            <option value="">Seleccionar Grado</option>
            {grades.map(grade => (
              <option key={grade.id_degree} value={grade.name_degree}>
                {grade.name_degree}
              </option>
            ))}
          </select>
          <select
            className="px-3 py-2 border rounded w-1/3"
            value={section}
            onChange={(e) => setSection(e.target.value)}
          >
            <option value="">Seleccionar Sección</option>
            {sections.map(section => (
              <option key={section.id_section} value={section.name_section}>
                {section.name_section}
              </option>
            ))}
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded text-xs">
            <thead>
              <tr>
                <th className="py-1 px-2 border-b">Nombre</th>
                <th className="py-1 px-2 border-b">Grado</th>
                <th className="py-1 px-2 border-b">Sección</th>
                <th className="py-1 px-2 border-b">Número de Documento</th>
                <th className="py-1 px-2 border-b">Fecha de Emisión</th>
                <th className="py-1 px-2 border-b">Fecha de Nacimiento</th>
                <th className="py-1 px-2 border-b">Nombre del Apoderado</th>
                <th className="py-1 px-2 border-b">Número de Documento del Apoderado</th>
                <th className="py-1 px-2 border-b">Relación</th>
                <th className="py-1 px-2 border-b">Teléfono</th>
                <th className="py-1 px-2 border-b">Correo Electrónico</th>
                <th className="py-1 px-2 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map(student => (
                <tr key={student.id_student}>
                  <td className="py-1 px-2 border-b">{student.student_name}</td>
                  <td className="py-1 px-2 border-b">{student.name_degree}</td>
                  <td className="py-1 px-2 border-b">{student.name_section}</td>
                  <td className="py-1 px-2 border-b">{student.people_document_number}</td>
                  <td className="py-1 px-2 border-b">{new Date(student.people_document_emition_date).toLocaleDateString()}</td>
                  <td className="py-1 px-2 border-b">{new Date(student.birthdate).toLocaleDateString()}</td>
                  <td className="py-1 px-2 border-b">{student.parents_fullname}</td>
                  <td className="py-1 px-2 border-b">{student.parent_document_number}</td>
                  <td className="py-1 px-2 border-b">{student.relationship}</td>
                  <td className="py-1 px-2 border-b">{student.parents_phone_number}</td>
                  <td className="py-1 px-2 border-b">{student.parents_email}</td>
                  <td className="py-1 px-2 border-b">
                    <button
                      className="text-blue-500 mr-1"
                      onClick={() => handleEdit(
                        student.id_student,
                        student.id_people,
                        student.id_section,
                        student.id_degree,
                        student.id_parents,
                        student.people_document_number,
                        student.people_document_emition_date,
                        student.birthdate,
                        student.parents_fullname,
                        student.parent_document_number,
                        student.relationship,
                        student.parents_phone_number,
                        student.parents_email
                      )}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className="text-red-500" onClick={() => handleDelete(student.id_student)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {selectedStudent && (
        <EditStudentModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          {...selectedStudent}
        />
      )}
    </div>
  );
};

export default StudentList;
