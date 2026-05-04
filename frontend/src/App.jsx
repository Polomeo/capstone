import { useState, useEffect } from 'react'
// import './App.css'

function App() {
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
      <div>
        <h1>Students list</h1>
        <ul>
          {students.map(student => (
            <li key={student.id}>
              {student.enroll_year}- {student.last_name}
            </li>
          ))}
        </ul>
        <button type="button" class="btn btn-primary">Base class</button>
      </div>
  )
}

export default App
