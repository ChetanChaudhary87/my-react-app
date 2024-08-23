import logo from './logo.svg';
import './App.css';
import Header from './component/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddCourse from './component/AddCourse';
import CourseList from './component/CourseList';
import AddCourseDelivery from './component/AddCourseDelivery';
import CourseDeliveryDetails from './component/CourseDeliveryDetails';

function App() {
  return(
    <div>
      <div className="outercontainer">
      <AddCourse />
      <AddCourseDelivery/>
      </div>
    <hr/>
    <div className="fullSizeContainer">
    <CourseList />
    </div>
    <hr/>
    
    <CourseDeliveryDetails/>
    <Router>
    <Routes>
        
        <Route path="/add-course" element={<AddCourse />} />
        <Route path="/courses" element={<CourseList />} />
        
    </Routes>
</Router>
</div>
  );
}

export default App;
