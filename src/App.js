// src/App.js
import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Home from "./pages/Home/Home";
import Reciter from "./pages/Reciter";
import Bayan from "./pages/Bayan";
import Tafheem from "./pages/Tafheem";
import Tilawat from "./pages/Tilawat/Tilawat";
import Recorder from "./Recorder/Recorder";
import Recordbtn from "./Temp/recordingButton/Recordbtn";

const App = () => {
  return (
    // <Router>
    //   {/* Microphone recording*/}
    //   <Recorder/>
    //   {/* Responsive Navigation Bar */}
    //   <Navbar />

    //   {/* Main Pages Content */}
    //   <main className="wrapper">
    //     <div className="content">
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/reciter" element={<Reciter />} />
    //         <Route path="/bayan" element={<Bayan />} />
    //         <Route path="/tafheem" element={<Tafheem />} />
    //         <Route path="/tilawat" element={<Tilawat />} />
    //       </Routes>
    //     </div>
    //   </main>

      

    // </Router>
    <Recordbtn></Recordbtn>
  );
};

export default App;
