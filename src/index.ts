import { getStoredData, isDataStale, saveData, decryptData, encryptData } from '../src/utilities';

export async function getCacheData<T>(
  key: string,
  fetchDataIfNeeded: () => Promise<T[] | T>,
  staleAfterDays: number = 1
): Promise<T[]> {
  const { data, timestamp } = getStoredData<T>(key);

  if (data && !isDataStale(timestamp as number, staleAfterDays)) {
    return Array.isArray(data) ? data : [data];
  }

  const fetchData = await fetchDataIfNeeded();
  const dataToSave = Array.isArray(fetchData) ? fetchData : [fetchData];

  saveData(key, dataToSave, new Date().getTime());
  return dataToSave;
}

export async function getEncryptedCacheData<T>(
  key: string,
  fetchDataIfNeeded: () => Promise<T[] | T>,
  encryptionKey: string,
  staleAfterDays: number = 1
): Promise<T[]> {
  const { data, timestamp } = getStoredData<T>(key);

  if (data && !isDataStale(timestamp as number, staleAfterDays)) {
    const decryptedData = decryptData(data as string, encryptionKey) as T | T[];
    return Array.isArray(decryptedData) ? decryptedData : [decryptedData];
  }

  const fetchData = await fetchDataIfNeeded();
  const dataToSave = Array.isArray(fetchData) ? fetchData : [fetchData];

  saveData(key, dataToSave, new Date().getTime(), encryptionKey);
  return dataToSave;
}

export function getEncryptedData<T>(
  key: string,
  encryptionKey: string,
) {
  const data = localStorage.getItem(key);
  const decryptedData = decryptData(data as string, encryptionKey) as T | T[];
  return Array.isArray(decryptedData) ? decryptedData : [decryptedData];
}

export function setEncryptedData<T>(
  key: string,
  data: T[],
  encryptionKey: string,
) {
  const dataToStore = encryptData(data, encryptionKey);
  localStorage.setItem(key, dataToStore);
}



