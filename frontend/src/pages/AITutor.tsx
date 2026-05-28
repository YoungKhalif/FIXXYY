import { useState, useRef, useEffect } from 'react'
import { Send, Bot, User, Zap, Code2, BookOpen, Bug, Lightbulb, RotateCcw } from 'lucide-react'
import { useStore } from '../store/useStore'

interface Msg { role: 'ai' | 'user'; text: string; time: string }

const QUICK = [
  { icon: Bug, label: 'Fix my code', prompt: 'Can you help me fix this code?\n```python\ndef divide(a, b):\n    return a / b\n\nprint(divide(10, 0))  # This crashes!\n```' },
  { icon: BookOpen, label: 'Explain loops', prompt: 'Can you explain Python loops with examples?' },
  { icon: Code2, label: 'What is recursion?', prompt: 'Explain recursion with a simple example.' },
  { icon: Lightbulb, label: 'Next lesson tips', prompt: 'Based on my progress, what should I learn next?' },
]

const AI_RESPONSES: Record<string, string> = {
  default: `Great question! 🤖 I'm FIXXYY's AI Tutor powered by advanced language models.

I can help you with:
• 🐛 **Debugging** — paste any broken code and I'll find the issue
• 📖 **Explanations** — any concept explained simply
• 💡 **Recommendations** — personalized learning paths
• ✍️ **Code review** — best practices and improvements

What would you like to explore today?`,

  fix: `I found the bug! 🐛 The problem is a **ZeroDivisionError** — you're dividing by 0.

Here's the fixed version:
\`\`\`python
def divide(a, b):
    if b == 0:
        return "Error: Cannot divide by zero!"
    return a / b

print(divide(10, 0))   # Error: Cannot divide by zero!
print(divide(10, 2))   # 5.0
\`\`\`

**What changed:** Added a guard clause to check if \`b == 0\` before dividing. This is called **defensive programming** — always validate inputs! ✅`,

  loops: `Great topic! Python has 2 main loops:

**1. for loop** — when you know the count:
\`\`\`python
for i in range(5):
    print(i)  # 0, 1, 2, 3, 4

# Loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)
\`\`\`

**2. while loop** — when you don't know the count:
\`\`\`python
count = 0
while count < 5:
    print(count)
    count += 1
\`\`\`

💡 **Rule of thumb:** Use \`for\` when iterating over a sequence, \`while\` when waiting for a condition.`,

  recursion: `Recursion is when a function **calls itself**! 🔄

\`\`\`python
def factorial(n):
    # Base case — stops the recursion
    if n == 0:
        return 1
    # Recursive case
    return n * factorial(n - 1)

print(factorial(5))  # 120
# 5 * 4 * 3 * 2 * 1 = 120
\`\`\`

**Key rules:**
1. Always have a **base case** (stopping condition)
2. Each call must move **closer** to the base case
3. Works like a stack — last in, first out

⚠️ Without a base case → infinite loop → stack overflow!`,

  next: `Based on your progress (Level 8, Python 72% done), here's your personalized roadmap: 🗺️

**This week:**
1. ✅ Finish Python Fundamentals (28% left — ~3 lessons)
2. 🎯 Start: **Functions & Modules** (you've done variables + loops)

**Next month:**
3. → **JavaScript Basics** (you're at 45% — keep going!)
4. → **Python OOP** (classes, inheritance)
5. → **SQL Fundamentals** (essential for any dev role)

**Career track suggestion:** Based on your Python + JS path, you're heading toward **Full Stack Development**. Want me to create a 30-day study plan? 🚀`,
}

function getResponse(msg: string): string {
  const m = msg.toLowerCase()
  if (m.includes('fix') || m.includes('divide') || m.includes('bug') || m.includes('crash') || m.includes('error')) return AI_RESPONSES.fix
  if (m.includes('loop') || m.includes('for') || m.includes('while')) return AI_RESPONSES.loops
  if (m.includes('recur')) return AI_RESPONSES.recursion
  if (m.includes('next') || m.includes('recommend') || m.includes('learn')) return AI_RESPONSES.next
  return AI_RESPONSES.default
}

function timeNow() { return new Date().toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }) }

