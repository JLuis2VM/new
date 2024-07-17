import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Regdocent from './pages/regdocente.js';
import Classrom from './pages/classroom.js'
import Enterloan from './pages/enterloan.js'
import Login from './pages/Login.js'
import Regalum from './pages/regalum.js';
import Regactivo from './pages/regactivo.js';
import AssetList from './pages/AssetList.js';
import PresAsctivos from './pages/PresAsctivos.js';
import ListLendings from './pages/ListLending.js';
import StudentList from './pages/StudentList.js';
import PaginaReportes from './pages/PaginaReportes.js';
function App() {
  return (
    <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path="/register-asset" element={<Classrom/>} />
          <Route path="/enter-loan"  element={<Enterloan/>}/>
          <Route path="/regalum" element={<Regalum/>} />
          <Route path="/regdocent" element={<Regdocent/>} />
          <Route path="/regactivo" element={<Regactivo/>} />
          <Route path="/AssetList" element={<AssetList/>} />
          <Route path='/PresAsctivos' element={<PresAsctivos/>}/>
          <Route path='/ListLending' element={<ListLendings/>}/>
          <Route path='/StudentList' element={<StudentList/>}/>
          <Route path='/reportes' element={<PaginaReportes/>}/>
        </Routes>
  </Router>
  );
}

export default App;
