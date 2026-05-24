import { useState } from 'react'
import { useStore } from '../store/useStore'
import { MessageSquare, ThumbsUp, Eye, Plus, X, Search, TrendingUp, Users, Flame } from 'lucide-react'

const POSTS = [
  { id:1, author:'Sarah Chen', avatar:'SC', time:'2h ago', tag:'Help', title:'How do I reverse a string without slicing in Python?', body:'I know the slice method str[::-1] works but my interviewer asked me to do it differently. Any ideas?', likes:24, replies:8, views:142 },
  { id:2, author:'Marcus Rivera', avatar:'MR', time:'4h ago', tag:'Solution', title:'My FizzBuzz solution — 3 different approaches', body:"Here's how I solved FizzBuzz using a loop, list comprehension, and a functional approach. Let me know which you prefer!", likes:56, replies:14, views:389, featured:true },
  { id:3, author:'Priya Patel', avatar:'PP', time:'6h ago', tag:'Discussion', title:'Python vs JavaScript — which should a beginner learn first?', body:"I'm starting my coding journey and can't decide. Python seems easier but JS has more job postings in my area.", likes:38, replies:31, views:512 },
  { id:4, author:'Yuki Tanaka', avatar:'YT', time:'1d ago', tag:'Resource', title:'Free resources I used to go from 0 to landing a dev job in 8 months', body:'Sharing my full learning path with all the free resources, projects I built, and tips that actually worked.', likes:127, replies:45, views:1840 },
  { id:5, author:'Ahmed Hassan', avatar:'AH', time:'1d ago', tag:'Help', title:'Getting a RecursionError — how do I debug this?', body:"My recursive function keeps throwing RecursionError: maximum recursion depth exceeded. I've added a base case but it still errors.", likes:12, replies:7, views:94 },
]

const TAG_COLORS: Record<string,string> = { Help:'tag-a', Solution:'tag-g', Discussion:'tag-c', Resource:'tag-p' }
const ACTIVE = [
  { avatar:'SC', name:'Sarah Chen', posts:42 },
  { avatar:'MR', name:'Marcus R.', posts:38 },
  { avatar:'PP', name:'Priya P.', posts:31 },
  { avatar:'YT', name:'Yuki T.', posts:27 },
]

