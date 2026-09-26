import React from 'react';
import { Folder, FileJson, FileCode2, FileText, ChevronRight, ChevronDown } from 'lucide-react';

export default function FileExplorer() {
  return (
    <div className="w-64 bg-ide-sidebar border-r border-ide-border h-full flex flex-col text-ide-text select-none">
      <div className="p-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
        Explorer
      </div>
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="px-2">
          
          <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-ide-active cursor-pointer rounded">
            <ChevronDown size={16} />
            <Folder size={16} className="text-blue-400" />
            <span className="text-sm">my-project</span>
          </div>
          
          <div className="pl-6">
            <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-ide-active cursor-pointer rounded text-white bg-ide-active">
              <FileCode2 size={16} className="text-yellow-400" />
              <span className="text-sm">index.js</span>
            </div>
            <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-ide-active cursor-pointer rounded">
              <FileJson size={16} className="text-green-400" />
              <span className="text-sm">package.json</span>
            </div>
            <div className="flex items-center gap-1.5 py-1 px-2 hover:bg-ide-active cursor-pointer rounded">
              <FileText size={16} className="text-gray-400" />
              <span className="text-sm">README.md</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}