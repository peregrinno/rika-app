import api from './api';

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

interface CreateCycleData {
    cycle_number: number;
    first_day: string;
    date: string;
    day_of_cycle: number;
    symbol: string;
    r: boolean;
    feeling: string;
    observation: string;
    notes: string;
}

interface DayCycleResponse {
    success: boolean;
    data: {
        dayCycleCurrent: number;
    };
}

interface CycleListResponse {
    data: CycleEntry[];
    api_version: string;
    timestamp: string;
    status: number;
}

export const cycleService = {
    async create(cycleData: CreateCycleData): Promise<CycleEntry> {
        const response = await api.post<ApiResponse<CycleEntry>>('/cycle/create', {
            data: cycleData
        });
        return response.data.data;
    },

    async update(id: number, cycleData: Partial<CreateCycleData>): Promise<CycleEntry> {
        const response = await api.put<ApiResponse<CycleEntry>>('/cycle/update', {
            data: {
                id,
                ...cycleData
            }
        });
        return response.data.data;
    },

    async getCurrentCycle(): Promise<CycleEntry[]> {
        const response = await api.get<CycleListResponse>('/cycle/now/list');
        return response.data.data;
    },

    async getAllCycles(): Promise<CycleEntry[]> {
        const response = await api.get<CycleListResponse>('/cycle/list');
        return response.data.data;
    },

    async getCurrentDayCycle(): Promise<number> {
        const response = await api.get<DayCycleResponse>('/day-cycle');
        return response.data.data.dayCycleCurrent;
    }
}; 