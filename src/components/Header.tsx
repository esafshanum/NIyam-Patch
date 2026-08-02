'use client';

import React from 'react';
import { ShieldAlert, Zap, RefreshCw, CheckCircle2, AlertTriangle, FileCheck, Sun, Moon, Languages, FileText } from 'lucide-react';

interface HeaderProps {
  isPatched: boolean;
  onLoadDemo: () => void;
  onReset: () => void;
  isSyncing?: boolean;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onOpenReport: () => void;
}

export function Header({ isPatched, onLoadDemo, onReset, isSyncing, theme, onToggleTheme, onOpenReport }: HeaderProps) {
  const isLight = theme === 'light';

  return (
    <header className={`border-b sticky top-0 z-40 shadow-md transition-colors ${
      isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-slate-900 border-slate-800 text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Brand Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-amber-500 via-orange-600 to-amber-700 flex items-center justify-center shadow-md border border-amber-400/30">
            <FileCheck className="h-6 w-6 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className={`text-xl font-bold tracking-tight flex items-center gap-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}>
                Niyam<span className="text-amber-500">Patch</span>
              </h1>
              <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
                isLight
                  ? 'bg-amber-500/10 text-amber-700 border-amber-500/30'
                  : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
              }`}>
                v1.0 Hackathon Prototype
              </span>
            </div>
            <p className={`text-xs font-medium ${
              isLight ? 'text-slate-500' : 'text-slate-400'
            }`}>
              Policy Circular PDF ➔ Human-Approved, Tested Code Patch Cockpit
            </p>
          </div>
        </div>

        {/* Global Controls & Theme Switcher */}
        <div className="flex items-center space-x-2 flex-wrap justify-end">
          
          {/* Export Audit Report Button */}
          <button
            onClick={onOpenReport}
            className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-600 text-xs font-bold px-3 py-1.5 rounded-md border border-amber-500/30 flex items-center gap-1.5 transition-all shadow-sm"
          >
            <FileText className="h-4 w-4 text-amber-500" />
            <span>Export Audit Report</span>
          </button>

          {/* Indic Vernacular Badge */}
          <div className={`hidden sm:flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border ${
            isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}>
            <Languages className="h-3.5 w-3.5 text-amber-500" />
            <span>EN • हिंदी • मराठी</span>
          </div>

          {/* Active Status Badge */}
          {isPatched ? (
            <div className={`flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border ${
              isLight
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700'
                : 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
            }`}>
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>State Threshold: ₹3,00,000 (Patched)</span>
            </div>
          ) : (
            <div className={`flex items-center space-x-1.5 text-xs font-semibold px-3 py-1.5 rounded-md border ${
              isLight
                ? 'bg-amber-500/10 border-amber-500/30 text-amber-800'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-300'
            }`}>
              <AlertTriangle className="h-4 w-4 text-amber-500" />
              <span>State Threshold: ₹2,50,000 (Baseline)</span>
            </div>
          )}

          {/* Light / Dark Mode Toggle */}
          <button
            onClick={onToggleTheme}
            title={isLight ? "Switch to Dark Mode" : "Switch to Light Mode"}
            className={`p-2 rounded-md border transition-colors flex items-center gap-1.5 text-xs font-bold ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border-slate-700'
            }`}
          >
            {isLight ? (
              <>
                <Sun className="h-4 w-4 text-amber-600" />
                <span className="text-slate-800">Light</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-amber-400" />
                <span className="text-slate-300">Dark</span>
              </>
            )}
          </button>

          {/* 1-Click Demo Trigger */}
          <button
            onClick={onLoadDemo}
            disabled={isSyncing}
            className="flex items-center space-x-1.5 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-md shadow-md transition-all active:scale-95 disabled:opacity-50"
          >
            <Zap className="h-4 w-4 fill-slate-950" />
            <span>⚡ 1-Click Demo</span>
          </button>

          {/* Reset State */}
          <button
            onClick={onReset}
            disabled={isSyncing}
            title="Reset Fixtures to Baseline"
            className={`p-2 rounded-md border transition-colors disabled:opacity-50 ${
              isLight
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
          >
            <RefreshCw className={`h-4 w-4 ${isSyncing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
