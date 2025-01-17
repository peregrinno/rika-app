'use client';

import { Container, Title, Text, Button, Paper } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

interface ApiResponse<T> {
    data?: T;
    error?: string;
    api_version: string;
    timestamp: string;
    status: number;
}

interface ValidateAttemptResponse {
    message: string;
}

export default function VerifyAccountPage() {
    const router = useRouter();

    const handleResendEmail = async () => {
        try {
            const response = await api.post<ApiResponse<ValidateAttemptResponse>>('/validate-attempt');
            notifications.show({
                title: 'Sucesso',
                message: response.data.data.message, //ignore error
                color: 'green',
            });
        } catch (error: any) {
            notifications.show({
                title: 'Erro',
                message: error.response?.data?.error || 'Erro ao reenviar email',
                color: 'red',
            });
        }
    };

    return (
        <Container size={420} my={40}>
            <Paper radius="md" p="xl" withBorder>
                <Title ta="center" order={2}>
                    Verifique seu Email
                </Title>
                <Text ta="center" mt="md">
                    Enviamos um email de verificação para sua conta. Por favor, verifique sua caixa de entrada e spam.
                </Text>
                <Button
                    fullWidth
                    mt="xl"
                    onClick={handleResendEmail}
                >
                    Reenviar Email de Verificação
                </Button>
                <Button
                    fullWidth
                    mt="md"
                    variant="subtle"
                    onClick={() => router.push('/login')}
                >
                    Voltar para Login
                </Button>
            </Paper>
        </Container>
    );
} 