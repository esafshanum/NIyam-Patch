import { BOUNDARY_TEST_SUITE } from "@/fixtures/scholarship-portal/boundaryTests";
import { TestSuiteRun } from "@/lib/db/store";

/**
 * Runs executable boundary tests against specified income limit threshold.
 */
export function executeBoundaryTestRun(
  currentThreshold: number,
  phase: 'pre-patch' | 'post-patch'
): TestSuiteRun {
  const results = [];
  let passedCount = 0;

  for (const tc of BOUNDARY_TEST_SUITE) {
    // Evaluation logic using current active threshold
    const actualEligible = tc.testIncome <= currentThreshold;
    // Target expectation under revised policy (₹3,00,000)
    const targetEligible = tc.expectedResultNewRule;

    const passed = actualEligible === targetEligible;
    if (passed) passedCount++;

    const formattedIncome = tc.testIncome.toLocaleString('en-IN');
    const formattedThreshold = currentThreshold.toLocaleString('en-IN');

    let detail = "";
    if (actualEligible) {
      detail = `Income ₹${formattedIncome} ≤ Threshold ₹${formattedThreshold} (Eligible)`;
    } else {
      detail = `Income ₹${formattedIncome} > Threshold ₹${formattedThreshold} (Ineligible)`;
    }

    results.push({
      testId: tc.id,
      income: tc.testIncome,
      label: tc.label,
      passed,
      actualEligible,
      targetEligible,
      appliedThreshold: currentThreshold,
      detail
    });
  }

  return {
    runId: `run_${phase}_${Date.now()}`,
    phase,
    timestamp: new Date().toISOString(),
    currentThreshold,
    total: BOUNDARY_TEST_SUITE.length,
    passedCount,
    failedCount: BOUNDARY_TEST_SUITE.length - passedCount,
    results
  };
}
