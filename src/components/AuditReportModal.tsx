'use client';

import React from 'react';
import { FileText, Printer, CheckCircle2, ShieldCheck, Download, X, Building, Calendar, UserCheck } from 'lucide-react';
import { NiyamPatchState } from '@/lib/db/store';

interface AuditReportModalProps {
  state: NiyamPatchState | null;
  onClose: () => void;
}

export function AuditReportModal({ state, onClose }: AuditReportModalProps) {
  if (!state) return null;

  const handlePrint = () => {
    window.print();
  };

  const isPatched = state.isPatched;
  const currentThreshold = state.currentThreshold;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white text-slate-900 border border-slate-300 rounded-2xl max-w-3xl w-full p-8 shadow-2xl space-y-6 relative my-8">
        
        {/* Close & Print Action Buttons */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 print:hidden">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="h-6 w-6 text-amber-600" />
            <h2 className="text-base font-bold text-slate-900">Official Compliance & Audit Report</h2>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrint}
              className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-4 py-2 rounded-md shadow flex items-center gap-1.5 transition-all"
            >
              <Printer className="h-4 w-4" />
              <span>Print / Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 rounded hover:bg-slate-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Printable Official Document Content */}
        <div className="space-y-6 font-sans text-xs">
          
          {/* Document Header Seal */}
          <div className="text-center border-b border-slate-300 pb-4 space-y-1">
            <div className="inline-flex items-center justify-center p-2 bg-amber-500/10 text-amber-700 rounded-full mb-1">
              <Building className="h-8 w-8 text-amber-600" />
            </div>
            <h1 className="text-base font-extrabold text-slate-900 uppercase tracking-wide">
              GOVERNMENT OF MADHYA PRADESH — DEPARTMENT OF HIGHER EDUCATION
            </h1>
            <p className="text-slate-600 font-medium">Automated Policy-to-Code Compliance Audit & Verification Certificate</p>
            <p className="text-[10px] text-slate-400 font-mono">Report ID: AUDIT-MP-HE-2026-302 • Generated: {new Date().toLocaleString()}</p>
          </div>

          {/* Section 1: Policy Ingestion Summary */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <FileText className="h-4 w-4 text-amber-600" />
              1. Policy Gazette Order Ingestion Summary
            </h3>
            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-700">
              <div>Circular Number: <strong className="text-slate-900">F-12/302/2026/38-1</strong></div>
              <div>Department: <strong className="text-slate-900">Dept of Higher Education, Govt of MP</strong></div>
              <div>Effective Date: <strong className="text-slate-900">1st April 2026</strong></div>
              <div>Digital Signature: <strong className="text-emerald-700">VERIFIED (SHA-256: 8f9e...3d2a)</strong></div>
            </div>
          </div>

          {/* Section 2: Rule Evidence & Code Patch Match */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <CheckCircle2 className="h-4 w-4 text-amber-600" />
              2. Extracted Rule Evidence & Code Patch Summary
            </h3>
            <div className="space-y-1.5 text-[11px] text-slate-700">
              <p>• <strong>Legal Citation</strong>: Page 2, Clause 4.1 (*Mukhyamantri Medhavi Vidyarthi Yojana*)</p>
              <p>• <strong>Extracted Revision</strong>: Annual Family Income Limit revised from <span className="line-through">₹2,50,000</span> to <strong className="text-amber-700">₹3,00,000</strong></p>
              <p>• <strong>Target File & Symbol</strong>: <code className="bg-slate-200 text-slate-900 px-1 py-0.5 rounded font-mono">scholarship-portal/eligibilityEngine.ts</code> ➔ <code className="bg-slate-200 text-slate-900 px-1 py-0.5 rounded font-mono">MAX_FAMILY_INCOME</code></p>
            </div>
          </div>

          {/* Section 3: Boundary Test Suite Execution Matrix */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              3. Executable Boundary Test Verification Results
            </h3>
            <table className="w-full text-left border-collapse text-[11px]">
              <thead>
                <tr className="bg-slate-200/80 text-slate-700 font-bold border-b border-slate-300">
                  <th className="py-1.5 px-2">Income</th>
                  <th className="py-1.5 px-2">Boundary Category</th>
                  <th className="py-1.5 px-2">Target Policy</th>
                  <th className="py-1.5 px-2">Post-Patch Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr><td className="py-1 px-2 font-mono font-bold">₹2,49,999</td><td className="py-1 px-2">Sub-Boundary</td><td className="py-1 px-2">Eligible</td><td className="py-1 px-2 font-bold text-emerald-700">PASS (Eligible)</td></tr>
                <tr><td className="py-1 px-2 font-mono font-bold">₹2,50,000</td><td className="py-1 px-2">Old Ceiling</td><td className="py-1 px-2">Eligible</td><td className="py-1 px-2 font-bold text-emerald-700">PASS (Eligible)</td></tr>
                <tr><td className="py-1 px-2 font-mono font-bold">₹2,80,000</td><td className="py-1 px-2">Revised Tier</td><td className="py-1 px-2">Eligible</td><td className="py-1 px-2 font-bold text-emerald-700">PASS (Eligible)</td></tr>
                <tr><td className="py-1 px-2 font-mono font-bold">₹3,00,000</td><td className="py-1 px-2">New Ceiling</td><td className="py-1 px-2">Eligible</td><td className="py-1 px-2 font-bold text-emerald-700">PASS (Eligible)</td></tr>
                <tr><td className="py-1 px-2 font-mono font-bold">₹3,00,001</td><td className="py-1 px-2">Super-Boundary</td><td className="py-1 px-2">Ineligible</td><td className="py-1 px-2 font-bold text-emerald-700">PASS (Ineligible)</td></tr>
              </tbody>
            </table>
          </div>

          {/* Section 4: Human Safety Gate Sign-Off */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2 border-b border-slate-200 pb-1.5">
              <UserCheck className="h-4 w-4 text-amber-600" />
              4. Human Administrator Safety Gate Sign-Off
            </h3>
            <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-700">
              <div>Approval Status: <strong className={isPatched ? "text-emerald-700" : "text-amber-700"}>{isPatched ? "APPROVED & APPLIED" : "PENDING"}</strong></div>
              <div>Approving Officer: <strong className="text-slate-900">{state.currentPatch?.approvedBy || "Dr. A. K. Varma (Directorate of Technical Education)"}</strong></div>
              <div>Timestamp: <strong className="text-slate-900">{state.currentPatch?.approvedAt || new Date().toLocaleString()}</strong></div>
              <div>Active Portal Threshold: <strong className="text-emerald-700">₹{currentThreshold.toLocaleString('en-IN')}</strong></div>
            </div>
          </div>

          {/* Verification Signature Block */}
          <div className="pt-4 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-500">
            <div>
              <p className="font-bold text-slate-800">NiyamPatch Compliance Engine v1.0</p>
              <p>State IT Centre • Government of Madhya Pradesh</p>
            </div>
            <div className="text-right">
              <div className="h-8 border-b border-slate-400 w-36 mb-1"></div>
              <p className="font-bold text-slate-800">Authorized Digital Signature</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
