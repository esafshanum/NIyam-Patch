'use client';

import React from 'react';
import { LayoutDashboard, FileText, GitPullRequest, TestTube2, ShieldCheck, History, LogOut, FileCheck, Languages, Sun, Moon, Zap } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';

interface SidebarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  user: { name: string; role: string; email: string } | null;
  onLogout: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  isPatched: boolean;
  onLoadDemo: () => void;
  onOpenReport: () => void;
  language: Language;
}

export function Sidebar({
  activeTab,
  onSelectTab,
  user,
  onLogout,
  theme,
  onToggleTheme,
  isPatched,
  onLoadDemo,
  onOpenReport,
  language = 'EN'
}: SidebarProps) {
  const isLight = theme === 'light';
  const t = translations[language] || translations.EN;

  const navItems = [
    { id: 'dashboard', label: t.dashboard, icon: LayoutDashboard, badge: t.dashboardBadge },
    { id: 'ingest', label: t.policyIngestion, icon: FileText, badge: t.policyBadge },
    { id: 'diff', label: t.codeDiff, icon: GitPullRequest, badge: t.codeDiffBadge },
    { id: 'tests', label: t.boundaryTests, icon: TestTube2, badge: t.boundaryTestsBadge },
    { id: 'safety', label: t.humanGate, icon: ShieldCheck, badge: t.humanGateBadge },
    { id: 'audit', label: t.auditLogs, icon: History, badge: t.auditLogsBadge },
  ];

  return (
    <aside className={`w-64 border-r flex flex-col justify-between min-h-screen transition-colors ${
      isLight ? 'bg-white border-sky-100 text-slate-800 shadow-sm' : 'bg-slate-950 border-slate-800 text-slate-100'
    }`}>
      {/* Top Branding Header */}
      <div>
        <div className={`p-5 border-b flex items-center justify-between ${
          isLight ? 'border-sky-100 bg-sky-50/70' : 'border-slate-800 bg-slate-900'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-sky-400 via-sky-300 to-blue-400 flex items-center justify-center shadow-sm border border-white">
              <FileCheck className="h-6 w-6 text-white font-bold" />
            </div>
            <div>
              <h1 className={`text-lg font-black tracking-tight flex items-center gap-1 ${
                isLight ? 'text-sky-950' : 'text-white'
              }`}>
                Niyam<span className="text-sky-400">Patch</span>
              </h1>
              <p className={`text-[10px] font-mono font-bold ${
                isLight ? 'text-sky-600' : 'text-sky-300'
              }`}>{t.edition}</p>
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div className={`p-4 space-y-2 border-b ${
          isLight ? 'border-sky-100' : 'border-slate-800'
        }`}>
          <button
            onClick={onLoadDemo}
            className="w-full bg-gradient-to-r from-sky-400 via-sky-300 to-blue-400 hover:from-sky-500 hover:to-blue-500 text-white font-black text-xs py-2.5 px-3 rounded-2xl shadow-sm flex items-center justify-center space-x-2 transition-all active:scale-95"
          >
            <Zap className="h-4 w-4 fill-white text-white" />
            <span>{t.demoScenario}</span>
          </button>

          <button
            onClick={onOpenReport}
            className={`w-full text-xs font-bold py-2 px-3 rounded-2xl border flex items-center justify-center space-x-2 transition-colors ${
              isLight ? 'bg-sky-100/60 border-sky-200 text-sky-900 hover:bg-sky-200/60' : 'bg-slate-900 border-slate-700 text-sky-300 hover:bg-slate-800'
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-sky-400" />
            <span>{t.exportAuditCertificate}</span>
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-sky-400 text-white shadow-sm'
                    : isLight
                    ? 'text-slate-700 hover:bg-sky-100/60 hover:text-sky-950'
                    : 'text-slate-200 hover:bg-slate-900 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-3 truncate mr-1">
                  <Icon className={`h-4 w-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-sky-400'}`} />
                  <span className="truncate">{item.label}</span>
                </div>
                <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border flex-shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white border-white/30'
                    : isLight ? 'bg-sky-100 border-sky-200 text-sky-900' : 'bg-slate-900 border-slate-700 text-sky-300'
                }`}>
                  {item.badge}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* User Profile Footer */}
      <div className={`p-4 border-t space-y-3 ${
        isLight ? 'border-sky-100 bg-sky-50/50' : 'border-slate-800 bg-slate-900'
      }`}>
        {user && (
          <div className="flex items-center justify-between text-xs">
            <div className="space-y-0.5 truncate">
              <span className={`font-bold block truncate ${isLight ? 'text-sky-950' : 'text-white'}`}>
                {user.name}
              </span>
              <span className={`text-[10px] block truncate font-mono font-bold ${
                isLight ? 'text-sky-600' : 'text-sky-400'
              }`}>
                {user.role}
              </span>
            </div>

            <button
              onClick={onLogout}
              title="Sign Out of Portal"
              className="p-1.5 text-red-400 hover:text-red-300 rounded-lg hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className={`pt-2 border-t flex items-center justify-between text-xs ${
          isLight ? 'border-sky-100' : 'border-slate-800'
        }`}>
          <button
            onClick={onToggleTheme}
            className={`flex items-center space-x-1.5 text-[11px] font-bold px-2.5 py-1 rounded-xl border ${
              isLight ? 'bg-white border-sky-200 text-sky-950 shadow-sm' : 'bg-slate-800 border-slate-700 text-sky-300'
            }`}
          >
            {isLight ? <Sun className="h-3.5 w-3.5 text-sky-400" /> : <Moon className="h-3.5 w-3.5 text-sky-400" />}
            <span>{isLight ? t.lightMode : t.darkMode}</span>
          </button>

          <span className={`text-[10px] font-mono font-extrabold ${
            isLight ? 'text-sky-600' : 'text-sky-400'
          }`}>
            {language}
          </span>
        </div>
      </div>
    </aside>
  );
}
