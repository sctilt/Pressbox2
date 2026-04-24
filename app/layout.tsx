import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'The Press Box',
  description: 'Daily Sports Cards • Live Scores • Wax Tracker',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
