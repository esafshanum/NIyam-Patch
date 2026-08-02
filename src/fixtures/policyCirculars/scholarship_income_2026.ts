export interface PolicyCircularDoc {
  id: string;
  circularNumber: string;
  department: string;
  title: string;
  effectiveDate: string;
  totalPages: number;
  pages: { pageNumber: number; text: string }[];
}

export const SEEDED_SCHOLARSHIP_CIRCULAR: PolicyCircularDoc = {
  id: "circ_mp_he_2026_302",
  circularNumber: "F-12/302/2026/38-1",
  department: "Department of Higher Education, Government of Madhya Pradesh",
  title: "Revision of Family Income Limit under Mukhyamantri Medhavi Vidyarthi Yojana (MMVY)",
  effectiveDate: "2026-04-01",
  totalPages: 2,
  pages: [
    {
      pageNumber: 1,
      text: `GOVERNMENT OF MADHYA PRADESH
DEPARTMENT OF HIGHER EDUCATION
MANTRALAYA, VALLABH BHAWAN, BHOPAL

Circular No. F-12/302/2026/38-1                                   Date: 15th March 2026

MEMORANDUM

Subject: Administrative Approval for Revision of Eligibility Criteria under State Higher Education Assistance Schemes.

In reference to the Cabinet Decision No. 44/2026 dated 10th March 2026, the Governor of Madhya Pradesh is pleased to order amendments to the financial assistance schemes managed by the Higher Education Portal.

Primary objective: To broaden student coverage and compensate for inflation-adjusted household expenditure limits across undergraduate and postgraduate technical degree courses.`
    },
    {
      pageNumber: 2,
      text: `CIRCULAR DETAILS & AMENDMENT PROVISIONS:

Clause 1: Scope of Application
This circular applies to all fresh and renewal applicants under the Mukhyamantri Medhavi Vidyarthi Yojana (MMVY) and Post-Matric Scholarship Scheme enrolled in recognized higher educational institutes for Academic Session 2026-27 onwards.

Clause 2: Revision of Annual Income Ceiling
Clause 4.1 of Scheme Guidelines 2021: The upper ceiling for annual family income for eligibility under the Mukhyamantri Medhavi Vidyarthi Scheme is hereby revised from Rs. 2,50,000 (Two Lakh Fifty Thousand) to Rs. 3,00,000 (Three Lakhs) with effect from 1st April 2026.

Clause 3: Implementation Directives
The State IT Centre / Scholarship Portal Technical Team is directed to update rule evaluation constants in the automated eligibility verification engine prior to the opening of the application window on 1st April 2026.

By Order and in the Name of the Governor of Madhya Pradesh,
(S. K. Sharma)
Principal Secretary to Government of MP
Department of Higher Education`
    }
  ]
};
