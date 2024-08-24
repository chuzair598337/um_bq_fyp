import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './TilawatVerses.css';
import * as API from '../../Components/APIWrapper/APIWrapper';

function TilawatVerses() {
  const [QuranEPak, setQuranEPak] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { surahID } = useParams();

  useEffect(() => {
    const loadQuranEPak = async () => {
      try {
        setLoading(true);
        const data = await API.fetchQuranEPakbySId(surahID);
        console.log("Fetched Data:", data); // Check if data is correctly fetched
        setQuranEPak(data);
      } catch (error) {
        console.error('Failed to fetch QuranEPak:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadQuranEPak();
  }, [surahID]);

  return (
    <div className="scrollable-list">
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <ul className="list">
          {QuranEPak.length === 0 && <p>No data available</p>} 
          {QuranEPak.map(verse => (
            <li key={verse.quranEPakID} className="card">
              <div className="leading">
                <span className="leadingText">{verse.VerseID}</span>
              </div>
              <span className="cardTitle">{verse.AyahText}</span>
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TilawatVerses;
