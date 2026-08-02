import { NextResponse } from 'next/server';
import { getState, saveState, appendAuditLog } from '@/lib/db/store';
import { generatePatchProposal } from '@/lib/engine/codeMatcher';
import { executeBoundaryTestRun } from '@/lib/engine/testRunner';

export async function POST() {
  try {
    const state = getState();
    if (!state.extractedRule) {
      return NextResponse.json({ success: false, error: "No extracted rule available." }, { status: 400 });
    }

    const patchProposal = generatePatchProposal(state.extractedRule);
    const preTestRun = executeBoundaryTestRun(state.currentThreshold, 'pre-patch');

    state.currentPatch = patchProposal;
    state.latestPreTestRun = preTestRun;
    saveState(state);

    appendAuditLog(
      "CODE_PATCH_GENERATED",
      "NiyamPatch Code Matcher",
      `Located affected constant MAX_FAMILY_INCOME in ${patchProposal.targetFile} (Line ${patchProposal.targetLineNumber}). Generated unified diff and ran pre-patch boundary tests (${preTestRun.passedCount}/${preTestRun.total} passed against target ₹3,00,000 threshold).`,
      "info",
      { patchId: patchProposal.id, targetFile: patchProposal.targetFile }
    );

    return NextResponse.json({ success: true, patch: patchProposal, preTestRun, state });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
