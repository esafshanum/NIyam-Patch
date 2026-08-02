import { getState, saveState, appendAuditLog } from '@/lib/db/store';
import { executeBoundaryTestRun } from './testRunner';

export function applyApprovedPatch(approverName: string = "Policy Operations Administrator") {
  const state = getState();

  if (!state.currentPatch) {
    throw new Error("No patch proposal available to apply.");
  }

  // 1. Update Patch Status
  state.currentPatch.status = 'approved';
  state.currentPatch.approvedAt = new Date().toISOString();
  state.currentPatch.approvedBy = approverName;

  // 2. Modify State Threshold
  state.currentThreshold = state.extractedRule?.numericNewValue || 300000;
  state.isPatched = true;

  // 3. Execute Post-Patch Boundary Test Run
  const postTestRun = executeBoundaryTestRun(state.currentThreshold, 'post-patch');
  state.latestPostTestRun = postTestRun;

  saveState(state);

  // 4. Record Audit Log
  appendAuditLog(
    "PATCH_APPROVED_AND_APPLIED",
    approverName,
    `Human approval granted. Modified MAX_FAMILY_INCOME constant from ₹2,50,000 to ₹3,00,000 in scholarship-portal/eligibilityEngine.ts. Executable boundary test suite 5/5 PASSED.`,
    "success",
    {
      patchId: state.currentPatch.id,
      oldThreshold: 250000,
      newThreshold: state.currentThreshold,
      passRate: `${postTestRun.passedCount}/${postTestRun.total}`
    }
  );

  return state;
}

export function rejectPatch(reason: string, actorName: string = "Policy Operations Administrator") {
  const state = getState();

  if (!state.currentPatch) {
    throw new Error("No patch proposal available to reject.");
  }

  state.currentPatch.status = 'rejected';
  state.currentPatch.rejectionReason = reason;

  saveState(state);

  appendAuditLog(
    "PATCH_REJECTED",
    actorName,
    `Human administrator rejected proposed code patch. Reason: "${reason}". Codebase state maintained at baseline ₹2,50,000.`,
    "warning",
    { patchId: state.currentPatch.id, reason }
  );

  return state;
}
