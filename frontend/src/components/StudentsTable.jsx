import { useState, useEffect } from "react";

function StudentsTable(studentsList) {
     const [students, setStudents] = useState([]);
    
      useEffect(() => {
        fetch('http://localhost:8000/api/students')
        .then(res => res.json())
        .then(data => {
          setStudents(data.students);
        })
        .catch(error => console.error('Error.', error));
      }, []);
    
    return (
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
                        <tr key={student.id} value={student.id}>
                            <th scope="row">{student.enroll_year}</th>
                            <td>{student.last_name}, {student.first_name}</td>
                            <td>{student.personal_id}</td>
                            <td>10/10</td>
                            <td>4/12</td>
                            <td>0/9</td>

                        </tr>
                    )}
                </tbody>
                </table>
            </div>
    )
}

export default StudentsTable