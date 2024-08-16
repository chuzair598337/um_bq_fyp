import React, { useState, useRef } from 'react';
import "./Recordbtn.css";
const sendAudioToServer = async (audioBlob) => {
  const formData = new FormData();
  formData.append('file', audioBlob, 'recording.wav');

  try {
    const response = await fetch('http://127.0.0.1:5000/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('Audio uploaded successfully');
      const result = await response.json();
      console.log(result);
      return result;
    } else {
      console.error('Failed to upload audio');
      return null;
    }
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};

const Recordbtn = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [message, setMessage] = useState('');
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const buttonRef = useRef(null);

  const handleMouseDown = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        // Save the recording
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);

        // Send the recording to the Flask API
        const result = await sendAudioToServer(audioBlob);
        if (result) {
          setMessage(result.message || 'Audio uploaded successfully');
        } else {
          setMessage('Failed to upload audio');
        }
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } else {
      alert('Your browser does not support audio recording.');
    }
  };

  const handleMouseUp = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div>
      <button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onTouchStart={handleMouseDown}
        onTouchEnd={handleMouseUp}
        className={`button ${isRecording ? 'recording' : 'not-recording'}`}
      >
        {isRecording ? 'Recording...' : 'Hold to Record'}
      </button>
      {audioUrl && (
        <audio controls src={audioUrl} className="audio-controls">
          Your browser does not support the audio element.
        </audio>
      )}
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default Recordbtn;
