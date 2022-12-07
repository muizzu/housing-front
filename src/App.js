import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './views/Login';
import Home from './views/Home';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
