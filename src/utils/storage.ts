export function setStorageItem(key: string, value: unknown) {
  if (typeof window === 'undefined') return;
  
  // Se for uma string (como um token JWT), não usar JSON.stringify
  if (typeof value === 'string') {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getStorageItem(key: string) {
  if (typeof window === 'undefined') return null;
  
  const item = localStorage.getItem(key);
  if (!item) return null;
  
  // Tenta fazer o parse, se falhar retorna o valor original
  try {
    return JSON.parse(item);
  } catch {
    return item;
  }
} 