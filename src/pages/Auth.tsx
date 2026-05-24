import { useState } from 'react'
import { useStore } from '../store/useStore'
import { Zap, Eye, EyeOff, Mail, Lock, User } from 'lucide-react'

export default function Auth() {
  const { login } = useStore()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!form.email || !form.password) { setError('Please fill all fields'); return }
    if (mode === 'signup' && !form.name) { setError('Name is required'); return }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const isAdmin = form.email.includes('admin')
      login({
        id: Date.now().toString(),
        name: form.name || form.email.split('@')[0],
        email: form.email,
        role: isAdmin ? 'admin' : 'student',
        xp: isAdmin ? 9999 : 0,
        level: isAdmin ? 20 : 1,
        streak: 0,
        avatar: (form.name || form.email)[0].toUpperCase(),
        joinDate: new Date().toISOString(),
        badges: [],
        completedLessons: [],
        completedCourses: [],
      })
    }, 1200)
  }

  return (
    <div className="auth-wrap">
      {/* Background blobs */}
      <div className="auth-blob" style={{ background:'#8b5cf6', top:'-100px', left:'-100px' }} />
      <div className="auth-blob" style={{ background:'#06b6d4', bottom:'-100px', right:'-100px' }} />

      <div style={{ width:'100%', maxWidth:440, position:'relative', zIndex:1 }}>
        {/* Logo */}
        <div style={{ textAlign:'center', marginBottom:32 }}>
          <div style={{ display:'inline-flex', alignItems:'center', justifyContent:'center',
            width:60, height:60, borderRadius:16, background:'linear-gradient(135deg,#8b5cf6,#06b6d4)',
            marginBottom:16, boxShadow:'0 0 30px rgba(139,92,246,0.4)' }}>
            <Zap size={28} color="#fff" />
          </div>
          <h1 style={{ fontSize:32, fontWeight:900, background:'linear-gradient(135deg,#8b5cf6,#06b6d4)',
            WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>FIXXYY</h1>
          <p style={{ color:'var(--t2)', marginTop:6, fontSize:14 }}>
            {mode === 'login' ? 'Welcome back! Continue learning.' : 'Start your coding journey today.'}
          </p>
        </div>

        <div className="card" style={{ padding:32 }}>
          {/* Tabs */}
          <div className="tabs" style={{ marginBottom:24 }}>
            <button className={`tab ${mode==='login'?'active':''}`} onClick={() => setMode('login')}>Log In</button>
            <button className={`tab ${mode==='signup'?'active':''}`} onClick={() => setMode('signup')}>Sign Up</button>
          </div>

          <form onSubmit={handle} style={{ display:'flex', flexDirection:'column', gap:16 }}>
            {mode === 'signup' && (
              <div>
                <label className="label">Full Name</label>
                <div style={{ position:'relative' }}>
                  <User size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--t3)' }} />
                  <input className="input" style={{ paddingLeft:36 }} placeholder="Benjamin"
                    value={form.name} onChange={e => setForm(f=>({...f, name:e.target.value}))} />
                </div>
              </div>
            )}
            <div>
              <label className="label">Email</label>
              <div style={{ position:'relative' }}>
                <Mail size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--t3)' }} />
                <input className="input" style={{ paddingLeft:36 }} type="email" placeholder="you@example.com"
                  value={form.email} onChange={e => setForm(f=>({...f, email:e.target.value}))} />
              </div>
            </div>
            <div>
              <label className="label">Password</label>
              <div style={{ position:'relative' }}>
                <Lock size={15} style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'var(--t3)' }} />
                <input className="input" style={{ paddingLeft:36, paddingRight:40 }}
                  type={show ? 'text' : 'password'} placeholder="••••••••"
                  value={form.password} onChange={e => setForm(f=>({...f, password:e.target.value}))} />
                <button type="button" onClick={() => setShow(s=>!s)}
                  style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)',
                    background:'none', border:'none', cursor:'pointer', color:'var(--t3)' }}>
                  {show ? <EyeOff size={15}/> : <Eye size={15}/>}
                </button>
              </div>
            </div>

            {error && <p style={{ color:'var(--red)', fontSize:13, textAlign:'center' }}>{error}</p>}

            <button className="btn btn-p btn-lg" type="submit" disabled={loading} style={{ marginTop:4 }}>
              {loading ? <span className="spinner" style={{ width:18,height:18,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block' }} /> : mode === 'login' ? 'Log In' : 'Create Account'}
            </button>
          </form>

          <div className="divider" />
          <p style={{ fontSize:12, color:'var(--t3)', textAlign:'center' }}>
            Demo: use any email/password · Use <strong style={{color:'var(--accent-l)'}}>admin@...</strong> for admin access
          </p>
        </div>

        {/* Social proof */}
        <div style={{ display:'flex', justifyContent:'center', gap:24, marginTop:24 }}>
          {[['50K+','Learners'],['200+','Courses'],['1M+','Lines Run']].map(([v,l])=>(
            <div key={l} style={{ textAlign:'center' }}>
              <div style={{ fontSize:18, fontWeight:800, background:'linear-gradient(135deg,#8b5cf6,#06b6d4)',
                WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent' }}>{v}</div>
              <div style={{ fontSize:11, color:'var(--t3)' }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
