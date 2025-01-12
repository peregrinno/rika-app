'use client';

import { AppShell } from '@mantine/core';
import { HeaderMegaMenu } from './components/HeaderMegaMenu/HeaderMegaMenu';
import { HeroBullets } from './components/HeroBullets/HeroBullets';

export default function Home() {
  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <HeaderMegaMenu />
      </AppShell.Header>

      <AppShell.Main>
        <HeroBullets />
      </AppShell.Main>
    </AppShell>
  );
}
