'use client';

import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle, Award, Landmark } from 'lucide-react';

interface LivePortalWidgetProps {
  isPatched: boolean;
  currentThreshold: number;
  theme?: 'dark' | 'light';
}

export function LivePortalWidget({ isPatched, currentThreshold, theme = 'dark' }: LivePortalWidgetProps) {
  const [studentName, setStudentName] = useState('Ananya Sharma');
  const [incomeInput, setIncomeInput] = useState<number>(280000);
  const [course, setCourse] = useState('B.Tech Engineering');
  const [result, setResult] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);

  const isLight = theme === 'light';

  const handleCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsChecking(true);

    try {
      const res = await fetch('/api/portal/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          annualIncome: incomeInput,
          studentName,
          course
        })
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error("Failed to check portal eligibility:", err);
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <div className={`border rounded-xl shadow-lg overflow-hidden flex flex-col w-full transition-colors ${
      isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      {/* Header Bar */}
      <div className={`border-b px-5 py-3.5 flex items-center justify-between ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/90 border-slate-800'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-gradient-to-br from-amber-500 to-orange-600 text-slate-950 rounded-md shadow-sm">
            <Landmark className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold flex items-center gap-2">
              State Scholarship Portal (Live Sandbox)
              <span className="bg-emerald-500/10 text-emerald-600 text-[10px] font-semibold px-2 py-0.5 rounded border border-emerald-500/20">
                Live Executable Runtime
              </span>
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Mukhyamantri Medhavi Vidyarthi Scheme Eligibility Verification</p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className={`text-xs font-mono px-2.5 py-1 rounded border ${
            isLight ? 'bg-slate-100 border-slate-300 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-300'
          }`}>
            Active Code Ceiling: <strong className={isPatched ? 'text-emerald-600' : 'text-amber-600'}>₹{currentThreshold.toLocaleString('en-IN')}</strong>
          </span>
        </div>
      </div>

      {/* Simulator Body */}
      <div className="p-5 flex-1 space-y-4">
        <form onSubmit={handleCheck} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Applicant Name */}
            <div>
              <label className={`text-xs font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Applicant Name</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className={`w-full px-3 py-2 rounded text-xs outline-none border ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500' : 'bg-slate-950 border-slate-700 text-slate-100 focus:border-amber-500'
                }`}
              />
            </div>

            {/* Annual Family Income */}
            <div>
              <label className="text-xs font-semibold text-amber-600 block mb-1">Annual Family Income (INR)</label>
              <input
                type="number"
                value={incomeInput}
                onChange={(e) => setIncomeInput(Number(e.target.value))}
                className={`w-full font-mono font-bold px-3 py-2 rounded text-xs outline-none border ${
                  isLight ? 'bg-amber-50 border-amber-300 text-amber-950 focus:border-amber-500' : 'bg-slate-950 border-amber-500/40 text-amber-300 focus:border-amber-500'
                }`}
              />
            </div>

            {/* Course */}
            <div>
              <label className={`text-xs font-semibold block mb-1 ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>Course Stream</label>
              <input
                type="text"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className={`w-full px-3 py-2 rounded text-xs outline-none border ${
                  isLight ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500' : 'bg-slate-950 border-slate-700 text-slate-100 focus:border-amber-500'
                }`}
              />
            </div>
          </div>

          {/* Preset Income Buttons */}
          <div className="flex items-center space-x-2 text-xs flex-wrap">
            <span className={`text-[11px] font-medium ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Quick Income Presets:</span>
            {[249999, 250000, 280000, 300000, 300001].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => setIncomeInput(val)}
                className={`px-2.5 py-1 rounded font-mono text-[11px] border transition-colors ${
                  incomeInput === val
                    ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                    : isLight ? 'bg-slate-100 text-slate-700 border-slate-300 hover:border-slate-400' : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-600'
                }`}
              >
                ₹{val.toLocaleString('en-IN')}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isChecking}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold text-xs py-2.5 rounded-md shadow flex items-center justify-center space-x-2 transition-all"
          >
            <Search className="h-4 w-4" />
            <span>{isChecking ? 'Evaluating Live Eligibility...' : 'Evaluate Live Portal Eligibility'}</span>
          </button>
        </form>

        {/* Output Card */}
        {result && (
          <div className={`p-4 rounded-lg border text-xs space-y-2 transition-all ${
            result.isEligible
              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-800'
              : 'bg-red-500/10 border-red-500/40 text-red-800'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 font-bold text-sm">
                {result.isEligible ? (
                  <>
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span>SCHOLARSHIP ELIGIBLE</span>
                  </>
                ) : (
                  <>
                    <XCircle className="h-5 w-5 text-red-600" />
                    <span>APPLICATION REJECTED</span>
                  </>
                )}
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isLight ? 'bg-white border-slate-300 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-200'
              }`}>
                Threshold Applied: {result.formattedThreshold}
              </span>
            </div>

            <p className="leading-relaxed font-medium">
              {result.statusMessage}
            </p>

            <div className="pt-2 border-t border-current/20 flex flex-wrap items-center justify-between text-[11px] opacity-90">
              <span>Policy Ref: <strong>{result.appliedPolicyReference}</strong></span>
              <span className="font-mono">Evaluated at: {new Date(result.evaluatedAt).toLocaleTimeString()}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`border-t p-3.5 text-xs flex items-center justify-between ${
        isLight ? 'bg-slate-50 border-slate-200 text-slate-500' : 'bg-slate-900/90 border-slate-800 text-slate-400'
      }`}>
        <span>Demonstrates live behavioral change after human patch approval</span>
        <Award className="h-4 w-4 text-amber-500" />
      </div>
    </div>
  );
}
