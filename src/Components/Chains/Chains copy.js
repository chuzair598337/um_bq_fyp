// Chains.js
import React, { useState, useEffect } from 'react';
import { fetchChains, deleteChain, createChain, updateChain } from '../APIWrapper/APIWrapper';
import Modal from 'react-modal';
import {Button, Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

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
        <div>
            <button onClick={handleAdd} className="btn btn-primary">
                <FaPlus /> Add Chain
            </button>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Chain Title</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {chains.map((chain) => (
                        <tr key={chain.chainID}>
                            <td>{chain.chainTitle}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDelete(chain.chainID)}
                                >
                                    <i className="fa fa-trash" aria-hidden="true"></i>
                                </Button>
                                <Button
                                    variant="warning"
                                    onClick={() => handleEdit(chain)}
                                    className="ml-2"
                                >
                                    <i className="fa fa-pencil" aria-hidden="true"></i>
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Modal isOpen={modalIsOpen} onRequestClose={handleCancel} contentLabel="Chain Modal">
                <h2>{editMode ? 'Edit Chain' : 'Add Chain'}</h2>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={editMode ? currentChain.title : newChainTitle}
                        onChange={(e) => {
                            if (editMode) {
                                setCurrentChain({ ...currentChain, title: e.target.value });
                            } else {
                                setNewChainTitle(e.target.value);
                            }
                        }}
                    />
                </div>
                <div>
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </Modal>
        </div>
    );
};

export default Chains;
