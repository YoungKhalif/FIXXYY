import { useState } from 'react'
import { useStore } from '../store/useStore'
import { CheckCircle, ChevronRight, ChevronLeft, Play, Award, X } from 'lucide-react'

const STEPS = [
  {
    id: 1,
    title: 'Introduction to Variables',
    type: 'lesson',
    content: `Variables are containers for storing data. In Python, you don't need to declare a type — just assign a value!`,
    code: `# Declaring variables in Python
name = "FIXXYY"          # String
age = 25                  # Integer
score = 98.5              # Float
is_active = True          # Boolean

print(f"Hello from {name}!")
print(f"Age: {age}, Score: {score}")`,
    tip: '💡 Python uses dynamic typing — the type is inferred automatically!',
  },
  {
    id: 2,
    title: 'Working with Loops',
    type: 'lesson',
    content: `Loops let you repeat code. Python has two main loops: for and while.`,
    code: `# For loop — iterate over a range
for i in range(1, 6):
    print(f"Count: {i}")

# While loop
count = 0
while count < 3:
    print(f"While: {count}")
    count += 1`,
    tip: '💡 Use for loops when you know the count, while loops when you don\'t!',
  },
  {
    id: 3,
    title: 'Try It Yourself',
    type: 'exercise',
    content: 'Write a Python function that returns the sum of all numbers from 1 to n.',
    starter: `def sum_to_n(n):
    # Your code here
    pass

print(sum_to_n(10))  # Expected: 55`,
    expected: '55',
    hint: 'Use a loop or the formula: n*(n+1)//2',
  },
  {
    id: 4,
    title: 'Quiz Time!',
    type: 'quiz',
    question: 'What does range(5) produce in Python?',
    options: ['[1,2,3,4,5]','[0,1,2,3,4]','[0,1,2,3,4,5]','[1,2,3,4]'],
    correct: 1,
  },
]

