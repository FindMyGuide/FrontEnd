import React from 'react';
import './App.css';

import Navbar from './components/atoms/Navbar/Navbar';
import RouteLink from './routes/route';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <RouteLink></RouteLink>
    </div>
  );
}

export default App;
