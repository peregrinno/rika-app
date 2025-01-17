import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';

export function useRequireAuth() {
    const router = useRouter();
    const { isAuthenticated } = useAuth();
    const isLoading = !isAuthenticated;

    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return { isLoading };
} 