export default function LearnNow() {
  const { addXP, completeLesson } = useStore()
  const [step, setStep] = useState(0)
  const [code, setCode] = useState(STEPS[2].starter || '')
  const [output, setOutput] = useState('')
  const [quizSel, setQuizSel] = useState<number|null>(null)
  const [quizDone, setQuizDone] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const cur = STEPS[step]

  const runCode = () => {
    if (code.includes('return n*(n+1)//2') || code.includes('return sum(range') || code.includes('total') || code.includes('result')) {
      setOutput('55\n✅ Correct! +50 XP earned!')
      addXP(50)
      completeLesson(`py-ex-${step}`)
    } else {
      setOutput('None\n❌ Try again — make sure you return the sum, not None.')
    }
  }

  const checkQuiz = () => {
    if (quizSel === null) return
    setQuizDone(true)
    if (quizSel === (STEPS[3] as any).correct) { addXP(30); setShowModal(true) }
  }

  const next = () => { if (step < STEPS.length - 1) setStep(s => s + 1) }
  const prev = () => { if (step > 0) setStep(s => s - 1) }

  return (
    <div className="fade-in">
      {/* Progress bar */}
      <div style={{ marginBottom:24 }}>
        <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8, fontSize:13 }}>
          <span style={{ fontWeight:600 }}>Python Fundamentals — Variables & Loops</span>
          <span style={{ color:'var(--t2)' }}>Step {step+1} of {STEPS.length}</span>
        </div>
        <div className="prog" style={{ height:8 }}>
          <div className="prog-fill" style={{ width:`${((step+1)/STEPS.length)*100}%` }} />
        </div>
        <div style={{ display:'flex', gap:8, marginTop:10 }}>
          {STEPS.map((s,i) => (
            <button key={i} onClick={() => setStep(i)} style={{
              width:28, height:28, borderRadius:'50%', border:'none', cursor:'pointer',
              background: i <= step ? 'var(--grad)' : 'var(--bg3)',
              color: i <= step ? '#fff' : 'var(--t3)', fontSize:12, fontWeight:700,
              display:'flex', alignItems:'center', justifyContent:'center', transition:'var(--ease)'
            }}>{i < step ? <CheckCircle size={14}/> : i+1}</button>
          ))}
        </div>
      </div>

      <div className="g2" style={{ gap:24 }}>
        {/* Content panel */}
        <div>
          <div className="card" style={{ marginBottom:16 }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
              <span style={{ padding:'4px 10px', borderRadius:6, background:'rgba(139,92,246,0.15)', color:'var(--accent-l)', fontSize:11, fontWeight:700, textTransform:'uppercase' }}>
                {cur.type === 'lesson' ? '📖 Lesson' : cur.type === 'exercise' ? '💻 Exercise' : '🧠 Quiz'}
              </span>
            </div>
            <h2 style={{ fontSize:20, fontWeight:700, marginBottom:12 }}>{cur.title}</h2>
            <p style={{ color:'var(--t2)', lineHeight:1.7, marginBottom:16 }}>{cur.content}</p>

            {cur.type === 'lesson' && (
              <>
                <pre className="code" style={{ whiteSpace:'pre-wrap', wordBreak:'break-all' }}>
                  <span className="cm"># Declaring variables in Python{'\n'}</span>
                  <span className="kw">name</span> = <span className="str">"FIXXYY"</span>          <span className="cm"># String{'\n'}</span>
                  <span className="kw">age</span> = <span className="num">25</span>                  <span className="cm"># Integer{'\n'}</span>
                  <span className="kw">score</span> = <span className="num">98.5</span>              <span className="cm"># Float{'\n'}</span>
                  <span className="kw">is_active</span> = <span className="kw">True</span>          <span className="cm"># Boolean</span>
                </pre>
                {cur.tip && <div style={{ marginTop:12, padding:12, background:'rgba(6,182,212,0.08)', borderRadius:8, border:'1px solid rgba(6,182,212,0.2)', fontSize:13, color:'var(--cyan)' }}>{cur.tip}</div>}
              </>
            )}

            {cur.type === 'exercise' && (
              <div>
                <div style={{ marginBottom:8, fontSize:13, fontWeight:600, color:'var(--t2)' }}>Your Code:</div>
                <textarea className="input textarea" value={code} onChange={e => setCode(e.target.value)}
                  style={{ fontFamily:'Fira Code, monospace', fontSize:13, minHeight:140 }} />
                <div style={{ display:'flex', gap:10, marginTop:10 }}>
                  <button className="btn btn-p" onClick={runCode}><Play size={14}/> Run Code</button>
                  <button className="btn btn-s btn-sm" onClick={() => setCode(`def sum_to_n(n):\n    return n*(n+1)//2\n\nprint(sum_to_n(10))`)}>Show Hint</button>
                </div>
                {output && (
                  <pre style={{ marginTop:12, padding:12, background:'#0d1117', borderRadius:8, fontFamily:'Fira Code', fontSize:13,
                    color: output.includes('✅') ? 'var(--green)' : 'var(--red)', border:`1px solid ${output.includes('✅')?'rgba(16,185,129,0.3)':'rgba(239,68,68,0.3)'}` }}>
                    {output}
                  </pre>
                )}
              </div>
            )}

            {cur.type === 'quiz' && (
              <div>
                <h3 style={{ fontSize:16, fontWeight:600, marginBottom:16 }}>{(cur as any).question}</h3>
                {(cur as any).options.map((opt: string, i: number) => (
                  <button key={i} disabled={quizDone}
                    className={`quiz-opt ${quizSel===i?'sel':''} ${quizDone && i===(cur as any).correct?'ok':''} ${quizDone && quizSel===i && i!==(cur as any).correct?'bad':''}`}
                    onClick={() => setQuizSel(i)}>
                    <span style={{ marginRight:10, opacity:0.6 }}>{String.fromCharCode(65+i)}.</span>{opt}
                  </button>
                ))}
                {!quizDone && (
                  <button className="btn btn-p" style={{ marginTop:8 }} onClick={checkQuiz} disabled={quizSel===null}>
                    Submit Answer
                  </button>
                )}
                {quizDone && (
                  <div style={{ marginTop:12, padding:12, borderRadius:8,
                    background: quizSel===(cur as any).correct ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)',
                    border: `1px solid ${quizSel===(cur as any).correct?'rgba(16,185,129,0.3)':'rgba(239,68,68,0.3)'}`,
                    color: quizSel===(cur as any).correct ? 'var(--green)' : 'var(--red)', fontSize:14 }}>
                    {quizSel===(cur as any).correct ? '🎉 Correct! +30 XP awarded!' : '❌ Incorrect. The answer is B: [0,1,2,3,4]'}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Nav */}
          <div style={{ display:'flex', gap:10 }}>
            <button className="btn btn-s" onClick={prev} disabled={step===0}><ChevronLeft size={15}/> Previous</button>
            <button className="btn btn-p" style={{ flex:1, justifyContent:'center' }} onClick={next} disabled={step===STEPS.length-1}>
              Next Step <ChevronRight size={15}/>
            </button>
          </div>
        </div>

        {/* Sidebar info */}
        <div>
          <div className="card" style={{ marginBottom:16 }}>
            <div className="sec-title" style={{ fontSize:15, marginBottom:14 }}>📚 Lesson Overview</div>
            {STEPS.map((s, i) => (
              <div key={i} onClick={() => setStep(i)} style={{
                display:'flex', alignItems:'center', gap:10, padding:'10px 0',
                borderBottom: i < STEPS.length-1 ? '1px solid var(--border)' : 'none',
                cursor:'pointer', opacity: i > step ? 0.5 : 1,
              }}>
                <div style={{ width:24, height:24, borderRadius:'50%', flexShrink:0,
                  background: i < step ? 'var(--grad)' : i===step ? 'rgba(139,92,246,0.3)' : 'var(--bg2)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:11, fontWeight:700 }}>
                  {i < step ? <CheckCircle size={13}/> : i+1}
                </div>
                <span style={{ fontSize:13, fontWeight: i===step?700:400, color:i===step?'var(--t1)':'var(--t2)' }}>{s.title}</span>
                {i===step && <span style={{ marginLeft:'auto', width:6, height:6, background:'var(--accent)', borderRadius:'50%' }} />}
              </div>
            ))}
          </div>

          <div className="card" style={{ background:'rgba(139,92,246,0.05)', borderColor:'rgba(139,92,246,0.2)' }}>
            <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:12 }}>
              <Award size={20} color="var(--accent)" />
              <span style={{ fontWeight:700 }}>XP Rewards</span>
            </div>
            {[['📖 Lesson viewed','+10 XP'],['💻 Exercise solved','+50 XP'],['🧠 Quiz correct','+30 XP'],['🏁 Module complete','+100 XP']].map(([a,b])=>(
              <div key={a} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', fontSize:13, borderBottom:'1px solid var(--border)' }}>
                <span style={{ color:'var(--t2)' }}>{a}</span>
                <span style={{ fontWeight:700, color:'var(--accent-l)' }}>{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div className="overlay" onClick={() => setShowModal(false)}>
          <div className="modal" style={{ textAlign:'center' }} onClick={e=>e.stopPropagation()}>
            <button onClick={() => setShowModal(false)} style={{ position:'absolute', top:16, right:16, background:'none', border:'none', cursor:'pointer', color:'var(--t2)' }}><X size={20}/></button>
            <div style={{ fontSize:64, marginBottom:16 }}>🎉</div>
            <h2 style={{ fontSize:24, fontWeight:800, marginBottom:8 }}>Quiz Complete!</h2>
            <p style={{ color:'var(--t2)', marginBottom:20 }}>You got it right! +30 XP added to your account.</p>
            <button className="btn btn-p btn-lg" onClick={() => setShowModal(false)}>Continue Learning</button>
          </div>
        </div>
      )}
    </div>
  )
}
