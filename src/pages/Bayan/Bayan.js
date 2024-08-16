// src/pages/Bayan/Bayan.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Bayan.css';

function Bayan() {
  const navigate = useNavigate();

  const handleNavigation = (item) => {
    navigate(`/Verses/${item}`);
  };

  return (
    <div className="scrollable-list">
      <ul className="list">
        {Array.from({ length: 114 }, (_, i) => i + 1).map((item) => (
          <li key={item} className="card" onClick={() => handleNavigation(item)}>
            <div className="leading">
              <span className="leadingText">{item}</span>
            </div>
            <span className="cardTitle">Al-Fatiha</span>
            <span className="cardTrailing">الفاتحہ</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bayan;
