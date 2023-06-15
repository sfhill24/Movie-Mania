import React from "react";
import './App.css';
import Home from "./pages/Home";
import Details from "./pages/Details";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {

  return (

    <Router>
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/details/*" element={<Details />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  

  );
}

export default App;
