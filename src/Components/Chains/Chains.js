// Chains.js
import React, { useState, useEffect } from 'react';
import { fetchChains, deleteChain, createChain, updateChain } from '../APIWrapper/APIWrapper';
import Modal from 'react-modal';
import { Container, Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import "./Chains.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPlusSquare, faEdit } from '@fortawesome/free-regular-svg-icons';


const Chains = () => {
    const [chains, setChains] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentChain, setCurrentChain] = useState({ id: null, title: '' });
    const [newChainTitle, setNewChainTitle] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        const loadChains = async () => {
            try {
                const data = await fetchChains();
                setChains(data);
            } catch (error) {
                console.error('Failed to fetch chains:', error);
            }
        };
        loadChains();
    }, []);

    const handleChainClick = (chainID) => {
        navigate(`/chaindetail/${chainID}`)
    }

    const handleDelete = async (id) => {
        try {
            await deleteChain(id);
            setChains(chains.filter(chain => chain.id !== id));
        } catch (error) {
            console.error('Failed to delete chain:', error);
        }
    };

    const handleEdit = (chain) => {
        setCurrentChain(chain);
        setEditMode(true);
        setModalIsOpen(true);
    };

    const handleAdd = () => {
        setEditMode(false);
        setNewChainTitle('');
        setModalIsOpen(true);
    };

    const handleSave = async () => {
        if (editMode) {
            try {
                await updateChain(currentChain.id, { title: currentChain.title });
                setChains(chains.map(chain => chain.id === currentChain.id ? currentChain : chain));
            } catch (error) {
                console.error('Failed to update chain:', error);
            }
        } else {
            try {
                const newChain = await createChain({ title: newChainTitle });
                setChains([...chains, newChain]);
            } catch (error) {
                console.error('Failed to create chain:', error);
            }
        }
        setModalIsOpen(false);
    };

    const handleCancel = () => {
        setModalIsOpen(false);
    };

    return (

        <div className="Container">
            <div className='containerTitle'>
                <h2>Chains</h2>
                <FontAwesomeIcon
                    class="btn-info"
                    icon={faPlusSquare}
                    size='2x'
                    onClick={() => handleAdd()}
                    title='Delete'
                />
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
                                icon={faEdit}
                                onClick={() => handleEdit(chain)}
                                title='Edit'
                            />
                            <FontAwesomeIcon
                                icon={faTrashCan}
                                onClick={() => handleDelete(chain.chainID)}
                                title='Delete'
                            />
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Chains;
