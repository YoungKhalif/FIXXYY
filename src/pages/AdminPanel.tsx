import { useState } from 'react'
import { Users, BookOpen, BarChart2, Trash2, Edit2, Plus, X, TrendingUp, Activity } from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts'

const USERS_DATA = [
  { id:1, name:'Sarah Chen', email:'sarah@ex.com', role:'student', xp:15420, status:'active', joined:'2024-01-10' },
  { id:2, name:'Marcus Rivera', email:'marcus@ex.com', role:'student', xp:13800, status:'active', joined:'2024-02-05' },
  { id:3, name:'Priya Patel', email:'priya@ex.com', role:'student', xp:12650, status:'active', joined:'2024-01-28' },
  { id:4, name:'Jake Kim', email:'jake@ex.com', role:'student', xp:6500, status:'inactive', joined:'2024-03-12' },
  { id:5, name:'Admin User', email:'admin@fixxyy.com', role:'admin', xp:9999, status:'active', joined:'2023-12-01' },
]

const COURSES_DATA = [
  { id:1, title:'Python Fundamentals', category:'Programming', students:18400, lessons:24, status:'published' },
  { id:2, title:'JavaScript Mastery', category:'Web Dev', students:22100, lessons:32, status:'published' },
  { id:3, title:'Machine Learning', category:'AI/ML', students:9800, lessons:40, status:'published' },
  { id:4, title:'React & TypeScript', category:'Web Dev', students:15200, lessons:28, status:'draft' },
]

const activityData = [
  { day:'Mon', users:1240, submissions:890 },
  { day:'Tue', users:1580, submissions:1120 },
  { day:'Wed', users:1320, submissions:980 },
  { day:'Thu', users:1900, submissions:1450 },
  { day:'Fri', users:1650, submissions:1280 },
  { day:'Sat', users:2100, submissions:1680 },
  { day:'Sun', users:1780, submissions:1350 },
]

const tooltipStyle = { background:'var(--bg3)', border:'1px solid var(--border)', borderRadius:8, color:'var(--t1)', fontSize:12 }

