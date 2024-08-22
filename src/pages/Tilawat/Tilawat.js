import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../APIWrapper';
import '../../Components/Global.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePause, faCirclePlay } from '@fortawesome/free-regular-svg-icons';



function Tilawat() {
  const [surahs, setSurahs] = useState([]);
  const [playingStates, setPlayingStates] = useState({});
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

  const playSurah = (surahID) => {
    setPlayingStates((prevStates) => ({
      ...prevStates,
      [surahID]: !prevStates[surahID] // Toggle the state for the specific Surah
    }));
    // You can add code here to play the Surah audio
  };


  return (
    <div className="Container">
      <div className='containerTitle'>
        Surah's Tilawat
      </div>
      <ul className="containerList">
        {surahs.map(surah => (
          <li
            key={surah.surahID}
            className="card"
          >
            <div className="numberBox">
              <span className="leadingText">{surah.surahID}</span>
            </div>
            <div className='cardContent' onClick={() => handleSurahClick(surah.surahID)}>
              <span className="cardTitleEnglish">{surah.surahEnglishName}</span>
              <span className="cardTitleArabic">{surah.surahArabicName}</span>

            </div>
            <span className='actionButtons'>
              <FontAwesomeIcon
                icon={playingStates[surah.surahID] ? faCirclePause : faCirclePlay}
                onClick={() => playSurah(surah.surahID)}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>

    // <div className='Container'>
    //   <ul className="list">
    //     <li
    //       key={1}
    //       className="card"
    //       onClick={() => handleSurahClick(1)}
    //     >
    //       <span className="leadingText">1</span>
    //       <span className="cardTitleEnglish">surahEnglishName</span>
    //       <span className="cardTitleArabic">surahArabicName</span>
    //       <span className='play'>
    //         <FontAwesomeIcon icon={faCirclePlay} />
    //       </span>
    //     </li>
    //   </ul>

    // </div>
  );
}

export default Tilawat;
