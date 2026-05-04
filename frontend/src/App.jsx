import {Routes, Route} from 'react-router-dom'

import ExamsPage from "./pages/ExamsPage"
import StudentsPage from "./pages/StudentsPage"

function App() {

  return (
    <main className='main-container'>
      <Routes>
        <Route path="/" element={<StudentsPage />} />
        <Route path="/exams" element={<ExamsPage />} />
      </Routes>
    </main>
  )
}

export default App
