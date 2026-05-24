import { useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { Bell, Flame, Zap, Sun, Moon } from 'lucide-react'

const titles: Record<string, { title: string; sub: string }> = {
  '/dashboard':    { title: 'Dashboard',     sub: 'Welcome back! Keep up the streak 🔥' },
  '/courses':      { title: 'Courses',       sub: 'Browse and enroll in courses' },
  '/learn':        { title: 'Learn Now',     sub: 'Interactive step-by-step lessons' },
  '/editor':       { title: 'Code Editor',   sub: 'Write and run code in your browser' },
  '/ai-tutor':     { title: 'AI Tutor',      sub: 'Your personal AI coding assistant' },
  '/achievements': { title: 'Achievements',  sub: 'Badges, XP and milestones' },
  '/leaderboard':  { title: 'Leaderboard',   sub: 'Top learners this week' },
  '/community':    { title: 'Community',     sub: 'Connect, discuss and share' },
  '/admin':        { title: 'Admin Panel',   sub: 'Manage platform and users' },
}

export default function Header() {
  const location = useLocation()
  const { user, notifications, darkMode, toggleDark } = useStore()
  const info = titles[location.pathname] || { title: 'FIXXYY', sub: '' }

  return (
    <header className="header">
      <div>
        <div className="h-title">{info.title}</div>
        {info.sub && <div className="h-sub">{info.sub}</div>}
      </div>

      <div className="h-actions">
        <div className="pill pill-amber">
          <Flame size={14} />
          <span>{user?.streak ?? 0} day streak</span>
        </div>
        <div className="pill pill-purple">
          <Zap size={14} />
          <span>{user?.xp?.toLocaleString() ?? 0} XP</span>
        </div>

        <button
          className="btn btn-s btn-sm"
          onClick={toggleDark}
          style={{ padding: '7px 10px' }}
          title="Toggle theme"
        >
          {darkMode ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button
          className="btn btn-s btn-sm"
          style={{ padding: '7px 10px', position: 'relative' }}
          title="Notifications"
        >
          <Bell size={15} />
          {notifications > 0 && (
            <span style={{
              position: 'absolute', top: 4, right: 4,
              width: 8, height: 8, background: 'var(--red)',
              borderRadius: '50%', border: '1px solid var(--bg)'
            }} />
          )}
        </button>
      </div>
    </header>
  )
}
