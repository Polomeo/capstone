import { useState, useEffect } from 'react'
import StudentsTable from './components/StudentsTable';
import SearchBar from './components/SearchBar';

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
    <>
      {/* <StudentsTable studentsList={students} /> */}
      <SearchBar textPlaceholder={"Buscar estudiante"} />
    </>
  )
}

export default App
