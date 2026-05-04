import {Routes, Route} from 'react-router-dom'

import NavBar from './components/NavBar'
import ExamsPage from "./pages/ExamsPage"
import StudentsPage from "./pages/StudentsPage"

function App() {

  return (
    <div>
      <NavBar />
      <main className='main-container'>
        <Routes>
          <Route path="/" element={<StudentsPage />} />
          <Route path="/exams" element={<ExamsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
