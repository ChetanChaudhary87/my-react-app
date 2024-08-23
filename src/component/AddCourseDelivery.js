import React, { useState, useEffect } from "react";
import axios from "axios";
import '../App.css';

const AddCourseDelivery = () => {
  const [courseId, setCourseId] = useState("");
  const [yearOfDelivery, setYearOfDelivery] = useState("");
  const [semesterOfDelivery, setSemesterOfDelivery] = useState("");
  const [message, setMessage] = useState("");
  const [courses, setCourses] = useState([]);


  const fetchCourses = () => {
    axios
      .get(`http://localhost:8080/api/courses`)
      .then((response) => {
        console.log("get courses successfully:", response);
        setCourses(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const newCourseDelivery = {
      courseID: courseId,
      yearOfDelivery: yearOfDelivery,
      semesterOfDelivery: semesterOfDelivery,
    };

    axios
      .post("http://localhost:8080/api/instances", newCourseDelivery)
      .then((response) => {
        setMessage("CourseDelivery added successfully!");
      })
      .catch((error) => {
        setMessage(`Error: ${error.message}`);
      });
  };

  // Refresh function to reset form fields
  const handleRefresh = () => {
    setCourseId("");
    setYearOfDelivery("");
    setSemesterOfDelivery("");
    fetchCourses();
  };

  return (
    <div className="innercontainer">
      <form onSubmit={handleSubmit}>
        <div class="alignTextBox">
          <select
            onClick={fetchCourses}
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course.course_code} value={course.course_code}>
                {course.course_code}
              </option>
            ))}
          </select>
          <button type="button" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
        <div className="alignTextBox">
          <div className="textBoxStyle">
            <input
              type="number"
              value={yearOfDelivery}
              onChange={(e) => setYearOfDelivery(e.target.value)}
              placeholder="year"
              required
            />
          </div>

          <div className="textBoxStyle">
            <input
              type="number"
              value={semesterOfDelivery}
              onChange={(e) => setSemesterOfDelivery(e.target.value)}
              placeholder="semester"
              required
            />
          </div>
        </div>

        <div className="alignToCentre">
          <button type="submit" className="button">
            Add Instance
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourseDelivery;