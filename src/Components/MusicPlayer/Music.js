import React, { useEffect } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './Music.css';
import { useMusic } from './MusicContext';
import formatTime from '../../utils/formatTime';

function Music() {
    const {
        seekValue,
        volumeValue,
        isPlaying,
        currentTime,
        duration,
        handleSeekChange,
        handleVolumeChange,
        handlePlayPause,
        playNext,
        playPrevious,
        audioFiles,
        updateAudioFiles,
        isRepeatOn,
        toggleRepeat,
        currentIndex
    } = useMusic();

    // Fetch and update audio files when component mounts
    useEffect(() => {
        const files = [
            // { verseFileName: '001001.mp3', found: true },
            // { verseFileName: '001002.mp3', found: true },
            // { verseFileName: '001003.mp3', found: true },
            // { verseFileName: '001004.mp3', found: true },
            // { verseFileName: '001005.mp3', found: true },
            // { verseFileName: '001006.mp3', found: true },
            // { verseFileName: '001007.mp3', found: true }

        ];
        updateAudioFiles(files); // Fetch audio files from API
    }, [updateAudioFiles]);

    // Only show the player if there are audio files
    if (audioFiles.length === 0) {
        return null; // Return null to hide the player when no audio files are present
    }

    return (
        <div className="player">
            <div className="player-wrapper">
                <div className="details">
                    <div className="now-playing">PLAYING {currentIndex} OF {audioFiles.length}</div>
                    <div className="track-name">
                        <div className="track-english-name">Track English</div>
                        <div className="track-arabic-name">Track Arabic</div>
                    </div>
                    <div className="track-meaning">Track meaning</div>
                </div>

                <div className="slider_container">
                    <div className="current-time">{formatTime(currentTime)}</div>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={seekValue}
                        onChange={(e) => handleSeekChange(e.target.value)}
                        style={{
                            background: `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${seekValue}%, #DEE2E6 ${seekValue}%, #DEE2E6 100%)`
                        }}
                        className="seek_slider"
                    />
                    <div className="total-duration">{formatTime(duration)}</div>
                </div>

                <div className="slider_container">
                    <i className="fas fa-volume-down"></i>
                    <input
                        type="range"
                        min="1"
                        max="100"
                        value={volumeValue}
                        onChange={(e) => handleVolumeChange(e.target.value)}
                        className="volume_slider"
                        style={{
                            background: `linear-gradient(to right, #82CFD0 0%, #82CFD0 ${volumeValue}%, #DEE2E6 ${volumeValue}%, #DEE2E6 100%)`
                        }}
                    />
                    <i className="fas fa-volume-up"></i>
                </div>

                <div className="buttons">
                    <div className="repeat-track">
                        <i
                            className={`fas fa-repeat ${isRepeatOn ? 'active' : ''}`} // Add class for active state
                            title="repeat"
                            onClick={toggleRepeat} // Toggle repeat when clicked
                        ></i>
                    </div>
                    <div className="prev-track">
                        <i
                            className={`fas fa-step-backward ${currentIndex === 0 ? 'disabledButton' : ''}`}
                            title="Play Previous"
                            onClick={currentIndex === 0 ? null : playPrevious} // Disable click if at the first track
                        ></i>
                    </div>
                    <div className="playpause-track">
                        <i
                            className={`fas fa-${isPlaying ? 'pause' : 'play'}-circle fa-2x`}
                            onClick={handlePlayPause} // Play or pause depending on the current state
                            title="Play/Pause"
                        ></i>
                    </div>
                    <div className="next-track">
                        <i
                            className={`fas fa-step-forward ${currentIndex === audioFiles.length - 1 ? 'disabledButton' : ''}`}
                            title="Play Next"
                            onClick={currentIndex === audioFiles.length - 1 ? null : playNext} // Disable click if at the last track
                        ></i>
                    </div>
                    <div className="random-track">
                        <i className="fas fa-random" title="random"></i>
                    </div>
                </div>

                <div id="wave">
                    <span className="stroke"></span>
                    <span className="stroke"></span>
                    <span className="stroke"></span>
                    <span className="stroke"></span>
                    <span className="stroke"></span>
                    <span className="stroke"></span>
                    <span className="stroke"></span>
                </div>
            </div>
        </div>
    );
}

export default Music;
