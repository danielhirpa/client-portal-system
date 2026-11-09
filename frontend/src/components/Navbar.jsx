import React from 'react';
import { Building2, Shield, Bell, Sparkles } from 'lucide-react';

export default function Navbar({ currentTenant, setTenant, currentRole, setRole }) {
  return (
    <header className="bg-[#181b20]/95 backdrop-blur-md border-b border-[#2a2f38] px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50 shadow-xl">
      {/* Brand Identity */}
      <div className="flex items-center space-x-3.5">
        <div className="bg-gradient-to-br from-amber-500 to-amber-700 p-2.5 rounded-xl shadow-lg shadow-amber-950/40 border border-amber-400/30">
          <Building2 className="w-6 h-6 text-slate-950" />
        </div>
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="font-bold text-lg text-slate-100 tracking-tight">ClientPulse Portal</h1>
            <span className="bg-amber-500/10 text-amber-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-500/20 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> PRO
            </span>
          </div>
          <p className="text-xs text-slate-400">Multi-Tenant Client Management</p>
        </div>
      </div>

      {/* Tenant & RBAC Selectors */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-[#121417] px-3.5 py-2 rounded-xl border border-[#2a2f38] shadow-inner focus-within:border-amber-500 transition">
          <Building2 className="w-4 h-4 text-slate-400" />
          <span className="text-xs text-slate-400 font-medium">Tenant:</span>
          <select 
            value={currentTenant} 
            onChange={(e) => setTenant(e.target.value)}
            className="bg-transparent text-sm font-semibold text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="Acme Corp" className="bg-[#181b20] text-slate-200">Acme Corp</option>
            <option value="Apex Retail" className="bg-[#181b20] text-slate-200">Apex Retail</option>
            <option value="Nexus Logistics" className="bg-[#181b20] text-slate-200">Nexus Logistics</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 bg-[#121417] px-3.5 py-2 rounded-xl border border-[#2a2f38] shadow-inner focus-within:border-amber-500 transition">
          <Shield className="w-4 h-4 text-amber-400" />
          <span className="text-xs text-slate-400 font-medium">Role:</span>
          <select 
            value={currentRole} 
            onChange={(e) => setRole(e.target.value)}
            className="bg-transparent text-sm font-semibold text-amber-400 focus:outline-none cursor-pointer"
          >
            <option value="AGENCY_ADMIN" className="bg-[#181b20] text-slate-200">Agency Admin / PM</option>
            <option value="CLIENT_LEAD" className="bg-[#181b20] text-slate-200">Client Lead</option>
            <option value="CLIENT_VIEWER" className="bg-[#181b20] text-slate-200">Client Viewer</option>
          </select>
        </div>

        <button className="p-2.5 text-slate-400 hover:text-slate-200 transition rounded-xl bg-[#121417] border border-[#2a2f38] hover:bg-[#1e232b] relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-sm shadow-amber-500"></span>
        </button>
      </div>
    </header>
  );
}