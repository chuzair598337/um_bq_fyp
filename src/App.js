// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home/Home";
import Reciter from "./pages/Reciter";
import Bayan from "./pages/Bayan/Bayan";
import BayanVerses from "./pages/BayanVerses/BayanVerses";
import Tafheem from "./pages/Tafheem";
import Tilawat from "./pages/Tilawat/Tilawat";
import Recorder from "./Recorder/Recorder";
import Recordbtn from "./Temp/recordingButton/Recordbtn";
import BookMark from "./pages/BookMark/BookMark";
import AddBookMark from "./pages/BookMark/AddBookMark";
import TilawatVerses from "./pages/TilawatVerses/TilawatVerses";

const App = () => {
  
  return (
    <Router>
      <Recorder/>
      <Navbar/>
      <main className="wrapper">
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reciter" element={<Reciter />} />
            <Route path="/Bayan" element={<Bayan />} />
            <Route path="/BayanVerses/:surahID" element={<BayanVerses />} />
            <Route path="/tafheem" element={<Tafheem />} />
            <Route path="/tilawat" element={<Tilawat />} /> 
            <Route path="/BookMark" element={<BookMark />} />
            <Route path="/AddBookMark" element={<AddBookMark />} />
            <Route path="/AddBookMark" element={<AddBookMark />} />
          </Routes>
        </div>
      </main>
      </Router>
  
  );
};

export default App;
