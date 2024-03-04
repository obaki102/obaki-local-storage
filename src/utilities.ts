import CryptoJS from 'crypto-js';

export function isDataStale(timestamp: number, staleAfterDays: number): boolean {
  const oneDayInMillis = 24 * 60 * 60 * 1000; // 1 day
  const currentTime = new Date().getTime();
  return currentTime - timestamp > staleAfterDays * oneDayInMillis;
}

export function saveData<T>(key: string, data: T[], timestamp: number, encryptionKey?: string): void {
  const dataToStore = encryptionKey
    ? JSON.stringify({ data: encryptData(data, encryptionKey), timestamp })
    : JSON.stringify({ data, timestamp });
  localStorage.setItem(key, dataToStore);
}

export function getStoredData<T>(key: string): { data?: T[] | T; timestamp?: number } {
  const storedData = localStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : {};
}

export function encryptData<T>(data: T[], encryptionKey: string): string {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionKey).toString();
  return ciphertext;
}

export function decryptData<T>(ciphertext: string, encryptionKey: string): T[] {
  const bytes = CryptoJS.AES.decrypt(ciphertext, encryptionKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
}

