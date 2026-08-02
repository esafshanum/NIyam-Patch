import { NextRequest, NextResponse } from 'next/server';
import { getState } from '@/lib/db/store';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const annualIncome = Number(body.annualIncome) || 280000;
    const studentName = body.studentName || "Rohan Sharma";
    const course = body.course || "B.Tech Computer Science & Engineering";

    const state = getState();
    const currentLimit = state.currentThreshold;
    const isEligible = annualIncome <= currentLimit;

    const formattedIncome = annualIncome.toLocaleString('en-IN');
    const formattedLimit = currentLimit.toLocaleString('en-IN');

    return NextResponse.json({
      success: true,
      studentName,
      course,
      annualIncome,
      formattedIncome: `₹${formattedIncome}`,
      thresholdApplied: currentLimit,
      formattedThreshold: `₹${formattedLimit}`,
      isEligible,
      isPatched: state.isPatched,
      statusMessage: isEligible
        ? `APPLICATION APPROVED: Family annual income ₹${formattedIncome} is within the active state eligibility ceiling of ₹${formattedLimit}.`
        : `APPLICATION REJECTED: Family annual income ₹${formattedIncome} exceeds the active state eligibility ceiling of ₹${formattedLimit}.`,
      appliedPolicyReference: state.isPatched
        ? "MP Govt Circular F-12/302/2026/38-1 (Revised Income Ceiling: ₹3,00,000)"
        : "MP Higher Education Scheme Guidelines 2021 (Baseline Ceiling: ₹2,50,000)",
      evaluatedAt: new Date().toISOString()
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