export default function Community() {
  const { user } = useStore()
  const [posts, setPosts] = useState(POSTS)
  const [liked, setLiked] = useState<number[]>([])
  const [search, setSearch] = useState('')
  const [showNew, setShowNew] = useState(false)
  const [newPost, setNewPost] = useState({ title:'', body:'', tag:'Help' })
  const [filter, setFilter] = useState('All')

  const toggleLike = (id: number) => {
    setLiked(l => l.includes(id) ? l.filter(x=>x!==id) : [...l, id])
    setPosts(p => p.map(p => p.id===id ? {...p, likes: liked.includes(id) ? p.likes-1 : p.likes+1} : p))
  }

  const submit = () => {
    if (!newPost.title.trim()) return
    const p = { id: Date.now(), author: user?.name||'You', avatar: user?.avatar||'U', time:'Just now',
      tag: newPost.tag, title: newPost.title, body: newPost.body, likes:0, replies:0, views:1 }
    setPosts(ps => [p, ...ps])
    setNewPost({ title:'', body:'', tag:'Help' })
    setShowNew(false)
  }

  const filtered = posts.filter(p =>
    (filter==='All' || p.tag===filter) &&
    (p.title.toLowerCase().includes(search.toLowerCase()) || p.body.toLowerCase().includes(search.toLowerCase()))
  )

  return (
    <div className="fade-in">
      <div style={{ display:'grid', gridTemplateColumns:'1fr 280px', gap:20 }}>
        {/* Main feed */}
        <div>
          {/* Toolbar */}
          <div style={{ display:'flex', gap:10, marginBottom:20, flexWrap:'wrap' }}>
            <div style={{ position:'relative', flex:1, minWidth:180 }}>
              <Search size={14} style={{ position:'absolute', left:11, top:'50%', transform:'translateY(-50%)', color:'var(--t3)' }} />
              <input className="input" style={{ paddingLeft:34 }} placeholder="Search discussions..."
                value={search} onChange={e => setSearch(e.target.value)} />
            </div>
            {['All','Help','Solution','Discussion','Resource'].map(t => (
              <button key={t} className={`btn btn-sm ${filter===t?'btn-p':'btn-s'}`} onClick={() => setFilter(t)}>{t}</button>
            ))}
            <button className="btn btn-p btn-sm" onClick={() => setShowNew(true)}>
              <Plus size={14}/> New Post
            </button>
          </div>

          {/* Posts */}
          <div className="card" style={{ padding:'0 24px' }}>
            {filtered.map((p, i) => (
              <div key={p.id} className="post-card">
                {p.featured && (
                  <div style={{ display:'flex', alignItems:'center', gap:5, marginBottom:8, fontSize:11, fontWeight:700, color:'var(--amber)' }}>
                    <Flame size={12}/> Featured Solution
                  </div>
                )}
                <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                  <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--grad)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, color:'#fff', flexShrink:0 }}>{p.avatar}</div>
                  <span style={{ fontSize:13, fontWeight:600 }}>{p.author}</span>
                  <span style={{ fontSize:12, color:'var(--t3)' }}>·</span>
                  <span style={{ fontSize:12, color:'var(--t3)' }}>{p.time}</span>
                  <span className={`tag ${TAG_COLORS[p.tag]}`}>{p.tag}</span>
                </div>
                <h3 style={{ fontSize:15, fontWeight:700, marginBottom:6, cursor:'pointer' }}
                  onMouseEnter={e => (e.currentTarget.style.color='var(--accent-l)')}
                  onMouseLeave={e => (e.currentTarget.style.color='')}>
                  {p.title}
                </h3>
                <p style={{ fontSize:13, color:'var(--t2)', lineHeight:1.6, marginBottom:12 }}>{p.body}</p>
                <div style={{ display:'flex', gap:16 }}>
                  <button onClick={() => toggleLike(p.id)}
                    style={{ display:'flex', alignItems:'center', gap:5, fontSize:13, background:'none', border:'none', cursor:'pointer',
                      color: liked.includes(p.id) ? 'var(--accent-l)' : 'var(--t2)', transition:'var(--ease)' }}>
                    <ThumbsUp size={13} fill={liked.includes(p.id)?'var(--accent-l)':'none'}/> {p.likes}
                  </button>
                  <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:13, color:'var(--t2)' }}>
                    <MessageSquare size={13}/> {p.replies} replies
                  </span>
                  <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:13, color:'var(--t2)' }}>
                    <Eye size={13}/> {p.views}
                  </span>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ textAlign:'center', padding:'40px 0', color:'var(--t2)' }}>
                <div style={{ fontSize:40, marginBottom:8 }}>💬</div>
                <p>No posts found. Be the first to post!</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
          {/* Stats */}
          <div className="card card-sm">
            <div style={{ fontWeight:700, marginBottom:12, fontSize:14 }}>📊 Community Stats</div>
            {[['👥 Members','52,840'],['💬 Posts Today','284'],['✅ Solved','1,924'],['🔥 Online Now','1,247']].map(([l,v])=>(
              <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid var(--border)', fontSize:13 }}>
                <span style={{ color:'var(--t2)' }}>{l}</span>
                <span style={{ fontWeight:700 }}>{v}</span>
              </div>
            ))}
          </div>

          {/* Active learners */}
          <div className="card card-sm">
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:12 }}>
              <Users size={14} color="var(--accent)"/>
              <span style={{ fontWeight:700, fontSize:14 }}>Top Contributors</span>
            </div>
            {ACTIVE.map((a, i) => (
              <div key={a.name} style={{ display:'flex', alignItems:'center', gap:8, padding:'7px 0',
                borderBottom: i < ACTIVE.length-1 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ width:30, height:30, borderRadius:'50%', background:'var(--grad)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700, color:'#fff' }}>{a.avatar}</div>
                <span style={{ flex:1, fontSize:13 }}>{a.name}</span>
                <span style={{ fontSize:11, color:'var(--accent-l)', fontWeight:600 }}>{a.posts} posts</span>
              </div>
            ))}
          </div>

          {/* Trending tags */}
          <div className="card card-sm">
            <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:12 }}>
              <TrendingUp size={14} color="var(--cyan)"/>
              <span style={{ fontWeight:700, fontSize:14 }}>Trending Tags</span>
            </div>
            <div style={{ display:'flex', flexWrap:'wrap', gap:6 }}>
              {['#python','#javascript','#beginners','#algorithms','#webdev','#debugging','#react','#sql'].map(t=>(
                <span key={t} className="tag tag-c" style={{ cursor:'pointer' }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New post modal */}
      {showNew && (
        <div className="overlay" onClick={() => setShowNew(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
              <h2 style={{ fontSize:18, fontWeight:700 }}>Create Post</h2>
              <button onClick={() => setShowNew(false)} style={{ background:'none', border:'none', cursor:'pointer', color:'var(--t2)' }}><X size={18}/></button>
            </div>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <div>
                <label className="label">Tag</label>
                <div style={{ display:'flex', gap:6 }}>
                  {['Help','Discussion','Solution','Resource'].map(t=>(
                    <button key={t} className={`btn btn-sm ${newPost.tag===t?'btn-p':'btn-s'}`} onClick={()=>setNewPost(p=>({...p,tag:t}))}>{t}</button>
                  ))}
                </div>
              </div>
              <div>
                <label className="label">Title</label>
                <input className="input" placeholder="What's your question or topic?" value={newPost.title} onChange={e=>setNewPost(p=>({...p,title:e.target.value}))} />
              </div>
              <div>
                <label className="label">Details</label>
                <textarea className="input" style={{ minHeight:100, resize:'vertical', fontFamily:'inherit' }}
                  placeholder="Add more context..." value={newPost.body} onChange={e=>setNewPost(p=>({...p,body:e.target.value}))} />
              </div>
              <button className="btn btn-p" onClick={submit}>Post to Community</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
