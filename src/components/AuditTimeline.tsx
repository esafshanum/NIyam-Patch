'use client';

import React from 'react';
import { History, Clock, FileText } from 'lucide-react';
import { AuditLogEntry } from '@/lib/db/store';

interface AuditTimelineProps {
  logs: AuditLogEntry[];
  theme?: 'dark' | 'light';
  onOpenReport?: () => void;
}

export function AuditTimeline({ logs, theme = 'dark', onOpenReport }: AuditTimelineProps) {
  const isLight = theme === 'light';

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
            <History className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold flex items-center gap-2">
              Auditable Policy-to-Code Event Timeline
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                isLight ? 'bg-slate-200 text-slate-700 border-slate-300' : 'bg-slate-800 text-slate-300 border-slate-700'
              }`}>
                {logs.length} Logged Events
              </span>
            </h2>
            <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-slate-400'}`}>Immutable Compliance & Approval Audit Trail</p>
          </div>
        </div>

        {onOpenReport && (
          <button
            onClick={onOpenReport}
            className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Export Report</span>
          </button>
        )}
      </div>

      {/* Main Timeline List */}
      <div className="p-5 flex-1 overflow-y-auto max-h-96 space-y-4">
        {logs.length === 0 ? (
          <p className="text-xs text-slate-500 text-center py-6">No audit log entries recorded yet.</p>
        ) : (
          <div className={`relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 ${
            isLight ? 'before:bg-slate-200' : 'before:bg-slate-800'
          }`}>
            {logs.map((log) => {
              const isSuccess = log.badgeType === 'success';
              const isWarning = log.badgeType === 'warning';

              return (
                <div key={log.id} className="relative group">
                  {/* Timeline Icon Node */}
                  <div className={`absolute -left-6 top-0.5 h-5 w-5 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                    isSuccess
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-600'
                      : isWarning
                      ? 'bg-amber-500/20 border-amber-500 text-amber-600'
                      : 'bg-slate-500/20 border-slate-400 text-slate-500'
                  }`}>
                    {isSuccess ? '✓' : '!'}
                  </div>

                  {/* Log Content Card */}
                  <div className={`border rounded-lg p-3.5 text-xs space-y-1.5 transition-colors ${
                    isLight ? 'bg-slate-50 border-slate-200 hover:border-slate-300' : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold flex items-center gap-2">
                        {log.action}
                        <span className={`text-[10px] font-semibold px-2 py-0.2 rounded border ${
                          isSuccess
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'
                            : isWarning
                            ? 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                            : 'bg-slate-200 text-slate-700 border-slate-300'
                        }`}>
                          {log.actor}
                        </span>
                      </span>
                      <span className={`text-[10px] font-mono flex items-center gap-1 ${isLight ? 'text-slate-500' : 'text-slate-500'}`}>
                        <Clock className="h-3 w-3" />
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </span>
                    </div>

                    <p className={`text-[11px] leading-relaxed ${isLight ? 'text-slate-700' : 'text-slate-300'}`}>
                      {log.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
