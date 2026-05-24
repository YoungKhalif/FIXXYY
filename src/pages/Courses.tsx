import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Star, Clock, Users, ChevronRight, Filter } from 'lucide-react'

const COURSES = [
  { id:'py', icon:'🐍', title:'Python Fundamentals', desc:'Master Python from scratch — variables, loops, functions & OOP.', category:'Programming', difficulty:'Beginner', progress:72, rating:4.9, students:18400, hours:24, color:'#8b5cf6', enrolled:true },
  { id:'js', icon:'⚡', title:'JavaScript Mastery', desc:'Deep dive into modern JS, ES6+, async/await and DOM manipulation.', category:'Web Dev', difficulty:'Intermediate', progress:45, rating:4.8, students:22100, hours:32, color:'#f59e0b', enrolled:true },
  { id:'ml', icon:'🤖', title:'Machine Learning with Python', desc:'scikit-learn, neural networks, regression, classification & clustering.', category:'AI/ML', difficulty:'Advanced', progress:20, rating:4.7, students:9800, hours:40, color:'#06b6d4', enrolled:true },
  { id:'react', icon:'⚛️', title:'React & TypeScript', desc:'Build production-grade apps with React 18, hooks, and TypeScript.', category:'Web Dev', difficulty:'Intermediate', progress:0, rating:4.9, students:15200, hours:28, color:'#61dafb', enrolled:false },
  { id:'sql', icon:'🗄️', title:'SQL & Databases', desc:'PostgreSQL, joins, indexing, query optimization and design patterns.', category:'Database', difficulty:'Beginner', progress:0, rating:4.6, students:11300, hours:18, color:'#10b981', enrolled:false },
  { id:'cyber', icon:'🔐', title:'Cybersecurity Essentials', desc:'Ethical hacking, penetration testing, OWASP top 10 & encryption.', category:'Security', difficulty:'Advanced', progress:0, rating:4.8, students:7600, hours:36, color:'#ef4444', enrolled:false },
]

const CATS = ['All','Web Dev','Programming','AI/ML','Database','Security']
const DIFFS = ['All','Beginner','Intermediate','Advanced']

const diffColor: Record<string,string> = { Beginner:'tag-g', Intermediate:'tag-a', Advanced:'tag-r' }

export default function Courses() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('All')
  const [diff, setDiff] = useState('All')

  const filtered = COURSES.filter(c =>
    (cat === 'All' || c.category === cat) &&
    (diff === 'All' || c.difficulty === diff) &&
    (c.title.toLowerCase().includes(search.toLowerCase()) || c.desc.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="fade-in">
      <div className="sec-hd" style={{ marginBottom:24 }}>
        <div>
          <h2 className="sec-title" style={{ fontSize:24 }}>Browse Courses</h2>
          <p className="sec-sub">{COURSES.length} courses available · {COURSES.filter(c=>c.enrolled).length} enrolled</p>
        </div>
      </div>

      {/* Filters */}
      <div className="card card-sm" style={{ marginBottom:24 }}>
        <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
          <div style={{ position:'relative', flex:1, minWidth:200 }}>
            <Search size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--t3)' }} />
            <input className="input" style={{ paddingLeft:36 }} placeholder="Search courses..."
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <div style={{ display:'flex', gap:6 }}>
            <Filter size={15} style={{ color:'var(--t3)', alignSelf:'center' }} />
            {CATS.map(c => (
              <button key={c} className={`btn btn-sm ${cat===c?'btn-p':'btn-s'}`} onClick={() => setCat(c)}>{c}</button>
            ))}
          </div>
          <div style={{ display:'flex', gap:6 }}>
            {DIFFS.map(d => (
              <button key={d} className={`btn btn-sm ${diff===d?'btn-p':'btn-s'}`} onClick={() => setDiff(d)}>{d}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Course Grid */}
      <div className="g3">
        {filtered.map(c => (
          <div key={c.id} className="card" style={{ padding:0, overflow:'hidden', display:'flex', flexDirection:'column' }}>
            {/* Course Header */}
            <div style={{ padding:24, paddingBottom:16, borderBottom:'1px solid var(--border)', background:`linear-gradient(135deg, ${c.color}11, ${c.color}05)` }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
                <span style={{ fontSize:36 }}>{c.icon}</span>
                <div style={{ display:'flex', gap:6, flexDirection:'column', alignItems:'flex-end' }}>
                  <span className={`tag ${diffColor[c.difficulty]}`}>{c.difficulty}</span>
                  {c.enrolled && <span className="tag tag-p">Enrolled</span>}
                </div>
              </div>
              <h3 style={{ fontSize:16, fontWeight:700, marginBottom:6 }}>{c.title}</h3>
              <p style={{ fontSize:13, color:'var(--t2)', lineHeight:1.5 }}>{c.desc}</p>
            </div>

            {/* Meta */}
            <div style={{ padding:'12px 24px', display:'flex', gap:16, fontSize:12, color:'var(--t2)', borderBottom:'1px solid var(--border)' }}>
              <span style={{ display:'flex', alignItems:'center', gap:4 }}><Star size={12} color="#f59e0b" fill="#f59e0b" /> {c.rating}</span>
              <span style={{ display:'flex', alignItems:'center', gap:4 }}><Users size={12} /> {c.students.toLocaleString()}</span>
              <span style={{ display:'flex', alignItems:'center', gap:4 }}><Clock size={12} /> {c.hours}h</span>
            </div>

            {/* Progress or enroll */}
            <div style={{ padding:'16px 24px', flex:1, display:'flex', flexDirection:'column', justifyContent:'space-between', gap:12 }}>
              {c.enrolled ? (
                <>
                  <div>
                    <div style={{ display:'flex', justifyContent:'space-between', fontSize:12, marginBottom:6 }}>
                      <span style={{ color:'var(--t2)' }}>Progress</span>
                      <span style={{ fontWeight:700, color:c.color }}>{c.progress}%</span>
                    </div>
                    <div className="prog"><div className="prog-fill" style={{ width:`${c.progress}%`, background:`linear-gradient(90deg,${c.color},${c.color}aa)` }} /></div>
                  </div>
                  <button className="btn btn-p" style={{ width:'100%', background:`linear-gradient(135deg,${c.color},${c.color}cc)` }}
                    onClick={() => navigate('/learn')}>
                    Continue <ChevronRight size={15} />
                  </button>
                </>
              ) : (
                <button className="btn btn-s" style={{ width:'100%' }} onClick={() => navigate('/learn')}>
                  Enroll Free <ChevronRight size={15} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign:'center', padding:'60px 0', color:'var(--t2)' }}>
          <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
          <p>No courses found. Try different filters.</p>
        </div>
      )}
    </div>
  )
}
