import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Navbar from './components/atoms/Navbar/Navbar';
import RouteLink from './routes/route';
// import Footer

function App() {
  const location = useLocation();
  const isMain = location.pathname === '/';

  return (
    <div className="App">
      <Navbar isMain={isMain}></Navbar>
      <RouteLink></RouteLink>
    </div>
  );
}

export default App;
