import { ColorSchemeScript } from '@mantine/core';
import { Providers } from './providers';
import './globals.css';
import { metadata } from './metadata';

export { metadata };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
      </head>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
