'use client';

import React from 'react';
import { FileText, CheckCircle2, ShieldCheck, Zap, ArrowRight, Building, Activity, GitBranch, Award } from 'lucide-react';
import { NiyamPatchState } from '@/lib/db/store';
import { PolicyConflictDetector } from '@/components/PolicyConflictDetector';
import { Language, translations } from '@/lib/i18n';

interface ExecutiveDashboardProps {
  state: NiyamPatchState | null;
  onSelectTab: (tab: string) => void;
  onLoadDemo: () => void;
  onOpenReport: () => void;
  theme?: 'dark' | 'light';
  language?: Language;
}

export function ExecutiveDashboard({
  state,
  onSelectTab,
  onLoadDemo,
  onOpenReport,
  theme = 'light',
  language = 'EN'
}: ExecutiveDashboardProps) {
  const isLight = theme === 'light';
  const isPatched = state?.isPatched || false;
  const currentThreshold = state?.currentThreshold || 250000;
  const t = translations[language] || translations.EN;

  return (
    <div className="space-y-6">
      {/* Executive Welcome Banner */}
      <div className={`border rounded-3xl p-6 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4 transition-colors ${
        isLight ? 'bg-white border-sky-100 text-slate-900' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-sky-400 to-blue-400 text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
              {t.cockpitTag}
            </span>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <CheckCircle2 className="h-3.5 w-3.5" />
              {t.systemStatus}
            </span>
          </div>
          <h2 className={`text-xl font-black tracking-tight ${
            isLight ? 'text-sky-950' : 'text-white'
          }`}>
            {t.welcomeHubTitle}
          </h2>
          <p className={`text-xs ${isLight ? 'text-sky-700' : 'text-slate-300'}`}>
            {t.deptSubtitle}
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onLoadDemo}
            className="bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 hover:from-sky-500 hover:to-blue-500 text-white font-black text-xs px-4 py-2.5 rounded-2xl shadow-xs flex items-center space-x-2 transition-all active:scale-95"
          >
            <Zap className="h-4 w-4 fill-white text-white" />
            <span>{t.demoScenario}</span>
          </button>
        </div>
      </div>

      {/* 4 Metric KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className={`p-5 rounded-3xl border shadow-xs transition-colors ${
          isLight ? 'bg-white border-sky-100' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isLight ? 'text-sky-700' : 'text-sky-300'}`}>{t.activePolicies}</span>
            <FileText className="h-4 w-4 text-sky-400" />
          </div>
          <div className={`text-2xl font-black ${isLight ? 'text-sky-950' : 'text-white'}`}>{t.oneCircular}</div>
          <span className="text-[10px] text-emerald-500 font-bold mt-1 block">{t.deptTag}</span>
        </div>

        {/* Metric 2 */}
        <div className={`p-5 rounded-3xl border shadow-xs transition-colors ${
          isLight ? 'bg-white border-sky-100' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isLight ? 'text-sky-700' : 'text-sky-300'}`}>{t.activePortalThreshold}</span>
            <Building className="h-4 w-4 text-sky-400" />
          </div>
          <div className={`text-2xl font-black ${isLight ? 'text-sky-500' : 'text-sky-400'}`}>₹{currentThreshold.toLocaleString('en-IN')}</div>
          <span className={`text-[10px] font-bold mt-1 block ${isPatched ? 'text-emerald-500' : 'text-amber-500'}`}>
            {isPatched ? t.patchedLabel : t.baselineLabel}
          </span>
        </div>

        {/* Metric 3 */}
        <div className={`p-5 rounded-3xl border shadow-xs transition-colors ${
          isLight ? 'bg-white border-sky-100' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isLight ? 'text-sky-700' : 'text-sky-300'}`}>{t.boundaryUnitTests}</span>
            <Activity className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-emerald-500">
            {isPatched ? t.boundaryPassed : t.boundaryBaseline}
          </div>
          <span className={`text-[10px] font-bold mt-1 block ${isLight ? 'text-sky-700' : 'text-slate-400'}`}>₹2.499L, ₹2.50L, ₹2.80L, ₹3.00L, ₹3.00001L</span>
        </div>

        {/* Metric 4 */}
        <div className={`p-5 rounded-3xl border shadow-xs transition-colors ${
          isLight ? 'bg-white border-sky-100' : 'bg-slate-900 border-slate-800'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-xs font-bold ${isLight ? 'text-sky-700' : 'text-sky-300'}`}>{t.humanSafetyGate}</span>
            <ShieldCheck className="h-4 w-4 text-sky-400" />
          </div>
          <div className={`text-2xl font-black ${isLight ? 'text-sky-950' : 'text-white'}`}>
            {isPatched ? t.approvedState : t.lockedState}
          </div>
          <span className={`text-[10px] font-bold mt-1 block ${isLight ? 'text-sky-700' : 'text-slate-400'}`}>{t.approvalMandatory}</span>
        </div>
      </div>

      {/* Policy Conflict Detector */}
      <PolicyConflictDetector theme={theme} />

      {/* Quick Navigation Action Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <button
          onClick={() => onSelectTab('ingest')}
          className={`p-5 rounded-3xl border text-left space-y-2 hover:border-sky-400 hover:shadow-md transition-all group ${
            isLight ? 'bg-white border-sky-100' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <FileText className="h-6 w-6 text-sky-400 group-hover:scale-110 transition-transform" />
            <ArrowRight className="h-4 w-4 text-sky-300 group-hover:text-sky-400" />
          </div>
          <h3 className={`font-extrabold text-sm ${isLight ? 'text-sky-950' : 'text-white'}`}>{t.card1Title}</h3>
          <p className={`text-xs ${isLight ? 'text-sky-700' : 'text-slate-300'}`}>
            {t.card1Desc}
          </p>
        </button>

        <button
          onClick={() => onSelectTab('diff')}
          className={`p-5 rounded-3xl border text-left space-y-2 hover:border-sky-400 hover:shadow-md transition-all group ${
            isLight ? 'bg-white border-sky-100' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <GitBranch className="h-6 w-6 text-sky-400 group-hover:scale-110 transition-transform" />
            <ArrowRight className="h-4 w-4 text-sky-300 group-hover:text-sky-400" />
          </div>
          <h3 className={`font-extrabold text-sm ${isLight ? 'text-sky-950' : 'text-white'}`}>{t.card2Title}</h3>
          <p className={`text-xs ${isLight ? 'text-sky-700' : 'text-slate-300'}`}>
            {t.card2Desc}
          </p>
        </button>

        <button
          onClick={() => onSelectTab('safety')}
          className={`p-5 rounded-3xl border text-left space-y-2 hover:border-sky-400 hover:shadow-md transition-all group ${
            isLight ? 'bg-white border-sky-100' : 'bg-slate-900 border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between">
            <ShieldCheck className="h-6 w-6 text-sky-400 group-hover:scale-110 transition-transform" />
            <ArrowRight className="h-4 w-4 text-sky-300 group-hover:text-sky-400" />
          </div>
          <h3 className={`font-extrabold text-sm ${isLight ? 'text-sky-950' : 'text-white'}`}>{t.card3Title}</h3>
          <p className={`text-xs ${isLight ? 'text-sky-700' : 'text-slate-300'}`}>
            {t.card3Desc}
          </p>
        </button>
      </div>

      {/* Export Report Banner */}
      <div className={`p-5 rounded-3xl border flex items-center justify-between ${
        isLight ? 'bg-sky-100/60 border-sky-200 text-sky-950' : 'bg-slate-900 border-slate-800 text-slate-100'
      }`}>
        <div className="flex items-center space-x-3">
          <Award className="h-6 w-6 text-sky-400 flex-shrink-0" />
          <div>
            <h4 className={`font-bold text-xs ${isLight ? 'text-sky-950' : 'text-white'}`}>{t.reportReadyTitle}</h4>
            <p className={`text-xs ${isLight ? 'text-sky-800' : 'text-slate-300'}`}>
              {t.reportReadyDesc}
            </p>
          </div>
        </div>

        <button
          onClick={onOpenReport}
          className="bg-gradient-to-r from-sky-400 to-blue-400 hover:from-sky-500 hover:to-blue-500 text-white font-extrabold text-xs px-4 py-2 rounded-2xl shadow-xs transition-all"
        >
          {t.exportReportPdf}
        </button>
      </div>
    </div>
  );
}
