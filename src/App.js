// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home/Home";
import Reciter from "./pages/Reciter";
import Bayan from "./pages/Bayan/Bayan";
import BayanVerses from "./pages/BayanVerses/BayanVerses";
import Tafheem from "./pages/Tafheem";
import Tilawat from "./pages/Tilawat/Tilawat";
import Recorder from "./Components/Recorder/Recorder";
import Music from "./Components/MusicPlayer/Music";
import {MusicProvider} from "./Components/MusicPlayer/MusicContext";
import Chains from "./Components/Chains/Chains";
import Recordbtn from "./Temp/recordingButton/Recordbtn";
import BookMark from "./pages/BookMark/BookMark";
import AddBookMark from "./pages/BookMark/AddBookMark";
import TilawatVerses from "./pages/TilawatVerses/TilawatVerses";

const App = () => {
  
  return (

    <Router>
      <MusicProvider>
        {/* Responsive Navigation Bar */}
        <Navbar />
        {/* Microphone recording*/}
        <Recorder />
        {/* Music Player */}
        <Music />

        {/* Main Pages Content */}
        <main className="wrapper">
          <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/reciter" element={<Reciter />} />
            <Route path="/bayan" element={<Bayan />} />
            <Route path="/bayanverses/:surahID" element={<BayanVerses />} />
            <Route path="/tafheem" element={<Tafheem />} />
            <Route path="/tilawat" element={<Tilawat />} /> 
            <Route path="/bookmark" element={<BookMark />} />
            <Route path="/chains" element={<Chains />} />
            <Route path="/addbookmark" element={<AddBookMark />} />
          </Routes>
          </div>
        </main>
      </MusicProvider>
    </Router>
  );
};

export default App;
