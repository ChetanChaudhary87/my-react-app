import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, searchedcourse }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Course Details:</h2>
        <p>Course Code: {searchedcourse?.course_code}</p>
        <p>Title: {searchedcourse?.title}</p>
        <p>Description: {searchedcourse?.description}</p>
      </div>
    </div>
  );
};

export default Modal;
