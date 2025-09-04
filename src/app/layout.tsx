import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Snake Game - Classic Arcade Fun',
  description: 'Play the classic Snake game with modern design. Collect food, grow longer, and beat your high score!',
  keywords: ['snake game', 'arcade game', 'browser game', 'classic games'],
  authors: [{ name: 'Snake Game Developer' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'Snake Game - Classic Arcade Fun',
    description: 'Play the classic Snake game with modern design. Collect food, grow longer, and beat your high score!',
    type: 'website',
    images: [
      {
        url: '/snake-game-preview.png',
        width: 1200,
        height: 630,
        alt: 'Snake Game Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snake Game - Classic Arcade Fun',
    description: 'Play the classic Snake game with modern design. Collect food, grow longer, and beat your high score!',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'><path fill='%2310b981' d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM8 17.5c-1.38 0-2.5-1.12-2.5-2.5S6.62 12.5 8 12.5s2.5 1.12 2.5 2.5S9.38 17.5 8 17.5zM16 17.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5S17.38 17.5 16 17.5z'/></svg>" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body className={`${inter.className} antialiased bg-slate-950 text-white`}>
        {children}
      </body>
    </html>
  );
}