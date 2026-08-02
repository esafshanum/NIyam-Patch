import { NextResponse } from 'next/server';
import { getState } from '@/lib/db/store';

export async function GET() {
  const state = getState();
  return NextResponse.json({ success: true, auditLogs: state.auditLogs });
}
