// Chains.js
import React, { useState, useEffect } from 'react';
import { fetchChains, deleteChain, createChain, updateChain } from '../APIWrapper/APIWrapper';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlusSquare, faEdit, faCirclePause, faCirclePlay } from '@fortawesome/free-regular-svg-icons';

import { createNotification } from '../Notification/Notification';

const Chains = () => {
    const [chains, setChains] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'addUpdate', 'delete', or null
    const [editMode, setEditMode] = useState(false);

    // Update initial state with new fields
    const [currentChain, setCurrentChain] = useState({ chainID: null, chainTitle: '', type: '', repeatCount: 1 });
    const [newChain, setNewChain] = useState({ chainID: '', chainTitle: '', type: '', repeatCount: 1 });
    
    const [confirmDelete, setConfirmDelete] = useState(null); // Store the chainID to delete
    const navigate = useNavigate();

    const loadChains = async () => {
        try {
            const data = await fetchChains();
            setChains(data);
        } catch (error) {
            console.error('Failed to fetch chains:', error);
        }
    };

    useEffect(() => {
        loadChains();
    }, []);

    const handleChainClick = (chainID) => {
        navigate(`/chaindetail/${chainID}`);
    };

    const handleDelete = async (chainID) => {
        setConfirmDelete(chainID); // Set the chainID to be deleted
        setModalIsOpen(true);
        setModalType('delete');
    };

    const handleConfirmDelete = async () => {
        if (confirmDelete !== null) {
            try {
                await deleteChain(confirmDelete);
                createNotification('success', 'Chain Deleted', 'The chain was successfully deleted.');
                await loadChains(); // Refresh the data after deletion
            } catch (error) {
                createNotification('error', 'Operation Failed', `Failed to delete chain: ${error.message}`);
                console.error('Failed to delete chain:', error);
            }
            setConfirmDelete(null); // Clear the chainID
        }
        setModalIsOpen(false); // Close the confirmation modal
    };

    const handleCancelDelete = () => {
        setConfirmDelete(null); // Clear the chainID
        setModalIsOpen(false); // Close the confirmation modal
        setModalType(null);
    };

    const handleEdit = (chain) => {
        setCurrentChain(chain);
        setEditMode(true);
        setModalType('addUpdate');
        setModalIsOpen(true);
    };

    const handleAdd = () => {
        setEditMode(false);
        setNewChain({ chainID: '', chainTitle: '', type: '', repeatCount: 1 })
        setModalType('addUpdate');
        setModalIsOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editMode) {
                await updateChain(currentChain.chainID, {
                    chainTitle: currentChain.chainTitle,
                    type: currentChain.type,
                    repeatCount: currentChain.repeatCount
                });

                createNotification('success', 'Chain Updated', 'The chain was successfully updated.');
                console.log('Chain Updated Successfully');
            } else {
                await createChain(newChain);
                createNotification('success', 'Chain Created', 'The new chain was successfully created.');
                console.log('Created New Chain');
            }
            await loadChains(); // Refresh the data after save
        } catch (error) {
            createNotification('error', 'Operation Failed', `Failed to save chain: ${error.message}`);
            console.error('Failed to save chain:', error);
        }
        setModalIsOpen(false);
    };

    const handleCancel = () => {
        setModalIsOpen(false);
        setModalType(null);
    };

    const playPause = (surahID) => {

        // You can add code here to play the Surah audio
    };

    return (

        <div className="Container">
            <div className='containerHeader'>
                <h2 className='containerTitle'>Chains</h2>
                <div className='action-buttons'>
                    <FontAwesomeIcon
                        icon={faPlusSquare}
                        size='2x'
                        onClick={() => handleAdd()}
                        className="icon"
                        title='Add'
                    />
                </div>
            </div>
            <ul className="containerList">
                {chains.map(chain => (
                    <li
                        key={chain.chainID}
                        className="card"
                    >
                        <div className='card-content' onClick={() => handleChainClick(chain.chainID)}>
                            <div className="card-title">{chain.chainTitle}</div>
                            <div className="cardContent">
                                <div className="card-details"><strong>Repeat : </strong>{chain.repeatCount}</div>
                            </div>
                            <div className={`card-type ${chain.type.toLowerCase()}`}>
                                {chain.type}
                            </div>

                        </div>
                        <span className='action-buttons'>
                            <FontAwesomeIcon
                                icon={faCirclePlay}
                                className="icon"
                                onClick={() => playPause(chain.chainID)}
                            />
                            <FontAwesomeIcon
                                icon={faEdit}
                                onClick={() => handleEdit(chain)}
                                className="icon"
                                title='Edit'
                            />
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                onClick={() => handleDelete(chain.chainID)}
                                className="icon"
                                title='Delete'
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
                    header={<h2>{editMode ? 'Edit Chain' : 'Add New Chain'}</h2>}
                    body={
                        <div className="modal-form">
                            <label>
                                Chain Title:
                                <input
                                    type="text"
                                    value={editMode ? currentChain.chainTitle : newChain.chainTitle}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentChain({ ...currentChain, chainTitle: e.target.value })
                                            : setNewChain({...newChain,chainTitle : e.target.value})
                                    }
                                />
                            </label>
                            {/* New fields for type and repeatCount */}
                            <label>
                                Type:
                                <select
                                    value={editMode ? currentChain.type : newChain.type}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentChain({ ...currentChain, type: e.target.value })
                                            : setNewChain({...newChain,type : e.target.value})
                                    }
                                >
                                    <option value="tilawat">Tilawat</option>
                                    <option value="bayan">Bayan</option>
                                </select>
                            </label>

                            <label>
                                Repeat Count:
                                <input
                                    type="number"
                                    value={editMode ? currentChain.repeatCount : newChain.repeatCount}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentChain({ ...currentChain, repeatCount: parseInt(e.target.value) })
                                            : setNewChain({ ...newChain, repeatCount: parseInt(e.target.value) })
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

            {/* Modal for delete confirmation */}
            {modalIsOpen && modalType === 'delete' && (
                <Modal
                    isOpen={modalIsOpen}
                    onClose={handleCancelDelete}
                    header={
                        <h2>Confirm Deletion</h2>
                    }
                    body={
                        <p>Are you sure you want to delete this chain?</p>
                    }
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

export default Chains;
