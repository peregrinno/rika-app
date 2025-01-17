'use client';

import { Container, Title, Text } from '@mantine/core';
import { useRequireAuth } from '@/hooks/useRequireAuth';

export default function DashboardPage() {
    const { isLoading } = useRequireAuth();

    if (isLoading) {
        return null;
    }

    return (
        <Container size="xl">
            <Title>Dashboard</Title>
            <Text>Bem-vinda ao seu painel</Text>
        </Container>
    );
} 