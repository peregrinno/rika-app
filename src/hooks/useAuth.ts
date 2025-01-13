import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStorageItem } from '@/utils/storage';

export function useAuth(redirectTo: string = '/login') {
  const router = useRouter();

  useEffect(() => {
    const token = getStorageItem('rika-token');
    if (!token) {
      router.push(redirectTo);
    }
  }, [router, redirectTo]);

  return {
    isAuthenticated: !!getStorageItem('rika-token'),
  };
} 