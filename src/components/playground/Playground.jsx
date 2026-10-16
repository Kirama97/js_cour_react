import { useState, useEffect, useRef } from 'react';
import { Play, Trash2, Share2, Check, Terminal } from 'lucide-react';
import { snippets } from '../../data/modules';
import Editor from '@monaco-editor/react';

function getInitialPlaygroundCode() {
  try {
    const params = new URLSearchParams(window.location.search);
    const sharedCode = params.get('code');
    if (sharedCode) {
      return decodeURIComponent(atob(sharedCode));
    }
    const saved = localStorage.getItem('playground-code');
    if (saved) return saved;
  } catch (err) {
    void err;
  }
  return `// Playground JavaScript
// Écrivez votre code et cliquez sur "Exécuter".

const message = "Bienvenue dans le Playground !";
console.log(message);
`;
}

function executeCodeSafely(code) {
  const capturedLogs = [];
  const origLog = console.log;
  const origError = console.error;
  const origWarn = console.warn;

  const formatArg = (v) => {
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (typeof v === 'symbol' || typeof v === 'function') return v.toString();
    if (v instanceof Error) return v.stack || v.message;
    if (Array.isArray(v)) {
      try {
        return JSON.stringify(v);
      } catch {
        return '[Array]';
      }
    }
    if (typeof v === 'object') {
      try {
        return JSON.stringify(v, null, 2);
      } catch {
        return '[Object]';
      }
    }
    return String(v);
  };

  console.log = (...args) => {
    capturedLogs.push({ type: 'log', msg: args.map(formatArg).join(' ') });
    origLog(...args);
  };
  console.error = (...args) => {
    capturedLogs.push({ type: 'error', msg: args.map(formatArg).join(' ') });
    origError(...args);
  };
  console.warn = (...args) => {
    capturedLogs.push({ type: 'warn', msg: args.map(formatArg).join(' ') });
    origWarn(...args);
  };

  try {
    const runner = new Function(code);
    runner();
  } catch (e) {
    capturedLogs.push({ type: 'error', msg: '❌ ' + (e?.message || String(e)) });
  } finally {
    console.log = origLog;
    console.error = origError;
    console.warn = origWarn;
  }

  return capturedLogs;
}

