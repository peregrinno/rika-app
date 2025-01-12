export function setStorageItem(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function getStorageItem(key: string) {
  if (typeof window === 'undefined') return null;
  const item = localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
} 