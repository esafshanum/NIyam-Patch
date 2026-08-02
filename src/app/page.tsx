'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { LoginScreen } from '@/components/LoginScreen';
import { ExecutiveDashboard } from '@/components/ExecutiveDashboard';
import { PolicyIngestionCard } from '@/components/PolicyIngestionCard';
import { ExtractionEvidenceCard } from '@/components/ExtractionEvidenceCard';
import { CodeDiffViewer } from '@/components/CodeDiffViewer';
import { BoundaryTestMatrix } from '@/components/BoundaryTestMatrix';
import { HumanApprovalGate } from '@/components/HumanApprovalGate';
import { LivePortalWidget } from '@/components/LivePortalWidget';
import { DualPortalSimulator } from '@/components/DualPortalSimulator';
import { CodexThoughtStream } from '@/components/CodexThoughtStream';
import { AuditTimeline } from '@/components/AuditTimeline';
import { NiyamChatbot } from '@/components/NiyamChatbot';
import { AuditReportModal } from '@/components/AuditReportModal';
import { SEEDED_SCHOLARSHIP_CIRCULAR } from '@/fixtures/policyCirculars/scholarship_income_2026';
import { Sun, Moon, Languages } from 'lucide-react';
import { Language, translations } from '@/lib/i18n';

