# NiyamPatch (नियम पैच)

> **A policy circular PDF becomes a human-approved, tested code change.**

NiyamPatch is an auditable policy operations cockpit designed for public-sector and enterprise platforms. It ingests official policy circular documents, extracts structured rule revisions with page-level citations, matches affected code constants in target repositories, generates unified diffs, executes boundary test matrices, and enforces mandatory human approval before applying changes to live portals.

---

## 🌟 Core Features & Visual Evidence Chain

1. **Policy Circular Ingestion**: Ingests gazette circular PDFs / text documents with page-level navigation and syntax-highlighted excerpts.
2. **Structured Rule Extraction**: Parses policy text into structured JSON (Old Value: ₹2,50,000 ➔ New Value: ₹3,00,000, Effective Date: 2026-04-01, Confidence: 99.4%, Source Page: 2).
3. **Target Code Matching & Unified Diff**: Locates matching rule constants in `scholarship-portal/eligibilityEngine.ts` (`MAX_FAMILY_INCOME`) and generates side-by-side unified diffs.
4. **Executable Boundary Testing**: Runs real TypeScript boundary unit tests for **₹2,49,999**, **₹2,50,000**, **₹2,80,000**, **₹3,00,000**, and **₹3,00,001**.
5. **Mandatory Human Approval Safety Gate**: Enforces explicit human administrator sign-off before modifying code. Never silently alters production rules.
6. **Live Portal Behavioral Change**: Embedded scholarship applicant eligibility checker updates instantly upon patch approval.
7. **Auditable Event Timeline**: Time-stamped, immutable audit log of all system actions, extractions, approvals, and test results.
8. **1-Click Demo Scenario**: Works 100% deterministically out of the box without requiring external API keys.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15 (App Router, TypeScript)
- **Styling**: Tailwind CSS v4 (Calm Indian Public Service visual language: Deep Navy `#0b1329`, Warm Saffron `#f97316`)
- **Persistence**: File-backed JSON / SQLite database layer (`data/niyampatch_state.json`)
- **Diffing & Testing**: `diff` package + in-process TypeScript boundary test suite runner
- **Icons**: Lucide React

---

## 🚀 Quick Start & Local Setup

### 1. Prerequisites
- Node.js v18.x or v20.x or v22.x
- npm v9+

### 2. Installation
```bash
git clone https://github.com/your-repo/NiyamPatch.git
cd NiyamPatch
npm install
```

### 3. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🎬 10-Second Demo Walkthrough Script

1. **Launch App**: Open `http://localhost:3000`. Click **"⚡ 1-Click Demo Scenario"** on the top header.
2. **Inspect Policy Ingestion**: View Govt of MP Higher Education Dept Circular #F-12/302/2026/38-1 on Page 2 (Clause 4.1).
3. **View Extracted Evidence**: Observe structured rule extraction (₹2,50,000 ➔ ₹3,00,000).
4. **Inspect Code Diff**: Review side-by-side diff in `eligibilityEngine.ts` modifying `MAX_FAMILY_INCOME`.
5. **Run Pre-Patch Tests**: Note boundary test failures for ₹2.8L and ₹3.0L under old ₹2.5L rule.
6. **Test Live Portal (Before Approval)**: Enter ₹2,80,000 into the Live Portal Eligibility Checker ➔ Output: **REJECTED**.
7. **Approve Patch**: Click **"APPROVE & APPLY CODE PATCH NOW"** in the Safety Control Gate.
8. **Verify Post-Patch Results**: Observe 5/5 Boundary Tests PASSED.
9. **Test Live Portal (After Approval)**: Enter ₹2,80,000 into the Live Portal ➔ Output: **APPROVED**!
10. **Review Audit Log**: Scroll down the right column to view the complete audit timeline.

---

## ⚠️ Prototype Limitations & Disclaimer

- **Prototype Scope**: Designed for targeted policy eligibility rules (income thresholds, age limits, marks percentages).
- **Human Review Mandate**: This software is a functional prototype and does not provide automated legal advice. All policy-driven code changes require verification by authorized administrators.

---

## 📄 License
MIT License
