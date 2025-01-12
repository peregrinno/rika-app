import { ColorSchemeScript } from '@mantine/core';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import './globals.css';
import { metadata } from './metadata';

const inter = Inter({ subsets: ['latin'] });

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
