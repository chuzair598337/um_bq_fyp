// src/pages/Verses/Verses.js
import React from 'react';
import { useParams } from 'react-router-dom';
import './Verses.css';

function Verses() {
  const { item } = useParams(); // Get the item from URL parameter

  const verses = [
    { id: 1, text: "بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ" }, 
    { id: 2, text: "الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ" }
  ];

  return (
    <div className="scrollable-list">
      <ul className="list">
        {verses.map((verse) => (
          <li key={verse.id} className="card">
            <div className="leading">
              <span className="leadingText">{verse.id}</span>
            </div>
            <span className="cardTitle">{verse.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Verses;
