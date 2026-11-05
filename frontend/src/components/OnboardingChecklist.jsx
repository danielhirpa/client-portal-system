import React, { useState } from 'react';
import { CheckCircle2, Circle, Clock, Award } from 'lucide-react';

export default function OnboardingChecklist({ role, tenant }) {
  const [steps, setSteps] = useState([
    { id: '1', title: 'Sign Master Service Agreement (MSA)', category: 'Legal', isCompleted: true },
    { id: '2', title: 'Configure Multi-Tenant User Roles', category: 'Security', isCompleted: true },
    { id: '3', title: 'Upload Brand Design Assets & Logos', category: 'Assets', isCompleted: true },
    { id: '4', title: 'Integrate PostgreSQL Connection Strings', category: 'Technical', isCompleted: false },
    { id: '5', title: 'Final Kickoff & Portal Walkthrough', category: 'Operations', isCompleted: false },
  ]);

  const toggleStep = (id) => {
    if (role === 'CLIENT_VIEWER') return;
    setSteps(steps.map(s => s.id === id ? { ...s, isCompleted: !s.isCompleted } : s));
  };

  const completedCount = steps.filter(s => s.isCompleted).length;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  return (
    <div className="space-y-6">
      {/* Summary Card */}
      <div className="bg-[#181b20] border border-[#2a2f38] p-6 rounded-2xl shadow-xl flex flex-wrap justify-between items-center gap-6">
        <div>
          <h3 className="text-xl font-bold text-slate-100">Client Onboarding Workflow</h3>
          <p className="text-sm text-slate-400 mt-1">Interactive setup milestones for <span className="text-amber-400">{tenant}</span></p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="text-right">
            <span className="text-2xl font-black text-emerald-400">{progressPercent}%</span>
            <p className="text-xs text-slate-400">{completedCount} of {steps.length} completed</p>
          </div>
          <div className="w-16 h-16 rounded-full border-4 border-[#2a2f38] border-t-emerald-400 flex items-center justify-center bg-[#121417]">
            <Award className="w-6 h-6 text-amber-400" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#181b20] h-3 rounded-full overflow-hidden border border-[#2a2f38] p-0.5">
        <div 
          className="bg-gradient-to-r from-amber-500 to-emerald-400 h-full rounded-full transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Checklist Items */}
      <div className="bg-[#181b20] border border-[#2a2f38] rounded-2xl divide-y divide-[#2a2f38] shadow-xl">
        {steps.map((step, idx) => (
          <div 
            key={step.id} 
            onClick={() => toggleStep(step.id)}
            className={`p-4 flex items-center justify-between cursor-pointer transition ${step.isCompleted ? 'bg-[#121417]/50' : 'hover:bg-[#1e232b]'}`}
          >
            <div className="flex items-center space-x-3.5">
              {step.isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-slate-500 flex-shrink-0" />
              )}
              <div>
                <h4 className={`text-sm font-semibold ${step.isCompleted ? 'line-through text-slate-400' : 'text-slate-100'}`}>
                  {idx + 1}. {step.title}
                </h4>
                <span className="text-[11px] text-amber-400 font-medium">{step.category}</span>
              </div>
            </div>

            <span className={`text-xs px-2.5 py-1 rounded-full font-medium border ${step.isCompleted ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'}`}>
              {step.isCompleted ? 'Completed' : 'Pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}