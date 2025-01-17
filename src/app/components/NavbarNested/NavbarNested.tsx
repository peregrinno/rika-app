'use client';

import {
    IconChartLine,
    IconHistory,
    IconHeartRateMonitor,
    IconCrown,
    IconSettings,
    IconDashboard,
} from '@tabler/icons-react';
import { Code, Group, ScrollArea, useMantineColorScheme } from '@mantine/core';
import { LinksGroup } from '../NavbarLinksGroup/NavbarLinksGroup';
import { UserButton } from '../UserButton/UserButton';
import classes from './NavbarNested.module.css';
import { useRouter } from 'next/navigation';

const mockdata = [
    {
        label: 'Dashboard',
        icon: IconDashboard,
        link: '/dashboard'
    },
    {
        label: 'Meu Ciclo',
        icon: IconChartLine,
        link: '/cycle'
    },
    {
        label: 'Histórico',
        icon: IconHistory,
        link: '/dashboard/history'
    },
    {
        label: 'Acompanhamento',
        icon: IconHeartRateMonitor,
        link: '/dashboard/monitoring'
    },
    {
        label: 'Plano',
        icon: IconCrown,
        link: '/dashboard/plan'
    }
];

export function NavbarNested() {
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const links = mockdata.map((item) => <LinksGroup {...item} key={item.label} />);
    const router = useRouter();

    return (
        <nav className={classes.navbar}>
            <div className={classes.header}>
                <Group justify="space-between">
                    <Code fw={700} c={dark ? 'white' : 'dark.8'}>v{process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0'}</Code>
                </Group>
            </div>

            <ScrollArea className={classes.links}>
                <div className={classes.linksInner}>{links}</div>
            </ScrollArea>

            <div className={classes.footer}>
                <UserButton onClick={() => router.push('/dashboard/profile')} />
            </div>
        </nav>
    );
} 