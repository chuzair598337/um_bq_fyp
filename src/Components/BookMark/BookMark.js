import React, { useState, useEffect } from 'react';
import { fetchBookmarks, deleteBookmark, createBookmark, updateBookmark, fetchSurahs } from '../APIWrapper/APIWrapper';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';
import './BookMark.css'
import * as API from '../../Components/APIWrapper/APIWrapper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlusSquare, faEdit, faCirclePause, faCirclePlay } from '@fortawesome/free-regular-svg-icons';

import { createNotification } from '../Notification/Notification';

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);
    const [surahs, setSurahs] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'addUpdate', 'delete', or null
    const [editMode, setEditMode] = useState(false);

    const [playingStates, setPlayingStates] = useState({});

    const [currentBookmark, setCurrentBookmark] = useState({
        bookmarkID: null,
        surahID: null,
        bookmarkTitle: '',
        verseFrom: '',
        verseTo: '',
        repeatCount: '',
        type: ''
    });
    const [newBookmark, setNewBookmark] = useState({
        surahID: '',
        bookmarkTitle: '',
        verseFrom: '',
        verseTo: '',
        repeatCount: '',
        type: ''
    });
    const [confirmDelete, setConfirmDelete] = useState(null); // Store the bookmarkID to delete
    const navigate = useNavigate();

    const loadBookmarks = async () => {
        try {
            const data = await fetchBookmarks();
            setBookmarks(data);
        } catch (error) {
            console.error('Failed to fetch bookmarks:', error);
        }
    };

    const loadSurahs = async () => {
        try {
            const data = await API.fetchSurahs();
            setSurahs(data);
        } catch (error) {
            console.error('Failed to fetch Surahs:', error);
        }
    };

    useEffect(() => {
        loadBookmarks();
        loadSurahs(); // Load available surahs for selection in the bookmark form
    }, []);

    const handleBookmarkClick = (bookmarkID) => {
        navigate(`/bookmarkdetail/${bookmarkID}`);
    };

    const handleDelete = async (bookmarkID) => {
        setConfirmDelete(bookmarkID); // Set the bookmarkID to be deleted
        setModalIsOpen(true);
        setModalType('delete');
    };

    const handleConfirmDelete = async () => {
        if (confirmDelete !== null) {
            try {
                await deleteBookmark(confirmDelete);
                createNotification('success', 'Bookmark Deleted', 'The bookmark was successfully deleted.');
                await loadBookmarks(); // Refresh the data after deletion
            } catch (error) {
                createNotification('error', 'Operation Failed', `Failed to delete bookmark: ${error.message}`);
                console.error('Failed to delete bookmark:', error);
            }
            setConfirmDelete(null); // Clear the bookmarkID
        }
        setModalIsOpen(false); // Close the confirmation modal
    };

    const handleCancelDelete = () => {
        setConfirmDelete(null); // Clear the bookmarkID
        setModalIsOpen(false); // Close the confirmation modal
        setModalType(null);
    };

    const handleEdit = (bookmark) => {
        setCurrentBookmark(bookmark);
        setEditMode(true);
        setModalType('addUpdate');
        setModalIsOpen(true);
    };

    const handleAdd = () => {
        setEditMode(false);
        setNewBookmark({
            surahID: '',
            bookmarkTitle: '',
            verseFrom: '',
            verseTo: '',
            repeatCount: '',
            type: ''
        });
        setModalType('addUpdate');
        setModalIsOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editMode) {
                await updateBookmark(currentBookmark.bookmarkID, { ...currentBookmark });
                createNotification('success', 'Bookmark Updated', 'The bookmark was successfully updated.');
            } else {
                await createBookmark(newBookmark);
                createNotification('success', 'Bookmark Created', 'The new bookmark was successfully created.');
            }
            await loadBookmarks(); // Refresh the data after save
        } catch (error) {
            createNotification('error', 'Operation Failed', `Failed to save bookmark: ${error.message}`);
            console.error('Failed to save bookmark:', error);
        }
        setModalIsOpen(false);
    };

    const handleCancel = () => {
        setModalIsOpen(false);
        setModalType(null);
    };

    const playPause = (surahID) => {
        setPlayingStates((prevStates) => ({
            ...prevStates,
            [surahID]: !prevStates[surahID] // Toggle the state for the specific Surah
        }));
        // You can add code here to play the Surah audio
    };

    return (
        <div className="Container">
            <div className='containerHeader'>
                <h2 className='containerTitle'>Bookmarks</h2>
                <div className='actionButtons'>
                    <FontAwesomeIcon
                        icon={faPlusSquare}
                        size='2x'
                        onClick={handleAdd}
                        title='Add Bookmark'
                    />
                </div>
            </div>
            <ul className="containerList">
                {bookmarks.map(bookmark => (
                    <li key={bookmark.bookmarkID} className="card">
                        <div className="bookmark-content" onClick={() => handleBookmarkClick(bookmark.bookmarkID)}>
                            <div className="bookmark-title">{bookmark.bookmarkTitle}</div>
                            <div className="cardContent">
                                <div className="bookmark-details"><strong>Surah ID : </strong>{bookmark.surahID}</div>
                                <div className="bookmark-details"> <strong> Verses: </strong> {bookmark.verseFrom} - {bookmark.verseTo}</div>
                                <div className="bookmark-details"><strong>Repeat: </strong>  {bookmark.repeatCount} times</div>
                            </div>
                            <div className={`bookmark-type ${bookmark.type.toLowerCase()}`}>
                                {bookmark.type}
                            </div>
                        </div>
                        <span className="action-buttons">
                            <FontAwesomeIcon
                                icon={playingStates[bookmark.bookmarkID] ? faCirclePause : faCirclePlay}
                                onClick={() => playPause(bookmark.bookmarkID)}
                                className="icon"
                            />
                            <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => handleEdit(bookmark)}
                                className="icon"
                                title="Edit"
                            />
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                onClick={() => handleDelete(bookmark.bookmarkID)}
                                className="icon"
                                title="Delete"
                            />
                        </span>
                    </li>


                ))}
            </ul>

            {/* Modal for Add/Update */}
            {modalIsOpen && modalType === 'addUpdate' && (
                <Modal
                    isOpen={modalIsOpen}
                    onClose={handleCancel}
                    header={<h2>{editMode ? 'Edit Bookmark' : 'Add New Bookmark'}</h2>}
                    body={

                        <div className="bookmark-form">
                            <label>
                                Bookmark Title:
                                <input
                                    type="text"
                                    value={editMode ? currentBookmark.bookmarkTitle : newBookmark.bookmarkTitle}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentBookmark({ ...currentBookmark, bookmarkTitle: e.target.value })
                                            : setNewBookmark({ ...newBookmark, bookmarkTitle: e.target.value })
                                    }
                                />
                            </label>

                            <label>
                                Surah:
                                <select
                                    value={editMode ? currentBookmark.surahID : newBookmark.surahID}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentBookmark({ ...currentBookmark, surahID: e.target.value })
                                            : setNewBookmark({ ...newBookmark, surahID: e.target.value })
                                    }
                                >
                                    <option value="">Select Surah</option>
                                    {surahs.map((surah) => (
                                        <option key={surah.surahID} value={surah.surahID}>
                                            {surah.surahEnglishName + " - " + surah.surahArabicName}
                                        </option>
                                    ))}
                                </select>
                            </label>

                            <label>
                                Verse From:
                                <input
                                    type="number"
                                    placeholder="0"
                                    value={editMode ? currentBookmark.verseFrom : newBookmark.verseFrom}
                                    onChange={(e) => editMode
                                        ? setCurrentBookmark({ ...currentBookmark, verseFrom: e.target.value })
                                        : setNewBookmark({ ...newBookmark, verseFrom: e.target.value })
                                    }
                                />
                            </label>

                            <label>
                                Verse To:
                                <input
                                    type="number"
                                    value={editMode ? currentBookmark.verseTo : newBookmark.verseTo}
                                    // placeholder={
                                    //     (editMode
                                    //         ? surahs.find(surah => surah.surahID === currentBookmark.surahID)?.surahVerses
                                    //         : surahs.find(surah => surah.surahID === newBookmark.surahID)?.surahVerses)
                                    // }
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentBookmark({ ...currentBookmark, verseTo: e.target.value })
                                            : setNewBookmark({ ...newBookmark, verseTo: e.target.value })
                                    }
                                />
                            </label>

                            <label>
                                Repeat Count:
                                <input
                                    type="number"
                                    value={editMode ? currentBookmark.repeatCount : newBookmark.repeatCount}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentBookmark({ ...currentBookmark, repeatCount: e.target.value })
                                            : setNewBookmark({ ...newBookmark, repeatCount: e.target.value })
                                    }
                                />
                            </label>

                            <label>
                                Type:
                                <select
                                    value={editMode ? currentBookmark.type : newBookmark.type}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentBookmark({ ...currentBookmark, type: e.target.value })
                                            : setNewBookmark({ ...newBookmark, type: e.target.value })
                                    }
                                >
                                    <option value="tilawat">Tilawat</option>
                                    <option value="bayan">Bayan</option>
                                </select>
                            </label>

                        </div>


                        // <div>
                        //     <label>
                        //         Bookmark Title:
                        //         <input
                        //             type="text"
                        //             value={editMode ? currentBookmark.bookmarkTitle : newBookmark.bookmarkTitle}
                        //             onChange={(e) =>
                        //                 editMode
                        //                     ? setCurrentBookmark({ ...currentBookmark, bookmarkTitle: e.target.value })
                        //                     : setNewBookmark({ ...newBookmark, bookmarkTitle: e.target.value })
                        //             }
                        //         />
                        //     </label>
                        //     <label>
                        //         Surah:
                        //         <select
                        //             value={editMode ? currentBookmark.surahID : newBookmark.surahID}
                        //             onChange={(e) =>
                        //                 editMode
                        //                     ? setCurrentBookmark({ ...currentBookmark, surahID: e.target.value })
                        //                     : setNewBookmark({ ...newBookmark, surahID: e.target.value })
                        //             }
                        //         >
                        //             <option value="">Select Surah</option>
                        //             {surahs.map(surah => (
                        //                 <option key={surah.surahID} value={surah.surahID}>
                        //                     {surah.surahName}
                        //                 </option>
                        //             ))}
                        //         </select>
                        //     </label>
                        //     <label>
                        //         Verse From:
                        //         <input
                        //             type="number"
                        //             value={editMode ? currentBookmark.verseFrom : newBookmark.verseFrom}
                        //             onChange={(e) =>
                        //                 editMode
                        //                     ? setCurrentBookmark({ ...currentBookmark, verseFrom: e.target.value })
                        //                     : setNewBookmark({ ...newBookmark, verseFrom: e.target.value })
                        //             }
                        //         />
                        //     </label>
                        //     <label>
                        //         Verse To:
                        //         <input
                        //             type="number"
                        //             value={editMode ? currentBookmark.verseTo : newBookmark.verseTo}
                        //             onChange={(e) =>
                        //                 editMode
                        //                     ? setCurrentBookmark({ ...currentBookmark, verseTo: e.target.value })
                        //                     : setNewBookmark({ ...newBookmark, verseTo: e.target.value })
                        //             }
                        //         />
                        //     </label>
                        //     <label>
                        //         Repeat Count:
                        //         <input
                        //             type="number"
                        //             value={editMode ? currentBookmark.repeatCount : newBookmark.repeatCount}
                        //             onChange={(e) =>
                        //                 editMode
                        //                     ? setCurrentBookmark({ ...currentBookmark, repeatCount: e.target.value })
                        //                     : setNewBookmark({ ...newBookmark, repeatCount: e.target.value })
                        //             }
                        //         />
                        //     </label>
                        //     <label>
                        //         Type:
                        //         <input
                        //             type="text"
                        //             value={editMode ? currentBookmark.type : newBookmark.type}
                        //             onChange={(e) =>
                        //                 editMode
                        //                     ? setCurrentBookmark({ ...currentBookmark, type: e.target.value })
                        //                     : setNewBookmark({ ...newBookmark, type: e.target.value })
                        //             }
                        //         />
                        //     </label>
                        // </div>
                    }
                    footer={
                        <>
                            <button className='submit-btn' onClick={handleSave}>Save</button>
                            <button className='submit-btn' onClick={handleCancel}>Cancel</button>
                        </>
                    }
                />
            )}

            {/* Modal for delete Confirmation */}
            {modalIsOpen && modalType === 'delete' && (
                <Modal
                    isOpen={modalIsOpen}
                    onClose={handleCancelDelete}
                    header={<h2>Confirm Deletion</h2>}
                    body={<p>Are you sure you want to delete this bookmark?</p>}
                    footer={
                        <div>
                            <button onClick={handleConfirmDelete}>Yes, Delete</button>
                            <button onClick={handleCancelDelete}>Cancel</button>
                        </div>
                    }
                />
            )}
        </div>
    );
};

export default Bookmarks;
