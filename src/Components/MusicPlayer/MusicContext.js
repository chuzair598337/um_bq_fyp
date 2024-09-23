import React, { createContext, useState, useContext, useCallback, useEffect, useRef } from 'react';
import * as API from '../APIWrapper/APIWrapper';

const MusicContext = createContext();

const MusicProvider = ({ children }) => {
    const [seekValue, setSeekValue] = useState(0);
    const [volumeValue, setVolumeValue] = useState(100);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [audioFiles, setAudioFiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isRepeatOn, setIsRepeatOn] = useState(false);

    const [isTilawat, setIsTilawat] = useState(false);

    const audioRef = useRef(new Audio());

    useEffect(() => {
        const audio = audioRef.current;

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
            setCurrentTime(0);
            setSeekValue(0);
        };

        const handleTimeUpdate = () => {
            if (!isNaN(audio.currentTime) && !isNaN(audio.duration)) {
                setCurrentTime(audio.currentTime);
                setSeekValue((audio.currentTime / audio.duration) * 100);
            }
        };

        const handleAudioEnd = () => {
            if (isRepeatOn) {
                audio.play(); // Repeat the current audio
            } else if (currentIndex < audioFiles.length - 1) {
                playNext(); // Play the next audio
            } else {
                stop(); // Stop if it's the last audio
            }
        };

        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleAudioEnd);

        return () => {
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleAudioEnd);
        };
    }, [audioFiles, currentIndex, isRepeatOn]);

    const stop = () => {
        const audio = audioRef.current;
        audio.pause();
        audio.currentTime = 0;
        setIsPlaying(false);
    };

    const handlePlayPause = () => {
        const audio = audioRef.current;

        // Check if the audio source is null or invalid
        if (!audioFiles[currentIndex] || audioFiles[currentIndex] === null) {
            alert("Audio source not Found. Cannot play.");
            return;
        }

        try {
            if (isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }
            setIsPlaying(!isPlaying);
        } catch (error) {
            console.error("Error playing audio:", error);
        }
    };

    const playNext = () => {
        stop();
        if (currentIndex < audioFiles.length - 1) {
            const nextIndex = currentIndex + 1;

            // Check if the next audio file exists and is valid
            if (!audioFiles[nextIndex] || audioFiles[nextIndex] === null) {
                alert("Audio source not Found. Cannot play.");
                return;
            }

            setCurrentIndex(nextIndex);
            audioRef.current.src = audioFiles[nextIndex];

            try {
                audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Error playing next audio:", error);
            }
        }
    };

    const playPrevious = () => {
        stop();
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;

            // Check if the previous audio file exists and is valid
            if (!audioFiles[prevIndex] || audioFiles[prevIndex] === null) {
                alert("Audio source not Found. Cannot play.");
                return;
            }

            setCurrentIndex(prevIndex);
            audioRef.current.src = audioFiles[prevIndex];

            try {
                audioRef.current.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Error playing previous audio:", error);
            }
        }
    };

    const toggleRepeat = () => {
        setIsRepeatOn(!isRepeatOn);
    };

    const handleSeekChange = (value) => {
        setSeekValue(value);
        const audio = audioRef.current;
        audio.currentTime = (value / 100) * audio.duration;
        setCurrentTime(audio.currentTime);
    };

    const handleVolumeChange = (value) => {
        setVolumeValue(value);
        const audio = audioRef.current;
        audio.volume = value / 100;
    };

    const updateAudioFiles = useCallback(async (files) => {
        console.log(files)
        try {
            const tempList = [];
            for (const file of files) {
                if (file.found) {
                    const audioBlob = await API.fetchAudioFile(file.verseFileName, isTilawat ? true : false);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    tempList.push(audioUrl);
                } else {
                    tempList.push(null);
                }
            }
            setAudioFiles(tempList);
            if (tempList.length > 0) {
                audioRef.current.src = tempList[0]; // Load the first audio
                setCurrentIndex(0); // Set the index to the first file
                try {
                    await audioRef.current.play(); // Auto-start playing the first audio
                    setIsPlaying(true);
                } catch (error) {
                    console.error("Error playing the first audio:", error);
                }
            }
        } catch (error) {
            console.error("Error fetching audio files:", error);
        }
    }, [setAudioFiles,isTilawat]);

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
                handlePlayPause,
                stop,
                playNext,
                playPrevious,
                audioFiles,
                updateAudioFiles,
                isRepeatOn,
                toggleRepeat,
                currentIndex,
                setIsTilawat
            }}
        >
            {children}
        </MusicContext.Provider>
    );
};

const useMusic = () => {
    const context = useContext(MusicContext);
    if (context === undefined) {
        throw new Error('useMusic must be used within a MusicProvider');
    }
    return context;
};

export { MusicProvider, useMusic };
