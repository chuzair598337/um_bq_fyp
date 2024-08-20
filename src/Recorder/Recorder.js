import React, { useState } from 'react'
import "./Recorder.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';

export default function Recorder() {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        setIsPressed(false); 
    };

    const handleMouseDown = () => {
        setIsPressed(true);
    };

    const handleMouseUp = () => {
        setIsPressed(false);
    };


    return (
        <>

            {/* <div className='record_panal'>
                <div className="roundedRecorderIcon">
                <FontAwesomeIcon icon={faMicrophone} size='2x' />
                </div>
            </div> */}

            <div class="right-corder-container">
                <button
                    className="right-corder-container-button"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                >
                    <span className="short-text">
                        <FontAwesomeIcon icon={faMicrophone} />
                    </span>
                    <span className={`long-text ${isHovered ? 'show-long-text' : ''}`}>
                        {!isPressed && <>Record</>}
                        {isPressed && <>Recording...</>}
                    </span>
                </button>
            </div>

        </>
    )
}
