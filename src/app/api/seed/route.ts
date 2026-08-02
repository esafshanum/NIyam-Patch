import { NextResponse } from 'next/server';
import { resetState, getState } from '@/lib/db/store';
import { executeBoundaryTestRun } from '@/lib/engine/testRunner';

export async function POST() {
  const state = resetState();
  // Ensure pre-patch test run is computed
  state.latestPreTestRun = executeBoundaryTestRun(state.currentThreshold, 'pre-patch');
  return NextResponse.json({ success: true, state });
}

export async function GET() {
  const state = getState();
  if (!state.latestPreTestRun) {
    state.latestPreTestRun = executeBoundaryTestRun(state.currentThreshold, 'pre-patch');
  }
  return NextResponse.json({ success: true, state });
}
