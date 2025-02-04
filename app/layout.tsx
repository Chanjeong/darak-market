import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    template: '%s | 다락마켓',
    default: '다락마켓'
  },
  icons: {
    icon: '/darak-icon.svg'
  },
  description: '물건을 사고 빌릴 수 있는 마켓'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-stone-900
         text-white min-h-screen max-w-md mx-auto `}>
        {children}
      </body>
    </html>
  );
}
