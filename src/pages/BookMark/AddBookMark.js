import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddBookMark.css';
import { fetchSurahs, createBookmark } from '../APIWrapper';

const AddBookMark = () => {
  const [surah, setSurah] = useState('');
  const [surahID, setSurahID] = useState('');
  const [surahList, setSurahList] = useState([]);
  const [verseFrom, setVerseFrom] = useState('');
  const [verseTo, setVerseTo] = useState('');
  const [repeatCount, setRepeatCount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getSurahNames = async () => {
      try {
        const data = await fetchSurahs();
        setSurahList(data);
      } catch (error) {
        console.error("Failed to fetch Surah data:", error);
      }
    };

    getSurahNames();
  }, []);

  const handleSave = async () => {
    try {
      if (!surahID || !surah || !verseFrom || !verseTo || !repeatCount) {
        console.error('All fields must be filled out');
        return;
      }
      await createBookmark(surahID,surah, verseFrom, verseTo, repeatCount);
      console.log('Bookmark Saved:', { surahID, surah, verseFrom, verseTo, repeatCount });
      setSurah('');
      setSurahID('');
      setVerseFrom('');
      setVerseTo('');
      setRepeatCount('');
      navigate('/bookmark');
    } catch (error) {
      console.error('Failed to save bookmark:', error);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <button onClick={() => navigate('/bookmark')} className="back-button">
          ←
        </button>
        <h1 className="header-text">Add Bookmark</h1>
      </div>
      <div className="input-container">
        <select
          className="input"
          value={surah}
          onChange={(e) => {
            const selectedSurah = e.target.value;
            const selectedSurahID = surahList.find(s => s.surahEnglishName === selectedSurah)?.surahID;
            setSurah(selectedSurah);
            setSurahID(selectedSurahID || '');
          }}
        >
          <option value="" disabled>Select Surah</option>
          {surahList.map((surahObject, index) => (
            <option key={index} value={surahObject.surahEnglishName}>
              {surahObject.surahEnglishName}
            </option>
          ))}
        </select>

        <input
          type="text"
          className="input"
          placeholder="Verse From"
          value={verseFrom}
          onChange={(e) => setVerseFrom(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Verse To"
          value={verseTo}
          onChange={(e) => setVerseTo(e.target.value)}
        />
        <input
          type="text"
          className="input"
          placeholder="Repeat Count"
          value={repeatCount}
          onChange={(e) => setRepeatCount(e.target.value)}
        />
        <button className="save-button" onClick={handleSave}>
          Save
        </button>
      </div>
    </div>
  );
};

export default AddBookMark;
