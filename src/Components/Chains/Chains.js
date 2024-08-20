// Chains.js
import React, { useState, useEffect } from 'react';
import { fetchChains, deleteChain, createChain, updateChain } from '../APIWrapper/APIWrapper';
import Modal from 'react-modal';
import { Container, Button, Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

import "./Chains.css"

const Chains = () => {
    const [chains, setChains] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentChain, setCurrentChain] = useState({ id: null, title: '' });
    const [newChainTitle, setNewChainTitle] = useState('');

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
        <div class="chainContainer">
            <div class="table-wrapper">
                <div class="table-title">
                    <h2>Chains</h2>
                    <button type="button" class="btn-info">
                        <FaPlus />
                    </button>
                </div>
                <table className='chainTable'>
                    <thead>
                        <tr>
                            <th colSpan={2}>Chains List</th>
                        </tr>
                    </thead>
                    <tbody>
                        {chains.map((chain) => (
                            <tr key={chain.chainID}>
                                <td>{chain.chainTitle}</td>
                                <td class="actions">
                                    <FaEdit className='editBtn actionsBtn' onClick={() => handleEdit(chain)} title='Edit' />
                                    <FaTrash className='deleteBtn actionsBtn' onClick={() => handleDelete(chain.chainID)} title='Delete' />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Chains;
