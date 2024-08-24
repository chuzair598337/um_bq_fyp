// MusicContext.js
import React, { createContext, useState, useContext, useCallback } from 'react';
import * as API from '../APIWrapper/APIWrapper';

const MusicContext = createContext();

const MusicProvider = ({ children }) => {

    const [seekValue, setSeekValue] = useState(50);
    const [volumeValue, setVolumeValue] = useState(50)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    //state for audio files
    const [audioFiles, setAudioFiles] = useState([]);

    const handleSeekChange = (value) => setSeekValue(value);
    const handleVolumeChange = (value) => setVolumeValue(value);

    const play = () => setIsPlaying(true);

    const pause = () => setIsPlaying(false);

    const stop = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    // Handler for updating audio files
    const updateAudioFiles = useCallback(async (files) => {
        setAudioFiles(files);
        try {
            for (const file of files) {
                if (file.shouldFetch) { // Replace with your actual condition
                    const audioBlob = await API.fetchAudioFile(file.filename);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    // Update the file with the new URL
                    setAudioFiles(prev => prev.map(f => f.filename === file.filename ? { ...f, audioUrl } : f));
                    console.log(`Fetched ${file.filename}`);
                }
            }
        } catch (error) {
            console.error("Error fetching audio files:", error);
        }
    }, []);


    return (
        <MusicContext.Provider
            value={{
                seekValue,
                volumeValue,
                isPlaying,
                currentTime,
                duration,
                handleSeekChange,
                handleVolumeChange,
                play,
                pause,
                stop,
                audioFiles,
                updateAudioFiles
            }}
        >
            {children}
        </MusicContext.Provider>
    );
};

// Custom hook for using context
const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};

export { MusicProvider, useMusic };
