import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import * as API from '../APIWrapper'; // Corrected import path
import './Tilawat.css';

function Tilawat() {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await API.fetchSurahs(); 
        console.log(data);
        setSurahs(data); 
      } catch (error) {
        console.error('Failed to fetch Surahs:', error);
      }
    };

    loadSurahs();
  }, []);

  return (
    <div className="scrollable-list">
      <ul className="list">
        {surahs.map(surah => (
          <li key={surah.surahID} className="card">
            <div className="leading">
              <span className="leadingText">{surah.surahID}</span> {/* Display Surah ID */}
            </div>
            <span className="cardTitle">{surah.surahEnglishName}</span> {/* Display English name */}
            <span className="cardTrailing">{surah.surahArabicName}</span> {/* Display Arabic name */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tilawat;
