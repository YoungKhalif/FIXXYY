import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore'
import { Flame, Zap, BookOpen, Trophy, TrendingUp, Code2, Bot, Target } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

const weekData = [
  { day: 'Mon', xp: 120 }, { day: 'Tue', xp: 280 }, { day: 'Wed', xp: 150 },
  { day: 'Thu', xp: 400 }, { day: 'Fri', xp: 320 }, { day: 'Sat', xp: 490 }, { day: 'Sun', xp: 380 },
]

const courses = [
  { id:'py', name:'Python Fundamentals', progress:72, color:'#8b5cf6', icon:'🐍', lessons:24, done:17 },
  { id:'js', name:'JavaScript Mastery', progress:45, color:'#f59e0b', icon:'⚡', lessons:32, done:14 },
  { id:'ml', name:'Machine Learning', progress:20, color:'#06b6d4', icon:'🤖', lessons:40, done:8 },
]

const quickActions = [
  { icon: Code2, label: 'Code Editor', path: '/editor', color: '#8b5cf6' },
  { icon: Bot,   label: 'AI Tutor',    path: '/ai-tutor', color: '#06b6d4' },
  { icon: BookOpen, label: 'Courses',  path: '/courses', color: '#f59e0b' },
  { icon: Trophy, label: 'Leaderboard', path: '/leaderboard', color: '#10b981' },
]

export default function Dashboard() {
  const { user, addXP } = useStore()
  const navigate = useNavigate()
  const xpToNext = 500 - (user!.xp % 500)
  const xpPct = ((user!.xp % 500) / 500) * 100

  return (
    <div className="fade-in">
      {/* Welcome */}
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontSize:26, fontWeight:800 }}>
          Good day, <span className="text-grad">{user?.name?.split(' ')[0]} 👋</span>
        </h2>
        <p style={{ color:'var(--t2)', marginTop:4 }}>You're on a {user?.streak}-day streak. Don't break it!</p>
      </div>

      {/* Stats row */}
      <div className="g4" style={{ marginBottom:24 }}>
        {[
          { icon: Zap, label: 'Total XP', value: user!.xp.toLocaleString(), color:'#8b5cf6', bg:'rgba(139,92,246,0.1)' },
          { icon: Flame, label: 'Day Streak', value: user!.streak, color:'#f59e0b', bg:'rgba(245,158,11,0.1)' },
          { icon: BookOpen, label: 'Lessons Done', value: user!.completedLessons.length, color:'#06b6d4', bg:'rgba(6,182,212,0.1)' },
          { icon: Trophy, label: 'Badges', value: user!.badges.length, color:'#10b981', bg:'rgba(16,185,129,0.1)' },
        ].map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="card" style={{ display:'flex', alignItems:'center', gap:16, padding:20 }}>
            <div style={{ width:46, height:46, borderRadius:12, background:bg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon size={22} color={color} />
            </div>
            <div>
              <div style={{ fontSize:24, fontWeight:800, color }}>{value}</div>
              <div style={{ fontSize:12, color:'var(--t2)' }}>{label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="g2" style={{ marginBottom:24 }}>
        {/* Activity Chart */}
        <div className="card">
          <div className="sec-hd">
            <div>
              <div className="sec-title">Weekly Activity</div>
              <div className="sec-sub">XP earned each day</div>
            </div>
            <span className="tag tag-p">This Week</span>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weekData}>
              <defs>
                <linearGradient id="xpGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="day" tick={{ fill:'var(--t3)', fontSize:12 }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip contentStyle={{ background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:8, color:'var(--t1)', fontSize:12 }} />
              <Area type="monotone" dataKey="xp" stroke="#8b5cf6" strokeWidth={2} fill="url(#xpGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Level & XP */}
        <div className="card">
          <div className="sec-hd" style={{ marginBottom:20 }}>
            <div>
              <div className="sec-title">Level Progress</div>
              <div className="sec-sub">Level {user!.level} → {user!.level + 1}</div>
            </div>
            <div style={{ width:52, height:52, borderRadius:14, background:'linear-gradient(135deg,#8b5cf6,#06b6d4)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:900, fontSize:20, color:'#fff' }}>
              {user!.level}
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
            <div className="xpbar"><div className="xpfill" style={{ width:`${xpPct}%` }} /></div>
            <span style={{ fontSize:12, color:'var(--accent-l)', fontWeight:700, whiteSpace:'nowrap' }}>{xpPct.toFixed(0)}%</span>
          </div>
          <p style={{ fontSize:12, color:'var(--t2)', marginBottom:20 }}>{xpToNext} XP until next level</p>

          <div className="sec-title" style={{ fontSize:14, marginBottom:12 }}>Quick Actions</div>
          <div className="g2" style={{ gap:10 }}>
            {quickActions.map(({ icon: Icon, label, path, color }) => (
              <button key={path} className="btn btn-s" onClick={() => navigate(path)}
                style={{ justifyContent:'flex-start', gap:8, padding:'10px 14px' }}>
                <Icon size={15} color={color} />{label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="g2">
        {/* Active Courses */}
        <div className="card">
          <div className="sec-hd">
            <div className="sec-title">Active Courses</div>
            <button className="btn btn-s btn-sm" onClick={() => navigate('/courses')}>View All</button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {courses.map(c => (
              <div key={c.id} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:10, background:`${c.color}22`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>{c.icon}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{ fontSize:14, fontWeight:600, marginBottom:4, display:'flex', justifyContent:'space-between' }}>
                    <span>{c.name}</span>
                    <span style={{ fontSize:12, color:'var(--t2)' }}>{c.done}/{c.lessons}</span>
                  </div>
                  <div className="prog"><div className="prog-fill" style={{ width:`${c.progress}%`, background:`linear-gradient(90deg,${c.color},${c.color}aa)` }} /></div>
                </div>
                <span style={{ fontSize:12, fontWeight:700, color:c.color }}>{c.progress}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Challenge */}
        <div className="card">
          <div className="sec-hd">
            <div>
              <div className="sec-title">Daily Challenge</div>
              <div className="sec-sub">Complete for bonus XP!</div>
            </div>
            <span className="tag tag-a">+150 XP</span>
          </div>
          <div style={{ padding:'16px', background:'rgba(245,158,11,0.05)', borderRadius:12, border:'1px solid rgba(245,158,11,0.2)', marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <Target size={16} color="var(--amber)" />
              <span style={{ fontWeight:700, fontSize:15 }}>FizzBuzz Challenge</span>
            </div>
            <p style={{ fontSize:13, color:'var(--t2)', lineHeight:1.6 }}>
              Write a program that prints numbers 1-100. For multiples of 3 print "Fizz", for 5 print "Buzz", for both print "FizzBuzz".
            </p>
          </div>
          <div style={{ display:'flex', gap:8, marginBottom:16 }}>
            <span className="tag tag-g">Easy</span>
            <span className="tag tag-c">Python</span>
            <span className="tag tag-p">Logic</span>
          </div>
          <button className="btn btn-p" style={{ width:'100%' }} onClick={() => { navigate('/editor'); addXP(150) }}>
            <Code2 size={15} /> Start Challenge
          </button>

          <div className="divider" />
          <div style={{ display:'flex', justifyContent:'space-between' }}>
            {[['🏆','Top Score','980 pts'],['⏱️','Avg Time','8 min'],['👥','Attempted','2.4K']].map(([e,l,v])=>(
              <div key={l} style={{ textAlign:'center' }}>
                <div style={{ fontSize:18 }}>{e}</div>
                <div style={{ fontSize:11, color:'var(--t3)' }}>{l}</div>
                <div style={{ fontSize:13, fontWeight:700 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
