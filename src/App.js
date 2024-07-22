// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home";
import Reciter from "./pages/Reciter";
import Bayan from "./pages/Bayan";
import Tafheem from "./pages/Tafheem";

const App = () => {
  return (
    <Router>
      {/* Responsive Navigation Bar */}
      <Navbar />

      {/* Main Pages Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reciter" element={<Reciter />} />
          <Route path="/bayan" element={<Bayan />} />
          <Route path="/tafheem" element={<Tafheem />} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
