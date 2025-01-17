'use client';

import { useEffect, useState } from 'react';
import { Container, Title, Text, Button, Paper } from '@mantine/core';
import { useSearchParams, useRouter } from 'next/navigation';
import { notifications } from '@mantine/notifications';
import api from '@/services/api';

interface ApiResponse<T> {
    data?: T;
    error?: string;
    api_version: string;
    timestamp: string;
    status: number;
}

interface ValidateResponse {
    message: string;
}

export default function ValidatePage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isValidating, setIsValidating] = useState(true);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const token = searchParams.get('token');
        if (!token) {
            notifications.show({
                title: 'Erro',
                message: 'Token não encontrado',
                color: 'red',
            });
            router.push('/login');
            return;
        }

        api.get<ApiResponse<ValidateResponse>>(`/validate?token=${token}`)
            .then((response) => {
                setSuccess(true);
                notifications.show({
                    title: 'Sucesso',
                    message: response.data.data?.message || 'Email validado com sucesso',
                    color: 'green',
                });
                setIsValidating(false);
            })
            .catch((error) => {
                notifications.show({
                    title: 'Erro',
                    message: error.response?.data?.error || 'Erro ao validar email',
                    color: 'red',
                });
                setIsValidating(false);
            });
    }, [searchParams, router]);

    return (
        <Container size={420} my={40}>
            <Paper radius="md" p="xl" withBorder>
                <Title ta="center" order={2}>
                    Validação de Email
                </Title>
                {isValidating ? (
                    <Text ta="center" mt="md">
                        Validando seu email...
                    </Text>
                ) : success ? (
                    <>
                        <Text ta="center" mt="md">
                            Seu email foi validado com sucesso!
                        </Text>
                        <Button
                            fullWidth
                            mt="xl"
                            onClick={() => router.push('/login')}
                        >
                            Ir para Login
                        </Button>
                    </>
                ) : (
                    <>
                        <Text ta="center" mt="md" c="red">
                            Não foi possível validar seu email.
                        </Text>
                        <Button
                            fullWidth
                            mt="xl"
                            onClick={() => router.push('/login')}
                        >
                            Voltar para Login
                        </Button>
                    </>
                )}
            </Paper>
        </Container>
    );
} 