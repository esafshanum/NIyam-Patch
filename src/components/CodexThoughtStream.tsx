'use client';

import React, { useState } from 'react';
import { Terminal, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

interface CodexThoughtStreamProps {
  currentStep: number;
  extractedRule: any;
  patch: any;
  preTestRun: any;
  isPatched: boolean;
  theme?: 'dark' | 'light';
}

export function CodexThoughtStream({
  currentStep,
  extractedRule,
  patch,
  preTestRun,
  isPatched,
  theme = 'light'
}: CodexThoughtStreamProps) {
  const [isOpen, setIsOpen] = useState(true);
  const isLight = theme === 'light';

  const steps = [
    {
      id: 1,
      name: "PDF_INGESTION_PARSER",
      status: currentStep >= 1 ? "completed" : "pending",
      title: "Ingested Gazette Circular F-12/302/2026/38-1",
      detail: "Parsed 2 pages of MP Dept of Higher Education Circular text.",
      timestamp: "0.12s"
    },
    {
      id: 2,
      name: "RULE_EXTRACTION_ENGINE",
      status: currentStep >= 2 ? "completed" : "pending",
      title: "Extracted Income Ceiling Revision (99.4% Confidence)",
      detail: extractedRule
        ? `Identified Clause 4.1: ${extractedRule.oldValue} ➔ ${extractedRule.newValue} effective ${extractedRule.effectiveDate}.`
        : "Awaiting rule extraction...",
      timestamp: "0.45s"
    },
    {
      id: 3,
      name: "AST_REPOSITORY_MATCHER",
      status: currentStep >= 3 ? "completed" : "pending",
      title: "Matched Constant 'MAX_FAMILY_INCOME' at line 9",
      detail: patch
        ? `Target File: ${patch.targetFile} (Symbol: MAX_FAMILY_INCOME)`
        : "Awaiting repository code match...",
      timestamp: "0.78s"
    },
    {
      id: 4,
      name: "BOUNDARY_TEST_RUNNER",
      status: currentStep >= 4 ? "completed" : "pending",
      title: "Executed 5 Boundary Unit Tests",
      detail: preTestRun
        ? `Pre-patch result: ${preTestRun.passedCount}/${preTestRun.total} passed against target ₹3.0L threshold.`
        : "Awaiting boundary test run...",
      timestamp: "1.10s"
    },
    {
      id: 5,
      name: "HUMAN_SAFETY_GATE",
      status: isPatched ? "approved" : "locked",
      title: isPatched ? "Human Approval Granted ➔ Patch Applied" : "Safety Gate Locked: Human Approval Mandatory",
      detail: isPatched
        ? "Code constant MAX_FAMILY_INCOME updated to 300000. Post-patch tests 5/5 PASSED."
        : "System halt. Awaiting explicit administrator approval before modifying codebase.",
      timestamp: "1.35s"
    }
  ];

  return (
    <div className={`border rounded-2xl shadow-xs overflow-hidden text-xs transition-colors ${
      isLight ? 'bg-white border-sky-100 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      {/* Drawer Header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full px-5 py-3 flex items-center justify-between border-b transition-colors ${
          isLight ? 'bg-sky-50/50 border-sky-100 hover:bg-sky-100/50' : 'bg-slate-900 border-slate-800 hover:bg-slate-800/80'
        }`}
      >
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-gradient-to-r from-sky-400 to-blue-400 text-white rounded-lg font-bold">
            <Terminal className="h-4 w-4" />
          </div>
          <div className="text-left">
            <h3 className={`font-black flex items-center gap-2 ${
              isLight ? 'text-sky-950' : 'text-white'
            }`}>
              Codex Agentic Execution & Reasoning Stream
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                isLight ? 'bg-sky-100 text-sky-900 border-sky-200' : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
              }`}>
                Agent Log Stream
              </span>
            </h3>
            <p className={`text-[11px] ${isLight ? 'text-sky-700' : 'text-slate-300'}`}>
              Step-by-step multi-turn agentic pipeline execution log
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-[11px] font-mono font-bold text-emerald-600 bg-emerald-100 px-2.5 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
            <Sparkles className="h-3 w-3 text-emerald-600" />
            Codex Agent Active
          </span>
          {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
        </div>
      </button>

      {/* Terminal Log Body */}
      {isOpen && (
        <div className={`p-4 font-mono space-y-2.5 max-h-72 overflow-y-auto border-t transition-colors ${
          isLight ? 'bg-sky-50/30 border-sky-100' : 'bg-slate-950 border-slate-900'
        }`}>
          {steps.map((s) => {
            const isDone = s.status === "completed" || s.status === "approved";
            const isCurrent = currentStep === s.id;

            return (
              <div
                key={s.id}
                className={`p-3 rounded-xl border transition-all ${
                  isLight
                    ? isDone
                      ? 'bg-white border-sky-200 text-slate-900 shadow-xs'
                      : isCurrent
                      ? 'bg-sky-100 border-sky-400 text-sky-950 font-bold shadow-xs'
                      : 'bg-sky-50/50 border-sky-100 text-slate-700'
                    : isDone
                    ? 'bg-slate-900 border-slate-800 text-slate-200'
                    : isCurrent
                    ? 'bg-sky-500/15 border-sky-500/50 text-sky-200 ring-1 ring-sky-500/30'
                    : 'bg-slate-950 border-slate-900 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isLight
                        ? isDone
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : isCurrent
                          ? 'bg-sky-200 text-sky-950 border border-sky-300'
                          : 'bg-sky-100 text-sky-800'
                        : isDone
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : isCurrent
                        ? 'bg-sky-500/20 text-sky-300'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      [{s.name}]
                    </span>
                    <span className={`font-bold ${isLight ? 'text-slate-900' : 'text-white'}`}>
                      {s.title}
                    </span>
                  </div>
                  <span className={`text-[10px] font-mono ${isLight ? 'text-sky-700' : 'text-slate-400'}`}>
                    {s.timestamp}
                  </span>
                </div>

                <p className={`text-[11px] pl-2 border-l-2 ${
                  isLight
                    ? 'text-slate-700 border-sky-400'
                    : 'text-slate-300 border-sky-500/50'
                }`}>
                  {s.detail}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
