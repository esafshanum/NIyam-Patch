'use client';

import React, { useState } from 'react';
import { Split, AlertCircle, CheckCircle2, XCircle, ArrowRight, ShieldCheck } from 'lucide-react';

interface DualPortalSimulatorProps {
  isPatched: boolean;
  currentThreshold: number;
  theme?: 'dark' | 'light';
}

export function DualPortalSimulator({ isPatched, currentThreshold, theme = 'light' }: DualPortalSimulatorProps) {
  const [testIncome, setTestIncome] = useState<number>(280000);
  const [applicantName, setApplicantName] = useState<string>('Ananya Sharma');
  const [scholarshipCourse, setScholarshipCourse] = useState<string>('B.Tech Computer Science (3rd Year)');

  const isLight = theme === 'light';

  // Legacy result (always ₹2.5L limit)
  const legacyLimit = 250000;
  const legacyPassed = testIncome <= legacyLimit;

  // NiyamPatch live result
  const livePassed = testIncome <= currentThreshold;

  return (
    <div className={`border rounded-3xl shadow-lg overflow-hidden flex flex-col w-full transition-colors ${
      isLight ? 'bg-white border-sky-100 text-slate-900' : 'bg-slate-950 border-slate-800 text-slate-100'
    }`}>
      {/* Header */}
      <div className={`border-b px-5 py-3.5 flex items-center justify-between ${
        isLight ? 'bg-sky-50/50 border-sky-100' : 'bg-slate-900/90 border-slate-800'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-blue-500/10 text-blue-600 rounded-lg border border-blue-200">
            <Split className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-black flex items-center gap-2 text-blue-950">
              Split-Screen Dual Portal Eligibility Simulator
              <span className="bg-sky-100 text-sky-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-sky-300">
                Side-by-Side Proof
              </span>
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Visual side-by-side comparison of Legacy Portal vs NiyamPatch Live Engine</p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-sky-800 bg-sky-100 border border-sky-300 px-3 py-1 rounded-full">
          Live Interactive Simulator
        </span>
      </div>

      {/* Simulator Inputs */}
      <div className={`p-4 border-b text-xs grid grid-cols-1 sm:grid-cols-3 gap-3 ${
        isLight ? 'bg-sky-50/40 border-sky-100' : 'bg-slate-900/40 border-slate-800'
      }`}>
        <div>
          <label className="font-bold text-slate-700 block mb-1">Student Applicant Name</label>
          <input
            type="text"
            value={applicantName}
            onChange={(e) => setApplicantName(e.target.value)}
            className={`w-full px-3 py-1.5 rounded-xl border outline-none font-semibold ${
              isLight ? 'bg-white border-sky-200 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
            }`}
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Course & Stream</label>
          <input
            type="text"
            value={scholarshipCourse}
            onChange={(e) => setScholarshipCourse(e.target.value)}
            className={`w-full px-3 py-1.5 rounded-xl border outline-none font-semibold ${
              isLight ? 'bg-white border-sky-200 text-slate-900' : 'bg-slate-950 border-slate-700 text-white'
            }`}
          />
        </div>

        <div>
          <label className="font-bold text-slate-700 block mb-1">Annual Family Income (INR)</label>
          <input
            type="number"
            value={testIncome}
            step={10000}
            onChange={(e) => setTestIncome(Number(e.target.value))}
            className={`w-full px-3 py-1.5 rounded-xl border outline-none font-mono font-bold ${
              isLight ? 'bg-white border-sky-200 text-blue-900' : 'bg-slate-950 border-slate-700 text-amber-400'
            }`}
          />
        </div>
      </div>

      {/* Side-by-Side Dual Portal Grid */}
      <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Portal 1: Legacy Portal (Old ₹2.5L limit) */}
        <div className="border border-red-200 bg-red-50/40 rounded-2xl p-4 space-y-3 shadow-sm relative">
          <div className="flex items-center justify-between border-b border-red-200 pb-2">
            <span className="font-bold text-red-950 text-xs uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              Legacy Unpatched Portal (Old Code)
            </span>
            <span className="text-[10px] font-mono bg-red-100 text-red-800 font-bold px-2 py-0.5 rounded border border-red-300">
              Ceiling: ₹2,50,000
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <p>Applicant: <strong>{applicantName}</strong></p>
            <p>Course: <strong>{scholarshipCourse}</strong></p>
            <p>Declared Income: <strong className="font-mono">₹{testIncome.toLocaleString('en-IN')}</strong></p>
          </div>

          <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
            legacyPassed ? 'bg-emerald-100 border-emerald-300 text-emerald-950' : 'bg-red-100 border-red-300 text-red-950'
          }`}>
            {legacyPassed ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-xs">ELIGIBILITY APPROVED</h4>
                  <p className="text-[11px]">Income ₹{testIncome.toLocaleString()} is within old ₹2,50,000 ceiling.</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-xs">APPLICATION REJECTED</h4>
                  <p className="text-[11px]">Exceeds old unpatched ₹2,50,000 ceiling! Student wrongly disqualified.</p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Portal 2: NiyamPatch Live Portal */}
        <div className="border border-sky-200 bg-sky-50/40 rounded-2xl p-4 space-y-3 shadow-sm relative">
          <div className="flex items-center justify-between border-b border-sky-200 pb-2">
            <span className="font-bold text-sky-950 text-xs uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              NiyamPatch Live Portal Engine
            </span>
            <span className="text-[10px] font-mono bg-blue-600 text-white font-bold px-2.5 py-0.5 rounded-full shadow-sm">
              Ceiling: ₹{currentThreshold.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-slate-700">
            <p>Applicant: <strong>{applicantName}</strong></p>
            <p>Course: <strong>{scholarshipCourse}</strong></p>
            <p>Declared Income: <strong className="font-mono">₹{testIncome.toLocaleString('en-IN')}</strong></p>
          </div>

          <div className={`p-4 rounded-xl border flex items-center space-x-3 ${
            livePassed ? 'bg-emerald-100 border-emerald-300 text-emerald-950' : 'bg-red-100 border-red-300 text-red-950'
          }`}>
            {livePassed ? (
              <>
                <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-xs">ELIGIBILITY APPROVED 🎉</h4>
                  <p className="text-[11px]">Approved per MP Gazette Circular #302 (Clause 4.1, ₹3.0L threshold)!</p>
                </div>
              </>
            ) : (
              <>
                <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
                <div>
                  <h4 className="font-extrabold text-xs">APPLICATION INELIGIBLE</h4>
                  <p className="text-[11px]">Exceeds active ₹{currentThreshold.toLocaleString()} state threshold.</p>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
