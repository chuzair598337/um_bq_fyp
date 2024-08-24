// ChainDetail.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchChainDetailById } from '../APIWrapper/APIWrapper';
import { createNotification } from '../Notification/Notification';

const ChainDetail = () => {
    const { chainID } = useParams(); // Retrieve chainID from URL
    const [chainDetail, setChainDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loadChainDetail = async () => {
        try {
            const data = await fetchChainDetailById(chainID);
            setChainDetail(data);
            setLoading(false);
        } catch (error) {
            createNotification('error', 'Failed to Load Chain', `Error: ${error.message}`);
            setError(error.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadChainDetail();
    }, [chainID]);

    const handleBack = () => {
        navigate('/chains'); // Navigate back to the chains list
    };

    if (loading) return <div>Loading...</div>;

    if (error) return <div>Error: {error}</div>;

    return (
        <div className="ChainDetail">
            {chainDetail.length > 0 ? (
                <div>
                    <table className='table'>
                        <caption>{chainDetail[0].chainTitle} Detail</caption>
                        <thead>
                            <tr>
                                <th scope="col">Surah</th>
                                <th scope="col">verse From</th>
                                <th scope="col">verse To</th>
                                <th scope="col">Repeat Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {chainDetail.map(detail => (
                                <tr key={detail.chainDetailID}>
                                    <td data-label="Surah">abc</td>
                                    <td data-label="verse From">{detail.verseFrom}</td>
                                    <td data-label="verse To">{detail.verseTo}</td>
                                    <td data-label="Repeat Count">{detail.repeatCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p>No details available for this chain.</p>
            )}
        </div>
    );
};

export default ChainDetail;