export default function AdminPanel() {
  const [tab, setTab] = useState<'overview'|'users'|'courses'>('overview')
  const [users, setUsers] = useState(USERS_DATA)
  const [courses, setCourses] = useState(COURSES_DATA)
  const [showModal, setShowModal] = useState(false)

  const deleteUser = (id: number) => setUsers(u => u.filter(x => x.id !== id))
  const deleteCourse = (id: number) => setCourses(c => c.filter(x => x.id !== id))
  const toggleStatus = (id: number) => setCourses(c => c.map(x => x.id===id ? {...x, status: x.status==='published'?'draft':'published'} : x))

  return (
    <div className="fade-in">
      <div className="tabs">
        <button className={`tab ${tab==='overview'?'active':''}`} onClick={() => setTab('overview')}>📊 Overview</button>
        <button className={`tab ${tab==='users'?'active':''}`} onClick={() => setTab('users')}>👥 Users</button>
        <button className={`tab ${tab==='courses'?'active':''}`} onClick={() => setTab('courses')}>📚 Courses</button>
      </div>

      {tab === 'overview' && (
        <div>
          {/* Stats */}
          <div className="g4" style={{ marginBottom:24 }}>
            {[
              { icon:'👥', label:'Total Users', value:'52,840', change:'+12%', color:'#8b5cf6' },
              { icon:'📚', label:'Active Courses', value:'24', change:'+2 this month', color:'#06b6d4' },
              { icon:'💻', label:'Code Runs Today', value:'14,280', change:'+8%', color:'#f59e0b' },
              { icon:'🏆', label:'XP Awarded', value:'2.4M', change:'+18%', color:'#10b981' },
            ].map(s => (
              <div key={s.label} className="card" style={{ padding:20 }}>
                <div style={{ fontSize:28, marginBottom:6 }}>{s.icon}</div>
                <div style={{ fontSize:26, fontWeight:800, color:s.color }}>{s.value}</div>
                <div style={{ fontSize:13, fontWeight:600 }}>{s.label}</div>
                <div style={{ fontSize:11, color:'var(--green)', marginTop:4 }}>↑ {s.change}</div>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="g2">
            <div className="card">
              <div className="sec-title" style={{ marginBottom:16, fontSize:15 }}>Daily Active Users</div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={activityData}>
                  <XAxis dataKey="day" tick={{ fill:'var(--t3)', fontSize:11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Bar dataKey="users" fill="#8b5cf6" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="card">
              <div className="sec-title" style={{ marginBottom:16, fontSize:15 }}>Code Submissions</div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={activityData}>
                  <XAxis dataKey="day" tick={{ fill:'var(--t3)', fontSize:11 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="submissions" stroke="#06b6d4" strokeWidth={2} dot={{ fill:'#06b6d4', r:4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {tab === 'users' && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div>
              <div className="sec-title">User Management</div>
              <div className="sec-sub">{users.length} users registered</div>
            </div>
            <button className="btn btn-p btn-sm" onClick={() => setShowModal(true)}><Plus size={14}/> Add User</button>
          </div>
          <div className="card" style={{ padding:0, overflow:'hidden' }}>
            <table className="tbl">
              <thead>
                <tr>
                  <th>User</th><th>Role</th><th>XP</th><th>Status</th><th>Joined</th><th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}>
                    <td>
                      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                        <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--grad)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#fff' }}>
                          {u.name[0]}
                        </div>
                        <div>
                          <div style={{ fontWeight:600, fontSize:13 }}>{u.name}</div>
                          <div style={{ fontSize:11, color:'var(--t3)' }}>{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className={`tag ${u.role==='admin'?'tag-p':'tag-c'}`}>{u.role}</span></td>
                    <td style={{ fontWeight:700, color:'var(--accent-l)' }}>{u.xp.toLocaleString()}</td>
                    <td><span className={`tag ${u.status==='active'?'tag-g':'tag-r'}`}>{u.status}</span></td>
                    <td style={{ color:'var(--t2)', fontSize:13 }}>{u.joined}</td>
                    <td>
                      <div style={{ display:'flex', gap:6 }}>
                        <button className="btn btn-s btn-sm"><Edit2 size={12}/></button>
                        <button className="btn btn-r btn-sm" onClick={() => deleteUser(u.id)}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab === 'courses' && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div>
              <div className="sec-title">Course Management</div>
              <div className="sec-sub">{courses.length} courses total</div>
            </div>
            <button className="btn btn-p btn-sm"><Plus size={14}/> New Course</button>
          </div>
          <div className="card" style={{ padding:0, overflow:'hidden' }}>
            <table className="tbl">
              <thead>
                <tr><th>Course</th><th>Category</th><th>Students</th><th>Lessons</th><th>Status</th><th>Actions</th></tr>
              </thead>
              <tbody>
                {courses.map(c => (
                  <tr key={c.id}>
                    <td style={{ fontWeight:600 }}>{c.title}</td>
                    <td><span className="tag tag-c">{c.category}</span></td>
                    <td style={{ color:'var(--t2)' }}>{c.students.toLocaleString()}</td>
                    <td style={{ color:'var(--t2)' }}>{c.lessons}</td>
                    <td>
                      <button onClick={() => toggleStatus(c.id)} className={`tag ${c.status==='published'?'tag-g':'tag-a'}`} style={{ border:'none', cursor:'pointer' }}>
                        {c.status}
                      </button>
                    </td>
                    <td>
                      <div style={{ display:'flex', gap:6 }}>
                        <button className="btn btn-s btn-sm"><Edit2 size={12}/></button>
                        <button className="btn btn-r btn-sm" onClick={() => deleteCourse(c.id)}><Trash2 size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {showModal && (
        <div className="overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <h2 style={{ fontSize:18, fontWeight:700 }}>Add New User</h2>
              <button onClick={() => setShowModal(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--t2)' }}><X size={18}/></button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              {[['Full Name','text','e.g. John Doe'],['Email','email','john@example.com'],['Password','password','••••••••']].map(([l,t,p])=>(
                <div key={l}><label className="label">{l}</label><input className="input" type={t} placeholder={p}/></div>
              ))}
              <div>
                <label className="label">Role</label>
                <div style={{ display:'flex', gap:8 }}>
                  <button className="btn btn-p btn-sm">Student</button>
                  <button className="btn btn-s btn-sm">Admin</button>
                </div>
              </div>
              <button className="btn btn-p" onClick={() => setShowModal(false)}>Create User</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
