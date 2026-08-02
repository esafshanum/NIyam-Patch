'use client';

import React, { useState } from 'react';
import { ShieldAlert, CheckCircle2, XCircle, Lock, UserCheck, ArrowRight } from 'lucide-react';
import { PatchProposal } from '@/lib/db/store';

interface HumanApprovalGateProps {
  patch: PatchProposal | null;
  isPatched: boolean;
  onApprovePatch: (approverName: string) => void;
  onRejectPatch: (reason: string) => void;
  isApplying: boolean;
  theme?: 'dark' | 'light';
}

export function HumanApprovalGate({
  patch,
  isPatched,
  onApprovePatch,
  onRejectPatch,
  isApplying,
  theme = 'dark'
}: HumanApprovalGateProps) {
  const [approverName, setApproverName] = useState('Dr. A. K. Varma (Directorate of Technical Education)');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  const isLight = theme === 'light';

  if (!patch) return null;

  const isApproved = patch.status === 'approved' || isPatched;
  const isRejected = patch.status === 'rejected';

  return (
    <div className={`rounded-xl border shadow-xl overflow-hidden transition-all ${
      isApproved
        ? 'border-emerald-500/40 ring-1 ring-emerald-500/20'
        : isRejected
        ? 'border-red-500/40'
        : 'border-amber-500/50 ring-2 ring-amber-500/30'
    } ${isLight ? 'bg-white text-slate-900' : 'bg-slate-900 text-slate-100'}`}>
      {/* Banner Top */}
      <div className={`px-5 py-3.5 flex items-center justify-between border-b ${
        isApproved
          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 font-bold'
          : isRejected
          ? 'bg-red-500/10 border-red-500/30 text-red-700 font-bold'
          : 'bg-amber-500/10 border-amber-500/40 text-amber-800 font-bold'
      }`}>
        <div className="flex items-center space-x-3">
          {isApproved ? (
            <CheckCircle2 className="h-6 w-6 text-emerald-600 flex-shrink-0" />
          ) : isRejected ? (
            <XCircle className="h-6 w-6 text-red-600 flex-shrink-0" />
          ) : (
            <ShieldAlert className="h-6 w-6 text-amber-600 flex-shrink-0 animate-pulse" />
          )}
          <div>
            <h3 className="text-sm font-bold tracking-wide flex items-center gap-2">
              {isApproved
                ? 'HUMAN APPROVAL GRANTED — PATCH APPLIED & LIVE'
                : isRejected
                ? 'HUMAN APPROVAL REJECTED — CODEBASE UNCHANGED'
                : 'MANDATORY HUMAN APPROVAL REQUIRED'}
              <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded border border-current">
                Safety Control Gate
              </span>
            </h3>
            <p className="text-xs opacity-90 font-normal">
              {isApproved
                ? `Approved by ${patch.approvedBy || approverName} on ${new Date(patch.approvedAt || Date.now()).toLocaleTimeString()}`
                : isRejected
                ? `Rejected: ${patch.rejectionReason}`
                : 'NiyamPatch will never automatically modify production logic without explicit administrator sign-off.'}
            </p>
          </div>
        </div>

        <div className={`hidden sm:flex items-center space-x-2 text-xs font-mono font-bold px-3 py-1.5 rounded border ${
          isLight ? 'bg-slate-100 border-slate-300 text-slate-700' : 'bg-slate-950/60 border-slate-800 text-slate-300'
        }`}>
          <Lock className="h-3.5 w-3.5" />
          <span>Role: Senior Policy Administrator</span>
        </div>
      </div>

      {/* Safety Gate Body */}
      <div className="p-5 space-y-4">
        {!isApproved && !isRejected ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {/* Approver Name Input */}
              <div className="space-y-1.5">
                <label className={`font-bold flex items-center gap-1.5 ${isLight ? 'text-slate-800' : 'text-slate-300'}`}>
                  <UserCheck className="h-4 w-4 text-amber-500" />
                  Approving Authority Name & Designation
                </label>
                <input
                  type="text"
                  value={approverName}
                  onChange={(e) => setApproverName(e.target.value)}
                  placeholder="Enter administrator name"
                  className={`w-full px-3 py-2 rounded-md font-sans text-xs outline-none border ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                      : 'bg-slate-950 border-slate-700 text-slate-100 focus:border-amber-500'
                  }`}
                />
              </div>

              {/* Rationale Checklist */}
              <div className={`p-3 rounded-lg border space-y-1.5 ${
                isLight ? 'bg-slate-50 border-slate-200 text-slate-800' : 'bg-slate-950 border-slate-800 text-slate-300'
              }`}>
                <span className="font-bold text-amber-600 block">Pre-Approval Verification Checklist:</span>
                <ul className={`space-y-1 text-[11px] ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Confirmed Gazette Order #HE/2026/302 (Page 2, Clause 4.1)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Verified side-by-side diff: ₹2,50,000 ➔ ₹3,00,000
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
                    Target file: <code className="text-amber-600 font-mono">eligibilityEngine.ts</code>
                  </li>
                </ul>
              </div>
            </div>

            {/* Rejection input area */}
            {showRejectInput && (
              <div className="bg-red-500/10 border border-red-500/40 p-3 rounded-lg space-y-2 text-xs">
                <label className="text-red-700 font-bold block">Rejection Rationale:</label>
                <input
                  type="text"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g. Requires additional Cabinet budget allocation review"
                  className={`w-full px-3 py-2 rounded-md text-xs outline-none border ${
                    isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-slate-950 border-slate-700 text-slate-100'
                  }`}
                />
                <button
                  onClick={() => onRejectPatch(rejectionReason || "Administrative rejection")}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded text-xs"
                >
                  Confirm Rejection
                </button>
              </div>
            )}

            {/* Action Buttons */}
            <div className={`flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 border-t ${
              isLight ? 'border-slate-200' : 'border-slate-800'
            }`}>
              <button
                onClick={() => setShowRejectInput(!showRejectInput)}
                className="w-full sm:w-auto text-xs text-red-600 hover:text-red-700 font-semibold px-3 py-2 rounded border border-red-500/30 hover:border-red-500/60 transition-colors"
              >
                {showRejectInput ? 'Cancel Rejection' : 'Reject Proposed Patch'}
              </button>

              <button
                onClick={() => onApprovePatch(approverName)}
                disabled={isApplying}
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-slate-950 font-black text-sm px-6 py-3 rounded-md shadow-lg flex items-center justify-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <ShieldAlert className="h-5 w-5 fill-slate-950" />
                <span>{isApplying ? 'Applying Code Patch & Running Tests...' : 'APPROVE & APPLY CODE PATCH NOW'}</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-between text-xs">
            <div className="space-y-1">
              <span className="font-bold">Live Portal State:</span>
              <p className={isLight ? 'text-slate-600' : 'text-slate-400'}>
                {isApproved
                  ? 'Code patch successfully applied to eligibilityEngine.ts. Live portal is now actively evaluating applications with ₹3,00,000 threshold.'
                  : 'Patch was rejected. Codebase remains locked at baseline ₹2,50,000 threshold.'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
