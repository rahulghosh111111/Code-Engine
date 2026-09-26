import React, { useState } from 'react';
import Head from 'next/head';
import { Play, Save, Settings, PlayCircle, Blocks, Search, Files, ChevronDown, ChevronRight, FileCode2, Terminal as TerminalIcon, X, Plus, User, FileText } from 'lucide-react';
import { useIDE } from '../store/IDEContext';
import Editor from '@monaco-editor/react';

export default function IDE() {
  const { files, activeFileId, openFileIds, terminalOutput, isRunning, setActiveFileId, openFile, closeFile, updateFileContent, addFile, deleteFile, addTerminalOutput, clearTerminal, setIsRunning } = useIDE();
  const [sidebarActive, setSidebarActive] = useState('explorer');
  const [isAddingFile, setIsAddingFile] = useState(false);
  const [newFileName, setNewFileName] = useState('');

  const activeFile = files.find(f => f.id === activeFileId);
  const openFiles = openFileIds.map(id => files.find(f => f.id === id)).filter(Boolean) as typeof files;

  const runCode = async () => {
    if (!activeFile) return;
    setIsRunning(true);
    addTerminalOutput({ type: 'system', text: `$ executing ${activeFile.name}...` });
    
    try {
      const res = await fetch('http://localhost:4000/execute', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: activeFile.content, language: activeFile.language })
      });
      
      const data = await res.json();
      
      if (data.output) addTerminalOutput({ type: 'stdout', text: data.output });
      if (data.error) addTerminalOutput({ type: 'stderr', text: data.error });
      
    } catch (err) {
      addTerminalOutput({ type: 'stderr', text: 'Error connecting to execution server.' });
    } finally {
      setIsRunning(false);
    }
  };

  const handleAddFile = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newFileName.trim()) {
      addFile(newFileName.trim());
      setNewFileName('');
      setIsAddingFile(false);
    } else if (e.key === 'Escape') {
      setNewFileName('');
      setIsAddingFile(false);
    }
  };

  const getFileIcon = (name: string) => {
    if (name.endsWith('.md')) return <FileText size={16} className="text-blue-400" />;
    if (name.endsWith('.js') || name.endsWith('.ts') || name.endsWith('.tsx') || name.endsWith('.jsx')) return <FileCode2 size={16} className="text-yellow-400" />;
    return <FileCode2 size={16} className="text-gray-400" />;
  };

  return (
    <div className="h-screen w-screen bg-[#181818] flex flex-col overflow-hidden font-sans text-[#cccccc]">
      <Head>
        <title>code-engine - Antigravity IDE - {activeFile?.name || 'No file'}</title>
      </Head>
      
      {/* MENU BAR (Fake) */}
      <div className="h-8 bg-[#181818] border-b border-[#2b2b2b] flex items-center justify-between px-3 select-none text-xs">
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
            <span className="w-3 h-3 rounded-full bg-[#27c93f]"></span>
          </div>
          <div className="flex gap-4">
            <span className="cursor-pointer hover:text-white">File</span>
            <span className="cursor-pointer hover:text-white">Edit</span>
            <span className="cursor-pointer hover:text-white">Selection</span>
            <span className="cursor-pointer hover:text-white">View</span>
            <span className="cursor-pointer hover:text-white">Go</span>
            <span className="cursor-pointer hover:text-white">Run</span>
            <span className="cursor-pointer hover:text-white">Terminal</span>
            <span className="cursor-pointer hover:text-white">Help</span>
          </div>
        </div>
        <div className="text-[#858585]">code-engine - Antigravity IDE - {activeFile?.name}</div>
        <div className="flex items-center gap-4">
           {/* Top right icons */}
           <div className="flex items-center gap-2 text-[#858585]">
             <User size={14} className="hover:text-white cursor-pointer" />
             <Settings size={14} className="hover:text-white cursor-pointer" />
           </div>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR (Activity Bar) */}
        <div className="w-12 bg-[#181818] border-r border-[#2b2b2b] h-full flex flex-col items-center py-2 gap-4">
           <div onClick={() => setSidebarActive('explorer')} className={`cursor-pointer ${sidebarActive === 'explorer' ? 'text-white border-l-2 border-white pl-[-2px]' : 'text-[#858585] hover:text-white'}`}>
             <Files size={24} strokeWidth={1.5} />
           </div>
           <div onClick={() => setSidebarActive('search')} className={`cursor-pointer ${sidebarActive === 'search' ? 'text-white border-l-2 border-white pl-[-2px]' : 'text-[#858585] hover:text-white'}`}>
             <Search size={24} strokeWidth={1.5} />
           </div>
           <div onClick={() => setSidebarActive('extensions')} className={`cursor-pointer ${sidebarActive === 'extensions' ? 'text-white border-l-2 border-white pl-[-2px]' : 'text-[#858585] hover:text-white'}`}>
             <Blocks size={24} strokeWidth={1.5} />
           </div>
        </div>

        {/* PRIMARY SIDEBAR (Explorer) */}
        {sidebarActive === 'explorer' && (
          <div className="w-64 bg-[#181818] border-r border-[#2b2b2b] h-full flex flex-col select-none">
            <div className="h-8 flex items-center justify-between px-4 text-[11px] font-semibold uppercase tracking-wider text-[#cccccc]">
              <span>Explorer</span>
              <div className="flex items-center gap-2">
                <Plus size={14} className="cursor-pointer hover:text-white" onClick={() => setIsAddingFile(true)} title="New File" />
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 py-1 px-1 hover:bg-[#2a2d2e] cursor-pointer text-sm font-bold">
              <ChevronDown size={16} />
              <span>CODE-ENGINE</span>
            </div>
            
            <div className="flex flex-col mt-1">
              {isAddingFile && (
                <div className="flex items-center gap-1.5 py-1 pl-6 pr-2">
                  <FileCode2 size={16} className="text-gray-400" />
                  <input 
                    autoFocus
                    type="text" 
                    value={newFileName}
                    onChange={(e) => setNewFileName(e.target.value)}
                    onKeyDown={handleAddFile}
                    onBlur={() => setIsAddingFile(false)}
                    className="bg-[#3c3c3c] text-white text-sm w-full outline-none border border-[#007acc] px-1"
                  />
                </div>
              )}
              {files.map(file => (
                <div 
                  key={file.id}
                  onClick={() => openFile(file.id)}
                  className={`group flex items-center justify-between py-1 pl-6 pr-2 cursor-pointer text-sm ${activeFileId === file.id ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
                >
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    {getFileIcon(file.name)}
                    <span className="truncate">{file.name}</span>
                  </div>
                  <X 
                    size={14} 
                    className="opacity-0 group-hover:opacity-100 hover:text-red-400" 
                    onClick={(e) => { e.stopPropagation(); deleteFile(file.id); }} 
                    title="Delete File"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* MAIN EDITOR & TERMINAL */}
        <div className="flex-1 flex flex-col h-full min-w-0">
          {/* EDITOR TABS */}
          <div className="h-9 bg-[#181818] flex items-end overflow-x-auto no-scrollbar">
            {openFiles.map(file => (
              <div 
                key={file.id} 
                onClick={() => setActiveFileId(file.id)}
                className={`group flex items-center h-full px-3 gap-2 border-r border-[#2b2b2b] cursor-pointer min-w-[120px] max-w-[200px] ${activeFileId === file.id ? 'bg-[#1e1e1e] text-white border-t-2 border-t-[#007acc]' : 'bg-[#181818] text-[#858585] hover:bg-[#1e1e1e]'}`}
              >
                {getFileIcon(file.name)}
                <span className="text-sm truncate flex-1">{file.name}</span>
                <div onClick={(e) => { e.stopPropagation(); closeFile(file.id); }} className={`p-0.5 rounded hover:bg-[#333333] ${activeFileId === file.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                  <X size={14} />
                </div>
              </div>
            ))}
          </div>
          
          {/* EDITOR AREA */}
          <div className="flex-1 relative bg-[#1e1e1e]">
            {/* Run Code Button overlay */}
            {activeFile && (
              <div className="absolute top-2 right-4 z-10 flex gap-2">
                <button 
                  onClick={runCode}
                  disabled={isRunning}
                  className="flex items-center justify-center p-1.5 hover:bg-[#333333] rounded text-[#cccccc] hover:text-white transition-colors"
                  title="Run Code"
                >
                  <Play size={16} />
                </button>
              </div>
            )}

            {activeFile ? (
              <Editor
                height="100%"
                language={activeFile.language}
                value={activeFile.content}
                onChange={(val) => updateFileContent(activeFile.id, val || '')}
                theme="vs-dark"
                options={{ 
                  minimap: { enabled: false }, 
                  fontSize: 14, 
                  fontFamily: "monospace", 
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on'
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#858585]">
                Select a file to start editing
              </div>
            )}
          </div>
          
          {/* BOTTOM PANEL */}
          <div className="h-64 bg-[#1e1e1e] border-t border-[#2b2b2b] flex flex-col shrink-0">
            <div className="h-9 flex items-center px-4 gap-6 text-[11px] font-medium uppercase tracking-wider text-[#cccccc] shadow-sm z-10">
              <span className="cursor-pointer hover:text-white">Problems <span className="ml-1 bg-blue-600 text-white rounded-full px-1.5 py-0.5 text-[9px]">0</span></span>
              <span className="cursor-pointer hover:text-white">Output</span>
              <span className="cursor-pointer hover:text-white">Debug Console</span>
              <span className="text-white border-b border-[#007acc] py-2 flex items-center gap-1.5">Terminal</span>
              <span className="cursor-pointer hover:text-white">Ports</span>
            </div>
            <div className="flex-1 p-4 font-mono text-sm overflow-y-auto whitespace-pre-wrap bg-[#1e1e1e]">
              <div className="text-gray-400 mb-2">We detected TypeScript in your project and created a tsconfig.json file for you.</div>
              {terminalOutput.map((line, i) => (
                <div key={i} className={line.type === 'stderr' ? 'text-red-400' : line.type === 'system' ? 'text-green-400' : 'text-gray-300'}>
                  {line.text}
                </div>
              ))}
              {!isRunning && <div className="text-white mt-2 flex items-center"><span className="text-green-500 mr-2">PS C:\Users\rg156\Downloads\code-engine&gt;</span> <span className="w-2 h-4 bg-gray-400 animate-pulse inline-block"></span></div>}
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR (Antigravity Agent) */}
        <div className="w-80 bg-[#1e1e1e] border-l border-[#2b2b2b] h-full flex flex-col">
          <div className="h-8 flex items-center justify-between px-3 text-xs text-[#cccccc] border-b border-[#2b2b2b]">
            <span>Agent</span>
            <div className="flex gap-2">
              <Plus size={14} className="cursor-pointer hover:text-white" />
              <Settings size={14} className="cursor-pointer hover:text-white" />
            </div>
          </div>
          
          <div className="flex-1 flex flex-col p-4">
            <div className="flex-1 overflow-y-auto">
              <div className="text-xl font-semibold mb-4 text-white">code-engine</div>
            </div>
            
            <div className="mt-4 border border-[#3c3c3c] rounded bg-[#252526] p-2 flex flex-col">
              <textarea 
                className="w-full bg-transparent border-none outline-none resize-none text-sm text-[#cccccc] mb-2" 
                placeholder="Ask anything, @ to mention, / for actions"
                rows={3}
              ></textarea>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-[#858585] cursor-pointer hover:text-[#cccccc]">
                  <Plus size={12} /> Gemini 3.1 Pro High <ChevronDown size={12} />
                </div>
                <button className="text-[#858585] hover:text-white">
                  <PlayCircle size={16} />
                </button>
              </div>
            </div>
            <div className="text-center text-[10px] text-[#858585] mt-2">
              AI may make mistakes. Double-check all generated code.
            </div>
          </div>
        </div>
      </div>
      
      {/* STATUS BAR */}
      <div className="h-6 bg-[#007acc] text-white flex items-center justify-between px-3 text-xs select-none">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer"><span className="rotate-45 block">⮂</span> main*</span>
          <span className="flex items-center gap-1 hover:bg-white/20 px-1 rounded cursor-pointer">⊗ 0 ⚠ 3</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hover:bg-white/20 px-1 rounded cursor-pointer">Rahul Ghosh (now)</span>
          <span className="hover:bg-white/20 px-1 rounded cursor-pointer">Ln 27, Col 1</span>
          <span className="hover:bg-white/20 px-1 rounded cursor-pointer">Spaces: 4</span>
          <span className="hover:bg-white/20 px-1 rounded cursor-pointer">UTF-8</span>
          <span className="hover:bg-white/20 px-1 rounded cursor-pointer">&#123;&#125; Markdown</span>
          <span className="hover:bg-white/20 px-1 rounded cursor-pointer">Antigravity - Settings</span>
        </div>
      </div>
    </div>
  );
}