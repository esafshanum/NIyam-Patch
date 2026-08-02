'use client';

import React, { useState } from 'react';
import { GitPullRequest, Code, AlertCircle, FileCode, GitBranch, CheckCircle2, X } from 'lucide-react';
import { PatchProposal } from '@/lib/db/store';

interface CodeDiffViewerProps {
  patch: PatchProposal | null;
  onRunPreTests: () => void;
  isTesting: boolean;
  theme?: 'dark' | 'light';
}

export function CodeDiffViewer({ patch, onRunPreTests, isTesting, theme = 'dark' }: CodeDiffViewerProps) {
  const [showPRModal, setShowPRModal] = useState(false);
  const [prCreated, setPrCreated] = useState(false);

  const isLight = theme === 'light';

  if (!patch) {
    return (
      <div className={`border rounded-xl p-8 text-center text-slate-400 ${
        isLight ? 'bg-white border-slate-300' : 'bg-slate-900 border-slate-800'
      }`}>
        <GitPullRequest className="h-10 w-10 mx-auto text-slate-400 mb-3 animate-pulse" />
        <h3 className={`text-sm font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>No Patch Proposal Generated Yet</h3>
        <p className="text-xs text-slate-500 mt-1">Extract policy rule evidence first to generate side-by-side unified diff.</p>
      </div>
    );
  }

  const handleCreatePR = () => {
    setPrCreated(true);
    setTimeout(() => {
      setShowPRModal(false);
    }, 2000);
  };

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
            <GitPullRequest className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold flex items-center gap-2">
              Proposed Code Patch Diff
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${
                patch.status === 'approved'
                  ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                  : patch.status === 'rejected'
                  ? 'bg-red-500/10 text-red-600 border-red-500/20'
                  : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
              }`}>
                Status: {patch.status.toUpperCase()}
              </span>
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Target File: <code className="font-mono">{patch.targetFile}</code></p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* GitHub PR Generator Button */}
          <button
            onClick={() => setShowPRModal(true)}
            className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold px-3 py-1.5 rounded-md border border-slate-700 flex items-center gap-1.5 transition-all shadow-sm"
          >
            <GitBranch className="h-3.5 w-3.5 text-amber-400" />
            <span>Generate GitHub PR</span>
          </button>

          <span className={`text-xs px-3 py-1 rounded border font-mono ${
            isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-800 border-slate-700 text-slate-300'
          }`}>
            Line #{patch.targetLineNumber}
          </span>
        </div>
      </div>

      {/* Main Diff Code Box */}
      <div className="p-5 flex-1 space-y-4">
        {/* Unified Diff Box */}
        <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden font-mono text-xs shadow-inner">
          <div className="bg-slate-900/90 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-slate-400 text-[11px]">
            <span className="flex items-center gap-1.5">
              <FileCode className="h-3.5 w-3.5 text-amber-400" />
              Unified Diff View (git format)
            </span>
            <span>Minimal Scope Constant Modification</span>
          </div>

          <div className="p-4 space-y-1 overflow-x-auto text-slate-300">
            <div className="text-slate-500 pb-1">// File: {patch.targetFile}</div>
            <div className="text-slate-500 pb-2">@@ -8,3 +8,3 @@ eligibilityEngine.ts</div>
            <div className="text-slate-400 pl-4 py-0.5">// POLICY RULE: Annual Family Income Limit (in INR)</div>
            
            {/* Old Code Line */}
            <div className="bg-red-500/15 text-red-300 px-3 py-1.5 rounded flex items-center justify-between border-l-4 border-red-500">
              <div className="flex items-center space-x-3">
                <span className="text-red-400 font-bold select-none">- Line {patch.targetLineNumber}:</span>
                <code>{patch.oldCodeSnippet}</code>
              </div>
              <span className="text-[10px] uppercase font-sans font-bold bg-red-950 text-red-400 px-2 py-0.5 rounded">Old Rule</span>
            </div>

            {/* New Code Line */}
            <div className="bg-emerald-500/15 text-emerald-300 px-3 py-1.5 rounded flex items-center justify-between border-l-4 border-emerald-500 mt-1">
              <div className="flex items-center space-x-3">
                <span className="text-emerald-400 font-bold select-none">+ Line {patch.targetLineNumber}:</span>
                <code>{patch.newCodeSnippet}</code>
              </div>
              <span className="text-[10px] uppercase font-sans font-bold bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded">Proposed Patch</span>
            </div>
          </div>
        </div>

        {/* Impact Analysis Banner */}
        <div className={`border rounded-lg p-3.5 text-xs flex items-start space-x-3 ${
          isLight ? 'bg-amber-50 border-amber-200' : 'bg-slate-950 border-slate-800'
        }`}>
          <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
          <div className={`space-y-1 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
            <h4 className="font-bold">Impact Analysis Summary</h4>
            <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
              Modifies constant <code className="font-mono text-amber-600">MAX_FAMILY_INCOME</code>. Expands eligibility ceiling for student applicants from ₹2.5 Lakhs to ₹3.0 Lakhs per MP Dept of Higher Education Circular #HE/2026/302.
            </p>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className={`border-t p-4 flex items-center justify-between ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-slate-900/90 border-slate-800'
      }`}>
        <span className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Next step: Execute boundary test matrix against target state</span>
        <button
          onClick={onRunPreTests}
          disabled={isTesting}
          className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-md shadow flex items-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
        >
          <span>{isTesting ? 'Running Boundary Tests...' : 'Run Boundary Test Suite'}</span>
        </button>
      </div>

      {/* GitHub PR Modal */}
      {showPRModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-100 text-xs relative">
            <button
              onClick={() => setShowPRModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center space-x-2.5 border-b border-slate-800 pb-3">
              <GitBranch className="h-6 w-6 text-amber-400" />
              <div>
                <h3 className="text-sm font-bold">Create GitHub Pull Request</h3>
                <p className="text-[11px] text-slate-400">Automated PR generation for target repository</p>
              </div>
            </div>

            <div className="space-y-3 font-mono">
              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">PR Title:</span>
                <span className="text-amber-300 font-bold text-xs">feat(policy): update MAX_FAMILY_INCOME ceiling to ₹3,00,000 per Circular #HE/2026/302</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Branch Mapping:</span>
                <span className="text-emerald-400 font-bold text-xs">policy/patch-mmvy-income-2026 ➔ main</span>
              </div>

              <div className="bg-slate-950 p-2.5 rounded border border-slate-800 text-[11px] space-y-1 text-slate-300">
                <span className="text-[10px] text-slate-500 block">Automated Description:</span>
                <p>• Linked Policy: Gazette Order #F-12/302/2026/38-1 (Page 2, Clause 4.1)</p>
                <p>• Modified Constant: MAX_FAMILY_INCOME (250000 ➔ 300000)</p>
                <p>• Boundary Tests: 5/5 PASSED</p>
                <p>• Safety Gate: Pending Human Administrator Sign-off</p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-end space-x-3">
              <button
                onClick={() => setShowPRModal(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCreatePR}
                disabled={prCreated}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-slate-950 font-bold rounded flex items-center gap-1.5 shadow"
              >
                {prCreated ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-slate-950" />
                    <span>PR #142 Created on GitHub!</span>
                  </>
                ) : (
                  <span>Submit Pull Request</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
