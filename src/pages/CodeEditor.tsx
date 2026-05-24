import { useState, useRef } from 'react'
import { Play, RotateCcw, Copy, CheckCheck, Terminal, ChevronDown } from 'lucide-react'
import { useStore } from '../store/useStore'

const STARTERS: Record<string, string> = {
  python: `# Python Code Editor
def greet(name):
    return f"Hello, {name}! Welcome to FIXXYY 🚀"

# Try running this!
for i in range(1, 6):
    print(f"{i}. {greet('Coder')}")

# Fibonacci sequence
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a, end=' ')
        a, b = b, a + b

print("\\nFibonacci:")
fibonacci(10)`,
  javascript: `// JavaScript Code Editor
function greet(name) {
  return \`Hello, \${name}! Welcome to FIXXYY 🚀\`;
}

// Arrow function
const square = (n) => n * n;

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);

console.log(greet("Coder"));
console.log("Squared:", square(7));
console.log("Doubled:", doubled);
console.log("Evens:", evens);`,
  java: `// Java Code Editor
public class Main {
    public static void main(String[] args) {
        // Variables and types
        String name = "FIXXYY";
        int count = 5;
        
        System.out.println("Welcome to " + name + "!");
        
        // Loop
        for (int i = 1; i <= count; i++) {
            System.out.println("Line " + i + ": Hello World");
        }
        
        // Method call
        System.out.println("Sum 1-10: " + sum(10));
    }
    
    static int sum(int n) {
        return n * (n + 1) / 2;
    }
}`,
}

const OUTPUTS: Record<string, string> = {
  python: `1. Hello, Coder! Welcome to FIXXYY 🚀
2. Hello, Coder! Welcome to FIXXYY 🚀
3. Hello, Coder! Welcome to FIXXYY 🚀
4. Hello, Coder! Welcome to FIXXYY 🚀
5. Hello, Coder! Welcome to FIXXYY 🚀

Fibonacci:
0 1 1 2 3 5 8 13 21 34 

✅ Program exited with code 0`,
  javascript: `Hello, Coder! Welcome to FIXXYY 🚀
Squared: 49
Doubled: [2, 4, 6, 8, 10]
Evens: [2, 4]

✅ Script completed successfully`,
  java: `Welcome to FIXXYY!
Line 1: Hello World
Line 2: Hello World
Line 3: Hello World
Line 4: Hello World
Line 5: Hello World
Sum 1-10: 55

✅ Build successful · Runtime: 0.3s`,
}

const CHALLENGES = [
  { id:1, title:'FizzBuzz', diff:'Easy', xp:50, desc:'Print numbers 1-100, replace multiples of 3 with "Fizz", 5 with "Buzz"' },
  { id:2, title:'Palindrome Check', diff:'Easy', xp:75, desc:'Write a function to check if a string is a palindrome.' },
  { id:3, title:'Binary Search', diff:'Medium', xp:120, desc:'Implement binary search and return the index of target.' },
  { id:4, title:'Merge Sort', diff:'Hard', xp:200, desc:'Implement merge sort algorithm from scratch.' },
]

const diffTag: Record<string,string> = { Easy:'tag-g', Medium:'tag-a', Hard:'tag-r' }

