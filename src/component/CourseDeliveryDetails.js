import { useState } from "react";
import axios from "axios";
import DeliveryModal from './DeliveryModal';

function CourseDeliveryDetails() {
  const [coursesDeliveryDetails, setCoursesDeliveryDetails] = useState([]);
  const [yearOfDelivery, setCourseDeliveryYear] = useState([]);
  const [semesterOfDelivery, setCourseDeliverySemester] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchedCourseDeliveryDetails, setSearchedCourseDeliveryDetails] = useState([]);

  const getCourseDeliveryDetails = (
    event,
    yearOfDelivery,
    semesterOfDelivery
  ) => {
    event.preventDefault();
    axios
      .get(
        `http://localhost:8080/api/instances/${yearOfDelivery}/${semesterOfDelivery}`
      )
      .then((response) => {
        console.log("Got Courses Delivery Details successfully:", response);
        setCoursesDeliveryDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  const handleDelete = (yearOfDelivery, semesterOfDelivery, courseId) => {
    axios
      .delete(
        `http://localhost:8080/api/instances/${yearOfDelivery}/${semesterOfDelivery}/${courseId}`
      )
      .then((response) => {
        console.log("Course Delivery deleted successfully:", response);
        setCoursesDeliveryDetails(
          coursesDeliveryDetails.filter(
            (item) =>
              item.courseId !== courseId &&
              item.yearOfDelivery !== yearOfDelivery &&
              item.semesterOfDelivery !== semesterOfDelivery
          )
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the course!", error);
      });
  };

  const handleSearch = (yearOfDelivery, semesterOfDelivery, courseId) => {
    axios
      .get(
        `http://localhost:8080/api/instances/${yearOfDelivery}/${semesterOfDelivery}/${courseId}`
      )
      .then((response) => {
        setSearchedCourseDeliveryDetails(response.data);
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
    <div>
      <form
        className="alignTextBox"
        onSubmit={(event) =>
          getCourseDeliveryDetails(event, yearOfDelivery, semesterOfDelivery)
        }
      >
        <div style={{ padding: 10 }}>
          <input
            type="text"
            value={yearOfDelivery}
            onChange={(e) => setCourseDeliveryYear(e.target.value)}
            placeholder="Year"
            required
          />
        </div>
        <div style={{ padding: 10 }}>
          <input
            type="text"
            value={semesterOfDelivery}
            onChange={(e) => setCourseDeliverySemester(e.target.value)}
            placeholder="Select Semester"
            required
          />
        </div>
        <div style={{ alignItems: "center", padding: 10 }}>
          <button type="submit" className="button">
            List Instances
          </button>
        </div>
      </form>
      <div style={{ padding: 10, textAlign: "center" }}>
        <div style={{ padding: 10 }}></div>
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
              <th>Year-Sem</th>
              <th>Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {coursesDeliveryDetails.map((courseDeliveryItem) => (
              <tr key={courseDeliveryItem.id}>
                <td>{courseDeliveryItem.courseTitle}</td>
                <td>
                  {courseDeliveryItem.yearOfDelivery}-
                  {courseDeliveryItem.semesterOfDelivery}
                </td>
                <td>{courseDeliveryItem.courseCode}</td>
                <td>
                  {/* Add a delete button */}
                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(
                        courseDeliveryItem.yearOfDelivery,
                        courseDeliveryItem.semesterOfDelivery,
                        courseDeliveryItem.courseCode
                      )
                    }
                  ></button>
                  <button
                    className="search-button"
                    onClick={() =>
                      handleSearch(
                        courseDeliveryItem.yearOfDelivery,
                        courseDeliveryItem.semesterOfDelivery,
                        courseDeliveryItem.courseCode
                      )
                    }
                  ></button>
                   <DeliveryModal isOpen={isModalOpen} onClose={closeModal}
                   searchedCourseDeliveryDetails={searchedCourseDeliveryDetails}>
                  </DeliveryModal>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default CourseDeliveryDetails;
