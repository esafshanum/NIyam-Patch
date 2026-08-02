import { NextRequest, NextResponse } from 'next/server';
import { applyApprovedPatch, rejectPatch } from '@/lib/engine/patchManager';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const action = body.action || 'approve'; // 'approve' or 'reject'
    const approverName = body.approverName || 'Policy Operations Administrator';
    const reason = body.reason || 'Manual administrative rejection';

    if (action === 'reject') {
      const state = rejectPatch(reason, approverName);
      return NextResponse.json({ success: true, action: 'rejected', state });
    }

    const state = applyApprovedPatch(approverName);
    return NextResponse.json({ success: true, action: 'approved', state });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