export default function WebAppPage() {
  // LANDING SECURITY GATE: Defaults to false so user starts on the Sign In page!
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<{ name: string; role: string; email: string } | null>(null);

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [currentStep, setCurrentStep] = useState<number>(1);
  
  // DEFAULT THEME IS LIGHT MODE IN PURE PASTEL BABY BLUE & WHITE PALETTE!
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [globalLanguage, setGlobalLanguage] = useState<Language>('EN');
  const [showReportModal, setShowReportModal] = useState<boolean>(false);
  const [state, setState] = useState<any>(null);

  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isExtracting, setIsExtracting] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isTesting, setIsTesting] = useState<boolean>(false);
  const [isApplying, setIsApplying] = useState<boolean>(false);

  useEffect(() => {
    fetchInitialState();
  }, []);

  const fetchInitialState = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/seed');
      const data = await res.json();
      if (data.success) {
        setState(data.state);
      }
    } catch (err) {
      console.error('Failed to load state:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handle1ClickDemo = async () => {
    setIsSyncing(true);
    try {
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setState(data.state);
        setCurrentStep(1);
        setActiveTab('ingest');
      }
    } catch (err) {
      console.error('Failed to trigger 1-click demo:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExtractRule = async (text?: string, pageNum?: number) => {
    setIsExtracting(true);
    try {
      const res = await fetch('/api/policy/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, pageNum })
      });
      const data = await res.json();
      if (data.success) {
        setState(data.state);
        setCurrentStep(2);
      }
    } catch (err) {
      console.error('Failed to extract policy rule:', err);
    } finally {
      setIsExtracting(false);
    }
  };

  const handleGeneratePatch = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/patch/generate', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setState(data.state);
        setCurrentStep(3);
        setActiveTab('diff');
      }
    } catch (err) {
      console.error('Failed to generate patch proposal:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRunBoundaryTests = async () => {
    setIsTesting(true);
    try {
      const res = await fetch('/api/patch/generate', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setState(data.state);
        setCurrentStep(4);
        setActiveTab('tests');
      }
    } catch (err) {
      console.error('Failed to run boundary tests:', err);
    } finally {
      setIsTesting(false);
    }
  };

  const handleApprovePatch = async (approverName: string) => {
    setIsApplying(true);
    try {
      const res = await fetch('/api/patch/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve', approverName })
      });
      const data = await res.json();
      if (data.success) {
        setState(data.state);
        setCurrentStep(5);
        setActiveTab('safety');
      }
    } catch (err) {
      console.error('Failed to approve patch:', err);
    } finally {
      setIsApplying(false);
    }
  };

  const handleRejectPatch = async (reason: string) => {
    setIsApplying(true);
    try {
      const res = await fetch('/api/patch/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', reason })
      });
      const data = await res.json();
      if (data.success) {
        setState(data.state);
      }
    } catch (err) {
      console.error('Failed to reject patch:', err);
    } finally {
      setIsApplying(false);
    }
  };

  const handleLogin = (name: string, role: string, email: string) => {
    setUser({ name, role, email });
    setIsLoggedIn(true);
  };

  const handleDemoLogin = () => {
    setUser({
      name: 'Dr. A. K. Varma',
      role: 'Senior Policy Administrator',
      email: 'admin@higheredu.mp.gov.in'
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const isPatched = state?.isPatched || false;
  const currentThreshold = state?.currentThreshold || 250000;
  const isLight = theme === 'light';
  const t = translations[globalLanguage] || translations.EN;

  // If not logged in, render Government Officer Security Sign In Portal FIRST in PASTEL BABY BLUE LIGHT MODE!
  if (!isLoggedIn) {
    return (
      <LoginScreen
        onLogin={handleLogin}
        onDemoLogin={handleDemoLogin}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    );
  }

  return (
    <div className={`min-h-screen flex font-sans transition-colors ${
      isLight ? 'bg-sky-50 text-slate-900' : 'bg-slate-950 text-slate-100'
    }`}>
      {/* Sidebar Navigation with Full i18n Language Prop */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={(tab) => setActiveTab(tab)}
        user={user}
        onLogout={handleLogout}
        theme={theme}
        onToggleTheme={toggleTheme}
        isPatched={isPatched}
        onLoadDemo={handle1ClickDemo}
        onOpenReport={() => setShowReportModal(true)}
        language={globalLanguage}
      />

      {/* Main Web App Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Operational Action Bar */}
        <header className={`border-b px-6 py-3.5 flex flex-wrap items-center justify-between gap-4 transition-colors sticky top-0 z-30 ${
          isLight ? 'bg-white border-sky-100 text-slate-900 shadow-xs' : 'bg-slate-900 border-slate-800 text-slate-100'
        }`}>
          <div className="flex items-center space-x-3">
            <span className="bg-sky-400 text-white font-black text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
              {t.securityGateActive}
            </span>
            <h2 className={`text-xs font-black truncate ${
              isLight ? 'text-sky-950' : 'text-white'
            }`}>
              {activeTab === 'dashboard' && t.dashboardTitle}
              {activeTab === 'ingest' && t.policyIngestion}
              {activeTab === 'diff' && t.codeDiff}
              {activeTab === 'tests' && t.boundaryTests}
              {activeTab === 'safety' && t.humanGate}
              {activeTab === 'audit' && t.auditLogs}
            </h2>
          </div>

          {/* Global Controls */}
          <div className="flex items-center space-x-3 text-xs flex-wrap">
            
            {/* Global Vernacular Language Selector */}
            <div className={`flex items-center space-x-1 p-1 rounded-2xl border ${
              isLight ? 'bg-sky-50 border-sky-200' : 'bg-slate-800 border-slate-700'
            }`}>
              <Languages className="h-3.5 w-3.5 text-sky-400 ml-1.5" />
              <button
                onClick={() => setGlobalLanguage('EN')}
                className={`px-2.5 py-0.5 text-xs font-extrabold rounded-xl transition-colors ${
                  globalLanguage === 'EN'
                    ? 'bg-sky-400 text-white shadow-xs'
                    : isLight
                    ? 'text-sky-950 hover:text-sky-600'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                English
              </button>
              <button
                onClick={() => setGlobalLanguage('HI')}
                className={`px-2.5 py-0.5 text-xs font-extrabold rounded-xl transition-colors ${
                  globalLanguage === 'HI'
                    ? 'bg-sky-400 text-white shadow-xs'
                    : isLight
                    ? 'text-sky-950 hover:text-sky-600'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                हिंदी
              </button>
              <button
                onClick={() => setGlobalLanguage('MR')}
                className={`px-2.5 py-0.5 text-xs font-extrabold rounded-xl transition-colors ${
                  globalLanguage === 'MR'
                    ? 'bg-sky-400 text-white shadow-xs'
                    : isLight
                    ? 'text-sky-950 hover:text-sky-600'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                मराठी
              </button>
            </div>

            {/* Light / Dark Theme Switcher Button */}
            <button
              onClick={toggleTheme}
              className={`flex items-center space-x-1.5 font-bold px-3 py-1.5 rounded-2xl border transition-all shadow-xs ${
                isLight
                  ? 'bg-white hover:bg-sky-100 text-sky-950 border-sky-200'
                  : 'bg-slate-800 hover:bg-slate-700 text-sky-300 border-slate-700'
              }`}
            >
              {isLight ? (
                <>
                  <Sun className="h-4 w-4 text-sky-400" />
                  <span>{t.lightMode}</span>
                </>
              ) : (
                <>
                  <Moon className="h-4 w-4 text-sky-400" />
                  <span>{t.darkMode}</span>
                </>
              )}
            </button>

            {/* Active Threshold Indicator */}
            <span className={`px-3 py-1.5 rounded-2xl border font-mono font-black ${
              isPatched
                ? isLight ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                : isLight ? 'bg-sky-100 text-sky-950 border-sky-300' : 'bg-sky-500/20 text-sky-300 border-sky-500/30'
            }`}>
              {t.activeCeiling}: ₹{currentThreshold.toLocaleString('en-IN')}
            </span>
          </div>
        </header>

        {/* Workspace Body */}
        <main className={`p-6 flex-1 max-w-7xl w-full mx-auto space-y-6 transition-colors ${
          isLight ? 'bg-sky-50/70' : 'bg-slate-950'
        }`}>
          
          {/* Hackathon Banner */}
          <div className={`border rounded-2xl p-3 text-xs flex flex-col sm:flex-row items-center justify-between gap-2 shadow-xs ${
            isLight
              ? 'bg-white border-sky-200 text-sky-950'
              : 'bg-slate-900 border-slate-800 text-slate-200'
          }`}>
            <div className="flex items-center space-x-2">
              <span className="bg-sky-400 text-white font-black px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-wider">
                {t.hackathonBannerTitle}
              </span>
              <span>
                {t.hackathonBannerDesc}
              </span>
            </div>
            <div className={`text-[11px] font-mono font-bold ${
              isLight ? 'text-sky-700' : 'text-sky-300'
            }`}>
              {t.activeLanguage}: <strong className="text-sky-400">{globalLanguage === 'MR' ? 'मराठी' : globalLanguage === 'HI' ? 'हिंदी' : 'English'}</strong>
            </div>
          </div>

          {/* Codex Agentic Execution & Reasoning Stream Drawer */}
          <CodexThoughtStream
            currentStep={currentStep}
            extractedRule={state?.extractedRule}
            patch={state?.currentPatch}
            preTestRun={state?.latestPreTestRun}
            isPatched={isPatched}
            theme={theme}
          />

          {/* TAB 1: EXECUTIVE DASHBOARD */}
          {activeTab === 'dashboard' && (
            <ExecutiveDashboard
              state={state}
              onSelectTab={(tab) => setActiveTab(tab)}
              onLoadDemo={handle1ClickDemo}
              onOpenReport={() => setShowReportModal(true)}
              theme={theme}
              language={globalLanguage}
            />
          )}

          {/* TAB 2: INGESTION & EVIDENCE */}
          {activeTab === 'ingest' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-7">
                <PolicyIngestionCard
                  circular={state?.circular || SEEDED_SCHOLARSHIP_CIRCULAR}
                  onExtract={handleExtractRule}
                  isExtracting={isExtracting}
                  theme={theme}
                  language={globalLanguage}
                  onSelectLanguage={(lang) => setGlobalLanguage(lang)}
                />
              </div>
              <div className="lg:col-span-5">
                <ExtractionEvidenceCard
                  extractedRule={state?.extractedRule}
                  onGeneratePatch={handleGeneratePatch}
                  isGenerating={isGenerating}
                  theme={theme}
                />
              </div>
            </div>
          )}

          {/* TAB 3: CODE DIFF & PR HUB */}
          {activeTab === 'diff' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <CodeDiffViewer
                  patch={state?.currentPatch}
                  onRunPreTests={handleRunBoundaryTests}
                  isTesting={isTesting}
                  theme={theme}
                />
              </div>
              <div className="lg:col-span-4 space-y-6">
                <LivePortalWidget
                  isPatched={isPatched}
                  currentThreshold={currentThreshold}
                  theme={theme}
                />
              </div>
            </div>
          )}

          {/* TAB 4: BOUNDARY TEST MATRIX */}
          {activeTab === 'tests' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <BoundaryTestMatrix
                  preTestRun={state?.latestPreTestRun}
                  postTestRun={state?.latestPostTestRun}
                  isPatched={isPatched}
                  onRunTests={handleRunBoundaryTests}
                  isTesting={isTesting}
                  theme={theme}
                />
              </div>
              <div className="lg:col-span-4">
                <LivePortalWidget
                  isPatched={isPatched}
                  currentThreshold={currentThreshold}
                  theme={theme}
                />
              </div>
            </div>
          )}

          {/* TAB 5: HUMAN GATE & SIMULATOR */}
          {activeTab === 'safety' && (
            <div className="space-y-6">
              <HumanApprovalGate
                patch={state?.currentPatch}
                isPatched={isPatched}
                onApprovePatch={handleApprovePatch}
                onRejectPatch={handleRejectPatch}
                isApplying={isApplying}
                theme={theme}
              />

              <DualPortalSimulator
                isPatched={isPatched}
                currentThreshold={currentThreshold}
                theme={theme}
              />
            </div>
          )}

          {/* TAB 6: AUDIT LOGS & REPORTS */}
          {activeTab === 'audit' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8">
                <AuditTimeline
                  logs={state?.auditLogs || []}
                  theme={theme}
                  onOpenReport={() => setShowReportModal(true)}
                />
              </div>
              <div className="lg:col-span-4">
                <LivePortalWidget
                  isPatched={isPatched}
                  currentThreshold={currentThreshold}
                  theme={theme}
                />
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Floating AI Chatbot Assistant */}
      <NiyamChatbot theme={theme} language={globalLanguage} />

      {/* Audit Report Modal */}
      {showReportModal && (
        <AuditReportModal
          state={state}
          onClose={() => setShowReportModal(false)}
        />
      )}
    </div>
  );
}
