import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/students')
    .then(res => res.json())
    .then(data => setStudents(data))
    .catch(error => console.error('Error.', error));
  }, []);

  return (
    <>
      <div>
        <h1>Students list</h1>
        <ul>
          {students.map(student => (
            <li key={student.id}>
              <strong>{student.enroll_year}</strong> - {student.last_name}, {student.first_name}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
