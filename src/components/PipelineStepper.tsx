'use client';

import React from 'react';
import { FileText, Cpu, GitPullRequest, TestTube2, ShieldCheck, CheckCircle } from 'lucide-react';

interface PipelineStepperProps {
  currentStep: number;
  onSelectStep: (step: number) => void;
  theme?: 'dark' | 'light';
}

export function PipelineStepper({ currentStep, onSelectStep, theme = 'dark' }: PipelineStepperProps) {
  const isLight = theme === 'light';

  const steps = [
    { id: 1, name: '1. Ingest Policy Circular', icon: FileText, desc: 'Upload PDF / Select Circular' },
    { id: 2, name: '2. Structured Evidence', icon: Cpu, desc: 'Rule & Page Citation' },
    { id: 3, name: '3. Code Diff Match', icon: GitPullRequest, desc: 'Locate Affected Constants' },
    { id: 4, name: '4. Boundary Tests', icon: TestTube2, desc: 'Executable Test Matrix' },
    { id: 5, name: '5. Human Safety Gate & Live Demo', icon: ShieldCheck, desc: 'Approve & Verify Behavior' },
  ];

  return (
    <div className={`border-b py-3.5 px-4 sm:px-6 transition-colors ${
      isLight ? 'bg-white border-slate-200 shadow-sm' : 'bg-slate-900 border-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto">
        <nav aria-label="Policy to Code Evidence Chain Pipeline">
          <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
            {steps.map((step) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <li key={step.id}>
                  <button
                    onClick={() => onSelectStep(step.id)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all ${
                      isActive
                        ? isLight
                          ? 'bg-amber-50 border-amber-500 text-amber-900 ring-1 ring-amber-500/40 shadow-sm'
                          : 'bg-amber-500/10 border-amber-500 text-amber-300 ring-1 ring-amber-500/30'
                        : isCompleted
                        ? isLight
                          ? 'bg-slate-100 border-slate-300 text-slate-900 hover:bg-slate-200'
                          : 'bg-slate-800/80 border-slate-700 text-slate-200 hover:bg-slate-800'
                        : isLight
                        ? 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-300'
                        : 'bg-slate-900/50 border-slate-800/60 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <Icon className={`h-4 w-4 ${
                          isActive
                            ? 'text-amber-600'
                            : isCompleted
                            ? 'text-emerald-600'
                            : isLight ? 'text-slate-400' : 'text-slate-500'
                        }`} />
                        <span className={`text-xs font-bold truncate ${
                          isLight && !isActive ? 'text-slate-800' : ''
                        }`}>{step.name}</span>
                      </div>
                      {isCompleted && <CheckCircle className="h-3.5 w-3.5 text-emerald-600 flex-shrink-0" />}
                    </div>
                    <p className={`text-[11px] truncate pl-6 ${
                      isLight ? 'text-slate-500' : 'text-slate-400'
                    }`}>{step.desc}</p>
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