export default function AITutor() {
  const { user } = useStore()
  const [msgs, setMsgs] = useState<Msg[]>([
    { role:'ai', text:`Hey ${user?.name?.split(' ')[0] || 'there'}! 👋 I'm your FIXXYY AI Tutor.\n\nI can help you debug code, explain concepts, and guide your learning journey. What can I help you with today?`, time: timeNow() }
  ])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => { endRef.current?.scrollIntoView({ behavior:'smooth' }) }, [msgs, typing])

  const send = (text: string) => {
    if (!text.trim()) return
    const userMsg: Msg = { role:'user', text: text.trim(), time: timeNow() }
    setMsgs(m => [...m, userMsg])
    setInput('')
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMsgs(m => [...m, { role:'ai', text: getResponse(text), time: timeNow() }])
    }, 1200 + Math.random() * 800)
  }

  const clear = () => setMsgs([{ role:'ai', text:`Chat cleared! How can I help you, ${user?.name?.split(' ')[0]}?`, time: timeNow() }])

  return (
    <div className="fade-in" style={{ display:'flex', flexDirection:'column', height:'calc(100vh - 130px)', gap:16 }}>
      {/* Quick actions */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
        {QUICK.map(({ icon: Icon, label, prompt }) => (
          <button key={label} className="btn btn-s btn-sm" onClick={() => send(prompt)}>
            <Icon size={13} /> {label}
          </button>
        ))}
        <button className="btn btn-s btn-sm" onClick={clear} style={{ marginLeft:'auto' }}>
          <RotateCcw size={13} /> Clear
        </button>
      </div>

      {/* Chat */}
      <div className="card" style={{ flex:1, padding:0, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        {/* Header */}
        <div style={{ padding:'14px 20px', borderBottom:'1px solid var(--border)', display:'flex', alignItems:'center', gap:10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#8b5cf6,#06b6d4)', display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Bot size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontWeight:700, fontSize:14 }}>FIXXYY AI Tutor</div>
            <div style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'var(--green)' }}>
              <span style={{ width:6, height:6, background:'var(--green)', borderRadius:'50%', display:'inline-block' }} />
              Online · Powered by Claude AI
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex:1, overflowY:'auto', padding:'20px', display:'flex', flexDirection:'column', gap:16 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display:'flex', flexDirection:'column', alignItems: m.role==='user' ? 'flex-end' : 'flex-start' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:8, flexDirection: m.role==='user' ? 'row-reverse' : 'row', maxWidth:'80%' }}>
                <div style={{ width:28, height:28, borderRadius:'50%', flexShrink:0, marginTop:2,
                  background: m.role==='ai' ? 'linear-gradient(135deg,#8b5cf6,#06b6d4)' : 'var(--bg4)',
                  display:'flex', alignItems:'center', justifyContent:'center' }}>
                  {m.role==='ai' ? <Bot size={14} color="#fff"/> : <User size={14} color="var(--t2)"/>}
                </div>
                <div className={`bubble ${m.role==='ai'?'bubble-ai':'bubble-user'}`}
                  style={{ whiteSpace:'pre-wrap', wordBreak:'break-word' }}>
                  {m.text}
                </div>
              </div>
              <span style={{ fontSize:10, color:'var(--t3)', marginTop:4, paddingLeft: m.role==='ai'?36:0, paddingRight: m.role==='user'?36:0 }}>{m.time}</span>
            </div>
          ))}

          {typing && (
            <div style={{ display:'flex', alignItems:'flex-start', gap:8 }}>
              <div style={{ width:28, height:28, borderRadius:'50%', background:'linear-gradient(135deg,#8b5cf6,#06b6d4)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Bot size={14} color="#fff"/>
              </div>
              <div className="bubble bubble-ai">
                <span style={{ display:'flex', gap:4 }}>
                  {[0,1,2].map(i => <span key={i} style={{ width:7,height:7,background:'var(--t3)',borderRadius:'50%',animation:'pulse 1s infinite',animationDelay:`${i*0.2}s`,display:'inline-block' }} />)}
                </span>
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Input */}
        <div style={{ padding:'14px 20px', borderTop:'1px solid var(--border)', display:'flex', gap:10 }}>
          <textarea
            className="input" value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key==='Enter' && !e.shiftKey) { e.preventDefault(); send(input) } }}
            placeholder="Ask anything... (Shift+Enter for newline)"
            style={{ resize:'none', minHeight:44, maxHeight:120, lineHeight:1.5, paddingTop:10 }}
            rows={1}
          />
          <button className="btn btn-p" onClick={() => send(input)} disabled={!input.trim() || typing}
            style={{ alignSelf:'flex-end', padding:'10px 16px' }}>
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  )
}
