import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HandTrack from './components/HandTrack';
import Doubt from './components/Doubt';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HandTrack />} />
        <Route path="/doubt" element={<Doubt />} />
      </Routes>
    </Router>
  );
};

export default App;
