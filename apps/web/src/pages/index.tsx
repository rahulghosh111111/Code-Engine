import React, { useState } from 'react';
import Head from 'next/head';
import { Play, Save, Folder, FileCode2, ChevronDown, Terminal as TerminalIcon } from 'lucide-react';
import Editor from '@monaco-editor/react';

const defaultCode = `// Welcome to Code Engine!
// This is your cloud development environment.

function greet(user) {
  console.log("Hello, " + user + "!");
}

greet("Developer");

// Try running this code using the "Run Code" button above.
`;

export default function IDE() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState([{ type: 'system', text: 'System ready. Waiting for execution...' }]);
  const [isRunning, setIsRunning] = useState(false);

  const runCode = async () => {
    setIsRunning(true);
    setOutput([{ type: 'system', text: '$ node index.js' }]);
    
    try {
      const res = await fetch('http://localhost:4000/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language: 'javascript' })
      });
      
      const data = await res.json();
      
      const newOutput = [{ type: 'system', text: '$ node index.js' }];
      if (data.output) newOutput.push({ type: 'stdout', text: data.output });
      if (data.error) newOutput.push({ type: 'stderr', text: data.error });
      
      setOutput(newOutput);
    } catch (err) {
      setOutput([
        { type: 'system', text: '$ node index.js' },
        { type: 'stderr', text: 'Error connecting to execution server.' }
      ]);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen w-screen bg-[#1e1e1e] flex flex-col overflow-hidden font-sans text-[#cccccc]">
      <Head>
        <title>Code Engine IDE</title>
      </Head>
      
      {/* HEADER */}
      <div className="h-12 bg-[#333333] border-b border-[#3c3c3c] flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="ml-4 font-semibold text-white">Code Engine</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 bg-[#37373d] hover:bg-[#3c3c3c] rounded text-sm transition-colors">
            <Save size={16} /> Save
          </button>
          <button 
            onClick={runCode}
            disabled={isRunning}
            className={`flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors text-white ${isRunning ? 'bg-gray-600' : 'bg-green-600 hover:bg-green-700 shadow-lg'}`}>
            <Play size={16} /> {isRunning ? 'Running...' : 'Run Code'}
          </button>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* SIDEBAR */}
        <div className="w-64 bg-[#252526] border-r border-[#3c3c3c] h-full flex flex-col select-none">
          <div className="p-3 text-xs font-semibold uppercase tracking-wider text-gray-400">Explorer</div>
          <div className="px-2">
            <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-[#37373d] cursor-pointer rounded">
              <ChevronDown size={16} />
              <Folder size={16} className="text-blue-400" />
              <span className="text-sm">my-project</span>
            </div>
            <div className="pl-6">
              <div className="flex items-center gap-1.5 py-1 px-2 cursor-pointer rounded text-white bg-[#37373d]">
                <FileCode2 size={16} className="text-yellow-400" />
                <span className="text-sm">index.js</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* MAIN EDITOR & TERMINAL */}
        <div className="flex-1 flex flex-col h-full relative">
          <div className="h-10 bg-[#1e1e1e] flex items-center px-4 border-b border-[#3c3c3c]">
            <div className="flex items-center text-white border-b-2 border-[#007acc] h-full px-2 text-sm">index.js</div>
          </div>
          
          <div className="flex-1 relative">
            <Editor
              height="100%"
              defaultLanguage="javascript"
              value={code}
              onChange={(v) => setCode(v || '')}
              theme="vs-dark"
              options={{ minimap: { enabled: false }, fontSize: 14, fontFamily: "monospace", padding: { top: 16 } }}
            />
          </div>
          
          {/* TERMINAL */}
          <div className="h-64 bg-[#1e1e1e] border-t border-[#3c3c3c] flex flex-col">
            <div className="h-9 flex items-center px-4 gap-4 text-xs font-medium uppercase tracking-wider text-gray-400 border-b border-[#3c3c3c] shadow-md z-10">
              <span className="text-white border-b-2 border-[#007acc] py-2 flex items-center gap-1.5"><TerminalIcon size={14}/> Output</span>
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap">
              {output.map((line, i) => (
                <div key={i} className={line.type === 'stderr' ? 'text-red-400' : line.type === 'system' ? 'text-green-400' : 'text-gray-300'}>
                  {line.text}
                </div>
              ))}
              {!isRunning && <div className="text-green-400 mt-2">$ <span className="animate-pulse">_</span></div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}