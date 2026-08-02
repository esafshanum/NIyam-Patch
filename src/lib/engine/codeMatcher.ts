import * as diff from 'diff';
import { ExtractedRule, PatchProposal } from '@/lib/db/store';

export function generatePatchProposal(rule: ExtractedRule): PatchProposal {
  const targetFile = rule.affectedFile;
  const targetSymbol = rule.affectedSymbol;
  const oldVal = rule.numericOldValue;
  const newVal = rule.numericNewValue;

  const oldCodeSnippet = `export const ${targetSymbol} = ${oldVal};`;
  const newCodeSnippet = `export const ${targetSymbol} = ${newVal};`;

  const oldFull = `/**
 * Scholarship Eligibility Rule Engine - Demo Portal Repository Fixture
 * File Path: ${targetFile}
 *
 * This module enforces state policy constraints for student scholarship applications.
 */

// POLICY RULE: Annual Family Income Limit (in INR)
// Circular Reference: Govt of MP Higher Education Dept
${oldCodeSnippet}
`;

  const newFull = `/**
 * Scholarship Eligibility Rule Engine - Demo Portal Repository Fixture
 * File Path: ${targetFile}
 *
 * This module enforces state policy constraints for student scholarship applications.
 */

// POLICY RULE: Annual Family Income Limit (in INR)
// Circular Reference: Govt of MP Higher Education Dept
${newCodeSnippet}
`;

  const unifiedDiff = diff.createTwoFilesPatch(
    `a/${targetFile}`,
    `b/${targetFile}`,
    oldFull,
    newFull,
    'Baseline Commit',
    'Proposed Policy Revision'
  );

  return {
    id: `patch_${rule.affectedSymbol.toLowerCase()}_${Date.now()}`,
    ruleName: rule.ruleName,
    targetFile,
    targetLineNumber: 9,
    oldCodeSnippet,
    newCodeSnippet,
    unifiedDiff,
    status: 'pending',
    proposedAt: new Date().toISOString()
  };
}
