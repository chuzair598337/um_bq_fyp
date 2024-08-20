import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './BookMark.css';
import { IoBookmark } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';

const BookMark = ({ history }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const mockBookmarks = [
      { bookmarkID: 1, verseFrom: 'Al-Fatiha', bookmarkTitle: 'Verse 1', verseTo: 'Verse 7' },
      { bookmarkID: 2, verseFrom: 'Al-Baqarah', bookmarkTitle: 'Verse 1', verseTo: 'Verse 286' },
    ];
    setBookmarks(mockBookmarks);
  }, []);

  const handleDelete = (bookmarkID) => {
    setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.bookmarkID !== bookmarkID));
  };

  const renderItem = (item) => (
    <div className="bookmark-item" key={item.bookmarkID}>
      <IoBookmark size={24} color="#4a148c" className="bookmark-icon" />
      <span className="bookmark-text">{item.verseFrom} - {item.bookmarkTitle} - {item.verseTo}</span>
      <MdDelete size={26} color="red" className="delete-icon" onClick={() => handleDelete(item.bookmarkID)} />
    </div>
  );

  return (
    <div className="container">
      <div className="header">
        <NavLink to="/home">
          <IoBookmark size={30} color="#4a148c" />
        </NavLink>
        <h1 className="header-text">Bookmark</h1>
      </div>
      <div className="bookmark-list">
        {bookmarks.map(renderItem)}
      </div>
      <NavLink to="/AddBookMark" className="add-button">
        <span className="add-button-text">+</span>
      </NavLink>
    </div>
  );
};

export default BookMark;
