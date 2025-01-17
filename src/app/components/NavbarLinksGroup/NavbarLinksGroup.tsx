'use client';

import { useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import classes from './NavbarLinksGroup.module.css';

interface LinksGroupProps {
    icon: React.FC<any>;
    label: string;
    initiallyOpened?: boolean;
    link?: string;
    links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, initiallyOpened, link, links }: LinksGroupProps) {
    const router = useRouter();
    const [opened, setOpened] = useState(initiallyOpened || false);
    const hasLinks = Array.isArray(links);

    const items = (hasLinks ? links : []).map((item) => (
        <Text<'a'>
            component="a"
            className={classes.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                router.push(item.link);
            }}
        >
            {item.label}
        </Text>
    ));

    const handleClick = () => {
        if (hasLinks) {
            setOpened((o) => !o);
        } else if (link) {
            router.push(link);
        }
    };

    return (
        <>
            <UnstyledButton onClick={handleClick} className={classes.control}>
                <Group justify="space-between" gap={0}>
                    <Box style={{ display: 'flex', alignItems: 'center' }}>
                        <ThemeIcon variant="light" size={30}>
                            <Icon style={{ width: rem(18), height: rem(18) }} />
                        </ThemeIcon>
                        <Box ml="md">{label}</Box>
                    </Box>
                    {hasLinks && (
                        <IconChevronRight
                            className={classes.chevron}
                            stroke={1.5}
                            style={{
                                width: rem(16),
                                height: rem(16),
                                transform: opened ? 'rotate(-90deg)' : 'none',
                            }}
                        />
                    )}
                </Group>
            </UnstyledButton>
            {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
        </>
    );
} 