import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import './BookMark.css';
import { IoBookmark } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { fetchBookmarks, deleteBookmark } from '../APIWrapper'; // Importing both fetch and delete functions

const BookMark = ({ history }) => {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const getBookmarks = async () => {
      try {
        const data = await fetchBookmarks(); // Fetch bookmarks from the API
        setBookmarks(data); // Set the fetched bookmarks to the state
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error);
      }
    };

    getBookmarks(); // Call the function to fetch bookmarks when the component mounts
  }, []);

  const handleDelete = async (bookmarkID) => {
    try {
      await deleteBookmark(bookmarkID); // Delete the bookmark from the database
      setBookmarks((prevBookmarks) => prevBookmarks.filter((bookmark) => bookmark.bookmarkID !== bookmarkID)); // Remove the bookmark from the state
    } catch (error) {
      console.error("Failed to delete bookmark:", error);
      // Optionally, you could show an alert or a message to the user if deletion fails
    }
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
