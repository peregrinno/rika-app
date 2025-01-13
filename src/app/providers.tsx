'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { theme } from './theme';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <MantineProvider
            theme={theme}
            defaultColorScheme="light"
            withCssVariables
            withStaticClasses
        >
            <Notifications />
            {children}
        </MantineProvider>
    );
} 