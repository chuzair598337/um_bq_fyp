// ChainDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChainDetailById } from '../APIWrapper/APIWrapper';
import { createNotification } from '../Notification/Notification';

const ChainDetail = () => {
    const { chainID } = useParams(); // Retrieve chainID from URL
    const [chain, setChain] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadChainDetail = async () => {
            try {
                const data = await fetchChainDetailById(chainID);
                setChain(data);
                setLoading(false);
            } catch (error) {
                createNotification('error', 'Failed to Load Chain', `Error: ${error.message}`);
                console.error('Failed to fetch chain detail:', error);
                setLoading(false);
            }
        };
        loadChainDetail();
    }, [chainID]);

    const handleBack = () => {
        navigate('/chains'); // Navigate back to the chains list
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="ChainDetail">
            <h2>Chain Detail</h2>
            {chain ? (
                <div>
                    <p><strong>ID:</strong> {chain.chainID}</p>
                    <p><strong>Title:</strong> {chain.chainTitle}</p>
                    {/* Display other chain details */}
                </div>
            ) : (
                <p>Empty Chain.</p>
            )}
            <button onClick={handleBack}>Back to Chains</button>
        </div>
    );
};

export default ChainDetail;
