import React from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TopButton from 'components/TopButton/TopButton';
import ScrollToTop from 'routes/ScrollToTop';
import Navbar from './components/Navbar/Navbar';
import RouteLink from './routes/route';
// import Footer from 'components/Footer/Footer';

function App() {
  const location = useLocation();
  const isMain = location.pathname === '/';

  return (
    <div className="App">
      <ScrollToTop />
      <Navbar isMain={isMain}></Navbar>
      <RouteLink></RouteLink>
      {/* <Footer /> */}
      <TopButton />
    </div>
  );
}

export default App;
