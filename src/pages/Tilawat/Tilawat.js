import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import * as API from '../APIWrapper'; 
import './Tilawat.css';

function Tilawat() {
  const [surahs, setSurahs] = useState([]);
  const navigate = useNavigate(); 

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

  const handleSurahClick = (surahID) => {
    navigate(`/TilawatVerses/${surahID}`);
  };
  

  return (
    <div className="scrollable-list">
      <ul className="list">
        {surahs.map(surah => (
          <li 
            key={surah.surahID} 
            className="card" 
            onClick={() => handleSurahClick(surah.surahID)} 
          >
            <div className="leading">
              <span className="leadingText">{surah.surahID}</span> 
            </div>
            <span className="cardTitle">{surah.surahEnglishName}</span> 
            <span className="cardTrailing">{surah.surahArabicName}</span> 
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tilawat;
