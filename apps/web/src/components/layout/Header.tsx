import React from 'react';
import { Play, Settings, Save } from 'lucide-react';

export default function Header() {
  return (
    <div className="h-12 bg-ide-header border-b border-ide-border flex items-center justify-between px-4 text-ide-text">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="ml-4 font-semibold text-white">Code Engine</span>
      </div>
      <div className="flex items-center gap-4">
        <button className="flex items-center gap-2 px-3 py-1.5 bg-ide-active hover:bg-ide-border rounded text-sm transition-colors">
          <Save size={16} /> Save
        </button>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white rounded text-sm transition-colors shadow-lg">
          <Play size={16} /> Run Code
        </button>
        <Settings size={20} className="text-gray-400 cursor-pointer hover:text-white transition-colors" />
      </div>
    </div>
  );
}