/**
 * Scholarship Eligibility Rule Engine - Demo Portal Repository Fixture
 * File Path: src/fixtures/scholarship-portal/eligibilityEngine.ts
 *
 * This module enforces state policy constraints for student scholarship applications.
 */

// POLICY RULE: Annual Family Income Limit (in INR)
// Circular Reference: Govt of MP Higher Education Dept
export const MAX_FAMILY_INCOME = 250000;

export interface ApplicationInput {
  studentId: string;
  studentName: string;
  annualFamilyIncome: number;
  courseCategory: string;
  minimumMarksPercent: number;
}

export interface EligibilityResult {
  isEligible: boolean;
  ruleName: string;
  thresholdApplied: number;
  actualIncome: number;
  reason: string;
  policyReference: string;
  evaluatedAt: string;
}

/**
 * Checks applicant eligibility against the annual family income threshold.
 */
export function checkIncomeEligibility(annualIncome: number): EligibilityResult {
  const isEligible = annualIncome <= MAX_FAMILY_INCOME;
  const formattedIncome = annualIncome.toLocaleString('en-IN');
  const formattedLimit = MAX_FAMILY_INCOME.toLocaleString('en-IN');

  return {
    isEligible,
    ruleName: "Annual Family Income Limit",
    thresholdApplied: MAX_FAMILY_INCOME,
    actualIncome: annualIncome,
    reason: isEligible
      ? `Income ₹${formattedIncome} is within maximum eligible ceiling of ₹${formattedLimit}.`
      : `Income ₹${formattedIncome} exceeds maximum ceiling of ₹${formattedLimit}.`,
    policyReference: "MP Higher Education Scholarship Guidelines - Rule 4.1",
    evaluatedAt: new Date().toISOString()
  };
}
