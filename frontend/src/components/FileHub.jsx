import React, { useState } from 'react';
import { FileText, Upload, Download, Trash2, Search, Filter, Lock } from 'lucide-react';

export default function FileHub({ role, tenant }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [files, setFiles] = useState([
    { id: '1', name: 'Master_Service_Agreement_v2.pdf', size: '2.4 MB', category: 'Contracts', date: '2026-10-12', tenant: 'Acme Corp' },
    { id: '2', name: 'Brand_Identity_Guidelines.pdf', size: '18.1 MB', category: 'Assets', date: '2026-10-15', tenant: 'Acme Corp' },
    { id: '3', name: 'Database_Migration_Schema.sql', size: '420 KB', category: 'Technical', date: '2026-11-01', tenant: 'Acme Corp' },
  ]);

  const categories = ['All', 'Contracts', 'Assets', 'Technical'];

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || file.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id) => {
    if (role === 'CLIENT_VIEWER') return;
    setFiles(files.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Header & Upload Action */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100">Secure File Repository</h3>
          <p className="text-sm text-slate-400">Isolated document storage for <span className="text-amber-400">{tenant}</span></p>
        </div>
        {role !== 'CLIENT_VIEWER' ? (
          <button className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20">
            <Upload className="w-4 h-4" />
            <span>Upload Document</span>
          </button>
        ) : (
          <div className="flex items-center space-x-2 bg-[#181b20] text-amber-400 text-xs px-3.5 py-2 rounded-xl border border-[#2a2f38]">
            <Lock className="w-3.5 h-3.5" />
            <span>Upload Restricted (Viewer Mode)</span>
          </div>
        )}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-[#181b20] border border-[#2a2f38] p-4 rounded-2xl">
        <div className="flex items-center space-x-2 bg-[#121417] px-3.5 py-2 rounded-xl border border-[#2a2f38] w-full md:w-80 focus-within:border-amber-500 transition">
          <Search className="w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search documents..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent text-sm text-slate-200 focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto">
          <Filter className="w-4 h-4 text-slate-400 hidden sm:block" />
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition ${selectedCategory === cat ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/10' : 'bg-[#121417] text-slate-400 border border-[#2a2f38] hover:text-slate-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* File List */}
      <div className="bg-[#181b20] border border-[#2a2f38] rounded-2xl overflow-hidden shadow-xl">
        <div className="divide-y divide-[#2a2f38]">
          {filteredFiles.length > 0 ? (
            filteredFiles.map((file) => (
              <div key={file.id} className="p-4 flex flex-wrap items-center justify-between gap-4 hover:bg-[#1e232b] transition">
                <div className="flex items-center space-x-3.5">
                  <div className="bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20 text-amber-400">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-100 text-sm">{file.name}</h4>
                    <div className="flex items-center space-x-3 text-xs text-slate-400 mt-0.5">
                      <span>{file.size}</span>
                      <span>•</span>
                      <span className="text-amber-400">{file.category}</span>
                      <span>•</span>
                      <span>{file.date}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button className="p-2 text-slate-400 hover:text-amber-400 transition rounded-xl hover:bg-[#121417] border border-transparent hover:border-[#2a2f38]">
                    <Download className="w-4 h-4" />
                  </button>
                  {role !== 'CLIENT_VIEWER' && (
                    <button 
                      onClick={() => handleDelete(file.id)}
                      className="p-2 text-slate-400 hover:text-red-400 transition rounded-xl hover:bg-[#121417] border border-transparent hover:border-[#2a2f38]"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-slate-400 text-sm">
              No documents found matching your criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}