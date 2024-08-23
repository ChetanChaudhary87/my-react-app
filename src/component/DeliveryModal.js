import React from 'react';
import './Modal.css';

const DeliveryModal = ({ isOpen, onClose, searchedCourseDeliveryDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>X</button>
        <h2>Course Delivery Details:</h2>
        <p>Course Code: {searchedCourseDeliveryDetails?.courseCode}</p>
        <p>Title: {searchedCourseDeliveryDetails?.courseTitle}</p>
        <p>Description: {searchedCourseDeliveryDetails?.coursedescription}</p>
        <p>Semester: {searchedCourseDeliveryDetails?.semesterOfDelivery}</p>
        <p>Year: {searchedCourseDeliveryDetails?.yearOfDelivery}</p>
      </div>
    </div>
  );
};

export default DeliveryModal;
