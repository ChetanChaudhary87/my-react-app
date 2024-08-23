import { useState } from 'react';
import axios from 'axios';
import '../App.css';

function AddCourse() {
    const [course_code, setCourseCode] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const newCourse = {
            course_code: course_code,
            title: title,
            description: description
        };

        axios.post('http://localhost:8080/api/courses', newCourse)
            .then(response => {
                setMessage('Course added successfully!');
                setCourseCode('');
                setTitle(''); 
                setDescription('');
            })
            .catch(error => {
                setMessage(`Error: ${error.message}`);
            });
    };

    return (
        <div className="innercontainer">
            <form onSubmit={handleSubmit}>
                
                <div style={{padding:10}}>
                <input
                    type="text"
                    value={course_code}
                    onChange={(e) => setCourseCode(e.target.value)}
                    placeholder="Course Code"
                    required
                />
                </div>
                <div style={{padding:10}}>
                
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Course Title"
                    required
                />
                </div >
                <div style={{padding:10}}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Course Description"
                    required
                />
                </div>
                
                
                <div className="alignToCentre">
                <button className="button" type="submit">Add Course</button>
                </div>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default AddCourse;

