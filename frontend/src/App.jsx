import { Routes, Route } from 'react-router-dom'

import NavBar from './components/NavBar'
import ExamsPage from "./pages/ExamsPage"
import StudentsPage from "./pages/StudentsPage"
import GradingPage from './pages/GradingPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'

function App() {

  return (
    <div>
      <NavBar />
      <main className='main-container'>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/exams" element={<ExamsPage />} />
          <Route path="/grading/:id" element={<GradingPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/" element={<StudentsPage />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
