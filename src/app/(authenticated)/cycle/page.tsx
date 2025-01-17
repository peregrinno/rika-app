'use client';

import { useState, forwardRef, useEffect } from 'react';
import {
    Container,
    Title,
    Group,
    Button,
    Text,
    Modal,
    Select,
    Table,
    Checkbox,
    Box,
    TextInput,
} from '@mantine/core';
import { IconPlus, IconCheck } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useMantineColorScheme } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import '@mantine/dates/styles.css';
import 'dayjs/locale/pt-br';
import Image from 'next/image';
import { cycleService } from '@/services/cycle';
import { notifications } from '@mantine/notifications';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useRequireAuth } from '@/hooks/useRequireAuth';

interface CycleEntry {
    id: number;
    id_user: number;
    cycle_number: number;
    first_day: string;
    date: string;
    day_of_cycle: number;
    symbol: string;
    r: boolean;
    feeling: string;
    observation: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

interface ApiResponse<T> {
    data: T;
    api_version: string;
    timestamp: string;
    status: number;
    error?: string | { [key: string]: string[] };
}

const FEELINGS = [
    'Seca',
    'Úmida',
    'Molhada',
    'Escorregadia',
];

const OBSERVATIONS = [
    'Sangue',
    'Muco Infértil (Grosso)',
    'Muco Fértil (Fino/Clara de Ovo)',
    'Borra'
];

// Lista de símbolos com imagens
const SYMBOLS = [
    { value: '1_sangramento', label: 'Sangramento', image: '/mob_symbols/1_sangramento.png' },
    { value: '2_seca', label: 'Seca', image: '/mob_symbols/2_seca.png' },
    { value: '3_fertilidade', label: 'Fertilidade', image: '/mob_symbols/3_fertilidade.png' },
    { value: '4_fluxo', label: 'Fluxo', image: '/mob_symbols/4_fluxo.png' },
    { value: '5_manchas', label: 'Manchas', image: '/mob_symbols/5_manchas.png' },
    { value: '6_fertilidade_manchas', label: 'Fertilidade com Manchas', image: '/mob_symbols/6_fertilidade_manchas.png' },
    { value: '7_apice', label: 'Ápice', image: '/mob_symbols/7_apice.png' },
    { value: '8_dia_i_seca', label: 'Dia 1 Seca', image: '/mob_symbols/8_dia_i_seca.png' },
    { value: '9_dia_ii_seca', label: 'Dia 2 Seca', image: '/mob_symbols/9_dia_ii_seca.png' },
    { value: '10_dia_iii_seca', label: 'Dia 3 Seca', image: '/mob_symbols/10_dia_iii_seca.png' },
    { value: '11_dia_i_fluxo', label: 'Dia 1 Fluxo', image: '/mob_symbols/11_dia_i_fluxo.png' },
    { value: '12_dia_ii_fluxo', label: 'Dia 2 Fluxo', image: '/mob_symbols/12_dia_ii_fluxo.png' },
    { value: '13_dia_iii_fluxo', label: 'Dia 3 Fluxo', image: '/mob_symbols/13_dia_iii_fluxo.png' },
    { value: '14_dia_i_pos_apice_seca', label: 'Dia 1 pós Ápice Seca', image: '/mob_symbols/14_dia_i_pos_apice_seca.png' },
    { value: '15_dia_ii_pos_apice_seca', label: 'Dia 2 pós Ápice Seca', image: '/mob_symbols/15_dia_ii_pos_apice_seca.png' },
    { value: '16_dia_iii_pos_apice_seca', label: 'Dia 3 pós Ápice Seca', image: '/mob_symbols/16_dia_iii_pos_apice_seca.png' },
    { value: '17_dia_i_pos_apice_com_fluxo', label: 'Dia 1 pós Ápice com Fluxo', image: '/mob_symbols/17_dia_i_pos_apice_com_fluxo.png' },
    { value: '18_dia_ii_pos_apice_com_fluxo', label: 'Dia 2 pós Ápice com Fluxo', image: '/mob_symbols/18_dia_ii_pos_apice_com_fluxo.png' },
    { value: '19_dia_iii_pos_apice_com_fluxo', label: 'Dia 3 pós Ápice com Fluxo', image: '/mob_symbols/19_dia_iii_pos_apice_com_fluxo.png' },
];

const weekDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

// Componente personalizado para renderizar cada opção do Select
const SymbolSelectItem = forwardRef<
    HTMLDivElement,
    { label: string; image: string; value: string }
>((props, ref) => {
    const { label, image, ...others } = props;
    return (
        <div ref={ref} {...others}>
            <Group gap="sm">
                <Image src={image} alt={label} width={24} height={24} />
                <Text size="sm">{label}</Text>
            </Group>
        </div>
    );
});

SymbolSelectItem.displayName = 'SymbolSelectItem';

// Componente para renderizar o valor selecionado
const SymbolSelectValue = ({ image, label }: { image: string; label: string }) => (
    <Group gap="sm" style={{ minHeight: 36 }}>
        <Image src={image} alt={label} width={24} height={24} />
        <Text size="sm">{label}</Text>
    </Group>
);

export default function CyclePage() {
    const [opened, { open, close }] = useDisclosure(false);
    const { colorScheme } = useMantineColorScheme();
    const dark = colorScheme === 'dark';
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const { isLoading: authLoading } = useRequireAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [entries, setEntries] = useState<CycleEntry[]>([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedEntry, setSelectedEntry] = useState<CycleEntry | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
    const [selectedObservation, setSelectedObservation] = useState<string | null>(null);
    const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
    const [isR, setIsR] = useState(false);
    const [notes, setNotes] = useState('');
    const [currentDayCycle, setCurrentDayCycle] = useState<number>(1);
    const [cycleInfo, setCycleInfo] = useState<{ cycleNumber: number; firstDay: string } | null>(null);

    const loadInitialData = async () => {
        try {
            const [entries, dayCycle, allCycles] = await Promise.all([
                cycleService.getCurrentCycle(),
                cycleService.getCurrentDayCycle(),
                cycleService.getAllCycles()
            ]);

            setEntries(entries);
            setCurrentDayCycle(dayCycle);

            // Pega as informações do primeiro ciclo da lista
            if (allCycles.length > 0) {
                setCycleInfo({
                    cycleNumber: allCycles[0].cycle_number,
                    firstDay: allCycles[0].first_day
                });
            }
        } catch (error: any) {
            notifications.show({
                title: 'Erro',
                message: error.response?.data?.error || 'Erro ao carregar dados',
                color: 'red',
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (!authLoading) {
            setSelectedDate(new Date());
            loadInitialData();
        }
    }, [authLoading]);

    if (authLoading || isLoading) {
        return null;
    }

    const handleSubmit = async () => {
        if (!selectedDate || !selectedSymbol || !selectedFeeling || !selectedObservation) {
            notifications.show({
                title: 'Erro',
                message: 'Preencha todos os campos obrigatórios',
                color: 'red',
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const formattedDate = selectedDate.toISOString().split('T')[0];

            const cycleData = {
                cycle_number: cycleInfo?.cycleNumber || 1,
                first_day: cycleInfo?.firstDay || formattedDate, // Usa o first_day do primeiro ciclo
                date: formattedDate,
                day_of_cycle: selectedEntry ? selectedEntry.day_of_cycle : currentDayCycle,
                symbol: selectedSymbol,
                r: isR,
                feeling: selectedFeeling,
                observation: selectedObservation,
                notes: notes || ''
            };

            if (selectedEntry) {
                await cycleService.update(selectedEntry.id, cycleData);
            } else {
                await cycleService.create(cycleData);
            }

            await loadInitialData();
            close();
            resetForm();
            notifications.show({
                title: 'Sucesso',
                message: selectedEntry ? 'Registro atualizado' : 'Registro criado',
                color: 'green',
            });
        } catch (error: any) {
            console.error('Erro completo:', error.response?.data || error);
            notifications.show({
                title: 'Erro',
                message: error.response?.data?.error || 'Erro ao salvar registro',
                color: 'red',
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setSelectedDate(new Date());
        setSelectedSymbol(null);
        setSelectedFeeling(null);
        setSelectedObservation(null);
        setIsR(false);
        setNotes('');
        setSelectedEntry(null);
    };

    const handleEdit = (entry: CycleEntry) => {
        setSelectedEntry(entry);
        setSelectedDate(parseISO(entry.date));
        setSelectedSymbol(entry.symbol);
        setSelectedFeeling(entry.feeling);
        setSelectedObservation(entry.observation);
        setIsR(entry.r);
        setNotes(entry.notes || '');
        open();
    };

    return (
        <Container size="xl">
            <Group justify="space-between" mb="xl">
                <div>
                    <Title order={2} c={dark ? 'white' : 'dark.8'}>Meu Ciclo</Title>
                    <Text c={dark ? 'gray.1' : 'dark.6'}>
                        Ciclo #{cycleInfo?.cycleNumber || '-'} - Início: {cycleInfo?.firstDay ? format(parseISO(cycleInfo.firstDay), 'dd/MM/yyyy') : '-'}
                    </Text>
                </div>
                <Button leftSection={<IconPlus size={14} />} onClick={open}>
                    Novo Registro
                </Button>
            </Group>

            <Table striped highlightOnHover>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th c={dark ? 'white' : 'dark.8'}>Dia da Semana</Table.Th>
                        <Table.Th c={dark ? 'white' : 'dark.8'}>Dia do Mês</Table.Th>
                        <Table.Th c={dark ? 'white' : 'dark.8'}>Dia do Ciclo</Table.Th>
                        <Table.Th c={dark ? 'white' : 'dark.8'}>Cor/Símbolo</Table.Th>
                        <Table.Th c={dark ? 'white' : 'dark.8'}>R</Table.Th>
                        <Table.Th c={dark ? 'white' : 'dark.8'}>Sensação</Table.Th>
                        <Table.Th c={dark ? 'white' : 'dark.8'}>Aparência</Table.Th>
                        <Table.Th c={dark ? 'white' : 'dark.8'}>Notas</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                    {entries?.map((entry) => (
                        <Table.Tr
                            key={entry.id}
                            style={{ cursor: 'pointer' }}
                            onClick={() => handleEdit(entry)}
                        >
                            <Table.Td>
                                {format(parseISO(entry.date), 'EEEE', { locale: ptBR })}
                            </Table.Td>
                            <Table.Td>
                                {format(parseISO(entry.date), 'd', { locale: ptBR })}
                            </Table.Td>
                            <Table.Td>{entry.day_of_cycle}</Table.Td>
                            <Table.Td>
                                <Image
                                    src={`/mob_symbols/${entry.symbol}.png`}
                                    alt={entry.symbol}
                                    width={24}
                                    height={24}
                                />
                            </Table.Td>
                            <Table.Td>
                                <Box
                                    style={{
                                        width: 12,
                                        height: 12,
                                        borderRadius: '50%',
                                        backgroundColor: entry.r ? '#FF69B4' : 'white',
                                        boxShadow: '0 0 4px rgba(0,0,0,0.2)',
                                    }}
                                />
                            </Table.Td>
                            <Table.Td>{entry.feeling}</Table.Td>
                            <Table.Td>{entry.observation}</Table.Td>
                            <Table.Td>{entry.notes}</Table.Td>
                        </Table.Tr>
                    ))}
                </Table.Tbody>
            </Table>

            <Modal
                opened={opened}
                onClose={() => {
                    close();
                    resetForm();
                }}
                title={selectedEntry ? "Editar Registro" : "Novo Registro"}
                centered
            >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <DatePickerInput
                        label="Data"
                        placeholder="Selecione a data"
                        value={selectedDate}
                        onChange={setSelectedDate}
                        required
                        locale="pt-br"
                        weekendDays={[0, 6]}
                        firstDayOfWeek={0}
                        maxDate={new Date()}
                    />

                    <Select
                        label="Cor/Símbolo"
                        placeholder="Selecione uma opção"
                        data={SYMBOLS}
                        value={selectedSymbol}
                        onChange={setSelectedSymbol}
                        required
                        styles={{
                            option: {
                                minHeight: 42,
                                padding: '8px 12px',
                            }
                        }}
                        renderOption={({ option, checked }) => (
                            <Group gap="sm" style={{ justifyContent: 'space-between' }}>
                                <Group gap="sm">
                                    <Image src={option.image} alt={option.label} width={24} height={24} />
                                    <Text size="sm">{option.label}</Text>
                                </Group>
                                {checked && <IconCheck size={16} />}
                            </Group>
                        )}
                        renderValue={(selected) => {
                            const selectedSymbol = SYMBOLS.find(s => s.value === selected);
                            return selectedSymbol ? (
                                <SymbolSelectValue image={selectedSymbol.image} label={selectedSymbol.label} />
                            ) : null;
                        }}
                    />

                    <Checkbox
                        label="Relação Sexual"
                        checked={isR}
                        onChange={(event) => setIsR(event.currentTarget.checked)}
                    />

                    <Select
                        label="Sensação"
                        placeholder="Selecione uma opção"
                        data={FEELINGS}
                        value={selectedFeeling}
                        onChange={setSelectedFeeling}
                        required
                    />

                    <Select
                        label="Aparência"
                        placeholder="Selecione uma opção"
                        data={OBSERVATIONS}
                        value={selectedObservation}
                        onChange={setSelectedObservation}
                        required
                    />

                    <TextInput
                        label="Notas"
                        placeholder="Observações adicionais"
                        value={notes}
                        onChange={(event) => setNotes(event.currentTarget.value)}
                    />

                    <Button
                        onClick={handleSubmit}
                        mt="md"
                        loading={isSubmitting}
                    >
                        {isSubmitting ? 'Salvando...' : 'Salvar'}
                    </Button>
                </div>
            </Modal>
        </Container>
    );
} 