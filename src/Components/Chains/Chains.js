// Chains.js
import React, { useState, useEffect } from 'react';
import { fetchChains, deleteChain, createChain, updateChain } from '../APIWrapper/APIWrapper';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlusSquare, faEdit,faCirclePause, faCirclePlay } from '@fortawesome/free-regular-svg-icons';

import { createNotification } from '../Notification/Notification';

const Chains = () => {
    const [chains, setChains] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // 'addUpdate', 'delete', or null
    const [editMode, setEditMode] = useState(false);
    const [currentChain, setCurrentChain] = useState({ chainID: null, chainTitle: '' });
    const [newChainTitle, setNewChainTitle] = useState('');
    const [confirmDelete, setConfirmDelete] = useState(null); // Store the chainID to delete
    const navigate = useNavigate();

    const [playingStates, setPlayingStates] = useState({});

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
        setNewChainTitle('');
        setModalType('addUpdate');
        setModalIsOpen(true);
    };

    const handleSave = async () => {
        try {
            if (editMode) {
                await updateChain(currentChain.chainID, { chainTitle: currentChain.chainTitle });
                
                createNotification('success', 'Chain Updated', 'The chain was successfully updated.');
                console.log('Chain Updated Successfuly');
            } else {
                await createChain({ chainTitle: newChainTitle });
                createNotification('success', 'Chain Created', 'The new chain was successfully created.');
                console.log('Cretaed New Chain')
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
        setPlayingStates((prevStates) => ({
          ...prevStates,
          [surahID]: !prevStates[surahID] // Toggle the state for the specific Surah
        }));
        // You can add code here to play the Surah audio
      };

    return (

        <div className="Container">
            <div className='containerHeader'>
                <h2 className='containerTitle'>Chains</h2>
                <div className='actionButtons'>
                    <FontAwesomeIcon
                        icon={faPlusSquare}
                        size='2x'
                        onClick={() => handleAdd()}
                        title='Delete'
                    />
                </div>
            </div>
            <ul className="containerList">
                {chains.map(chain => (
                    <li
                        key={chain.chainID}
                        className="card"
                    >
                        <div className='cardContent' onClick={() => handleChainClick(chain.chainID)}>
                            <span className="cardTitleEnglish">{chain.chainTitle}</span>
                        </div>
                        <span className='actionButtons'>
                            <FontAwesomeIcon
                                icon={playingStates[chain.chainID] ? faCirclePause : faCirclePlay}
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
                        <div>
                            <label>
                                Chain Title:
                                <input
                                    type="text"
                                    value={editMode ? currentChain.chainTitle : newChainTitle}
                                    onChange={(e) =>
                                        editMode
                                            ? setCurrentChain({ ...currentChain, chainTitle: e.target.value })
                                            : setNewChainTitle(e.target.value)
                                    }
                                />
                            </label>
                        </div>
                    }
                    footer={
                        <div>
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    }
                />
            )}

            {/* Modal for delete Conformation. */}
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

export default Chains;
