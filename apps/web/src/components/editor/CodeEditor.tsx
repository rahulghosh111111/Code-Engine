import React from 'react';
import Editor from '@monaco-editor/react';

export default function CodeEditor() {
  const defaultCode = `// Welcome to Code Engine!
// This is your cloud development environment.

function greet(user) {
  console.log("Hello, " + user + "!");
}

greet("Developer");

// Try running this code using the "Run Code" button above.
`;

  return (
    <div className="flex-1 h-full flex flex-col">
      <div className="h-10 bg-ide-bg flex items-center px-4 border-b border-ide-border gap-4">
        <div className="flex items-center gap-2 text-white border-b-2 border-ide-accent h-full px-2 text-sm">
          index.js
        </div>
      </div>
      <div className="flex-1 relative">
        <Editor
          height="100%"
          defaultLanguage="javascript"
          defaultValue={defaultCode}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            fontFamily: "'Fira Code', 'JetBrains Mono', 'Consolas', monospace",
            fontLigatures: true,
            padding: { top: 16 },
            scrollBeyondLastLine: false,
            smoothScrolling: true,
            cursorBlinking: "smooth",
          }}
        />
      </div>
    </div>
  );
}