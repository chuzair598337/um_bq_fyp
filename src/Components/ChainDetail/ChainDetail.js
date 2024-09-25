// // ChainDetail.js
// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { fetchChainDetailById } from '../APIWrapper/APIWrapper';
// import { createNotification } from '../Notification/Notification';

// const ChainDetail = () => {
//     const { chainID } = useParams(); // Retrieve chainID from URL
//     const [chainDetail, setChainDetail] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const navigate = useNavigate();

//     const loadChainDetail = async () => {
//         try {
//             const data = await fetchChainDetailById(chainID);
//             setChainDetail(data);
//             setLoading(false);
//         } catch (error) {
//             createNotification('error', 'Failed to Load Chain', `Error: ${error.message}`);
//             setError(error.message);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         loadChainDetail();
//     }, [chainID]);

//     const handleBack = () => {
//         navigate('/chains'); // Navigate back to the chains list
//     };

//     if (loading) return <div>Loading...</div>;

//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div className="ChainDetail">
//             {chainDetail.length > 0 ? (
//                 <div>
//                     <table className='table'>
//                         <caption>{chainDetail[0].chainTitle} Detail</caption>
//                         <thead>
//                             <tr>
//                                 <th scope="col">Surah</th>
//                                 <th scope="col">verse From</th>
//                                 <th scope="col">verse To</th>
//                                 <th scope="col">Repeat Count</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {chainDetail.map(detail => (
//                                 <tr key={detail.chainDetailID}>
//                                     <td data-label="Surah">abc</td>
//                                     <td data-label="verse From">{detail.verseFrom}</td>
//                                     <td data-label="verse To">{detail.verseTo}</td>
//                                     <td data-label="Repeat Count">{detail.repeatCount}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 </div>
//             ) : (
//                 <p>No details available for this chain.</p>
//             )}
//         </div>
//     );
// };

// export default ChainDetail;

import React, { useState, useEffect } from 'react';
import { fetchChainDetails, deleteChainDetail, createChainDetail, updateChainDetail, fetchSurahs } from '../APIWrapper/APIWrapper';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../Modal/Modal';
import './ChainDetail.css';
import * as API from '../../Components/APIWrapper/APIWrapper';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlusSquare, faEdit, faCirclePause, faCirclePlay } from '@fortawesome/free-regular-svg-icons';

import { createNotification } from '../Notification/Notification';

