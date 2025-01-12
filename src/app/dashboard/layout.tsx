'use client';

import { AppShell, Container, Group, Title, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { HeaderMegaMenu } from '../components/HeaderMegaMenu/HeaderMegaMenu';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    return (
        <AppShell
            header={{ height: 60 }}
            padding="md"
        >
            <AppShell.Header>
                <HeaderMegaMenu />
            </AppShell.Header>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
} 