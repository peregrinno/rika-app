'use client';

import { TextInput, PasswordInput, Button, Container, Title, Text, Anchor, LoadingOverlay } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { authService } from '@/services/auth';
import classes from './register.module.css';
import { useMantineColorScheme } from '@mantine/core';
import { IMaskInput } from 'react-imask';
import { useState } from 'react';

interface FormValues {
    fullName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function RegisterPage() {
    const router = useRouter();
    const form = useForm<FormValues>({
        initialValues: {
            fullName: '',
            phone: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        validate: {
            fullName: (value) => (value.length < 3 ? 'Nome muito curto' : null),
            phone: (value) => {
                const numbers = value.replace(/\D/g, '');
                return numbers.length !== 11 ? 'Telefone inválido' : null;
            },
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email inválido'),
            password: (value) => (value.length < 6 ? 'A senha deve ter pelo menos 6 caracteres' : null),
            confirmPassword: (value, values) =>
                value !== values.password ? 'As senhas não coincidem' : null,
        }
    });

    const handlePhoneChange = (value: string) => {
        form.setFieldValue('phone', value);
    };

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (values: FormValues) => {
        setIsLoading(true);
        try {
            const registerData = {
                name: values.fullName,
                phone: values.phone.replace(/\D/g, ''),
                email: values.email,
                password: values.password
            };

            await authService.register(registerData);
            router.push('/login');
            notifications.show({
                title: 'Sucesso!',
                message: 'Conta criada com sucesso',
                color: 'green',
            });
        } catch (error) {
            notifications.show({
                title: 'Erro',
                message: 'Erro ao criar conta',
                color: 'red',
            });
        } finally {
            setIsLoading(false);
        }
    };

    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <Container size={420} my={40}>
            <Title ta="center" className={classes.title} c={dark ? 'dimmed' : 'dark.6'}>
                Criar uma conta
            </Title>
            <Text c={dark ? 'dimmed' : 'dark.6'} size="sm" ta="center" mt={5}>
                Já tem uma conta?{' '}
                <Link href="/login" passHref>
                    <Anchor size="sm" component="span">
                        Fazer login
                    </Anchor>
                </Link>
            </Text>

            <form onSubmit={form.onSubmit((values) => handleSubmit(values as FormValues))} className={classes.form}>
                <TextInput
                    label="Nome completo"
                    placeholder="Seu nome"
                    required
                    c={dark ? 'dimmed' : 'dark.6'}
                    {...form.getInputProps('fullName')}
                />
                <TextInput
                    label="Telefone"
                    placeholder="(00) 00000-0000"
                    required
                    mt="md"
                    c={dark ? 'dimmed' : 'dark.6'}
                    component={IMaskInput}
                    mask="(00) 00000-0000" //fix: ignore
                    {...form.getInputProps('phone')}
                />
                <TextInput
                    label="Email"
                    placeholder="seu@email.com"
                    required
                    mt="md"
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
                <PasswordInput
                    label="Confirmar senha"
                    placeholder="Confirme sua senha"
                    required
                    mt="md"
                    c={dark ? 'dimmed' : 'dark.6'}
                    {...form.getInputProps('confirmPassword')}
                />
                <Button
                    type="submit"
                    fullWidth
                    mt="xl"
                    loading={isLoading}
                >
                    {isLoading ? 'Criando conta...' : 'Criar conta'}
                </Button>
            </form>
        </Container>
    );
} 