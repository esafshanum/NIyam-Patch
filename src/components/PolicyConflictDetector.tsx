'use client';

import React, { useState } from 'react';
import { CheckCircle2, FileSearch, Scale } from 'lucide-react';

interface PolicyConflictDetectorProps {
  theme?: 'dark' | 'light';
}

export function PolicyConflictDetector({ theme = 'light' }: PolicyConflictDetectorProps) {
  const isLight = theme === 'light';
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(true);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 1200);
  };

  const conflicts = [
    {
      id: 1,
      clause: 'Clause 4.1 (Income Ceiling)',
      newDoc: 'Gazette Circular #HE/2026/302',
      existingDoc: 'MMVY Guidelines 2021 (Clause 4.1)',
      status: 'RESOLVED_OVERRIDE',
      badge: 'Explicit Gazette Override',
      badgeColor: 'emerald',
      detail: 'New circular explicitly revokes old ₹2,50,000 threshold and substitutes ₹3,00,000 with effect from 01/04/2026. Zero legal ambiguity.'
    },
    {
      id: 2,
      clause: 'Clause 2.3 (Academic Merit Criteria)',
      newDoc: 'Gazette Circular #HE/2026/302',
      existingDoc: 'State Higher Edu Rules 2024 (Sec 12)',
      status: 'COMPLIANT_UNTOUCHED',
      badge: '100% Consistent',
      badgeColor: 'sky',
      detail: 'Minimum 75% aggregate marks requirement remains fully aligned across both regulatory documents.'
    },
    {
      id: 3,
      clause: 'Clause 5.2 (Reservation Quota Allocation)',
      newDoc: 'Gazette Circular #HE/2026/302',
      existingDoc: 'MP State Reservation Act 2019',
      status: 'INDEPENDENT_SAFE',
      badge: 'Verified Safe',
      badgeColor: 'sky',
      detail: 'Income ceiling modification operates independently of caste quota distributions. No statutory conflict.'
    }
  ];

  return (
    <div className={`border rounded-3xl shadow-sm overflow-hidden flex flex-col w-full transition-colors ${
      isLight ? 'bg-white border-sky-100 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
    }`}>
      {/* Header */}
      <div className={`border-b px-5 py-3.5 flex items-center justify-between ${
        isLight ? 'bg-sky-50/50 border-sky-100' : 'bg-slate-900/90 border-slate-800'
      }`}>
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-sky-100 text-sky-600 rounded-xl border border-sky-200">
            <Scale className="h-5 w-5 text-sky-400" />
          </div>
          <div>
            <h2 className={`text-sm font-black flex items-center gap-2 ${
              isLight ? 'text-sky-950' : 'text-white'
            }`}>
              Multi-Circular Policy Conflict & Legal Risk Matrix
              <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                0 Unresolved Conflicts
              </span>
            </h2>
            <p className={`text-xs ${isLight ? 'text-sky-700' : 'text-slate-300'}`}>
              Cross-references Circular #HE/2026/302 against MP State Gazette Repository (12 Historical Acts)
            </p>
          </div>
        </div>

        <button
          onClick={handleScan}
          disabled={isScanning}
          className="bg-sky-400 hover:bg-sky-500 text-white font-extrabold text-xs px-3.5 py-1.5 rounded-2xl shadow-xs flex items-center gap-1.5 transition-all disabled:opacity-50"
        >
          <FileSearch className={`h-3.5 w-3.5 ${isScanning ? 'animate-spin' : ''}`} />
          <span>{isScanning ? 'Scanning Gazette DB...' : 'Re-scan Gazette DB'}</span>
        </button>
      </div>

      {/* Main Conflict Matrix Grid */}
      <div className="p-5 space-y-3">
        {conflicts.map((item) => (
          <div
            key={item.id}
            className={`p-3.5 rounded-2xl border transition-all ${
              isLight ? 'bg-sky-50/40 border-sky-100 hover:border-sky-300' : 'bg-slate-950/60 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className={`font-extrabold text-xs flex items-center gap-1.5 ${
                isLight ? 'text-sky-950' : 'text-white'
              }`}>
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                {item.clause}
              </span>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                item.badgeColor === 'emerald'
                  ? isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                  : isLight ? 'bg-sky-100 text-sky-900 border-sky-300' : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
              }`}>
                {item.badge}
              </span>
            </div>

            <div className={`flex items-center space-x-2 text-[11px] font-mono mb-1 ${
              isLight ? 'text-sky-800' : 'text-sky-300'
            }`}>
              <span>Target: <strong>{item.newDoc}</strong></span>
              <span>•</span>
              <span>Compared With: <strong>{item.existingDoc}</strong></span>
            </div>

            <p className={`text-xs ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
              {item.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
