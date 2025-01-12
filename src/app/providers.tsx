'use client';

import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { theme } from './theme';

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <MantineProvider theme={theme}>
            {children}
        </MantineProvider>
    );
} 