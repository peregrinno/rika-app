'use client';

import { TextInput, PasswordInput, Button, Container, Title, Text, Anchor } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/auth';
import classes from './login.module.css';
import { useMantineColorScheme } from '@mantine/core';
import { useEffect } from 'react';
import { getStorageItem, setStorageItem } from '@/utils/storage';

export default function LoginPage() {
    const router = useRouter();
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
            password: (value) => (value.length < 6 ? 'A senha deve ter pelo menos 6 caracteres' : null),
        },
    });

    useEffect(() => {
        const token = getStorageItem('rika-token');
        if (token) {
            router.push('/dashboard');
        }
    }, [router]);

    const handleSubmit = async (values: typeof form.values) => {
        try {
            const token = await authService.login(values);
            setStorageItem('rika-token', token);
            router.push('/dashboard');
            notifications.show({
                title: 'Sucesso!',
                message: 'Login realizado com sucesso',
                color: 'green',
            });
        } catch (error) {
            notifications.show({
                title: 'Erro',
                message: error instanceof Error ? error.message : 'Credenciais inválidas',
                color: 'red',
            });
        }
    };

    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title} c={dark ? 'dimmed' : 'dark.6'}>
                Bem-vinda de volta!
            </Title>
            <Text c={dark ? 'dimmed' : 'dark.6'} size="sm" ta="center" mt={5}>
                Não tem uma conta ainda?{' '}
                <Link href="/register" passHref>
                    <Anchor size="sm" component="span">
                        Criar conta
                    </Anchor>
                </Link>
            </Text>

            <form onSubmit={form.onSubmit(handleSubmit)} className={classes.form}>
                <TextInput
                    label="Email"
                    placeholder="seu@email.com"
                    required
                    c={dark ? 'dimmed' : 'dark.6'}
                    {...form.getInputProps('email')}
                />
                <PasswordInput
                    label="Senha"
                    placeholder="Sua senha"
                    required
                    mt="md"
                    c={dark ? 'dimmed' : 'dark.6'}
                    {...form.getInputProps('password')}
                />
                <Button type="submit" fullWidth mt="xl">
                    Entrar
                </Button>
            </form>
        </Container>
    );
} 