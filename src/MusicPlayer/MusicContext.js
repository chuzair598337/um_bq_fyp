// MusicContext.js
import React, { createContext, useState, useContext } from 'react';

const MusicContext = createContext();

const MusicProvider = ({ children }) => {

    const [seekValue, setSeekValue] = useState(50);
    const [volumeValue, setVolumeValue] = useState(50)
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleSeekChange = (value) => setSeekValue(value);
    const handleVolumeChange = (value) => setVolumeValue(value);

    const play = () => setIsPlaying(true);

    const pause = () => setIsPlaying(false);

    const stop = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

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
                stop
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
