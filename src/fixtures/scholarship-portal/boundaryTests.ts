import { checkIncomeEligibility, MAX_FAMILY_INCOME } from "./eligibilityEngine";

export interface BoundaryTestCase {
  id: string;
  testIncome: number;
  label: string;
  expectedResultOldRule: boolean; // under ₹2,50,000 limit
  expectedResultNewRule: boolean; // under ₹3,00,000 limit
  description: string;
}

export interface TestExecutionResult {
  testId: string;
  income: number;
  label: string;
  passed: boolean;
  actualEligible: boolean;
  targetEligible: boolean;
  appliedThreshold: number;
  detail: string;
}

export const BOUNDARY_TEST_SUITE: BoundaryTestCase[] = [
  {
    id: "test_sub_boundary_249999",
    testIncome: 249999,
    label: "₹2,49,999",
    expectedResultOldRule: true,
    expectedResultNewRule: true,
    description: "Sub-boundary check (1 Rupee below old ₹2.5L limit) - Must remain Eligible"
  },
  {
    id: "test_exact_old_boundary_250000",
    testIncome: 250000,
    label: "₹2,50,000",
    expectedResultOldRule: true,
    expectedResultNewRule: true,
    description: "Exact old boundary limit - Must remain Eligible"
  },
  {
    id: "test_mid_tier_revised_280000",
    testIncome: 280000,
    label: "₹2,80,000",
    expectedResultOldRule: false,
    expectedResultNewRule: true,
    description: "Revised eligibility tier (Middle income between ₹2.5L & ₹3.0L)"
  },
  {
    id: "test_exact_new_boundary_300000",
    testIncome: 300000,
    label: "₹3,00,000",
    expectedResultOldRule: false,
    expectedResultNewRule: true,
    description: "Exact new policy ceiling (Upper limit of revised circular)"
  },
  {
    id: "test_above_new_boundary_300001",
    testIncome: 300001,
    label: "₹3,00,001",
    expectedResultOldRule: false,
    expectedResultNewRule: false,
    description: "Super-boundary check (1 Rupee above revised ₹3.0L ceiling) - Must fail eligibility"
  }
];

/**
 * Runs executable boundary test suite against current live state of eligibilityEngine.ts.
 * targetPhase: 'pre-patch' (expecting target ₹3L behavior, showing fails under old ₹2.5L rule) 
 * or 'post-patch' (verifying new ₹3L rule compliance).
 */
export function runBoundaryTests(targetPhase: 'pre-patch' | 'post-patch'): {
  phase: string;
  currentThreshold: number;
  total: number;
  passedCount: number;
  failedCount: number;
  results: TestExecutionResult[];
} {
  const results: TestExecutionResult[] = [];
  let passedCount = 0;

  for (const tc of BOUNDARY_TEST_SUITE) {
    const res = checkIncomeEligibility(tc.testIncome);
    // Target expectation for post-patch is target expectation under new rule;
    // For pre-patch, target expectation is new policy compliance (which will show failures on ₹2.8L and ₹3.0L until patch is applied).
    const targetEligible = tc.expectedResultNewRule;
    const passed = res.isEligible === targetEligible;

    if (passed) passedCount++;

    results.push({
      testId: tc.id,
      income: tc.testIncome,
      label: tc.label,
      passed,
      actualEligible: res.isEligible,
      targetEligible,
      appliedThreshold: res.thresholdApplied,
      detail: res.reason
    });
  }

  return {
    phase: targetPhase,
    currentThreshold: MAX_FAMILY_INCOME,
    total: BOUNDARY_TEST_SUITE.length,
    passedCount,
    failedCount: BOUNDARY_TEST_SUITE.length - passedCount,
    results
  };
}
