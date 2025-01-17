'use client';

import { AppShell } from '@mantine/core';
import { NavbarNested } from '@/app/components/NavbarNested/NavbarNested';
import { AdminHeader } from '@/app/components/Headers/AdminHeader';
import { useState } from 'react';

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [opened, setOpened] = useState(false);

    return (
        <AppShell
            header={{ height: 60 }}
            navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
            padding="md"
        >
            <AppShell.Header>
                <AdminHeader opened={opened} toggle={() => setOpened(!opened)} />
            </AppShell.Header>

            <AppShell.Navbar>
                <NavbarNested />
            </AppShell.Navbar>

            <AppShell.Main>
                {children}
            </AppShell.Main>
        </AppShell>
    );
} 