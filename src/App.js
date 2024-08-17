// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home/Home";
import Reciter from "./pages/Reciter";
import Bayan from "./pages/Bayan/Bayan";
import Verses from "./pages/Verses/Verses";
import Tafheem from "./pages/Tafheem";
import Tilawat from "./pages/Tilawat/Tilawat";
import Recorder from "./Recorder/Recorder";
import Recordbtn from "./Temp/recordingButton/Recordbtn";

const App = () => {
  
  return (
    <Router>
      <Recorder/>
      <Navbar />

      {/* Main Pages Content */}
      <main className="wrapper">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reciter" element={<Reciter />} />
            <Route path="/Bayan" element={<Bayan />} />
            <Route path="/Verses/:surahID" element={<Verses />} />
            <Route path="/tafheem" element={<Tafheem />} />
            <Route path="/tilawat" element={<Tilawat />} />
          </Routes>
        </div>
      </main>
      </Router>
  
  );
};

export default App;
