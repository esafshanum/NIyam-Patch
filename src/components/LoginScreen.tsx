'use client';

import React, { useState } from 'react';
import { ShieldCheck, Lock, User, Key, Building, Zap, ArrowRight, FileCheck, Sun, Moon } from 'lucide-react';

interface LoginScreenProps {
  onLogin: (name: string, role: string, email: string) => void;
  onDemoLogin: () => void;
  theme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export function LoginScreen({ onLogin, onDemoLogin, theme = 'light', onToggleTheme }: LoginScreenProps) {
  const [email, setEmail] = useState('admin@higheredu.mp.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('Senior Policy Administrator');
  const [name, setName] = useState('Dr. A. K. Varma');

  const isLight = theme === 'light';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name, role, email);
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors relative overflow-hidden ${
      isLight ? 'bg-sky-50/80 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Top Bar Theme Switcher */}
      {onToggleTheme && (
        <div className="absolute top-4 right-6 z-20">
          <button
            onClick={onToggleTheme}
            className={`flex items-center space-x-1.5 text-xs font-bold px-3 py-1.5 rounded-2xl border transition-all shadow-sm ${
              isLight
                ? 'bg-white hover:bg-sky-100 text-sky-950 border-sky-200'
                : 'bg-slate-800 hover:bg-slate-700 text-sky-400 border-slate-700'
            }`}
          >
            {isLight ? (
              <>
                <Sun className="h-4 w-4 text-sky-400" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-sky-400" />
                <span>Dark Mode</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Pastel Soft Glow Accent Circles */}
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-sky-200/60 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-sky-300/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className={`max-w-md w-full border rounded-3xl shadow-xl overflow-hidden p-8 space-y-6 transition-all relative z-10 ${
        isLight ? 'bg-white border-sky-100 shadow-sky-100/80' : 'bg-slate-900/90 border-slate-800 shadow-slate-950/80 backdrop-blur-md'
      }`}>
        
        {/* Header Branding */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-3xl bg-gradient-to-br from-sky-400 via-sky-300 to-blue-400 shadow-sm mb-1 border-2 border-white transform hover:scale-105 transition-transform">
            <FileCheck className="h-9 w-9 text-white font-bold" />
          </div>
          <h1 className="text-2xl font-black tracking-tight flex items-center justify-center gap-1.5 text-sky-950">
            Niyam<span className="text-sky-400">Patch</span>
          </h1>
          <p className={`text-xs font-bold ${isLight ? 'text-sky-600' : 'text-sky-400'}`}>
            Government Policy Operations & Compliance Platform
          </p>
        </div>

        {/* Security Gate Notice */}
        <div className={`p-3.5 rounded-2xl border text-xs flex items-start space-x-2.5 ${
          isLight ? 'bg-sky-50 border-sky-200 text-sky-950' : 'bg-sky-500/10 border-sky-500/30 text-sky-200'
        }`}>
          <Lock className="h-4 w-4 text-sky-500 flex-shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong className="block font-extrabold mb-0.5">Restricted Administrator Portal</strong>
            <span>Sign in with your government credentials to access policy circular ingestion, code diff matching, and safety approval gates.</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className={`font-bold block mb-1.5 ${isLight ? 'text-sky-950' : 'text-slate-300'}`}>
              Officer Full Name
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-sky-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Dr. A. K. Varma"
                className={`w-full pl-9 pr-3 py-2.5 rounded-2xl outline-none border transition-all ${
                  isLight ? 'bg-sky-50/40 border-sky-200 text-sky-950 focus:border-sky-400' : 'bg-slate-950 border-slate-700 text-slate-100 focus:border-sky-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`font-bold block mb-1.5 ${isLight ? 'text-sky-950' : 'text-slate-300'}`}>
              Government Email / NIC ID
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-2.5 h-4 w-4 text-sky-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@higheredu.mp.gov.in"
                className={`w-full pl-9 pr-3 py-2.5 rounded-2xl outline-none border transition-all ${
                  isLight ? 'bg-sky-50/40 border-sky-200 text-sky-950 focus:border-sky-400' : 'bg-slate-950 border-slate-700 text-slate-100 focus:border-sky-400'
                }`}
              />
            </div>
          </div>

          <div>
            <label className={`font-bold block mb-1.5 ${isLight ? 'text-sky-950' : 'text-slate-300'}`}>
              Administrative Authorization Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className={`w-full px-3 py-2.5 rounded-2xl outline-none border transition-all font-bold ${
                isLight ? 'bg-sky-50/40 border-sky-200 text-sky-950 focus:border-sky-400' : 'bg-slate-950 border-slate-700 text-slate-100 focus:border-sky-400'
              }`}
            >
              <option value="Senior Policy Administrator">Senior Policy Administrator (Full Approval Rights)</option>
              <option value="IT Nodal Officer">IT Nodal Officer (Code Diff & Test Access)</option>
              <option value="Compliance Auditor">Compliance Auditor (Read-Only Audit Trail)</option>
            </select>
          </div>

          <div>
            <label className={`font-bold block mb-1.5 ${isLight ? 'text-sky-950' : 'text-slate-300'}`}>
              Security Password
            </label>
            <div className="relative">
              <Key className="absolute left-3 top-2.5 h-4 w-4 text-sky-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full pl-9 pr-3 py-2.5 rounded-2xl outline-none border transition-all ${
                  isLight ? 'bg-sky-50/40 border-sky-200 text-sky-950 focus:border-sky-400' : 'bg-slate-950 border-slate-700 text-slate-100 focus:border-sky-400'
                }`}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 hover:from-sky-500 hover:to-blue-500 text-white font-black text-xs py-3 rounded-2xl shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-95 mt-2"
          >
            <span>Sign In to NiyamPatch Cockpit</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        {/* 1-Click Quick Demo Sign In */}
        <div className={`pt-4 border-t text-center space-y-2 ${isLight ? 'border-sky-100' : 'border-slate-800'}`}>
          <span className="text-[11px] text-sky-600 font-bold block">Hackathon Evaluator Quick Access:</span>
          <button
            onClick={onDemoLogin}
            className="w-full bg-sky-100 hover:bg-sky-200/80 text-sky-900 text-xs font-black py-2.5 rounded-2xl border border-sky-200 flex items-center justify-center space-x-2 transition-all shadow-xs active:scale-95"
          >
            <Zap className="h-4 w-4 text-sky-500 fill-sky-500" />
            <span>⚡ Quick Demo Sign In as Administrator</span>
          </button>
        </div>

        <div className="text-[10px] text-sky-500 font-bold text-center font-mono pt-1">
          ChatGPT Codex India Hackathon 2026 Submission Entry
        </div>
      </div>
    </div>
  );
}
