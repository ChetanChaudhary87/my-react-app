import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CourseDeliveryTable(coursesDeliveryDetails){

  const handleDelete = (yearOfDelivery,semesterOfDelivery,courseId) => {
    // Make DELETE request to backend
    axios.delete(`http://localhost:8080/api/courses/${yearOfDelivery}/${semesterOfDelivery}/${courseId}`)
        .then(response => {
            console.log('Course Delivery deleted successfully:', response);
            //setCoursesDeliveryDetails(coursesDeliveryDetails.filter(item => item.courseId !== courseId));
                    })
        .catch((error) => {
            console.error('There was an error deleting the course!', error);
        });
};

const handleSearch = (yearOfDelivery,semesterOfDelivery,courseId) => {
    // Make Get request to backend
    axios.get(`http://localhost:8080/api/courses/${yearOfDelivery}/${semesterOfDelivery}/${courseId}`)
        .then(response => {
            //setCourses(courses.filter(item => item.course_code !== id));
                    })
        .catch((error) => {
            console.error('There was an error deleting the course!', error);
        });
};

    return (
      <div>
        <table border="1" style={{ width: '50%', textAlign: 'left', borderCollapse: 'collapse' }}>
      <thead style={{background:'blue'}}>
          <tr>
              <th>Course Title</th>
              <th>Year-Sem</th>
              <th>Code</th>
              <th>Actions</th> 
          </tr>
      </thead>
      <tbody>
          {coursesDeliveryDetails.map((courseDeliveryItem) => (
              <tr key={courseDeliveryItem.id}>
                  <td>{courseDeliveryItem.courseTitle}</td>
                  <td>{courseDeliveryItem.yearOfDelivery}-{courseDeliveryItem.semesterOfDelivery}</td>
                  <td>{courseDeliveryItem.courseID}</td>
                  <td>
                      {/* Add a delete button */}
                      <button onClick={() => handleDelete(courseDeliveryItem.yearOfDelivery,courseDeliveryItem.semesterOfDelivery,courseDeliveryItem.courseID)}>Delete</button>
                      <button onClick={() => handleSearch(courseDeliveryItem.yearOfDelivery,courseDeliveryItem.semesterOfDelivery,courseDeliveryItem.courseID)}>Search</button>
                  </td>
              </tr>
          ))}
      </tbody>
  </table>
  </div>   
  )
}


export default CourseDeliveryTable; 
