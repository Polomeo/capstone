import { useState, useEffect, useContext } from "react";

import { SearchContext } from "../pages/StudentsPage";

function StudentsTable() {
     const [students, setStudents] = useState([]);
     const [searchQuery, setSearchQuery] = useContext(SearchContext);
    
    // Fetching the students
    useEffect(() => {
        fetch('http://localhost:8000/api/students')
        .then(res => res.json())
        .then(data => {
            setStudents(data.students);
            console.log("DEBUG: Students Table Refreshed");
        })
        .catch(error => console.error('Error.', error));
    }, []); // The empty list makes it to call only on mount
    
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
                                <td>{student.last_name}, {student.first_name}</td>
                                <td>{student.personal_id}</td>
                                <td>10/10</td>
                                <td>4/12</td>
                                <td>0/9</td>
                            </tr>)
                        )}
                    </tbody>
                    </table>
                </div>
            </div>
    )
}

export default StudentsTable