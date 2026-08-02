import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'NiyamPatch | Policy-to-Code Operations Cockpit',
  description: 'A policy circular PDF becomes a human-approved, tested code change with page-level evidence chains and live verification.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen antialiased selection:bg-amber-500 selection:text-slate-950">
        {children}
      </body>
    </html>
  );
}
