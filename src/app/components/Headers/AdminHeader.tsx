'use client';

import {
    Group,
    ActionIcon,
    useMantineColorScheme,
    Box,
    rem,
    Burger,
    Tooltip,
    Text,
    Image,
} from '@mantine/core';
import { IconSun, IconMoonStars, IconLogout } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import classes from './AdminHeader.module.css';
import { authService } from '@/services/auth';

interface AdminHeaderProps {
    opened: boolean;
    toggle: () => void;
}

export function AdminHeader({ opened, toggle }: AdminHeaderProps) {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const router = useRouter();

    const handleLogout = () => {
        authService.logout();
        router.push('/login');
    };

    return (
        <Box className={classes.header}>
            <Group justify="space-between" h="100%">
                <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />

                <Group ml="xl" gap="sm" visibleFrom="sm">
                    <Image
                        src="/logos/rika_app_logo.svg"
                        alt="Rika App Logo"
                        w={30}
                        h={30}
                    />
                    <Text size="lg" fw={500} c={dark ? 'white' : 'dark.8'}>
                        Rika App
                    </Text>
                </Group>

                <Group>
                    <Tooltip label="Alternar tema">
                        <ActionIcon
                            variant="default"
                            onClick={() => toggleColorScheme()}
                            size="lg"
                        >
                            {dark ? (
                                <IconSun style={{ width: rem(20), height: rem(20) }} />
                            ) : (
                                <IconMoonStars style={{ width: rem(20), height: rem(20) }} />
                            )}
                        </ActionIcon>
                    </Tooltip>

                    <Tooltip label="Sair">
                        <ActionIcon
                            variant="default"
                            onClick={handleLogout}
                            size="lg"
                        >
                            <IconLogout style={{ width: rem(20), height: rem(20) }} />
                        </ActionIcon>
                    </Tooltip>
                </Group>
            </Group>
        </Box>
    );
} 