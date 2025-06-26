import React, { useState } from 'react';
import './Modal.css';

const ModalCustom = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;

    return (
        <div className="overlay">
            <div className="modal">
                <div className="header-modal">
                    <p>{title}</p>
                    <button className="close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default ModalCustom;