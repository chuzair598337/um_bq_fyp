import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import * as API from '../../Components/APIWrapper/APIWrapper'; 
import './Bayan.css';
import '../../Components/Global.css';
import { useMusic } from '../../Components/MusicPlayer/MusicContext'


function Bayan() {
  const [surahs, setSurahs] = useState([]);
  const {updateAudioFiles, setIsTilawat } = useMusic();
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
    playPause(surahID)
    navigate(`/BayanVerses/${surahID}`);

  };


  const playPause = async (surahID) => {
    try {
      // Fetch the list of audio files
      const audioFiles = await API.fetchAudioFilesList(surahID);
      setIsTilawat(false);
      updateAudioFiles(audioFiles); // Update context state with fetched audio files
    } catch (error) {
      console.error('Error fetching audio files:', error);
    }
  };
  

  return (
    <div className="Container">
      <div className='containerHeader'>
        <h2 className='containerTitle'>Surah's Bayan</h2>
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
            {/* <span className='actionButtons'>
              <FontAwesomeIcon
                icon={playingStates[surah.surahID] ? faCirclePause : faCirclePlay}
                onClick={() => playPause(surah.surahID)}
              />
            </span> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Bayan;
