import { NextRequest, NextResponse } from 'next/server';
import { extractPolicyRule } from '@/lib/engine/ruleExtractor';
import { getState, saveState, appendAuditLog } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const rawText = body.text;
    const pageNum = body.pageNum || 2;

    const extraction = await extractPolicyRule(rawText, pageNum);

    const state = getState();
    state.extractedRule = extraction.extractedRule;
    saveState(state);

    appendAuditLog(
      "POLICY_RULE_EXTRACTED",
      "NiyamPatch Parser Engine",
      `Extracted rule "${extraction.extractedRule.ruleName}" from Policy Circular (Page ${extraction.extractedRule.sourcePage}). Value revision: ${extraction.extractedRule.oldValue} ➔ ${extraction.extractedRule.newValue} (Confidence: ${(extraction.extractedRule.confidence * 100).toFixed(1)}%).`,
      "info",
      { extraction: extraction.extractedRule, method: extraction.method }
    );

    return NextResponse.json({ success: true, extraction, state });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
