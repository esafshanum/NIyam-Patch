import { NextRequest, NextResponse } from 'next/server';
import { getState } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userMessage = (body.message || "").trim();
    const lower = userMessage.toLowerCase();

    const state = getState();
    const isPatched = state.isPatched;
    const currentLimit = state.currentThreshold;

    let reply = "";

    if (lower.includes("income") || lower.includes("limit") || lower.includes("threshold") || lower.includes("आय") || lower.includes("उत्पन्न")) {
      reply = `Under Policy Circular #HE/2026/302 (Clause 4.1), the annual family income ceiling is revised from ₹2,50,000 to ₹3,00,000 per year. Currently, the live portal is running on threshold ₹${currentLimit.toLocaleString('en-IN')}${isPatched ? ' (Patched & Approved)' : ' (Baseline)'}.`;
    } else if (lower.includes("human") || lower.includes("approval") || lower.includes("gate") || lower.includes("safety")) {
      reply = `NiyamPatch enforces a mandatory Human Approval Gate. AI extracts legal rules and generates code diffs, but code modifications require explicit sign-off by a designated policy administrator to prevent silent production breaking changes.`;
    } else if (lower.includes("test") || lower.includes("boundary") || lower.includes("2.8") || lower.includes("280000")) {
      reply = `The boundary test matrix evaluates 5 critical income values: ₹2,49,999, ₹2,50,000, ₹2,80,000, ₹3,00,000, and ₹3,00,001. An income of ₹2,80,000 fails under the old ₹2.5L rule, but passes 5/5 under the new ₹3.0L rule.`;
    } else if (lower.includes("marathi") || lower.includes("मराठी") || lower.includes("हिंदी") || lower.includes("hindi")) {
      reply = `NiyamPatch supports multi-lingual Indian public service navigation in English, Hindi (हिंदी), and Marathi (मराठी). You can switch languages at the top of the Policy Ingestion Card.`;
    } else {
      reply = `NiyamPatch AI Policy Assistant: I can help answer questions regarding Policy Circular #HE/2026/302, legal evidence extraction, code patch safety gates, boundary test runs, or Indic vernacular translations (English, Hindi, Marathi). What would you like to know?`;
    }

    return NextResponse.json({
      success: true,
      reply,
      timestamp: new Date().toISOString()
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
