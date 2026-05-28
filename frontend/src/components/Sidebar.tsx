import { useNavigate, useLocation } from 'react-router-dom'
import { useStore } from '../store/useStore'
import {
  LayoutDashboard, BookOpen, PlayCircle, Code2, Bot,
  Trophy, BarChart2, Users, Settings, Zap, LogOut
} from 'lucide-react'

const nav = [
  { label: 'Main', items: [
    { icon: LayoutDashboard, text: 'Dashboard', path: '/dashboard' },
    { icon: BookOpen, text: 'Courses', path: '/courses' },
    { icon: PlayCircle, text: 'Learn Now', path: '/learn' },
    { icon: Code2, text: 'Code Editor', path: '/editor' },
    { icon: Bot, text: 'AI Tutor', path: '/ai-tutor', badge: 'AI' },
  ]},
  { label: 'Progress', items: [
    { icon: Trophy, text: 'Achievements', path: '/achievements' },
    { icon: BarChart2, text: 'Leaderboard', path: '/leaderboard' },
    { icon: Users, text: 'Community', path: '/community' },
  ]},
  { label: 'Admin', items: [
    { icon: Settings, text: 'Admin Panel', path: '/admin' },
  ]},
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useStore()

  return (
    <aside className="sidebar">
      <div className="logo-area">
        <div className="logo-icon">F</div>
        <span className="logo-text">FIXXYY</span>
      </div>

      <nav className="nav">
        {nav.map((section) => {
          if (section.label === 'Admin' && user?.role !== 'admin') return null
          return (
            <div key={section.label}>
              <div className="nav-label">{section.label}</div>
              {section.items.map((item) => {
                const Icon = item.icon
                const active = location.pathname === item.path
                return (
                  <button
                    key={item.path}
                    className={`nav-item ${active ? 'active' : ''}`}
                    onClick={() => navigate(item.path)}
                  >
                    <Icon size={17} />
                    <span>{item.text}</span>
                    {item.badge && <span className="nav-badge">{item.badge}</span>}
                  </button>
                )
              })}
            </div>
          )
        })}
      </nav>

      <div className="sidebar-foot">
        <div className="user-card" onClick={() => navigate('/achievements')}>
          <div className="avatar">{user?.avatar || 'U'}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="uname">{user?.name || 'User'}</div>
            <div className="uxp">⚡ {user?.xp?.toLocaleString()} XP · Lv.{user?.level}</div>
          </div>
          <button
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--t3)', padding: 4 }}
            onClick={(e) => { e.stopPropagation(); logout() }}
            title="Logout"
          >
            <LogOut size={15} />
          </button>
        </div>
      </div>
    </aside>
  )
}
