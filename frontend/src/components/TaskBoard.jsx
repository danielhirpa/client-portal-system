import React, { useState } from 'react';
import { Plus, User } from 'lucide-react';

export default function TaskBoard({ role }) {
  const [tasks, setTasks] = useState([
    { id: '1', title: 'Setup PostgreSQL Schemas', status: 'COMPLETED', priority: 'HIGH', assignee: 'Daniel' },
    { id: '2', title: 'Configure Multi-Tenant Middleware', status: 'IN_PROGRESS', priority: 'HIGH', assignee: 'Daniel' },
    { id: '3', title: 'Client Onboarding Verification', status: 'TODO', priority: 'MEDIUM', assignee: 'Acme Lead' },
  ]);

  const moveTask = (id, newStatus) => {
    if (role === 'CLIENT_VIEWER') return;
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const statusColumns = [
    { key: 'TODO', label: 'To Do', accent: 'border-slate-700 bg-[#181b20]' },
    { key: 'IN_PROGRESS', label: 'In Progress', accent: 'border-amber-500/60 bg-[#181b20]' },
    { key: 'COMPLETED', label: 'Completed', accent: 'border-emerald-600/60 bg-[#181b20]' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold text-slate-100">Project Tasks & Deliverables</h3>
          <p className="text-sm text-slate-400">Manage task workflow across project milestones</p>
        </div>
        {role !== 'CLIENT_VIEWER' && (
          <button className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-600 text-slate-950 text-sm font-semibold px-4 py-2.5 rounded-xl transition shadow-lg shadow-amber-500/20">
            <Plus className="w-4 h-4" />
            <span>Create Task</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statusColumns.map((col) => (
          <div key={col.key} className={`border ${col.accent} rounded-2xl p-4 min-h-[420px] shadow-xl`}>
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#2a2f38]">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{col.label}</h4>
              <span className="bg-[#121417] text-slate-300 text-xs px-2.5 py-0.5 rounded-full border border-[#2a2f38] font-mono">
                {tasks.filter(t => t.status === col.key).length}
              </span>
            </div>

            <div className="space-y-3">
              {tasks.filter(t => t.status === col.key).map((task) => (
                <div key={task.id} className="bg-[#121417] border border-[#2a2f38] hover:border-slate-500 p-4 rounded-xl space-y-3 transition duration-200 shadow-md">
                  <h5 className="font-semibold text-slate-100 text-sm">{task.title}</h5>
                  <div className="flex items-center justify-between text-xs pt-1">
                    <span className="flex items-center gap-1.5 bg-[#181b20] text-slate-300 px-2.5 py-1 rounded-md border border-[#2a2f38]">
                      <User className="w-3 h-3 text-amber-400" />
                      {task.assignee}
                    </span>
                    <span className={`px-2 py-0.5 rounded font-bold ${task.priority === 'HIGH' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' : 'text-slate-400 bg-[#181b20]'}`}>
                      {task.priority}
                    </span>
                  </div>
                  {role !== 'CLIENT_VIEWER' && col.key !== 'COMPLETED' && (
                    <button 
                      onClick={() => moveTask(task.id, col.key === 'TODO' ? 'IN_PROGRESS' : 'COMPLETED')}
                      className="w-full text-xs bg-[#181b20] hover:bg-amber-500 hover:text-slate-950 text-slate-300 py-2 rounded-lg border border-[#2a2f38] transition font-medium"
                    >
                      Advance Status →
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}