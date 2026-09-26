import React, { createContext, useContext, useState, ReactNode, useEffect, useRef } from 'react';

export type FileNode = {
  id: string;
  name: string;
  content: string;
  language: string;
};

export type TerminalOutput = {
  type: 'stdout' | 'stderr' | 'system';
  text: string;
};

interface IDEContextType {
  files: FileNode[];
  activeFileId: string | null;
  openFileIds: string[];
  terminalOutput: TerminalOutput[];
  isRunning: boolean;
  setActiveFileId: (id: string | null) => void;
  openFile: (id: string) => void;
  closeFile: (id: string) => void;
  updateFileContent: (id: string, content: string) => void;
  addFile: (name: string, content?: string) => void;
  deleteFile: (id: string) => void;
  addTerminalOutput: (output: TerminalOutput) => void;
  clearTerminal: () => void;
  setIsRunning: (running: boolean) => void;
}

const defaultFiles: FileNode[] = [
  {
    id: 'readme',
    name: 'README.md',
    language: 'markdown',
    content: '# Code Engine\n\nA monorepo for a browser-based IDE, backend API, compilation engine, workers, and language runners.'
  },
  {
    id: 'index',
    name: 'index.js',
    language: 'javascript',
    content: '// Welcome to Code Engine!\n\nfunction greet(user) {\n  console.log("Hello, " + user + "!");\n}\n\ngreet("Developer");\n'
  }
];

const IDEContext = createContext<IDEContextType | undefined>(undefined);

export function IDEProvider({ children }: { children: ReactNode }) {
  const [files, setFiles] = useState<FileNode[]>(defaultFiles);
  const [activeFileId, setActiveFileId] = useState<string | null>('readme');
  const [openFileIds, setOpenFileIds] = useState<string[]>(['readme', 'index']);
  const [terminalOutput, setTerminalOutput] = useState<TerminalOutput[]>([
    { type: 'system', text: 'System ready. Waiting for execution...' }
  ]);
  const [isRunning, setIsRunning] = useState(false);

  const openFile = (id: string) => {
    if (!openFileIds.includes(id)) {
      setOpenFileIds([...openFileIds, id]);
    }
    setActiveFileId(id);
  };

  const closeFile = (id: string) => {
    const newOpenFiles = openFileIds.filter(fid => fid !== id);
    setOpenFileIds(newOpenFiles);
    if (activeFileId === id) {
      setActiveFileId(newOpenFiles.length > 0 ? newOpenFiles[newOpenFiles.length - 1] : null);
    }
  };

  const updateFileContent = (id: string, content: string) => {
    setFiles(files.map(f => f.id === id ? { ...f, content } : f));
  };

  const addFile = (name: string, content: string = '') => {
    let language = 'plaintext';
    if (name.endsWith('.js') || name.endsWith('.jsx')) language = 'javascript';
    else if (name.endsWith('.ts') || name.endsWith('.tsx')) language = 'typescript';
    else if (name.endsWith('.md')) language = 'markdown';
    else if (name.endsWith('.html')) language = 'html';
    else if (name.endsWith('.css')) language = 'css';
    else if (name.endsWith('.json')) language = 'json';

    const newFile: FileNode = {
      id: Date.now().toString(),
      name,
      content,
      language
    };
    
    setFiles([...files, newFile]);
    setOpenFileIds([...openFileIds, newFile.id]);
    setActiveFileId(newFile.id);
  };

  const deleteFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
    closeFile(id);
  };

  const addTerminalOutput = (output: TerminalOutput) => {
    setTerminalOutput(prev => [...prev, output]);
  };

  const clearTerminal = () => {
    setTerminalOutput([]);
  };

  return (
    <IDEContext.Provider value={{
      files,
      activeFileId,
      openFileIds,
      terminalOutput,
      isRunning,
      setActiveFileId,
      openFile,
      closeFile,
      updateFileContent,
      addFile,
      deleteFile,
      addTerminalOutput,
      clearTerminal,
      setIsRunning
    }}>
      {children}
    </IDEContext.Provider>
  );
}

export function useIDE() {
  const context = useContext(IDEContext);
  if (context === undefined) {
    throw new Error('useIDE must be used within an IDEProvider');
  }
  return context;
}
