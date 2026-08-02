# 📜 NiyamPatch: Policy-to-Code Operational Cockpit
**ChatGPT Codex India Hackathon 2026 Submission Document**

[![GitHub Repository](https://img.shields.io/badge/GitHub-NIyam--Patch-blue?style=flat-square&logo=github)](https://github.com/esafshanum/NIyam-Patch)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Government%20Open%20Source-emerald?style=flat-square)](#)

---

## 🌟 Executive Summary

**NiyamPatch** is an enterprise-grade, agentic **Policy-to-Code Operational Cockpit** designed to eliminate the multi-month delay, manual human translation errors, and compliance risks involved in converting newly published government gazette circulars into production software logic.

When state governments amend public welfare policies (e.g., expanding eligibility income ceilings, revising scholarship criteria, or updating tax slabs), software portals typically lag by months. This lag leads to eligible citizens being wrongfully rejected by outdated code rules.

NiyamPatch solves this bottleneck by establishing an automated, **Agentic Codex Pipeline** that ingests gazette circular PDFs, extracts structured rule changes with 99.4% confidence, maps them directly to codebase AST constants (`MAX_FAMILY_INCOME`), executes 5 boundary unit tests, and presents color-coded git diffs for **mandatory Human Administrator approval** before applying patches.

---

## 🚩 Problem Statement

### The Public Sector Policy-to-Code Bottleneck

Every year, state and central government departments publish thousands of gazette circulars amending administrative rules. However, converting these legal documents into operational portal logic faces four critical failures:

1. **Massive Implementation Lag (3–6 Months):** After a policy is officially gazetted, IT vendors require months to write change requests, draft specifications, update codebases, and redeploy production servers.
2. **Citizen Denial & Rightful Benefit Loss:** During the implementation lag, citizens meeting newly gazetted criteria (e.g. family income between ₹2.5L and ₹3.0L) are automatically rejected by legacy code engines.
3. **Absence of Mandatory Human Safety Controls in Generic AI:** Unchecked LLM code generation risks hallucinating critical parameters or breaking surrounding production logic, leading to catastrophic governance failures.
4. **Lack of Auditable Legal Chain of Custody:** Government auditors (CAG/NIC) lack transparent traceability linking a specific code constant modification back to an official gazette circular clause number and approving officer.

---

## 🎯 The NiyamPatch Solution

```
+-------------------+      +-------------------+      +-------------------+      +-------------------+
|  Gazette PDF      | ---> |  Codex Extraction | ---> |  AST Code Matcher | ---> | Boundary Test Run |
|  Circular #302    |      |  Clause 4.1 Excerpt|      |  MAX_FAMILY_INCOME|      | 5/5 Boundary Tests|
+-------------------+      +-------------------+      +-------------------+      +-------------------+
                                                                                       |
                                                                                       v
+-------------------+      +-------------------+                                 +-------------------+
| Live State Portal | <--- | Patch Applied     | <------------------------------ | Human Safety Gate |
| Ceiling = ₹3.0L   |      | In-Memory Engine  |    (Explicit Sign-Off)          | Officer Approval  |
+-------------------+      +-------------------+                                 +-------------------+
```

---

## 🛠️ Technical Stack & Architecture

- **Framework:** Next.js 16 (App Router, Turbopack, React 19)
- **Language:** TypeScript 5.0 (Strict Type System)
- **Styling:** Vanilla CSS Tokens + TailwindCSS, custom HSL palette (`Pastel Baby Blue #E0F2FE` & `Snow White #FFFFFF`)
- **Icons:** Lucide React Icons
- **AI Agent & LLM Engine:** Codex Step-by-Step Thought Stream Drawer (`/api/policy/extract`, `/api/patch/generate`, `/api/chat`)
- **AST Matching Engine:** Regex/AST Symbol Matcher targeting code constants (`MAX_FAMILY_INCOME` at line 9 of `eligibilityEngine.ts`)
- **Vernacular i18n:** Full project translation across **English**, **Hindi (हिंदी)**, and **Marathi (मराठी)**
- **Voice & Accessibility:** Web Speech API (`window.speechSynthesis`, `window.webkitSpeechRecognition`)
- **Security:** Role-Based Security Landing Gate with 1-Click Quick Demo Sign-In
- **Auditability:** Digital Gazette SHA-256 Signature Verification Seal & Exportable CAG/NIC Compliance Audit PDF Certificate

---

## 🧪 Boundary Test Suite Matrix Results

| Test ID | Income Value | Test Condition | Pre-Patch Result | Post-Patch Result |
| :--- | :--- | :--- | :--- | :--- |
| **TEST_1** | `₹2,49,999` | Sub-Boundary | PASSED (Eligible) | PASSED (Eligible) |
| **TEST_2** | `₹2,50,000` | Baseline Ceiling | PASSED (Eligible) | PASSED (Eligible) |
| **TEST_3** | `₹2,80,000` | Revised Mid-Tier | FAILED (Rej ❌) | **PASSED (Elig 🟢)** |
| **TEST_4** | `₹3,00,000` | New Gazette Ceiling | FAILED (Rej ❌) | **PASSED (Elig 🟢)** |
| **TEST_5** | `₹3,00,001` | Super-Boundary | PASSED (Rej 🟢) | PASSED (Rej 🟢) |
| **OVERALL** | — | — | **3/5 PASSED (60%)** | **5/5 PASSED (100%)** |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/esafshanum/NIyam-Patch.git
cd NIyam-Patch

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Access in browser
http://localhost:3000
```
