import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import TaskBoard from './components/TaskBoard';
import FileHub from './components/FileHub';
import OnboardingChecklist from './components/OnboardingChecklist';
import { apiClient } from './services/api';
import { LayoutDashboard, CheckSquare, FileText, CheckCircle2, Database, ArrowUpRight, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentTenant, setTenant] = useState('Acme Corp');
  const [currentRole, setRole] = useState('AGENCY_ADMIN');
  const [activeTab, setActiveTab] = useState('overview');
  const [backendStatus, setBackendStatus] = useState('Connecting...');
  const [isBackendConnected, setIsBackendConnected] = useState(false);

  // Test connection to your Render Django backend on mount
  useEffect(() => {
    apiClient.get('/')
      .then(response => {
        setBackendStatus('Django + PostgreSQL Backend Connected');
        setIsBackendConnected(true);
      })
      .catch(error => {
        console.error('Backend connection error:', error);
        setBackendStatus('Backend connection failed');
        setIsBackendConnected(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#121417] text-slate-100 flex flex-col font-sans bg-ambient-charcoal">
      <Navbar 
        currentTenant={currentTenant} 
        setTenant={setTenant} 
        currentRole={currentRole} 
        setRole={setRole} 
      />

      <div className="flex flex-1">
        {/* Navigation Sidebar */}
        <aside className="w-64 bg-[#181b20] border-r border-[#2a2f38] p-4 space-y-2">
          <div className="px-3 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Main Menu
          </div>
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'overview' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-semibold' : 'text-slate-400 hover:bg-[#1e232b] hover:text-slate-200'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Overview Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('tasks')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'tasks' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-semibold' : 'text-slate-400 hover:bg-[#1e232b] hover:text-slate-200'}`}
          >
            <CheckSquare className="w-5 h-5" />
            <span>Tasks & Milestones</span>
          </button>
          <button 
            onClick={() => setActiveTab('files')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'files' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-semibold' : 'text-slate-400 hover:bg-[#1e232b] hover:text-slate-200'}`}
          >
            <FileText className="w-5 h-5" />
            <span>Secure File Hub</span>
          </button>
          <button 
            onClick={() => setActiveTab('onboarding')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${activeTab === 'onboarding' ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-semibold' : 'text-slate-400 hover:bg-[#1e232b] hover:text-slate-200'}`}
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Onboarding Progress</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-8 overflow-y-auto bg-[#121417]">
          <div className="max-w-6xl mx-auto space-y-6">
            <div className="flex flex-wrap justify-between items-center bg-[#181b20] border border-[#2a2f38] p-6 rounded-2xl shadow-xl">
              <div>
                <span className="text-xs text-amber-400 font-semibold uppercase tracking-wider">Active Workspace</span>
                <h2 className="text-2xl font-bold text-slate-100 mt-1">Tenant: <span className="text-amber-400">{currentTenant}</span></h2>
                <p className="text-xs text-slate-400 mt-1">Active Security Context: <span className="text-slate-200 font-semibold">{currentRole}</span></p>
              </div>
              <div className={`flex items-center space-x-2 border px-4 py-2 rounded-xl text-xs font-semibold shadow-inner ${isBackendConnected ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                {isBackendConnected ? <Database className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                <span>{backendStatus}</span>
              </div>
            </div>

            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#181b20] border border-[#2a2f38] p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Projects</h3>
                  <p className="text-3xl font-extrabold text-slate-100 mt-2">3 Active</p>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    <span>100% tenant isolated</span> <ArrowUpRight className="w-3 h-3 text-amber-400" />
                  </p>
                </div>
                <div className="bg-[#181b20] border border-[#2a2f38] p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Onboarding Progress</h3>
                  <p className="text-3xl font-extrabold text-emerald-400 mt-2">60%</p>
                  <p className="text-xs text-slate-400 mt-2">3 of 5 steps completed</p>
                </div>
                <div className="bg-[#181b20] border border-[#2a2f38] p-6 rounded-2xl shadow-lg relative overflow-hidden group">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Security Clearance</h3>
                  <p className="text-3xl font-extrabold text-amber-400 mt-2">{currentRole}</p>
                  <p className="text-xs text-slate-400 mt-2">RBAC enforcement active</p>
                </div>
              </div>
            )}

            {activeTab === 'tasks' && <TaskBoard role={currentRole} />}
            {activeTab === 'files' && <FileHub role={currentRole} tenant={currentTenant} />}
            {activeTab === 'onboarding' && <OnboardingChecklist role={currentRole} tenant={currentTenant} />}
          </div>
        </main>
      </div>
    </div>
  );
}