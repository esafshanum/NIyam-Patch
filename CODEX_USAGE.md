# Codex Usage & Engineering Process | NiyamPatch

This document outlines how AI-assisted engineering and Codex workflows were leveraged throughout the end-to-end development of **NiyamPatch** for the hackathon submission.

---

## 1. System Planning & Architecture Design
- **Prompting & Schema Definition**: Designed the visual policy-to-code evidence chain architecture connecting PDF document pages to structured JSON schemas, target code symbols, unified diffs, boundary test runners, and live portal state.
- **Safety Engineering**: Established the mandatory **Human Safety Gate** pattern to prevent silent code modification.

## 2. Automated Code Generation & Fixture Modeling
- **Seeded Policy Circular Fixture**: Modeled realistic state government policy circulars (`Circular No. F-12/302/2026/38-1`) issued by the Department of Higher Education, MP.
- **Demo Codebase Engine**: Synthesized the `eligibilityEngine.ts` code fixture with typed interfaces (`MAX_FAMILY_INCOME`, `checkIncomeEligibility`).
- **Unified Diff Engine**: Implemented `codeMatcher.ts` using `diff` to format git-standard side-by-side diffs showing exact line additions and deletions.

## 3. Boundary Test Generation
Codex was utilized to synthesize complete executable boundary test matrices for policy thresholds:
- `₹2,49,999` (Sub-boundary check — 1 Rupee below old ₹2.5L limit)
- `₹2,50,000` (Exact old boundary limit)
- `₹2,80,000` (Mid-tier income test — Fails under old ₹2.5L rule, passes under new ₹3.0L rule)
- `₹3,00,000` (Exact revised policy ceiling)
- `₹3,00,001` (Super-boundary check — 1 Rupee above revised ceiling)

## 4. Human Approval Safety Gate & Live Portal Verification
- Built explicit approval & rejection flows requiring administrator credentials and audit logs.
- Engineered the `LivePortalWidget.tsx` interactive applicant checker demonstrating real-time behavioral change post-patch.

## 5. Verification & Iteration
- Executed strict TypeScript type-checking (`npx tsc --noEmit`).
- Performed Next.js production build verification (`npm run build`).
- Validated error states, loading states, and responsive UI layouts across desktop and mobile screens.
