import { useStore } from '../store/useStore'
import { Zap, Flame, BookOpen, Trophy, Star, Target, Code2, Users, Award } from 'lucide-react'

const ALL_BADGES = [
  { id:'first_lesson', icon:'📖', name:'First Step', desc:'Complete your first lesson', xp:10 },
  { id:'streak_7', icon:'🔥', name:'Week Warrior', desc:'7-day learning streak', xp:50 },
  { id:'streak_30', icon:'💎', name:'Diamond Streak', desc:'30-day learning streak', xp:200 },
  { id:'python_beginner', icon:'🐍', name:'Python Rookie', desc:'Complete Python Basics', xp:100 },
  { id:'python_master', icon:'🏆', name:'Python Master', desc:'Complete all Python courses', xp:500 },
  { id:'quiz_master', icon:'🧠', name:'Quiz Master', desc:'Score 100% on 5 quizzes', xp:150 },
  { id:'speed_coder', icon:'⚡', name:'Speed Coder', desc:'Solve a challenge in under 2 min', xp:75 },
  { id:'helper', icon:'🤝', name:'Community Hero', desc:'Help 10 other learners', xp:100 },
  { id:'night_owl', icon:'🦉', name:'Night Owl', desc:'Code after midnight 5 times', xp:50 },
  { id:'bug_hunter', icon:'🐛', name:'Bug Hunter', desc:'Find and fix 20 bugs', xp:120 },
  { id:'top_10', icon:'🥇', name:'Top 10', desc:'Reach top 10 on leaderboard', xp:300 },
  { id:'social', icon:'💬', name:'Social Butterfly', desc:'Post 20 community replies', xp:80 },
]

const LEVELS = [
  { level:1, title:'Newbie', minXP:0, color:'#94a3b8' },
  { level:5, title:'Learner', minXP:2000, color:'#10b981' },
  { level:10, title:'Developer', minXP:4500, color:'#06b6d4' },
  { level:15, title:'Expert', minXP:7000, color:'#8b5cf6' },
  { level:20, title:'Master', minXP:10000, color:'#f59e0b' },
]

