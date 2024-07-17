import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import insigniaImage from '../img/insignia.png';
import diadelamadrev2 from '../img/diadelamadrev2.png';
import dialectura from '../img/dialectura.png';
import giganColegio from '../img/giganColegio.png';
import lecturagigan from '../img/lecturagigan.png';
import normasGiganto from '../img/normas-giganto.png';
import solapera from '../img/solapera.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/login/${username}/${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });

      const data = await response.json();
      if (data.message === '1') {
        localStorage.setItem('log', JSON.stringify(username));
        navigate('/enter-loan');
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Ocurrió un error al iniciar sesión');
    }
  };

  return (
    <div className="flex h-screen">
      {/* Carousel Section */}
      <div className="w-2/3 bg-gray-100">
        <Carousel
          autoPlay
          interval={5000} // 5 seconds interval
          infiniteLoop
          showStatus={false}
          showThumbs={false}
          showArrows={false}
          showIndicators={false}
          className="h-full"
        >
          <div className="h-screen object-cove">
            <img src={diadelamadrev2} alt="Mother's Day" className="h-screen w-screen r" />
          </div>
          <div className="h-screen object-cover">
            <img src={dialectura} alt="Dialectura" className="h-screen w-screen" />
          </div>
          <div className="h-screen object-cover">
            <img src={giganColegio} alt="Gigan Colegio" className="h-screen w-screen" />
          </div>
          <div className="h-screen object-cover">
            <img src={lecturagigan} alt="Lectura Gigan" className="h-screen w-screen " />
          </div>
          <div className="h-screen object-cove">
            <img src={normasGiganto} alt="Normas Giganto" className="h-screen w-screen" />
          </div>
          <div className="h-screen object-cove">
            <img src={solapera} alt="Solapera" className="h-screen w-screen" />
          </div>
        </Carousel>
      </div>

      {/* Form Section */}
      <div className="w-1/3  bg-gray-100 flex items-center justify-center">
        <form onSubmit={handleLogin} className="p-6 bg-white rounded shadow-md w-96 ">
          <h1 className="mb-4 text-xl text-center">IESAM SIST</h1>
          <div className="flex items-center justify-center mb-4">
            <img src={insigniaImage} alt="Insignia" className="h-16 mr-2" />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Usuario</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