const ChainDetails = () => {
    const { chainID } = useParams();
    const [chainDetails, setChainDetails] = useState([]);
    const [surahs, setSurahs] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'addUpdate', 'delete', or null
    const [editMode, setEditMode] = useState(false);

    const [currentChainDetail, setCurrentChainDetail] = useState({
        chainDetailID: null,
        chainID: null,
        surahID: '',
        verseFrom: '',
        verseTo: '',
        repeatCount: 1,
        sequenceNo: ''
    });

    const [newChainDetail, setNewChainDetail] = useState({
        chainID: '',
        surahID: '',
        verseFrom: '',
        verseTo: '',
        repeatCount: 1,
        sequenceNo: ''
    });

    const [confirmDelete, setConfirmDelete] = useState(null); // Store the chainDetailID to delete
    const navigate = useNavigate();

    const loadChainDetails = async () => {
        try {
            const data = await API.fetchChainDetailById(chainID);
            setChainDetails(data);
        } catch (error) {
            console.error('Failed to fetch chain details:', error);
            createNotification('error', 'Failed to fetch chain details', `Error: ${error.message}`);
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
        loadChainDetails();
        loadSurahs(); // Load available surahs for selection
    }, []);

    const handleChainDetailClick = (chainDetailID) => {
        // navigate(`/chaindetail/${chainDetailID}`);
    };

    const handleDelete = async (chainDetailID) => {
        setConfirmDelete(chainDetailID); // Set the chainDetailID to be deleted
        setModalIsOpen(true);
        setModalType('delete');
    };

    const handleConfirmDelete = async () => {
        if (confirmDelete !== null) {
            try {
                await deleteChainDetail(confirmDelete);
                createNotification('success', 'Chain Detail Deleted', 'The chain detail was successfully deleted.');
                await loadChainDetails(); // Refresh the data after deletion
            } catch (error) {
                createNotification('error', 'Operation Failed', `Failed to delete chain detail: ${error.message}`);
                console.error('Failed to delete chain detail:', error);
            }
            setConfirmDelete(null); // Clear the chainDetailID
        }
        setModalIsOpen(false); // Close the confirmation modal
    };

    const handleCancelDelete = () => {
        setConfirmDelete(null); // Clear the chainDetailID
        setModalIsOpen(false); // Close the confirmation modal
        setModalType(null);
    };

    const handleEdit = (chainDetail) => {
        setCurrentChainDetail(chainDetail);
        setEditMode(true);
        setModalType('addUpdate');
        setModalIsOpen(true);
    };

    const handleAdd = () => {
        setEditMode(false);
        setNewChainDetail({
            chainID: '',
            surahID: '',
            verseFrom: '',
            verseTo: '',
            repeatCount: 1,
            sequenceNo: ''
        });
        setModalType('addUpdate');
        setModalIsOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editMode) {
                await updateChainDetail(currentChainDetail.chainDetailID, { ...currentChainDetail });
                createNotification('success', 'Chain Detail Updated', 'The chain detail was successfully updated.');
            } else {
                await createChainDetail(newChainDetail);
                createNotification('success', 'Chain Detail Created', 'The new chain detail was successfully created.');
            }
            await loadChainDetails(); // Refresh the data after save
        } catch (error) {
            createNotification('error', 'Operation Failed', `Failed to save chain detail: ${error.message}`);
            console.error('Failed to save chain detail:', error);
        }
        setModalIsOpen(false);
    };

    const handleCancel = () => {
        setModalIsOpen(false);
        setModalType(null);
    };

    return (
        <div className="Container">
            <div className='containerHeader'>
                <h2 className='containerTitle'>Chain Details</h2>
                <div className='action-buttons'>
                    <FontAwesomeIcon
                        icon={faPlusSquare}
                        size='2x'
                        onClick={handleAdd}
                        className="icon"
                        title='Add Chain Detail'
                    />
                </div>
            </div>
            <ul className="containerList">
                {chainDetails.map(chainDetail => (
                    <li key={chainDetail.chainDetailID} className="card">
                        <div className="card-content">
                            <div className="card-title">
                                {surahs.find(surah => surah.surahID === chainDetail.surahID)?.surahEnglishName || 'Unknown Surah'}
                            </div>
                            <div className="cardContent">
                                <div className="card-details"> <strong> Verses: </strong> {chainDetail.verseFrom} - {chainDetail.verseTo}</div>
                                <div className="card-details"><strong>Repeat: </strong>  {chainDetail.repeatCount} times</div>
                            </div>
                        </div>
                        <span className="action-buttons">
                            <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => handleEdit(chainDetail)}
                                className="icon"
                                title="Edit"
                            />
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                onClick={() => handleDelete(chainDetail.chainDetailID)}
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
                    header={<h2>{editMode ? 'Edit Chain Detail' : 'Add New Chain Detail'}</h2>}
                    body={

                        <div className="modal-form">
                            <label style={{ display: 'none' }}>
                                Chain ID:
                                <input
                                    type="number"
                                    value={chainID}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentChainDetail({ ...currentChainDetail, chainID: e.target.value })
                                            : setNewChainDetail({ ...newChainDetail, chainID: e.target.value })
                                    }
                                />
                            </label>


                            <label>
                                Surah:
                                <select
                                    value={editMode ? currentChainDetail.surahID : newChainDetail.surahID}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentChainDetail({ ...currentChainDetail, surahID: e.target.value })
                                            : setNewChainDetail({ ...newChainDetail, surahID: e.target.value })
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
                                    value={editMode ? currentChainDetail.verseFrom : newChainDetail.verseFrom}
                                    onChange={(e) => editMode
                                        ? setCurrentChainDetail({ ...currentChainDetail, verseFrom: e.target.value })
                                        : setNewChainDetail({ ...newChainDetail, verseFrom: e.target.value })
                                    }
                                />
                            </label>

                            <label>
                                Verse To:
                                <input
                                    type="number"
                                    value={editMode ? currentChainDetail.verseTo : newChainDetail.verseTo}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentChainDetail({ ...currentChainDetail, verseTo: e.target.value })
                                            : setNewChainDetail({ ...newChainDetail, verseTo: e.target.value })
                                    }
                                />
                            </label>

                            <label>
                                Repeat Count:
                                <input
                                    type="number"
                                    value={editMode ? currentChainDetail.repeatCount : newChainDetail.repeatCount}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentChainDetail({ ...currentChainDetail, repeatCount: parseInt(e.target.value) })
                                            : setNewChainDetail({ ...newChainDetail, repeatCount: parseInt(e.target.value) })
                                    }
                                />
                            </label>

                            <label>
                                Sequence No:
                                <input
                                    type="number"
                                    value={editMode ? currentChainDetail.sequenceNo : newChainDetail.sequenceNo}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentChainDetail({ ...currentChainDetail, sequenceNo: e.target.value })
                                            : setNewChainDetail({ ...newChainDetail, sequenceNo: e.target.value })
                                    }
                                />
                            </label>
                        </div>
                    }
                    footer={
                        <>
                            <button className='modal-submit-btn' onClick={handleSave}>Save</button>
                            <button className='modal-submit-btn' onClick={handleCancel}>Cancel</button>
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
                    body={<p>Are you sure you want to delete this chain detail?</p>}
                    footer={
                        <>
                            <button className='modal-submit-btn' onClick={handleConfirmDelete}>Yes, Delete</button>
                            <button className='modal-submit-btn' onClick={handleCancelDelete}>Cancel</button>
                        </>
                    }
                />
            )}
        </div>
    );
};

export default ChainDetails;