export default function CodeEditor() {
  const { addXP } = useStore()
  const [lang, setLang] = useState('python')
  const [code, setCode] = useState(STARTERS.python)
  const [output, setOutput] = useState('')
  const [running, setRunning] = useState(false)
  const [copied, setCopied] = useState(false)
  const [tab, setTab] = useState<'editor'|'challenges'>('editor')
  const [solvedIds, setSolvedIds] = useState<number[]>([])
  const textRef = useRef<HTMLTextAreaElement>(null)

  const changeLang = (l: string) => {
    setLang(l)
    setCode(STARTERS[l])
    setOutput('')
  }

  const run = () => {
    setRunning(true)
    setOutput('')
    setTimeout(() => {
      setOutput(OUTPUTS[lang])
      setRunning(false)
    }, 900)
  }

  const reset = () => { setCode(STARTERS[lang]); setOutput('') }

  const copy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const solveChallenge = (id: number, xp: number) => {
    if (solvedIds.includes(id)) return
    setSolvedIds(s => [...s, id])
    addXP(xp)
  }

  const lineCount = code.split('\n').length

  return (
    <div className="fade-in">
      {/* Tabs */}
      <div className="tabs" style={{ maxWidth:300 }}>
        <button className={`tab ${tab==='editor'?'active':''}`} onClick={() => setTab('editor')}>Editor</button>
        <button className={`tab ${tab==='challenges'?'active':''}`} onClick={() => setTab('challenges')}>Challenges</button>
      </div>

      {tab === 'editor' ? (
        <div style={{ display:'grid', gridTemplateRows:'auto 1fr', gap:16 }}>
          {/* Editor */}
          <div className="card" style={{ padding:0, overflow:'hidden' }}>
            {/* Toolbar */}
            <div style={{ display:'flex', alignItems:'center', justify:'space-between', padding:'10px 16px',
              background:'var(--bg2)', borderBottom:'1px solid var(--border)', gap:12 }}>
              <div style={{ display:'flex', gap:6 }}>
                {['python','javascript','java'].map(l => (
                  <button key={l} onClick={() => changeLang(l)}
                    className={`btn btn-sm ${lang===l?'btn-p':'btn-s'}`} style={{ textTransform:'capitalize' }}>
                    {l === 'python' ? '🐍' : l === 'javascript' ? '⚡' : '☕'} {l}
                  </button>
                ))}
              </div>
              <div style={{ flex:1 }} />
              <span style={{ fontSize:11, color:'var(--t3)', fontFamily:'Fira Code' }}>{lineCount} lines</span>
              <button className="btn btn-s btn-sm" onClick={copy}>
                {copied ? <><CheckCheck size={13}/> Copied</> : <><Copy size={13}/> Copy</>}
              </button>
              <button className="btn btn-s btn-sm" onClick={reset}><RotateCcw size={13}/> Reset</button>
              <button className="btn btn-p" onClick={run} disabled={running} style={{ minWidth:100 }}>
                {running
                  ? <><span className="spinner" style={{ width:14,height:14,border:'2px solid rgba(255,255,255,0.3)',borderTopColor:'#fff',borderRadius:'50%',display:'inline-block' }}/> Running</>
                  : <><Play size={14}/> Run</>}
              </button>
            </div>

            {/* Code area */}
            <div style={{ display:'flex', minHeight:340 }}>
              {/* Line numbers */}
              <div style={{ padding:'16px 12px', background:'#0d1117', color:'var(--t3)', fontFamily:'Fira Code', fontSize:13,
                lineHeight:1.7, textAlign:'right', userSelect:'none', minWidth:48, borderRight:'1px solid var(--border)' }}>
                {Array.from({length:lineCount},(_,i)=> <div key={i}>{i+1}</div>)}
              </div>
              <textarea ref={textRef} value={code} onChange={e => setCode(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) { e.preventDefault(); run() }
                  if (e.key === 'Tab') { e.preventDefault(); const s=e.currentTarget.selectionStart; const v=code; setCode(v.slice(0,s)+'    '+v.slice(e.currentTarget.selectionEnd)); setTimeout(()=>{ if(textRef.current){textRef.current.selectionStart=textRef.current.selectionEnd=s+4} },0) }
                }}
                style={{ flex:1, padding:'16px', background:'#0d1117', border:'none', outline:'none', resize:'none',
                  fontFamily:'Fira Code', fontSize:13, color:'#e6edf3', lineHeight:1.7, minHeight:340 }}
                spellCheck={false}
              />
            </div>
          </div>

          {/* Output */}
          <div className="card" style={{ padding:0, overflow:'hidden' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, padding:'10px 16px',
              background:'var(--bg2)', borderBottom:'1px solid var(--border)' }}>
              <Terminal size={14} color="var(--green)" />
              <span style={{ fontSize:13, fontWeight:600, color:'var(--green)' }}>Output</span>
              <span style={{ fontSize:11, color:'var(--t3)', marginLeft:'auto' }}>Ctrl+Enter to run</span>
            </div>
            <pre style={{ padding:16, fontFamily:'Fira Code', fontSize:13, lineHeight:1.7, minHeight:100,
              color: output.includes('✅') ? '#e6edf3' : output ? '#f87171' : 'var(--t3)',
              background:'#0d1117', margin:0, whiteSpace:'pre-wrap' }}>
              {output || '// Output will appear here after you run the code...'}
            </pre>
          </div>
        </div>
      ) : (
        <div>
          <div style={{ marginBottom:20 }}>
            <h3 style={{ fontSize:18, fontWeight:700 }}>Coding Challenges</h3>
            <p style={{ color:'var(--t2)', fontSize:13, marginTop:4 }}>Solve problems and earn XP. {solvedIds.length}/{CHALLENGES.length} solved.</p>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            {CHALLENGES.map(ch => (
              <div key={ch.id} className="card" style={{ display:'flex', alignItems:'center', gap:16,
                opacity: solvedIds.includes(ch.id) ? 0.7 : 1 }}>
                <div style={{ width:44, height:44, borderRadius:12, background:'rgba(139,92,246,0.1)',
                  display:'flex', alignItems:'center', justifyContent:'center', fontSize:20, flexShrink:0 }}>
                  {solvedIds.includes(ch.id) ? '✅' : '💡'}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <span style={{ fontWeight:700 }}>{ch.title}</span>
                    <span className={`tag ${diffTag[ch.diff]}`}>{ch.diff}</span>
                    <span className="tag tag-p">+{ch.xp} XP</span>
                  </div>
                  <p style={{ fontSize:13, color:'var(--t2)' }}>{ch.desc}</p>
                </div>
                <button
                  className={`btn ${solvedIds.includes(ch.id) ? 'btn-g' : 'btn-p'}`}
                  onClick={() => { setTab('editor'); solveChallenge(ch.id, ch.xp) }}
                  style={{ flexShrink:0 }}>
                  {solvedIds.includes(ch.id) ? '✅ Solved' : 'Solve'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
