import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import ExamsPage from "./pages/ExamsPage"
import StudentsPage from "./pages/StudentsPage"
import GradingPage from './pages/GradingPage'

function App() {

  return (
    <div>
      <NavBar />
      <main className='main-container'>
        <Routes>
          <Route path="/" element={<StudentsPage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/grading/:id" element={<GradingPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
