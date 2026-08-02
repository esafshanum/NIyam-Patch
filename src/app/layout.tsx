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
    <html lang="en">
      <body className="bg-sky-50 text-slate-900 min-h-screen antialiased selection:bg-sky-400 selection:text-white">
        {children}
      </body>
    </html>
  );
}
