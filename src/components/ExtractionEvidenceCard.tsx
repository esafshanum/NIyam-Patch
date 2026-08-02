'use client';

import React from 'react';
import { Layers, FileJson, CheckCircle2, Code } from 'lucide-react';
import { ExtractedRule } from '@/lib/db/store';

interface ExtractionEvidenceCardProps {
  extractedRule: ExtractedRule | null;
  onGeneratePatch: () => void;
  isGenerating: boolean;
  theme?: 'dark' | 'light';
}

export function ExtractionEvidenceCard({
  extractedRule,
  onGeneratePatch,
  isGenerating,
  theme = 'light'
}: ExtractionEvidenceCardProps) {
  const isLight = theme === 'light';

  if (!extractedRule) {
    return (
      <div className={`border rounded-3xl p-8 text-center text-slate-400 ${
        isLight ? 'bg-white border-sky-100' : 'bg-slate-950 border-slate-800'
      }`}>
        <Layers className="h-10 w-10 mx-auto text-sky-400 mb-3 animate-pulse" />
        <h3 className={`text-sm font-bold ${isLight ? 'text-slate-800' : 'text-slate-200'}`}>No Policy Rule Extracted Yet</h3>
        <p className="text-xs text-slate-500 mt-1">Click "Extract Policy Rule & Evidence" in Step 1 to parse Clause 4.1 rule details.</p>
      </div>
    );
  }

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
            <FileJson className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="text-sm font-black flex items-center gap-2 text-blue-950">
              Structured Evidence Extraction Engine
              <span className="bg-sky-100 text-sky-800 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-sky-300">
                Confidence: {(extractedRule.confidence * 100).toFixed(1)}%
              </span>
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Target Clause: <strong>Clause 4.1 (Income Ceiling)</strong></p>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 border border-emerald-300 px-3 py-1 rounded-full flex items-center gap-1">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Rule Parsed
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 space-y-4">
        {/* Rule Shift Box */}
        <div className={`border rounded-2xl p-4 space-y-3 ${
          isLight ? 'bg-sky-50/60 border-sky-200' : 'bg-slate-900/60 border-slate-800'
        }`}>
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500 font-bold uppercase tracking-wider text-[10px]">Rule Field Parameter</span>
            <span className="font-bold text-blue-600">{extractedRule.ruleName}</span>
          </div>

          <div className="grid grid-cols-2 gap-3 items-center text-center">
            {/* Old Value */}
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-950">
              <span className="text-[10px] uppercase font-extrabold text-red-600 block">Baseline Old Ceiling</span>
              <span className="text-lg font-black">{extractedRule.oldValue}</span>
            </div>

            {/* New Value */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-950">
              <span className="text-[10px] uppercase font-extrabold text-emerald-600 block">Revised Gazette Ceiling</span>
              <span className="text-lg font-black">{extractedRule.newValue}</span>
            </div>
          </div>
        </div>

        {/* Legal Evidence Excerpt Quote Box */}
        <div className="bg-slate-950 text-slate-100 border border-slate-800 rounded-2xl p-4 space-y-1.5 font-mono text-xs shadow-inner">
          <div className="text-[10px] text-sky-400 font-bold flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span>PAGE CITATION EXCERPT</span>
            <span>Page #{extractedRule.sourcePage}</span>
          </div>
          <p className="text-slate-300 text-[11px] leading-relaxed italic">
            "{extractedRule.sourceExcerpt}"
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className={`border-t p-4 flex items-center justify-between ${
        isLight ? 'bg-sky-50/40 border-sky-100' : 'bg-slate-900/90 border-slate-800'
      }`}>
        <span className={`text-xs ${isLight ? 'text-slate-600' : 'text-slate-400'}`}>Next step: Locate repository symbol and generate unified diff</span>
        <button
          onClick={onGeneratePatch}
          disabled={isGenerating}
          className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
        >
          <Code className="h-4 w-4" />
          <span>{isGenerating ? 'Matching Codebase AST...' : 'Generate Code Patch Proposal'}</span>
        </button>
      </div>
    </div>
  );
}
