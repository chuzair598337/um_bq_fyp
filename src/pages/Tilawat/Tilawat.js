import React from 'react';
import './Tilawat.css';
function Tilawat() {
  return (
    <div className="scrollable-list">
      <ul className="list">
        {Array.from({ length: 114 }, (_, i) => i + 1).map((item) => (
          <li key={item} className="card">
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

export default Tilawat;