export default function Playground() {
  const [code, setCode] = useState(getInitialPlaygroundCode);
  const [logs, setLogs] = useState([]);
  const consoleBoxRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedId = params.get('id');
    
    if (sharedId) {
      fetch(`https://bytebin.lucko.me/${sharedId}`)
        .then(res => {
          if (!res.ok) throw new Error('Code introuvable');
          return res.text();
        })
        .then(decoded => {
          setCode(decoded);
          try {
            localStorage.setItem('playground-code', decoded);
            window.history.replaceState({}, document.title, window.location.pathname);
          } catch (err) {
            void err;
          }
        })
        .catch(e => console.error("Erreur de récupération du code partagé", e));
    }

    const handleCodeLoaded = () => {
      try {
        setCode(localStorage.getItem('playground-code') || '');
      } catch (err) {
        void err;
      }
    };

    window.addEventListener('playgroundCodeLoaded', handleCodeLoaded);
    return () => window.removeEventListener('playgroundCodeLoaded', handleCodeLoaded);
  }, []);

  useEffect(() => {
    if (consoleBoxRef.current && logs.length > 0) {
      consoleBoxRef.current.scrollTop = consoleBoxRef.current.scrollHeight;
    }
  }, [logs]);

  const handleEditorChange = (value) => {
    const val = value || '';
    setCode(val);
    try {
      localStorage.setItem('playground-code', val);
    } catch (err) {
      void err;
    }
  };

  const effacerCode = () => {
    setCode('');
    try {
      localStorage.removeItem('playground-code');
    } catch (err) {
      void err;
    }
    setLogs([]);
  };

  const handleShare = async () => {
    if (isSharing) return;
    setIsSharing(true);
    try {
      const response = await fetch('https://bytebin.lucko.me/post', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
          'Accept': 'application/json'
        },
        body: code
      });
      
      if (!response.ok) throw new Error('Failed to create paste');
      const data = await response.json();
      
      const url = `${window.location.origin}${window.location.pathname}?id=${data.key}`;
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch {
      try {
        const encoded = encodeURIComponent(btoa(encodeURIComponent(code)));
        const url = `${window.location.origin}${window.location.pathname}?code=${encoded}`;
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        void err;
      }
    } finally {
      setIsSharing(false);
    }
  };

  const chargerSnippet = (nom) => {
    const snippetCode = snippets[nom];
    if (snippetCode) {
      setCode(snippetCode);
      try {
        localStorage.setItem('playground-code', snippetCode);
      } catch (err) {
        void err;
      }
    }
  };

  const executerCode = () => {
    const newLogs = executeCodeSafely(code);
    setLogs(newLogs);
  };

  return (
    <section id="playground" className="mb-16 scroll-mt-20" aria-labelledby="playground-title">
      <h2 id="playground-title" className="text-xl sm:text-2xl font-bold mb-6 flex items-center gap-2.5 text-slate-900 dark:text-white font-display transition-colors tracking-tight">
        <span className="w-1.5 h-6 bg-[#F7DF1E] rounded-full inline-block" aria-hidden="true"></span>
        Playground libre
      </h2>

      <div className="bg-[#0d1117] rounded-2xl border border-slate-300 dark:border-white/15 overflow-hidden shadow-lg">
        {/* Editor header */}
        <div className="bg-[#161b22] px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2 border-b border-white/10 text-slate-400">
          <div className="flex items-center gap-2 min-w-0">
            <span className="w-2.5 h-2.5 shrink-0 rounded-full bg-[#F7DF1E]"></span>
            <span className="text-xs font-mono text-[#F7DF1E] font-medium truncate">script.js</span>
            <span className="text-[10px] text-slate-400 hidden sm:inline">(sauvegarde auto)</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors flex items-center gap-1.5"
              title="Partager ce code"
            >
              {isCopied ? <Check className="w-3 h-3 text-emerald-400" /> : <Share2 className="w-3 h-3 text-slate-300" />}
              <span className="hidden sm:inline">{isCopied ? "Lien copié" : "Partager"}</span>
            </button>

            <button 
              onClick={effacerCode}
              aria-label="Effacer le code"
              title="Effacer le code"
              className="text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3 h-3 sm:hidden" />
              <span className="hidden sm:inline">Effacer</span>
            </button>

            <button 
              onClick={executerCode}
              className="text-xs bg-[#F7DF1E] hover:bg-yellow-300 text-[#1A1A2E] font-bold px-3 sm:px-4 py-1.5 rounded-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-1.5 shadow-[0_0_10px_rgba(247,223,30,0.3)]"
            >
              <Play className="w-3 h-3 fill-current" /> Exécuter
            </button>
          </div>
        </div>

        {/* Code editor */}
        <div className="h-[240px] sm:h-[290px] w-full">
          <Editor
            height="100%"
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: typeof window !== 'undefined' && window.innerWidth < 640 ? 12 : 13,
              lineNumbersMinChars: typeof window !== 'undefined' && window.innerWidth < 640 ? 2 : 4,
              fontFamily: '"JetBrains Mono", Menlo, monospace',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              padding: { top: 12, bottom: 12 }
            }}
          />
        </div>

        {/* Console */}
        <div className="border-t border-white/10 bg-[#090d16] font-mono text-xs">
          <div className="bg-[#161b22]/70 px-4 py-1.5 flex items-center justify-between text-slate-400 border-b border-white/5">
            <span className="flex items-center gap-1.5 text-[11px] text-slate-300">
              <Terminal className="w-3 h-3 text-[#F7DF1E]" /> Console
            </span>
            <button 
              onClick={() => setLogs([])}
              className="text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-2.5 h-2.5"/> effacer
            </button>
          </div>

          <div 
            ref={consoleBoxRef}
            className="p-3 text-slate-200 min-h-[90px] max-h-[180px] overflow-y-auto overflow-x-hidden space-y-1"
          >
            {logs.length === 0 ? (
              <span className="text-slate-500 text-xs italic">// Cliquez sur « Exécuter » pour voir la sortie console.log()...</span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={`whitespace-pre-wrap break-words leading-relaxed ${l.type === 'error' ? 'text-rose-400 font-semibold' : 'text-emerald-400'}`}>
                  <span className="text-[#F7DF1E] select-none mr-2">›</span>{l.msg}
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Snippets rapides */}
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 dark:text-gray-400 mr-1 font-medium">Exemples rapides :</span>
        {Object.keys(snippets).map(key => (
          <button 
            key={key}
            onClick={() => chargerSnippet(key)}
            className="text-xs bg-white dark:bg-[#16213E] border border-slate-200 dark:border-white/10 hover:border-yellow-400 dark:hover:border-[#F7DF1E]/50 px-3 py-1 rounded-lg text-slate-700 dark:text-gray-200 hover:text-yellow-600 dark:hover:text-[#F7DF1E] shadow-2xs transition-all capitalize font-medium"
          >
            {key}
          </button>
        ))}
      </div>
    </section>
  );
}
