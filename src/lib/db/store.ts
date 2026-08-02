import fs from 'fs';
import path from 'path';
import { SEEDED_SCHOLARSHIP_CIRCULAR } from '@/fixtures/policyCirculars/scholarship_income_2026';

export interface ExtractedRule {
  ruleName: string;
  oldValue: string | number;
  newValue: string | number;
  numericOldValue: number;
  numericNewValue: number;
  effectiveDate: string;
  confidence: number;
  sourcePage: number;
  sourceExcerpt: string;
  affectedFile: string;
  affectedSymbol: string;
}

export interface PatchProposal {
  id: string;
  ruleName: string;
  targetFile: string;
  targetLineNumber: number;
  oldCodeSnippet: string;
  newCodeSnippet: string;
  unifiedDiff: string;
  status: 'pending' | 'approved' | 'rejected';
  proposedAt: string;
  approvedAt?: string;
  approvedBy?: string;
  rejectionReason?: string;
}

export interface TestSuiteRun {
  runId: string;
  phase: 'pre-patch' | 'post-patch';
  timestamp: string;
  currentThreshold: number;
  total: number;
  passedCount: number;
  failedCount: number;
  results: Array<{
    testId: string;
    income: number;
    label: string;
    passed: boolean;
    actualEligible: boolean;
    targetEligible: boolean;
    appliedThreshold: number;
    detail: string;
  }>;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  badgeType: 'info' | 'success' | 'warning' | 'error';
  details: string;
  metadata?: Record<string, unknown>;
}

export interface NiyamPatchState {
  currentThreshold: number; // 250000 or 300000
  isPatched: boolean;
  circular: typeof SEEDED_SCHOLARSHIP_CIRCULAR | null;
  extractedRule: ExtractedRule | null;
  currentPatch: PatchProposal | null;
  latestPreTestRun: TestSuiteRun | null;
  latestPostTestRun: TestSuiteRun | null;
  auditLogs: AuditLogEntry[];
}

const DATA_DIR = path.join(process.cwd(), 'data');
const STATE_FILE = path.join(DATA_DIR, 'niyampatch_state.json');

const INITIAL_STATE: NiyamPatchState = {
  currentThreshold: 250000,
  isPatched: false,
  circular: SEEDED_SCHOLARSHIP_CIRCULAR,
  extractedRule: {
    ruleName: "Annual Family Income Eligibility Limit",
    oldValue: "₹2,50,000",
    newValue: "₹3,00,000",
    numericOldValue: 250000,
    numericNewValue: 300000,
    effectiveDate: "2026-04-01",
    confidence: 0.994,
    sourcePage: 2,
    sourceExcerpt: "Clause 4.1 of Scheme Guidelines 2021: The upper ceiling for annual family income for eligibility under the Mukhyamantri Medhavi Vidyarthi Scheme is hereby revised from Rs. 2,50,000 (Two Lakh Fifty Thousand) to Rs. 3,00,000 (Three Lakhs) with effect from 1st April 2026.",
    affectedFile: "src/fixtures/scholarship-portal/eligibilityEngine.ts",
    affectedSymbol: "MAX_FAMILY_INCOME"
  },
  currentPatch: {
    id: "patch_mmvy_income_2026",
    ruleName: "Annual Family Income Eligibility Limit",
    targetFile: "src/fixtures/scholarship-portal/eligibilityEngine.ts",
    targetLineNumber: 9,
    oldCodeSnippet: "export const MAX_FAMILY_INCOME = 250000;",
    newCodeSnippet: "export const MAX_FAMILY_INCOME = 300000;",
    unifiedDiff: `--- a/src/fixtures/scholarship-portal/eligibilityEngine.ts
+++ b/src/fixtures/scholarship-portal/eligibilityEngine.ts
@@ -8,3 +8,3 @@
 // POLICY RULE: Annual Family Income Limit (in INR)
-export const MAX_FAMILY_INCOME = 250000;
+export const MAX_FAMILY_INCOME = 300000;`,
    status: "pending",
    proposedAt: new Date().toISOString()
  },
  latestPreTestRun: null,
  latestPostTestRun: null,
  auditLogs: [
    {
      id: "log_init_001",
      timestamp: new Date().toISOString(),
      action: "SYSTEM_INITIALIZED",
      actor: "NiyamPatch System",
      badgeType: "info",
      details: "NiyamPatch Operational Cockpit initialized with baseline portal threshold ₹2,50,000."
    }
  ]
};

function ensureDataDirExists() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

export function getState(): NiyamPatchState {
  try {
    ensureDataDirExists();
    if (!fs.existsSync(STATE_FILE)) {
      saveState(INITIAL_STATE);
      return INITIAL_STATE;
    }
    const raw = fs.readFileSync(STATE_FILE, 'utf-8');
    return JSON.parse(raw) as NiyamPatchState;
  } catch (err) {
    console.error("Failed to read state, resetting to initial state:", err);
    return INITIAL_STATE;
  }
}

export function saveState(newState: NiyamPatchState): void {
  try {
    ensureDataDirExists();
    fs.writeFileSync(STATE_FILE, JSON.stringify(newState, null, 2), 'utf-8');
  } catch (err) {
    console.error("Failed to write state file:", err);
  }
}

export function resetState(): NiyamPatchState {
  const freshState: NiyamPatchState = {
    ...INITIAL_STATE,
    currentThreshold: 250000,
    isPatched: false,
    currentPatch: {
      ...INITIAL_STATE.currentPatch!,
      status: "pending",
      proposedAt: new Date().toISOString()
    },
    latestPreTestRun: null,
    latestPostTestRun: null,
    auditLogs: [
      {
        id: `log_reset_${Date.now()}`,
        timestamp: new Date().toISOString(),
        action: "DEMO_STATE_RESET",
        actor: "System Administrator",
        badgeType: "warning",
        details: "1-Click Demo state reset to initial baseline: Portal threshold ₹2,50,000, patch pending approval."
      }
    ]
  };
  saveState(freshState);
  return freshState;
}

export function appendAuditLog(action: string, actor: string, details: string, badgeType: 'info' | 'success' | 'warning' | 'error' = 'info', metadata?: Record<string, unknown>) {
  const state = getState();
  const newLog: AuditLogEntry = {
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    action,
    actor,
    badgeType,
    details,
    metadata
  };
  state.auditLogs.unshift(newLog);
  saveState(state);
  return newLog;
}