export default function Achievements() {
  const { user } = useStore()
  const earned = user?.badges || []
  const xp = user?.xp || 0
  const level = user?.level || 1
  const xpToNext = 500 - (xp % 500)
  const xpPct = ((xp % 500) / 500) * 100

  const currentTitle = LEVELS.filter(l => xp >= l.minXP).at(-1) || LEVELS[0]

  return (
    <div className="fade-in">
      {/* Profile hero */}
      <div className="card" style={{ marginBottom:24, background:'linear-gradient(135deg,rgba(139,92,246,0.1),rgba(6,182,212,0.05))', borderColor:'rgba(139,92,246,0.2)' }}>
        <div style={{ display:'flex', alignItems:'center', gap:20 }}>
          <div className="avatar avatar-lg" style={{ flexShrink:0 }}>{user?.avatar}</div>
          <div style={{ flex:1 }}>
            <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:4 }}>
              <h2 style={{ fontSize:22, fontWeight:800 }}>{user?.name}</h2>
              <span className="tag tag-p" style={{ fontSize:12 }}>{currentTitle.title}</span>
            </div>
            <p style={{ fontSize:13, color:'var(--t2)', marginBottom:14 }}>Member since {new Date(user?.joinDate||'').toLocaleDateString('en-US',{month:'long',year:'numeric'})} · {earned.length} badges earned</p>
            <div style={{ display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ fontSize:13, fontWeight:600, color:'var(--accent-l)', whiteSpace:'nowrap' }}>Lv.{level}</span>
              <div className="xpbar"><div className="xpfill" style={{ width:`${xpPct}%` }} /></div>
              <span style={{ fontSize:12, color:'var(--t2)', whiteSpace:'nowrap' }}>{xpToNext} XP to Lv.{level+1}</span>
            </div>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:12, flexShrink:0 }}>
            {[
              { icon:Zap, val:xp.toLocaleString(), lbl:'Total XP', color:'#8b5cf6' },
              { icon:Flame, val:user?.streak, lbl:'Day Streak', color:'#f59e0b' },
              { icon:BookOpen, val:user?.completedLessons?.length, lbl:'Lessons', color:'#06b6d4' },
              { icon:Award, val:earned.length, lbl:'Badges', color:'#10b981' },
            ].map(({ icon:Icon, val, lbl, color }) => (
              <div key={lbl} style={{ textAlign:'center', padding:'12px 16px', background:'var(--glass)', borderRadius:10 }}>
                <Icon size={18} color={color} style={{ marginBottom:4 }} />
                <div style={{ fontSize:20, fontWeight:800, color }}>{val}</div>
                <div style={{ fontSize:11, color:'var(--t2)' }}>{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Level roadmap */}
      <div className="card" style={{ marginBottom:24 }}>
        <div className="sec-title" style={{ marginBottom:16 }}>🗺️ Level Roadmap</div>
        <div style={{ display:'flex', alignItems:'center', gap:0, overflowX:'auto', paddingBottom:8 }}>
          {LEVELS.map((l, i) => (
            <div key={l.level} style={{ display:'flex', alignItems:'center', flex:i<LEVELS.length-1?1:0 }}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:4 }}>
                <div style={{ width:42, height:42, borderRadius:'50%',
                  background: xp>=l.minXP ? `${l.color}33` : 'var(--bg2)',
                  border: `2px solid ${xp>=l.minXP ? l.color : 'var(--border)'}`,
                  display:'flex', alignItems:'center', justifyContent:'center',
                  fontSize:13, fontWeight:800, color: xp>=l.minXP ? l.color : 'var(--t3)' }}>
                  {l.level}
                </div>
                <span style={{ fontSize:11, fontWeight:600, color: xp>=l.minXP ? l.color : 'var(--t3)', whiteSpace:'nowrap' }}>{l.title}</span>
                <span style={{ fontSize:10, color:'var(--t3)' }}>{l.minXP}+ XP</span>
              </div>
              {i < LEVELS.length-1 && (
                <div style={{ flex:1, height:2, background: xp>=LEVELS[i+1].minXP ? 'var(--grad)' : 'var(--border)', margin:'0 4px', marginBottom:28 }} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="g4" style={{ marginBottom:24 }}>
        {[
          { icon:'🏆', title:'Rank', value:'#24', sub:'Global leaderboard', color:'var(--amber)' },
          { icon:'📅', title:'Days Active', value:'42', sub:'Total learning days', color:'var(--cyan)' },
          { icon:'⏱️', title:'Hours Coded', value:'38h', sub:'In the code editor', color:'var(--accent-l)' },
          { icon:'✅', title:'Challenges', value:'12', sub:'Completed this month', color:'var(--green)' },
        ].map(s => (
          <div key={s.title} className="card" style={{ textAlign:'center', padding:20 }}>
            <div style={{ fontSize:32, marginBottom:6 }}>{s.icon}</div>
            <div style={{ fontSize:24, fontWeight:800, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:13, fontWeight:600 }}>{s.title}</div>
            <div style={{ fontSize:11, color:'var(--t2)', marginTop:2 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="card">
        <div className="sec-hd" style={{ marginBottom:20 }}>
          <div>
            <div className="sec-title">🏅 Badges & Achievements</div>
            <div className="sec-sub">{earned.length} of {ALL_BADGES.length} unlocked</div>
          </div>
          <div className="prog" style={{ width:120 }}>
            <div className="prog-fill" style={{ width:`${(earned.length/ALL_BADGES.length)*100}%` }} />
          </div>
        </div>
        <div className="badge-grid">
          {ALL_BADGES.map(b => {
            const unlocked = earned.includes(b.id)
            return (
              <div key={b.id} className={`badge-card ${unlocked ? 'unlocked' : 'locked'}`}>
                <div className="badge-icon">{unlocked ? b.icon : '🔒'}</div>
                <div className="badge-name">{b.name}</div>
                <div className="badge-desc">{b.desc}</div>
                {unlocked && (
                  <div style={{ marginTop:8, fontSize:11, fontWeight:700, color:'var(--accent-l)' }}>+{b.xp} XP</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
