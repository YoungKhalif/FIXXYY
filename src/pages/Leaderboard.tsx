import { useState } from 'react'
import { useStore } from '../store/useStore'
import { Trophy, Medal, Crown, TrendingUp } from 'lucide-react'

const USERS = [
  { rank:1, name:'Sarah Chen', avatar:'SC', xp:15420, streak:45, badges:18, country:'🇺🇸', level:30 },
  { rank:2, name:'Marcus Rivera', avatar:'MR', xp:13800, streak:38, badges:15, country:'🇧🇷', level:27 },
  { rank:3, name:'Priya Patel', avatar:'PP', xp:12650, streak:52, badges:21, country:'🇮🇳', level:25 },
  { rank:4, name:'Tomás García', avatar:'TG', xp:11200, streak:29, badges:13, country:'🇪🇸', level:22 },
  { rank:5, name:'Yuki Tanaka', avatar:'YT', xp:10800, streak:33, badges:16, country:'🇯🇵', level:21 },
  { rank:6, name:'Emma Wilson', avatar:'EW', xp:9950, streak:21, badges:12, country:'🇬🇧', level:19 },
  { rank:7, name:'Ahmed Hassan', avatar:'AH', xp:8700, streak:18, badges:10, country:'🇪🇬', level:17 },
  { rank:8, name:'Sofia Rossi', avatar:'SR', xp:7900, streak:14, badges:9, country:'🇮🇹', level:15 },
  { rank:9, name:'Jake Kim', avatar:'JK', xp:6500, streak:11, badges:8, country:'🇰🇷', level:13 },
  { rank:10, name:'Lena Müller', avatar:'LM', xp:5200, streak:9, badges:7, country:'🇩🇪', level:10 },
  { rank:24, name:'Benjamin', avatar:'B', xp:2450, streak:12, badges:4, country:'🇺🇸', level:8, isMe:true },
]

const COLORS = ['#f59e0b','#94a3b8','#cd7c2f']

export default function Leaderboard() {
  const { user } = useStore()
  const [period, setPeriod] = useState<'weekly'|'monthly'|'alltime'>('weekly')
  const myEntry = USERS.find(u => u.isMe)
  const top3 = USERS.slice(0,3)
  const rest = USERS.slice(3).filter(u => !u.isMe)

  return (
    <div className="fade-in">
      {/* Period selector */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:800 }}>🏆 Leaderboard</h2>
          <p style={{ color:'var(--t2)', fontSize:13, marginTop:2 }}>Top learners ranked by XP earned</p>
        </div>
        <div className="tabs" style={{ width:'auto', marginBottom:0 }}>
          {(['weekly','monthly','alltime'] as const).map(p => (
            <button key={p} className={`tab ${period===p?'active':''}`}
              onClick={() => setPeriod(p)} style={{ flex:'none', padding:'7px 16px' }}>
              {p === 'alltime' ? 'All Time' : p.charAt(0).toUpperCase()+p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Top 3 podium */}
      <div className="card" style={{ marginBottom:20, background:'linear-gradient(135deg,rgba(139,92,246,0.05),rgba(6,182,212,0.05))', overflow:'visible' }}>
        <div style={{ display:'flex', justifyContent:'center', alignItems:'flex-end', gap:16, padding:'24px 0 8px' }}>
          {[top3[1], top3[0], top3[2]].map((u, i) => {
            const pos = [1,0,2][i]
            const heights = [160, 200, 140]
            const colors = ['#94a3b8','#f59e0b','#cd7c2f']
            const realRank = [2,1,3][i]
            return (
              <div key={u.rank} style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
                <div style={{ position:'relative' }}>
                  {realRank === 1 && <Crown size={22} color="#f59e0b" style={{ position:'absolute', top:-26, left:'50%', transform:'translateX(-50%)' }} />}
                  <div style={{ width:56, height:56, borderRadius:'50%',
                    background:`linear-gradient(135deg,${colors[pos]},${colors[pos]}88)`,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:18, fontWeight:800, color:'#fff',
                    border:`3px solid ${colors[pos]}`, boxShadow:`0 0 20px ${colors[pos]}44` }}>
                    {u.avatar}
                  </div>
                </div>
                <div style={{ textAlign:'center' }}>
                  <div style={{ fontSize:13, fontWeight:700 }}>{u.name.split(' ')[0]}</div>
                  <div style={{ fontSize:12, color:'var(--t2)' }}>{u.country}</div>
                  <div style={{ fontSize:13, fontWeight:800, color:colors[pos] }}>{u.xp.toLocaleString()} XP</div>
                </div>
                <div style={{ width:80, height:heights[i], background:`linear-gradient(180deg,${colors[pos]}33,${colors[pos]}11)`,
                  border:`1px solid ${colors[pos]}44`, borderRadius:'8px 8px 0 0',
                  display:'flex', alignItems:'flex-start', justifyContent:'center', paddingTop:8 }}>
                  <span style={{ fontSize:22, fontWeight:900, color:colors[pos] }}>#{realRank}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Rest of leaderboard */}
      <div className="card" style={{ marginBottom:16, padding:0, overflow:'hidden' }}>
        <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:8 }}>
          <TrendingUp size={15} color="var(--accent)" />
          <span style={{ fontWeight:700, fontSize:14 }}>Rankings</span>
        </div>
        <div style={{ padding:'8px 12px' }}>
          {rest.map(u => (
            <div key={u.rank} className="lb-row">
              <div className="lb-rank" style={{ color: u.rank<=3 ? COLORS[u.rank-1] : 'var(--t2)' }}>
                {u.rank <= 3 ? <Medal size={18} color={COLORS[u.rank-1]}/> : `#${u.rank}`}
              </div>
              <div style={{ width:36, height:36, borderRadius:'50%', background:'var(--bg4)', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:13, flexShrink:0 }}>{u.avatar}</div>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:14, fontWeight:600 }}>{u.name} <span style={{ fontSize:13 }}>{u.country}</span></div>
                <div style={{ fontSize:12, color:'var(--t2)' }}>Lv.{u.level} · 🔥 {u.streak} days · 🏅 {u.badges} badges</div>
              </div>
              <div style={{ fontWeight:800, color:'var(--accent-l)', fontSize:14 }}>{u.xp.toLocaleString()} XP</div>
            </div>
          ))}
        </div>
      </div>

      {/* Your position */}
      {myEntry && (
        <div className="card lb-row me" style={{ padding:16 }}>
          <div className="lb-rank" style={{ color:'var(--accent-l)' }}>#{myEntry.rank}</div>
          <div style={{ width:36,height:36,borderRadius:'50%',background:'var(--grad)',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:700,fontSize:13,color:'#fff' }}>{myEntry.avatar}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:14, fontWeight:700 }}>{myEntry.name} <span style={{ fontSize:11, background:'var(--grad)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', fontWeight:700 }}>YOU</span></div>
            <div style={{ fontSize:12, color:'var(--t2)' }}>Lv.{myEntry.level} · 🔥 {myEntry.streak} days · 🏅 {myEntry.badges} badges</div>
          </div>
          <div>
            <div style={{ fontWeight:800, color:'var(--accent-l)', fontSize:14 }}>{myEntry.xp.toLocaleString()} XP</div>
            <div style={{ fontSize:11, color:'var(--t2)', textAlign:'right' }}>Keep going! 🚀</div>
          </div>
        </div>
      )}
    </div>
  )
}
