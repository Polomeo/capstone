import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { SearchContext } from "../pages/StudentsPage";
import { StudentsContext } from "../contexts/StudentsContextProvider";

function StudentsTable() {
     const [students, setStudents] = useContext(StudentsContext);
     const [subjectsPerCourse, setSubjectsPerCourse] = useState({});
     const [searchQuery, setSearchQuery] = useContext(SearchContext);
    
    // Fetching the students
    useEffect(() => {
        fetch('http://localhost:8000/api/students')
        .then(res => res.json())
        .then(data => {
            setStudents(data.students);
            setSubjectsPerCourse(data.subjects_per_course);
            // console.log("DEBUG: Students Table Refreshed");
            console.log(data.students);
            console.log(data.subjects_per_course);
        })
        .catch(error => console.error('Error.', error));
    }, []); // Updates only on mount
    
    return (
        <div className="students-table">
            <div className="table-responsive">
                <table className="table table-hover align-middle">
                    <thead>
                        <tr className="table-secondary">
                        <th scope="col">Enroll Year</th>
                        <th scope="col">Full name</th>
                        <th scope="col">P. ID</th>
                        <th scope="col">1° Y</th>
                        <th scope="col">2° Y</th>
                        <th scope="col">3° Y</th>

                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => 
                            (student.last_name.toLowerCase().includes(searchQuery.toLowerCase())
                            || student.first_name.toLowerCase().includes(searchQuery.toLowerCase())
                            ) &&
                            (<tr key={student.id} value={student.id}>
                                <th scope="row">{student.enroll_year}</th>
                                <td><Link to={`/profile/${student.id}`}>{student.last_name}, {student.first_name}</Link></td>
                                <td>{student.personal_id}</td>
                                <td>{student.approved_per_course.c1}/{(subjectsPerCourse) && subjectsPerCourse["1"]}</td>
                                <td>{student.approved_per_course.c2}/{(subjectsPerCourse) && subjectsPerCourse["2"]}</td>
                                <td>{student.approved_per_course.c3}/{(subjectsPerCourse) && subjectsPerCourse["3"]}</td>
                            </tr>)
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
    )
}

export default StudentsTable