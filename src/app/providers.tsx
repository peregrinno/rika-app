'use client';

import { MantineProvider, createTheme, MantineColorScheme } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { theme } from './theme';
import { useLocalStorage } from '@mantine/hooks';

export function Providers({ children }: { children: React.ReactNode }) {
    const [colorScheme] = useLocalStorage<MantineColorScheme>({
        key: 'mantine-color-scheme',
        defaultValue: 'light',
    });

    return (
        <MantineProvider
            theme={theme}
            defaultColorScheme={colorScheme}
            withCssVariables
            withStaticClasses
        >
            <Notifications />
            {children}
        </MantineProvider>
    );
} 