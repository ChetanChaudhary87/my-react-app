import { useState, useEffect } from "react";
import axios from "axios";
import Modal from './Modal';

function CourseList() {
  const [courses, setCourses] = useState([]);
  const [searchedcourse, setSearchedCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    axios
      .get(`http://localhost:8080/api/courses`)
      .then((response) => {
        console.log("get courses successfully:", response);
        setCourses(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/api/courses/${id}`)
      .then((response) => {
        console.log("Course deleted successfully:", response);
        setCourses(courses.filter((item) => item.course_code !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the course!", error);
      });
  };

  const handleSearch = (id) => {
    axios
      .get(`http://localhost:8080/api/courses/${id}`)
      .then((response) => {
        setSearchedCourse(response.data);
        setIsModalOpen(true);
      })
      .catch((error) => {
        console.error("There was an error searching the course!", error);
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{ padding: 10, textAlign: "center" }}>
      <div style={{ padding: 10 }}>
        <button
          style={{ backgroundColor: "lightskyblue" }}
          onClick={() => getCourses()}
        >
          List Courses
        </button>
      </div>
      <div className="alignToCentre">
        <table
          border="1"
          style={{
            width: "50%",
            textAlign: "left",
            borderCollapse: "collapse",
          }}
        >
          <thead style={{ backgroundColor: "lightblue" }}>
            <tr>
              <th>Course Title</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.course_code}>
                <td>{course.title}</td>
                <td>{course.course_code}</td>
                <td>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(course.course_code)}
                  ></button>
                  <button
                    className="search-button"
                    onClick={() => handleSearch(course.course_code)}
                  ></button>
                   <Modal isOpen={isModalOpen} onClose={closeModal}
                   searchedcourse={searchedcourse}>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CourseList;
