'use client';

import React from 'react';
import { TestTube2, CheckCircle2, XCircle, PlayCircle } from 'lucide-react';
import { TestSuiteRun } from '@/lib/db/store';

interface BoundaryTestMatrixProps {
  preTestRun: TestSuiteRun | null;
  postTestRun: TestSuiteRun | null;
  isPatched: boolean;
  onRunTests: () => void;
  isTesting: boolean;
  theme?: 'dark' | 'light';
}

export function BoundaryTestMatrix({
  preTestRun,
  postTestRun,
  isPatched,
  onRunTests,
  isTesting,
  theme = 'dark'
}: BoundaryTestMatrixProps) {
  const isLight = theme === 'light';
  const activeRun = isPatched && postTestRun ? postTestRun : preTestRun;

  return (
    <div className={`border rounded-xl shadow-lg overflow-hidden flex flex-col w-full transition-colors ${
      isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      {/* Header */}
      <div className={`border-b px-5 py-3.5 flex items-center justify-between ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/90 border-slate-800'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-amber-500/10 text-amber-500 rounded-md border border-amber-500/20">
            <TestTube2 className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold flex items-center gap-2">
              Executable Boundary Test Suite Matrix
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                activeRun && activeRun.passedCount === activeRun.total
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                  : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
              }`}>
                {activeRun ? `Phase: ${activeRun.phase.toUpperCase()}` : 'Awaiting Test Execution'}
              </span>
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Boundary Verification at ₹2.499L, ₹2.50L, ₹2.80L, ₹3.00L, ₹3.00001L</p>
          </div>
        </div>

        {activeRun && (
          <div className="flex items-center space-x-2">
            <span className={`text-xs font-semibold px-3 py-1 rounded border ${
              isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
            }`}>
              Pass Rate: <strong className={activeRun.passedCount === activeRun.total ? 'text-emerald-600' : 'text-amber-600'}>{activeRun.passedCount}/{activeRun.total}</strong>
            </span>
          </div>
        )}
      </div>

      {/* Main Test Matrix Content */}
      <div className="p-5 flex-1 space-y-4">
        {!activeRun ? (
          <div className={`border rounded-lg p-8 text-center text-slate-400 ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-950 border-slate-800'
          }`}>
            <PlayCircle className="h-10 w-10 mx-auto text-amber-500 mb-3 animate-bounce" />
            <h3 className={`text-sm font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>Test Suite Ready for Execution</h3>
            <p className="text-xs text-slate-500 mt-1 mb-4">Run executable boundary tests to evaluate rule compliance against target behavior.</p>
            <button
              onClick={onRunTests}
              disabled={isTesting}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-md shadow"
            >
              Run Boundary Test Suite Now
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {/* Phase Banner */}
            <div className={`p-3 rounded-lg border text-xs flex items-center justify-between ${
              activeRun.phase === 'post-patch'
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 font-semibold'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-800 font-semibold'
            }`}>
              <span>
                {activeRun.phase === 'post-patch'
                  ? '✅ Post-Patch Verified State: Active Threshold ₹3,00,000 (All 5 Boundary Tests PASSED)'
                  : '⚠️ Pre-Patch Baseline State: Active Threshold ₹2,50,000 (Identified Boundary Fails for ₹2.8L & ₹3.0L)'}
              </span>
              <span className="text-[10px] font-mono opacity-80">{new Date(activeRun.timestamp).toLocaleTimeString()}</span>
            </div>

            {/* Test Cases Table */}
            <div className={`border rounded-lg overflow-hidden text-xs ${
              isLight ? 'bg-white border-slate-300' : 'bg-slate-950 border-slate-800'
            }`}>
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={`border-b text-[11px] uppercase tracking-wider font-semibold ${
                    isLight ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-slate-900 border-slate-800 text-slate-400'
                  }`}>
                    <th className="py-2.5 px-3">Test Value</th>
                    <th className="py-2.5 px-3">Category</th>
                    <th className="py-2.5 px-3">Target Policy</th>
                    <th className="py-2.5 px-3">Actual Result</th>
                    <th className="py-2.5 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isLight ? 'divide-slate-200 text-slate-800' : 'divide-slate-800/80 text-slate-200'}`}>
                  {activeRun.results.map((tc) => (
                    <tr key={tc.testId} className={isLight ? 'hover:bg-slate-50' : 'hover:bg-slate-900/60'}>
                      <td className="py-2.5 px-3 font-mono font-bold text-amber-600">
                        {tc.label}
                      </td>
                      <td className={`py-2.5 px-3 ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                        {tc.income === 249999 ? 'Sub-Boundary' :
                         tc.income === 250000 ? 'Old Ceiling' :
                         tc.income === 280000 ? 'Revised Tier' :
                         tc.income === 300000 ? 'New Ceiling' : 'Super-Boundary'}
                      </td>
                      <td className="py-2.5 px-3 font-semibold">
                        {tc.targetEligible ? 'Eligible' : 'Ineligible'}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                          tc.actualEligible
                            ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20'
                            : 'bg-red-500/10 text-red-600 border border-red-500/20'
                        }`}>
                          {tc.actualEligible ? 'Eligible' : 'Ineligible'}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        {tc.passed ? (
                          <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-600 text-[11px] font-bold px-2 py-0.5 rounded border border-emerald-500/20">
                            <CheckCircle2 className="h-3 w-3" /> PASS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-600 text-[11px] font-bold px-2 py-0.5 rounded border border-amber-500/30">
                            <XCircle className="h-3 w-3 text-amber-600" /> FAIL (Old ₹2.5L Rule)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className={`border-t p-4 flex items-center justify-between ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/90 border-slate-800'
      }`}>
        <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Next step: Review patch and execute mandatory human approval</span>
        <button
          onClick={onRunTests}
          disabled={isTesting}
          className={`font-semibold text-xs px-3.5 py-2 rounded border transition-all ${
            isLight ? 'bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-300' : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
          }`}
        >
          Re-run Test Matrix
        </button>
      </div>
    </div>
  );
}
