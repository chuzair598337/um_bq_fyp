import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import * as API from '../APIWrapper/APIWrapper';

const MusicContext = createContext();

const MusicProvider = ({ children }) => {
    const [seekValue, setSeekValue] = useState(0); // Seek value starts at 0
    const [volumeValue, setVolumeValue] = useState(100); // Volume starts at 100%
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // New states for playing multiple audio files
    const [audioFiles, setAudioFiles] = useState([]); // Audio files list
    const [currentAudio, setCurrentAudio] = useState(null); // Current Audio object
    const [currentIndex, setCurrentIndex] = useState(0); // Index of the current audio
    const [isRepeatOn, setIsRepeatOn] = useState(false); // Repeat toggle state

    // Load and play the first audio in the list when audio files are updated
    useEffect(() => {
        if (audioFiles.length > 0) {
            loadAudioAtIndex(0); // Load the first audio
        }
    }, [audioFiles]);

    // Load audio at the specified index
    const loadAudioAtIndex = (index) => {
        if (audioFiles[index]) {
            const newAudio = new Audio(audioFiles[index]);
            setCurrentAudio(newAudio);
            setCurrentIndex(index);

            // Set event listeners for the audio
            newAudio.onloadedmetadata = () => {
                setDuration(newAudio.duration);
                setCurrentTime(0);
                setSeekValue(0);
            };

            newAudio.ontimeupdate = () => {
                setCurrentTime(newAudio.currentTime);
                setSeekValue((newAudio.currentTime / newAudio.duration) * 100);
            };

            // Handle audio end event
            newAudio.onended = () => {
                if (isRepeatOn) {
                    play(); // If repeat is on, play the same audio again
                } else if (currentIndex < audioFiles.length - 1) {
                    playNext(); // Play next audio if it's not the last one
                } else {
                    stop(); // Stop if it's the last audio
                }
            };

            if (isPlaying) {
                newAudio.play();
            }
        }
    };

    // Play audio
    const play = () => {
        setIsPlaying(true);
        if (currentAudio) {
            currentAudio.play();
        }
    };

    // Pause audio
    const pause = () => {
        setIsPlaying(false);
        if (currentAudio) {
            currentAudio.pause();
        }
    };

    // Stop audio and reset
    const stop = () => {
        setIsPlaying(false);
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset time
            setCurrentTime(0);
        }
    };

    // Play the next audio
    const playNext = () => {
        if (currentIndex < audioFiles.length - 1) {
            loadAudioAtIndex(currentIndex + 1);
        } else {
            stop(); // If at the last audio, stop
        }
    };

    // Play the previous audio
    const playPrevious = () => {
        if (currentIndex > 0) {
            loadAudioAtIndex(currentIndex - 1);
        } else {
            stop(); // If at the first audio, stop
        }
    };

    // Toggle repeat mode
    const toggleRepeat = () => {
        setIsRepeatOn(!isRepeatOn);
    };

    // Handle seek value change and update currentTime of the audio element
    const handleSeekChange = (value) => {
        setSeekValue(value);
        if (currentAudio) {
            currentAudio.currentTime = (value / 100) * currentAudio.duration; // Adjust audio time
            setCurrentTime(currentAudio.currentTime); // Update currentTime state
        }
    };

    // Handle volume change and update audio element volume
    const handleVolumeChange = (value) => {
        setVolumeValue(value);
        if (currentAudio) {
            currentAudio.volume = value / 100; // Update the audio element volume
        }
    };

    // Handler for updating audio files from an API or static source
    const updateAudioFiles = useCallback(async (files) => {
        try {
            const tempList = [];
            for (const file of files) {
                if (file.found) { // Replace with your actual condition
                    const audioBlob = await API.fetchAudioFile(file.verseFileName);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    tempList.push(audioUrl);
                } else {
                    tempList.push(null); // If no audio is found, push null
                }
            }
            setAudioFiles(tempList);
        } catch (error) {
            console.error("Error fetching audio files:", error);
        }
    }, [setAudioFiles]);

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
                playNext,
                playPrevious,
                audioFiles,
                updateAudioFiles,
                isRepeatOn,
                toggleRepeat
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
