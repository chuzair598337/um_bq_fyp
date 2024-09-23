import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './BayanVerses.css';
import * as API from '../../Components/APIWrapper/APIWrapper';

function BayanVerses() {
  const [QuranEPak, setQuranEPak] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { surahID } = useParams();


  const loadQuranEPak = async () => {
    try {
      setLoading(true);
      const data = await API.fetchQuranEPakbySId(surahID);
      //console.log("Fetched Data:", data); // Check if data is correctly fetched
      setQuranEPak(data);
    } catch (error) {
      console.error('Failed to fetch QuranEPak:', error);
      setError('Failed to fetch data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuranEPak();
  }, [surahID]);

  return (
    <div className="Container">

      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <>
          <div className='containerHeader'>
            <h2 className='containerTitle'>Surah's Bayan</h2>
          </div>
          <ul className="containerList">
            {QuranEPak.length === 0 && <p>No data available</p>}
            {QuranEPak.map(verse => (
              <li
                key={verse.quranEPakID}
                className="card"
              >
                <div className="numberBox">
                  <span className="leadingText">{verse.verseID}</span>
                </div>
                <div>
                  <div className='cardVerseArabic'>
                    {verse.verseArabicText}
                  </div>
                  <div className='cardVerseUrdu'>
                    {verse.verseUrduText}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

    </div>
  );
}

export default BayanVerses;
