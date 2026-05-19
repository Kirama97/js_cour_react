import React, { useState, useEffect, useRef } from 'react';
import { Play, Trash2, Share2, Check } from 'lucide-react';
import { snippets } from '../../data/modules';
import Editor from '@monaco-editor/react';



export default function Playground() {
  const [code, setCode] = useState('');
  const [logs, setLogs] = useState([]);
  const consoleEndRef = useRef(null);
  const [isCopied, setIsCopied] = useState(false);
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedCode = params.get('code');
    const sharedId = params.get('id');
    
    if (sharedId) {
      fetch(`https://bytebin.lucko.me/${sharedId}`)
        .then(res => {
          if (!res.ok) throw new Error('Code introuvable');
          return res.text();
        })
        .then(decoded => {
          setCode(decoded);
          localStorage.setItem('playground-code', decoded);
          window.history.replaceState({}, document.title, window.location.pathname);
          setTimeout(() => {
            const el = document.getElementById('playground');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }, 500);
        })
        .catch(e => console.error("Erreur de récupération du code partagé", e));
    } else if (sharedCode) {
      try {
        const decoded = decodeURIComponent(atob(sharedCode));
        setCode(decoded);
        localStorage.setItem('playground-code', decoded);
        window.history.replaceState({}, document.title, window.location.pathname);
        setTimeout(() => {
          const el = document.getElementById('playground');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 500);
      } catch (e) {
        console.error("Erreur de décodage du code partagé", e);
      }
    } else {
      const savedCode = localStorage.getItem('playground-code');
      if (savedCode) {
        setCode(savedCode);
      }
    }

    const handleCodeLoaded = () => {
      setCode(localStorage.getItem('playground-code') || '');
    };

    window.addEventListener('playgroundCodeLoaded', handleCodeLoaded);
    return () => window.removeEventListener('playgroundCodeLoaded', handleCodeLoaded);
  }, []);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const handleEditorChange = (value) => {
    setCode(value || '');
    localStorage.setItem('playground-code', value || '');
  };

  const effacerCode = () => {
    setCode('');
    localStorage.removeItem('playground-code');
    effacerConsole();
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
    } catch (err) {
      console.error('Erreur via Bytebin, secours local activé :', err);
      try {
        const encoded = encodeURIComponent(btoa(encodeURIComponent(code)));
        const url = `${window.location.origin}${window.location.pathname}?code=${encoded}`;
        await navigator.clipboard.writeText(url);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (fallbackErr) {}
    } finally {
      setIsSharing(false);
    }
  };

  const effacerConsole = () => {
    setLogs([]);
  };

  const chargerSnippet = (nom) => {
    const snippetCode = snippets[nom];
    if (snippetCode) {
      setCode(snippetCode);
      localStorage.setItem('playground-code', snippetCode);
    }
  };

  const formatVal = (v) => {
    if (v === null) return 'null';
    if (v === undefined) return 'undefined';
    if (Array.isArray(v)) return JSON.stringify(v);
    if (typeof v === 'object') return JSON.stringify(v, null, 2);
    return String(v);
  };

  const executerCode = () => {
    setLogs([]);
    const newLogs = [];
    const origLog = console.log;
    const origError = console.error;

    console.log = (...args) => {
      newLogs.push({ type: 'log', msg: args.map(formatVal).join(' ') });
      origLog(...args);
    };
    console.error = (...args) => {
      newLogs.push({ type: 'error', msg: args.map(formatVal).join(' ') });
      origError(...args);
    };

    try {
      // eslint-disable-next-line no-eval
      eval(code);
      setTimeout(() => {
        setLogs([...newLogs]);
        console.log = origLog;
        console.error = origError;
      }, 50);
    } catch (e) {
      console.log = origLog;
      console.error = origError;
      newLogs.push({ type: 'error', msg: '❌ ' + e.message });
      setLogs([...newLogs]);
    }
  };

  return (
    <section id="playground" className="mb-16" aria-labelledby="playground-title">
      <h2 id="playground-title" className="text-2xl font-bold mb-6 flex items-center gap-3 text-slate-900 dark:text-white transition-colors">
        <span className="w-1 h-7 bg-[#F7DF1E] rounded-full inline-block" aria-hidden="true"></span>
        Playground — Testez votre code
      </h2>

      <div className="bg-white dark:bg-[#16213E] rounded-2xl border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg transition-colors">
        {/* Editor header */}
        <div className="bg-slate-50 dark:bg-[#0d1117] px-4 py-3 flex items-center justify-between border-b border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true"></span>
            <span className="w-3 h-3 rounded-full bg-yellow-400" aria-hidden="true"></span>
            <span className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true"></span>
            <span className="ml-3 text-xs text-slate-400 dark:text-gray-400 font-mono transition-colors">script.js</span>
            <span className="ml-2 text-[10px] text-slate-500 dark:text-gray-500 italic hidden sm:inline transition-colors">(Sauvegarde automatique)</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={handleShare}
              disabled={isSharing}
              className={`text-xs text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white px-3 py-1 rounded border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 transition-colors focus-visible:outline-none flex items-center gap-1 ${isSharing ? 'opacity-70 cursor-wait' : ''}`}
              title="Partager ce code"
            >
              {isCopied ? <Check className="w-3 h-3 text-green-500" /> : <Share2 className="w-3 h-3" />}
              <span className="hidden sm:inline">{isCopied ? "Copié !" : (isSharing ? "Génération..." : "Partager")}</span>
            </button>
            <button 
              onClick={effacerCode}
              className="text-xs text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white px-3 py-1 rounded border border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/30 transition-colors focus-visible:outline-none"
            >
              Effacer
            </button>
            <button 
              onClick={executerCode}
              className="text-xs bg-[#F7DF1E] text-[#1A1A2E] font-semibold px-4 py-1 rounded hover:bg-yellow-300 transition-colors focus-visible:outline-none flex items-center gap-1 shadow-sm"
            >
              <Play className="w-3 h-3" /> Exécuter
            </button>
          </div>
        </div>

        {/* Code editor */}
        <div className="h-[300px] w-full">
          <Editor
            height="100%"
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            keepCurrentModel={true}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              fontFamily: '"JetBrains Mono", monospace',
              scrollBeyondLastLine: false,
              wordWrap: 'on',
              padding: { top: 16 }
            }}
          />
        </div>

        {/* Console */}
        <div className="border-t border-slate-200 dark:border-white/10">
          <div className="bg-slate-100 dark:bg-[#0F3460] px-4 py-2 flex items-center justify-between transition-colors">
            <span className="text-xs text-slate-500 dark:text-gray-400 font-mono transition-colors">Console</span>
            <button 
              onClick={effacerConsole}
              className="text-xs text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 focus-visible:outline-none px-1 rounded transition-colors flex flex-row gap-1 items-center"
            >
              <Trash2 className="w-3 h-3"/> effacer
            </button>
          </div>
          <div className="p-4 bg-slate-50 dark:bg-[#0d1117] text-slate-700 dark:text-green-400 text-sm min-h-[100px] max-h-[250px] overflow-y-auto transition-colors font-mono" aria-live="polite">
            {logs.length === 0 ? (
              <span className="text-slate-400 dark:text-gray-600 transition-colors">// Les résultats de console.log() apparaîtront ici...</span>
            ) : (
              logs.map((l, i) => (
                <div key={i} className={`${l.type === 'error' ? 'text-red-400' : 'text-green-600 dark:text-green-400'} mb-1`}>
                  <span className="text-gray-600 select-none mr-2">›</span>{l.msg}
                </div>
              ))
            )}
            <div ref={consoleEndRef} />
          </div>
        </div>
      </div>

      {/* Snippets rapides */}
      <div className="mt-4">
        <p className="text-xs text-slate-500 dark:text-gray-500 mb-3 transition-colors">Exemples rapides :</p>
        <div className="flex flex-wrap gap-2">
          {Object.keys(snippets).map(key => (
            <button 
              key={key}
              onClick={() => chargerSnippet(key)}
              className="text-xs bg-white dark:bg-[#16213E] border border-slate-200 dark:border-white/10 hover:border-[#F7DF1E]/40 px-3 py-1.5 rounded-lg transition-colors focus-visible:outline-none text-slate-700 dark:text-white shadow-sm capitalize"
            >
              {key}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
