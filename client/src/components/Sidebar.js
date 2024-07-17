import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faChartBar, faUserGraduate, faUserTie, faBox, faList, faArrowDown, faArrowRight, faListUl, faClipboardList, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import insigniaImage from '../img/insignia.png'; // Import the image

const Sidebar = () => {
  const username = JSON.parse(localStorage.getItem('log'));
  const navigate = useNavigate();
  const [isRegistrationsOpen, setIsRegistrationsOpen] = useState(false);
  const [isListsOpen, setIsListsOpen] = useState(false);

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('log');
    navigate('/'); // Redirect to the root path after logout
  };

  return (
    <div className="fixed flex flex-col h-screen bg-gray-800 text-white w-64">
      <div className="flex items-center p-6">
        <img src={insigniaImage} alt="Insignia" className="h-6 mr-2" /> {/* Image tag */}
        <div className="text-xl font-bold">{username ? username : 'User'}</div>
      </div>
      <nav className="mt-6 flex-grow">
        <ul>
          <li className="mb-2">
            <Link
              to="/reportes"
              className="block p-3 rounded hover:bg-gray-700 transition duration-300"
            >
              <FontAwesomeIcon icon={faChartBar} className="mr-2" />
              Reportes
            </Link>
          </li>
          <li className="mb-2">
            <button
              onClick={() => setIsRegistrationsOpen(!isRegistrationsOpen)}
              className={`w-full text-left block p-3 rounded hover:bg-gray-700 transition duration-300 ${isRegistrationsOpen ? 'bg-gray-700' : 'bg-gray-800'}`}
            >
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              Registros
              <FontAwesomeIcon icon={isRegistrationsOpen ? faArrowDown : faArrowRight} className="ml-2" />
            </button>
            {isRegistrationsOpen && (
              <ul className="ml-4">
                <li className="mb-2">
                  <Link
                    to="/regalum"
                    className="block p-3 rounded hover:bg-gray-700 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faUserGraduate} className="mr-2" />
                    Registrar Alumno
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/regdocent"
                    className="block p-3 rounded hover:bg-gray-700 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faUserTie} className="mr-2" />
                    Registrar Docente
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/regactivo"
                    className="block p-3 rounded hover:bg-gray-700 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faBox} className="mr-2" />
                    Registrar Activo
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <button
              onClick={() => setIsListsOpen(!isListsOpen)}
              className={`w-full text-left block p-3 rounded hover:bg-gray-700 transition duration-300 ${isListsOpen ? 'bg-gray-700' : 'bg-gray-800'}`}
            >
              <FontAwesomeIcon icon={faList} className="mr-2" />
              Listas
              <FontAwesomeIcon icon={isListsOpen ? faArrowDown : faArrowRight} className="ml-2" />
            </button>
            {isListsOpen && (
              <ul className="ml-4">
                <li className="mb-2">
                  <Link
                    to="/StudentList"
                    className="block p-3 rounded hover:bg-gray-700 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faListUl} className="mr-2" />
                    Lista Estudiantes
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/enter-loan"
                    className="block p-3 rounded hover:bg-gray-700 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faChalkboardTeacher} className="mr-2" />
                    Lista Docentes
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    to="/AssetList"
                    className="block p-3 rounded hover:bg-gray-700 transition duration-300"
                  >
                    <FontAwesomeIcon icon={faBox} className="mr-2" />
                    Lista Activos
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li className="mb-2">
            <Link
              to="/PresAsctivos"
              className="block p-3 rounded hover:bg-gray-700 transition duration-300"
            >
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" />
              Prestamo de Activos
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to="/ListLending"
              className="block p-3 rounded hover:bg-gray-700 transition duration-300"
            >
              <FontAwesomeIcon icon={faListUl} className="mr-2" />
              Prestamos
            </Link>
          </li>
        </ul>
      </nav>
      <div className="flex items-center justify-center p-6">
        <button
          onClick={handleLogout}
          className="bg-red-600 p-3 rounded hover:bg-red-700 transition duration-300 w-full text-center"
        >
          <FontAwesomeIcon icon={faSignOutAlt} />
          Salir
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
