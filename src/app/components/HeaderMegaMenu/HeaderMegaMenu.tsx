'use client';

import {
    IconBook,
    IconChartPie3,
    IconChevronDown,
    IconCode,
    IconCoin,
    IconFingerprint,
    IconNotification,
    IconSun,
    IconMoonStars,
} from '@tabler/icons-react';
import {
    Anchor,
    Box,
    Burger,
    Button,
    Center,
    Collapse,
    Divider,
    Drawer,
    Group,
    HoverCard,
    ScrollArea,
    SimpleGrid,
    Text,
    ThemeIcon,
    UnstyledButton,
    useMantineTheme,
    ActionIcon,
    useMantineColorScheme,
    Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import Image from 'next/image';
import classes from './HeaderMegaMenu.module.css';

const mockdata = [
    {
        icon: IconCode,
        title: 'Como Funciona',
        description: 'Entenda como o método Billings funciona',
    },
    {
        icon: IconCoin,
        title: 'Preços',
        description: 'Conheça nossos planos',
    },
    {
        icon: IconBook,
        title: 'Documentação',
        description: 'Acesse nossa documentação completa',
    },
    {
        icon: IconFingerprint,
        title: 'Segurança',
        description: 'Seus dados protegidos',
    },
];

export function HeaderMegaMenu() {
    const [drawerOpened, { toggle: toggleDrawer, close: closeDrawer }] = useDisclosure(false);
    const [linksOpened, { toggle: toggleLinks }] = useDisclosure(false);
    const theme = useMantineTheme();
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';

    const links = mockdata.map((item) => (
        <UnstyledButton className={classes.subLink} key={item.title}>
            <Group wrap="nowrap" align="flex-start">
                <ThemeIcon size={34} variant="default" radius="md">
                    <item.icon size={22} color={theme.colors.rika[6]} />
                </ThemeIcon>
                <div>
                    <Text size="sm" fw={500}>
                        {item.title}
                    </Text>
                    <Text size="xs" c="dimmed">
                        {item.description}
                    </Text>
                </div>
            </Group>
        </UnstyledButton>
    ));

    return (
        <Box>
            <header className={classes.header}>
                <Group justify="space-between" h="100%">
                    <Group>
                        <Image
                            src="/logos/rika_app_logo.svg"
                            alt="Rika App Logo"
                            width={40}
                            height={40}
                        />
                        <Title className={classes.title} order={3} fw={900}>Rika App</Title>
                    </Group>

                    <Group h="100%" gap={0} visibleFrom="sm">
                        <a href="#" className={classes.link}>
                            Home
                        </a>
                        <HoverCard width={600} position="bottom" radius="md" shadow="md" withinPortal>
                            <HoverCard.Target>
                                <a href="#" className={classes.link}>
                                    <Center inline>
                                        <Box component="span" mr={5}>
                                            Recursos
                                        </Box>
                                        <IconChevronDown size={16} color={theme.colors.rika[6]} />
                                    </Center>
                                </a>
                            </HoverCard.Target>

                            <HoverCard.Dropdown style={{ overflow: 'hidden' }}>
                                <SimpleGrid cols={2} spacing={0}>
                                    {links}
                                </SimpleGrid>
                            </HoverCard.Dropdown>
                        </HoverCard>
                        <a href="#" className={classes.link}>
                            Contato
                        </a>
                    </Group>

                    <Group visibleFrom="sm">
                        <ActionIcon
                            variant="outline"
                            color={dark ? 'yellow' : 'rika'}
                            onClick={() => toggleColorScheme()}
                            title="Alternar tema"
                        >
                            {dark ? <IconSun size={18} /> : <IconMoonStars size={18} />}
                        </ActionIcon>
                        <Button variant="outline">Login</Button>
                        <Button>Inscreva-se</Button>
                    </Group>

                    <Burger opened={drawerOpened} onClick={toggleDrawer} hiddenFrom="sm" />
                </Group>
            </header>

            <Drawer
                opened={drawerOpened}
                onClose={closeDrawer}
                size="100%"
                padding="md"
                title="Navegação"
                hiddenFrom="sm"
                zIndex={1000000}
                className={classes.title}
            >
                <ScrollArea h="calc(100vh - 80px)" mx="-md">
                    <Divider my="sm" />

                    <a href="#" className={classes.link}>
                        Home
                    </a>
                    <UnstyledButton className={classes.link} onClick={toggleLinks}>
                        <Center inline>
                            <Box component="span" mr={5}>
                                Recursos
                            </Box>
                            <IconChevronDown size={16} color={theme.colors.rika[6]} />
                        </Center>
                    </UnstyledButton>
                    <Collapse in={linksOpened}>{links}</Collapse>
                    <a href="#" className={classes.link}>
                        Contato
                    </a>

                    <Divider my="sm" />

                    <Group justify="center" grow pb="xl" px="md">
                        <Button variant="outline">Login</Button>
                        <Button>Inscreva-se</Button>
                    </Group>
                </ScrollArea>
            </Drawer>
        </Box>
    );
} 