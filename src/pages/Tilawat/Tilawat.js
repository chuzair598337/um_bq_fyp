import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as API from '../../Components/APIWrapper/APIWrapper';
import '../../Components/Global.css';
import { useMusic } from '../../Components/MusicPlayer/MusicContext'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePause, faCirclePlay } from '@fortawesome/free-regular-svg-icons';



function Tilawat() {
  const [surahs, setSurahs] = useState([]);
  const [playingStates, setPlayingStates] = useState({});
  const {updateAudioFiles } = useMusic();
  const navigate = useNavigate();

  useEffect(() => {
    const loadSurahs = async () => {
      try {
        const data = await API.fetchSurahs();
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

  const playPause = async (surahID) => {
    try {
      // Toggle the playing state for the specific Surah
      setPlayingStates((prevStates) => ({
        ...prevStates,
        [surahID]: !prevStates[surahID]
      }));

      // Fetch the list of audio files
      const audioFiles = await API.fetchAudioFilesList(surahID);

      updateAudioFiles(audioFiles); // Update context state with fetched audio files
      
    } catch (error) {
      console.error('Error fetching audio files:', error);
    }
  };



  return (
    <div className="Container">
      <div className='containerHeader'>
        <h2 className='containerTitle'>Surah's Tilawat</h2>
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
                onClick={() => playPause(surah.surahID)}
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
