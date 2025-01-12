'use client';

import { Container, Title, Text, Group, Button } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return null; // ou um componente de loading
    }

    const handleLogout = () => {
        localStorage.removeItem('rika-token');
        router.push('/login');
    };

    return (
        <Container size="lg" py="xl">
            <Group justify="space-between" mb="xl">
                <Title order={2}>Dashboard</Title>
                <Button variant="outline" onClick={handleLogout}>
                    Sair
                </Button>
            </Group>
            <Text>Bem-vinda ao seu painel de controle!</Text>
        </Container>
    );
} 