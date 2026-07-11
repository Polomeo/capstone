import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useEffect, useState } from 'react'

import AuthLoggedInRoutes from './components/AuthLoggedInRoutes'

import NavBar from './components/NavBar'
import ExamsPage from "./pages/ExamsPage"
import StudentsPage from "./pages/StudentsPage"
import GradingPage from './pages/GradingPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Checks if user is authenticated, to allow navigation
  useEffect(() => {
    fetch('http://localhost:8000/api/login_status', {credentials : 'include'})
    .then(res => {
      if (res.ok) { // ok => checks if status is between 200 and 299
        setIsAuthenticated(true);
      }
      else {
        setIsAuthenticated(false);
      }
    })
    .catch(() => setIsAuthenticated(false));
  }, []);

  return (
    <div>
      <NavBar />
      <main className='main-container'>
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<AuthLoggedInRoutes isAuthenticated={isAuthenticated} loginPage='/login'/>}>
              <Route path="/exams" element={<ExamsPage />} />
              <Route path="/grading/:id" element={<GradingPage />} />
              <Route path="/profile/:id" element={<ProfilePage />} />
              <Route path="/" element={<StudentsPage />} />
            </Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
