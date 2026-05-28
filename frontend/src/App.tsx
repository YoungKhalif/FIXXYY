import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useStore } from './store/useStore'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Courses from './pages/Courses'
import LearnNow from './pages/LearnNow'
import CodeEditor from './pages/CodeEditor'
import AITutor from './pages/AITutor'
import Achievements from './pages/Achievements'
import Leaderboard from './pages/Leaderboard'
import Community from './pages/Community'
import AdminPanel from './pages/AdminPanel'
import Auth from './pages/Auth'

export default function App() {
  const { isLoggedIn, user } = useStore()

  if (!isLoggedIn) return <Auth />

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="courses" element={<Courses />} />
          <Route path="learn" element={<LearnNow />} />
          <Route path="editor" element={<CodeEditor />} />
          <Route path="ai-tutor" element={<AITutor />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="community" element={<Community />} />
          {user?.role === 'admin' && <Route path="admin" element={<AdminPanel />} />}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
