'use client';

import { IconCheck } from '@tabler/icons-react';
import { Button, Container, Group, Image, List, Text, ThemeIcon, Title, useMantineColorScheme } from '@mantine/core';
import classes from './HeroBullets.module.css';

export function HeroBullets() {
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    return (
        <Container size="md">
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Title className={classes.title} c={dark ? 'dimmed' : 'dark.6'}>
                        Método <span className={classes.highlight}>Billings</span> <br /> simplificado
                    </Title>
                    <Text c="dimmed" mt="md">
                        Acompanhe seu ciclo de forma natural e eficaz. Uma abordagem moderna
                        para o planejamento familiar natural, com tecnologia e praticidade.
                    </Text>

                    <List
                        mt={30}
                        spacing="sm"
                        size="sm"
                        icon={
                            <ThemeIcon size={20} radius="xl" color="rika">
                                <IconCheck size={12} stroke={1.5} />
                            </ThemeIcon>
                        }
                    >
                        <List.Item c={dark ? 'dimmed' : 'dark.6'}>
                            <b>100% Natural</b> – Sem hormônios ou dispositivos invasivos,
                            apenas observação e registro
                        </List.Item>
                        <List.Item c={dark ? 'dimmed' : 'dark.6'}>
                            <b>Cientificamente comprovado</b> – Método com mais de 50 anos de
                            estudos e eficácia comprovada
                        </List.Item>
                        <List.Item c={dark ? 'dimmed' : 'dark.6'}>
                            <b>Fácil de usar</b> – Interface intuitiva e acompanhamento
                            personalizado do seu ciclo
                        </List.Item>
                    </List>

                    <Group mt={30}>
                        <Button radius="xl" size="md" className={classes.control}>
                            Começar agora
                        </Button>
                        <Button variant="outline" radius="xl" size="md" className={classes.control}>
                            Saiba mais
                        </Button>
                    </Group>
                </div>
                <Image src="/heros/girl_thinking.svg" alt="Rika App Hero" className={classes.image} />
            </div>
        </Container>
    );
} 