import React from "react";
import "./Modal.css"; // Import the CSS file

const Modal = ({ isOpen, onClose, header, body, footer }) => {
    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <article className="modal-container">
                <div className="modal-content" onClick={(e) => e.stopPropagation()}>

                    <header className="modal-container-header">
                        {header}
                    </header>
                    <div className="modal-body">
                        {body}
                    </div>
                    <div className="modal-footer">
                        {footer}
                    </div>
                </div>

            </article>
        </div>
    );
};

export default Modal;
